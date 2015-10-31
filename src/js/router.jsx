var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var FoodSelection = require('./components/foodSelection');
var MyRecipes = require('./components/myRecipes');
var HomePage = require('./routes/home');

ReactDOM.render((
  <Router>
    <Route path="/" component={FoodSelection} />
    <Route path="/overview" component={HomePage} />
    <Route path="/recipes" component={MyRecipes} />
  </Router>
), document.getElementById('root'));
