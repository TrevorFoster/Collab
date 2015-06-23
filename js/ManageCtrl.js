angular.module("CollabApp").controller("ManageCtrl", ["$scope", "$state", function($scope, $state) {

    $scope.editProject = function(projectObj) {
        $state.go("dashboard.projectEdit", {
            project: projectObj
        });
    }

    $scope.newProject = function() {
        $state.go("dashboard.projectEdit");
    }
}]);
