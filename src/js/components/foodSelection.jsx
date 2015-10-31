/** @jsx React.DOM */
var React = require('react');

var FoodSelection = React.createClass({
    getInitialState: function () {
        console.log('food selection init state');
        return this.props;
    },
    render: function () {
        var instance = this.state;
        return (<div className="col-md-12">
        default
        </div>);
    }

});

module.exports = FoodSelection;
