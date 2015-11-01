/** @jsx React.DOM */
var React = require('react');
var DietItem = require('./dietItem');

var DietSelection = React.createClass({
    getInitialState: function() {
      return this.props;
    },

    handleFilterUpdate: function(filterValue) {
        this.props.updateFilter(filterValue);
    },

    render: function() {
      var instance = this.props;
      return (<div className="row">
        <h3>Diet</h3>
            <ul className="row">
                {instance.diets.map(function (diet, i) {
                    return (<DietItem updateFilter={this.handleFilterUpdate} diet={diet}/>);
                }, this)}
            </ul>
        </div>);
    }
});

module.exports = DietSelection;
