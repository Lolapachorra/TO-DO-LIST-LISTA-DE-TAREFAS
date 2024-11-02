// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tarefas', taskController.listTasks);
router.post('/tarefas', taskController.createTask);
router.put('/tarefas/:id', taskController.updateTask);
router.delete('/tarefas/:id', taskController.deleteTask);
router.put('/tarefas/:id/up', taskController.moveTaskUp);
router.put('/tarefas/:id/down', taskController.moveTaskDown);



module.exports = router;
