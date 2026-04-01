/**
 * Base URL for `/api` during Server Components / SSR.
 * Prefer INTERNAL_API_BASE_URL for same-machine calls (e.g. http://127.0.0.1:8000/api).
 * Otherwise uses NEXT_PUBLIC_API_BASE_URL, then localhost + PORT.
 * (Avoids `next/headers` so this file stays safe when `lib/api` is reachable from Client Components.)
 */
export function getServerApiBase(): string {
  const internal = process.env.INTERNAL_API_BASE_URL?.trim().replace(/\/+$/, "");
  if (internal) {
    return internal.endsWith("/api") ? internal : `${internal}/api`;
  }
  const raw = (process.env.NEXT_PUBLIC_API_BASE_URL || "").trim().replace(/\/+$/, "");
  if (raw) {
    return raw.endsWith("/api") ? raw : `${raw}/api`;
  }
  const port = process.env.PORT || "8000";
  return `http://127.0.0.1:${port}/api`;
}
