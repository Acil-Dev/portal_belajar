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
        quote: "Kesuksesan tidak datang dari apa yang Anda lakukan sesekali, tapi dari apa yang Anda lakukan secara konsisten.",
        author: "Marie Forleo"
    },
    {
        quote: "Jangan menunggu kesempatan datang, butalah kesempatan itu sendiri dengan belajar lebih giat.",
        author: "Denis Waitley"
    },
    {
        quote: "Masa depan adalah milik mereka yang menyiapkan hari ini.",
        author: "Malcolm X"
    },
    {
        quote: "Rasa sakit karena belajar hanya sementara. Namun kebodohan, kegagalan, atau penyesalan bisa bertahan selamanya.",
        author: "John F. Kennedy"
    },
    {
        quote: "Ujian terberat bukan saat menghadapi soal yang sulit, tetapi saat melawan rasa malas dalam diri sendiri.",
        author: "Motivator SNBT"
    }
    {
        quote: "Belajar bukan hanya tentang menghafal, tapi tentang memahami dan menerapkan pengetahuan.",
        author: "Motivator SNBT"
    }
    {
        quote: "Belajar adalah investasi terbaik yang bisa Anda lakukan untuk masa depan Anda.",
        author: "Someone"
    }
    {
        quote: "mantan itu seperti ujian, kadang sulit tapi selalu ada pelajaran berharga di baliknya.",
        author: "Anonim"
    }
    {
        quote: "sapi itu seperti teman, kadang diam tapi selalu ada manfaatnya.",
        author: "Acil"
    }
    {
        quote: "black hole itu seperti hidup, kadang gelap tapi selalu ada misteri yang menarik.",
        author: "Someone"
    }
];

// Pendaftaran Global Objek Data
if (typeof window !== 'undefined') {
    window.QUOTES_DATA = QUOTES_DATA;
}
