const CACHE_NAME = "chef-brigade-v26";
const ASSETS = [
  "index.html",
  "index.css",
  "app.js",
  "manifest.json",
  "data/meta.json",
  "data/vocabulary_A1.json",
  "data/vocabulary_A2.json",
  "data/vocabulary_B1.json",
  "data/vocabulary_B2.json",
  "data/vocabulary_C1.json",
  "data/vocabulary_C2.json",
  "data/grammar_A1.json",
  "data/grammar_A2.json",
  "data/grammar_B2.json",
  "data/grammar_C1.json",
  "data/grammar_C2.json",
  "data/cuisine_A1.json",
  "data/cuisine_A2.json",
  "data/cuisine_B2.json",
  "data/cuisine_C1.json",
  "data/cuisine_C2.json",
  "data/quizzes.json",
  "js/views/home.js",
  "js/views/vocabulary.js",
  "js/views/grammar.js",
  "js/views/cuisine.js",
  "js/views/quiz.js",
  "js/views/favorites.js",
  "js/views/review.js",
  "js/views/search.js",
  "js/views/settings.js",
  "js/views/dictation.js",
  "js/utils/audio.js",
  "assets/beef_cuts.png",
  "assets/porc_cuts.png",
  "assets/poultry_cuts.png",
  "assets/france_map.png",
  "icons/icon-192.png",
  "beef_maff_guide.pdf",
  "pork_maff_guide.pdf",
  "poultry_maff_guide.pdf"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh in background and update cache
        fetch(e.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, networkResponse);
            });
          }
        }).catch(() => {/* Ignore background sync failures */});
        return cachedResponse;
      }
      return fetch(e.request);
    })
  );
});
