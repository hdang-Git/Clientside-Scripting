//var demoApp = angular.module('demoApp', ['ngRoute']);


countryApp.config(function ($routeProvider) {
    $routeProvider.
            when('/', {
                templateUrl: 'person_list.html',
                controller: 'demoController'
            }).
            when('/home', {
                templateUrl: 'person_list.html',
                controller: 'demoController'
            }).
            when('/person', {
                templateUrl: 'person_list.html',
                controller: 'PersonCtrl'
            }).       
            when('/flag', {
                templateUrl: 'flag_list.html',
                controller: 'FlagCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
});

// The ng-view attributed div which receives the content (labs or home) must be 
// inside of a div that has a controller, even though this controller doesnt do 
// anything (except provide access to the $scope. 
countryApp.controller('demoController', function ($scope) {
    
}); // end of def'n of the controller function 
