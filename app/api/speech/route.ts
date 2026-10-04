import { HttpError, errorResponse, rateLimiter, readJSON, requireApiKey, sleep } from "../_lib/http";

// Turns one script line into speech with a Gemini voice. The app caches the
// audio on the device, so each line is only synthesised once per user.

export const maxDuration = 60;

const INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions";
// Primary model first; the Lite model is the fallback when it's overloaded.
const MODELS = ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"];
const UPSTREAM_TIMEOUT_MS = 30_000;

const MAX_TEXT_LENGTH = 600;
const MAX_STYLE_LENGTH = 160;
// Voice Library ids (e.g. "en-gb-advisor-8", "fa-ir-assistant-2") or the
// original prebuilt names (e.g. "Kore").
const VOICE_PATTERN = /^(?:[a-z]{2,3}-[a-z]{2}-[a-z]+-\d{1,3}|[A-Z][a-z]{2,15})$/;

// A scenario is 10–30 lines, so allow a few scenarios' worth per window.
const enforceRateLimit = rateLimiter(150, 10 * 60 * 1000);

export async function POST(request: Request) {
  try {
    const apiKey = requireApiKey();
    enforceRateLimit(request);

    const { text, voice, style } = parseRequest(await readJSON(request));
    const audio = await synthesise(text, voice, style, apiKey);
    return new Response(new Uint8Array(audio), {
      headers: { "Content-Type": "audio/wav", "Cache-Control": "no-store" },
    });
  } catch (error) {
    return errorResponse(error);
  }
}

function parseRequest(body: unknown): { text: string; voice: string; style?: string } {
  if (typeof body !== "object" || body === null) {
    throw new HttpError(400, "invalid_input", "Request body must be a JSON object.");
  }
  const b = body as Record<string, unknown>;

  const text = typeof b.text === "string" ? clean(b.text) : "";
  if (!text) throw new HttpError(400, "invalid_input", "Text is required.");
  if ([...text].length > MAX_TEXT_LENGTH) {
    throw new HttpError(400, "invalid_input", `Text is too long (max ${MAX_TEXT_LENGTH} characters).`);
  }

  if (typeof b.voice !== "string" || !VOICE_PATTERN.test(b.voice)) {
    throw new HttpError(400, "invalid_input", "voice is not a valid voice id.");
  }

  let style: string | undefined;
  if (b.style !== undefined) {
    style = typeof b.style === "string" ? clean(b.style).slice(0, MAX_STYLE_LENGTH) : undefined;
  }
  return { text, voice: b.voice, style: style || undefined };
}

function clean(value: string): string {
  return value.replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim();
}

async function synthesise(text: string, voice: string, style: string | undefined, apiKey: string) {
  const content: Record<string, unknown> = { type: "text", text };
  if (style) content.annotations = [{ type: "speech_metadata", style }];

  let lastStatus = 0;
  for (const model of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      let response: Response;
      try {
        response = await fetch(INTERACTIONS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
          body: JSON.stringify({
            model,
            input: [{ type: "user_input", content: [content] }],
            response_format: { type: "audio", mime_type: "audio/wav" },
            generation_config: { speech_config: [{ voice }] },
          }),
          signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        });
      } catch (error) {
        console.error(`TTS ${model} request failed`, error);
        lastStatus = 504;
        break;
      }

      if (response.ok) {
        const audio = findAudio(await response.json());
        if (!audio) {
          throw new HttpError(502, "empty_response", "The voice service returned no audio.");
        }
        return Buffer.from(audio, "base64");
      }

      lastStatus = response.status;
      const detail = await response.text().catch(() => "");
      console.error(`TTS ${model} returned ${response.status}: ${detail.slice(0, 300)}`);

      // 429 is usually the model's daily quota; the Lite model has its own,
      // so fall through to it before giving up.
      if (response.status === 429) {
        lastStatus = 429;
        break;
      }
      if (response.status === 400) {
        throw new HttpError(400, "invalid_input", "The voice service rejected this line.");
      }
      if (![404, 500, 503].includes(response.status)) break;
      if (attempt === 0) await sleep(800);
    }
  }

  if (lastStatus === 429) {
    throw new HttpError(429, "rate_limited", "The voice service is busy. Please try again later.");
  }
  throw new HttpError(
    502,
    "upstream_unavailable",
    lastStatus === 503
      ? "The voice service is experiencing high demand. Please try again in a minute."
      : "The voice service could not complete the request.",
  );
}

type InteractionResponse = {
  steps?: { type?: string; content?: { type?: string; mime_type?: string; data?: string }[] }[];
};

/** The audio is the first audio content block of the model's output step. */
function findAudio(json: InteractionResponse): string | undefined {
  for (const step of json.steps ?? []) {
    for (const block of step.content ?? []) {
      if (block.type === "audio" && typeof block.data === "string" && block.data.length > 0) {
        return block.data;
      }
    }
  }
  return undefined;
}
