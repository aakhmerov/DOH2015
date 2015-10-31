// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ProductSchema   = new mongoose.Schema({
    name: String,
    type: String
});

// Export the Mongoose model
module.exports = mongoose.model('Product', ProductSchema);