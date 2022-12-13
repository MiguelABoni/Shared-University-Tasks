// Crear el servidor
const express = require('express');
const passport = require('passport');
const App = express();

// Retornar el HTML
App.use(express.static(__dirname + '/front'))

// CORS
const CORS = require('cors');
App.use(CORS());

// Variables de entorno
require('dotenv').config();

// Passport config
App.use(passport.initialize());
require('./Middleware/index.js');

// Utilizar JSON en la API
App.use(express.json());

// Ruta inicial o de bienvenida
App.get('/', (req, res) => {
    res.send("✍🏽💻 BIENVENIDO A SHARED UNIVERSITY TASKS 💻✍🏽");
})

// Routes
App.use(require('./Routes/login.controller'));
App.use(require('./Routes/Tasks.controller'));
App.use(require('./Middleware/Response'));

// Puerto a escuchar
App.listen(process.env.PORT || 3000, () => {
    console.log("Servidor corriendo en el puerto: " + process.env.PORT || 3000);
})