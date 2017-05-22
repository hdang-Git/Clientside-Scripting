
app.controller('planetInsertController', function ($scope, $http, SkService) {
    console.log("planetInsertController");

    // these booleans control which Save button the user will see in the 
    // person_insert_update.html (partial html file). 
    $scope.isUpdateMode = false;
    $scope.isInsertMode = true;

    // this will be used to label the heading on the person_insert_update.html (partial html file).
    $scope.insertUpdate = "Insert";

    // When the user first clicks insert, they will see the planet_insert_update.html partial 
    // and at that time, all the user data fields should have empty string (not undefined) 
    // and there is a second person object that holds all the field level error messages - 
    // clear all of those out too... 
    
    $scope.newplanet = SkService.emptyPlanet();
    $scope.myErrors = SkService.emptyPlanet();

    //Create a new person (this is the Insert/Save button)
    $scope.insertSave = function () {
        console.log("creating planet");
        console.log($scope.newplanet);

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = SkService.emptyPlanet();

        var myData = JSON.stringify($scope.newplanet);
        var url = "webAPIs/insertOtherAPI.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Planet Insert/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Planet Sucessfully Inserted";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Planet Insert/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn

        ); // closes off "then" function call

    };  // end of function insertSave

});  // end of insert controller