var User = require("../models/user");
var express = require("express");
var router = express.Router();

router.route('/users').post(function(req, res) {
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

router.route("/register/:username").post(function(req, res) {
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
}).get(function(req, res) {
    User.findOne({
        username: req.params.username
    }, function(err, user) {
        res.json(user);
    });
});

router.route("/users/:id").get(function(req, res) {
    User.findOne({
        _id: req.params.id
    }, function(err, user) {
        if (err) {
            err.error = true;
            return res.send(err);
        }

        res.json(user);
    });
}).post(function(req, res) {
    User.findOne({
        _id: req.params.id
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

            res.json({
                message: 'User updated!'
            });
        });
    });
}).delete(function(req, res) {
    if (req.params.id == -1) {
        User.collection.remove(function() {
            res.json({
                message: "CLEARED"
            });
        });
    } else {
        User.remove({
            _id: req.params.id
        }, function(err, user) {
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
