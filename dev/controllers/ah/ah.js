var async = require('async');
var request = require('request');
var fs = require('fs');
var _ = require('lodash');

var ah = {
    endpoint: 'https://frahmework.ah.nl/ah/json',
    productGroups: 'productgroepen',
    product: 'producten',
    recipes: 'recepten',
    clients: 'klanten',
    transactions: 'transacties',
    apikey: 'DpfBSit45NUq7qR1vRg9l7gDQCN9Quj7',
    clientId: '12721',
    getAHKeyApiParameter: function () {
        return "personalkey=" + this.apikey;
    },
    getProductGroupParameter: function (group) {
        return "assortimentsgroepoms=" + group;
    },
    getProductGroupIdParameter: function (group) {
        return "assortimentsgroepnr=" + group;
    },
    getProductGroupsRequest : function () {
        return this.endpoint + "/" + this.productGroups + "?" + this.getAHKeyApiParameter();
    },
    getProductGroupsByIdRequest : function (id) {
        return this.endpoint + "/" + this.productGroups + "?" +this.getProductGroupIdParameter(id) + '&' + this.getAHKeyApiParameter();
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
    getClientIdParameter : function(id) {
        return 'klantid=' + id;
    },
    getRecipeByIdUrl : function (id) {
        return this.endpoint + "/" + this.recipes + "?" + this.getRecipeIdParameter(id) + "&" + this.getAHKeyApiParameter();
    },
    getUserProfile: function(id) {
        return this.endpoint + '/' + this.clients + '?' + this.getClientIdParameter(id) + '&' + this.getAHKeyApiParameter()
    },
    getTransactionHistory: function (id) {
        return this.endpoint + '/' + this.transactions + '?' + this.getClientIdParameter(id) + '&' + this.getAHKeyApiParameter()
    }
};

module.exports = function(backend) {
    var recipes = JSON.parse(fs.readFileSync('dev/data/recipes.json', 'utf8'));
    var onlineRecipes = [];
    var loadPictures = function () {
        for (var i = 0; i < 100; i++) {
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
        var cleanA = [];
        for (var k = 0; k < allergies.length; k++) {
            if (allergies[k]) {
                cleanA.push(allergies[k]);
            }
        }
        allergies = cleanA;
        console.log(allergies);
        var results = [];

        for (var i = 0; i < onlineRecipes.length; i++) {
            var recipe = onlineRecipes[i];
//            console.log(recipe);
//            console.log(recipe['receptclassificatie']);
            var notAllergic = (!recipe.receptallergeneninfo && recipe.receptallergeneninfo !=='') ||
                allergies.indexOf(recipe.receptallergeneninfo) < 0;

            var inCategory = false;
//            console.log(recipe);
            for (var j = 0;j < allergies.length; j++) {
                if (recipe['receptvleesvisofvega'] && recipe['receptvleesvisofvega'].indexOf(allergies[j]) >= 0) {
                    inCategory = true;
                    break;
                }
            }
            if (notAllergic && inCategory) {
                results.push(recipe);
            }
        }
//        console.log(results.length);
        res.send({recipes: results});
    });

  var getTransactions = function (callback) {
    var url = ah.getTransactionHistory(ah.clientId);
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
  };

  var getCategoryById = function (id, callback) {
    var url = ah.getProductGroupsByIdRequest(id);
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
  };

  var processTransactions = function (results, res) {

    var aggregated = _.countBy(results, 'assortimentsgroepnr');
    var mostPopular = _.chain(aggregated)
      .map(function (value, k) {
        return {
          k: k,
          v: value
        };
      })
      .sortBy('v')
      .reverse()
      .slice(0, 3)
      .map(function (category) {
        return getCategoryById.bind(null, category.k);
      }).value();
    async.parallel(mostPopular,
      function (err, results) {
        if (err) {
          console.log(err);
          res.send(500, "Server Error");
          return;
        }
        res.send({popularCat: _.flatten(results)});
      }
    );
  };

  backend.use('/ah/popularCategory/*', function (req, res) {
    async.parallel([
        getTransactions
      ],
      function (err, results) {
        if (err) {
          console.log(err);
          res.send(500, "Server Error");
          return;
        }
        processTransactions(results[0], res);
      }
    );
  });
};
