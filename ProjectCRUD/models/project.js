var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    author: String,
    votes: Number,
    recommendations: [String],
    accepted: [String]
});

module.exports = mongoose.model("Project", ProjectSchema);
