/** @jsx React.DOM */
var React = require('react');

var DietSelection = React.createClass({
    getInitialState: function() {
      return this.props;
    },
    render: function() {
      var instance = this.state;
      return (<div className="row">
      	<h3>Diet</h3>
	    <ul className="row">
			{instance.diets.map(function (diet, i) {
				return (<li className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1">
		            <div className="blocks">
		                <div className="blocks-height"></div>
		                <div className={"blocks-layer img-diet img-"+ diet}></div>
		            </div>
		        </li>);
			})}
	    </ul>
	</div>);
    }

});

module.exports = DietSelection;
