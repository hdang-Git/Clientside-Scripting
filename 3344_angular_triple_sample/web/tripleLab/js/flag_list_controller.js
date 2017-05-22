
demoApp.controller('flagListController', function ($scope, $http) {

        $scope.errorMsg = "";
        $http.get("webAPIs/getCountryFlagsAPI.json").then(
                function (response) { // this function will run if http.get success
                    console.log("Get Flags ajax success");
                    console.log(response);
                    console.log("");
                    $scope.flags = response.data.recordList;
                    $scope.errorMsg = response.data.dbError;
                },
                function (response) { // this function will run if http.get error
                    console.log("Get Flags ajax error");
                    console.log(response);
                    console.log("");
                    $scope.errorMsg = "Error: " + response.status + " " + response.statusText;
                } // end of error fn
        ); // closes off "then" function call

}); // end of def'n of the controller function 