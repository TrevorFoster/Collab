var app = angular.module("apiRef", ["ngResource"]);

app.factory("User", ["$resource", function UserFactory($resource) {
    return $resource("http://localhost\:8000/api/users/:username", {
        username: "@username"
    });
}]).factory("Project", ["$resource", function ProjectFactory($resource) {
    return $resource("http://localhost\:8000/api/projects/:id", {
        id: "@_id"
    });
}]);
