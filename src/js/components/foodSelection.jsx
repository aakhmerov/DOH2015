/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');

var FoodSelection = React.createClass({
    getInitialState: function() {
        return {
            recipes: { recipes: []},
            dietsfilter: this.props.dietsfilter
        };
    },

    componentDidMount: function() {
      	var instance = this;

    	var url = '/api/recipesForAllergies/';

        for (var i = 0; i < this.props.dietsfilter.length; i++) {
            url += this.props.dietsfilter[i] + '/';
            if (i == this.props.dietsfilter.length) {
                url = url.substring(0, url.length - 1);
            };
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

  update: function () {
    var instance = this;

    var url = '/api/recipesForAllergies/';

    for (var i = 0; i < this.props.dietsfilter.length; i++) {
      url += this.props.dietsfilter[i] + '/';
      if (i == this.props.dietsfilter.length) {
        url = url.substring(0, url.length - 1);
      };
    };

    $.get(url, function (result) {
      var recipes = result;
      instance.setState({
        recipes: recipes
      });
      instance.forceUpdate();
    });
  },

	render: function() {
    	var instance = this.state;
		console.log(instance)
        return (<div className="recipes">
                <h3>Meals for you</h3>
	 			{instance.recipes.recipes.map( function (recipe, i) {

                    var blockStyle = {
                        backgroundImage: 'url('+recipe.receptafbeelding+')'
                    };
    				return(<div className="recipe col-md-4">
                        <div className="recipe-image" style={blockStyle}>
                            <div className="recipe-height"></div>
                            <ul className="recipe-badges">
                                <li><img src="/public/img/allergens/egg.png" /></li>
                                <li><img src="/public/img/allergens/soy.png" /></li>
                                <li><img src="/public/img/allergens/egg.png" /></li>
                            </ul>
                        </div>
                    </div>);
			    })}
			</div>);
	}
});

module.exports = FoodSelection;
