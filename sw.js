const CACHE_NAME = 'app-entrevistas-v1';
const ASSETS = [
    // Usamos rutas absolutas desde la raíz del repositorio
    '/Entrevistas-Proalca-Marye/', // La raíz del proyecto
    '/Entrevistas-Proalca-Marye/index.html',
    '/Entrevistas-Proalca-Marye/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cache abierta');
        return cache.addAll(ASSETS);
      })
      .catch(err => {
        console.error('Service Worker: Fallo en addAll:', err);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: Sirviendo desde la caché:', event.request.url);
          return response;
        }
        console.log('Service Worker: Petición de red:', event.request.url);
        return fetch(event.request);
      })
  );
});
