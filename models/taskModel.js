// models/taskModel.js
const db = require('../db/database');

// Lista todas as tarefas, ordenadas pelo campo "ordem"
exports.getAllTasks = (callback) => {
    db.all("SELECT * FROM Tarefas ORDER BY ordem", callback);
};

// Adiciona uma nova tarefa
exports.createTask = (task, callback) => {
    db.run(
        `INSERT INTO Tarefas (nome, custo, data_limite, ordem) 
        VALUES (?, ?, ?, (SELECT COALESCE(MAX(ordem), 0) + 1 FROM Tarefas))`,
        [task.nome, task.custo, task.data_limite],
        callback
    );
};

// Atualiza uma tarefa existente
exports.updateTask = (id, task, callback) => {
    db.run(
        `UPDATE Tarefas SET nome = ?, custo = ?, data_limite = ? WHERE id = ?`,
        [task.nome, task.custo, task.data_limite, id],
        callback
    );
};

// Remove uma tarefa
exports.deleteTask = (id, callback) => {
    db.run(`DELETE FROM Tarefas WHERE id = ?`, id, callback);
};

// Verifica duplicidade de nome
exports.taskNameExists = (name, callback) => {
    db.get(`SELECT * FROM Tarefas WHERE nome = ?`, [name], callback);
};

exports.getTaskByOrder = (order, callback) => {
    db.get(`SELECT * FROM Tarefas WHERE ordem = ?`, [order], callback);
};

// models/taskModel.js

exports.swapTaskOrder = (id1, order1, id2, order2, callback) => {
    db.serialize(() => {
        db.run("BEGIN TRANSACTION");

        // Atualiza o primeiro ID para uma posição temporária
        db.run(`UPDATE Tarefas SET ordem = -1 WHERE id = ?`, [id1], (err) => {
            if (err) {
                db.run("ROLLBACK");
                return callback(err);
            }

            // Define o segundo ID para o valor de ordem do primeiro
            db.run(`UPDATE Tarefas SET ordem = ? WHERE id = ?`, [order1, id2], (err) => {
                if (err) {
                    db.run("ROLLBACK");
                    return callback(err);
                }

                // Define o primeiro ID para o valor de ordem do segundo
                db.run(`UPDATE Tarefas SET ordem = ? WHERE id = ?`, [order2, id1], (err) => {
                    if (err) {
                        db.run("ROLLBACK");
                        return callback(err);
                    }

                    db.run("COMMIT", callback);
                });
            });
        });
    });
};