/** @jsx React.DOM */
var React = require('react');

var FoodSelection = React.createClass({displayName: "FoodSelection",
    getInitialState: function() {
      return this.props;
    },
    render: function() {
      var instance = this.state;
      return (React.createElement("div", {className: "col-md-offset-3 col-md-6"}, 
	    React.createElement("ul", {className: "col-md-12"}, 
	        React.createElement("li", {className: "col-xs-4 col-sm-3 col-md-3 col-lg-2 col-xl-2"}, 
	            React.createElement("div", {className: "blocks"}, 
	                React.createElement("div", {className: "blocks-height"}), 
	                React.createElement("div", {className: "blocks-layer blocks-purple-white"}, 
	                    React.createElement("div", {className: "blocks-text"}, "hallo")
	                )
	            )
	        )
	    )
	));
    }

});

module.exports = FoodSelection;
