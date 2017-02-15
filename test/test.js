var server   = require("../server.js");
var request  = require("request");
var assert   = require('assert');
var base_url = "http://localhost:8080/";

describe("Test Server API", function() {
    it("GET /", function(done) {
        request.get(base_url, function(error, response, body) {
            //expect(response.statusCode).toBe(200);
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it("GET /example", function(done) {
        request.get(base_url + "example", function(error, response, body) {
            //expect(body).toBe("Hello World");
            assert.equal(200, response.statusCode);
            done();
        });
    });

    it("GET /example/1", function(done) {
        request.get(base_url + "example/1", function(error, response, body) {
            //expect(body).toBe("Hello World");
            assert.equal(200, response.statusCode);
            done();
        });
    });
});