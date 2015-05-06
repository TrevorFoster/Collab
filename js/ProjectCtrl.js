var app = angular.module("ProjectControllers", ["ngMaterial", "ui.router", "apiRef"]);

app.controller("ProjectPageCtrl", ["$scope", "$resource", "$stateParams", "$state", "Project", function($scope, $resource, $stateParams, $state, Project) {
    Project.get({
        id: $stateParams.projectId
    }, function(project) {
        $scope.project = project;
        $scope.setLocation(project.name);
    });

    $scope.viewAuthor = function() {
        if ($scope.user.username === $scope.project.author) {
            $state.go("dashboard.myprofile");
        } else {
            $state.go("dashboard.profile", {
                "username": $scope.project.author
            });
        }
    }
}]);


app.directive("projectVote", function() {
    return {
        templateUrl: "views/project-vote.html",
        restrict: "E",
        link: function(scope, element, attributes) {
            element.addClass("vote-poll");
        },
        controller: ["$scope", "$resource", "User", "Project", function($scope, $resource, User, Project) {
            var project = null;

            var initialized = $scope.$watch("project", function() {
                if ($scope.project !== undefined) {
                    project = $scope.project;
                    if (project.voters === undefined) project.voters = {};
                    $scope.rated = project.voters[$scope.user.username] !== undefined;
                }
            });

            $scope.toggleRating = function() {
                $scope.rated = !$scope.rated;

                if ($scope.rated) {
                    project.reputation++;
                    project.voters[$scope.user.username] = null;

                    // Update author's reputation
                    User.get({
                        username: project.author
                    }, function(author) {
                        author.reputation++;
                        author.$save();
                    });
                } else {
                    project.reputation--;
                    delete project.voters[$scope.user.username];

                    // Update author's reputation
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
        }]
    };
});
