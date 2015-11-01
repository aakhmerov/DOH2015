/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');
var Header = require('../components/header');
var FlightsSelection = require('../components/flightsSection');
var moment = require('moment');

var TransaviaPage = React.createClass({
    getInitialState: function() {
//        return {flightOffer : [{flights : []}]};
        return this.props;
    },
//    getDefaultProps : function () {
//        return {flightOffer : []};
//    },
    componentDidMount: function() {
        var date = moment().add(1,'days').format('YYYYMMDD');
        var url = 'api/transavia/flights/' + date;
        $.get(url, function(result) {
            var flights = result.flights;
            if (this.isMounted()) {
                this.setState({
                    flightOffer: flights.flightOffer
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
        <div className="col-md-offset-3 col-md-6">
            <Header active="transavia"/>
            <FlightsSelection flights={this.state.flightOffer}/>
        </div>);
    }

});

module.exports = TransaviaPage;