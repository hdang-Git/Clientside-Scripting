
app.controller('planetListController', function ($scope, $http,$routeParams) {

        function deletePlanet(id) {
            var url = "webAPIs/deleteOtherAPI.jsp?id=" + id;
            console.log("url to invoke: " + url);
            $scope.deleteMsg = "";

            $http.get(url).then(
                    function (response) { // this function will run if http.get success
                        console.log("Planet Delete ajax success");
                        console.log(response);
                        console.log("");
                        $scope.deleteMsg = response.data.errorMsg;
                        if ($scope.deleteMsg.length === 0) {
                            $scope.deleteMsg = "Sucessfully deleted planet " + id;
                        } else {
                            $scope.deleteMsg = "Delete Error: " + $scope.deleteMsg;
                        }
                    },
                    function (response) { // this function will run if http.get error
                        console.log("Planet Delete ajax error");
                        console.log(response);
                        console.log("");
                        $scope.deleteMsg = "Delete Error: " + response.status + " " + response.statusText;

                    } // end of error fn
            ); // closes off "then" function call
        } // deletePlanet
    
        $scope.errorMsg = "";
        $http.get("webAPIs/getOtherListAPI.jsp").then(
                function (response) { // this function will run if http.get success
                    console.log("Get Planets ajax success");
                    console.log(response);
                    console.log("");
                    $scope.planets = response.data.recordList;
                    for (var i = 0; i<$scope.planets.length; i++){
                        $scope.planets[i].planetIdNum = Number($scope.planets[i].planetId);
                        
                        var planetSizeNum = $scope.planets[i].planetSize;
                        console.log("type: " + typeof($scope.planets[i].planetSize));
                        $scope.planets[i].planetSizeNum = Number(planetSizeNum.replace(/,/g, ""));
                        console.log("planetSize: " + Number(planetSizeNum) + " " + $scope.planets[i].planetSize);
                        //Todo: not exactly accurate. Still need to find better method
                        $scope.planets[i].dateDiscoveredNum = Date.parse($scope.planets[i].dateDiscovered);
                        console.log("Date parsed: " + Date.parse($scope.planets[i].dateDiscovered));
                    }
                    $scope.errorMsg = response.data.dbError;
                    //Check login status
                    if(response.data.loggedOn === "true"){
                        $scope.isLoggedOn = true;
                    } else {
                        $scope.isLoggedOn = false;
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Get Planets ajax error");
                    console.log(response);
                    console.log("");
                    $scope.errorMsg = "Error: " + response.status + " " + response.statusText;
                } // end of error fn
        ); // closes off "then" function call

    // main code for this controller
    console.log("planetListController");
    console.log($routeParams);
    //get current set of routeParams containing planetId in url w/o value
    if ($routeParams.planetId) {
        console.log("First I will delete planet " + $routeParams.planetId);
        deletePlanet($routeParams.planetId);
    } else {
        console.log("Listing planet without deleting first.");
    }

}); // end of def'n of the controller function 