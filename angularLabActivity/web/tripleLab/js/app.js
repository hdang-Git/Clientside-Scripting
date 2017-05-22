var countryApp = angular.module('countryApp', ['ngRoute']);


countryApp.controller('CountryListCtrl', function ($scope, $http) {

    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('webAPIs/countries.json').then(
            function (response) { // what to do if success
                console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.countries = response.data;
            },
            function (response) { // what to do if error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    ); // closes off the parameter list to the "then" function...
}); // finishes fn def'n for unnamed controller of 'ContryListCtrl' ng-controller element.

/*
 * // Simple GET request example: * https://docs.angularjs.org/api/ng/service/$http
 * 
 * Note: ".then" should be used.
 *       ".success" and ".error" should not be used as they have been deprecated.
 */
//var personApp = angular.module('personApp', []);
/*
countryApp.controller('PersonCtrl', function ($scope, $http) {
    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('personListJson.json').then(
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

countryApp.controller('FlagCtrl', function ($scope, $http) {
    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('getCountryFlagsAPI.json').then(
            function (response) { // what to do if success
                console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.flags = response.data.recordList;
            },
            function (response) { // what to do if error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    ); // closes off the parameter list to the "then" function...
});*/