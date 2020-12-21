require('./config/config');

const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Connection = require('tedious').Connection;
const Sequelize = require('sequelize');
const cors = require("cors");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// uso con app React JS
app.use(cors());

// Configuración global de rutas
app.use(require('./routes/index'));

const sequelize = require('./config/database');
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync();

app.listen(process.env.PORT, console.log('Puerto:', process.env.PORT));