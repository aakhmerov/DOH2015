/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
  render: function () {
    return (<div>
      <div className="logo">
        <a href="/"><img src="/public/img/logo.png" alt="Logo"/></a>
      </div>
      <nav className="pull-right">
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
      </nav>
    </div>);
    }

});

module.exports = Header;
