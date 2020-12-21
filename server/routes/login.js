const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const jwt = require('jsonwebtoken');
const { Sequelize, QueryTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/user');

const app = express();

var https = require('follow-redirects').https;
var fs = require('fs');

app.post('/', (req, res) => {
    User.findAll()
        .then(nose => {
            console.log(nose);
            res.sendStatus(200);
        })
        .catch(err => console.log(err))
});

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({
            where: { NID: body.NID }
        })
        .then((userDB) => {
            if (!userDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Wrong user or password"
                    }
                });
            }
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Wrong user or password"
                    }
                });
            }
            let token = jwt.sign({
                user: userDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
            console.log(token);
            res.json({
                ok: true,
                user: _.pick(userDB, ['ident', 'NID', 'phoneNumber', 'email']),
                token
            })
        })
        .catch((err) => {
            console.log(err);
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
        })
});

module.exports = app;