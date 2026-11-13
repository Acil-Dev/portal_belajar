const CACHE_NAME = 'portal-belajar-v1.0.4'; // Naikkan versi jika ada update file

const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json',
    './css/style.css?v=2',
    './css/components.css?v=2',
    './css/darkmode.css?v=2',
    './js/auth.js',
    './js/app.js',
    './js/storage.js',
    './js/quiz-generator.js',
    './js/planner-streak.js',
    './js/subjects.js',
    './data/ebooks-data.js',
    './data/subjects-data.js',
    './data/cheatsheets.js',
    './data/quotes.js',
    './data/support-data.js'
];

// Install Event
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
});

// Activate Event: Bersihkan cache lama
self.addEventListener('activate', (event) => {
    event.waitUntil(
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

// Fetch Event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});