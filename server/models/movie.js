const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define('Movie', {
    ident: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    picture: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
    }
}, {
    tableName: 'tbMovies'
});

module.exports = Movie;