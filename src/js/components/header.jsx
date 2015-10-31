/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
    render: function () {
      return (<div>
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/recipes`}>Recipes</Link>
          </li>
          <li>
            <Link to={`/overview`}>Overview</Link>
          </li>
        </ul>
      </div>);
    }

});

module.exports = Header;
