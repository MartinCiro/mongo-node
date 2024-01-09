const { Router } = require('express');
const { getAllTasks, createTask, getTask, deleteTask, updateTask } = require('../tasks/controllers/tasks.controller');
const { getAllTasksAPI, getTaskAPI, createTaskAPI, deleteTaskAPI, updateTaskAPI } = require('../tasks/api/tasks.api');

const router = Router();

router.get('/tasks', getAllTasksAPI);

router.get('/tasks', getTaskAPI);

router.post('/tasks', createTaskAPI);

router.delete('/tasks', deleteTaskAPI);

router.patch('/tasks', updateTaskAPI)
module.exports = router