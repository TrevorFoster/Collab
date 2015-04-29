var Suggestion = require("../models/suggestion");
var express = require("express");
var router = express.Router();

router.route("/suggestions").post(function(req, res) {
    var suggestion = new Suggestion(req.body);

    suggestion.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.json(suggestion);
    });
}).get(function(req, res) {
    Suggestion.find(function(err, suggestions) {
        if (err) {
            return res.send(err);
        }

        res.json(suggestions);
    });
});

router.route("/suggestions/:id").get(function(req, res) {
    Suggestion.findOne({
        _id: req.params.id
    }, function(err, suggestion) {
        if (err) {
            err.error = true;
            return res.send(err);
        }

        res.json(suggestion);
    });
}).post(function(req, res) {
    Suggestion.findOne({
        _id: req.params.id
    }, function(err, suggestion) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            suggestion[prop] = req.body[prop];
        }

        // save the suggestion
        suggestion.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json(suggestion);
        });
    });
}).delete(function(req, res) {
    if (req.params.id == -1) {
        Suggestion.collection.remove(function() {
            res.json({
                message: "CLEARED"
            });
        });
    } else {
        Suggestion.remove({
            _id: req.params.id
        }, function(err, suggestion) {
            if (err) {
                return res.send(err);
            }

            res.json({
                message: "Successfully deleted"
            });
        });
    }
});

module.exports = router;
