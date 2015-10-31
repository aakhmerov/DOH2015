var async = require('async');
var request = require('request');

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

module.exports = function( backend) {

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
};