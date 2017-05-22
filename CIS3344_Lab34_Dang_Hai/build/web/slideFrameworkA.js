"use strict";

function MakeSliderFW() {

    var sliderFW = {};

    // declare local method that returns a reference to the HTML element with given id
    var $ = function (idName) {
        return document.getElementById(idName);
    };

    // This function acts as a construtor, creating and returning an object. 
    sliderFW.MakeSlider = function (params) {

        if (!params) {
            alert("Must provide an object as input parameter to MakeSlider()");
            return;
        }

        if (!params.id) {
            alert("Input parameter object to MakeSlider() must have an id property");
            return;
        }
        var sliderObj = $(params.id); // get reference to the HTML element with params.id as id

        // if any of the other param properties do not exist, set them to default values.
        sliderObj.style.top = params.top || "80px";
        sliderObj.style.left = params.left || "160px";
        sliderObj.style.height = params.height || "64px";
        sliderObj.style.width = params.width || "64px";
        sliderObj.style.borderRadius = params.borderRadius || "50%";
        sliderObj.style.backgroundColor = params.backgroundColor || "grey";
        sliderObj.style.position = params.position || "fixed";
        sliderObj.style.zIndex = params.zIndex || "1";
        sliderObj.style.borderColor = params.borderColor || "grey";
        sliderObj.style.borderWidth = params.borderWidth || "thick";
        sliderObj.style.borderStyle =  params.borderStyle || "solid";
        // a method that is private to constructor "counter"
        // expecting values like "30px" to be passed in...
        sliderObj.moveTo = function (newTop, newLeft) {
            sliderObj.style.top = newTop;
            sliderObj.style.left = newLeft;
        };
        return sliderObj;
    }; // MakeSlider()

    return sliderFW;
} // MakeSliderFW


function MakeAnimationFW() {

    var sliderAnimationFW = {};

    // declare local method that returns a reference to the HTML element with given id
    var $ = function (idName) {
        return document.getElementById(idName);
    };

    //get size of client's window
    var wSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var hSize = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    console.log("Width: " + wSize + " Height: " + hSize);
    
    
        
        /*
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var w = canvas.width;
        var h = canvas.height;
        console.log("canvas: " + w + h);
        */
    
    // This function acts as a construtor, creating and returning an object. 
    sliderAnimationFW.MakeAnimation = function (params) {

        if (!params) {
            alert("Must provide an object as input parameter to MakeAnimationSlider()");
            return;
        }

        if (!params.id) {
            alert("Input parameter object to MakeAnimationSlider() must have an id property");
            return;
        }
        var sliderObj = $(params.id); // get reference to the HTML element with params.id as id

        // if any of the other param properties do not exist, set them to default values.
        sliderObj.style.top = params.top || "160px";
        sliderObj.style.left = params.left || "320px";
        sliderObj.style.height = params.height || "100px";
        sliderObj.style.width = params.width || "110px";
        sliderObj.style.position = params.position || "fixed";
        sliderObj.style.backgroundImage="url('pics/bluejay.png')";
        sliderObj.style.zIndex = params.zIndex || "1";
        sliderObj.style.borderColor = params.borderColor || "grey";
        sliderObj.style.borderWidth = params.borderWidth || "thick";
        sliderObj.style.borderStyle =  params.borderStyle || "solid";
        //sliderObj.style.WebkitTransitionDuration="2s";
        //sliderObj.style.WebkitTransform = "rotate(360deg)";
        
        // a method that is private to constructor "counter"
        // expecting values like "30px" to be passed in...
        sliderObj.moveTo = function (newTop, newLeft) {
            sliderObj.style.top = newTop;
            sliderObj.style.left = newLeft;
        };
        
        //This is the orbit impl
       
        var centerX = wSize/2;
        var centerY = hSize/2;
        var radiusX = wSize/3;   // radius 1/3 screen
        var radiusY = hSize/3;
        var angle = Math.PI/180;
        console.log("centerX: " + centerX + " centerY: " + centerY + " radiusX: " + radiusX + " radiusY " + radiusY);
        
        function orbit(){
            angle += Math.PI / 180;
            var x = centerX + radiusX * Math.cos(angle);        //h + rcos(theta)
            var y = centerY - radiusY * Math.sin(angle); 
            sliderObj.style.left=x+"px";
            sliderObj.style.top=y+"px";
            console.log("orbit is called - x: " + x + " y: " + y + " angle: " + angle);
            console.log("orbit - left: "  + sliderObj.style.left + " top: " + sliderObj.style.top);
        };
        
        var intervalHandle;
        sliderObj.startAnimation = function() {
            intervalHandle = setInterval(orbit, 90); /* name of function, how often to run it */
        };
        
        return sliderObj;
    }; // MakeSlider()

    return sliderAnimationFW;
}



/* This is the syntax of an IIFE (immediately invoked function expression).
 * The function has no name and is executed right after it is defined. 
 * Because the function is not named, it cannot be called again.
 * 
 *  ( function () {
 *      ...body... 
 *    }
 *  )(); 
 */