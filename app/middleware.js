var path  = require('path');
var error = require(path.join(__dirname, '/controllers/error'));

module.exports = {

    isLoggedIn: function(req, res, next)
    {
        if (req.isAuthenticated())
            return next();

        error.http_error(req, res, { code: 401 });
    },

    isAdminIn: function (req, res, next)
    {
        if (req.isAuthenticated()) {
            MUsers.TUsers.find({where: { authenticate_type: 1, id: req.session.passport }}).then(function (user) {
                if (user)
                    return next();
            }).catch(function (e) {
                error.http_error(req, res, { code: 500 });
            });
        }

        error.http_error(req, res, { code: 401 });
    }
};