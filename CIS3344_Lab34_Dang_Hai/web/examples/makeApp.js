/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



function MakeApp() {

    var app = {};

    // add method "$" to the app object
    app.$ = function (element) {
        return document.getElementById(element);
    };

    // counter acts like a constructor to create a new object that can count. 
    // add constructor "counter" to the app object
    app.Counter = function (params) {

        // if any of the param properties do not exist, set them to default values.
        params.name = params.name || "counter";
        params.fontSize = params.fontSize || 12; // 100 pixels for height and width
        params.size = params.size || 100; // 100 pixels for height and width
        params.borderRadiusPct = params.borderRadiusPct || 0.25;
        params.clickable = params.clickable || false;
        params.value = params.value || 0;
        // params.id must be set -- no possible default value.

        /* The scope of these variables is local, cannot be accessed outside this function.    */
        var eleRef = app.$(params.id);
        var counter = params.value;
        var name = params.name;
        var errorCallBackFn = params.errorCallBackFn;
        
        console.log("params.size "+params.size);
        console.log("errorCallBackFn "+errorCallBackFn);
        if ((params.size < 20) && (errorCallBackFn)) {
            //alert("error condition detected in framework");
            errorCallBackFn("Warning, the size of the '"+name+"' Visual Counter is probably too small: "
                    +params.size+"px");
        }

        // a method that is private to constructor "counter"
        function display() {
            eleRef.innerHTML = name + ": " + counter;
        }

        // set attributes to the html element referenced by id.
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

    app.Compounder = function (params) {

        this.params = params;  // save the params (public)

        // if any of the param properties do not exist, set them to default values.
        params.name = params.name || "compounder";
        params.fontSize = params.fontSize || 12; // 100 pixels for height and width
        params.size = params.size || 100; // 100 pixels for height and width
        params.borderRadiusPct = params.borderRadiusPct || 0.25;
        params.clickable = params.clickable || false;
        params.value = params.value || 0;
        params.rate = params.rate || 0.05;  // 5% is default rate for compounding 
        // params.id must be set -- no possible default value.

        /* The scope of these variables is local, cannot be accessed outside this function.    */
        var eleRef = app.$(params.id);
        var value = params.value;
        var name = params.name;
        var rate = params.rate;
        var period = 1;

        // a method that is private
        function display() {
            var approx = value.toFixed(2);
            eleRef.innerHTML = name + ": " + approx +
                    "<br/>rate: " + rate +
                    "<br/>period: " + period;
        }

        eleRef.style.boxSizing = "border-box";
        eleRef.style.height = params.size + "px";
        eleRef.style.width = params.size + "px";
        eleRef.style.borderRadius = (params.size * params.borderRadiusPct) + "px";
        eleRef.style.fontSize = params.fontSize + "px";
        eleRef.style.fontWeight = "bold";
        eleRef.style.paddingTop = ((params.size - 2 * params.fontSize) / 2) + "px";
        eleRef.style.textAlign = "center";
        display();

        this.compoundIt = function () {
            period++;
            value = value * (1 + rate);
            display();
        };

        eleRef.onclick = this.compoundIt;

        this.print = function () {
            console.log(params.name + " value is " + value);
        };
    };

    return app;
}