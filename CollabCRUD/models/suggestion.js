var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var suggestionSchema = new Schema({
    description: String,
    author: String,
    votes: Number
});

module.exports = mongoose.model("Suggestion", suggestionSchema);
