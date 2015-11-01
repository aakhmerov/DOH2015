/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');

var FoodSelection = React.createClass({
    getInitialState: function() {
        return {
            recipes: { recipes: []}
        };
    },
    componentDidMount: function() {
    	// Hard coded for now
    	// have to get this information passed through from robertjan
        this.setState({
            allergies: this.props.dietsfilter
        });
        
        console.log(this.props.dietsfilter);
      	var instance = this;
        console.log(this);
    	var allergies = this.state.allergies;

    	var url = '/api/recipesForAllergies';

    	allergies.forEach( function (allergy) {
    		url += '/' + allergy;
    	});

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
					return(<div className="recipe col col-md-4"><img className="recipe-image" src={recipe.receptafbeelding} />
					<div className="recipe-title">{recipe.recepttitel}</div></div>);
				})}
			</div>
		);
	}    

});

module.exports = FoodSelection;
