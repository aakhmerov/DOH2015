/** @jsx React.DOM */
var React = require('react');

var FoodSelection = React.createClass({
    getInitialState: function() {
      return this.props;
    },
    render: function() {
      var instance = this.state;
      return (<div className="row">
	    <ul className="col-md-12">
	        <li className="col-xs-4 col-sm-3 col-md-3 col-lg-2 col-xl-2">
	            <div className="blocks">
	                <div className="blocks-height"></div>
	                <div className="blocks-layer blocks-purple-white">
	                    <div className="blocks-text">hallo</div>
	                </div>
	            </div>
	        </li>
	    </ul>
	</div>);
    }

});

module.exports = FoodSelection;
