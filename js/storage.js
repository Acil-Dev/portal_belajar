/**
 * js/storage.js - Modul Pengelola LocalStorage Portal Belajar SMA
 * Fungsi: Menyediakan fungsi utilitas global untuk menyimpan, mengambil, 
 * dan memanipulasi data aplikasi (todos, reminders, bookmarks, streak, kuis)
 * ke dalam memori LocalStorage browser secara aman dan terstruktur.
 */

const StorageManager = {
    // Kunci / Keys standar yang digunakan dalam LocalStorage
    KEYS: {
        TODOS: 'portal_todos',
        BOOKMARKS: 'portal_bookmarks',
        STREAK: 'portal_streak',
        QUIZ_HISTORY: 'portal_quiz_history',
        THEME: 'portal_theme'
    },

    /**
     * Fungsi Umum: Mengambil data dari LocalStorage berdasarkan key
     * @param {string} key - Kunci penyimpanan
     * @param {any} defaultValue - Nilai default jika data belum ada
     */
    get(key, defaultValue = []) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`[StorageManager] Gagal membaca key "${key}":`, error);
            return defaultValue;
        }
    },

    /**
     * Fungsi Umum: Menyimpan data ke LocalStorage berdasarkan key
     * @param {string} key - Kunci penyimpanan
     * @param {any} data - Data yang akan disimpan
     */
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`[StorageManager] Gagal menyimpan key "${key}":`, error);
            return false;
        }
    },

    // ==========================================
    // 1. MANAJEMEN TO-DO LIST & TARGET
    // ==========================================
    getTodos() {
        return this.get(this.KEYS.TODOS, []);
    },
    saveTodos(todos) {
        return this.save(this.KEYS.TODOS, todos);
    },

    // ==========================================
    // 2. MANAJEMEN BOOKMARKED NOTES (MATERI)
    // ==========================================
    getBookmarks() {
        return this.get(this.KEYS.BOOKMARKS, []);
    },
    saveBookmarks(bookmarks) {
        return this.save(this.KEYS.BOOKMARKS, bookmarks);
    },

    // ==========================================
    // 3. MANAJEMEN STREAK BELAJAR HARIAN
    // ==========================================
    getStreakData() {
        return this.get(this.KEYS.STREAK, { count: 0, lastDate: null });
    },
    saveStreakData(streakData) {
        return this.save(this.KEYS.STREAK, streakData);
    },

    // ==========================================
    // 4. MANAJEMEN RIWAYAT KUIS & REVIEW MISTAKES
    // ==========================================
    getQuizHistory() {
        return this.get(this.KEYS.QUIZ_HISTORY, { scores: [], mistakes: [] });
    },
    saveQuizHistory(historyData) {
        return this.save(this.KEYS.QUIZ_HISTORY, historyData);
    },

    // ==========================================
    // 5. MANAJEMEN PREFERENSI TEMA (LIGHT/DARK)
    // ==========================================
    getTheme() {
        return localStorage.getItem(this.KEYS.THEME) || 'light';
    },
    saveTheme(theme) {
        return localStorage.setItem(this.KEYS.THEME, theme);
    }
};