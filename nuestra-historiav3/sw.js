/* ═══════════════════════════════════════════════════════
   NUESTRA HISTORIA - Service Worker (PWA)
   Permite que la app funcione offline una vez cargada
═══════════════════════════════════════════════════════ */
const CACHE_NAME = 'nuestra-historia-v2';
const CORE_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/config.js',
  './js/script.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

// INSTALACIÓN: cachea los assets principales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CORE_ASSETS).catch(err => {
        console.warn('SW: algunos assets no se cachearon:', err);
      });
    })
  );
  self.skipWaiting();
});

// ACTIVACIÓN: limpia caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// FETCH: estrategia Cache First con fallback a red
self.addEventListener('fetch', event => {
  const req = event.request;
  // Solo cachear GET
  if (req.method !== 'GET') return;
  // Ignorar peticiones a otros dominios (CDN)
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(response => {
        // Solo cachear respuestas válidas del mismo origen
        if (sameOrigin && response && response.status === 200 && response.type === 'basic'){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, clone));
        }
        return response;
      }).catch(() => {
        // Si es HTML y no hay red, servir index desde cache
        if (req.destination === 'document'){
          return caches.match('./index.html');
        }
      });
    })
  );
});
