/** @jsx React.DOM */

var FoodSelection = React.createClass({
    getInitialState: function() {
      return this.props;
    },
    render: function() {
      var instance = this.state;
      return (<div className="col-md-12">
          <ul className="breadcrumb stater-text stater-text-uppercase stater-text-purple">
            {instance.breadcrumbs.map(function (breadcrumb, i) {
              if ((instance.breadcrumbs.length-1) == i) {
                return (<li className="active">{breadcrumb}</li>);
              } else {
                return (<li onClick={instance.onClick}>{breadcrumb}</li>);
              }
            })}
          </ul>
        </div>);
    }

});

module.exports = FoodSelection;