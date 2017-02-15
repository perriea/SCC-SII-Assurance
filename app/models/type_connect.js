var db = require('../../config/db');
var access = db.access;

var Type_connect = access.define('c_type_connect', {
	type: {
      	type: access.Sequelize.STRING(30),
      	allowNull: false
  	},
	description: {
		type: access.Sequelize.STRING(50),
		allowNull: true,
		validate: {
			isJSON: true
		}
	}
}, { timestamps: false });

module.exports = Type_connect;