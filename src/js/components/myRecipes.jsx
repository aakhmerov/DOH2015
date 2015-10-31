/** @jsx React.DOM */
var React = require('react');
var $ = require('../../vendor/jquery/dist/jquery.min');
var Header = require('./header');

var ProductItemWrapper = React.createClass({
    getInitialState: function () {
        return {data : {}};
    },
    render : function () {
        return <label>{this.props.data.name}</label>;
    }
});

var RecipeItemWrapper = React.createClass({
    getInitialState: function () {
        return {
            data : {
            products : []
        }};
    },
    render: function () {

        return (
            <li>
                <div className="recipe">
                    <label>Name:</label>
                    <span>{this.props.data.name}</span>
                </div>
                <div className="products">
                    {this.props.data.products.map(function (product) {
                        return <ProductItemWrapper key={product.name} data={product}/>;
                    })}
                </div>
            </li>
            );
    }
});

var MyRecipes = React.createClass({
    getInitialState: function () {
        return {recipes : []};
    },
    componentDidMount: function() {
        $.get('/api/recipe', function(result) {
            var recipes = result;
            if (this.isMounted()) {
                this.setState({
                    recipes: recipes
                });
            }
        }.bind(this));
    },
    render: function () {
      return (
        <div>
          <Header active="recipes"/>
          <ul>
            {this.state.recipes.map(function (result) {
              return <RecipeItemWrapper key={result._id} data={result}/>;
            })}
          </ul>
        </div>
      );
    }
});

module.exports = MyRecipes;
