var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var elements = require('../api/json/products.json');
var async = require('async');
var request = require('request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/airplanemeal');


module.exports = function (grunt) {
    grunt.registerTask('server_stub', 'Custom backend stub', function () {
        var done = this.async();
        var backend = express();
        backend.use(bodyParser.json()); // for parsing application/json
        backend.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        // load individual modules of the application
        require('../controllers/ah/ah.js')(backend);
        require('../controllers/meal.js')(backend);

        backend.use('/', function (req, res, next) {
            return res.end("Nothing's here");
        });

        http.createServer(backend).listen(7777).on('close', done);
    });
};

