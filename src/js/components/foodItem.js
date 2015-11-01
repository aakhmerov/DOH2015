var React = require('react');

var FoodItem = React.createClass({
  getInitialState: function() {
    return {
      isSelected: false
    };
  },
  handleClick: function() {
    if (this.state.isSelected) {
      this.setState({
        isSelected: false
      })
    } else {
      this.setState({
        isSelected: true
      })
    };
  },
  render: function() {
    var isSelected = this.state.isSelected;
    var classes = "recipe-badges";
    if (isSelected) {
      classes = "recipe-badges recipe-border";
    }

    var blockStyle = {
        backgroundImage: 'url('+this.props.recipe.receptafbeelding+')'
    };
      return(<div className="recipe col-md-4" onClick={this.handleClick}>
                <div className="recipe-image" style={blockStyle}>
                    <div className="recipe-height"></div>
                    <ul className={classes}>
                        <li><img src="/public/img/allergens/egg.png" /></li>
                        <li><img src="/public/img/allergens/soy.png" /></li>
                        <li><img src="/public/img/allergens/egg.png" /></li>
                    </ul>
                </div>
            </div>);
  }
});

module.exports = FoodItem;
