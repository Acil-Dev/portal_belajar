/**
 * ================================================================= *
 * FILE: data/cheatsheets.js
 * PENGELOLA DATA: Kumpulan Cheat Sheet (Ringkasan Rumus & Materi Cepat)
 * ================================================================= *
 * Deskripsi: File ini berisi database objek yang memetakan ID mata  
 * khusus untuk Cheat Sheet.
 */

const CHEATSHEETS_DATA = {
    "matematika": {
        title: "Cheat Sheet Matematika Wajib",
        description: "Ringkasan rumus cepat, trik pengerjaan untuk ujian.",
        driveUrl: "https://drive.google.com/drive/folders/1ba7sibnq9lCbVB3vd59HbcDVVJrS27kR"
    },
    "matematika-lanjut": {
        title: "Cheat Sheet Matematika Tingkat Lanjut",
        description: "Kumpulan rumus vektor, trigonometri lanjut, dan kalkulus.DLL",
        driveUrl: "https://drive.google.com/drive/folders/15AQpux5iaErI9FWFb3_EdzrlQra41l_i"
    },
    "bahasa-indonesia": {
        title: "Cheat Sheet Bahasa Indonesia Wajib",
        description: "Pola kalimat baku, EYD, penalaran paragraf, dan analisis teks sastra.",
        driveUrl: "https://drive.google.com/drive/folders/1OaS2pu93rV9IpQ95n21g494ixE0NDh3s"
    },
    "bahasa-indonesia-lanjut": {
        title: "Cheat Sheet Bahasa Indonesia Tingkat Lanjut",
        description: "Kebahasaan tingkat lanjut dan struktur esai ilmiah.",
        driveUrl: "https://drive.google.com/drive/folders/1HfX3zJn2l3uU4w59mzjig8eQ0fSx2Ygc"
    },
    "bahasa-inggris": {
        title: "Cheat Sheet Bahasa Inggris Wajib",
        description: "Rumus tenses, grammar patterns, dan pola soal reading comprehension.",
        driveUrl: "https://drive.google.com/drive/folders/1G-ODjMIs_MpmsWbWMOC1aWsTpuNKch4q"
    },
    "bahasa-inggris-lanjut": {
        title: "Cheat Sheet Bahasa Inggris Tingkat Lanjut",
        description: "Advanced vocabulary, idioms, dan struktur teks kompleks.",
        driveUrl: "https://drive.google.com/drive/folders/1tW6m9RWmCrFOJH_LzRGZkEJEjY-DRK9P"
    },
    "fisika": {
        title: "Cheat Sheet Fisika",
        description: "Rumus praktis mekanika, termodinamika, listrik magnet, dan optik.DLL",
        driveUrl: "https://drive.google.com/drive/folders/1V4V_vSwejuzqoC4YwsKIYyruChxQJU0u"
    },
    "kimia": {
        title: "Cheat Sheet Kimia",
        description: "Tabel periodik ringkas, stoikiometri, laju reaksi, dan kesetimbangan kimia.DLL",
        driveUrl: "https://drive.google.com/drive/folders/1iwaPSiOvjARtHzXrmoPV3CqACNd0DOGp"
    },
    "biologi": {
        title: "Cheat Sheet Biologi",
        description: "Peta konsep sel, genetika, metabolisme, dan sistem organ manusia.DLL",
        driveUrl: "https://drive.google.com/drive/folders/12ZYQ81Kx1D-s1DOJU_yFUAGConV-vYny"
    },
    "ekonomi": {
        title: "Cheat Sheet Ekonomi",
        description: "Kurva penawaran-permintaan, akuntansi dasar, dan rumus makroekonomi.",
        driveUrl: "https://drive.google.com/drive/folders/135us5sFO9qaYkFat5MLB90ODDx4_JVdD"
    },
    "geografi": {
        title: "Cheat Sheet Geografi",
        description: "Konsep SIG, penginderaan jauh, litosfer, hidrosfer, dan meteorologi.DLL",
        driveUrl: "https://drive.google.com/drive/folders/1n2wZ__Hw4hz70M1t4wLmHw6X5WMV6p7A"
    },
    "sosiologi": {
        title: "Cheat Sheet Sosiologi",
        description: "Teori sosiolog klasik, stratifikasi sosial, mobilitas, dan konflik sosial.",
        driveUrl: "https://drive.google.com/drive/folders/1w4U1L13QmEkGrEnA-nCdP7gqVxqkYQt0"
    },
    "sejarah": {
        title: "Cheat Sheet Sejarah",
        description: "Kronologi peristiwa dunia, sejarah nasional, dan tokoh penting kemerdekaan.",
        driveUrl: "https://drive.google.com/drive/folders/1ohQK_15RnO-OqzIUWbkDyhQGLRhdN-6d"
    },
    "ppkn": {
        title: "Cheat Sheet PPKn",
        description: "Undang-undang dasar, sistem pemerintahan, pancasila, dan hak asasi manusia.DLL",
        driveUrl: "https://drive.google.com/drive/folders/1kWTerojQrDt9ef6hMHKAptcX3uk2mSyM"
    },
    "informatika": {
        title: "Cheat Sheet Informatika",
        description: "Konsep dasar berpikir komputasional, algoritma, dan pemrograman.",
        driveUrl: "https://drive.google.com/drive/folders/1E2fEx38ebWMuFwh3zfVdWKVuNKj-JKua"
    },
    "sejarah-tingkat-lanjut": {
        title: "Cheat Sheet Sejarah Tingkat Lanjut",
        description: "Analisis historiografi dan peristiwa sejarah dunia modern.DLL",
        driveUrl: "https://drive.google.com/drive/folders/172-Q94Bib2Na5DxIOgyO-E_q3DmPxtKk"
    }
};

// Pendaftaran Global Objek Data (Mendukung kedua variasi penulisan agar bebas error)
if (typeof window !== 'undefined') {
    window.CHEATSHEETS_DATA = CHEATSHEETS_DATA;
    window.CHEATSHEET_DATA = CHEATSHEETS_DATA; // Alias pengaman anti ReferenceError
}