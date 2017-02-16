var error     = require('../controllers/error');
var validator = require('validator');

module.exports = {

    testGet: function(req, res)
    {
        return error.http_success(req, res, { code: 200, message: "TEST GET API OK" });
    },

    testGetId: function(req, res)
    {
        if (validator.isInt(req.params.id))
            error.http_success(req, res, { code: 200, message: "TEST GET API id: " + req.params.id });
        else
            error.http_error(req, res, { code: 400 })
    },

    testPost: function(req, res)
    {
        error.http_success(req, res, { code: 201, message: "Task created" });
    },

    testPostId: function(req, res)
    {
         if (validator.isInt(req.params.id))
             error.http_success(req, res, { code: 200, message: "TEST GET API id: " + req.params.id });
         else
             error.http_error(req, res, { code: 400 });
    },

    node_mysql: function (req, res)
    {
        error.http_success(req, res, { code: 200, message: "TEST MySQL API OK" });
    }
};