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
	    <ul className="col-md-offset-2 col-md-8">
			{instance.diets.map(function (diet, i) {
				return (<li className="col-xs-4 col-sm-3 col-md-3 col-lg-2 col-xl-2">
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
