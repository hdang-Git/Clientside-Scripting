var personMod = angular.module('personApp', []);

personMod.controller('personController', function ($scope, $http) {
    
    $http.get('persons.json').then(
            
            function (response) { // what to do if success
                console.log("ajax success");
                console.log(response);
                console.log("");
                $scope.persons = response.data;
            },
            function (response) { // what to do if error
                console.log("ajax error");
                console.log(response);
                console.log("");
            }
    );
    
    $scope.sortField = 'name';
    $scope.reverse = true;
});