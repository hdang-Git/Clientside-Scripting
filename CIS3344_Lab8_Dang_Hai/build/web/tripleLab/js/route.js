app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'htmlPartials/planet_list.html',
        controller: 'planetListController'
    }).when('/home', {
        templateUrl: 'htmlPartials/planet_list.html',
        controller: 'planetListController'
    }).when('/list', {
        templateUrl: 'htmlPartials/scientist_list.html',
        controller: 'scientistListController'
    }).when('/insertPlanet', {
        templateUrl: 'htmlPartials/planet_insert_update.html',
        controller: 'planetInsertController'
    }).when('/insertScientist', {
        templateUrl: 'htmlPartials/scientist_insert_update.html',
        controller: 'scientistInsertController'
    }).otherwise({
        redirectTo: '/'
    });
});
