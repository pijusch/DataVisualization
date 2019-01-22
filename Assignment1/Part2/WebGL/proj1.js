var lines = [];
var gl;
var shaderProgram;
var squareVertexPostionBuffer;
var squareVertexColorBuffer;
var vertexIndexBuffer;
var colors = [];
var vertices = [];
var bVertices = [];


function normalize_coords(){
		min_x = 0;
		min_y = -3007;
		max_x = 90;
		max_y = 2101;
	for(var i=0;i<vertices.length/3;i++){
		vertices[i*3+0] = ((vertices[i*3+0]-min_x)/(max_x-min_x))*1.6-0.8
		vertices[i*3+1] = ((vertices[i*3+1]-min_y)/(max_y-min_y))*1.6-0.8
	}
}



    function initGL(canvas) { /** Gets Canvas **/
        try {
            gl = canvas.getContext("webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }



    function drawScene() { /** Draws Scene **/ 
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

	var c = document.getElementById("rcanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fill();
	ctx.fillText("MALE", 20, 50);
	ctx.fillText("FEMALE", 20, 70);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.fillRect(10, 45, 5, 5);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.fillRect(10, 65, 5, 5);


	normalize_coords();
	initBuffers();

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.POINTS,0,vertices.length/15);


	setBVertices();
	tempc = colors;
        colors = setBColors();
        vertices = bVertices;

	initBuffers();

        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, squareVertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.LINES,0,vertices.length/3);

    }
 

 function setBVertices(){ /** Vertices for background lines**/
    bVertices = [];
   bVertices = bVertices.concat([0,0,0,0,19,0,0,0,0,1,0,0]);
   bVertices = normalize(bVertices);
   
 }
 function setBColors(){ 
  bColors = [];
  for (var i = 0;i<bVertices.length/3;i++){
	bColors = bColors.concat([0,0,0,1]);
  }
  return bColors;
 }


 function normalize(vertices){ /** Normalizes everything to viewport **/
	n  = vertices.length;
	xMin = 100000;
	xMax = -100000;
	yMin = 100000;
	yMax = -100000;
	for (var i = 0;i<n;i++){
		if (i%3==0){
			if (xMax < vertices[i]){
				xMax  = vertices[i];
			}
			if (xMin > vertices[i]){
				xMin = vertices[i];
			}
		}
		else if (i%3==1){
			if (yMax < vertices[i]){
				yMax  = vertices[i];
			}
			if (yMin > vertices[i]){
				yMin = vertices[i];
			}
		}
	}
	for (var i = 0; i<n; i++){
		if (i%3==0){
			vertices[i] = 1.9*(vertices[i]-xMin)/(xMax-xMin)-.95;
		}
		else if (i%3==1){
			vertices[i] = 1.9*(vertices[i]-yMin)/(yMax-yMin)-.95;			
		}
	}
	return vertices
 }


    function webGLStart() { /** First Call**/
        var canvas = document.getElementById("proj1-canvas");
	
        initGL(canvas);
	var c = document.getElementById("ycanvas");
	var ctx = c.getContext("2d");
	ctx.rotate(-Math.PI/2);
	ctx.translate(-240, -20);
	ctx.fillText("Days from 1st TBI", 10, 50);
	
	var c = document.getElementById("xcanvas");
	var ctx = c.getContext("2d");
	ctx.translate(200, -20);
	ctx.fillText("Age", 10, 50);



        initShaders();
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        initBuffers();
        gl.clearColor(0.9, 0.9, 0.9, 1);
	drawScene();
    }



 function buttonEvent(arg){ /** Handles Button Events **/
   lastButton = button;
   button = arg;
   if(arg ==3 ){
	document.getElementById("all-text").style.display = 'block';
	document.getElementById("one-text").style.display = 'none';
	drawAll();
    }
   else if(arg ==4){
	document.getElementById("all-text").style.display = 'none';
	document.getElementById("one-text").style.display = 'none';
	document.getElementById("ise").style.display = 'none';
	document.getElementById("ive").style.display = 'none';
	document.getElementById("ivi").style.display = 'none';
	document.getElementById("chaos").style.display = 'none';
	document.getElementById("all").style.display = 'none';
	document.getElementById("chaos_msg").style.display = 'block';
        chaos(100);
   }
	else{
	document.getElementById("all-text").style.display = 'none';
	document.getElementById("one-text").style.display = 'block';
	drawOne(arg);
	}
}

   function initBuffers(){ /** Sets Buffers **/

	squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	squareVertexPositionBuffer.itemSize = 3;
	squareVertexPositionBuffer.numItems = vertices.length/3;

	squareVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	squareVertexColorBuffer.itemSize = 4;
	squareVertexColorBuffer.numItems = colors.length/3;
   }








function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    lines = [];
    while (allTextLines.length) {
        lines.push(allTextLines.shift().split(','));
    }
	console.log(lines);
     
    processCSV(lines);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Cannot read file !");
	}
}

function processCSV(lines){  
vertices = []
colors = []
for (var i=1;i<lines.length;i++){
  if(lines[i][1]=='MALE'){
  vertices = vertices.concat([lines[i][2],lines[i][5],0]);
  colors = colors.concat([1,0,0,1]);
  }
 else{
  vertices = vertices.concat([lines[i][2],lines[i][5],0]);
  colors = colors.concat([0,0,1,1]);
}
}
x = document.getElementById("csv_input");
x.style.display = "none";
drawScene();
}
