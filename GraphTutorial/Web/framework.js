'use strict';
function MakeGraphFW() {

    var fw = {};

    // method local to MakeCounterFW
    function $(element) {
        return document.getElementById(element);
    }

    // public method (of the framework) that acts like a constructor to create a
    // new Counter object
    fw.MakeGraph = function (params) {

        // make sure they passed in an object and that this object has an id property
        if (!params || !params.id) {
            alert("MakeCounter must be passed an object with an 'id' property.");
            return;
        }

        // make sure the id property refers to a DOM element
        var counterObj = $(params.id);
        if (!counterObj) {
            alert("MakeCounter must be passed an object with an 'id' property " +
                    "that references an HTML element.");
            return;
        }
        // if you want to see what is in the counterObj (DOM) object
        console.log("counterObj (DOM object) printed on next line ");
        console.log(counterObj); // if you console.log an object, you'll see all it's properties...
        console.log("");

        // if you want to see what is in the params object that was passed to MakeCounter.
        console.log("params obj printed on next line");
        console.log(params); // if you console.log an object, you'll see all it's properties...
        console.log("");

        // if any of the param properties do not exist, set them to default values.
        params.name = params.name || "Generic Counter";
        params.fontSize = params.fontSize || 12; // 100 pixels for height and width
        params.size = params.size || 100; // 100 pixels for height and width
        params.borderRadiusPct = params.borderRadiusPct || 0.25;
        params.clickable = params.clickable || false;
        params.value = params.value || 0;

        /* The scope of these variables is local, cannot be accessed outside this function,
         * but because of "closure", they can be accessed by methods within this funtion.    */
        var count = params.value;
        var name = params.name;
        var errorCallBackFn = params.errorCallBackFn; // could be null

        // Will call the callback function if the size parameter is too small AND
        // there was a callback function specified in params.
        if ((params.size < 40) && (errorCallBackFn)) {
            //alert("error condition detected in framework");
            errorCallBackFn("Warning, the size of the '" + name + "' Visual Counter is probably too small: "
                    + params.size + "px");
        }

        // a method that is private to constructor "MakeCounter"
        function display() {
            counterObj.innerHTML = name + ": " + count;
        }

        // set attributes to the html element referenced by id.
        counterObj.style.boxSizing = "border-box";
        counterObj.style.height = params.size + "px";
        counterObj.style.width = params.size + "px";
        counterObj.style.borderRadius = (params.size * params.borderRadiusPct) + "px";
        counterObj.style.fontSize = params.fontSize + "px";
        counterObj.style.fontWeight = "bold";
        counterObj.style.paddingTop = ((params.size - params.fontSize) / 2) + "px";
        counterObj.style.textAlign = "center";
        display();

        // public modifier method
        counterObj.setName = function (newName) {
            name = newName; // set private property
            display(); // make the change visible
        };

        // public modifier method
        counterObj.setCountValue = function (newCount) {
            count = parseInt(newCount); // set private property
            display(); // make the change visible
        };

        // public modifier method
        counterObj.increment = function () {
            count++;
            console.log("incremented count value to " + count);
            display();
        };
        //counterObj.onclick = counterObj.inc;

        // private modifier method
        function inc() {
            count++;
            console.log("incremented count value to " + count);
            display();
        }
        counterObj.onclick = inc; // when the div is clicked it will increment.


        // public method could be called by html page.
        counterObj.print = function () {
            console.log("counter " + name + " value is " + count);
        };

        return counterObj;
    };

    return fw;
}