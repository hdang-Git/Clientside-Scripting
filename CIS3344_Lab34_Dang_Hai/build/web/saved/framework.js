'use strict';
function planetsFramework() {

    var spaceFW = {};
    
    //get size of container
    var wSize = document.body.offsetWidth;
    var hSize = document.body.offsetHeight;
    console.log("Width: " + wSize + " Height: " + hSize);
    
    // declare local method that returns a reference to the HTML element with given id
    var $ = function (idName) {
        return document.getElementById(idName);
    };

    // This function acts as a construtor, creating and returning an object. 
    spaceFW.MakeCelestial = function (params) {

        if (!params) {
            alert("Must provide an object as input parameter to MakeCelestial()");
            return;
        }

        if (!params.id) {
            alert("Input parameter object to MakeCelestial() must have an id property");
            return;
        }
        // if any of the other param properties do not exist, set them to default values.
        params.name = params.name || "satellite";
        params.radius = params.radius || 0;
        params.size = params.size || 50;
        params.speed = params.speed || 30;
        params.startAngle = params.startAngle || 1;     //in degrees out of 360

        // The scope of these private variables is local, cannot be accessed outside this function.    
        var spaceObj = $(params.id); // get reference to the HTML element with params.id as id
        var name = params.name;
        var radius = params.radius;
        var size= params.size;
        var velocity = params.speed;
        var startAngle = params.startAngle;
        console.log("name " + name + " rad " + radius + " velocity: " + velocity);
        
        //get the coords of the center of the screen
        var centerX = wSize/2;
        var centerY = hSize/2;
        //determine a reasonable radius
        var radiusX = radius/4;// radius 1/4 screen
        var radiusY = radius/4;
        //get the radians
        var angle = Math.PI/180 * startAngle;
        console.log("centerX: " + centerX + " centerY: " + centerY + " radiusX: " + radiusX + " radiusY " + radiusY);
        var intervalHandle;
        
        //set attributes to the html elements referenced by id.
        spaceObj.style.height = size + "px";
        spaceObj.style.width = size + "px";
        spaceObj.style.top = params.top || (hSize-size)/2+"px";  //this calculates center of screen wrt to center of image (no longer the top left of image)
        spaceObj.style.left = params.left || (wSize-size)/2+"px";
        spaceObj.style.position = params.position || "absolute";
        spaceObj.style.zIndex = params.zIndex || "10";
        spaceObj.style.backgroundColor = params.backgroundColor || "grey";
        spaceObj.style.borderRadius = params.borderRadius || "50%";
        spaceObj.style.WebkitTransitionDuration=params.webkitTransitionDuration + "s";
        spaceObj.style.webkitTransform  = params.webkitTransform ;
        
        //This method calculates and changes the position of the container for the orbital ellipse.
        function orbit(){
            angle += Math.PI / 180;
            var x = centerX + radiusX * Math.cos(angle);        //h + rcos(theta)
            var y = centerY - radiusY * Math.sin(angle); 
            spaceObj.style.left=x+"px";
            spaceObj.style.top=y+"px";
            console.log("name: "+ name + "orbit is called - x: " + x + " y: " + y + " angle: " 
                    + "\n left: "  + spaceObj.style.left + " top: " + spaceObj.style.top);
        };
        
        //This function continuously calls the orbit function so it can be redrawn and updated.  
        spaceObj.startAnimation = function() {
            intervalHandle = setInterval(orbit, velocity); /* name of function, how often to run it */
        };
        
        return spaceObj;
    }; // MakeSlider()

    return spaceFW;
}