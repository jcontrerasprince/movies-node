const Sequelize = require('sequelize');

module.exports = new Sequelize('Movies', 'sa', 'j260788C!', {
    host: 'localhost',
    dialect: 'mssql',
    // operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        options: {
            truestedConnection: true,
            integratedSecurity: true,
            trustServerCertificate: true,
            appName: "Movies App",
            encrypt: false,
            enableArithAbort: true,
            validateBulkLoadParameters: true
        }
    }
});