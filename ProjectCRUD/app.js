var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var users = require("./routes/users");
var projects = require("./routes/projects");
var suggestions = require("./routes/suggestions");
var app = express();

var connection = "mongodb://localhost:27017";

mongoose.connect(connection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
});
app.use("/api", users);
app.use("/api", projects);
app.use("/api", suggestions);

module.exports = app;
