var error = require('../controllers/error');
var validator = require('validator');
var Web3 = require('web3');
var request = require('request');
var MTrains = require('../models/trains.js');
var lib = require('email');
var Email = lib.Email;

module.exports = {

    RefundPostId: function (req, res) {
        var user = req.user;
        var refund_id = req.params.id;
        var ether_addr = req.body.addr;
        var value_refund = req.body.value;

        if (typeof req.params.id == "number") {
            if (!Web3.currentProvider)
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

            if (web3.isConnected()) {
                var value_ether = 0;
                request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR', function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var json_price = JSON.parse(body);
                        value_ether = value_refund / json_price.EUR;

                        var coinbase = web3.eth.coinbase;
                        var code = web3.eth.getCode(coinbase);

                        web3.eth.sendTransaction({
                            from: coinbase,
                            to: ether_addr,
                            data: code,
                            value: web3.toWei(value_ether, "ether")
                        }, function (err, address) {
                            if (!err) {
                                MTrains.update(
                                    {refund: true, timeRefund: new Date()},
                                    {where: {id: refund_id}}
                                ).success(function (result) {
                                    console.log(result);
                                    lib.from = 'Jonthan.LT@gmail.com';
                                    var mail = new Email({
                                        to: user.mail,
                                        subject: "Knock knock... RefundMyTrains.io",
                                        body: "Refund incoming for " + result.num
                                    });
                                    mail.send();
                                    res.status(200).send({error: false, message: "OK"});
                                }).error(function (err) {
                                    console.log('Success')
                                });
                            }
                            else
                                error.http_error(req, res, {code: 400, message: "Transaction failed"});
                        });
                    }
                    else
                        error.http_error(req, res, {code: 500});
                });
            }
            else
                error.http_error(req, res, {code: 500});
        }
        else
            error.http_error(req, res, {code: 400, message: "No id ticket"});
    },
    RefundTestPostId: function (req, res) {
        var user_id = 1;
        var refund_id = req.params.id;
        var ether_addr = req.body.addr;
        var value_refund = req.body.value;

        if (typeof req.params.id == "number") {
            if (!Web3.currentProvider)
                web3 = new Web3(new Web3.providers.HttpProvider("172.16.5.13:8545"));

            if (web3.isConnected()) {
                var value_ether = 0;
                request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR', function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var json_price = JSON.parse(body);
                        value_ether = value_refund / json_price.EUR;

                        var coinbase = web3.eth.coinbase;
                        var code = web3.eth.getCode(coinbase);

                        web3.eth.sendTransaction({
                            from: coinbase,
                            to: ether_addr,
                            data: code,
                            value: web3.toWei(value_ether, "ether")
                        }, function (err, address) {
                            if (!err) {
                                MTrains.update(
                                    {refund: true, timeRefund: new Date()},
                                    {where: {id: refund_id}}
                                ).success(function (result) {
                                    console.log(result);
                                    lib.from = 'Jonthan.LT@gmail.com';
                                    var mail = new Email({
                                        to: user.mail,
                                        subject: "Knock knock... RefundMyTrains.io",
                                        body: "Refund incoming for " + result.num
                                    });
                                    mail.send();
                                    res.status(200).send({error: false, message: "OK"});
                                }).error(function (err) {
                                    console.log('Success')
                                });
                            }
                            else
                                error.http_error(req, res, {code: 400, message: "Transaction failed"});
                        });
                    }
                    else
                        error.http_error(req, res, {code: 500});
                });
            }
            else
                error.http_error(req, res, {code: 500});
        }
        else
            error.http_error(req, res, {code: 400, message: "No id ticket"});
    }
};