/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');

var FlightItemWrapper = React.createClass({
    getInitialState: function () {
        return {
            active : false,
            activityStyle : ''
        };
    },
    handleClick : function () {
        var activity = !this.state.active;
        var activityStyle = activity ? 'active' : '';
        this.setState({
            active : activity,
            activityStyle : activityStyle
        });
    },
    render : function () {
        var d1 = moment(this.props.flight.outboundFlight.departureDateTime).format('YYYY/MM/DD');
        var t1 = moment(this.props.flight.outboundFlight.departureDateTime).format('HH:mm');
        var d2 = moment(this.props.flight.outboundFlight.arrivalDateTime).format('YYYY/MM/DD');
        var t2 = moment(this.props.flight.outboundFlight.arrivalDateTime).format('HH:mm');
        return (
            <div className="col-xs-12 cardRow">
                <div className={"card " + this.state.activityStyle} onClick={this.handleClick}>
                    <div className="row">
                        <div className="col-xs-12 text-right">{this.props.flight.outboundFlight.id}</div>
                    </div>
                    <div className="row ">
                        <div className="col-xs-4">{d1}</div>
                    </div>
                    <div className="row ">
                        <div className="col-xs-4">{t1}-{t2}</div>
                    </div>

                </div>
            </div>
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
                flightItems.push( <FlightItemWrapper locales={['en-US']} flight={flight} key={i}/>)
            });
        } else {
            flightItems = '';
        }
        return (<div className="row">
            <h3>Flights</h3>
            <div className="row">
            {flightItems}
            </div>
        </div>);
    }

});

module.exports = FlightsSelection;
