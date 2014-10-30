//Game Constants
var GRID_COLS=26, GRID_ROWS=26,SCALAR=20, FPS=60;


function update(){

}
function draw(){

}
function loop(){
    update();
    draw();
}
function init(){
    
}

function main(){
//    alert("Dope Javascript");
    canvas = document.createElement("canvas");
    canvas.width = GRID_COLS*SCALAR;
    canvas.height=GRID_ROWS*SCALAR;
    context = canvas.getContext("2d");
    document.body.appendChild(canvas);
    init();
    setInterval(function(){loop()}, 1000/FPS);
}
if( !!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", main);
}
else { //MSIE
    window.attachEvent("onLoad", main);
}



