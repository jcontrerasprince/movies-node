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
const { verificaToken, verificaAdmin_Role } = require('../middlewares/authenticate')

const fs = require('fs');
const path = require('path');

const app = express();
app.use(fileUpload());

app.get('/movie', (req, res) => {
    Movie.findAll()
        .then((movieDB) => {
            movieDB.forEach(movie => {
                if (movie.picture) {
                    movie.picture = movie.picture.toString('base64');
                }
                movie.duration = movie.duration.getUTCHours() + ':' + movie.duration.getUTCMinutes();
                movie.time = movie.time.toLocaleTimeString();
            });
            res.json({
                ok: true,
                movies: movieDB
            })
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            })
        })
});

app.post('/movie', (req, res) => {

    console.log(req.files.picture.data);
    let body = req.body;
    let picture = req.files.picture.data;

    Movie.create({
            title: body.title,
            picture: picture,
            desc: body.desc,
            duration: body.duration,
            genre: body.genre,
            time: body.time
        })
        .then((movieDB) => {
            res.status(201).json({
                ok: true,
                movies: _.pick(movieDB, ['ident', 'title', 'desc', 'duration', 'genre', 'time'])
            })
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            })
        })
});

app.put('/movie/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let picture = req.files.picture;

    Movie.update({ picture: picture.data }, { where: { ident: id } })
        .then((movieDB) => {
            res.status(201).json({
                ok: true,
                movies: movieDB
            })
        })
        .catch((err) => {
            return res.status(500).json({
                ok: false,
                err
            })
        })
});

app.get('/movie/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    console.log(id);

    Movie.findByPk(id)
        .then((movieDB) => {
            res.json({
                ok: true,
                movie: movieDB
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