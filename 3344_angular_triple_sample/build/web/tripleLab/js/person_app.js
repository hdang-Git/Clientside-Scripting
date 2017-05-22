// By listing 'ngRoute' in the array, it means we plan to use Angular routing
// functionality.
var demoApp = angular.module('demoApp', ['ngRoute']);

// I am creating a "service" (which is just really my class full of methods). In this service,
// I will put anything that needs to be used by more than one controller - to avoid copy/paste.
demoApp.factory("SkService", function () {

    var emptyPerson = function () {
        return {
            personId: "",
            name: "",
            sex: "",
            age: ""
        };
    };

    // expose methods (make them accessible)
    return {
        emptyPerson: emptyPerson
    };

});
