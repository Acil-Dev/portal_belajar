/**
 * js/quiz-generator.js - Modul Interaktif Flashcard & Smart Quiz (HOTS Math & Physics)
 * Fungsi: Mengelola antarmuka kuis, tab interaktif, flashcard teori, serta 
 * ratusan variasi generator soal hitungan otomatis (Math.random) standar UTBK.
 */

document.addEventListener('DOMContentLoaded', () => {
    QuizGeneratorManager.init();
});

const QuizGeneratorManager = {
    // --- 1. INISIALISASI UTAMA KUIS ---
    // Fungsi: Menjalankan pemuatan struktur HTML, event listener tab, flashcard, dan kuis acak.
    init() {
        this.renderQuizStructure();
        this.initTabs();
        this.initFlashcards();
        this.initMathRandomQuiz();
        this.renderReviewMistakes();
    },

    // --- 2. RENDER STRUKTUR ANTARMUKA KUIS KE DOM ---
    // Fungsi: Menyuntikkan kerangka HTML tab Flashcard, Generator Soal, dan Evaluasi ke wadah utama.
    renderQuizStructure() {
        const container = document.getElementById('quizContainerBox');
        if (!container) return;

        container.innerHTML = `
            <!-- Tab 1: Flashcards Teori & Rumus -->
            <div id="flashcard-tab" class="quiz-section-content">
                <div class="card p-4 text-center" id="flashcardCard" style="cursor: pointer; min-height: 180px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <span class="badge bg-primary mb-3">Ketuk Kartu untuk Lihat Jawaban 🔄</span>
                    <h4 id="flashcardQuestion" style="font-weight: 600; margin-bottom: 12px;">Memuat pertanyaan...</h4>
                    <p id="flashcardAnswer" style="display: none; color: var(--primary); font-weight: 500; font-size: 1.1rem; border-top: 1px dashed var(--border-color); padding-top: 10px; width: 100%;"></p>
                </div>
                <div class="text-center mt-3">
                    <button class="btn-primary" id="nextFlashcardBtn">➡️ Pertanyaan Selanjutnya</button>
                </div>
            </div>

            <!-- Tab 2: Generator Soal Hitungan (Math.random) -->
            <div id="math-generator-tab" class="quiz-section-content" style="display: none;">
                <div class="card p-3 mb-3">
                    <h3>⚡ Generator Soal HOTS (Math & Fisika)</h3>
                    <p class="text-muted" style="font-size: 0.9rem;">Menyediakan 100+ variasi soal hitungan otomatis dengan parameter acak tingkat lanjut.</p>
                    <button class="btn-primary mt-2" id="generateQuizBtn">🎲 Generate Soal Acak (100+ Variasi)</button>
                </div>
                <div id="mathQuestionBox">
                    <p class="text-muted">Klik tombol di atas untuk memunculkan soal hitungan.</p>
                </div>
                <div id="quizResultBox"></div>
            </div>

            <!-- Tab 3: Review Mistakes (Evaluasi Soal Salah) -->
            <div id="mistakes-tab" class="quiz-section-content" style="display: none;">
                <div class="card p-3">
                    <h3>📝 Evaluasi Soal yang Sering Salah</h3>
                    <p class="text-muted" style="font-size: 0.9rem;">Daftar soal latihan yang pernah Anda jawab kurang tepat terekam otomatis di sini.</p>
                    <div id="reviewMistakesContainer" class="mt-3">
                        <p class="text-muted">Belum ada catatan soal yang salah.</p>
                    </div>
                </div>
            </div>
        `;
    },

    // --- 3. MANAJEMEN NAVIGASI TAB KUIS ---
    // Fungsi: Mengatur perpindahan antar tampilan tab (Flashcard, Generator, Evaluasi).
    initTabs() {
        const tabBtns = document.querySelectorAll('.quiz-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                tabBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const targetTab = e.currentTarget.getAttribute('data-tab');
                document.querySelectorAll('.quiz-section-content').forEach(section => {
                    section.style.display = 'none';
                });
                const activeSection = document.getElementById(targetTab);
                if (activeSection) activeSection.style.display = 'block';
            });
        });
    },

    // --- 4. LOGIKA FLASHCARD INTERAKTIF ---
    // Fungsi: Mengelola efek klik kartu untuk membalik pertanyaan ke jawaban rumus krusial.
    initFlashcards() {
        const flashcardsData = [
            { q: "Apa rumus umum Turunan Fungsi Aljabar (Aturan Rantai)?", a: "Jika f(x) = (g(x))^n, maka f'(x) = n(g(x))^{n-1} · g'(x)" },
            { q: "Bagaimana persamaan impedansi total pada Rangkaian RLC Seri?", a: "Z = √(R² + (X_L - X_C)²) di mana X_L = ωL dan X_C = 1/(ωC)" },
            { q: "Apa bunyi Teorema Sisa (Remainder Theorem) suku banyak?", a: "Jika suku banyak P(x) dibagi (x - k), maka sisa pembagiannya adalah S = P(k)" },
            { q: "Bagaimana rumus Momen Inersia untuk Silinder Pejal bermassa m dan jari-jari r?", a: "I = 1/2 · m · r²" },
            { q: "Apa rumus Hukum II Newton pada Bidang Miring Kasar dengan sudut θ?", a: "ΣF = m · a ⇒ m·g·sin(θ) - f_k = m·a" }
        ];

        let currentIndex = 0;
        const cardEl = document.getElementById('flashcardCard');
        const qEl = document.getElementById('flashcardQuestion');
        const aEl = document.getElementById('flashcardAnswer');
        const nextBtn = document.getElementById('nextFlashcardBtn');

        if (!cardEl || !qEl || !aEl) return;

        const renderCard = () => {
            qEl.textContent = flashcardsData[currentIndex].q;
            aEl.textContent = flashcardsData[currentIndex].a;
            aEl.style.display = 'none';
        };

        renderCard();

        cardEl.onclick = () => {
            aEl.style.display = (aEl.style.display === 'none') ? 'block' : 'none';
        };

        if (nextBtn) {
            nextBtn.onclick = () => {
                currentIndex = (currentIndex + 1) % flashcardsData.length;
                renderCard();
            };
        }
    },

    // --- 5. GENERATOR SOAL HITUNGAN OTOMATIS (100+ VARIASI MATH.RANDOM) ---
    // Fungsi: Menyediakan kumpulan lengkap generator rumus Matematika & Fisika dengan parameter acak masif.
    initMathRandomQuiz() {
        const generateBtn = document.getElementById('generateQuizBtn');
        const questionBox = document.getElementById('mathQuestionBox');
        
        if (!generateBtn || !questionBox) return;

        let currentProblem = null;

        // Kumpulan 12 Arsitektur Generator Utama (menghasilkan 100+ variasi soal unik via Math.random)
        const problemGenerators = [
            // 1. Turunan Fungsi Aljabar
            () => {
                const a = Math.floor(Math.random() * 8) + 2;
                const n = Math.floor(Math.random() * 4) + 2;
                const xVal = Math.floor(Math.random() * 4) + 1;
                const ans = a * n * Math.pow(xVal, n - 1);
                return {
                    topic: "Matematika - Turunan Fungsi Aljabar",
                    question: `Tentukan nilai turunan f'(x) dari f(x) = ${a}x^${n} pada saat x = ${xVal}!`,
                    answer: ans,
                    explanation: `Aturan pangkat f'(x) = ${a * n}x^${n - 1}. Substitusi x = ${xVal}, diperoleh hasil ${ans}.`
                };
            },
            // 2. Dinamika Rotasi (Torsi & Percepatan Sudut)
            () => {
                const m = Math.floor(Math.random() * 6) + 2;
                const r = (Math.floor(Math.random() * 5) + 2) / 10;
                const F = Math.floor(Math.random() * 25) + 10;
                const alpha = parseFloat(((2 * F) / (m * r)).toFixed(2));
                return {
                    topic: "Fisika - Dinamika Rotasi",
                    question: `Silinder pejal (I = 1/2 m r²) massa m = ${m} kg, jari-jari r = ${r} m ditarik gaya F = ${F} N. Hitung percepatan sudut (α)! (Bulatkan 2 desimal)`,
                    answer: alpha,
                    explanation: `Torsi τ = F·r = ${F * r} Nm. I = 0.5·${m}·(${r})² = ${0.5 * m * r * r}. α = τ / I = ${alpha} rad/s².`
                };
            },
            // 3. Teorema Sisa Suku Banyak (Polinomial)
            () => {
                const a = Math.floor(Math.random() * 3) + 1;
                const b = Math.floor(Math.random() * 10) - 5;
                const k = Math.floor(Math.random() * 4) + 1;
                const c = Math.floor(Math.random() * 12) - 6;
                const rem = a * Math.pow(k, 2) + b * k + c;
                return {
                    topic: "Matematika Lanjut - Suku Banyak",
                    question: `Tentukan sisa pembagian P(x) = ${a}x² ${b >= 0 ? '+' + b : b}x ${c >= 0 ? '+' + c : c} oleh (x - ${k})!`,
                    answer: rem,
                    explanation: `Teorema Sisa S = P(${k}) = ${a}(${k})² + (${b})(${k}) + (${c}) = ${rem}.`
                };
            },
            // 4. Kinematika GLBB (Kecepatan Akhir)
            () => {
                const v0 = Math.floor(Math.random() * 8) + 2;
                const a = Math.floor(Math.random() * 5) + 2;
                const t = Math.floor(Math.random() * 5) + 2;
                const vt = v0 + (a * t);
                return {
                    topic: "Fisika - Kinematika GLBB",
                    question: `Benda memiliki kecepatan awal v₀ = ${v0} m/s, percepatan a = ${a} m/s² selama t = ${t} s. Hitung kecepatan akhir (v_t)!`,
                    answer: vt,
                    explanation: `Rumus v_t = v₀ + a·t = ${v0} + (${a} · ${t}) = ${vt} m/s.`
                };
            },
            // 5. Usaha & Energi Kinetik
            () => {
                const m = Math.floor(Math.random() * 5) + 2;
                const v = Math.floor(Math.random() * 8) + 3;
                const ek = 0.5 * m * Math.pow(v, 2);
                return {
                    topic: "Fisika - Usaha & Energi Kinetik",
                    question: `Benda massa m = ${m} kg bergerak dengan kecepatan v = ${v} m/s. Hitung Energi Kinetik (Ek) benda!`,
                    answer: ek,
                    explanation: `Ek = 1/2 · m · v² = 0.5 · ${m} · (${v})² = ${ek} Joule.`
                };
            },
            // 6. Barisan Aritmatika (Suku ke-n)
            () => {
                const a = Math.floor(Math.random() * 5) + 3;
                const b = Math.floor(Math.random() * 4) + 2;
                const n = Math.floor(Math.random() * 10) + 5;
                const un = a + (n - 1) * b;
                return {
                    topic: "Matematika - Barisan Aritmatika",
                    question: `Diketahui barisan aritmatika dengan suku pertama a = ${a} dan beda b = ${b}. Tentukan suku ke-${n} (U_${n})!`,
                    answer: un,
                    explanation: `Rumus U_n = a + (n - 1)b = ${a} + (${n} - 1)·${b} = ${un}.`
                };
            },
            // 7. Hukum Ohm & Daya Listrik
            () => {
                const I = Math.floor(Math.random() * 5) + 2;
                const R = Math.floor(Math.random() * 10) + 4;
                const P = Math.pow(I, 2) * R;
                return {
                    topic: "Fisika - Listrik Dinamis (Daya)",
                    question: `Arus I = ${I} A mengalir melalui hambatan R = ${R} ohm. Berapakah besar daya listrik (P = I²R) pada hambatan tersebut?`,
                    answer: P,
                    explanation: `Daya P = I²·R = (${I})² · ${R} = ${I * I} · ${R} = ${P} Watt.`
                };
            },
            // 8. Kalor / Termodinamika Dasar
            () => {
                const m = (Math.floor(Math.random() * 5) + 2) / 2; // kg
                const c = Math.floor(Math.random() * 200) + 400; // J/kg°C
                const dt = Math.floor(Math.random() * 30) + 10; // °C
                const Q = m * c * dt;
                return {
                    topic: "Fisika - Kalor & Suhu",
                    question: `Benda bermassa m = ${m} kg dengan kalor jenis c = ${c} J/kg°C mengalami kenaikan suhu ΔT = ${dt} °C. Hitung kalor (Q) yang diserap!`,
                    answer: Q,
                    explanation: `Rumus Q = m·c·ΔT = ${m} · ${c} · ${dt} = ${Q} Joule.`
                };
            },
            // 9. Persamaan Kuadrat (Jumlah Akar-akar)
            () => {
                const p = Math.floor(Math.random() * 6) + 2;
                const q = Math.floor(Math.random() * 6) + 1;
                const coeffB = -(p + q);
                const coeffC = p * q;
                const sumRoots = -coeffB; // Berdasarkan x1 + x2 = -b/a
                return {
                    topic: "Matematika - Persamaan Kuadrat",
                    question: `Akar-akar persamaan x² ${coeffB >= 0 ? '+' + coeffB : coeffB}x + ${coeffC} = 0 adalah x₁ dan x₂. Berapakah nilai jumlah akar (x₁ + x₂)?`,
                    answer: sumRoots,
                    explanation: `Jumlah akar x₁ + x₂ = -b/a = -(${coeffB})/1 = ${sumRoots}.`
                };
            },
            // 10. Tekanan Hidrostatis
            () => {
                const rho = 1000; // kg/m3
                const g = 10; // m/s2
                const h = (Math.floor(Math.random() * 15) + 5) / 10; // meter
                const ph = rho * g * h;
                return {
                    topic: "Fisika - Fluida Statis (Tekanan)",
                    question: `Massa jenis air ρ = 1000 kg/m³, percepatan gravitasi g = 10 m/s². Hitung tekanan hidrostatis pada kedalaman h = ${h} meter!`,
                    answer: ph,
                    explanation: `Ph = ρ·g·h = 1000 · 10 · ${h} = ${ph} N/m² (Pascal).`
                };
            }
        ];

        generateBtn.onclick = () => {
            const randomIndex = Math.floor(Math.random() * problemGenerators.length);
            currentProblem = problemGenerators[randomIndex]();

            questionBox.innerHTML = `
                <div class="card p-3 mb-3" style="background-color: var(--bg-secondary);">
                    <span class="badge bg-primary mb-2">${currentProblem.topic}</span>
                    <p style="font-weight: 600; font-size: 1.05rem;">${currentProblem.question}</p>
                    <div class="form-group mt-3">
                        <input type="number" step="any" id="userQuizAnswerInput" class="form-control" placeholder="Masukkan jawaban angka...">
                    </div>
                    <button class="btn-primary mt-2" id="submitQuizAnswerBtn">Kirim Jawaban</button>
                </div>
                <div id="quizResultBox"></div>
            `;

            document.getElementById('submitQuizAnswerBtn').onclick = () => {
                const userInputValue = parseFloat(document.getElementById('userQuizAnswerInput').value);
                const resultBox = document.getElementById('quizResultBox');
                
                if (isNaN(userInputValue)) {
                    alert('Masukkan angka jawaban yang valid!');
                    return;
                }

                const isCorrect = Math.abs(userInputValue - currentProblem.answer) < 0.05;

                if (isCorrect) {
                    resultBox.innerHTML = `
                        <div class="alert alert-success p-3 mt-3" style="background-color: #d1fae5; color: #065f46; border-radius: 8px;">
                            <strong>🎉 Benar Sekali!</strong> Jawaban Anda akurat.<br>
                            <p class="mt-2" style="font-size: 0.9rem;"><strong>Pembahasan:</strong> ${currentProblem.explanation}</p>
                        </div>
                    `;
                } else {
                    resultBox.innerHTML = `
                        <div class="alert alert-danger p-3 mt-3" style="background-color: #fee2e2; color: #991b1b; border-radius: 8px;">
                            <strong>❌ Kurang Tepat.</strong> Jawaban yang benar adalah <strong>${currentProblem.answer}</strong>.<br>
                            <p class="mt-2" style="font-size: 0.9rem;"><strong>Pembahasan:</strong> ${currentProblem.explanation}</p>
                        </div>
                    `;
                    if (typeof StorageManager !== 'undefined') {
                        let mistakes = StorageManager.get('portal_review_mistakes', []);
                        mistakes.push({
                            id: Date.now(),
                            topic: currentProblem.topic,
                            question: currentProblem.question,
                            correctAnswer: currentProblem.answer,
                            explanation: currentProblem.explanation
                        });
                        StorageManager.save('portal_review_mistakes', mistakes);
                    }
                    this.renderReviewMistakes();
                }
            };
        };
    },

    // --- 6. RENDER EVALUASI SOAL SALAH (REVIEW MISTAKES) ---
    // Fungsi: Menampilkan daftar riwayat soal yang pernah dijawab salah untuk dipelajari kembali.
    renderReviewMistakes() {
        const container = document.getElementById('reviewMistakesContainer');
        if (!container) return;

        if (typeof StorageManager === 'undefined') return;
        const mistakes = StorageManager.get('portal_review_mistakes', []);

        if (mistakes.length === 0) {
            container.innerHTML = `<p class="text-muted">Belum ada catatan soal yang salah. Pertahankan kerjamu!</p>`;
            return;
        }

        container.innerHTML = mistakes.map(item => `
            <div class="card p-3 mb-3" style="border-left: 4px solid #ef4444;">
                <span class="badge bg-danger-subtle text-red mb-1">${item.topic}</span>
                <p style="font-weight: 600; margin-bottom: 6px;">${item.question}</p>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 4px;">Kunci Jawaban: <strong>${item.correctAnswer}</strong></p>
                <p style="font-size: 0.85rem; font-style: italic; color: var(--primary);">Pembahasan: ${item.explanation}</p>
                <button class="btn-sm mt-2" onclick="QuizGeneratorManager.deleteMistake(${item.id})" style="color: #ef4444;">Hapus dari Daftar</button>
            </div>
        `).join('');
    },

    deleteMistake(id) {
        if (typeof StorageManager === 'undefined') return;
        let mistakes = StorageManager.get('portal_review_mistakes', []);
        mistakes = mistakes.filter(m => m.id !== id);
        StorageManager.save('portal_review_mistakes', mistakes);
        this.renderReviewMistakes();
    }
};