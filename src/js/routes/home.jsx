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
        console.log(this.state.dietsFilter);
    },
 
    render: function() {
      var instance = this.state;
      return (<div className="col-md-offset-3 col-md-6">
        <Header active="home"/>
            <hr/>
            <DietSelection diets={this.state.diets} updateFilter={this.handleFilterUpdate} />
            <hr/>
            <FoodSelection dietsFilter={this.state.dietsFilter} />
        </div>);
    }
});
module.exports = HomePage;