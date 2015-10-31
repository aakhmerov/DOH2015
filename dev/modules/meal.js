var Recipe = require('../models/recipe');
var express = require('express');

module.exports = function( backend) {
    var router = express.Router();
    var recipeRoute = backend.route('/recipe');

    // Create endpoint /api/beers for POSTS
    recipeRoute.post(function(req, res) {
        // Create a new instance of the Beer model
        var recipe = new Recipe();

        // Set the beer properties that came from the POST data
        recipe.name = req.body.name;
        recipe.type = req.body.type;
        recipe.quantity = req.body.quantity;

        // Save the beer and check for errors
        recipe.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Recipe added to the list!', data: recipe });
        });
    });

    recipeRoute.get(function(req, res) {
        Recipe.find(function(err, recipes) {
            if (err)
                res.send(err);

            res.json(recipes);
        });
    });
};
