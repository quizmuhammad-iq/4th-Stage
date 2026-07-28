const CACHE_NAME = 'ministquiz-v1';
// قائمة الملفات اللي نريد نحفظها بالذاكرة
const urlsToCache = [
    '/',
    '/index.html',
    '/main.html',
    '/quiz.html',
    '/payment.html',
    '/mistakes.html',
    '/stats.html',
    '/leaderboard.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // إذا الملف موجود بالكاش، جيبه، وإذا لا، حمله من النت
            return response || fetch(event.request);
        })
    );
});