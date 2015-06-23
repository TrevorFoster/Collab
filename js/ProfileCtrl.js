var app = angular.module("CollabApp");

app.controller("MyProfileCtrl", ["$scope", "$timeout", "$state", "User", "Project", function($scope, $timeout, $state, User, Project) {
    $scope.viewProject = function(projectObj) {
        $state.go("dashboard.project", {
            project: projectObj
        });
    }
}]);

app.controller("ProfileCtrl", ["$scope", "$state", "$stateParams", "User", "Project", function($scope, $state, $stateParams, User, Project) {
    $scope.profile = null;

    $scope.setLocation($stateParams.username + "'s Profile");
    User.get({
        username: $stateParams.username
    }, function(user) {
        $scope.profile = user;

        $scope.profile.projects.forEach(function(project, i) {
            $scope.profile.projects[i] = new Project(project);
        });
    });

    $scope.viewProject = function(projectObj) {
        $state.go("dashboard.project", {
            project: projectObj
        });
    }
}]);
