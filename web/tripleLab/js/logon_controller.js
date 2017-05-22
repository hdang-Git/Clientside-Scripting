
app.controller('logonController', function ($scope, $http, $routeParams, SkService2) {
    console.log("logonController");
    
    $scope.scientistEmail = "";
    $scope.scientistPassword = "";
/*
    // blank out the new scientist in case the ajax get fails to populate newplanet
    $scope.newplanet = SkService2.emptyScientist();

    // blank out error message object
    $scope.myErrors = SkService2.emptyScientist();
*/
    //Find the planet with entered id through separate JSON request to display (gets view)
    
    

    // blank out the new scientist in case the ajax get fails to populate newplanet
    $scope.newscientist = SkService2.emptyScientist();
    // blank out error message object
    $scope.myErrors = SkService2.emptyScientist();
 
    //Get LoginInfo
    $scope.loginSubmit = function(){
        
        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = SkService2.emptyScientist();
        $scope.scientistEmail = $scope.newscientist.scientistEmail;
        $scope.scientistPassword =  $scope.newscientist.scientistPassword;
        console.log($scope.scientistEmail + " " + $scope.scientistPassword);
        /*
        //print out data from input fields (this method could be used but comes down to preference)
        var myData = JSON.stringify($scope.newscientist);
        var url = "webAPIs/logonAPI.jsp?jsonData=" + myData;
         */
        var url = "webAPIs/logonAPI.jsp?email=" + $scope.scientistEmail + "&password=" + $scope.scientistPassword;
        console.log("url: " + url);
        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Login GET Success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Login Successful";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Login ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn
        ); // closes off "then" function call
    };
});