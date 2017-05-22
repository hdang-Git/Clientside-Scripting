'use strict';
function GraphFW() {

    var fw = {};

    // method local to GraphFW
    function $(element) {
        return document.getElementById(element);
    }
    
    //get size of container
    var wSize = document.body.offsetWidth;    
    var hSize = document.body.offsetHeight; //divide to compensate for other screen elements  
    console.log("Width: " + wSize + " Height: " + hSize);
    

    // public method (of the framework) that acts like a constructor to create a 
    // new Counter object 
    fw.MakeChart = function (params) {

        // make sure they passed in an object and that this object has an id property
        if (!params || !params.id) {
            alert("MakeChart must be passed an object with an 'id' property.");
            return;
        }

        // make sure the id property refers to a DOM element
        var graphObj = $(params.id);
        if (!graphObj) {
            alert("MakeChart must be passed an object with an 'id' property " +
                    "that references an HTML element.");
            return;
        }
        // if you want to see what is in the counterObj (DOM) object
        console.log("graphObj (DOM object) printed on next line ");
        console.log(graphObj); // if you console.log an object, you'll see all it's properties...
        console.log("");

        // if you want to see what is in the params object that was passed to MakeGraph.
        console.log("params obj printed on next line");
        console.log(params); // if you console.log an object, you'll see all it's properties...
        console.log("");
        
        //get the canvas to draw on
        var ctx = graphObj.getContext('2d');
        

        // if any of the param properties do not exist, set them to default values.
        params.title = params.title || "Chart Title";
        params.chartType = params.chartType || "Bar";
        params.fontSize = params.fontSize || 12; // 100 pixels for height and width
        params.width = params.width || 500; // 100 pixels for height and width
        params.height = params.height || 500; 
        params.margin = params.margin || 10;
        params.xVal = params.xVal || ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
        params.yVal = params.yVal || [10, 20, 30, 40, 50];
        params.xAxisTitle = params.xAxisTitle || "X-Axis Title";
        params.yAxisTitle = params.yAxisTitle || "Y-Axis Title";

        /* The scope of these variables is local, cannot be accessed outside this function, 
         * but because of "closure", they can be accessed by methods within this funtion.    */
        var title = params.title;
        var chartType = params.chartType;
        var width = params.width;   //full graph width
        var height = params.height; //full graph height
        var margin = params.margin;
        var arrX = params.xVal;
        var arrY = params.yVal;
        var xAxisTitle = params.xAxisTitle;
        var yAxisTitle = params.yAxisTitle;
        var fontSize = params.fontSize;
        var factor = 8;
        var xPos = factor * margin;             //inner graph x position
        var yPos = factor * margin;             //inner graph y position
        var graphWidth = width - 2 * xPos;      //inner graph width w/o labels area
        var graphHeight = height - 2 * yPos;    //inner graph height w/o labels
        
        var barWidth = graphWidth/arrX.length - margin;
        var barHeight = 0;
       
        console.log("Canvas width: " + width + " Canvas height: " + height); 
        console.log("Bar width: " + barWidth + " Bar height: " + barHeight);

        //Set the canvas size
        graphObj.height =  params.height;
        graphObj.width = params.width;
        //Clear the canvas just in case 
        ctx.clearRect(0, 0, ctx.width, ctx.height);
        //Draw the outline
        ctx.strokeStyle = "red";
        ctx.strokeRect(0, 0, width, height);
        /*
        ctx.strokeStyle = "green";
        ctx.strokeRect(xPos, yPos, graphWidth, graphHeight);
        */
        
        
        //Find min & max value in y array
        var max = 0;
        var min = 0;
        findMaxMin();
        console.log("max val: " + max + " min val: " + min);
        function findMaxMin(){
            max = arrY[0];
            min= arrY[0];
            for(var i = 1; i < arrY.length; i++){
               if(max < arrY[i]){
                   max = arrY[i];
               }
               if(min > arrY[i]){
                   min = arrY[i];
               }
            }
        }
        
        //Draw the axis
        //Add Axes title
        ctx.textAlign = "center";
        function drawXAxesValues(){
            console.log("X value labels");
            for(var i = 0; i < arrX.length; i++){
                var xPosMark = i * (barWidth + margin) + margin * (factor + 1) + barWidth/2;
                var yPosMark= graphHeight - barHeight + (margin * factor) + fontSize; //TODO: change 12 to respective font size and check against margin bounds
                console.log("xPosMark: " + xPosMark + " yPos: " + yPosMark);
                ctx.fillText(arrX[i], xPosMark, yPosMark);
            }
            ctx.save();
        }
        drawXAxesValues();
        function drawYAxesValues(){
            console.log("Y value labels");
            var ySpacing = graphHeight/arrY.length;
            console.log("ySpacing: " + ySpacing);
            for(var i = 0; i < arrY.length; i++){
                var xPosMark = xPos - fontSize;       //TODO: change 12 to a different var or keep
                var yPosMark= yPos + i * ySpacing;
                console.log("xPosMark: " + xPosMark + " yPos: " + yPosMark);
                //ctx.fillText(arrY[(arrY.length-1)-i], xPosMark, yPosMark);
                ctx.fillText(max- max/arrY.length * i, xPosMark, yPosMark);
            }
            ctx.fillText(0, xPos-fontSize, yPos + graphHeight);   //write 0 for y val
            ctx.save();
        }
        drawYAxesValues();
        
        
        function drawGridLines(){
            ctx.strokeStyle = "grey";
            var ySpacing = graphHeight/arrY.length;
            for(var i = 0; i < arrY.length; i++){
                var yPosMark= yPos + i * ySpacing;
                ctx.beginPath();
                ctx.moveTo(xPos, yPosMark);
                ctx.lineTo(xPos + graphWidth, yPosMark);
                ctx.stroke();
            }
            //draw 0 axis line
            ctx.beginPath();
            ctx.moveTo(xPos, yPos + graphHeight);
            ctx.lineTo(xPos + graphWidth, yPos + graphHeight);
            ctx.stroke();
        }
        drawGridLines();
        
        function drawAxesTitles(){
            //Draw x axis title label
            ctx.fillText(xAxisTitle, xPos + graphWidth/2 , yPos + graphHeight + fontSize*3);
            ctx.save();
            
            //Draw y axis title label
            ctx.translate(xPos - fontSize*3, yPos + graphHeight/2);
            ctx.rotate(3*Math.PI/2);
            ctx.fillText(yAxisTitle, 0, 0);
            //ctx.fillText("Y-Axis Title", xPos - 36, yPos + graphHeight/2);
            ctx.restore();
            console.log("Y-Axis is drawn");
        }
        drawAxesTitles();
        
        function drawChartTitle(){
            console.log("drawChartTitle() is called");
            ctx.font = "30px Arial";
            ctx.fillText(title, width/2, yPos/2);
        }
        drawChartTitle();
        
       //Set bar column color
        //ctx.fillStyle = "blue";	
        
        // set attributes to the html element referenced by id.
        graphObj.style.height = params.height + "px";
        graphObj.style.width = params.width + "px";
        graphObj.style.fontSize = params.fontSize + "px";

        //var colors = ["red","purple", "green", "blue", "yellow", "orange"];
        var colors = ["lightblue", "black", "lightgreen", "orange", "salmon", "tan", "mediumslateblue"];

        //Gets the new height relative to the max (scaling)
        var scale = max;
        console.log("scale: " + scale);
        
        
        var percent = 0;
        var step = 2;
        var percentageComplete = 100;
        //Draw the graph
        function plotGraph(){
            if(chartType.toLowerCase()==="bar"){
                console.log("---> BAR TYPE");
                for(var i = 0; i < arrY.length; i++){

                    colorGraph(i);
                    barHeight = arrY[i]/scale * graphHeight * percent/percentageComplete;
                    //xPos = i * (barWidth + margin) + margin;
                    xPos = i * (barWidth + margin) + margin * (factor + 1);
                    yPos = graphHeight - barHeight + (margin * factor);
                    /*
                    console.log("barWidth: " + barWidth + " " + graphWidth/arrX.length);
                    console.log("barHeight: " + barHeight);
                    console.log("x position: " + xPos);
                    console.log("y position: " + yPos);*/
                    ctx.fillRect(xPos, yPos, barWidth, barHeight);
                }
                //animate the drawing
                if(percent < 100){
                    percent += step;
                    requestAnimationFrame(plotGraph);
                }
            } else if(chartType.toLowerCase() === "line"){
                
            }
        }
        plotGraph();
        
        //This function draws lines
        function drawLine(startX, startY, endX, endY){
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.moveTo(endX, endY);
            ctx.stroke();
            ctx.closePath();
        }
        

        function colorGraph(num){
            //color graph
            var gradient=ctx.createLinearGradient(0, graphHeight, graphWidth, graphHeight * 2);
            gradient.addColorStop(0,colors[num%colors.length]);
            gradient.addColorStop(1,"whitesmoke");
            ctx.fillStyle = gradient;
        }
        
        /*
        // a method that is private to constructor "MakeCounter"
        function display() {
            graphObj.innerHTML = name + ": " + count;
        }

        // set attributes to the html element referenced by id.
        graphObj.style.boxSizing = "border-box";
        graphObj.style.height = params.size + "px";
        graphObj.style.width = params.size + "px";
        graphObj.style.borderRadius = (params.size * params.borderRadiusPct) + "px";
        graphObj.style.fontSize = params.fontSize + "px";
        graphObj.style.fontWeight = "bold";
        graphObj.style.paddingTop = ((params.size - params.fontSize) / 2) + "px";
        graphObj.style.textAlign = "center";
        display();

        // public modifier method
        graphObj.setName = function (newName) {
            name = newName; // set private property
            display(); // make the change visible
        };

        // public modifier method
        graphObj.setCountValue = function (newCount) {
            count = parseInt(newCount); // set private property
            display(); // make the change visible
        };

        // public modifier method
        graphObj.increment = function () {
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
        graphObj.onclick = inc; // when the div is clicked it will increment.


        // public method could be called by html page.
        graphObj.print = function () {
            console.log("counter " + name + " value is " + count);
        };
        */
        return graphObj;
    };

    return fw;
}