/** @jsx React.DOM */
var React = require('react');
var Header = require('../components/header');
var FoodSelection = require('./../components/foodSelection');
var DietSelection = require('./../components/dietSelection');

var HomePage = React.createClass({
    getInitialState: function() {
      return {
        diets: ['fruit', 'bread', 'meat']
      }
    },

    // handleTreeClick: function(i) {
    //     var instance = this;
    //     var clickedTree = this.state.trees[i];

    //     jQuery.get(this.props.treeSource+'/'+clickedTree.id+'/branch', function(result) {
    //         instance.state.branches = result;
    //         instance.state.currentState = 'branches';
    //         console.log(clickedTree);
    //         instance.state.breadcrumbs.push(clickedTree.name);
    //         instance.setState(instance.state);
    //     }.bind(this));
    // },

    render: function() {
      var instance = this.state;
      return (<div className="col-md-offset-3 col-md-6">
        <Header/>
            <hr/>
            <DietSelection diets={this.state.diets}/>
            <hr/>
            <FoodSelection />
        </div>);
    }
});
module.exports = HomePage;
