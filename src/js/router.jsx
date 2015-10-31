var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var FoodSelection = require('./components/foodSelection');

ReactDOM.render((
  <Router>
    <Route path="/" component={FoodSelection} />
    <Route path="/" component={FoodSelection} />
  </Router>
), document.getElementById('root'));
