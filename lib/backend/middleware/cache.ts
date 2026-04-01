import NodeCache from "node-cache";
import type { NextFunction, Request, Response } from "express";

const apiCache = new NodeCache({
  stdTTL: 60 * 5,
  checkperiod: 60,
  useClones: false,
});

export function cacheMiddleware(ttlSeconds = 60 * 5) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== "GET") {
      return next();
    }

    const cacheKey = `${req.method}:${req.originalUrl}`;
    const cached = apiCache.get(cacheKey);

    if (cached) {
      return res.status(200).json(cached);
    }

    const originalJson = res.json.bind(res);

    res.json = (body: unknown) => {
      try {
        if (res.statusCode === 200 && body) {
          apiCache.set(cacheKey, body, ttlSeconds);
        }
      } catch {
       
      }

      return originalJson(body);
    };

    next();
  };
}

export function clearCacheByKey(key: string) {
  apiCache.del(key);
}

export function clearAllCache() {
  apiCache.flushAll();
}

