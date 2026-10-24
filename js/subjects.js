/**
 * js/subjects.js - Modul Render Mata Pelajaran & Fitur Interaktif
 * Fungsi: Merender daftar mata pelajaran, mengelola pencarian, filter kategori,
 * tombol bookmark, modal cheat sheet, serta tautan unduh materi Google Drive yang responsif.
 */

const SubjectsManager = {
    init() {
        this.renderSubjectCards(SUBJECTS_DATA);
        this.initSearchAndFilter();
        this.initBookmarkView();
        this.initBookmarkNavigationListener();
    },

    /**
     * Merender kartu mata pelajaran ke dalam grid container dengan UI yang ditingkatkan
     * @param {Array} data - Array data mata pelajaran
     */
    renderSubjectCards(data) {
        const gridContainer = document.getElementById('subjectsGridContainer');
        if (!gridContainer) return;

        gridContainer.innerHTML = '';

        if (data.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <p>🔍 Mata pelajaran yang Anda cari tidak ditemukan.</p>
                </div>
            `;
            return;
        }

        const currentBookmarks = StorageManager.getBookmarks();

        data.forEach(subject => {
            const isBookmarked = currentBookmarks.includes(subject.id);
            const bookmarkIcon = isBookmarked ? '⭐' : '☆';
            const bookmarkClass = isBookmarked ? 'bookmarked' : '';

            // Validasi link drive agar tombol unduh aman dan aktif langsung
            const hasDrive = subject.driveUrl && subject.driveUrl.trim() !== '';
            const driveHref = hasDrive ? subject.driveUrl : '#';
            const driveClass = hasDrive ? 'btn-primary' : 'btn-disabled';
            const driveAttr = hasDrive ? `href="${driveHref}" target="_blank" rel="noopener noreferrer"` : `onclick="alert('Tautan Google Drive untuk ${subject.name} belum tersedia.'); return false;"`;

            const card = document.createElement('div');
            card.className = 'subject-card animate-fade';
            card.innerHTML = `
                <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span class="subject-icon" style="font-size: 2rem;">${subject.icon}</span>
                    <button class="bookmark-btn ${bookmarkClass}" data-id="${subject.id}" title="Tandai sebagai favorit" style="background: none; border: none; font-size: 1.25rem; cursor: pointer; transition: transform 0.2s;">
                        ${bookmarkIcon}
                    </button>
                </div>
                <h3 style="margin-bottom: 8px; font-size: 1.1rem; font-weight: 600;">${subject.name}</h3>
                <span class="badge-category" style="display: inline-block; padding: 4px 10px; font-size: 0.75rem; border-radius: 20px; background: var(--bg-badge, #e2e8f0); color: var(--text-badge, #475569); margin-bottom: 10px;">${subject.category}</span>
                <p class="subject-desc" style="font-size: 0.9rem; color: var(--text-muted, #64748b); margin-bottom: 16px; line-height: 1.4;">${subject.description}</p>
                <div class="card-footer" style="display: flex; gap: 8px; margin-top: auto;">
                    <button class="btn-sm btn-outline cheatsheet-trigger" data-id="${subject.id}" style="flex: 1; padding: 8px 12px; border-radius: 8px; cursor: pointer;">💡 Cheat Sheet</button>
                    <a ${driveAttr} class="btn-sm ${driveClass}" style="flex: 1; padding: 8px 12px; border-radius: 8px; text-align: center; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 4px; font-weight: 500;">📥 Unduh</a>
                </div>
            `;

            gridContainer.appendChild(card);
        });

        this.bindCardEvents();
    },

    /**
     * Mengikat event klik untuk tombol interaktif dalam kartu
     */
    bindCardEvents() {
        const gridContainer = document.getElementById('subjectsGridContainer');
        if (!gridContainer) return;

        gridContainer.addEventListener('click', (e) => {
            const target = e.target;
            const bookmarkBtn = target.closest('.bookmark-btn');
            const cheatBtn = target.closest('.cheatsheet-trigger');

            if (bookmarkBtn) {
                const subjectId = bookmarkBtn.getAttribute('data-id');
                if (subjectId) this.toggleBookmark(subjectId, bookmarkBtn);
            }

            if (cheatBtn) {
                const subjectId = cheatBtn.getAttribute('data-id');
                if (subjectId) {
                    if (typeof CheatsheetManager !== 'undefined' && CheatsheetManager.openModal) {
                        CheatsheetManager.openModal(subjectId);
                    } else {
                        this.openSimpleCheatsheetModal(subjectId);
                    }
                }
            }
        });
    },

    /**
     * Logika simpan/hapus Bookmark
     */
    toggleBookmark(subjectId, buttonElement) {
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

        if (typeof AppController !== 'undefined' && AppController.updateDashboardStats) {
            AppController.updateDashboardStats();
        }

        this.renderBookmarkedView();
    },

    /**
     * Modal cadangan untuk Cheat Sheet jika modul utama belum dipasang
     */
    openSimpleCheatsheetModal(subjectId) {
        const subject = SUBJECTS_DATA.find(s => s.id === subjectId);
        if (!subject) return;

        const cheatData = typeof CHEATSHEETS_DATA !== 'undefined' ? CHEATSHEETS_DATA[subjectId] : null;
        const modal = document.getElementById('subjectDetailModal');
        const modalTitle = document.getElementById('modalSubjectTitle');
        const modalBody = document.getElementById('modalSubjectBody');

        if (modal && modalTitle && modalBody) {
            modalTitle.innerHTML = `${subject.icon} Ringkasan: ${subject.name}`;
            if (cheatData) {
                modalBody.innerHTML = `
                    <h4 style="margin-bottom: 8px;">📌 Tips SNBT</h4>
                    <p style="margin-bottom: 12px;">${cheatData.tips || 'Pahami konsep dasar materi ini.'}</p>
                    <h4 style="margin-bottom: 8px;">📐 Rumus & Poin Penting:</h4>
                    <ul style="padding-left: 20px;">
                        ${cheatData.formulas ? cheatData.formulas.map(f => `<li style="margin-bottom: 4px;"><code>${f}</code></li>`).join('') : '<li>Tidak ada rumus khusus.</li>'}
                    </ul>
                `;
            } else {
                modalBody.innerHTML = `<p>Ringkasan materi untuk <strong>${subject.name}</strong> sedang disiapkan.</p>`;
            }
            modal.style.display = 'block';

            const closeBtn = document.getElementById('closeSubjectModal');
            if (closeBtn) {
                closeBtn.onclick = () => modal.style.display = 'none';
            }
        } else {
            alert(`Membuka Cheat Sheet untuk ${subject.name}`);
        }
    },

    /**
     * Pengelola Pencarian & Filter Kategori
     */
    initSearchAndFilter() {
        const searchInput = document.getElementById('subjectSearchInput');
        const filterButtons = document.querySelectorAll('.filter-btn, .filter-pill');

        let currentCategory = 'Semua';
        let searchQuery = '';

        const filterData = () => {
            let filtered = SUBJECTS_DATA;

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

    /**
     * Listener navigasi sidebar agar daftar bookmark otomatis dirender ulang saat menu diklik
     */
    initBookmarkNavigationListener() {
        const navButtons = document.querySelectorAll('.nav-item');
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === 'bookmarks-view') {
                btn.addEventListener('click', () => {
                    this.renderBookmarkedView();
                });
            }
        });
    },

    renderBookmarkedView() {
        // Menggunakan ID 'bookmarksContainer' yang sesuai dengan index.html
        const bookmarkContainer = document.getElementById('bookmarksContainer');
        if (!bookmarkContainer) return;

        const bookmarkedIds = StorageManager.getBookmarks();
        const bookmarkedSubjects = SUBJECTS_DATA.filter(item => bookmarkedIds.includes(item.id));

        bookmarkContainer.innerHTML = '';

        if (bookmarkedSubjects.length === 0) {
            bookmarkContainer.innerHTML = `
                <div class="empty-state" style="padding: 30px; text-align: center; color: var(--text-muted); grid-column: 1 / -1;">
                    <p style="font-size: 1.1rem; margin-bottom: 8px;">📭 Belum ada materi atau mata pelajaran yang di-bookmark.</p>
                    <small>Klik ikon bintang (⭐) pada kartu mata pelajaran di menu 16 Mata Pelajaran untuk menyimpannya di sini.</small>
                </div>
            `;
            return;
        }

        bookmarkedSubjects.forEach(subject => {
            const itemEl = document.createElement('div');
            itemEl.className = 'bookmark-item-card';
            itemEl.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--bg-card, #fff); border: 1px solid var(--border-color, #e2e8f0); border-radius: 12px; margin-bottom: 12px;";
            itemEl.innerHTML = `
                <div class="item-info" style="display: flex; align-items: center; gap: 14px;">
                    <span style="font-size: 2rem;">${subject.icon}</span>
                    <div>
                        <h4 style="margin: 0 0 4px 0; font-size: 1.1rem; font-weight: 600;">${subject.name}</h4>
                        <span class="badge-category" style="font-size: 0.75rem; padding: 3px 10px; background: var(--bg-badge, #e2e8f0); border-radius: 12px; color: var(--text-badge, #475569);">${subject.category}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <a href="${subject.driveUrl || '#'}" target="_blank" class="btn-sm btn-primary" style="padding: 8px 14px; border-radius: 8px; text-decoration: none; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 4px;">📥 Unduh</a>
                    <button class="btn-sm btn-danger remove-bookmark" data-id="${subject.id}" style="padding: 8px 14px; border-radius: 8px; cursor: pointer; background: #ef4444; color: white; border: none; font-size: 0.85rem;">Hapus</button>
                </div>
            `;

            itemEl.querySelector('.remove-bookmark').addEventListener('click', () => {
                this.toggleBookmark(subject.id, { classList: { remove: () => {} }, textContent: '' });
            });

            bookmarkContainer.appendChild(itemEl);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (typeof SUBJECTS_DATA !== 'undefined') {
        SubjectsManager.init();
    }
});