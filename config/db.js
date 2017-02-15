// config/database.js
var Sequelize = require('sequelize');

// config sequelize - MySQL
// Active Log to loggin: true
var config_sequelize = {
    database: 'dev-node',
    user: 'node',
    password: 'nodejs',
    config: {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        ssl: false,
        replication: false,

        ///// debug + perf /////
        logging: false, // default: console.log
        benchmark: false,
        sync: {
            force: false
        },
        keepDefaultTimezone: true,
        //timezone: '+01:00',
        ////////////////////////

        pool: {
            max: 10,
            min: 0,
            idle: 10000
        }
    }
};

// connexion database
var sequelize = new Sequelize(config_sequelize.database, config_sequelize.user, config_sequelize.password, config_sequelize.config);

// var access resources
var db = {
	access: sequelize,
	sequelize: Sequelize
};

module.exports = db;