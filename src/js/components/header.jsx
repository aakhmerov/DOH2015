/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
  render: function () {
    return (<div className="header">
      <div className="row">
        <div className="col col-xs-3">
          <div>
            <a href="/"><img src="/public/img/logo.png" alt="Logo"/></a>
          </div>
        </div>
        <div className="col col-xs-9 nav-container">
          <nav className="navbar">
            <div className="container-fluid">
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
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
              </div>
            </div>
          </nav>
        </div>
      </div>

    </div>);
  }

});

module.exports = Header;
