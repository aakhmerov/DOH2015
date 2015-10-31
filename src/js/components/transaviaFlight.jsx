/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');
var Header = require('./header');



var TransaviaPage = React.createClass({
    getInitialState: function() {
        return this.props;
    },
    render: function() {
        var instance = this.state;
        return (
        <div className="col-md-offset-3 col-md-6">
            <Header active="transavia"/>
            you can see transavia flights here
        </div>);
    }

});

module.exports = TransaviaPage;