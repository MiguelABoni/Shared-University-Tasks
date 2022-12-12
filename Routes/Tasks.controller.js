const express = require('express');
const TasksRouter = express.Router();

const Client = require('../Database/Tasks');
const TaskClient = new Client();

const passport = require('passport');

/** CREATE TASK */
TasksRouter.post('/new_task', async (req, res, next) => {
    let result = await TaskClient.createTask(req.body);
    req.result = result;
    req.message = "TAREA CREADA SATISFACTORIAMENTE";
    next();
})

/** READ ALL TASKS */
TasksRouter.get('/tasks', async (req, res, next) => {
    let result = await TaskClient.getTasks();
    req.result = result;
    req.message = "INFO DE TODAS LAS TAREAS DEL CALENDARIO";
    next();
})

/** UPDATE TASK */
TasksRouter.put('/task/:id', async (req, res, next) => {
    let result = await TaskClient.updateTask(req.params.id, req.body);
    req.result = result;
    req.message = "TAREA ACTUALIZADA CON ÉXITO";
    next();
})

/** DELETE TASK */
TasksRouter.delete('/task/:id', async (req, res, next) => {
    let result = await TaskClient.deleteTask(req.params.id);
    req.result = result;
    req.message = "TAREA ELIMINADA CON ÉXITO";
    next();
})

module.exports = TasksRouter;