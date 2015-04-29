var app = angular.module("MainControllers", ["ngMaterial"]);

app.controller("MainCtrl", ["$scope", "$http", "$routeParams", "$resource", "$timeout", function($scope, $http, $routeParams, $resource, $timeout) {
    $scope.options = [{
        name: "Profile",
        src: "profile-view.html",
        index: 0
    }, {
        name: "Browse Projects",
        src: "browse-view.html",
        index: 1
    }, {
        name: "Manage Projects",
        src: "profile-view.html",
        index: 2
    }];

    $scope.isSelected = function(index) {
        return index == $scope.selectedIndex;
    }

    $scope.changeSelected = function(index) {
        $scope.selectedIndex = index;
        $scope.location = $scope.options[index].name;
    }

    $scope.changeSelected(0);

    var User = $resource("http://localhost\:8000/api/users/:username", {
        username: "@username"
    });

    var Project = $resource("http://localhost\:8000/api/projects/:id", {
        id: "@_id"
    });

    $scope.user = null;
    $scope.projects = [];

    function loadUser() {
        function getProjects(projectIDS) {
            angular.forEach(projectIDS, function(value, key) {
                Project.get({
                    id: value
                }, function(project) {
                    $scope.projects.push(project);
                });
            });
        }

        User.get({
            username: $routeParams.username
        }, function(user) {
            $scope.user = user;
            getProjects(user.projects);
        });
    }

    loadUser();

    $scope.viewProject = function(project) {
        console.log(project.name);
    }

    // function createFilterFor(query) {
    //     var lowercaseQuery = angular.lowercase(query);
    //     return function filterFn(contact) {
    //         return (contact._lowername.indexOf(lowercaseQuery) != -1);
    //     };
    // }

    // $scope.querySearch = function(query) {
    //     var results = query ?
    //         $scope.contacts.filter(createFilterFor(query)) : [];
    //     return results;
    // }

    // $scope.contacts = projectParticipants.map(function(name, i) {
    //     var nParts = name.split(" ");
    //     return {
    //         name: name,
    //         email: "@domain.com",
    //         image: "http://lorempixel.com/50/50/people?0",
    //         _lowername: angular.lowercase(name)
    //     };
    // });

    // $scope.tasks = [{
    //     description: "Test task",
    //     participants: [$scope.contacts[0], $scope.contacts[1]]
    // }, {
    //     description: "Test task",
    //     participants: [$scope.contacts[1], $scope.contacts[2]]
    // }];
}]);


app.directive("projectVote", function() {
    return {
        templateUrl: "views/project-vote.html",
        restrict: "E",
        controller: function($scope, $resource) {
            var Project = $resource("http://localhost\:8000/api/projects/:id", {
                id: "@_id"
            });

            var User = $resource("http://localhost\:8000/api/users/:username", {
                username: "@username"
            });

            $scope.initialize = function(project) {
                if (project.voters === undefined) project.voters = {};
                $scope.rated = project.voters[$scope.user.username] !== undefined;
            }

            $scope.toggleRating = function(project) {
                $scope.rated = !$scope.rated;

                if ($scope.rated) {
                    project.reputation++;
                    project.voters[$scope.user.username] = null;
                    User.get({
                        username: project.author
                    }, function(author) {
                        author.reputation++;
                        author.$save();
                    });
                } else {
                    project.reputation--;
                    delete project.voters[$scope.user.username];
                    User.get({
                        username: project.author
                    }, function(author) {
                        author.reputation--;
                        author.$save();
                    });
                }

                Project.get({
                    id: project._id
                }, function(projectRef) {
                    projectRef.reputation = project.reputation;
                    projectRef.voters = project.voters;
                    projectRef.$save();
                });
            }
        }
    };
});
