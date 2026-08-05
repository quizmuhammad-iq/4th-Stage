const CACHE_NAME = 'ministquiz-v1.6';
const urlsToCache = [
    './',
    'index.html',
    'main.html',
    'quiz.html',
    'payment.html',
    'stats.html',
    'leaderboard.html',
    'manifest.json',
    'icon-192.png',
    'icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(response => {
            return caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, response.clone());
                return response;
            });
        }).catch(() => {
            return caches.match(event.request);
        })
    );
});
