const CACHE_NAME = 'garden-planner-shell-v9';
const APP_BASE = new URL('./', self.location.href);
const APP_SHELL = [
    '',
    'index.html',
    'styles.css',
    'app.js',
    'preview.js',
    'manifest.webmanifest',
    'assets/leaf-mark.svg',
    'vendor/three.module.js',
    'vendor/three.core.js',
]
    .map((path) => new URL(path, APP_BASE).href);

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(caches.keys().then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
    )));
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
    event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});