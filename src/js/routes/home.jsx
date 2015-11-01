/** @jsx React.DOM */
var React = require('react');
var Header = require('../components/header');
var FoodSelection = require('./../components/foodSelection');
var DietSelection = require('./../components/dietSelection');

var HomePage = React.createClass({
    getInitialState: function() {
        return {
            diets: ['fruit', 'bread', 'meat', 'seafood', 'vegetable', 'devider', 'soy', 'peanut', 'lactose', 'glutten', 'egg', 'cholesterol'],
            dietsFilter: []
        }
    },

    handleFilterUpdate: function(filterValue) {
        this.state.dietsFilter.push(filterValue);
        this.refs['foodSelection'].forceUpdate();
    },

    render: function() {
      var instance = this.state;
      return (<div className="col-md-offset-3 col-md-6">
        <Header active="home"/>
            <hr/>
            <DietSelection diets={this.state.diets} updateFilter={this.handleFilterUpdate} />
            <label className="ah-permission col-md-12">
                <input type="checkbox" value="ah-permission" /> Use my AH shopping history to improve suggestions
            </label>
            <hr/>
            <FoodSelection ref="foodSelection" dietsFilter={this.state.dietsFilter} />
        </div>);
    }
});
module.exports = HomePage;

