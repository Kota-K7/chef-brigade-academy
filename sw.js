const CACHE_NAME = 'chef-brigade-cache-v2';
const ASSETS = [
  './', 
  'index.html', 
  'manifest.json', 
  'index.css', 
  'app.js',
  'icons/icon-192.png', 
  'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-First strategy for dynamic and critical rendering files (HTML, CSS, JS, JSON)
  if (
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.json')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If valid response, clone and cache it
          if (response && response.status === 200) {
            const responseCopy = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseCopy);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(event.request);
        })
    );
  } else {
    // Cache-First strategy for static assets (images, fonts, icons)
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(netResponse => {
          if (netResponse && netResponse.status === 200) {
            const responseCopy = netResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseCopy);
            });
          }
          return netResponse;
        });
      })
    );
  }
});
