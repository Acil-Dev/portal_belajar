/**
 * ============================================================================
 * SUPPORT-DATA.JS - Data Bantuan, Kontak Developer, & Info Donasi QRIS
 * ============================================================================
 * Fungsi: Menyimpan teks panduan, nomor WhatsApp, kontak, dan link endpoint GAS.
 */

const SUPPORT_DATA = {
    developer: {
        name: "Developer Portal Belajar",
        whatsapp: "6285119514392", // Sesuaikan dengan nomor WA kamu
        email: "support@portalbelajar.com"
    },
    qris: {
        title: "Dukung Pengembangan Portal Belajar 🚀",
        description: "Portal ini dibuat gratis untuk membantu pejuang UTBK-SNBT. Jika bermanfaat, berikan apresiasi donasi via QRIS di bawah ini untuk biaya operasional & server.",
        imageUrl: "assets/icons/qris-code.png", // Pastikan file gambar QRIS ada di path ini
        note: "Bisa discan pakai GoPay, OVO, Dana, ShopeePay, BCA, Mandiri, BRI, & semua aplikasi m-Banking/e-Wallet."
    },
    gasEndpoint: "https://script.google.com/macros/s/AKfycbytEeb18v-6Hnm6iSee30uN6xG0mAtN__oJGD9AtGH3b6V5iz9DOx5-UWYi4NONX_cfnw/exec" // Ganti dengan URL Web App GAS kamu
};

if (typeof window !== 'undefined') {
    window.SUPPORT_DATA = SUPPORT_DATA;
}
