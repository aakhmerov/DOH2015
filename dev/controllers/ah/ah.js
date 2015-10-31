var async = require('async');
var request = require('request');
var fs = require('fs');

var ah = {
    endpoint: 'https://frahmework.ah.nl/ah/json',
    productGroups: 'productgroepen',
    product: 'producten',
    recipes: 'recepten',
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
    },
    getRecipeIngridientParameter : function (product) {
        return "receptingredienten=" + product;
    },
//  pass recepttrefwoord as a parameter
    getRecipeByProductUrl : function (product) {
        return this.endpoint + "/" + this.recipes + "?" + this.getRecipeIngridientParameter(product) + "&" + this.getAHKeyApiParameter();
    },
    getRecipeIdParameter : function (id) {
        return "receptid=" + id;
    },
    getRecipeByIdUrl : function (id) {
        return this.endpoint + "/" + this.recipes + "?" + this.getRecipeIdParameter(id) + "&" + this.getAHKeyApiParameter();
    }
};

module.exports = function(backend) {
    var recipes = JSON.parse(fs.readFileSync('dev/data/recipes.json', 'utf8'));
    var onlineRecipes = [];
    var loadPictures = function () {
        for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i];
            request(ah.getRecipeByIdUrl(recipe.recept_id), function (err, response, body) {
//                console.log("requesting:" + url);
                // JSON body
                if (err) {
                    console.log(err);
                    return;
                }
                var obj = JSON.parse(body);
                onlineRecipes.push(obj[0]);
            });
        }
    };
    loadPictures();
    console.log(onlineRecipes.length);
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

//                        console.log(url);
                        asyncTasks.push(function(innerCallback){
                            request(url, function (err, response, body) {
                                // JSON body
                                if (err) {
                                    console.log(err);
                                    callback(true);
                                    return;
                                }
                                var obj = JSON.parse(body);
                                var filtered = [];
                                for (var k = 0; k < obj.length; k++) {
                                    if (obj[k]['recepttrefwoord']){
                                        filtered.push(obj[k]);
                                    }
                                }

                                innerCallback(false, filtered);
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

    backend.use('/recipesByProduct/:tag', function (req, res, next) {
//      recepttrefwoord
        var tag = req.params.tag;
        async.waterfall([
                /*
                 * First external endpoint
                 */
                function (callback) {
                    var url = ah.getRecipeByProductUrl(tag);
                    request(url, function (err, response, body) {
                        console.log("requesting:" + url);
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
                res.send({recipes: results});
            }
        );
    });



//  cholesterolarm, glutenvrij, lactosevrij,
    backend.use('/recipesForAllergies/*', function (req, res, next) {
        var allergies = req.params[0].split('/');
        console.log(onlineRecipes.length);
        var results = [];

        for (var i = 0; i < onlineRecipes.length; i++) {
            var recipe = onlineRecipes[i];
//            console.log(recipe);
            console.log(recipe['receptallergeneninfo']);
            if ((!recipe.receptallergeneninfo && recipe.receptallergeneninfo !=='') || allergies.indexOf(recipe.receptallergeneninfo) < 0) {
                results.push(recipe);
            }
        }
        console.log(results.length);
        res.send({recipes: results});
    });
};