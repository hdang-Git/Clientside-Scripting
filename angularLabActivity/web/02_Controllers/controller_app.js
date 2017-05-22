var app = angular.module('myApp', []);

app.controller('personCtrl', function ($scope) {
    // This (unnamed) function can access/modify any ng-model elements in the 'personCtrl' ng-controller element 
    // (name and age). These ng-model elements (name and age) are "bound to" properties of the $scope object 
    // which is shared between Angular and this controller function. If the controller function changes the value 
    // of $scope.name or $scope.age (as is done here), the model values (in the UI) immediately reflect this change. 
    // If the UI values are changed by the user, the controller can access these values ($scope.name, $scope.age).
    $scope.name = "John Doe";
    $scope.age = 23;
});

app.controller('sportCtrl', function ($scope) {
    // This unnamed function can access/modify any ng-model elements in the 'sportCtrl' ng-controller element.
    $scope.sport = "volleyball";
    $scope.name = "sally"; // has no effect, name is in the other controller
});