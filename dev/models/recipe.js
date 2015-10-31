// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var RecipeSchema = new mongoose.Schema({
    name: String,
    type: String,
    quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Recipe', RecipeSchema);