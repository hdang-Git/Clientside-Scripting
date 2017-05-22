demoApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'htmlPartials/flag_list.html',
        controller: 'flagListController'
    }).when('/home', {
        templateUrl: 'htmlPartials/flag_list.html',
        controller: 'flagListController'
    }).when('/list', {
        templateUrl: 'htmlPartials/person_list.html',
        controller: 'personListController'
    }).when('/insert', {
        templateUrl: 'htmlPartials/person_insert_update.html',
        controller: 'personInsertController'
    }).when('/show/:personId', {
        templateUrl: 'htmlPartials/person_detail.html',
        controller: 'personDetailController'
    }).when('/update/:personId', {
        templateUrl: 'htmlPartials/person_insert_update.html',
        controller: 'personUpdateController'
    }).when('/delete/:personId', {
        templateUrl: 'htmlPartials/person_list.html',
        controller: 'personListController'
    }).otherwise({
        redirectTo: '/'
    });
});
