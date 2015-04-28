var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var FeatureSchema = new Schema({
    description: String,
    author: String,
    votes: Number
});

module.exports = mongoose.model("Feature", FeatureSchema);
