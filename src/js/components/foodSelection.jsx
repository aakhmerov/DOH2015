/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');

var FoodSelection = React.createClass({
    getInitialState: function () {
        return {
            recipes: { recipes: []},
            dietsfilter: this.props.dietsfilter
        };
    },

    componentDidMount: function () {
        var instance = this;

        var url = '/api/recipesForAllergies/';

        for (var i = 0; i < this.props.dietsfilter.length; i++) {
            url += this.props.dietsfilter[i] + '/';
            if (i == this.props.dietsfilter.length) {
                url = url.substring(0, url.length - 1);
            }
        }


        $.get(url, function (result) {
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
            }

        }


        $.get(url, function (result) {
            var recipes = result;
            instance.setState({
                recipes: recipes
            });
            instance.forceUpdate();
        });
    },

    render: function () {
        var instance = this.state;
//        console.log(instance);
        return (<div className="recipes">
            <h3>Meals for you</h3>
	 			{instance.recipes.recipes.map(function (recipe, i) {
                    var map = {
                        'glutenvrij' : 'glutten.png',
                        'lactosevrij' : 'lactose.png',
                        'cholesterolarm' : 'cholesterol.png',
                        'vlees':'meat.png',
                        'vis' : 'seafood.png',
                        'vegetarsch' : 'vegetable.png',
                        'fruit':'fruit.png',
                        'brood' : 'bread.png'
                    };
                    var blockStyle = {
                        backgroundImage: 'url(' + recipe.receptafbeelding + ')'
                    };
                    var allergyBadges = '';
                    if (recipe.receptvleesvisofvega && map[recipe.receptvleesvisofvega]) {
                        allergyBadges = [];
                        var cicon = map[recipe.receptvleesvisofvega];
                        allergyBadges.push(
                            <li>
                                <img src={"/public/img/" + cicon} />
                            </li>
                        );
                    }
                    if (recipe.receptallergeneninfo) {
//                        console.log(recipe);
                        var items = recipe.receptallergeneninfo.split(',');
//                        console.log(items)
                        if (!allergyBadges) {
                            allergyBadges = [];
                        }
                        for (var h = 0; h < items.length; h++) {
                            var badge = items[h];
                            if (badge) {
                                var icon = map[badge];
                                if (icon) {
                                    allergyBadges.push(
                                        <li>
                                            <img src={"/public/img/allergens/" + icon} />
                                        </li>
                                    );
                                }
                            }
                        }
                    }

                    return(<div className="recipe col-md-4">
                        <div className="recipe-image" style={blockStyle}>
                            <div className="recipe-height"></div>
                            <ul className="recipe-badges">
                                {allergyBadges}
                            </ul>
                        </div>
                    </div>);
                })}
        </div>);
    }
});

module.exports = FoodSelection;
