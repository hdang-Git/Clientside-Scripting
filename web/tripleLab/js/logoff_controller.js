
app.controller('logoffController', function ($scope, $http) {
    console.log("logoffController");

    $http.get("webAPIs/logoffAPI.jsp").then(
            function (response) { // this function will run if http.get success
                console.log("logoff get Success");
                console.log(response);
                console.log("");
                $scope.myErrors = response.data;
                $scope.status = $scope.myErrors.logMsg;
                /*
                if ($scope.myErrors.logMsg === true) {
                    $scope.status = "Successfully Logged out";
                } else {
                    $scope.status = "Unable to contact server.";
                }*/
                
                $scope.status = "Successfully Logged out";
            },
            function (response) { // this function will run if http.get error
                console.log("Login ajax error");
                console.log(response);
                console.log("");
                //$scope.status = "Error: " + response.status + " " + response.statusText;
                $scope.status = "Unable to contact server. " + response.status + " "  + response.statusText;
            } // end of error fn
    ); // closes off "then" function call

});