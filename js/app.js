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
        this.initRandomQuote(); 
        this.initEbooks();
        this.initSupportView(); // <-- Pemanggilan fungsi Bantuan & Dukungan QRIS
        
        console.log('[AppController] Portal Belajar berhasil diinisialisasi.');
    },

    /**
     * Manajemen Tema (Light / Dark Mode)
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
        
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '☀️ <span class="toggle-text">Light Mode</span>';
        } else {
            themeToggleBtn.innerHTML = '🌙 <span class="toggle-text">Dark Mode</span>';
        }
    },    

    /**
     * Sistem Navigasi SPA (Single Page Application)
     */
    initNavigation() {
        const navButtons = document.querySelectorAll('.nav-item');
        const viewSections = document.querySelectorAll('.view-section');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-target');

                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                viewSections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });

                const sidebar = document.getElementById('sidebar');
                if (sidebar && sidebar.classList.contains('mobile-open')) {
                    sidebar.classList.remove('mobile-open');
                }
            });
        });
    },

    /**
     * Kontrol Sidebar Responsif (Mobile View)
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
     * Inisialisasi Tampilan Pustaka Digital Ebook
     */
    initEbooks() {
        const ebooksGridContainer = document.getElementById('ebooksGridContainer');
        const searchInput = document.getElementById('searchEbookInput');

        if (!ebooksGridContainer) return;

        const renderCards = (dataList) => {
            if (dataList.length === 0) {
                ebooksGridContainer.innerHTML = `<p class="text-muted" style="grid-column: 1/-1; text-align: center; padding: 20px;">Belum ada data ebook yang tersedia.</p>`;
                return;
            }

            let htmlContent = '';
            dataList.forEach(item => {
                const htmlContentku = `
                    <div class="card ebook-card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 20px; border-radius: 12px; background: var(--bg-card, #ffffff); border: 1px solid var(--border-color, #e2e8f0); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                        <div>
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
                                <span style="font-size: 24px;">${item.icon || '📚'}</span>
                                <div>
                                    <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: var(--primary, #4f46e5); background: rgba(79,70,229,0.1); padding: 2px 8px; border-radius: 4px;">${item.category}</span>
                                    <h4 style="margin: 6px 0 0 0; font-size: 16px; color: var(--text-main, #0f172a);">${item.title}</h4>
                                </div>
                            </div>
                            <p style="font-size: 13px; color: var(--text-muted, #64748b); line-height: 1.5; margin-bottom: 16px;">${item.description}</p>
                        </div>
                        <a href="${item.link}" target="_blank" class="btn-primary" style="text-align: center; text-decoration: none; padding: 10px; border-radius: 8px; font-size: 14px; font-weight: 600; background: var(--primary, #4f46e5); color: white; display: block;">
                            Buka Folder Drive ↗
                        </a>
                    </div>
                `;
                htmlContent += htmlContentku;
            });

            ebooksGridContainer.innerHTML = htmlContent;
        };

        const rawData = typeof EBOOKS_DATA !== 'undefined' ? EBOOKS_DATA : [];
        renderCards(rawData);

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const keyword = e.target.value.toLowerCase();
                const filtered = rawData.filter(item => 
                    item.title.toLowerCase().includes(keyword) || 
                    item.category.toLowerCase().includes(keyword) ||
                    item.description.toLowerCase().includes(keyword)
                );
                renderCards(filtered);
            });
        }
    },

    /**
     * Inisialisasi Fitur Random Quotes di Dashboard
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

        displayRandomQuote();

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
    },
    
    /**
     * Inisialisasi Tampilan Bantuan & Dukungan QRIS
     */
    initSupportView() {
        const data = window.SUPPORT_DATA;
        if (!data) return;

        const qrisTitle = document.getElementById('qrisTitle');
        const qrisDesc = document.getElementById('qrisDesc');
        const qrisImage = document.getElementById('qrisImage');
        const qrisNote = document.getElementById('qrisNote');
        const btnDownloadQris = document.getElementById('btnDownloadQris');
        const devWA = document.getElementById('devWA');
        const devEmail = document.getElementById('devEmail');

        if (qrisTitle) qrisTitle.textContent = data.qris.title;
        if (qrisDesc) qrisDesc.textContent = data.qris.description;
        if (qrisImage) qrisImage.src = data.qris.imageUrl;
        if (qrisNote) qrisNote.textContent = data.qris.note;
        if (btnDownloadQris) btnDownloadQris.href = data.qris.imageUrl;
        
        if (devWA) {
            devWA.href = `https://wa.me/${data.developer.whatsapp}?text=Halo%20Admin,%20saya%20ingin%20bertanya%20seputar%20Portal%20Belajar.`;
        }
        if (devEmail) {
            devEmail.href = `mailto:${data.developer.email}`;
        }

        const supportForm = document.getElementById('supportForm');
        if (supportForm) {
            supportForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const category = document.getElementById('supportCategory').value;
                const name = document.getElementById('supportName').value || 'Anonim';
                const message = document.getElementById('supportMessage').value;
                const btnSubmit = document.getElementById('btnSubmitSupport');
                const alertBox = document.getElementById('supportAlert');

                btnSubmit.disabled = true;
                btnSubmit.textContent = '⏳ Mengirim Data...';
                alertBox.style.display = 'none';

                try {
                    await fetch(data.gasEndpoint, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            category: category,
                            name: name,
                            message: message,
                            timestamp: new Date().toLocaleString()
                        })
                    });

                    alertBox.style.display = 'block';
                    alertBox.style.background = '#dcfce7';
                    alertBox.style.color = '#15803d';
                    alertBox.textContent = '🎉 Terima kasih! Data/pesanmu berhasil dikirim ke sistem developer.';

                    supportForm.reset();
                } catch (error) {
                    console.error('Gagal mengirim data dukungan:', error);
                    alertBox.style.display = 'block';
                    alertBox.style.background = '#fee2e2';
                    alertBox.style.color = '#b91c1c';
                    alertBox.textContent = '❌ Gagal terhubung ke server. Silakan hubungi developer via WhatsApp langsung.';
                } finally {
                    btnSubmit.disabled = false;
                    btnSubmit.textContent = '🚀 Kirim Pesan & Data';
                }
            });
        }
    }
};