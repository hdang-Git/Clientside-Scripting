var demoApp = angular.module('demoApp', ['ngRoute']);

demoApp.config(function ($routeProvider) {
    $routeProvider.
            when('/', {
                templateUrl: 'content_home.html',
                controller: 'demoController'
            }).
            when('/home', {
                templateUrl: 'content_home.html',
                controller: 'demoController'
            }).
            when('/labs', {
                templateUrl: 'content_labs.html',
                controller: 'demoController'
            }).
            otherwise({
                redirectTo: '/'
            });
});

// The ng-view attributed div which receives the content (labs or home) must be 
// inside of a div that has a controller, even though this controller doesnt do 
// anything (except provide access to the $scope. 
demoApp.controller('demoController', function ($scope) {

}); // end of def'n of the controller function 