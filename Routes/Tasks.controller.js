const express = require('express');
const TasksRouter = express.Router();

const Client = require('../Database/Tasks');
const TaskClient = new Client();

const fetch = require('node-fetch');

const passport = require('passport');

/** LIST CALENDARS */
TasksRouter.get('/calendars', async (req, res) => {

    const AccessToken = req.headers.authorization.substring(7, req.headers.authorization.length); 

    const response = await fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
        method: 'GET',
        headers: {
        Authorization: `Bearer ${AccessToken}`
        }
    })
    const data = await response.json();

    res.json(data);

})

/** CREATE TASK */
TasksRouter.post('/new_task/:calendarId', async (req, res, next) => {

    // 91efd358c05b0e53e99411473d7afb7fb5321361fc8ad6b2e79379888a7905ac@group.calendar.google.com
    const AccessToken = req.headers.authorization.substring(7, req.headers.authorization.length);

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${req.params.calendarId}/events`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { Authorization: `Bearer ${AccessToken}` }
    })
    const data = await response.json();

    // https://discord.com/api/webhooks/1052020844412534934/mNbwD0Se6DoAYJFB5zzYnU1df1KRqVNMIsbAi4j5bkTQYz6P275NH3pYcC3mnEt03FHC
    
    let FechaInicio = req.body.start.dateTime.split('T')[0];
    let FechaFin = req.body.end.dateTime.split('T')[0];
    let HoraInicio = req.body.start.dateTime.split('T')[1].split('-')[0];
    let HoraFin = req.body.end.dateTime.split('T')[1].split('-')[0];

    const responseMessage = await fetch(`https://discord.com/api/webhooks/1052020844412534934/mNbwD0Se6DoAYJFB5zzYnU1df1KRqVNMIsbAi4j5bkTQYz6P275NH3pYcC3mnEt03FHC?wait=true`, {
        method: 'POST',
        body: JSON.stringify({
            content: `> NUEVO EVENTO: ${req.body.summary} - 📅 FECHA INICIO: ${FechaInicio} ~ ⌚ ${HoraInicio} - 📅 FECHA FIN: ${FechaFin} ~ ⌚ ${HoraFin} \n > ⛓️ LINK: ${data.htmlLink}`
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    const dataMessage = await responseMessage.json();

    const Event = {
        ...req.body,
        eventId: data.id,
        messageId: dataMessage.id
    } 

    let result = await TaskClient.createTask(Event);
    req.result = result;
    req.message = "TAREA CREADA SATISFACTORIAMENTE";
    next();
})

/** READ ALL TASKS */
TasksRouter.get('/tasks/:calendarId', async (req, res, next) => {
    
    const AccessToken = req.headers.authorization.substring(7, req.headers.authorization.length);

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${req.params.calendarId}/events`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${AccessToken}` }
    })
    const data = await response.json();

    req.result = data;
    req.message = "INFO DE TODAS LAS TAREAS DEL CALENDARIO";
    next();
})

/** UPDATE TASK */
TasksRouter.put('/task/:calendarId/:eventId', async (req, res, next) => {

    // q3r4ts2847pkqidd9a7ek8n9eg

    const AccessToken = req.headers.authorization.substring(7, req.headers.authorization.length);

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${req.params.calendarId}/events/${req.params.eventId}`, {
        method: 'PATCH',
        body: JSON.stringify(req.body),
        headers: {
            Authorization: `Bearer ${AccessToken}`,
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    const data = await response.json();

    let Event = await TaskClient.getTask(req.params.eventId);

    let FechaInicio = req.body.start.dateTime.split('T')[0];
    let FechaFin = req.body.end.dateTime.split('T')[0];
    let HoraInicio = req.body.start.dateTime.split('T')[1].split('-')[0];
    let HoraFin = req.body.end.dateTime.split('T')[1].split('-')[0];

    const responseMessage = await fetch(`https://discord.com/api/webhooks/1052020844412534934/mNbwD0Se6DoAYJFB5zzYnU1df1KRqVNMIsbAi4j5bkTQYz6P275NH3pYcC3mnEt03FHC/messages/${Event.messageId}`, {
        method: 'PATCH',
        body: JSON.stringify({
            content: `> NUEVO EVENTO: ${req.body.summary} - 📅 FECHA INICIO: ${FechaInicio} ~ ⌚ ${HoraInicio} - 📅 FECHA FIN: ${FechaFin} ~ ⌚ ${HoraFin} \n > ⛓️ LINK: ${data.htmlLink}`
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    const dataMessage = await responseMessage.json();

    const newEvent = {
        ...req.body,
        eventId: req.params.eventId,
        messageId: dataMessage.id
    }

    let result = await TaskClient.updateTask(req.params.eventId, newEvent);
    req.result = result;
    req.message = "TAREA ACTUALIZADA CON ÉXITO";
    next();
})

/** DELETE TASK */
TasksRouter.delete('/task/:calendarId/:eventId', async (req, res, next) => {

    let Event = await TaskClient.getTask(req.params.eventId);

    const responseMessage = await fetch(`https://discord.com/api/webhooks/1052020844412534934/mNbwD0Se6DoAYJFB5zzYnU1df1KRqVNMIsbAi4j5bkTQYz6P275NH3pYcC3mnEt03FHC/messages/${Event.messageId}`, {
        method: 'DELETE'
    })

    const AccessToken = req.headers.authorization.substring(7, req.headers.authorization.length);
  
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${req.params.calendarId}/events/${req.params.eventId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${AccessToken}` }
    })

    let result = await TaskClient.deleteTask(req.params.eventId);
    req.result = result;
    req.message = "TAREA ELIMINADA CON ÉXITO";
    next();
})

module.exports = TasksRouter;