import { HttpError, errorResponse, rateLimiter, readJSON, requireApiKey } from "../_lib/http";
import { deckPrompt, scenarioPrompt, type Difficulty } from "./prompts";

// Proxy between the iOS app and the Gemini API so the API key never ships in
// the app binary. Prompts are built here from validated fields; the app can't
// send free-form prompts.

export const maxDuration = 60;

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
// Primary model first; the fallback is tried when the primary is overloaded.
const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash"];
const UPSTREAM_TIMEOUT_MS = 45_000;

const MAX_TOPIC_LENGTH = 200;
const MAX_ITEMS = 30;
const LANGUAGE_PATTERN = /^[\p{L} ()-]{2,30}$/u;
const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

const enforceRateLimit = rateLimiter(10, 10 * 60 * 1000);

type GenerateRequest =
  | {
      kind: "deck";
      topic: string;
      count: number;
      sourceLanguage: string;
      targetLanguage: string;
    }
  | { kind: "scenario"; topic: string; count: number; difficulty: Difficulty };

export async function POST(request: Request) {
  try {
    const apiKey = requireApiKey();
    enforceRateLimit(request);

    const input = parseRequest(await readJSON(request));
    const prompt =
      input.kind === "deck"
        ? deckPrompt(input.topic, input.count, input.sourceLanguage, input.targetLanguage)
        : scenarioPrompt(input.topic, input.difficulty, input.count);

    const text = await callGemini(prompt, apiKey);
    const result = input.kind === "deck" ? validateDeck(text) : validateScenario(text);
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return errorResponse(error);
  }
}

// MARK: - Input

function parseRequest(body: unknown): GenerateRequest {
  if (typeof body !== "object" || body === null) {
    throw new HttpError(400, "invalid_input", "Request body must be a JSON object.");
  }
  const b = body as Record<string, unknown>;
  const topic = sanitizeTopic(b.topic);
  const count = clampCount(b.count);

  if (b.kind === "deck") {
    return {
      kind: "deck",
      topic,
      count,
      sourceLanguage: language(b.sourceLanguage, "sourceLanguage"),
      targetLanguage: language(b.targetLanguage, "targetLanguage"),
    };
  }
  if (b.kind === "scenario") {
    const difficulty = DIFFICULTIES.find((d) => d === b.difficulty) ?? "Medium";
    return { kind: "scenario", topic, count, difficulty };
  }
  throw new HttpError(400, "invalid_input", 'kind must be "deck" or "scenario".');
}

function sanitizeTopic(value: unknown): string {
  if (typeof value !== "string") {
    throw new HttpError(400, "invalid_input", "Topic is required.");
  }
  // Strip control characters (keeps newlines/tabs) and the tag delimiters the
  // prompt wraps the topic in.
  const cleaned = value
    .replace(/[\p{Cc}\p{Cf}]/gu, (c) => (c === "\n" || c === "\t" ? " " : ""))
    .replace(/[<>]/g, "")
    .trim();
  if (!cleaned) {
    throw new HttpError(400, "invalid_input", "Topic cannot be empty.");
  }
  if ([...cleaned].length > MAX_TOPIC_LENGTH) {
    throw new HttpError(400, "invalid_input", `Topic is too long (max ${MAX_TOPIC_LENGTH} characters).`);
  }
  return cleaned;
}

function clampCount(value: unknown): number {
  const n = typeof value === "number" && Number.isFinite(value) ? Math.round(value) : 15;
  return Math.min(Math.max(n, 1), MAX_ITEMS);
}

function language(value: unknown, field: string): string {
  if (typeof value !== "string" || !LANGUAGE_PATTERN.test(value.trim())) {
    throw new HttpError(400, "invalid_input", `${field} is not a valid language name.`);
  }
  return value.trim();
}

// MARK: - Gemini

async function callGemini(prompt: string, apiKey: string): Promise<string> {
  const body = JSON.stringify({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json", maxOutputTokens: 8192 },
    // Legal vocabulary ("assault", "manslaughter") trips the default filters,
    // so only block content Google rates as high-probability harmful.
    safetySettings: [
      "HARM_CATEGORY_DANGEROUS_CONTENT",
      "HARM_CATEGORY_HARASSMENT",
      "HARM_CATEGORY_HATE_SPEECH",
      "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    ].map((category) => ({ category, threshold: "BLOCK_ONLY_HIGH" })),
  });

  let lastStatus = 0;
  for (const model of MODELS) {
    // One retry per model for transient overload before falling back.
    for (let attempt = 0; attempt < 2; attempt++) {
      let response: Response;
      try {
        response = await fetch(`${GEMINI_BASE}/${model}:generateContent`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body,
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });
      } catch (error) {
        console.error(`Gemini ${model} request failed`, error);
        lastStatus = 504;
        break;
      }

      if (response.ok) {
        return extractText(await response.json());
      }

      lastStatus = response.status;
      const detail = await response.text().catch(() => "");
      console.error(`Gemini ${model} returned ${response.status}: ${detail.slice(0, 300)}`);

      if (response.status === 429) {
        throw new HttpError(429, "rate_limited", "The AI service is busy. Please try again shortly.");
      }
      // 503 = overloaded, 500 = transient; Gemini also intermittently answers
      // an empty 404 for available models under load.
      const transient = [404, 500, 503].includes(response.status);
      if (!transient) break;
      if (attempt === 0) await new Promise((r) => setTimeout(r, 1000));
    }
  }

  throw new HttpError(
    502,
    "upstream_unavailable",
    lastStatus === 503 || lastStatus === 404
      ? "The AI service is experiencing high demand. Please try again in a minute."
      : "The AI service could not complete the request. Please try again.",
  );
}

type GeminiResponse = {
  promptFeedback?: { blockReason?: string };
  candidates?: {
    finishReason?: string;
    content?: { parts?: { text?: string; thought?: boolean }[] };
  }[];
};

function extractText(json: GeminiResponse): string {
  const blockReason = json.promptFeedback?.blockReason;
  if (blockReason) {
    throw new HttpError(422, "safety_blocked", `The request was blocked by safety filters (${blockReason}).`);
  }
  const candidate = json.candidates?.[0];
  if (candidate?.finishReason === "SAFETY") {
    throw new HttpError(422, "safety_blocked", "The response was blocked by safety filters.");
  }
  const text = (candidate?.content?.parts ?? [])
    .filter((p) => !p.thought && typeof p.text === "string")
    .map((p) => p.text)
    .join("")
    .trim();
  if (!text) {
    throw new HttpError(502, "empty_response", "The AI returned an empty response. Try rephrasing your topic.");
  }
  return text;
}

// MARK: - Output validation

function parseModelJSON(text: string): Record<string, unknown> {
  try {
    const value: unknown = JSON.parse(text);
    if (typeof value === "object" && value !== null) return value as Record<string, unknown>;
  } catch {
    // fall through
  }
  console.error(`Unparseable model output: ${text.slice(0, 300)}`);
  throw new HttpError(502, "invalid_response", "The AI returned an unexpected response. Please try again.");
}

const nonEmpty = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;

function validateDeck(text: string) {
  const json = parseModelJSON(text);
  const cards = (Array.isArray(json.cards) ? json.cards : [])
    .filter((c): c is Record<string, unknown> => typeof c === "object" && c !== null)
    .filter((c) => nonEmpty(c.term) && nonEmpty(c.translation))
    .slice(0, MAX_ITEMS)
    .map((c) => ({
      term: (c.term as string).trim(),
      translation: (c.translation as string).trim(),
      context: nonEmpty(c.context) ? c.context.trim() : null,
    }));
  if (cards.length === 0) {
    throw new HttpError(502, "empty_response", "The AI returned no usable cards. Try rephrasing your topic.");
  }
  return { deckName: nonEmpty(json.deckName) ? json.deckName.trim() : "AI Deck", cards };
}

function validateScenario(text: string) {
  const json = parseModelJSON(text);
  const script = (Array.isArray(json.script) ? json.script : [])
    .filter((l): l is Record<string, unknown> => typeof l === "object" && l !== null)
    .filter((l) => nonEmpty(l.speaker) && nonEmpty(l.text))
    .slice(0, MAX_ITEMS * 2)
    .map((l) => ({ speaker: (l.speaker as string).trim(), text: (l.text as string).trim() }));
  if (script.length === 0) {
    throw new HttpError(502, "empty_response", "The AI returned an empty script. Try rephrasing your topic.");
  }
  const difficulty = DIFFICULTIES.find((d) => d === json.difficulty) ?? "Medium";
  return { title: nonEmpty(json.title) ? json.title.trim() : "AI Scenario", difficulty, script };
}
