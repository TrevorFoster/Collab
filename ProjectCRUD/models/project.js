var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    description: String,
    author: String,
    reputation: Number,
    suggestions: [String],
    accepted: [String],
    voters: {
        type: Schema.Types.Mixed,
        default: {}
    }
});

module.exports = mongoose.model("Project", ProjectSchema);
