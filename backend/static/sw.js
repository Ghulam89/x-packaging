const CACHE_VERSION = 'v1';
const HTML_CACHE = `html-cache-${CACHE_VERSION}`;
const API_CACHE = `api-cache-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![HTML_CACHE, API_CACHE].includes(k))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

function isHomeRequest(request) {
  const url = new URL(request.url);
  return request.mode === 'navigate' && (url.pathname === '/' || url.pathname === '');
}

function isApiRequest(request) {
  const url = new URL(request.url);
  return (
    request.method === 'GET' &&
    (
      url.pathname.startsWith('/products') ||
      url.pathname.startsWith('/faq') ||
      url.pathname.startsWith('/banner')
    )
  );
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Network-first for home HTML, fallback to cache for guaranteed display
  if (isHomeRequest(request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(HTML_CACHE);
        try {
          const response = await fetch(request);
          if (response && response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (_) {
          const cached = await cache.match(request);
          if (cached) return cached;
          return new Response('<!doctype html><html><body><div id="root"></div></body></html>', {
            headers: { 'Content-Type': 'text/html' }
          });
        }
      })()
    );
    return;
  }

  // Stale-while-revalidate for key APIs
  if (isApiRequest(request)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(API_CACHE);
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((response) => {
            if (response && response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => null);
        return cached || networkPromise || new Response(JSON.stringify({ data: [] }), {
          headers: { 'Content-Type': 'application/json' }
        });
      })()
    );
    return;
  }
});
