var db = require('../../config/db');

var bcrypt = require('bcrypt');
var colors = require('../../config/color');

var Trains = require('./trains');

var sequelize = db.sequelize;
var access = db.access;
var methods = {generateHash: null, validPassword: null};

var TUsers = access.define('c_users', {

    id: {
        type: access.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    mail: {
        type: access.Sequelize.STRING(200),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    passwd: {
        type: access.Sequelize.STRING(255),
        allowNull: false
    },
    prenom: {
        type: access.Sequelize.STRING(255),
        allowNull: true
    },
    nom: {
        type: access.Sequelize.STRING(255),
        allowNull: true
    },
    ideth: {
        type: access.Sequelize.STRING(255),
        allowNull: false
    }
}, {timestamps: false});

// methods ======================
// generating a hash
methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
methods.validPassword = function (password, user) {
    return bcrypt.compareSync(password, user.passwd, null);
};

TUsers.hasOne(Trains, {foreignKey: 'user_id', onDelete: 'NO ACTION'});

db.access.authenticate().then(function (err) {
    console.log(colors.info('Connection has been established successfully.'));
    TUsers.sync();
    Trains.sync();
}).catch(function (err) {
    console.log(colors.error('MySQL:' + err.message));
});

module.exports = {TUsers, Trains, methods};