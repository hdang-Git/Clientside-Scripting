
app.controller('scientistListController', function ($scope, $http) {

    function getScientistList() {
        // the code to list all persons.
        $scope.listMsg = "";
        $http.get("webAPIs/getUserListAPI.jsp").then(
                function (response) { // this function will run if http.get success
                    console.log("Get Scientists ajax success");
                    console.log(response);
                    console.log("");
                    $scope.scientists = response.data.recordList;
                    $scope.listMsg = response.data.dbError;
                    
                    for (var i = 0; i<$scope.scientists.length; i++){
                        $scope.scientists[i].scientistIdNum = Number($scope.scientists[i].scientistId);
                    }
                    
                    if ($scope.listMsg.length > 0) {
                        $scope.listMsg = "List Error: " + $scope.listMsg;
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Get Scientists ajax error");
                    console.log(response);
                    console.log("");
                    $scope.listMsg = "List Error: " + response.status + " " + response.statusText;
                } // end of error fn
        ); // closes off "then" function call
    } // list
    
    getScientistList();

}); // end of def'n of the controller function 