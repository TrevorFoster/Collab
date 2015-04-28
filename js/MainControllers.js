var app = angular.module("MainControllers", ["ngMaterial"]);


app.controller("MainCtrl", ["$scope", "$http", "$routeParams", "$resource", function($scope, $http, $routeParams, $resource) {
    $scope.selectedIndex = 0;
    $scope.options = [{
        name: "Profile",
        index: 0
    }, {
        name: "Browse Projects",
        index: 1
    }, {
        name: "Manage Projects",
        index: 2
    }];

    $scope.isSelected = function(index) {
        return index == $scope.selectedIndex;
    }

    $scope.changeSelected = function(index) {
        $scope.selectedIndex = index;
    }

    var User = $resource("http://localhost\:8000/api/users/:id", {
        id: "@_id"
    });

    var Project = $resource("http://localhost\:8000/api/projects/:id", {
        id: "@_id"
    });

    $scope.user = null;
    $scope.projects = [];

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
        id: $routeParams.UID
    }, function(user) {
        $scope.user = user;
        getProjects(user.projects);
    });

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
