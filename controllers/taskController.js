// controllers/taskController.js
const taskModel = require('../models/taskModel');

exports.listTasks = (req, res) => {
    taskModel.getAllTasks((err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.createTask = (req, res) => {
    const { nome, custo, data_limite } = req.body;

    taskModel.taskNameExists(nome, (err, task) => {
        if (task) return res.status(400).json({ error: "Nome da tarefa já existe." });

        taskModel.createTask({ nome, custo, data_limite }, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: "Tarefa criada com sucesso!" });
        });
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { nome, custo, data_limite } = req.body;

    taskModel.taskNameExists(nome, (err, task) => {
        if (task && task.id !== parseInt(id)) return res.status(400).json({ error: "Nome da tarefa já existe." });

        taskModel.updateTask(id, { nome, custo, data_limite }, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarefa atualizada com sucesso!" });
        });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    taskModel.deleteTask(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Tarefa excluída com sucesso!" });
    });
};



exports.moveTaskUp = (req, res) => {
    const { id } = req.params;

    taskModel.getAllTasks((err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });

        const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex <= 0) return res.status(400).json({ error: "Tarefa já está na primeira posição" });

        const currentTask = tasks[taskIndex];
        const aboveTask = tasks[taskIndex - 1];

        taskModel.swapTaskOrder(currentTask.id, currentTask.ordem, aboveTask.id, aboveTask.ordem, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarefa movida para cima com sucesso!" });
        });
    });
};

exports.moveTaskDown = (req, res) => {
    const { id } = req.params;

    taskModel.getAllTasks((err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });

        const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex === -1 || taskIndex >= tasks.length - 1) {
            return res.status(400).json({ error: "Tarefa já está na última posição" });
        }

        const currentTask = tasks[taskIndex];
        const belowTask = tasks[taskIndex + 1];

        taskModel.swapTaskOrder(currentTask.id, currentTask.ordem, belowTask.id, belowTask.ordem, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarefa movida para baixo com sucesso!" });
        });
    });
};

exports.swapTaskOrder = (req, res) => {
    const { id1, id2 } = req.body;

    // Busca ambas as tarefas para obter suas ordens atuais
    taskModel.getTaskById(id1, (err, task1) => {
        if (err) return res.status(500).json({ error: err.message });
        taskModel.getTaskById(id2, (err, task2) => {
            if (err) return res.status(500).json({ error: err.message });

            // Troca as ordens
            taskModel.swapTaskOrder(id1, task1.ordem, id2, task2.ordem, (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Ordem das tarefas trocada com sucesso!" });
            });
        });
    });
};

// controllers/taskController.js
// controllers/taskController.js


exports.moveTaskUp = (req, res) => {
    const { id } = req.params;

    taskModel.getAllTasks((err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });

        const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex <= 0) return res.status(400).json({ error: "Tarefa já está na primeira posição" });

        const currentTask = tasks[taskIndex];
        const aboveTask = tasks[taskIndex - 1];

        taskModel.swapTaskOrder(currentTask.id, currentTask.ordem, aboveTask.id, aboveTask.ordem, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarefa movida para cima com sucesso!" });
        });
    });
};

exports.moveTaskDown = (req, res) => {
    const { id } = req.params;

    taskModel.getAllTasks((err, tasks) => {
        if (err) return res.status(500).json({ error: err.message });

        const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
        if (taskIndex === -1 || taskIndex >= tasks.length - 1) {
            return res.status(400).json({ error: "Tarefa já está na última posição" });
        }

        const currentTask = tasks[taskIndex];
        const belowTask = tasks[taskIndex + 1];

        taskModel.swapTaskOrder(currentTask.id, currentTask.ordem, belowTask.id, belowTask.ordem, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Tarefa movida para baixo com sucesso!" });
        });
    });
};
