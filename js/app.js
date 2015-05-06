var app = angular.module("ProjectManageApp", ["ui.router", "LoginControllers", "DashboardControllers"]);

app.config(function($stateProvider) {
    $stateProvider.
    state("login", {
        url: "/login",
        templateUrl: "views/login-view.html",
        controller: "LoginCtrl"
    }).
    state("dashboard", {
        url: "/dashboard",
        templateUrl: "views/dashboard-view.html",
        controller: "DashboardCtrl"
    });
});
