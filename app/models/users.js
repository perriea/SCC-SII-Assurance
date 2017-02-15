var db = require('../../config/db');
var Type_connect = require('./type_connect');
var Role = require('./role');
var Page = require('./page');
var Pref = require('./preferences');

var bcrypt = require('bcrypt');
var colors = require('../../config/color');

var sequelize = db.sequelize;
var access = db.access;
var methods = { generateHash: null, validPassword: null };

var TUsers = access.define('c_users', {

    authenticate_id: {
        type: access.Sequelize.INTEGER(1),
        allowNull: false,
    },
    role_id: {
        type: access.Sequelize.INTEGER(4),
        allowNull: false,
        defaultValue: 4,
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
}, { timestamps: false });

// methods ======================
// generating a hash
methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
methods.validPassword = function(password, user) {
	return bcrypt.compareSync(password, user.passwd, null);
};

Role.hasOne(TUsers, { foreignKey : 'role_id', onDelete: 'NO ACTION' });
Type_connect.hasOne(TUsers, { foreignKey : 'authenticate_id', onDelete: 'NO ACTION' });
//Pref.hasMany(TUsers, { foreignKey: "user_id" });
Page.hasOne(Pref, { foreignKey: 'page_id', onDelete: 'NO ACTION'});

db.access.authenticate().then(function(err) {
    console.log(colors.info('Connection has been established successfully.'));
    Type_connect.sync();
    Role.sync();
    Page.sync();
    Pref.sync();
    TUsers.sync();

}).catch(function (err) {
    console.log(colors.error('MySQL:' + err.message));
});

module.exports = { TUsers, Pref, Type_connect, Role, Page, methods };