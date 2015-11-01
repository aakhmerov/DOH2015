var React = require('react');

var FoodItem = React.createClass({
    getInitialState: function () {
        return {
            isSelected: false
        };
    },
    handleClick: function () {
        if (this.state.isSelected) {
            this.setState({
                isSelected: false
            })
        } else {
            this.setState({
                isSelected: true
            })
        }
        ;
    },
    render: function () {
        var isSelected = this.state.isSelected;
        var classes = "recipe-badges";
        if (isSelected) {
            classes = "recipe-badges recipe-border";
        }
        var recipe = this.props.recipe;
        var map = {
            'glutenvrij': 'glutten.png',
            'lactosevrij': 'lactose.png',
            'cholesterolarm': 'cholesterol.png',
            'vlees': 'meat.png',
            'vis': 'seafood.png',
            'vegetarsch': 'vegetable.png',
            'fruit': 'fruit.png',
            'brood': 'bread.png'
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

        return(<div className="recipe col-md-4" onClick={this.handleClick}>
            <div className="recipe-image" style={blockStyle}>
                <div className="recipe-height"></div>
                <ul className="recipe-badges">
                    {allergyBadges}
                </ul>
            </div>
        </div>);
    }
});



module.exports = FoodItem;
