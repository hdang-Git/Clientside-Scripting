
demoApp.controller('personDetailController', function ($scope, $http, $routeParams) {
    console.log("personDetailController");
    console.log($routeParams);
    $scope.personId = $routeParams.personId;
    var url = "webAPIs/personJson.jsp?id=" + $routeParams.personId;

    $http.get(url).then(
            function (response) { // this function will run if http.get success
                console.log("Person Detail ajax success");
                console.log(response);
                console.log("");
                $scope.person = response.data;
                $scope.errorMsg = "";
            },
            function (response) { // this function will run if http.get error
                console.log("Person Detail ajax error");
                console.log(response);
                console.log("");
                $scope.errorMsg = "Error: " + response.status + " " + response.statusText;

            } // end of error fn
    ); // closes off "then" function call

});