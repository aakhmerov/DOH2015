var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var HomePage = require('./routes/home');

ReactDOM.render((
  <Router>
    <Route path="/" component={HomePage} />
    <Route path="/overview" component={FoodSelection} />
  </Router>
), document.getElementById('root'));
