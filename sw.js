/**
 * sw.js - Service Worker untuk Portal Belajar SMA
 * Fungsi: Mengatur caching aset statis dan menangani mode offline 
 * agar web tetap dapat diakses tanpa koneksi internet.
 */

// Nama cache beserta versi aplikasi untuk memudahkan pembaruan cache
const CACHE_NAME = 'portal-belajar-v1';

// Daftar aset utama yang akan di-cache saat proses instalasi Service Worker
const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json',
    './css/style.css',
    './css/components.css',
    './css/darkmode.css',
    './js/app.js',
    './js/storage.js',
    './js/quiz-generator.js',
    './js/planner-streak.js',
    './js/subjects.js',
    './data/subjects-data.js',
    './data/cheatsheets.js'
];

/**
 * Event Listener: Install
 * Fungsi: Dijalankan saat browser pertama kali mendeteksi/mendaftarkan sw.js.
 * Berfungsi menyimpan (cache) seluruh file penting yang ada di daftar ASSETS_TO_CACHE.
 */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Melakukan caching file aset aplikasi...');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

/**
 * Event Listener: Activate
 * Fungsi: Membersihkan versi cache lama jika ada pembaruan versi (misal dari v1 ke v2)
 * agar memori penyimpanan pengguna tidak penuh oleh file sampah lama.
 */
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[Service Worker] Menghapus cache lama:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

/**
 * Event Listener: Fetch
 * Fungsi: Men intersepsi setiap permintaan (request) jaringan dari browser.
 * Jika file tersedia di cache, berikan dari cache; jika tidak ada, ambil dari internet.
 */
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Kembalikan dari cache jika ditemukan, jika tidak lakukan fetch jaringan standar
                return cachedResponse || fetch(event.request);
            })
            .catch(() => {
                // Opsional: Anda bisa mengembalikan halaman fallback offline khusus di sini jika jaringan putus total
            })
    );
});