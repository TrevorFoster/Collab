var app = angular.module("LoginControllers", ["ui.router", "ngMaterial", "apiRef"]);

app.controller("LoginCtrl", ["$scope", "$http", "$state", "$mdDialog", "User", function($scope, $http, $state, $mdDialog, User) {
    $scope.valid = true;

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
            localStorage.setItem("username", user.username);
            $state.go("dashboard.myprofile");
        });
    }

    $scope.showRegister = function(ev) {
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
                        localStorage.setItem("username", user.username);
                        $state.go("dashboard.myprofile");
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
