/** @jsx React.DOM */

var FoodSelection = React.createClass({displayName: "FoodSelection",
    getInitialState: function() {
      return this.props;
    },
    render: function() {
      var instance = this.state;
      return (React.createElement("div", {className: "col-md-12"}, 
          React.createElement("ul", {className: "breadcrumb stater-text stater-text-uppercase stater-text-purple"}, 
            instance.breadcrumbs.map(function (breadcrumb, i) {
              if ((instance.breadcrumbs.length-1) == i) {
                return (React.createElement("li", {className: "active"}, breadcrumb));
              } else {
                return (React.createElement("li", {onClick: instance.onClick}, breadcrumb));
              }
            })
          )
        ));
    }

});

module.exports = FoodSelection;