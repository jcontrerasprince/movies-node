const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

const { Sequelize, QueryTypes, json } = require('sequelize');
const sequelize = require('../config/database');
const User = require('../models/user');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/authenticate')

const app = express();

app.get('/user', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        })

});

app.post('/signup', function(req, res) {

    let body = req.body;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!strongRegex.test(body.password)) {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Validation error. Password must be at least 8 characters long, contain at least 1 number and contain at least 1 special character.'
            }
        })
    }

    User.create({
        NID: body.NID,
        password: bcrypt.hashSync(body.password, 10),
        phoneNumber: body.phoneNumber,
        email: body.email
    }).then((userDB) => {
        res.status(201).json({
            ok: true,
            user: _.pick(userDB, ['ident', 'NID', 'phoneNumber', 'email'])
        })
    }).catch((err) => {
        console.log(err);
        res.status(400).json({
            ok: false,
            err
        });
    });
})

module.exports = app;