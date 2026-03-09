import { useCallback, useRef, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';

const memoryCache = new Map();
const inFlight = new Map();

export default function useApi(options = {}) {
  const ttl = options.ttl ?? 600000;
  const retries = options.retries ?? 0;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(options.initialData ?? null);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const getCache = (key) => {
    const v = memoryCache.get(key);
    if (!v) return null;
    if (v.expiry < Date.now()) {
      memoryCache.delete(key);
      return null;
    }
    return v.value;
  };

  const setCache = (key, value) => {
    memoryCache.set(key, { value, expiry: Date.now() + ttl });
  };

  const cancel = useCallback(() => {
    if (controllerRef.current) {
      try { controllerRef.current.abort(); } catch {}
      controllerRef.current = null;
    }
  }, []);

  const run = useCallback(async (method, url, config = {}, opts = {}) => {
    setError(null);
    setLoading(true);
    const key = opts.cacheKey || null;
    if (key) {
      const cached = getCache(key);
      if (cached) {
        setData(cached);
        setLoading(false);
        return cached;
      }
      const inflight = inFlight.get(key);
      if (inflight) {
        try {
          const res = await inflight;
          setData(res);
          setLoading(false);
          return res;
        } catch (e) {
          setError(e);
          setLoading(false);
          throw e;
        }
      }
    }
    let attempt = 0;
    let lastErr = null;
    while (attempt <= retries) {
      controllerRef.current = new AbortController();
      try {
        const axiosConfig = { ...config, signal: controllerRef.current.signal, method, url };
        const response = await axiosInstance.request(axiosConfig);
        const result = response;
        setData(result);
        if (key) setCache(key, result);
        setLoading(false);
        if (key) inFlight.delete(key);
        return result;
      } catch (e) {
        lastErr = e;
        attempt += 1;
        if (attempt > retries) {
          setError(e);
          setLoading(false);
          if (key) inFlight.delete(key);
          throw e;
        }
        await new Promise((r) => setTimeout(r, Math.min(500 * attempt, 1500)));
      }
    }
    setLoading(false);
    if (key) inFlight.delete(key);
    throw lastErr;
  }, [retries, ttl]);

  const get = useCallback((url, config = {}, opts = {}) => {
    if (opts.cacheKey) inFlight.set(opts.cacheKey, run('GET', url, config, opts));
    return run('GET', url, config, opts);
  }, [run]);

  const post = useCallback((url, dataBody, config = {}, opts = {}) => {
    return run('POST', url, { ...config, data: dataBody }, opts);
  }, [run]);

  const put = useCallback((url, dataBody, config = {}, opts = {}) => {
    return run('PUT', url, { ...config, data: dataBody }, opts);
  }, [run]);

  const del = useCallback((url, config = {}, opts = {}) => {
    return run('DELETE', url, config, opts);
  }, [run]);

  const reset = useCallback(() => {
    setData(options.initialData ?? null);
    setError(null);
    setLoading(false);
  }, [options.initialData]);

  const refetch = useCallback(async (lastUrl, lastConfig = {}, lastOpts = {}) => {
    return run('GET', lastUrl, lastConfig, lastOpts);
  }, [run]);

  return { get, post, put, del, loading, data, error, cancel, reset, refetch };
}
