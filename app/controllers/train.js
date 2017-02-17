var error = require('../controllers/error');
var validator = require('validator');
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

var MTrains = require('../models/trains');

module.exports = {
    addTrain: function (req, res) {
        if (validator.isInt(req.body.num) && validator.isDate(req.body.time)) {
            MTrains.create({
                num: req.body.num,
                time: req.body.time,
                price: random.integer(10, 50),
                user_id: req.user.id
            }).then(function (result) {
                error.http_success(req, res, {
                    code: 200,
                    message: 'Train registration successfully completed!',
                    result: result
                });
            }).catch(function (e) {
                console.log("Train registration: Error in user creation.");
                error.http_error(req, res, {code: 400, message: 'An error occurred while registering!'});
            });
        }
        else
            error.http_error(req, res, {code: 400});
    }
};