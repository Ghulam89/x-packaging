import { useEffect } from 'react';
import useApi from './useApi';

export default function useFetch(url, options = {}, deps = []) {
  const api = useApi({
    ttl: options.ttl,
    retries: options.retries,
    initialData: options.initialData,
  });

  useEffect(() => {
    if (!url) return;
    api.get(url, options.config || {}, { cacheKey: options.cacheKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options.cacheKey, options.config, ...deps]);

  const refetch = () => api.get(url, options.config || {}, { cacheKey: options.cacheKey });

  return {
    data: api.data,
    loading: api.loading,
    error: api.error,
    refetch,
    cancel: api.cancel,
    reset: api.reset,
  };
}
