
demoApp.controller('personListController', function ($scope, $http, $routeParams) {

    function deletePerson(id) {
        var url = "webAPIs/personDelete.jsp?id=" + id;
        console.log("url to invoke: " + url);
        $scope.deleteMsg = "";

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Person Delete ajax success");
                    console.log(response);
                    console.log("");
                    $scope.deleteMsg = response.data.errorMsg;
                    if ($scope.deleteMsg.length === 0) {
                        $scope.deleteMsg = "Sucessfully deleted person " + id;
                    } else {
                        $scope.deleteMsg = "Delete Error: " + $scope.deleteMsg;
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Person Delete ajax error");
                    console.log(response);
                    console.log("");
                    $scope.deleteMsg = "Delete Error: " + response.status + " " + response.statusText;

                } // end of error fn
        ); // closes off "then" function call
    } // deletePerson

    function getPersonList() {
        // the code to list all persons.
        $scope.listMsg = "";
        $http.get("webAPIs/personListJson.jsp").then(
                function (response) { // this function will run if http.get success
                    console.log("GetPersons ajax success");
                    console.log(response);
                    console.log("");
                    $scope.persons = response.data.personList;
                    $scope.listMsg = response.data.dbError;
                    if ($scope.listMsg.length > 0) {
                        $scope.listMsg = "List Error: " + $scope.listMsg;
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Get Persons ajax error");
                    console.log(response);
                    console.log("");
                    $scope.listMsg = "List Error: " + response.status + " " + response.statusText;
                } // end of error fn
        ); // closes off "then" function call
    } // list

    // main code for this controller
    console.log("personListController");
    console.log($routeParams);
    if ($routeParams.personId) {
        console.log("First I will delete person " + $routeParams.personId);
        deletePerson($routeParams.personId);
    } else {
        console.log("Listing persons without deleting first.");
    }
    getPersonList();

}); // end of def'n of the controller function 