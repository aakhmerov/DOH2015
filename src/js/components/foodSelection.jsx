/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');

var FoodSelection = React.createClass({
    getInitialState: function() {
        return {
            recipes: { recipes: []},
            allergies: ["glutenvrij"]
        };
    },

    componentDidMount: function() {        
      	var instance = this;

    	var url = '/api/recipesForAllergies';

        for (var i = 0; i < this.state.allergies.length; i++) {
            url += '/' + this.state.allergies[i];
        };

    	$.get(url, function(result) {
    		var recipes = result;
            if (instance.isMounted()) {
			    instance.setState({
			        recipes: recipes
			    });
			}
        });
    },
    
	render: function() {
    	var instance = this.state;
		
        return (
			<div className="recipes">
                <h3>Meals for you</h3>
	 			{instance.recipes.recipes.map( function (recipe, i) {
					return(<div className="recipe col col-md-4">
                        <div className="recipe-image">
                            <div className="recipe-height" ></div>
                            <ul>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                                <li>&nbsp;</li>
                            </ul>
                        </div>
                    </div>);
				    })}
			</div>);
	}    

});

module.exports = FoodSelection;