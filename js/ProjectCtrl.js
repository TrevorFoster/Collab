var app = angular.module("CollabApp");

app.controller("ProjectPageCtrl", ["$scope", "$resource", "$stateParams", "$state", "Project", function($scope, $resource, $stateParams, $state, Project) {
    $scope.project = $stateParams.project;

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

app.controller("ProjectEditCtrl", ["$scope", "$resource", "$stateParams", "$state", "Project", function($scope, $resource, $stateParams, $state, Project) {
    $scope.project = $stateParams.project;
    console.log($scope.project);
    if (!$scope.project) {
        Project.create({
            username: $scope.user.username
        }, function(proj) {
            $scope.project = new Project(proj);
            $scope.user.projects.push($scope.project);
        });
    }

    $scope.saveProject = function(project) {
        $scope.project.$save();
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
