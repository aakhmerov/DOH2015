/** @jsx React.DOM */
var React = require('react');

var FoodSelection = React.createClass({
    getInitialState: function() {
      return this.props;
    },
    render: function() {
      var instance = this.state;
      return (<div className="col-md-12">
        </div>);
    }

});

module.exports = FoodSelection;
