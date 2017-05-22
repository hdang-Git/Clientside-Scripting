app.controller('planetUpdateController', function ($scope, $http, $routeParams, SkService) {

    // these booleans control which Save button the user will see in the 
    // planet_insert_update.html (partial html file). 
    $scope.isUpdateMode = true;
    $scope.isInsertMode = false;

    // this will be used to label the heading on the planet_insert_update.html (partial html file).
    $scope.insertUpdate = "Update";

    console.log("planetUpdateController");
    console.log($routeParams);
    $scope.planetId = $routeParams.planetId;

    // blank out the new planet in case the ajax get fails to populate newplanet
    $scope.newplanet = SkService.emptyPlanet();

    // blank out error message object
    $scope.myErrors = SkService.emptyPlanet();

    //Find the planet with entered id through separate JSON request to display (gets view)
    var url = "webAPIs/getOtherAPI.jsp?id=" + $routeParams.planetId;
    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Planet Update (get) ajax success");
                console.log(response);
                console.log("");
                $scope.newplanet = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Planet Update (get) ajax error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            } // end of error fn
    ); // closes off "then" function call

    //Update planet
    $scope.updateSave = function () {

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = SkService.emptyPlanet();

        var myData = JSON.stringify($scope.newplanet);
        var url = "webAPIs/updateOtherAPI.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Planet Update/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Planet Sucessfully Updated";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Planet Update/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn
        ); // closes off "then" function call
    };

});