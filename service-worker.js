const CACHE_NAME = "v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/index_files/global.css",
  "/index_files/custom.js",
  "/images/logo.png"
];

// Installer le Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activer le Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Clearing old cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepter les requêtes
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
