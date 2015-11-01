/** @jsx React.DOM */
var React = require('react');
var moment = require('moment');

var ActiveFlightWrapper = React.createClass({
    getInitialState: function () {
        return this.props;
    },
    render : function () {
        var d1 = moment(this.props.flight.outboundFlight.departureDateTime).format('YYYY/MM/DD');
        var t1 = moment(this.props.flight.outboundFlight.departureDateTime).format('HH:mm');
        var d2 = moment(this.props.flight.outboundFlight.arrivalDateTime).format('YYYY/MM/DD');
        var t2 = moment(this.props.flight.outboundFlight.arrivalDateTime).format('HH:mm');
        var from = this.props.flight.outboundFlight.departureAirport.locationCode;
        var to = this.props.flight.outboundFlight.arrivalAirport.locationCode;
        return (
            <div className="flight-info-box">
                <h4>Your Flight</h4>
                <hr/>
                <div className="row">
                    <div className="col-xs-12">{this.props.flight.outboundFlight.id}</div>
                </div>
                <div className="row ">
                    <div className="col-xs-6">Departure:</div>
                    <div className="col-xs-6 text-right">{d1}</div>
                </div>
                <div className="row ">
                    <div className="col-xs-6">Time:</div>
                    <div className="col-xs-6 text-right">{t1}-{t2}</div>
                </div>
                <div className="row ">
                    <div className="col-xs-6">Destination:</div>
                    <div className="col-xs-6 text-right">{to}</div>
                </div>
                <div className="row">
                    <div className="col-xs-6">Total Price:</div>
                    <div className="col-xs-6 text-right">{this.props.flight.pricingInfoSum.totalPriceOnePassenger} EUR</div>
                </div>

            </div>
            );
    }
});

var FlightItemWrapper = React.createClass({
    getInitialState: function () {
        return {
            active: false,
            activityStyle: ''
        };
    },
    render: function () {
        var d1 = moment(this.props.flight.outboundFlight.departureDateTime).format('YYYY/MM/DD');
        var t1 = moment(this.props.flight.outboundFlight.departureDateTime).format('HH:mm');
        var d2 = moment(this.props.flight.outboundFlight.arrivalDateTime).format('YYYY/MM/DD');
        var t2 = moment(this.props.flight.outboundFlight.arrivalDateTime).format('HH:mm');
        var from = this.props.flight.outboundFlight.departureAirport.locationCode;
        var to = this.props.flight.outboundFlight.arrivalAirport.locationCode;
        return (
            <div className="row">
                <div className="col-xs-12 cardRow">
                    <div className={"card " + this.state.activityStyle} onClick={this.props.onClick.bind(null, this)}>

                        <div className="row">
                            <div className="col-xs-12 text-right">{this.props.flight.outboundFlight.id}</div>
                        </div>
                        <div className="col-xs-8">
                            <div className="row ">
                                <div className="col-xs-12">{d1}</div>
                            </div>
                            <div className="row ">
                                <div className="col-xs-12">{t1}-{t2}</div>
                            </div>
                            <div className="row ">
                                <div className="col-xs-12 direction">{from}-{to}</div>
                            </div>
                        </div>
                        <div className="col-xs-4 text-right">
                            <img src="//res.cloudinary.com/ideation/image/upload/w_128,h_128/qwbxlw3q1qzeud1okntv.png" className="logo-button"/>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
});

var FlightsSelection = React.createClass({
    getInitialState: function () {
        return this.props;
    },

    handleKidsClick : function (event) {
        var flightInformation = event.props;
        var activity = !event.state.active;
        var activityStyle = activity ? 'active' : '';
        event.setState({
            active: activity,
            activityStyle: activityStyle,

        });
        this.setState ({
            activeFlight : flightInformation.flight,
            flights: this.props.flights
        });
    },

    render: function () {
        var flightItems = '';
        var activeFlightInfo = <div className="flight-info-box">
                <h4>Your Flight</h4>
                <hr/>
                </div>;
        var handleKidsClick = this.handleKidsClick;
        if (this.props.flights) {
            flightItems = [];
            this.props.flights.map(function (flight, i) {
                flightItems.push(<FlightItemWrapper onClick={handleKidsClick} locales={['en-US']} flight={flight} key={i}/>)
            });
        }
        if (this.state.activeFlight) {
            activeFlightInfo = <ActiveFlightWrapper flight={this.state.activeFlight}/>
        }
        return (
        <div className="row flight-page">
            <h3>Flights</h3>
            <div className="flights-list col-xs-8">
            {flightItems}
            </div>
            <div className="flight-info col-xs-4">
            {activeFlightInfo}
            </div>
        </div>);
    }

});

module.exports = FlightsSelection;
