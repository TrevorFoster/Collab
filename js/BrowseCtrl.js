angular.module("CollabApp").controller("BrowseCtrl", ["$scope", "Project", function($scope, Project) {
    Project.getAll(function(projects) {
        $scope.projectList = projects.list;
    });

    var filters = [{
        name: "Most Popular",
        prop: "-reputation"
    }, {
        name: "Most Recent",
        prop: "-created"
    }]

    $scope.filter = filters[0];
}]);
