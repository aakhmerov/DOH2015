var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var FoodSelection = require('./components/foodSelection');
var MyRecipes = require('./components/myRecipes');

ReactDOM.render((
  <Router>
    <Route path="/" component={FoodSelection}>
    </Route>
    <Route path="/recipes" component={MyRecipes}>
    </Route>
  </Router>
), document.getElementById('root'));
