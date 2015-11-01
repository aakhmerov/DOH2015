/** @jsx React.DOM */
var React = require('react');
var Header = require('../components/header');
var FoodSelection = require('./../components/foodSelection');
var DietSelection = require('./../components/dietSelection');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var HomePage = React.createClass({
    getInitialState: function() {
        return {
            diets: ['fruit', 'brood', 'vlees', 'vis', 'vegetarisch', 'soy', 'noten', 'lactose', 'glutten', 'ei', 'cholesterol'],
            dietsfilter: []
        }
    },

    handleFilterUpdate: function(filterValue) {
        this.state.dietsfilter.push(filterValue);
        this.refs['foodSelection'].update();
    },

    render: function() {
      var instance = this.state;
      return (<div className="col-md-offset-3 col-md-6">
        <Header active="meal"/>
        <hr/>
        <DietSelection diets={this.state.diets} updateFilter={this.handleFilterUpdate}/>
        <label className="ah-permission col-md-12">
          <input type="checkbox" value="ah-permission"/> Use my AH shopping history to improve suggestions
        </label>
        <div className="nav-container pull-right">
          <Link className="confirm-button" to={`/summary`}>Confirm</Link>
        </div>
        <hr/>
        <FoodSelection ref="foodSelection" dietsfilter={this.state.dietsfilter} />
        </div>);
    }
});
module.exports = HomePage;

