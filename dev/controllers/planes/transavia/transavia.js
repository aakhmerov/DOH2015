var async = require('async');
var request = require('request');

//TODO: put all configs here
var trasnavia = {
    api : 'https://api.transavia.com/v1/flightoffers/',
    key : 'TsihNH48oSGV7wBA4F9oTbJqGtOS1fox',
    secret : 'WmYo4pv285CFRIG0',
    flightoffers : '/v1/flightoffers/?adults=1',
    endpoint : 'https://api.transavia.com',
    getFlightsUrl : function (iata,date) {
        return this.endpoint + this.flightoffers + "&origin=" + iata + "&origindeparturedate=" + date;
    }
};

module.exports = function(backend) {
//  departre date yyyyMMdd
    backend.use('/transavia/flights/:date', function (req, res, next) {
        var iata = 'AMS';
        var date = req.params.date;
        async.parallel([
                /*
                 * First external endpoint
                 */
                function (callback) {
                    var url = trasnavia.getFlightsUrl(iata,date);
                    var options = {
                        url : url,
                        method: 'GET',
                        headers: { //We can define headers too
                            'Content-Type': 'application/json',
                            'apikey': trasnavia.key
                        }
                    };
                    request(options, function (err, response, body) {
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
                res.send({flights: results[0]});
            }
        );
    });
};