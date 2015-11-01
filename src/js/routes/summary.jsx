/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');
var Header = require('../components/header');

var SummaryPage = React.createClass({
  render: function() {
    return (
      <div className="col-md-offset-3 col-md-6">
        <Header active="summary"/>
        <hr/>
        <div className="summary">
          <h3>Confirmation</h3>
          <p>Your inflight meal selection has been confirmed.</p>
          <h3>Thank you</h3>
        </div>
      </div>);
  }
});

module.exports = SummaryPage;
