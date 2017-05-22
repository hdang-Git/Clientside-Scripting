//var personApp = angular.module('personApp', []);
countryApp.controller('PersonCtrl', function ($scope, $http) {
    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('webAPIs/personListJson.json').then(
            function (response) { // what to do if success
                console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.persons = response.data.personList;
            },
            function (response) { // what to do if error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    ); // closes off the parameter list to the "then" function...
}); // finishes fn def'n for unnamed controller of 'PersonCtrl' ng-controller element.