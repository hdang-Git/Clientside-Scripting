
app.controller('planetDetailController', function ($scope, $http, $routeParams) {
    console.log("planetDetailController");
    console.log($routeParams);
    $scope.planetId = $routeParams.planetId;
    var url = "webAPIs/getOtherAPI.jsp?id=" + $routeParams.planetId;

    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Planet Detail ajax success");
                console.log(response);
                console.log("");
                $scope.planet = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Planet Detail ajax error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            } // end of error fn
    ); // closes off "then" function call

});