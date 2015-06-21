var app = angular.module("DashboardControllers", ["ui.router", "ngMaterial", "apiRef", "ProfileControllers", "ProjectControllers"]);

app.constant("options", [{
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
}]);

app.config(["$stateProvider", "options", function($stateProvider, options) {
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
}]);

app.controller("DashboardCtrl", ["$scope", "$rootScope", "$state", "User", "Project", "options", function($scope, $rootScope, $state, User, Project, options) {

    $scope.username = localStorage.getItem("username");
    $scope.options = options;
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

        var option = options[index];
        $scope.setLocation(option.name);

        return option.view;
    }

    $rootScope.$on("$stateChangeSuccess",
        function(event, toState, toParams, fromState, fromParams) {
            console.log(toState);
            var match = false;
            options.forEach(function(option, i) {
                if ("dashboard." + option.view === toState.name) {
                    $scope.changeSelected(i);
                    match = true;
                }
            });
            if (!match)
                $scope.changeSelected(-1);
        });
}]);
