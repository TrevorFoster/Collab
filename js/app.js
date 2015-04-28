var projectManageApp = angular.module("ProjectManageApp", ["ngRoute", "ngResource", "LoginControllers", "MainControllers"]);

projectManageApp.config(["$routeProvider",
    function($routeProvider) {
        $routeProvider.
        when("/login", {
            templateUrl: "./views/login-view.html",
            controller: "LoginCtrl"
        }).
        when("/dashboard/:UID", {
            templateUrl: "./views/dashboard-view.html",
            controller: "MainCtrl"
        }).
        otherwise({
            redirectTo: "/login"
        });
    }
]);
