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
        
        
        
        
        // if any of the param properties do not exist, set them to default values.
        params.title = params.title || "Chart Title";
        params.chartType = params.chartType || "Bar";
        params.fontSize = params.fontSize || 12; 
        params.width = params.width || 500;     //width of canvas
        params.height = params.height || 500;   //height of canvas
        params.margin = params.margin || 10;    //margin between div and canvas
        params.xVal = params.xVal || ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
        params.yVal = params.yVal || [10, 20, 30, 40, 50];
        params.xAxisTitle = params.xAxisTitle || "X-Axis Title";
        params.yAxisTitle = params.yAxisTitle || "Y-Axis Title";
        params.colors = params.colors || ["lightblue", "black", "lightgreen", "orange", "salmon", "tan", "mediumslateblue"];
        params.axesTitlesOn = params.axesTitlesOn || "true";
        params.gridLinesOn = params.gridLinesOn || "true";
        params.xAxisValOn = params.xAxisValOn || "true";
        params.yAxisValOn = params.yAxisValOn || "true";
        params.chartTitleOn = params.chartTitleOn || "true";
        params.vertTraceOn = params.vertTraceOn || "true";
        params.toolTipOn = params.toolTipOn || "true";
        params.fileName = params.fileName || 'testFile';
        
        //Make sure both array lengths are the same
        if(params.xVal.length !== params.yVal.length){
            alert("Array lengths differ! Please recheck array set cardinality.");
            return;
        }

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
        var colors = params.colors;
        var axesTitlesOn = params.axesTitlesOn;
        var gridLinesOn = params.gridLinesOn;
        var xAxisValOn = params.xAxisValOn;
        var yAxisValOn = params.yAxisValOn;
        var chartTitleOn = params.chartTitleOn;
        var vertTraceOn = params.vertTraceOn;
        var toolTipOn = params.toolTipOn;
        var fileName = params.fileName;
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
        
        //Create the canvas
        var canvas = document.createElement('canvas');
        //get the canvas to draw on
        var ctx = canvas.getContext('2d');
        //set style of the canvas
        canvas.height = graphObj.height;
        canvas.width = graphObj.width;
        graphObj.style.border   = params.border || "1px solid";
        graphObj.style.borderRadius = (params.borderRadius || 6 ) + "px" ;
        canvas.style.borderRadius = params.borderRaidus + "px" || "8 px";        
        canvas.style.position = params.position  || "absolute" ;
        graphObj.appendChild(canvas);
        
        
        //Check if the array has number or strings
        var numberedAxis = checkArrayValues(arrX);
        console.log("Number Axis check: " + numberedAxis);
        function checkArrayValues(arr){
            for(var i = 0; i < arr.length; i++){
                //if any part of array isn't a number
                if(!Number.isInteger(arr[i])){
                    return false;
                } 
            }
            return true;
        }
        
        //Get minY & maxY value in y array
        var maxY = findMax(arrY);
        var minY = findMin(arrY);
        console.log("maxY val: " + maxY + " minY val: " + minY);
        if(chartType.toLowerCase() === "line"){
            //if line type, get min & max in x array
           var maxX = findMax(arrX);
           var minX = findMin(arrX);
        }
        
        //Finds the max value in the array
        function findMax(arr){
            var temp = arr[0];
            for(var i = 1; i < arr.length; i++){
               if(temp < arr[i]){
                   temp = arr[i];
               }
            }
            return temp;
        }
        //Find the min value in the array
        function findMin(arr){
            var temp = arr[0];
            for(var i = 1; i < arr.length; i++){
               if(temp > arr[i]){
                   temp = arr[i];
               }
            }
            return temp;
        }
        
        
        //Draw the X axis values
        function drawXAxesValues(){
            console.log("X value labels");
            var xPosMark;
            var yPosMark;
            var value;
            ctx.textAlign = "center";
            for(var i = 0; i < arrX.length; i++){
                if(!numberedAxis){  //if not a numbered axis
                    xPosMark = i * (graphWidth/arrX.length) + margin * (factor + 1) +  barWidth/2;
                    value = arrX[i];
                } else {
                    console.log("numbered array ");
                    xPosMark =  i * (graphWidth/arrX.length) + xPos;
                    value = i * (findMax(arrX) - findMin(arrX))/(arrX.length - 1);      //arrX.length -1 because endpoints are inclusive
                }
                yPosMark= graphHeight - barHeight + (margin * factor) + fontSize;
                console.log("xPosMark: " + xPosMark + " yPos: " + yPosMark);
                ctx.fillText(value, xPosMark, yPosMark);
            }
            ctx.save();
        }
        
        //Draw the Y axis values
        function drawYAxesValues(){
            console.log("Y value labels");
            var ySpacing = graphHeight/arrY.length;
            console.log("ySpacing: " + ySpacing);
            for(var i = 0; i < arrY.length; i++){
                var xPosMark = xPos - fontSize;       
                var yPosMark= yPos + i * ySpacing;
                console.log("xPosMark: " + xPosMark + " yPos: " + yPosMark);
                ctx.fillText(maxY- maxY/arrY.length * i, xPosMark, yPosMark);
            }
            ctx.fillText(0, xPos-fontSize, yPos + graphHeight);   //write 0 for y val
            ctx.save();
        }
        
        
        //Draw the horizontal grid lines
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
        
        //Draw the Axes Titles
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

        //Draw the chart title
        function drawChartTitle(){
            console.log("drawChartTitle() is called");
            ctx.font = "30px Arial";
            ctx.fillText(title, width/2, yPos/2);   //width/2- ctx.measureText(title).width/2;
        }
        
        //This function executes the user chosen methods of the graph
        function drawGridFeatures(){
            ctx.font = "10px sans-serif"; //default
            if(xAxisValOn === "true"){
                drawXAxesValues();
            }
            if(yAxisValOn === "true"){
                drawYAxesValues();
            }
            if(gridLinesOn === "true"){
                drawGridLines();
            }
            if(axesTitlesOn === "true"){
                drawAxesTitles();
            }
            if(chartTitleOn === "true"){
                drawChartTitle();
            }
        }
        drawGridFeatures();
        
        // set attributes to the html element referenced by id. 
        graphObj.style.height = params.height + "px";
        graphObj.style.width = params.width + "px";
        graphObj.style.fontSize = params.fontSize + "px";
        
        //public methods 
        graphObj.redrawBarGraph= function(){
            chartType = "bar";
            percent = 0;
            xPos = factor * margin;
            yPos = factor * margin;
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        graphObj.redrawLineGraph = function(){
            delta = 0;
            points = [];
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        graphObj.updateXSeries = function(x){
            arrX = x;
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        graphObj.updateYSeries = function(y){
            arrY = y;
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        graphObj.changeChartTitle = function(t){
            title = t;
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        graphObj.changeXTitle = function(t){
            xAxisTitle = t;
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        graphObj.changeYTitle = function(t){
            yAxisTitle = t;
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        graphObj.changeColors = function(c){
            colors = c;
            ctx.clearRect(0, 0, width, height);
            drawGridFeatures();
            plotGraph();
        };
        

        //Gets the new height relative to the maxY (scaling)
        var scale = maxY;
        var percent = 0;
        var step = 2;
        var percentageComplete = 100;
        function drawBarGraph(){
            for(var i = 0; i < arrY.length; i++){
                ctx.fillStyle = colorGraph(i);
                barHeight = arrY[i]/scale * graphHeight * percent/percentageComplete;
                //xPos = i * (barWidth + margin) + margin;
                xPos = i * (barWidth + margin) + margin * (factor + 1);
                yPos = graphHeight - barHeight + (margin * factor);
                /*
                console.log("barWidth: " + barWidth + " " + graphWidth/arrX.length);
                console.log("barHeight: " + barHeight);
                console.log("x position: " + xPos);
                console.log("y position: " + yPos);
                 */
                ctx.fillRect(xPos, yPos, barWidth, barHeight);
            }
            //animate the drawing
            if(percent < 100){
                percent += step;
                requestAnimationFrame(drawBarGraph);
            }
        }

        //This animates the lines plot
        var delta = 0;
        var numPoints = 25;
        var points = [];    //needs to be defined globally to store all intermediate points between segments
        function animateLinePlot(){
            if(delta < points.length - 3){
                requestAnimationFrame(animateLinePlot);
            }
            console.log("DELTA: " + delta);
            console.log(graphObj.id + " Animation --> x1: " + points[delta].x + " y1: " + points[delta].y + " -> " + " x2: " + points[delta+1].x + " y2: " + points[delta+1].y);
            drawLine(points[delta].x, points[delta].y, points[delta+1].x, points[delta+1].y, delta);
            delta++;
        }
        
        //This draws the line graph
        function drawLineGraph(){
            var maxYY = findMax(arrY);
            var xRatio = graphWidth/arrX.length;
            //console.log("xRatio: " + xRatio + " yMax: " + maxYY);
            var x1 = 0; 
            var y1 = 0;   
            var x2 = 0;
            var y2 = 0;
            //get points to draw
            console.log("Total pts: " + ((arrY.length - 1)* numPoints));
            for(var i = 0; i < arrY.length - 1; i++){
                y1 = graphHeight - arrY[i]/maxYY * graphHeight + (margin * factor);
                y2 = graphHeight - arrY[i+1]/maxYY * graphHeight + (margin * factor);
                
                //For the line axis with titles
                if(!numberedAxis){
                    x1 = xRatio * i + xPos + xRatio/2; //since has string labels, add half to align with center of text
                    x2 = xRatio * (i+1) + xPos + xRatio/2; //since has string labels, add half to align with center of text                    
                } else {
                    console.log("numbered array");
                    x1 = (i) * (barWidth + margin) +xPos; //i * (barWidth + margin) + margin * (factor + 1) +  barWidth/2;
                    x2 = (i+1) * (barWidth + margin) +xPos;
                }
                console.log("x1: " + x1 + " y1: " + y1 + " -> " + " x2: " + x2 + " y2: " + y2);

                //calculate the "numPoints" points between (x1,y1) & (x2,y2)
                var xPiece = x2 - x1;
                var yPiece = y2 - y1;     
                for(var j = 0; j < numPoints; j++){
                    var xPt = x1 + xPiece * j/numPoints;
                    var yPt = y1 + yPiece * j/numPoints;
                    //console.log("xPt: " + xPt + " " + "yPt:" + yPt);
                    points.push({x: xPt, y: yPt});
                }
            }
            console.log("# of points: " + points.length);
            //console.log("Points array: " + points);
            animateLinePlot(points);
        }
        
        //Draw the graph based on chart type
        function plotGraph(){
            delta = 0;
            percent = 0;
            points = [];
            if(chartType.toLowerCase()==="bar"){
                console.log("---> BAR TYPE");
                drawBarGraph();
            } else if(chartType.toLowerCase() === "line"){
                console.log("---> LINE TYPE");
                drawLineGraph();
            }
        }
        plotGraph();
        
        //This function draws lines. It also sets the width and color of the lines
        function drawLine(startX, startY, endX, endY, delta){
            var pieces = numPoints;
            //console.log("Delta: " + delta + " Pieces: " + pieces + " Color index: " + Math.floor(delta/pieces)%colors.length);
            ctx.strokeStyle = colorGraph(Math.floor(delta/pieces)); //for every delta, divide by piece length of animation step to get array index
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.closePath();
        }
        
        //This function cycles through the color array and adds a gradient for the graph
        function colorGraph(num){
            //color graph
            var gradient=ctx.createLinearGradient(0, graphHeight, graphWidth, graphHeight * 2);
            gradient.addColorStop(0,colors[num%colors.length]);
            gradient.addColorStop(1,"whitesmoke");
            return gradient;
        }
        
        
        //Create button for download
        var button = document.createElement("BUTTON");
        var btnText = document.createTextNode("Download");
        button.appendChild(btnText);
        graphObj.appendChild(button);
        button.style.position = "absolute";
        button.style.cssFloat = "left";
        button.style.zIndex = 10;
        //setup onclick event to export data
        button.onclick = exportDataToCSV;
        
        //This function gets the arrays and converts them to a csv file to download
        //reference https://www.w3schools.com/tags/ref_urlencode.asp
        function exportDataToCSV(){
            var arr = [['x', 'y']];
            for(var i = 1; i <= arrX.length; i++){
                arr.push([arrX[i-1], arrY[i-1]]);
            }
            var csv = [];
            for(var i = 0; i < arr.length; i++){
                csv.push(arr[i].join());        //join() automatically adds commas
            }
            console.log(csv);
            var csvString = csv.join("%0A");        //line feed or new line to separate each X, Y row object
            var anchor = document.createElement("a");
            anchor.href = "data:attachment/csv," + csvString;
            console.log("anchor href: " + anchor.href);
            anchor.target = '_blank';
            anchor.download = fileName + '.csv';
            document.body.appendChild(anchor);
            anchor.click(); //click on the link to automatically open
        }
        
        //Create a second canvas to draw over the original graph (i.e. tooltips, traces, etc)
        var canvasTool = document.createElement('canvas');
        var ctxTool = canvasTool.getContext('2d');  
        canvasTool.height = canvas.height;
        canvasTool.width = canvas.width;
        canvasTool.style.zIndex = 10;
        graphObj.appendChild(canvasTool);       

        //This function creates a vertical line that tracks user movement along the graph 
        function trace(x, y, offSetGraph){
            ctxTool.font = 'bold 20px verdana';
            ctxTool.strokeStyle = "grey";
            ctxTool.lineWidth = 0.2;
            //Draw vertical line to trace
            if(x > offSetGraph && x < graphWidth + offSetGraph && chartType.toLowerCase() === "line"){
                //clear the graph
                 ctxTool.clearRect(0, 0, width, height);
                 ctxTool.beginPath();
                 ctxTool.moveTo(x, offSetGraph);
                 ctxTool.lineTo(x, offSetGraph + graphHeight);
                 ctxTool.stroke();
            }
        }
        //This function shows the values x, y values in a popup based on mouse movement
        //Currently the xVal calculations are correct but the yVal calculations need debugging
        function drawToolTip(x, y){
            //Create tool tip
            if(chartType.toLowerCase() === "line"){
                var variance = 5;
                for(var i = 0; i < points.length; i++){
                    //if(x === points[i].x && y === points[i].y){
                    if((x >= points[i].x - variance && x <= points[i].x + variance) &&(y >= points[i].y - variance && y <= points[i].y + variance)){
                        console.log("points matches: " + x + " " + points[i].x + " "+ y + " " + points[i].y);
                        ctxTool.fillStyle = "grey";
                        ctxTool.fillRect(x, y, 80,50);
                        ctxTool.textAlign = "center";
                        ctxTool.font= "8px Arial";
                        ctxTool.fillStyle = "whitesmoke";
                        //var xVal = arrX[0] +  (i+1) * ((findMax(arrX) - findMin(arrX))/(arrX.length-1))/(points.length -1) ;
                        var xVal = (i/numPoints) * (findMax(arrX) - findMin(arrX))/(arrX.length - 1);
                        xVal = xVal.toFixed(2);    //2 decimal places only
                        var yVal = arrY[0] + Math.floor((i+1) * (findMax(arrY) - findMin(arrY))/(points.length-1));//Math.floor((graphHeight - y + offSetGraph)/delta);
                        yVal = yVal.toFixed(2);
                        if(!numberedAxis)   //check if not numbered, then add title for x axis
                            xVal = arrX[Math.floor((i+1)/numPoints)];

                        console.log("drawYAxesValues: " + (maxY/(arrY.length) * (i+numPoints/4)/(numPoints)) + " " + i);
                        //console.log("xVal: " + xVal + " yVal: " + yVal);
                        ctxTool.fillText("x: " +  xVal + "   y: " +  yVal, x + 40, y + 25);
                    }
                }
            } 
        }

        //This function tracks the mouse movement on the screen gets 
        //back the position of the cursor on the screen
        function trackCursor(e){
            var offSetGraph = factor * margin;
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;
            //console.log("tooltip x: " + x + " y: " + y);
            if(vertTraceOn){
                trace(x, y, offSetGraph);
            }
            if(toolTipOn){
                drawToolTip(x, y);
            }
        }
        //Listen for mouse movement events
        canvas.addEventListener('mousemove', function(event){
            trackCursor(event);
        });
       
        return graphObj;
    };

    return fw;
}