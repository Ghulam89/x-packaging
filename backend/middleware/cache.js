import NodeCache from "node-cache";

// Shared in-memory cache instance for all API routes
const apiCache = new NodeCache({
  stdTTL: 60 * 5, // default 5 minutes
  checkperiod: 60,
  useClones: false,
});

/**
 * Generic cache middleware for GET endpoints.
 *
 * Usage:
 *   router.use(cacheMiddleware(300));               // cache all GETs in router
 *   app.use("/products", cacheMiddleware(300));     // cache all GET /products/* routes
 *
 * Only caches successful (status 200) JSON responses.
 */
export function cacheMiddleware(ttlSeconds = 60 * 5) {
  return (req, res, next) => {
    if (req.method !== "GET") {
      return next();
    }

    const cacheKey = `${req.method}:${req.originalUrl}`;
    const cached = apiCache.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const originalJson = res.json.bind(res);

    res.json = (body) => {
      try {
        if (res.statusCode === 200 && body) {
          apiCache.set(cacheKey, body, ttlSeconds);
        }
      } catch {
        // Ignore cache errors and still return response
      }

      return originalJson(body);
    };

    next();
  };
}

/**
 * Optional helpers for manual invalidation (for future use).
 */
export function clearCacheByKey(key) {
  apiCache.del(key);
}

export function clearAllCache() {
  apiCache.flushAll();
}

