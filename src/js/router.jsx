var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var FoodSelection = require('./components/foodSelection');
var MyRecipes = require('./components/myRecipes');
var HomePage = require('./routes/home');
var TransaviaPage = require('./routes/transaviaFlight');

ReactDOM.render((
    <Router>
        <Route path="/meal" component={HomePage} />
        <Route path="/flights" component={TransaviaPage} />
    </Router>
    ), document.getElementById('root'));
