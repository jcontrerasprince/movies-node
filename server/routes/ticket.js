const express = require('express');
const fileUpload = require('express-fileupload');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const Movie = require('../models/movie');
const Room = require('../models/room');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const { verificaToken } = require('../middlewares/authenticate')

const fs = require('fs');
const path = require('path');

const app = express();
app.use(fileUpload());

app.post('/ticket', verificaToken, (req, res) => {
    let body = req.body;
    console.log(req.headers.token);

    Ticket.create({
            userId: body.userId,
            movieId: body.movieId,
            roomId: 1, // body.roomId,
            time: body.time
        })
        .then((ticketDB) => {
            res.status(201).json({
                ok: true,
                movies: ticketDB
            })
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            })
        })
});

module.exports = app;