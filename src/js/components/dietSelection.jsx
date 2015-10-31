/** @jsx React.DOM */
var React = require('react');

var Items = []

var DietItem = React.createClass({
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
	        Items.remove('lol')
        } else {
	        this.setState({
	            isSelected: true
	        })        	
	        Items.push('lol')
        };
    },
    render: function() {
        var isSelected = this.state.isSelected;
        var classes = "blocks-layer img-diet img-"+ this.props.diet;
        if (isSelected) {
            classes = "blocks-layer img-diet img-"+ this.props.diet + " disabled";
        }
        return (<li className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1" onClick={this.handleClick}>
	            <div className="blocks">
	                <div className="blocks-height"></div>
	                <div className={classes}></div>
	            </div>
	        </li>);
    }
});

var DietSelection = React.createClass({
    getInitialState: function() {
      return this.props;
    },

    render: function() {
      var instance = this.props;
      return (<div className="row">
      	<h3>Diet</h3>
	    <ul className="row">
			{instance.diets.map(function (diet, i) {
				return (<DietItem diet={diet}/>);
			})}
	    </ul>
	</div>);
    }
});

module.exports = DietSelection;
