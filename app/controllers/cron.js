var error = require('../controllers/error');
var validator = require('validator');
var Random = require("random-js");
var random = new Random(Random.engines.mt19937().autoSeed());

var cron = require('cron');
var parser = require('json-parser');
var request = require('request');

var MTrains = require('../models/trains');
var MUsers = require('../models/users');


module.exports = {
    cronLaunch: function (req, res) {
        var oThat = this;
        var jobUp = null;

        jobUp = new cron.CronJob({
            cronTime: '30 * * * *',
            onTick: function () {
                MTrains.findAll({where: {refund: {$eq: false}}}).then(function (result) {
                    var arrayTrain = [];
                    result.forEach(function (item) {
                        arrayTrain.push(item.dataValues)
                    });
                    oThat.getPage(arrayTrain);
                }).catch(function (e) {
                    console.log("Error: get profile!");
                });
                console.log('loop', new Date());
            },
            start: true
        });
    },
    getPage: function (dataFound, url) {
        var oThat = this;
        if (dataFound == undefined)
            dataFound = {};
        if (url == undefined)
            url = 'https://api.sncf.com/v1/coverage/sncf/disruptions';
        request.get(url, {
            'auth': {
                'user': '163c6aea-a547-434e-96fe-d93d54681237',
                'pass': '',
                'sendImmediately': false
            }
        }, function (error, response, body) {
            if (response != undefined) {

                var data = parser.parse(response.body);
                for (var i = 0; i < data.disruptions.length; i++) {
                    for (var j = 0; j < data.disruptions[0].impacted_objects[0].impacted_stops.length; j++) {
                        for (var k = 0; k < dataFound.length; k++) {
                            if (data.disruptions[0].impacted_objects[0].pt_object.trip.name == dataFound[k].num
                                && data.disruptions[0].impacted_objects[0].impacted_stops[j].base_departure_time == dataFound[k].time
                            ) {
                                MUsers.TUsers.find({where: {id: dataFound[k].user_id}}).then(function (result) {
                                    console.log(data.disruptions[0].impacted_objects[0], result);
                                    /** @todo Node call to refund, do with perriea */
                                }).catch(function (e) {
                                    console.log("Error: get profile!");
                                });
                            }
                        }

                        for (var a = data.links.length - 1; a >= 0; a--) {
                            if (data.links[a].type == 'next') {
                                oThat.getPage(dataFound, data.links[a].href);
                                break;
                            }
                        }
                    }
                }
            }

        });
    }
};