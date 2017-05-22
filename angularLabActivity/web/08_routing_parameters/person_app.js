var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.config(function ($routeProvider) {
    $routeProvider.
            when('/', {
                templateUrl: 'person_list.html',
                controller: 'personController'
            }).
            when('/list', {
                templateUrl: 'person_list.html',
                controller: 'personController'
            }).
            when('/:personId', {
                templateUrl: 'person_detail.html',
                controller: 'personDetailController'
            }).
            otherwise({
                redirectTo: '/'
            });
});

demoApp.controller('personDetailController', function ($scope, $http, $routeParams) {
    console.log("personDetailController");
    console.log($routeParams);
    $scope.personId = $routeParams.personId;
    var jsonFile = "person_" + $routeParams.personId + ".json";

    $http.get(jsonFile).then(
            function (response) { // this function will run if http.get success
                console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.person = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("ajax error");
                console.log(response);
                console.log("");
                if (response.status == "403") {
                    $scope.errorMsg = "$http.get: file not found.";
                } else {
                    $scope.errorMsg = "Error: " + response.status;
                }

            } // end of error fn
    ); // closes off "then" function call

});

demoApp.controller('personController', function ($scope, $http) {
    $http.get("persons.json").then(
            function (response) { // this function will run if http.get success
                console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.persons = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("ajax error");
                console.log(response);
                console.log("");
                if (response.status == "403") {
                    $scope.errorMsg = "$http.get: file not found.";
                } else {
                    $scope.errorMsg = "Error: " + response.status;
                }

            } // end of error fn
    ); // closes off "then" function call
}); // end of def'n of the controller function 