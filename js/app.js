var app = angular.module("CollabApp", ["ui.router", "ngMaterial", "ngResource"]);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.
    state("login", {
        url: "/login",
        templateUrl: "views/login-view.html",
        controller: "LoginCtrl"
    }).
    state("dashboard", {
        url: "/dashboard",
        templateUrl: "views/dashboard-view.html",
        controller: "DashboardCtrl",
        abstract: true,
        data: {
            rule: function() {
                return sessionStorage.getItem("username") === null;
            }
        }
    });
    $urlRouterProvider.when("", "/login");
    $urlRouterProvider.when("/dashboard", "/dashboard/myprofile");
    $urlRouterProvider.when("/dashboard/", "/dashboard/myprofile");
});

app.run(function($rootScope, $state) {
    $rootScope.$on("$stateChangeStart", function(e, to) {
        if (!to.data || !angular.isFunction(to.data.rule)) return;

        if (to.data.rule()) {
            e.preventDefault();

            $state.go("login");
        }
    });
});

app.factory("User", ["$resource", function UserFactory($resource) {
    return $resource("http://localhost\:8000/api/users/:username", {
        username: "@username"
    });
}]).factory("Project", ["$resource", function ProjectFactory($resource) {
    return $resource("http://localhost\:8000/api/projects/:id", {
        id: "@_id"
    }, {
        create: {
            url: "http://localhost\:8000/api/projects/create/:username",
            method: "POST",
            params: {
                username: "@username"
            }
        },
        getAll: {
            url: "http://localhost\:8000/api/projects",
            method: "GET"
        }
    });
}]);
