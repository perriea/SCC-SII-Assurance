var db = require('../../config/db');
var access = db.access;

var Role = access.define('c_role', {
    role: {
        type: access.Sequelize.STRING(30),
        allowNull: false
    },
    description: {
        type: access.Sequelize.STRING(50),
        allowNull: true
    }
}, { timestamps: false });

module.exports = Role;
