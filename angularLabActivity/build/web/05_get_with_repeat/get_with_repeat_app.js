var countryApp = angular.module('countryApp', []);
countryApp.controller('CountryListCtrl', function ($scope, $http) {

    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('countries.json').then(
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