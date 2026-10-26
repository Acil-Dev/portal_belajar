/**
 * ================================================================= *
 * FILE: js/subjects.js
 * MODUL: Pengelola Tampilan & Interaksi Mata Pelajaran
 * ================================================================= *
 * Deskripsi: Modul ini bertanggung jawab untuk merender daftar kartu 
 * mata pelajaran ke antarmuka web, menangani pencarian real-time, 
 * filter kategori, sistem bookmark (favorit), serta animasi transisi 
 * ketika tombol Unduh materi atau Cheat Sheet ditekan.
 */

const SubjectsManager = {
    /**
     * FUNGSI: init()
     * Inisialisasi awal saat modul dimuat. Memanggil fungsi render kartu,
     * pengaktifan pencarian/filter, dan event listener bookmark.
     */
    init() {
        this.renderSubjectCards(typeof SUBJECTS_DATA !== 'undefined' ? SUBJECTS_DATA : []);
        this.initSearchAndFilter();
        this.initBookmarkView();
        this.initBookmarkNavigationListener();
    },

    /**
     * FUNGSI: renderSubjectCards(data)
     * Membuat dan memasukkan elemen HTML kartu mata pelajaran ke dalam grid container.
     */
    renderSubjectCards(data) {
        const gridContainer = document.getElementById('subjectsGridContainer');
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        // KELAS / BLOK Kondisi: Jika data kosong / tidak ditemukan saat pencarian
        if (!data || data.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; background: var(--bg-card); border-radius: 16px; border: 1px dashed var(--border-color);">
                    <span style="font-size: 3rem; display: block; margin-bottom: 12px;">🔍</span>
                    <h3 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 6px; color: var(--text-main);">Mata Pelajaran Tidak Ditemukan</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Coba gunakan kata kunci lain atau pilih kategori berbeda.</p>
                </div>
            `;
            return;
        }

        const currentBookmarks = typeof StorageManager !== 'undefined' ? StorageManager.getBookmarks() : [];

        // KELAS / BLOK Perulangan: Iterasi setiap objek mata pelajaran untuk dirender
        data.forEach(subject => {
            const isBookmarked = currentBookmarks.includes(subject.id);
            const bookmarkIcon = isBookmarked ? '⭐' : '☆';
            const bookmarkClass = isBookmarked ? 'bookmarked' : '';

            const card = document.createElement('div');
            card.className = 'subject-card animate-fade';
            card.style.cssText = "background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; transition: all 0.3s ease; box-shadow: var(--card-shadow, 0 4px 6px -1px rgba(0,0,0,0.02));";
            
            card.innerHTML = `
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                    <div class="subject-icon-wrapper" style="width: 50px; height: 50px; border-radius: 12px; background: var(--bg-badge); display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">
                        ${subject.icon || '📚'}
                    </div>
                    <button class="bookmark-btn ${bookmarkClass}" data-id="${subject.id}" title="Tandai sebagai favorit" style="background: var(--bg-badge); border: 1px solid var(--border-color); width: 36px; height: 36px; border-radius: 50%; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--text-main);">
                        ${bookmarkIcon}
                    </button>
                </div>
                <h3 style="margin: 0 0 8px 0; font-size: 1.15rem; font-weight: 700; color: var(--text-main);">${subject.name}</h3>
                <span class="badge-category" style="align-self: flex-start; padding: 4px 12px; font-size: 0.75rem; font-weight: 600; border-radius: 20px; background: var(--bg-badge); color: var(--text-main); margin-bottom: 12px;">${subject.category}</span>
                <p class="subject-desc" style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5; flex-grow: 1;">${subject.description}</p>
                <div class="card-footer" style="display: flex; gap: 10px; margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border-color);">
                    <button class="btn-sm btn-outline cheatsheet-trigger" data-id="${subject.id}" style="flex: 1; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.85rem; border: 1px solid var(--border-color); background: transparent; color: var(--text-main);">💡 Cheat Sheet</button>
                    <button class="btn-sm btn-primary drive-trigger" data-url="${subject.driveUrl || ''}" data-name="${subject.name}" style="flex: 1; padding: 10px 14px; border-radius: 10px; cursor: pointer; text-align: center; font-weight: 600; font-size: 0.85rem; background: var(--primary); color: white; border: none;">📥 Unduh</button>
                </div>
            `;

            // Efek interaktif hover kartu menggunakan event listener mouse
            card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px)'; });
            card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0)'; });

            gridContainer.appendChild(card);
        });

        this.bindCardEvents();
    },

    /**
     * FUNGSI: triggerDriveAnimation(url, title)
     * Menampilkan overlay animasi loading elegan sebelum membuka tautan Google Drive di tab baru.
     */
    triggerDriveAnimation(url, title) {
        if (!url || url.trim() === '' || url === '#') {
            alert(`Tautan Google Drive untuk "${title}" belum tersedia.`);
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'drive-loader-overlay';
        overlay.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(6px); z-index: 99999; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-family: inherit; animation: fadeIn 0.2s ease;";
        
        overlay.innerHTML = `
            <div style="width: 55px; height: 55px; border: 4px solid rgba(255,255,255,0.15); border-top: 4px solid var(--primary, #3b82f6); border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 18px;"></div>
            <h3 style="margin: 0 0 6px 0; font-size: 1.25rem; font-weight: 600; color: #f8fafc;">Mempersiapkan Dokumen...</h3>
            <p style="margin: 0; color: #94a3b8; font-size: 0.95rem; text-align: center; padding: 0 20px;">Menghubungkan ke Google Drive untuk: <strong style="color: #38bdf8;">${title}</strong></p>
            <style>
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            </style>
        `;
        document.body.appendChild(overlay);

        // Jeda waktu 3 detik untuk animasi transisi mulus, lalu buka link drive
        setTimeout(() => {
            window.open(url, '_blank');
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 3000);
    },

    /**
     * FUNGSI: bindCardEvents()
     * Mengatur event klik delegasi untuk tombol Bookmark, Cheat Sheet (manggil cheatsheets.js), dan Unduh.
     */
    bindCardEvents() {
        const gridContainer = document.getElementById('subjectsGridContainer');
        if (!gridContainer) return;

        gridContainer.addEventListener('click', (e) => {
            const target = e.target;
            const bookmarkBtn = target.closest('.bookmark-btn');
            const cheatBtn = target.closest('.cheatsheet-trigger');
            const driveBtn = target.closest('.drive-trigger');

            // Penanganan klik tombol Bookmark
            if (bookmarkBtn) {
                const subjectId = bookmarkBtn.getAttribute('data-id');
                if (subjectId) this.toggleBookmark(subjectId, bookmarkBtn);
            }

            // Penanganan klik tombol Cheat Sheet (Mengambil data secara terpisah dari data/cheatsheets.js)
            if (cheatBtn) {
                const subjectId = cheatBtn.getAttribute('data-id');
                const subject = SUBJECTS_DATA.find(s => s.id === subjectId);
                if (subject) {
                    // Memanggil data dari file terpisah cheatsheets.js
                    const cheatData = (typeof CHEATSHEETS_DATA !== 'undefined') ? CHEATSHEETS_DATA[subjectId] : null;
                    const targetUrl = (cheatData && cheatData.driveUrl) ? cheatData.driveUrl : (subject.driveUrl || 'https://drive.google.com');
                    this.triggerDriveAnimation(targetUrl, `Cheat Sheet ${subject.name}`);
                }
            }

            // Penanganan klik tombol Unduh Materi Utama
            if (driveBtn) {
                const url = driveBtn.getAttribute('data-url');
                const name = driveBtn.getAttribute('data-name');
                this.triggerDriveAnimation(url, name);
            }
        });
    },

    /**
     * FUNGSI: toggleBookmark(subjectId, buttonElement)
     * Menyimpan atau menghapus status favorit mata pelajaran ke localStorage.
     */
    toggleBookmark(subjectId, buttonElement) {
        if (typeof StorageManager === 'undefined') return;
        let bookmarks = StorageManager.getBookmarks();
        const index = bookmarks.indexOf(subjectId);

        if (index > -1) {
            bookmarks.splice(index, 1);
            buttonElement.textContent = '☆';
            buttonElement.classList.remove('bookmarked');
        } else {
            bookmarks.push(subjectId);
            buttonElement.textContent = '⭐';
            buttonElement.classList.add('bookmarked');
        }

        StorageManager.saveBookmarks(bookmarks);
        this.renderBookmarkedView();
    },

    /**
     * FUNGSI: initSearchAndFilter()
     * Mengelola input pencarian teks secara real-time dan tombol filter kategori mapel.
     */
    initSearchAndFilter() {
        const searchInput = document.getElementById('subjectSearchInput');
        const filterButtons = document.querySelectorAll('.filter-btn, .filter-pill');

        let currentCategory = 'Semua';
        let searchQuery = '';

        const filterData = () => {
            let filtered = typeof SUBJECTS_DATA !== 'undefined' ? SUBJECTS_DATA : [];

            if (currentCategory && currentCategory !== 'Semua') {
                filtered = filtered.filter(item => item.category.toLowerCase() === currentCategory.toLowerCase());
            }

            if (searchQuery.trim() !== '') {
                filtered = filtered.filter(item => 
                    item.name.toLowerCase().includes(searchQuery) || 
                    item.description.toLowerCase().includes(searchQuery)
                );
            }

            this.renderSubjectCards(filtered);
        };

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase();
                filterData();
            });
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.getAttribute('data-category') || btn.getAttribute('data-filter') || 'Semua';
                filterData();
            });
        });
    },

    initBookmarkView() {
        this.renderBookmarkedView();
    },

    initBookmarkNavigationListener() {
        const navButtons = document.querySelectorAll('.nav-item');
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === 'bookmarks-view') {
                btn.addEventListener('click', () => { this.renderBookmarkedView(); });
            }
        });
    },

    /**
     * FUNGSI: renderBookmarkedView()
     * Merender daftar mata pelajaran yang telah ditandai sebagai favorit ke menu tersendiri.
     */
    renderBookmarkedView() {
        const bookmarkContainer = document.getElementById('bookmarksContainer');
        if (!bookmarkContainer) return;

        const bookmarkedIds = typeof StorageManager !== 'undefined' ? StorageManager.getBookmarks() : [];
        const allSubjects = typeof SUBJECTS_DATA !== 'undefined' ? SUBJECTS_DATA : [];
        const bookmarkedSubjects = allSubjects.filter(item => bookmarkedIds.includes(item.id));

        bookmarkContainer.innerHTML = '';

        if (bookmarkedSubjects.length === 0) {
            bookmarkContainer.innerHTML = `
                <div class="empty-state" style="padding: 40px; text-align: center; color: var(--text-muted); grid-column: 1 / -1; background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border-color);">
                    <p style="font-size: 1.1rem; margin-bottom: 8px; font-weight: 600; color: var(--text-main);">📭 Belum ada mata pelajaran favorit.</p>
                    <small>Klik ikon bintang (⭐) pada kartu mata pelajaran untuk menyimpannya di sini.</small>
                </div>
            `;
            return;
        }

        bookmarkedSubjects.forEach(subject => {
            const itemEl = document.createElement('div');
            itemEl.className = 'bookmark-item-card animate-fade';
            itemEl.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 14px; margin-bottom: 12px;";
            
            itemEl.innerHTML = `
                <div class="item-info" style="display: flex; align-items: center; gap: 16px;">
                    <span style="font-size: 2rem; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; background: var(--bg-badge); border-radius: 10px;">${subject.icon}</span>
                    <div>
                        <h4 style="margin: 0 0 4px 0; font-size: 1.1rem; font-weight: 700; color: var(--text-main);">${subject.name}</h4>
                        <span class="badge-category" style="font-size: 0.75rem; padding: 3px 10px; background: var(--bg-badge); border-radius: 12px; color: var(--text-main); font-weight: 600;">${subject.category}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button class="btn-sm btn-primary drive-trigger" data-url="${subject.driveUrl || ''}" data-name="${subject.name}" style="padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; font-weight: 600; background: var(--primary); color: white; border: none;">📥 Unduh</button>
                    <button class="btn-sm btn-danger remove-bookmark" data-id="${subject.id}" style="padding: 8px 16px; border-radius: 8px; cursor: pointer; background: #ef4444; color: white; border: none; font-size: 0.85rem; font-weight: 600;">Hapus</button>
                </div>
            `;

            itemEl.querySelector('.remove-bookmark').addEventListener('click', () => {
                this.toggleBookmark(subject.id, { classList: { remove: () => {} }, textContent: '' });
            });

            itemEl.querySelector('.drive-trigger').addEventListener('click', (e) => {
                const url = e.currentTarget.getAttribute('data-url');
                const name = e.currentTarget.getAttribute('data-name');
                this.triggerDriveAnimation(url, name);
            });

            bookmarkContainer.appendChild(itemEl);
        });
    }
};

// Pemicu inisialisasi modul saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    if (typeof SUBJECTS_DATA !== 'undefined') {
        SubjectsManager.init();
    }
});