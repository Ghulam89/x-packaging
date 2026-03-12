const cache = new Map();
const TTL = 60 * 1000;

export function getCacheKey(url) {
  return `ssr:${url}`;
}

export function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCached(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

export function clearCache() {
  cache.clear();
}
