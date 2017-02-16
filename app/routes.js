var sequelize  = require('sequelize');
var path       = require('path');

var Middleware = require(path.join(__dirname, '/middleware'));
var Example    = require(path.join(__dirname, '/controllers/example'));
var colors   = require(path.join(__dirname, '../config/color'));
//var MUsers   = require(path.join(__dirname, '/models/users'));

module.exports = function(app, passport, error) {

    app.get('/', function (req, res) {
        error.http_success(req, res, { code: 200, message: "Hello World !" });
    });

    app.get('/example', Example.testGet);
    app.get('/example/:id', Example.testGetId);

    app.post('/example', Example.testPost);
    app.post('/example/:id', Example.testPostId);


    // =====================================
    // LOGIN ===============================
    // =====================================
    app.post('/api/auth/login', function(req, res, next) {
        console.log('/api/auth/login');
        passport.authenticate('local-login', function(err, user, info)
        {
            console.log('/api/auth/login in passport');
            if (err)
                error.http_error(req, res, { code: 500 });
            if (user)
            {
                req.session.id = user.dataValues.id;
                req.session.mail = user.dataValues.mail;

                return error.http_success(req, res, { code: 200, message: info.message });
            }

            return error.http_error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/api/auth/signup', function(req, res, next) {
        console.log('/api/auth/signup');
        passport.authenticate('local-signup', function(err, user, info)
        {
            console.log('/api/auth/signup in passport');
            if (err)
                return error.http_error(req, res, { code: 500 });
            if (user)
                return error.http_success(req, res, { code: 201, message: info.message });
            if (!user && info.message)
                return error.http_error(req, res, { code: 400 });

            return error.http_error(req, res, { code: 400 });
        })(req, res, next);
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        error.http_success(req, res, { code: 200, message: "logout" });
    });

    app.get('/admin', Middleware.isAdminIn, function(req, res) {
        res.status(200).send({ error: false, session: req.session.passport });
    });

    app.get('/isLog', Middleware.isLoggedIn, function(req, res) {
        res.status(200).send({ error: false, session: req.session.passport });
    });

    app.get('/index', function(req, res) {
        console.log(req.user);
        //error.http_success(req, res, { code: 200, message: "logout" });
    });

    // All routes not found => 404
    app.get('*', function(req, res) {
        error.http_error(req, res, { code: 404, message: "Not found" });
    });
};