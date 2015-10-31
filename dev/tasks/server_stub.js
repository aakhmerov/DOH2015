var express = require('express');
var http = require('http');
var path = require('path');
var elements = require('../api/json/products.json');

var ah = {
    endpoint : 'https://frahmework.ah.nl/ah/json',
    productgrous : 'productgroepen',
    product : 'producten',
    apikey : 'DpfBSit45NUq7qR1vRg9l7gDQCN9Quj7',
    getAHKeyApiParameter : function () {
        return "personalkey=" + this.apikey;
    },
    getProductGroupParameter : function (group) {
        return "assortimentsgroepoms" + group;
    }
}

module.exports = function (grunt) {
    grunt.registerTask('server_stub', 'Custom backend stub', function() {
        var done = this.async();
        var backend = express();

        backend.use('/products', function(req, res, next) {
            var results = elements;
            return res.end(JSON.stringify(results));
        });

        backend.use('/productGrups', function(req, producsResponse, next) {
            var path = "/" + ah.productgrous + "?" + ah.getAHKeyApiParameter();
            var options = {
              host: ah.endpoint,
              path: path
            };
            var processGroupsResponse = function (response) {
              var str = '';

              //another chunk of data has been recieved, so append it to `str`
              response.on('data', function (chunk) {
                str += chunk;
              });

              //the whole response has been recieved, so we just print it out here
              response.on('end', function () {
                  producsResponse.end(JSON.stringify(data));
              });
            };
            http.request(options, processGroupsResponse).end();            
        });


        backend.use('/', function(req, res, next) {
            return res.end("Nothing's here");
        });

        http.createServer(backend).listen(7777).on('close', done);
    });
};
