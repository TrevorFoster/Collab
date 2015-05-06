var Project = require("../models/project");
var express = require("express");
var router = express.Router();

router.route('/projects').post(function(req, res) {
    var project = new Project(req.body);

    project.save(function(err) {
        if (err) {
            return res.send(err);
        }

        res.json(project);
    });
}).get(function(req, res) {
    Project.find(function(err, projects) {
        if (err) {
            return res.send(err);
        }

        res.json(projects);
    });
});

router.route("/projects/:id").get(function(req, res) {
    Project.findOne({
        _id: req.params.id
    }, function(err, project) {
        if (err) {
            err.error = true;
            return res.send(err);
        }

        res.json(project);
    });
}).post(function(req, res) {
    Project.findOne({
        _id: req.params.id
    }, function(err, project) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            project[prop] = req.body[prop];
        }

        // save the project
        project.save(function(err) {
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
        Project.collection.remove(function() {
            res.json({
                message: "CLEARED"
            });
        });
    } else {
        Project.remove({
            _id: req.params.id
        }, function(err, project) {
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
