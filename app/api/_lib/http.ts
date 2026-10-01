// Shared helpers for the API routes.

export class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export function errorResponse(error: unknown): Response {
  if (error instanceof HttpError) {
    return Response.json(
      { error: { code: error.code, message: error.message } },
      { status: error.status, headers: { "Cache-Control": "no-store" } },
    );
  }
  console.error("Unexpected API error", error);
  return Response.json(
    { error: { code: "internal", message: "Something went wrong. Please try again." } },
    { status: 500 },
  );
}

export function requireApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    throw new HttpError(500, "server_misconfigured", "The AI service is not configured.");
  }
  return apiKey;
}

export async function readJSON(request: Request, maxBytes = 4096): Promise<unknown> {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > maxBytes) {
    throw new HttpError(413, "too_large", "Request is too large.");
  }
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, "invalid_input", "Request body must be JSON.");
  }
}

function clientIP(request: Request): string {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/**
 * Best-effort per-IP limiter. Instances are reused under Fluid Compute but not
 * shared, so pair this with a Vercel Firewall rate-limit rule on /api/*.
 */
export function rateLimiter(maxRequests: number, windowMs: number) {
  const recent = new Map<string, number[]>();
  return (request: Request) => {
    const ip = clientIP(request);
    const now = Date.now();
    const times = (recent.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (times.length >= maxRequests) {
      throw new HttpError(429, "rate_limited", "Too many requests. Please wait a few minutes and try again.");
    }
    times.push(now);
    recent.set(ip, times);
    if (recent.size > 5000) {
      for (const [key, value] of recent) {
        if (value.every((t) => now - t >= windowMs)) recent.delete(key);
      }
    }
  };
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
