// Load required packages
var mongoose = require('mongoose');
var Product = require('./product');
var ObjectId = mongoose.Schema.Types.ObjectId;

// Define our beer schema
var RecipeSchema = new mongoose.Schema({
    name: String,
    type: String,
    products: [{type: mongoose.Schema.Types.Mixed }]
});

// Export the Mongoose model
module.exports = mongoose.model('Recipe', RecipeSchema);