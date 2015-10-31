/** @jsx React.DOM */
var React = require('react');

var FoodSelection = React.createClass({displayName: "FoodSelection",
    getInitialState: function () {
        console.log('food selection init state');
        return this.props;
    },
    render: function () {
        var instance = this.state;
        return (React.createElement("div", {className: "col-md-12"}, 
        "default"
        ));
    }

});

module.exports = FoodSelection;
