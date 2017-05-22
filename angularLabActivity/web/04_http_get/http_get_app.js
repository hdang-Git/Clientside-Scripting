var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope, $http) {
    $http.get("welcome.html").then(
            function (response) { // success
                console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.myWelcome = response.data;
            },
            function (response) { // error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    ); // closes off "then" function call
}); // end of def'n of the controller function for 'myCtrl' ng-controller element