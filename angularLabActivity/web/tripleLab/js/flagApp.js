//var flagApp = angular.module('flagApp', []);
countryApp.controller('FlagCtrl', function ($scope, $http) {
    // The "then" (chained function call) takes two parameters: 
    //   * function for success (of ajax call) then 
    //   * function for error (of ajax call).
    $http.get('webAPIs/getCountryFlagsAPI.json').then(
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
});