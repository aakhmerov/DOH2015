/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Header = React.createClass({
    render: function () {
        var getClassName = function (link) {
            return link === this.props.active ? 'active' : ''
        }.bind(this);
        return (<div className="header">
            <div className="row">
                <div className="col col-xs-3">
                    <div>
                        <a href="/">
                            <img src="/public/img/logo.png" alt="Logo"/>
                        </a>
                    </div>
                </div>
                <div className="col col-xs-9 nav-container">
                    <nav className="navbar">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <Link className={getClassName('home')} to={`/`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link className={getClassName('recipes')} to={`/recipes`}>Recipes</Link>
                                    </li>
                                    <li>
                                        <Link className={getClassName('overview')} to={`/overview`}>Overview</Link>
                                    </li>
                                    <li>
                                        <Link className={getClassName('transavia')} to={`/transavia`}>Transavia</Link>
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
