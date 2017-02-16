var db = require('../../config/db');

var bcrypt = require('bcrypt');
var colors = require('../../config/color');

var sequelize = db.sequelize;
var access = db.access;

var TTrains = access.define('c_trains', {

    id: {
        type: access.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    num: {
        type: access.Sequelize.STRING(200),
        allowNull: false
    },
    time: {
        type: access.Sequelize.STRING(255),
        allowNull: false
    },
    price: {
        type: access.Sequelize.INTEGER(),
        allowNull: false
    },
    user_id: {
        type: access.Sequelize.INTEGER(),
        allowNull: false
    },
    refund: {
        type: access.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    timeRefund: {
        type: access.Sequelize.DATE(),
        allowNull: false,
        defaultValue: new Date()
    }
}, {timestamps: false});

// methods ======================
// generating a hash

module.exports = TTrains;