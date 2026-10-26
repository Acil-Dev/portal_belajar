/**
 * js/app.js - Kontroler Utama (Main Application Controller) Portal Belajar SMA
 * Fungsi: Mengatur navigasi antar-halaman (SPA), event listener global, 
 * fitur toggle Dark Mode, serta menginisialisasi modul-modul pendukung saat web dimuat.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi komponen utama aplikasi
    AppController.init();
});

const AppController = {
    init() {
        this.initTheme();
        this.initNavigation();
        this.initSidebarToggle();
        this.updateDashboardStats();
        this.initRandomQuote(); // <-- 1. TAMBAHKAN PEMANGGILAN FUNGSI INI DI SINI
        
        console.log('[AppController] Portal Belajar berhasil diinisialisasi.');
    },

    /**
     * Manajemen Tema (Light / Dark Mode)
     * Mengatur preferensi tema berdasarkan LocalStorage dan mengubah atribut [data-theme] pada tag html.
     */
    initTheme() {
        const savedTheme = StorageManager.getTheme();
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        if (themeToggleBtn) {
            this.updateThemeButtonUI(savedTheme);
            themeToggleBtn.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                StorageManager.saveTheme(newTheme);
                this.updateThemeButtonUI(newTheme);
            });
        }
    },

    updateThemeButtonUI(theme) {
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        if (!themeToggleBtn) return;
        
        const textSpan = themeToggleBtn.querySelector('.toggle-text');
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ <span class="toggle-text">Light Mode</span>';
        } else {
            themeToggleBtn.innerHTML = '🌙 <span class="toggle-text">Dark Mode</span>';
        }
    },

    /**
     * Sistem Navigasi SPA (Single Page Application)
     * Mengatur perpindahan antar view section secara halus tanpa reload halaman.
     */
    initNavigation() {
        const navButtons = document.querySelectorAll('.nav-item');
        const viewSections = document.querySelectorAll('.view-section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');

                // Ubah status aktif pada tombol navigasi
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Tampilkan view section yang sesuai, sembunyikan yang lain
                viewSections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });

                // Tutup sidebar otomatis pada mode mobile setelah menu dipilih
                const sidebar = document.getElementById('sidebar');
                if (sidebar && sidebar.classList.contains('mobile-open')) {
                    sidebar.classList.remove('mobile-open');
                }
            });
        });
    },

    /**
     * Kontrol Sidebar Responsif (Mobile View)
     * Membuka dan menutup sidebar navigasi di perangkat layar kecil.
     */
    initSidebarToggle() {
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');

        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
            });
        }
    },

    /**
     * Pembaruan Statistik Ringkas di Dashboard
     * Menghitung jumlah tugas harian dan materi yang di-bookmark untuk ditampilkan di kartu ringkasan.
     */
    updateDashboardStats() {
        const todos = StorageManager.getTodos();
        const bookmarks = StorageManager.getBookmarks();

        const dashTodoCount = document.getElementById('dashTodoCount');
        const dashBookmarkCount = document.getElementById('dashBookmarkCount');

        if (dashTodoCount) dashTodoCount.textContent = todos.length;
        if (dashBookmarkCount) dashBookmarkCount.textContent = bookmarks.length;
    },

    /**
     * 2. TAMBAHKAN FUNGSI INI DI BAGIAN BAWAH OBJEK AppController
     * Inisialisasi Fitur Random Quotes di Dashboard beserta animasi transisinya.
     */
    initRandomQuote() {
        const quoteTextEl = document.getElementById('quoteText');
        const quoteAuthorEl = document.getElementById('quoteAuthor');
        const refreshBtn = document.getElementById('refreshQuoteBtn');
        const quoteCard = document.querySelector('.card-quote');

        if (!quoteTextEl || !quoteAuthorEl) return;

        const displayRandomQuote = () => {
            const quotes = typeof QUOTES_DATA !== 'undefined' ? QUOTES_DATA : [];
            if (quotes.length === 0) {
                quoteTextEl.textContent = '"Tetap semangat dan konsisten mengejar impianmu!"';
                quoteAuthorEl.textContent = '- Portal Belajar';
                return;
            }

            const randomIndex = Math.floor(Math.random() * quotes.length);
            const selected = quotes[randomIndex];

            quoteTextEl.textContent = `"${selected.quote}"`;
            quoteAuthorEl.textContent = `- ${selected.author}`;
        };

        // Tampilkan quote saat pertama kali dimuat
        displayRandomQuote();

        // Event listener saat tombol acak diklik dengan efek transisi halus
        if (refreshBtn && quoteCard) {
            refreshBtn.addEventListener('click', () => {
                quoteCard.style.opacity = '0';
                quoteCard.style.transform = 'translateY(4px)';
                
                setTimeout(() => {
                    displayRandomQuote();
                    quoteCard.style.opacity = '1';
                    quoteCard.style.transform = 'translateY(0)';
                }, 200);
            });
        }
    }
};