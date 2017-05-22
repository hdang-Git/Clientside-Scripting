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
    }).when('/update/:planetId', {
        templateUrl: 'htmlPartials/planet_insert_update.html',
        controller: 'planetUpdateController'
    }).when('/show/:planetId', {
        templateUrl: 'htmlPartials/planet_detail.html',
        controller: 'planetDetailController'
    }).when('/delete/:planetId', {
        templateUrl: 'htmlPartials/planet_list.html',
        controller: 'planetListController'
    }).when('/logon', {
        templateUrl: 'htmlPartials/logon.html',
        controller: 'logonController'
    }).when('/logoff', {
        templateUrl: 'htmlPartials/logoff.html',
        controller: 'logoffController'    
    }).otherwise({
        redirectTo: '/'
    });
});
