/** @jsx React.DOM */
var React = require('react');

var FoodSelection = React.createClass({displayName: "FoodSelection",
    getInitialState: function() {
      return this.props;
    },
    render: function() {
      var instance = this.state;
      return (React.createElement("div", {className: "col-md-12"}
        ));
    }

});

module.exports = FoodSelection;
