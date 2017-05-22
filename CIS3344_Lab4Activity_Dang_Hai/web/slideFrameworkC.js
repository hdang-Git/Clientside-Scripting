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
        // Move the object to the specified coordinates.
        // expecting values like "30px" to be passed in...
        sliderObj.moveTo = function (newTop, newLeft) {
            sliderObj.style.top = newTop;
            sliderObj.style.left = newLeft;
        };

        // Adjust object's position (add dTop and dLeft to object's current position).
        sliderObj.move = function (dTop, dLeft) {
            //console.log("top is "+parseInt(sliderObj.style.top));
            //console.log("top plus one is "+(parseInt(sliderObj.style.top)+1));
            sliderObj.style.top = (parseInt(sliderObj.style.top) + parseInt(dTop)) + "px";
            sliderObj.style.left = (parseInt(sliderObj.style.left) + parseInt(dLeft)) + "px";
        };


        // These variables (private to method MakeSlider) will be set whenever 
        // sliderObj.slide() is called. We had to do it this way because you 
        // can't call setTimeout on a function that has input parameters -- 
        // see the call to setTimeout, about 25 lines below here.
        var gNumTimes = 0;
        var gDistanceTop = 0;
        var gDistanceLeft = 0;
        var gMillisecs = 0;

        // Adjust object's position (add distanceTop and distanceLeft to object's current position), 
        // but do it numTimes at intervals of millisecs milliseconds.
        sliderObj.slide = function (distanceTop, distanceLeft, numTimes, millisecs) {
            gNumTimes = numTimes;
            gDistanceTop = distanceTop;
            gDistanceLeft = distanceLeft;
            gMillisecs = millisecs;
            sliderObj.doSlide();
        };

        // Adjust object's position (add dTop and dLeft to object's current position).
        sliderObj.doSlide = function () {
            console.log("doSlide: gNumTimes is " + gNumTimes);
            if (gNumTimes > 0) {
                sliderObj.move(gDistanceTop, gDistanceLeft);
                console.log(" >> setting timer to call doSlide");

                // doSlide cannot have any input parameters...
                setTimeout(sliderObj.doSlide, gMillisecs);
            }
            gNumTimes--;
        };

        /* As mentioned above, you cannot pass setTimeout a function with input parameter, 
         * but you can get around it using javaScript's eval function - kind of tricky/advanced.
         * 
         var fnCallStr = 
         "( function () { " +
         "sliderObj.doSlide(" + dTop + ", " + dLeft + ", " + millisecs + "); " +
         "} ) ";
         var fnCallJs = eval(fnCallStr); // turn string into javaScript
         setTimeout(fnCallJs, millisecs);
         */

        return sliderObj;
    }; // MakeSlider()

    return sliderFW;
} // MakeSliderFW


/* set attributes to the html element referenced by id.
 eleRef.style.boxSizing = "border-box";
 eleRef.style.height = params.size + "px";
 eleRef.style.width = params.size + "px";
 eleRef.style.borderRadius = (params.size * params.borderRadiusPct) + "px";
 eleRef.style.fontSize = params.fontSize + "px";
 eleRef.style.fontWeight = "bold";
 eleRef.style.paddingTop = ((params.size - params.fontSize) / 2) + "px";
 eleRef.style.textAlign = "center";
 display();
 
 
 this.setName = function (newName) {
 name = newName;
 display();
 };
 
 this.increment = function () {
 console.log("incrementing " + counter);
 counter++;
 display();
 };
 
 eleRef.onclick = this.increment;
 
 this.print = function () {
 console.log(name + " value is " + counter);
 };
 };
 */


/* This is the syntax of an IIFE (immediately invoked function expression).
 * The function has no name and is executed right after it is defined. 
 * As you can see the function is not named, so it cannot be called again.
 * 
 *  ( function () {
 *      ...body... 
 *    }
 *  )(); 
 */