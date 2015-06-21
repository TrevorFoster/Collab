var app = angular.module("ProjectManageApp", ["ui.router", "LoginControllers", "DashboardControllers"]);

app.config(function ($stateProvider, $urlRouterProvider) {
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
                return localStorage.getItem("username") === null;
            }
        }
    });
    $urlRouterProvider.when("", "/login");
    $urlRouterProvider.when("/dashboard", "/dashboard/myprofile");
    $urlRouterProvider.when("/dashboard/", "/dashboard/myprofile");
});

app.run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
        if (!to.data || !angular.isFunction(to.data.rule)) return;

        if (to.data.rule()) {
            e.preventDefault();

            $state.go("login");
        }
    });
});
