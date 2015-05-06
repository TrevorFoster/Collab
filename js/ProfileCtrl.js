var app = angular.module("ProfileControllers", ["ngMaterial", "ui.router", "ProjectControllers", "apiRef"]);

app.controller("MyProfileCtrl", ["$scope", "$timeout", "$state", "User", "Project", function($scope, $timeout, $state, User, Project) {
    // $scope.updateRatings = function() {
    //     $timeout(function() {
    //         angular.forEach($scope.projects, function(project, key) {
    //             Project.get({
    //                 id: project._id
    //             }, function(uptoDate) {
    //                 $scope.projects[key] = uptoDate;
    //             });
    //         });
    //         User.get({
    //             username: $scope.user.username
    //         }, function(user) {
    //             $scope.user.reputation = user.reputation;
    //         });
    //         $scope.updateRatings();
    //     }, 10000);
    // }

    // $scope.updateRatings();

    $scope.viewProject = function(project) {
        $state.go("dashboard.project", {
            projectId: project._id
        });
    }
}]);

app.controller("ProfileCtrl", ["$scope", "$state", "$stateParams", "User", "Project", function($scope, $state, $stateParams, User, Project) {
    $scope.profile = null;
    $scope.profileProjects = [];

    function loadUser() {
        function getProjects(projectIDS) {
            projectIDS.forEach(function(id, i) {
                Project.get({
                    id: id
                }, function(project) {
                    project.index = i;
                    $scope.profileProjects.push(project);
                });
            });
        }

        User.get({
            username: $stateParams.username
        }, function(user) {
            $scope.setLocation(user.username + "'s Profile");
            $scope.profile = user;
            getProjects(user.projects);
        });
    }

    loadUser();

    $scope.viewProject = function(project) {
        $state.go("dashboard.project", {
            projectId: project._id
        });
    }
}]);
