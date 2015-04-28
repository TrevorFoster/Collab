var Feature = require("../models/feature");
var express = require("express");
var router = express.Router();

router.route('/features').post(function(req, res) {
    var feature = new Feature(req.body);

    feature.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.json(feature);
    });
}).get(function(req, res) {
    Feature.find(function(err, features) {
        if (err) {
            return res.send(err);
        }

        res.json(features);
    });
});

router.route("/features/:id").get(function(req, res) {
    Feature.findOne({
        _id: req.params.id
    }, function(err, feature) {
        if (err) {
            err.error = true;
            return res.send(err);
        }

        res.json(feature);
    });
}).post(function(req, res) {
    Feature.findOne({
        _id: req.params.id
    }, function(err, feature) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            feature[prop] = req.body[prop];
        }

        // save the feature
        feature.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({
                message: 'Proj updated!'
            });
        });
    });
}).delete(function(req, res) {
    if (req.params.id == -1) {
        Feature.collection.remove(function() {
            res.json({
                message: "CLEARED"
            });
        });
    } else {
        Feature.remove({
            _id: req.params.id
        }, function(err, feature) {
            if (err) {
                return res.send(err);
            }

            res.json({
                message: 'Successfully deleted'
            });
        });
    }
});

module.exports = router;
