/**
 * data/subjects-data.js - Database 16 Mata Pelajaran SMA & Tautan Materi
 * Fungsi: Menyimpan array objek dari 16 mata pelajaran lengkap dengan 
 * ID unik, nama mapel, ikon visual, kategori, deskripsi singkat, 
 * tautan Google Drive file materi, serta daftar topik utama SNBT/TKA.
 */

const SUBJECTS_DATA = [
    {
        // Blok Data: Matematika Wajib (Kategori Wajib)
        id: 'matematika',
        name: 'Matematika Wajib',
        icon: '📐',
        category: 'Wajib',
        description: 'Aljabar, fungsi, eksponen, trigonometri, dan kalkulus dasar.',
        driveUrl: 'https://drive.google.com/drive/folders/1L_jcAp1d5G46SO_Tvbi0o2XOEuv-wnac',
        topics: ['Eksponen & Logaritma', 'Persamaan Kuadrat', 'Trigonometri', 'Matriks', 'Turunan & Integral']
    },
    {
        // Blok Data: Matematika Tingkat Lanjut (Kategori Peminatan)
        id: 'matematika-lanjut',
        name: 'Matematika Tingkat Lanjut',
        icon: '📊',
        category: 'Peminatan',
        description: 'Polinomial, matriks lanjut, vektor 3D, dan geometri analitika.',
        driveUrl: 'https://drive.google.com/drive/folders/1Nkd8UYBbS9xUci7OtBctfpxk4OGEBxM_',
        topics: ['Polinomial (Suku Banyak)', 'Vektor 3D', 'Transformasi Geometri', 'Limit Fungsi Trigonometri']
    },
    {
        // Blok Data: Bahasa Indonesia Wajib (Kategori Wajib)
        id: 'bahasa-indonesia',
        name: 'Bahasa Indonesia Wajib',
        icon: '📖',
        category: 'Wajib',
        description: 'Literasi membaca, pemahaman teks argumentasi, ide pokok, dan ejaan.',
        driveUrl: 'https://drive.google.com/drive/folders/1NYq0zcdwpHo1-9-npdF3DKipmqTIJz6O',
        topics: ['Teks Laporan Hasil Observasi', 'Ide Pokok & Kalimat Utama', 'Ejaan EYD VI', 'Paragraf Induktif/Deduktif']
    },
    {
        // Blok Data: Bahasa Indonesia Tingkat Lanjut (Kategori Peminatan)
        id: 'bahasa-indonesia-lanjut',
        name: 'Bahasa Indonesia Tingkat Lanjut',
        icon: '📝',
        category: 'Peminatan',
        description: 'Apresiasi karya sastra, kritik sastra, drama, dan esai ilmiah.',
        driveUrl: 'https://drive.google.com/drive/folders/1Zo1e8WuWWcfhfpmQjV9WeAKK5iOY7jgt',
        topics: ['Kritik Sastra & Esai', 'Analisis Novel/Cerpen', 'Naskah Drama & Monolog']
    },
    {
        // Blok Data: Bahasa Inggris Wajib (Kategori Wajib)
        id: 'bahasa-inggris',
        name: 'Bahasa Inggris Wajib',
        icon: '🇬🇧',
        category: 'Wajib',
        description: 'Reading comprehension, grammar, main idea, and inference questions.',
        driveUrl: 'https://drive.google.com/drive/folders/1Q52MCSGjSSnoUlvvWsROQ3qZAAChXPUF',
        topics: ['Analytical Exposition', 'Passive Voice', 'Conditional Sentences', 'Main Idea & Tones']
    },
    {
        // Blok Data: Bahasa Inggris Tingkat Lanjut (Kategori Peminatan)
        id: 'bahasa-inggris-lanjut',
        name: 'Bahasa Inggris Tingkat Lanjut',
        icon: '🗣️',
        category: 'Peminatan',
        description: 'Advanced reading, argument writing, debate expressions, and TOEFL prep.',
        driveUrl: 'https://drive.google.com/drive/folders/1_F6rQysNTUcgWpmn_PQnwefO4he23FZi',
        topics: ['Hortatory Exposition', 'Discussion Text', 'Advanced Modals & Inversion']
    },
    {
        // Blok Data: Fisika (Kategori Saintek)
        id: 'fisika',
        name: 'Fisika',
        icon: '⚡',
        category: 'Saintek',
        description: 'Mekanika, kinematika, hukum Newton, listrik-magnet, dan termodinamika.',
        driveUrl: 'https://drive.google.com/drive/folders/1XEQ-jd60aN8nk77tzGh_Bc4BLsE0m9Fv',
        topics: ['Kinematika Gerak Lurus', 'Hukum Newton tentang Gerak', 'Usaha & Energi', 'Rangkaian Listrik DC/AC']
    },
    {
        // Blok Data: Kimia (Kategori Saintek)
        id: 'kimia',
        name: 'Kimia',
        icon: '🧪',
        category: 'Saintek',
        description: 'Struktur atom, ikatan kimia, stoikiometri, asam-basa, dan reaksi redoks.',
        driveUrl: 'https://drive.google.com/drive/folders/1xhEzEonyM3IbdpmKZNkJH9gpxTlp2_x9',
        topics: ['Stoikiometri & Mol', 'Tabel Periodik Unsur', 'Termokimia', 'Laju Reaksi & Kesetimbangan']
    },
    {
        // Blok Data: Biologi (Kategori Saintek)
        id: 'biologi',
        name: 'Biologi',
        icon: '🧬',
        category: 'Saintek',
        description: 'Sel, metabolisme, genetika DNA/RNA, evolusi, dan ekosistem.',
        driveUrl: 'https://drive.google.com/drive/folders/1yxhrg5LjQxuqe97rr_DDHfVXcyKatCJK',
        topics: ['Struktur Sel & Organel', 'Metabolisme (Anabolisme/Katabolisme)', 'Substansi Genetik & Hereditas', 'Evolusi']
    },
    {
        // Blok Data: Ekonomi (Kategori Soshum)
        id: 'ekonomi',
        name: 'Ekonomi',
        icon: '💰',
        category: 'Soshum',
        description: 'Kelangkaan, permintaan-penawaran, akuntansi dasar, pasar, dan kebijakan fiskal.',
        driveUrl: 'https://drive.google.com/drive/folders/1r1Xh5ELdvvqDlfjJJ3zLCGvQ1a3ORsrA',
        topics: ['Mekanisme Pasar (Hukum Demand/Supply)', 'Jurnal Umum Akuntansi', 'Pendapatan Nasional & Inflasi']
    },
    {
        // Blok Data: Geografi (Kategori Soshum)
        id: 'geografi',
        name: 'Geografi',
        icon: '🌍',
        category: 'Soshum',
        description: 'Peta, litosfer, atmosfer, sistem informasi geografis (SIG), dan dinamika penduduk.',
        driveUrl: 'https://drive.google.com/drive/folders/1PuXxV1q_jCSnAIPv7IYsZ9UcY-U6Uknz',
        topics: ['Prinsip & Pendekatan Geografi', 'Penginderaan Jauh & SIG', 'Dinamika Planet Bumi & Litosfer']
    },
    {
        // Blok Data: Sosiologi (Kategori Soshum)
        id: 'sosiologi',
        name: 'Sosiologi',
        icon: '👥',
        category: 'Soshum',
        description: 'Interaksi sosial, konflik, diferensiasi sosial, dan penelitian sosial.',
        driveUrl: 'https://drive.google.com/drive/folders/15cAGyiC8b56ijonRJLRvcOuPeRUmVCD6',
        topics: ['Interaksi & Sosialisasi', 'Konflik & Integrasi Sosial', 'Metode Penelitian Sosial']
    },
    {
        // Blok Data: Sejarah (Kategori Soshum)
        id: 'sejarah',
        name: 'Sejarah',
        icon: '🏛️',
        category: 'Soshum',
        description: 'Sejarah Indonesia, peradaban kuno, proklamasi, perang dunia, dan perang dingin.',
        driveUrl: 'https://drive.google.com/drive/folders/14DSJiQARr6rT0aMOah4D7EITYJhOifIq',
        topics: ['Kerajaan Hindu-Buddha & Islam', 'Masa Pergerakan Nasional', 'Proklamasi & Kemerdekaan RI', 'Perang Dingin']
    },
    {
        // Blok Data: PPKn / Pancasila (Kategori Wajib)
        id: 'ppkn',
        name: 'PPKn / Pancasila',
        icon: '🇮🇩',
        category: 'Wajib',
        description: 'Nilai-nilai Pancasila, UUD 1945, hak asasi manusia, dan wawasan kebangsaan.',
        driveUrl: 'https://drive.google.com/drive/folders/1qVbxGrW4-YcrFSeRC04dexrb2WQa53F_',
        topics: ['Nilai Pancasila dalam Praktik', 'Konstitusi & UUD 1945', 'Demokrasi & Hak Asasi Manusia']
    },
    {
        // Blok Data: Informatika (Kategori Peminatan)
        id: 'informatika',
        name: 'Informatika',
        icon: '💻',
        category: 'Peminatan',
        description: 'Berpikir komputasional, algoritma dasar, analisis data, dan jaringan komputer.',
        driveUrl: 'https://drive.google.com/drive/folders/1jfZiFf1--VGM27_SNbn3o5nzrgbYdfcZ',
        topics: ['Computational Thinking', 'Algoritma & Pemrograman', 'Analisis Data & Spreadsheet']
    },
    {
        // Blok Data: Sejarah Tingkat Lanjut (Kategori Peminatan)
        id: 'sejarah-tingkat-lanjut',
        name: 'Sejarah Tingkat Lanjut',
        icon: '📜',
        category: 'Peminatan',
        description: 'Historiografi, sejarah dunia modern, revolusi besar dunia, dan politik global.',
        driveUrl: 'https://drive.google.com/drive/folders/1iCiEWYu9muyIbrPEdcYw8btOdfTwUHDK',
        topics: ['Historiografi & Metodologi', 'Revolusi Amerika, Prancis, & Rusia', 'Perang Dunia I & II']
    }
];