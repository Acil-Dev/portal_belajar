/**
 * data/quotes.js - Database Kutipan Motivasi Belajar & SNBT
 * Fungsi: Menyimpan koleksi quote inspiratif untuk memotivasi siswa di dashboard.
 */

const QUOTES_DATA = [
    {
        quote: "Pendidikan adalah senjata paling ampuh yang bisa Anda gunakan untuk mengubah dunia.",
        author: "Nelson Mandela"
    },
    {
        quote: "DUARRRRRR",
        author: "ACIL"
    },
    {
        quote: "Jangan menunggu kesempatan datang, butalah kesempatan itu sendiri dengan belajar lebih giat.",
        author: "Denis Waitley"
    },
    {
        quote: "wahay kawanku jikalau ada error atau bug,sudilah kiranya kawanku mengirimkan lantunan puisi yang salah rima tersebut,kepada hambamu imi",
        author: "Acil 085119514392"
    },
    {
        quote: "Rasa sakit karena belajar hanya sementara. Namun kebodohan, kegagalan, atau penyesalan bisa bertahan selamanya.",
        author: "John F. Kennedy"
    },
    {
        quote: "wahay kawanku jikalau ada error atau bug,sudilah kiranya kawanku mengirimkan lantunan puisi yang salah rima tersebut,kepada hambamu imi",
        author: "Acil 085119514392"
    },
    {
        quote: "wahay kawanku jikalau ada error atau bug,sudilah kiranya kawanku mengirimkan lantunan puisi yang salah rima tersebut,kepada hambamu imi",
        author: "Acil 085119514392"
    },
    {
        quote: "wahay kawanku jikalau ada error atau bug,sudilah kiranya kawanku mengirimkan lantunan puisi yang salah rima tersebut,kepada hambamu imi",
        author: "Acil 085119514392"
    },
    {
        quote: "Ujian terberat bukan saat menghadapi soal yang sulit, tetapi saat melawan rasa malas dalam diri sendiri.",
        author: "Motivator SNBT"
    }
];

// Pendaftaran Global Objek Data
if (typeof window !== 'undefined') {
    window.QUOTES_DATA = QUOTES_DATA;
}