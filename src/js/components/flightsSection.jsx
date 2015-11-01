/** @jsx React.DOM */
var React = require('react');

var FlightItemWrapper = React.createClass({
    getInitialState: function () {
        return this.props;
    },
    render : function () {
        return (
            <li className="col-xs-12">
                <div className="">
                    <div className=""></div>
                    <div>{this.props.flight.outboundFlight.id}</div>
                </div>
            </li>
            );
    }
});

var FlightsSelection = React.createClass({
    getInitialState: function() {
        return this.props;
    },
    render: function() {
        var flightItems;
        if (this.props.flights) {
            flightItems = [];
            this.props.flights.map (function (flight,i) {
                flightItems.push( <FlightItemWrapper flight={flight} key={i}/>)
            });
        } else {
            flightItems = '';
        }
        return (<div className="row">
            <h3>Flights</h3>
            <ul className="row">
            {flightItems}
            </ul>
        </div>);
    }

});

module.exports = FlightsSelection;
