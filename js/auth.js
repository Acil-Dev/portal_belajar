/**
 * =====================================================================
 * MODUL OTENTIKASI & KEAMANAN (js/auth.js)
 * =====================================================================
 * Fungsi Utama: Membatasi akses awal ke Portal Belajar menggunakan 
 * sistem password global berbasis sessionStorage. Mencegah akses unduhan 
 * atau link drive mentah tanpa izin dari pemilik portal.
 */

class AuthManager {
    constructor() {
        // Konfigurasi Password & Key Sesi Browser
        this.correctPassword = "RUMAHBELAJAR"; // Bisa kamu ubah sewaktu-waktu ke "belajarbersama" atau lainnya
        this.storageKey = "portal_auth_logged_in";
        this.adminWhatsApp = "6285119514392"; // Format nomor WA internasional tanpa tanda '+'
        
        // Jalankan pengecekan keamanan saat skrip dimuat pertama kali
        this.init();
    }

    /**
     * Fungsi: Inisialisasi awal pengecekan status login pengguna.
     */
    init() {
        if (!this.isLoggedIn()) {
            this.injectPasswordModal();
        }
    }

    /**
     * Fungsi: Memeriksa apakah sesi aktif pengguna saat ini sudah tervalidasi.
     * Mengembalikan nilai boolean (true/false).
     */
    isLoggedIn() {
        return sessionStorage.getItem(this.storageKey) === "true";
    }

    /**
     * Fungsi: Membuat, merender, dan menyisipkan tampilan Modal Password (Overlay)
     * secara dinamis ke dalam dokumen HTML (DOM) untuk mencegat akses utama.
     */
    injectPasswordModal() {
        // Mencegah duplikasi modal jika sudah terpanggil sebelumnya
        if (document.getElementById('authModalOverlay')) return;

        const modalHTML = `
            <div id="authModalOverlay" style="
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(15, 23, 42, 0.88); backdrop-filter: blur(10px);
                display: flex; justify-content: center; align-items: center; z-index: 99999;
                font-family: inherit; opacity: 0; transition: opacity 0.3s ease;
            ">
                <div style="
                    background: var(--bg-primary, #ffffff); padding: 35px 25px; border-radius: 20px;
                    width: 90%; max-width: 380px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
                    text-align: center; border: 1px solid var(--border-color, rgba(255,255,255,0.1));
                ">
                    <div style="
                        width: 64px; height: 64px; background: var(--bg-secondary, #f1f5f9); 
                        border-radius: 50%; display: flex; align-items: center; justify-content: center;
                        font-size: 28px; margin: 0 auto 15px auto; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
                    ">🔒</div>
                    
                    <h2 style="margin-bottom: 8px; color: var(--text-main, #1e293b); font-size: 20px; font-weight: 700;">
                        Portal Terkunci
                    </h2>
                    <p style="color: var(--text-muted, #64748b); font-size: 13px; margin-bottom: 24px; line-height: 1.5;">
                        Masukkan password akses untuk membuka Portal Belajar
                    </p>
                    
                    <form id="authForm">
                        <div style="margin-bottom: 15px;">
                            <input type="password" id="authPasswordInput" placeholder="Masukkan Password..." required style="
                                width: 100%; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border-color, #cbd5e1);
                                background: var(--bg-secondary, #f8fafc); color: var(--text-main, #0f172a); font-size: 15px;
                                outline: none; box-sizing: border-box; transition: border-color 0.2s;
                            ">
                        </div>
                        <button type="submit" style="
                            width: 100%; padding: 12px; background: var(--primary, #4f46e5); color: white;
                            border: none; border-radius: 10px; font-weight: 600; font-size: 15px; cursor: pointer;
                            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); transition: opacity 0.2s, transform 0.1s;
                        ">Buka Portal</button>
                    </form>

                    <div style="margin-top: 20px; font-size: 13px; border-top: 1px solid var(--border-color, #f1f5f9); pt: 15px; padding-top: 15px;">
                        <a href="https://wa.me/${this.adminWhatsApp}?text=Halo%20Admin,%20saya%20lupa%20password%20akses%20Portal%20Belajar.%20Boleh%20minta%20aksesnya?" 
                           target="_blank" style="color: var(--primary, #4f46e5); text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; gap: 5px;">
                            💬 Lupa Password? Chat Admin (WA)
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Munculkan efek transisi fade-in halus
        setTimeout(() => {
            document.getElementById('authModalOverlay').style.opacity = '1';
        }, 10);

        // Tangkap elemen form dan input untuk event listener verifikasi
        const authForm = document.getElementById('authForm');
        const passwordInput = document.getElementById('authPasswordInput');

        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.verifyPassword(passwordInput.value);
        });

        // Fokus otomatis ke kotak input password
        setTimeout(() => passwordInput.focus(), 150);
    }

    /**
     * Fungsi: Memvalidasi kecocokan password yang diinput dengan password sistem.
     * Jika benar, menyimpan status ke sessionStorage dan menutup modal.
     */
    verifyPassword(inputVal) {
        const passwordInput = document.getElementById('authPasswordInput');
        
        if (inputVal === this.correctPassword) {
            // Set status login ke sessionStorage (hilang otomatis jika tab browser ditutup)
            sessionStorage.setItem(this.storageKey, "true");
            
            // Animasi tutup modal
            const overlay = document.getElementById('authModalOverlay');
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        } else {
            // Penanganan jika password salah
            alert('Password salah, teman Silakan cek kembali atau hubungi nomor WhatsApp admin.');
            passwordInput.value = '';
            passwordInput.focus();
            
            // Efek getar/animasi kecil pada input (opsional penanda error)
            passwordInput.style.borderColor = '#ef4444';
            setTimeout(() => {
                passwordInput.style.borderColor = 'var(--border-color, #cbd5e1)';
            }, 1000);
        }
    }
}

// Inisialisasi otomatis objek AuthManager saat dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});