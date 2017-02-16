var error     = require('../controllers/error');
var validator = require('validator');
var Web3      = require('web3');
var request   = require('request');

module.exports = {

    RefundPostId: function(req, res)
    {
        var user_id      = req.body.user_id;
        var refund_id    = req.params.id;
        var ether_addr   = req.body.addr;
        var value_refund = req.body.value;

         if (typeof req.params.id == "number")
         {
             if(!Web3.currentProvider)
                 web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

             if(web3.isConnected())
             {
                 var value_ether = 0;
                 request('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR', function (error, response, body) {
                     if (!error && response.statusCode == 200) {
                        var json_price = JSON.parse(body);
                        value_ether = value_refund / json_price.EUR;

                         var coinbase  = web3.eth.coinbase;
                         var code      = web3.eth.getCode(coinbase);

                         web3.eth.sendTransaction({from: coinbase, to: ether_addr, data: code, value: web3.toWei(value_ether, "ether")}, function(err, address) {
                             if (!err)
                                 res.status(200).send({ error: false, message: "OK" });
                             else
                                 error.http_error(req, res, { code: 400, message: "Transaction failed" });
                         });
                     }
                     else
                         error.http_error(req, res, { code: 500 });
                 });
             }
             else
                 error.http_error(req, res, { code: 500 });
         }
         else
             error.http_error(req, res, { code: 400, message: "No id ticket" });
    }
};