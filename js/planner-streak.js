/**
 * js/planner-streak.js - Logika To-Do List, Kalender, Reminder, & Streak Belajar
 * Fungsi: Mengelola penambahan tugas, perhitungan tenggat waktu (H-1), 
 * rendering daftar agenda, serta melacak hari belajar berturut-turut siswa.
 */

document.addEventListener('DOMContentLoaded', () => {
    PlannerStreakManager.init();
});

const PlannerStreakManager = {
    init() {
        this.checkAndUpdateStreak();
        this.initTodoForm();
        this.renderTodos();
    },

    /**
     * Penghitung Streak Belajar Harian (Konsistensi)
     * Mengecek tanggal terakhir akses, jika login setiap hari bertambah, jika terlewat reset ke 1.
     */
    checkAndUpdateStreak() {
        const streakData = StorageManager.getStreakData();
        const today = new Date().toISOString().split('T')[0];
        
        if (streakData.lastDate === today) {
            // Sudah dihitung hari ini, tidak ada perubahan
            this.updateStreakUI(streakData.count);
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newCount = streakData.count;
        if (streakData.lastDate === yesterdayStr) {
            // Login berturut-turut hari berikutnya
            newCount += 1;
        } else if (!streakData.lastDate) {
            // Pertama kali buka aplikasi
            newCount = 1;
        } else {
            // Terlewat satu hari atau lebih, reset streak
            newCount = 1;
        }

        StorageManager.saveStreakData({ count: newCount, lastDate: today });
        this.updateStreakUI(newCount);
    },

    updateStreakUI(count) {
        const streakCountEl = document.getElementById('streakCount');
        if (streakCountEl) {
            streakCountEl.textContent = count;
        }
    },

    /**
     * Manajemen Form To-Do List / Target SNBT
     * Menyimpan tugas baru ke LocalStorage dan merender ulang tampilan daftar tugas.
     */
    initTodoForm() {
        const todoForm = document.getElementById('todoForm');
        if (!todoForm) return;

        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('todoTitle');
            const deadlineInput = document.getElementById('todoDeadline');

            if (!titleInput.value || !deadlineInput.value) return;

            const newTodo = {
                id: Date.now(),
                title: titleInput.value,
                deadline: deadlineInput.value,
                completed: false
            };

            const todos = StorageManager.getTodos();
            todos.push(newTodo);
            StorageManager.saveTodos(todos);

            titleInput.value = '';
            deadlineInput.value = '';
            
            this.renderTodos();
            if (typeof AppController !== 'undefined') {
                AppController.updateDashboardStats();
            }
        });
    },

    /**
     * Render Daftar To-Do List ke Antarmuka
     * Menghitung sisa waktu hari (deadline) secara dinamis untuk setiap tugas.
     */
    renderTodos() {
        const container = document.getElementById('fullTodoListContainer');
        if (!container) return;

        const todos = StorageManager.getTodos();
        if (todos.length === 0) {
            container.innerHTML = `<p class="text-muted">Belum ada tugas atau target bab yang ditambahkan.</p>`;
            return;
        }

        const todayStr = new Date().toISOString().split('T')[0];
        const todayDate = new Date(todayStr);

        container.innerHTML = todos.map(todo => {
            const deadlineDate = new Date(todo.deadline);
            const diffTime = deadlineDate - todayDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let badgeText = '';
            let badgeClass = '';

            if (diffDays < 0) {
                badgeText = 'Terlewat (Overdue)';
                badgeClass = 'bg-red-subtle text-red';
            } else if (diffDays === 0) {
                badgeText = 'Hari Ini (Deadline!)';
                badgeClass = 'bg-orange-subtle text-orange';
            } else if (diffDays === 1) {
                badgeText = 'Sisa 1 Hari (H-1)';
                badgeClass = 'bg-yellow-subtle text-yellow';
            } else {
                badgeText = `Sisa ${diffDays} Hari`;
                badgeClass = 'bg-blue-subtle text-blue';
            }

            return `
                <div class="todo-item-card">
                    <div>
                        <h4 style="${todo.completed ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${todo.title}</h4>
                        <p style="font-size: 0.8rem; color: var(--text-muted);">Deadline: ${todo.deadline} | <span class="${badgeClass}">${badgeText}</span></p>
                    </div>
                    <div>
                        <button class="btn-sm" onclick="PlannerStreakManager.toggleTodo(${todo.id})">${todo.completed ? 'Batal' : 'Selesai'}</button>
                        <button class="btn-sm" onclick="PlannerStreakManager.deleteTodo(${todo.id})" style="color: #ef4444; margin-left: 6px;">Hapus</button>
                    </div>
                </div>
            `;
        }).join('');
    },

    toggleTodo(id) {
        let todos = StorageManager.getTodos();
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        StorageManager.saveTodos(todos);
        this.renderTodos();
    },

    deleteTodo(id) {
        let todos = StorageManager.getTodos();
        todos = todos.filter(t => t.id !== id);
        StorageManager.saveTodos(todos);
        this.renderTodos();
        if (typeof AppController !== 'undefined') {
            AppController.updateDashboardStats();
        }
    },

    /**
     * Manajemen Modal Pengingat (Reminder H-1)
     * Mengatur fungsi buka-tutup modal dan penyimpanan data agenda harian.
     */
    initReminderModal() {
        const modal = document.getElementById('reminderModal');
        const openBtn = document.getElementById('openAddReminderModal');
        const closeBtn = document.getElementById('closeReminderModal');
        const form = document.getElementById('reminderForm');

        if (openBtn && modal) {
            openBtn.addEventListener('click', () => modal.style.display = 'flex');
        }
        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => modal.style.display = 'none');
        }

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('reminderTitle').value;
                const date = document.getElementById('reminderDate').value;

                if (!title || !date) return;

                const reminders = StorageManager.getReminders();
                reminders.push({ id: Date.now(), title, date });
                StorageManager.saveReminders(reminders);

                document.getElementById('reminderTitle').value = '';
                document.getElementById('reminderDate').value = '';
                if (modal) modal.style.display = 'none';

                this.renderReminders();
            });
        }
    },

    renderReminders() {
        const container = document.getElementById('dashReminderList');
        if (!container) return;

        const reminders = StorageManager.getReminders();
        const todayStr = new Date().toISOString().split('T')[0];

        // Filter pengingat untuk hari ini atau H-1
        const activeReminders = reminders.filter(r => r.date === todayStr);

        if (activeReminders.length === 0) {
            container.innerHTML = `<p class="text-muted">Belum ada pengingat tugas untuk hari ini.</p>`;
            return;
        }

        container.innerHTML = activeReminders.map(r => `
            <div class="todo-item-card" style="margin-bottom: 8px;">
                <div>
                    <h4 style="font-size: 0.95rem;">📌 ${r.title}</h4>
                    <p style="font-size: 0.8rem; color: #ea580c;">Pelaksanaan Hari Ini (${r.date})</p>
                </div>
                <button class="btn-sm" onclick="PlannerStreakManager.deleteReminder(${r.id})">Selesai</button>
            </div>
        `).join('');
    },

    deleteReminder(id) {
        let reminders = StorageManager.getReminders();
        reminders = reminders.filter(r => r.id !== id);
        StorageManager.saveReminders(reminders);
        this.renderReminders();
    }
};
