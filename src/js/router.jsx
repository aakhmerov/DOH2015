var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var FoodSelection = require('./components/foodSelection');
var MyRecipes = require('./components/myRecipes');
var HomePage = require('./routes/home');
var TransaviaPage = require('./routes/transaviaFlight');
var SummaryPage = require('./routes/summary');

ReactDOM.render((
    <Router>
        <Route path="/" component={TransaviaPage} />
        <Route path="/meal" component={HomePage} />
        <Route path="/flights" component={TransaviaPage} />
        <Route path="/summary" component={SummaryPage} />
    </Router>
    ), document.getElementById('root'));
