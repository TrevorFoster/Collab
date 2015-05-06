var app = angular.module("DashboardControllers", ["ui.router", "ngMaterial", "apiRef", "ProfileControllers", "ProjectControllers"]);

app.config(function($stateProvider) {
    var options = [{
        name: "My Profile",
        template: "myprofile-view.html",
        view: "myprofile",
        index: 0
    }, {
        name: "Browse Projects",
        template: "browse-view.html",
        view: "browse",
        index: 1
    }, {
        name: "Manage Projects",
        template: "myprofile-view.html",
        view: "manage",
        index: 2
    }];

    options.forEach(function(option) {
        $stateProvider.state("dashboard." + option.view, {
            url: "/" + option.view,
            templateUrl: "views/" + option.template,
            controller: "MyProfileCtrl"
        });
    });

    $stateProvider.state("dashboard.project", {
        url: "/project?projectId",
        controller: "ProjectPageCtrl",
        templateUrl: "views/project-view.html"
    });

    $stateProvider.state("dashboard.profile", {
        url: "/profile?username",
        controller: "ProfileCtrl",
        templateUrl: "views/profile-view.html"
    });
});

app.controller("DashboardCtrl", ["$scope", "$rootScope", "$state", "User", "Project", function($scope, $rootScope, $state, User, Project) {
    if (!($scope.username = localStorage.getItem("username"))) {
        $state.go("login");
        return;
    }

    $scope.options = [{
        name: "My Profile",
        template: "profile-view.html",
        view: "myprofile",
        index: 0
    }, {
        name: "Browse Projects",
        template: "browse-view.html",
        view: "browse",
        index: 1
    }, {
        name: "Manage Projects",
        template: "profile-view.html",
        view: "manage",
        index: 2
    }];

    $scope.user = null;
    $scope.projects = [];
    $scope.viewingProject = null;

    function loadUser() {
        function getProjects(projectIDS) {
            projectIDS.forEach(function(id, i) {
                Project.get({
                    id: id
                }, function(project) {
                    project.index = i;
                    $scope.projects.push(project);
                });
            });
        }

        User.get({
            username: $scope.username
        }, function(user) {
            $scope.user = user;
            getProjects(user.projects);
        });
    }

    loadUser();

    $scope.setLocation = function(location) {
        $scope.location = location;
    }

    $scope.isSelected = function(index) {
        return index == $scope.selectedIndex;
    }

    $scope.navClicked = function(index) {
        if (index == $scope.selectedIndex) return;
        var view = $scope.changeSelected(index);
        $state.go("dashboard." + view);
    }

    $scope.changeSelected = function(index) {
        $scope.selectedIndex = index;
        if (index == -1) return;

        var option = $scope.options[index];
        $scope.setLocation(option.name);

        return option.view;
    }

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            var match = false;
            $scope.options.forEach(function(option, i) {
                if ("dashboard." + option.view === toState.name) {
                    $scope.changeSelected(i);
                    match = true;
                }
            });
            if (!match) {
                $scope.changeSelected(-1);
            }
        });
}]);
