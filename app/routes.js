var sequelize = require('sequelize');
var path = require('path');

var Middleware = require(path.join(__dirname, '/middleware'));
var Train = require(path.join(__dirname, '/controllers/train'));
var Profile = require(path.join(__dirname, '/controllers/profile'));
var Cron = require(path.join(__dirname, '/controllers/cron'));
var colors = require(path.join(__dirname, '../config/color'));
var Refund    = require(path.join(__dirname, '/controllers/refund'));
var colors     = require(path.join(__dirname, '../config/color'));
//var MUsers   = require(path.join(__dirname, '/models/users'));

module.exports = function (app, passport, error) {

    app.get('/', function (req, res) {
        error.http_success(req, res, {code: 200, message: "Hello World !"});
    });

    /****************** Train ******************/
    app.post('/addTrain', Train.addTrain);
    /****************** End Train **************/

    /****************** Profile ******************/
    app.get('/getProfile', Profile.getProfile);
    /****************** End Profile **************/

    /****************** Cron ******************/
    app.get('/cron', Cron.cronLaunch);
    /****************** End Cron **************/

    /****************** Sign UP ******************/
    app.post('/api/auth/signup', passport.authenticate('local-signup', {
        successRedirect: '/successSignUp',
        failureRedirect: '/failureSignUp',
        failureFlash: true
    }));
    app.get('/successSignUp', function (req, res) {
        res.json({message: 'OK'});
    });

    app.get('/failureSignUp', function (req, res) {
        res.json({message: 'NOK'});
    });
    /****************** End Sign UP **************/

    /****************** Login ********************/
    app.post('/api/auth/login', passport.authenticate('local-login', {
        successRedirect: '/successLogJson',
        failureRedirect: '/failureLogJson',
        failureFlash: true
    }));

    app.get('/successLogJson', function (req, res) {
        res.json({message: true, user: req.user});
    });

    app.get('/failureLogJson', function (req, res) {
        res.json({message: false});
    });
    /**************** End Login ****************/

    /**************** Logout ******************/
    app.get('/api/auth/logout', function (req, res) {
        req.logOut();
        res.redirect('/');
    });
    /**************** End Logout **************/

    app.get('/admin', Middleware.isAdminIn, function (req, res) {
        res.status(200).send({error: false, session: req.user});
    });

    app.get('/isLog', Middleware.isLoggedIn, function (req, res) {
        res.status(200).send({error: false, session: req.user});
    });

    app.post('/refund/:id', Refund.RefundPostId);

    app.post('/refund/test/:id', Train.refundTrain);

    app.get('/index', function(req, res) {
        console.log(req.user);
        //error.http_success(req, res, { code: 200, message: "logout" });
    });

    // All routes not found => 404
    app.get('*', function (req, res) {
        error.http_error(req, res, {code: 404, message: "Not found"});
    });
};