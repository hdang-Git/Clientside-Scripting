var app =  angular.module('app', ['ngRoute']);

// I am creating a "service" (which is just really my class full of methods). In this service,
// I will put anything that needs to be used by more than one controller - to avoid copy/paste.
app.factory("SkService", function () {

    //for planets
    var emptyPlanet = function () {
        return {
            planetId: "",
            planetName: "",
            planetSize: "",
            dateDiscovered: "",
            planetDescrip: "",
            planetURL: ""
        };
    };

    // expose methods (make them accessible)
    return {
        emptyPlanet: emptyPlanet
    };
});

app.factory("SkService2", function(){
    //for scientists
    var emptyScientist = function () {
        return {
            scientistId: "",
            scientistEmail: "",
            scientistPassword: "",
            scientistName: "",
            userRole: ""
        };
    };

    // expose methods (make them accessible)
    return {
        emptyScientist: emptyScientist
    };
});