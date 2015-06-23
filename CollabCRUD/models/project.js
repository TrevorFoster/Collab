var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    description: String,
    author: String,
    reputation: {
        type: Number,
        default: 0
    },
    suggestions: {
        type: [String],
        default: []
    },
    accepted: {
        type: [String],
        default: []
    },
    voters: {
        type: {
            String: null
        },
        default: {}
    },
    created: Date
});

module.exports = mongoose.model("Project", ProjectSchema);
