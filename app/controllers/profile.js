var error = require('../controllers/error');
var validator = require('validator');
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

var MTrains = require('../models/trains');

module.exports = {
    getProfile: function (req, res) {
        if (req.user.id != undefined)
            MTrains.findAll({
                where: {
                    user_id: req.user.id
                }
            }).then(function (result) {
                res.json({
                    code: 200,
                    message: 'Profile get successfully!',
                    result: result
                });
            }).catch(function (e) {
                console.log("Error: get profile!");
                error.http_error(req, res, {code: 400, message: 'Error!'});
            });
    }
};