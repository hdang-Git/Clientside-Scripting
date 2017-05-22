'use strict';
function planetsFramework() {

    var spaceFW = {};
    
    //declare local method that returns a reference to the HTML element with given id
    var $ = function (idName) {
        return document.getElementById(idName);
    };
    var factor = 1.5;
    //get size of container
    var wSize = document.body.offsetWidth;    
    var hSize = document.body.offsetHeight/factor; //divide to compensate for other screen elements
    console.log("Width: " + wSize + " Height: " + hSize);
    
    //get the canvas to draw on
    var canvas = $('canvas'); 
    var ctx = canvas.getContext('2d');
    //update canvas size
    canvas.width = wSize;
    canvas.height=hSize;
    ctx.strokeStyle = "red";
    console.log("width: " + canvas.width + "height: " + canvas.height);
    
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
        
        //Setters / Function Mutators
        spaceObj.setName = function(val){
            console.log("setName called");
            name = val;
        };
        
        spaceObj.setSpeed = function(val){
            console.log("setSpeed called");
            velocity = val;
            clearInterval(intervalHandle);
            intervalHandle = setInterval(orbit, velocity);
        };
        
        spaceObj.setSize = function(val){
            console.log("setSize called");
            size = val;
            spaceObj.style.height = size + "px";
            spaceObj.style.width = size + "px";
        };
        
        spaceObj.setRadius = function(val){
            console.log("setRadius called");
            radius = val;
            radiusX = radius/4;
            radiusY = radius/4;
            clearInterval(intervalHandle);
            intervalHandle = setInterval(orbit, velocity);
        };
        
        spaceObj.setAngle = function(val){
            console.log("setAngle called");
            startAngle = val;
        };
        
        
        //This method calculates and changes the position of the container for the orbital ellipse.
        function orbit(){
            angle += Math.PI / 180;
            var x = centerX - size/2 + radiusX * Math.cos(angle);        //h + rcos(theta) where subtract size/2 to get center of image rather than top left
            var y = centerY - size/2+ radiusY * Math.sin(angle); 
            spaceObj.style.left=x+"px";
            spaceObj.style.top=y+"px";
            /*console.log("name: "+ name + "orbit is called - x: " + x + " y: " + y + " angle: " 
                    + "\n left: "  + spaceObj.style.left + " top: " + spaceObj.style.top);*/
        };
        
        //This function continuously calls the orbit function so it can be redrawn and updated.   
        spaceObj.startAnimation = function() {
            intervalHandle = setInterval(orbit, velocity); /* name of function, how often to run it */
        };
        
        //This private anonymous function draws the orbits
        spaceObj.drawOrbit = drawCircle;
        
        //This funciton draws the circular orbits
        function drawCircle(){
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius/4, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.stroke();
            console.log("drawOrbit is called!!!");
        };
        
        //This function updates the object's position when the browser size changes
        spaceObj.resize = function(){
            wSize = document.body.clientWidth || window.innerWidth;
            hSize = document.body.clientHeight || window.innerHeight;
            hSize /= factor;    //again to keep screen elements, divide the height
            console.log("Updated - Name: " + name + " Width: "   + wSize + " Height: " + hSize);
            centerX = wSize/2;
            centerY = hSize/2;
            spaceObj.style.top = (hSize-size)/2+"px";
            spaceObj.style.left =(wSize-size)/2+"px";
            canvas.width = wSize;
            canvas.height= hSize;
            console.log("Updated - Name: " + name + " width " + canvas.width + "height: " + canvas.height);
        };
        
        spaceObj.clearCanvas = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        
        spaceObj.stopAnimation = function(){
            clearInterval(intervalHandle); // stop calling changeImage over and over
        };
        
        return spaceObj;
    }; // MakeSlider()

    return spaceFW;
}