
app.controller('scientistInsertController', function ($scope, $http, SkService2) {
    console.log("scientistInsertController");

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
    
    $scope.newscientist = SkService2.emptyScientist();
    $scope.myErrors = SkService2.emptyScientist();

    //Create a new person (this is the Insert/Save button)
    $scope.insertSave = function () {
        console.log("creating scientist");
        console.log($scope.newscientist);

        // empty out all the field level user error messages in case of an ajax error 
        $scope.myErrors = SkService2.emptyScientist();

        var myData = JSON.stringify($scope.newscientist);
        var url = "webAPIs/insertUserAPI.jsp?jsonData=" + myData;

        $http.get(url).then(
                function (response) { // this function will run if http.get success
                    console.log("Scientist Insert/Save ajax success");
                    console.log(response);
                    console.log("");
                    $scope.myErrors = response.data;
                    $scope.status = $scope.myErrors.errorMsg;
                    if ($scope.myErrors.errorMsg.length === 0) {
                        $scope.status = "Scientist Sucessfully Inserted";
                    }
                },
                function (response) { // this function will run if http.get error
                    console.log("Scientist Insert/Save ajax error");
                    console.log(response);
                    console.log("");
                    $scope.status = "Error: " + response.status + " " + response.statusText;

                } // end of error fn

        ); // closes off "then" function call

    };  // end of function insertSave

});  // end of insert controller