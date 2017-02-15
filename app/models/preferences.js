var db = require('../../config/db');
var access = db.access;

var Pref = access.define('c_preferences', {
    user_id: {
        type: access.Sequelize.INTEGER(5),
        allowNull: false
    },
    page_id: {
        type: access.Sequelize.INTEGER(5),
        allowNull: false
    },
    options: {
        type: access.Sequelize.STRING(1000),
        allowNull: false
    }
}, { timestamps: true });

module.exports = Pref;
