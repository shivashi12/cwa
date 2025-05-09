const cacheName = 'cellwall-cache-v1';
const assets = [
  '/',
  '/index.html',
  '/doctor-list.html',
  '/product-list.html',
  '/slideshow.html',
  '/script.js',
  '/slideshow.css',
  '/data.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
