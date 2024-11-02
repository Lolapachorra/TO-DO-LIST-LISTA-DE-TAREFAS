// db/database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/tasks.db', (err) => {
    if (err) return console.error("Erro ao conectar no banco de dados:", err);
    console.log("Conectado ao banco SQLite.");
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            custo REAL NOT NULL,
            data_limite DATE NOT NULL,
            ordem INTEGER UNIQUE NOT NULL
        )
    `);
});

module.exports = db;
