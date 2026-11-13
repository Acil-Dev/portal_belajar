/**
 * ============================================================================
 * EBOOKS-DATA.JS - Database Pustaka Digital & Bimbel Alternatif
 * ============================================================================
 * Fungsi: Menyimpan array objek yang menampung daftar modul, ebook, dan link 
 * Google Drive dari berbagai sumber bimbel online terkemuka (Ruang Guru, Inten, 
 * Zenius, dll). Dirancang modular agar mudah di-debug jika ada link yang mati.
 */

const EBOOKS_DATA = [
    {
        id: "ruang-guru",
        title: "Modul & Rangkuman UTBK - Ruang Guru",
        category: "Bimbel Online",
        description: "Kumpulan modul belajar pilihan, ringkasan materi, dan bank soal lengkap dari Ruang Guru.",
        link: "https://drive.google.com/drive/folders/1IzG1NWZ6CJlNbM89ucevGbrxeblh-JAK?usp=drive_link",
        badgeColor: "blue",
        icon: "📘"
    },
    {
        id: "inten",
        title: "Bank Soal & Bedah Taktik - INTEN",
        category: "Bimbel Legendaris",
        description: "Dokumen soal penalaran tingkat lanjut dan strategi cepat, tepat, akurat ala INTEN.",
        link: "https://drive.google.com/drive/folders/16IQYiS0OFR4Tj5jaUNx_us6u7wU9-6Nj?usp=drive_link",
        badgeColor: "orange",
        icon: "📙"
    },
    {
        id: "zenius",
        title: "Arsip Konsep Dasar - Zenius",
        category: "Konsep Fundamental",
        description: "Kumpulan konsep fundamental matematika, saintek, dan soshum dari arsip Zenius.",
        link: "https://drive.google.com/drive/folders/1XMeB5S2O26ZIOsQZp_YjtfoTiPNfAs8s?usp=drive_link",
        badgeColor: "purple",
        icon: "📗"
    },
    {
        id: "cerebrum",
        title: "Modul UTBK & Skolastik - Cerebrum",
        category: "Bimbel Skolastik",
        description: "Fokus latihan Tes Potensi Skolastik (TPS) dan literasi lengkap dari Cerebrum.",
        link: "https://drive.google.com/drive/folders/19A6KVgyz0SDLBiEZkmDam3HeXVMlHvSS?usp=drive_link",
        badgeColor: "green",
        icon: "📕"
    },
    {
        id: "pahamify",
        title: "Rangkuman Visual - Pahamify",
        category: "Infografis & Materi",
        description: "Ringkasan materi belajar berbentuk visual dan infografis interaktif khas Pahamify.",
        link: "https://drive.google.com/drive/folders/1s864D6WVf9QIIrIYNnUZ4m2myA3Y-XC1?usp=drive_link",
        badgeColor: "teal",
        icon: "📔"
    },
    {
        id: "eduka",
        title: "Latihan UTBK - Eduka System",
        category: "Tryout & Modul",
        description: "Kumpulan tryout, pembahasan soal, dan modul belajar intensif dari Eduka System.",
        link: "https://drive.google.com/drive/folders/1gczldi6KEK-v3PsRB1G7cXopYE_TS0zR?usp=drive_link",
        badgeColor: "red",
        icon: "📓"
    },
    {
        id: "wangsit",
        title: "Bocoran Soal Asli - Wangsit Education",
        category: "Bank Soal Legendaris",
        description: "Kumpulan rumus cepat dan bedah soal-soal asli dari buku Wangsit Education.",
        link: "https://drive.google.com/drive/folders/1E5ai19CffBxpv3sHW7J9Rc4W6nFOu4My?usp=drive_link",
        badgeColor: "yellow",
        icon: "📚"
    },
    {
        id: "candubelajar",
        title: "Modul Belajar - Candi Belajar",
        category: "Bimbel Alternatif",
        description: "Modul ringkas dan padat materi penalaran untuk persiapan UTBK-SNBT.",
        link: "https://drive.google.com/drive/folders/1eEk_4eo2wOq2h3TeQYx1DWrus0toO-kk?usp=drive_link",
        badgeColor: "indigo",
        icon: "📖"
    },
    {
        id: "alternatifa",
        title: "Bank Modul - Alternatifa",
        category: "Sumber Alternatif",
        description: "Kumpulan bahan belajar dan referensi alternatif pilihan untuk pejuang kampus impian.",
        link: "https://drive.google.com/drive/folders/1ZeVpdRrGjyXV_QOOB8mE03huHewsEd2k?usp=drive_link",
        badgeColor: "pink",
        icon: "📑"
    }
];

/**
 * ============================================================================
 * GLOBAL EXPORT MAPPING
 * ============================================================================
 * Fungsi: Mendaftarkan variabel EBOOKS_DATA ke window object browser agar 
 * dapat dibaca dan dirender langsung oleh file pengendali utama (app.js).
 */
if (typeof window !== 'undefined') {
    window.EBOOKS_DATA = EBOOKS_DATA;
}
