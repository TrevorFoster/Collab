var projectManageApp = angular.module("ProjectManageApp", ["ngRoute", "ngResource", "LoginControllers", "MainControllers"]);

projectManageApp.config(["$routeProvider",

    function($routeProvider, $location) {
        $routeProvider.
        when("/login", {
            templateUrl: "views/login-view.html",
            controller: "LoginCtrl"
        }).
        when("/dashboard/:username", {
            templateUrl: "views/dashboard-view.html",
            controller: "MainCtrl"
        }).
        otherwise({
            redirectTo: "/login"
        });
    }
]);
