var User = require("../models/user");
var Project = require("../models/project");
var express = require("express");
var router = express.Router();

router.route("/users").post(function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.json(user);
    });
}).get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            return res.send(err);
        }

        res.json(users);
    });
});

router.route("/users/register/:username").post(function(req, res) {
    User.findOne({
        username: req.params.username
    }, function(err, user) {
        if (!user) {
            var user = new User(req.body);
            user.save(function(err) {
                if (err) {
                    err.error = true;
                    return res.send(err);
                }

                res.json(user);
            })
        } else {
            res.json({
                error: true
            })
        }
    })
});

router.route("/users/:username").get(function(req, res) {
    User.findOne({
        username: req.params.username
    }, function(err, user) {
        if (err) {
            err.error = true;
            return res.send(err);
        }
        user = user.toObject();

        Project.find({
            "_id": {
                $in: user.projects
            }
        }).lean().exec(function(err, projects) {
            if (err) {
                err.error = true;
                return res.send(err);
            }

            user.projects = projects;
            res.json(user);
        });
    });
}).post(function(req, res) {
    User.findOne({
        username: req.params.username
    }, function(err, user) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            user[prop] = req.body[prop];
        }

        // save the user
        user.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json(user);
        });
    });
}).delete(function(req, res) {
    if (req.params.username == -1) {
        User.collection.remove(function() {
            res.json({
                message: "CLEARED"
            });
        });
    } else {
        User.remove({
            username: req.params.username
        }, function(err, user) {
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
