📚 Portal Belajar SMA & Portofolio Siswa PWA
Portal Belajar SMA adalah aplikasi web berbasis Progressive Web App (PWA) yang dirancang khusus untuk membantu siswa SMA mempersiapkan diri menghadapi ujian sekolah, asesmen nasional, dan persiapan UTBK / SNBT.
Aplikasi ini menyajikan ringkasan materi, cheat sheet rumus cepat, flashcard interaktif, kuis latihan mandiri, hingga manajemen target harian (To-Do List) yang langsung terintegrasi dengan database materi di Google Drive.

🌟 Fitur Utama
🏠 Dashboard Motivasi & Tracker: Menampilkan kuotasi motivasi harian yang diacak secara otomatis (Random Quotes), ringkasan statistik tugas harian, serta akses instan ke Google Drive utama.
📖 16 Mata Pelajaran SMA: Modul materi terstruktur untuk 16 mapel (Matematika Wajib/Lanjut, Bahasa Indonesia, Bahasa Inggris, Fisika, Kimia, Biologi, Ekonomi, Geografi, Sosiologi, Sejarah, PPKn, Informatika, dll.) lengkap dengan link folder Google Drive materi & latihan soal.
📑 Modal Cheat Sheet & Detail: Rangkuman rumus cepat, tips & trik menjawab soal SNBT, serta fitur bookmark materi.
⚡ Smart Quiz & Interactive Flashcard: Modul latihan interaktif mencakup flashcard hafalan konsep, generator soal hitungan otomatis (Matematika & Fisika), serta sistem evaluasi kesalahan (Review Mistakes).
📅 To-Do List & Target SNBT: Pengelola tugas harian, proyek sekolah, dan target bab dengan penanda tenggat waktu (deadline).
🔥 Streak Tracker: Fitur pelacak konsistensi hari belajar secara beruntun (Daily Streak) menggunakan penyimpanan lokal (LocalStorage).
🌙 Dark Mode Support: Mode tampilan gelap yang nyaman untuk belajar di malam hari.
📱 Progressive Web App (PWA): Dapat diinstal di perangkat ponsel (Android/iOS) maupun PC dan mendukung akses offline dengan Service Worker (sw.js).

🛠️ Arsitektur & Teknologi
Aplikasi ini dibangun menggunakan pendekatan Vanilla Web Stack yang sangat ringan, cepat, dan tanpa dependency library eksternal berat:
Frontend: HTML5, CSS3 (Modular Layout, CSS Variables, Responsive Grid & Flexbox)
Logic & Functionality: Vanilla JavaScript ES6 Modules
Database Materi & File: Google Drive Integration
Storage Management: Browser LocalStorage API
Offline Capabilities: Web App Manifest (manifest.json) & Service Worker (sw.js)

📁 Struktur Direktori Proyek

portal-belajar/
├── index.html              # Entry point utama aplikasi (SPA Layout)
├── manifest.json           # Konfigurasi PWA (Web App Manifest)
├── sw.js                   # Service Worker untuk dukungan offline & caching
├── README.md               # Dokumentasi proyek
├── css/
│   ├── style.css           # Tata letak & kerangka CSS dasar
│   ├── components.css      # Styling komponen (Card, Button, Modal, Quiz, Form)
│   └── darkmode.css        # Variabel & aturan warna Mode Gelap (Dark Mode)
├── js/
│   ├── app.js              # Controller utama (Navigasi SPA, Theme Toggle, Quote)
│   ├── storage.js          # Module pengelola LocalStorage (Bookmarks, Todos, Streak)
│   ├── quiz-generator.js   # Generator soal hitungan, flashcard, & evaluasi kuis
│   ├── planner-streak.js   # Logika To-Do List & penghitung streak harian
│   └── subjects.js         # Renderer kartu mata pelajaran & modal cheat sheet
├── data/
│   ├── quotes-data.js      # Database koleksi quote motivasi belajar
│   ├── subjects-data.js    # Database mapel, deskripsi, topik, & link Google Drive
│   └── cheatsheets.js      # Database rumus cepat & ringkasan materi SNBT
└── assets/
    └── icons/              # Ikon PWA


🌐 1. Akses Online (Production / Live)
Siswa maupun penguji dapat langsung mengakses aplikasi yang sudah ter-deploy secara online tanpa perlu mengunduh atau menginstal file apa pun di perangkat.
URL Portal Belajar: https://portalbelajarsma.vercel.app
Dukungan PWA (Progressive Web App): Karena dijalankan lewat protokol https://, fitur PWA seperti Service Worker (sw.js). Offline Mode, dan opsi Install App ke layar utama ponsel/laptop dapat berfungsi 100% secara optimal.

💻 2. Akses Lokal (Development / Offline)
Jika Anda ingin mengembangkan, mengedit kode, atau menguji perubahan secara langsung di komputer lokal, proyek ini bisa dijalankan secara lokal dengan langkah-langkah berikut:

⚠️ Catatan Penting
Jangan membuka file index.html dengan cara klik ganda (double-click) langsung dari File Explorer (protokol file:///), karena browser akan memblokir pendaftaran Service Worker (sw.js). Gunakan Local Web Server agar protokol bertukar menjadi http://localhost.

Cara Jalankan di Lokal:
Menggunakan Extension Live Server (VS Code - Direkomendasikan):
1.Buka folder portal-belajar/ di Visual Studio Code
2.Pastikan ekstensi Live Server sudah terpasang
3.Klik kanan pada file index.html, lalu pilih "Open with Live Server"
4.Web akan otomatis terbuka di browser pada alamat [http://127.0.0.1:5500](http://127.0.0.1:5500)

Menggunakan Node.js / Python Server (Opsional):
1.Jika menggunakan Python: Jalankan perintah python -m http.server 8000 di terminal folder proyek, lalu buka http://localhost:8000 pada browser.

📌 Status Progres Pengembangan (80%)
[x] Struktur Tampilan SPA (Single Page Application)
[x] Sistem Navigasi & Sidebar Responsive
[x] Fitur Switch Theme / Dark Mode
[x] Pengelola Storage (Bookmark, To-Do, Streak Counter)
[x] Integrasi Database 16 Mata Pelajaran & Google Drive Links
[x] Modul To-Do List & Target SNBT
[x] Widget Motivasi & Random Quotes
[x] PWA Manifest & Service Worker Caching
[ ] [In Progress] Penyempurnaan Bank Soal Kuis Hitungan Otomatis
[ ] [In Progress] Penambahan materi dan shortcut rumus Link Drive Materi Spesifik
[ ] [In Progress] Fitur feedback pengguna 
[ ] [In Progress] Fitur random quotes

👨‍💻 Pengembang
Developer: acil_dev
Role: Full-stack Frontend Developer & UI/UX Designer
Dibuat dengan semangat untuk membantu kemajuan pendidikan siswa SMA di Indonesia! 🇮🇩