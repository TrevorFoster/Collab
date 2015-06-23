var app = angular.module("CollabApp");

app.constant("options", [{
    name: "My Profile",
    template: "myprofile-view.html",
    view: "myprofile",
    controller: "MyProfileCtrl",
    index: 0
}, {
    name: "Browse Projects",
    template: "browse-view.html",
    view: "browse",
    controller: "BrowseCtrl",
    index: 1
}, {
    name: "Manage Projects",
    template: "manage-view.html",
    view: "manage",
    controller: "ManageCtrl",
    index: 2
}]);

app.config(["$stateProvider", "options", function($stateProvider, options) {
    options.forEach(function(option) {
        $stateProvider.state("dashboard." + option.view, {
            url: "/" + option.view,
            templateUrl: "views/" + option.template,
            controller: option.controller
        });
    });

    $stateProvider.state("dashboard.project", {
        url: "/project",
        controller: "ProjectPageCtrl",
        templateUrl: "views/project-view.html",
        params: {
            "project": null
        }
    });

    $stateProvider.state("dashboard.projectEdit", {
        url: "/projectEdit",
        controller: "ProjectEditCtrl",
        templateUrl: "views/projectform-view.html",
        params: {
            "project": null
        }
    });

    $stateProvider.state("dashboard.profile", {
        url: "/profile?username",
        controller: "ProfileCtrl",
        templateUrl: "views/profile-view.html"
    });
}]);

app.controller("DashboardCtrl", ["$scope", "$rootScope", "$state", "User", "Project", "options", function($scope, $rootScope, $state, User, Project, options) {
    var updateView = function(currentState) {
        var match = false;

        options.forEach(function(option, i) {
            if ("dashboard." + option.view === currentState) {
                $scope.changeSelected(i);
                match = true;
            }
        });
        if (!match)
            $scope.changeSelected(-1);
    }

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
            updateView(toState.name);
        });

    $scope.options = options;
    $scope.user = null;
    $scope.viewingProject = null;

    updateView($state.current.name);

    User.get({
        username: sessionStorage.getItem("username")
    }, function(user) {
        $scope.user = user;
        $scope.user.projects.forEach(function(project, i) {
            $scope.user.projects[i] = new Project(project);
        });
    });
}]);
