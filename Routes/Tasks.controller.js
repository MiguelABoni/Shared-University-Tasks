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

module.exports = TasksRouter;