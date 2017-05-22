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


/* This is the syntax of an IIFE (immediately invoked function expression).
 * The function has no name and is executed right after it is defined. 
 * Because the function is not named, it cannot be called again.
 * 
 *  ( function () {
 *      ...body... 
 *    }
 *  )(); 
 */