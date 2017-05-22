
app.controller('planetListController', function ($scope, $http) {

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
                },
                function (response) { // this function will run if http.get error
                    console.log("Get Planets ajax error");
                    console.log(response);
                    console.log("");
                    $scope.errorMsg = "Error: " + response.status + " " + response.statusText;
                } // end of error fn
        ); // closes off "then" function call

}); // end of def'n of the controller function 