var app = angular.module("LoginControllers", ["ngMaterial"]);

app.controller("LoginCtrl", ["$scope", "$http", "$location", "$mdDialog", "$resource", function($scope, $http, $location, $mdDialog, $resource) {
    $scope.valid = true;

    var User = $resource("http://localhost\:8000/api/users/:username", {
        username: "@username"
    });
    $scope.verifyCred = function(username) {
        if (!username) {
            $scope.valid = false;
            return;
        }

        var request = $http({
            method: "get",
            url: "http://localhost:8000/api/users/" + username
        }).success(function(user) {
            if (user.error) {
                $scope.valid = false;
                return;
            }
            $location.path("dashboard/" + user.username);
        });
    }

    $scope.showRegister = function(ev) {
        console.log("Hello");
        $mdDialog.show({
            controller: function($scope, $mdDialog) {
                $scope.validateUser = function(username) {
                    var request = $http({
                        method: "post",
                        url: "http://localhost:8000/api/users/register/" + username,
                        data: {
                            name: $scope.register.name,
                            username: username
                        },
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).success(function(user) {
                        if (user.error) return;
                        $mdDialog.hide();
                        $location.path("dashboard/" + user.username);
                    });
                }

                $scope.cancel = function() {
                    $mdDialog.hide();
                }
            },
            templateUrl: "views/register-dialog.html",
            targetEvent: ev,
        });
    }
}]);
