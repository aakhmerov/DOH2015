var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var FoodSelection = require('./components/foodSelection');
var MyRecipes = require('./components/myRecipes');
var history = require('history/lib/createBrowserHistory');
var HomePage = require('./routes/home');

ReactDOM.render((
  <Router history={history()}>
    <Route path="/" component={HomePage} />
    <Route path="/overview" component={HomePage} />
    <Route path="/recipes" component={MyRecipes} />
  </Router>
), document.getElementById('root'));
