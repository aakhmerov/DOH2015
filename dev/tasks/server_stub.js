var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var elements = require('../api/json/products.json');
var async = require('async');
var request = require('request');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/airplanemeal');
var Recipe = require('../models/recipe');
var router = express.Router();


var ah = {
    endpoint: 'https://frahmework.ah.nl/ah/json',
    productGroups: 'productgroepen',
    product: 'producten',
    apikey: 'DpfBSit45NUq7qR1vRg9l7gDQCN9Quj7',
    getAHKeyApiParameter: function () {
        return "personalkey=" + this.apikey;
    },
    getProductGroupParameter: function (group) {
        return "assortimentsgroepoms=" + group;
    },
    getProductGroupsRequest : function () {
        return this.endpoint + "/" + this.productGroups + "?" + this.getAHKeyApiParameter();
    },
    getProductsInGroupUrl : function (group) {
        return this.endpoint + "/" + this.product + "?" + this.getProductGroupParameter(group) + "&" + this.getAHKeyApiParameter();
    }
};



module.exports = function (grunt) {
    grunt.registerTask('server_stub', 'Custom backend stub', function () {
        var done = this.async();
        var backend = express();
        backend.use(bodyParser.json()); // for parsing application/json
        backend.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        // Create a new route with the prefix /recipe
        var recipeRoute = backend.route('/recipe');

        // Create endpoint /api/beers for POSTS
        recipeRoute.post(function(req, res) {
            // Create a new instance of the Beer model
            var recipe = new Recipe();

            // Set the beer properties that came from the POST data
            recipe.name = req.body.name;
            recipe.type = req.body.type;
            recipe.quantity = req.body.quantity;

            // Save the beer and check for errors
            recipe.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Recipe added to the list!', data: recipe });
            });
        });

        recipeRoute.get(function(req, res) {
            Recipe.find(function(err, recipes) {
                if (err)
                    res.send(err);

                res.json(recipes);
            });
        });

        backend.use('/products', function (req, res, next) {
            var results = elements;
            return res.end(JSON.stringify(results));
        });

        backend.use('/productGroups', function (req, res, next) {
            async.parallel([
                    /*
                     * First external endpoint
                     */
                    function (callback) {
                        var url = ah.getProductGroupsRequest();
                        request(url, function (err, response, body) {
                            // JSON body
                            if (err) {
                                console.log(err);
                                callback(true);
                                return;
                            }
                            var obj = JSON.parse(body);
                            callback(false, obj);
                        });
                    }
                ],
                /*
                 * Collate results
                 */
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.send(500, "Server Error");
                        return;
                    }
                    res.send({api1: results[0]});
                }
            );
        });

        backend.use('/allProducts', function (req, res, next) {
            async.waterfall([
                    /*
                     * First external endpoint
                     */
                    function (callback) {
                        var url = ah.getProductGroupsRequest();
                        request(url, function (err, response, body) {
                            // JSON body
                            if (err) {
                                console.log(err);
                                callback(true);
                                return;
                            }
                            var obj = JSON.parse(body);
                            callback(false, obj);
                        });
                    },
                    function (groups,callback) {
                        var products = [];
                        var asyncTasks = [];
//                      TODO: remove limit here
                        for (var i = 0; (i < groups.length && i < 1); i++) {
                            var group = groups[i];
                            var url = ah.getProductsInGroupUrl(group['assortimentsgroepoms']);

                            console.log(url);
                            asyncTasks.push(function(innerCallback){
                                request(url, function (err, response, body) {
                                    // JSON body
                                    if (err) {
                                        console.log(err);
                                        callback(true);
                                        return;
                                    }
                                    var obj = JSON.parse(body);
                                    innerCallback(false, obj);
                                });
                            });


                        }
                        async.parallel(asyncTasks, function(err, results) {
                            // All tasks are done now
                            var allProducts = [];
                            for (var j = 0; j < results.length; j++) {
                                var groupProducts = results[j];
//                                console.log(groupProducts.length);
                                allProducts = allProducts.concat(groupProducts);
                            }
                            callback(false, allProducts);
                        });

                    }
                ],
                /*
                 * Collate results
                 */
                function (err, results) {
                    if (err) {
                        console.log(err);
                        res.send(500, "Server Error");
                        return;
                    }
//                    console.log(results);
                    res.send({products: results});
                }
            );
        });

        backend.use('/', function (req, res, next) {
            return res.end("Nothing's here");
        });



        http.createServer(backend).listen(7777).on('close', done);
    });
};

