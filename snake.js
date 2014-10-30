//Game Constants
var GRID_COLS=26, GRID_ROWS=26,SCALAR=35, FPS=60;
//Grid Possibilities
var EMPTY=0, SNAKE=1, FRUIT=2, WALL=3;
//DIRECTIONS
var LEFT=0, UP=1, RIGHT=2, DOWN=3;
//KEY CODES WASD
var KEY_LEFT=65, KEY_UP=87, KEY_RIGHT=68, KEY_DOWN=83;
//Speeds
var SLOW = 9, MEDIUM=6, FAST=3;

var grid = {
    width: null, 
    height: null,
    _grid: null, //ARRAY in JS
    
    init: function() {
        this.width=GRID_COLS;
        this.height=GRID_ROWS;
        
        this._grid= [];
        for(var x = 0; x < this.width; x++)
        {
            
            this._grid.push([]);
            
            for(var y=0; y < this.height; y++)
            {
                this._grid[x].push(EMPTY);
            }
        }
    },
    
    set: function(val, x, y){
        this._grid[x][y]=val;
    },
    
    get: function(x,y)
    {
        return this._grid[x][y];
    }
}

var snake = {
    direction: null,
    last: null,
    _snakeBody: null,
        init: function(dir, x, y){
            this.direction = dir;
            this._snakeBody = [];
            this.insert(x,y);
        },
    
    insert: function(x,y){
        this._snakeBody.unshift({x:x, y:y});
        this.last = this._snakeBody[0];
    },
    
    remove: function(x,y){
        return this._snakeBody.pop();
    }
}

function setFruit(){
   
    var _empty = [];
    for(var x=0;x < grid.width; x++) {
        for(var y=0;y < grid.height; y++){
            if(grid.get(x,y)===FRUIT){
                grid.set(EMPTY,x,y);
                _empty.push({x:x, y:y});
            }
            if(grid.get(x,y)===EMPTY){
                _empty.push({x:x, y:y});
            }
        }
    }
    
    
    var randIndex = Math.floor(Math.random()*_empty.length);
    var randpos = _empty[randIndex];
    grid.set(FRUIT, randpos.x, randpos.y);
    
    
}
function setWall(){
   
    var _empty = [];
    for(var x=0;x < grid.width; x++) {
        for(var y=0;y < grid.height; y++){
            if(grid.get(x,y)===WALL){
                grid.set(EMPTY,x,y);
                _empty.push({x:x, y:y});
            }
            if(grid.get(x,y)===EMPTY){
                _empty.push({x:x, y:y});
            }
        }
    }
    
    
    var randIndex = Math.floor(Math.random()*_empty.length);
    var randpos = _empty[randIndex];
    grid.set(WALL, randpos.x, randpos.y);
    
    
}

var canvas, context, score, topScore, frames, wallFrames, keystate;

function update(){
    frames++;
    wallFrames++;
    if(frames%350===0)
    {
        setFruit();
    }
    else if(wallFrames%200 === 0)
    {
        setWall();
    }
    if(keystate[KEY_LEFT]&&snake.direction !==RIGHT)snake.direction = LEFT;
    if(keystate[KEY_UP]&&snake.direction !==DOWN)snake.direction = UP;
    if(keystate[KEY_RIGHT]&&snake.direction !==LEFT)snake.direction = RIGHT;
    if(keystate[KEY_DOWN]&&snake.direction !==UP)snake.direction = DOWN;
    
    if(score < 10){
        if(frames%SLOW === 0){
            var newX = snake.last.x;
            var newY = snake.last.y;
        
            switch(snake.direction){
                case LEFT:
                    newX--;
                    break;
                case UP:
                    newY--;
                    break;
                case RIGHT:
                    newX++;
                    break;
                case DOWN:
                    newY++;
                    break;
            }
        }
    }
        else if(score < 15){
        if(frames%MEDIUM === 0){
            var newX = snake.last.x;
            var newY = snake.last.y;
        
            switch(snake.direction){
                case LEFT:
                    newX--;
                    break;
                case UP:
                    newY--;
                    break;
                case RIGHT:
                    newX++;
                    break;
                case DOWN:
                    newY++;
                    break;
            }
        }
    }else{
            
        if(frames%FAST === 0){
            var newX = snake.last.x;
            var newY = snake.last.y;
        
            switch(snake.direction){
                case LEFT:
                    newX--;
                    break;
                case UP:
                    newY--;
                    break;
                case RIGHT:
                    newX++;
                    break;
                case DOWN:
                    newY++;
                    break;
            }
        }
    }
        
    if(0 > newX || newX > grid.width -1 || 0 > newY || newY > grid.height -1 ||
    grid.get(newX,newY) === SNAKE || grid.get(newX,newY) === WALL){
        if(topScore < score)
        {
            document.cookie = 'TopScore = topScore; expires=Tue, 19 Jan 2038 00:00:00 UTC; path=/'
            topScore = score;
        }
        $('#GameOver').show();
        $('#MainScreen').show();
        return init();
        
    }
        
    var tail = null;
    if(grid.get(newX, newY) === FRUIT){
        tail = {x:newX, y:newY};
        score++;
        frames=0;
        setFruit();
            
    }
    
    else{
        tail = snake.remove();
        grid.set(EMPTY, tail.x, tail.y);
        tail.x = newX;
        tail.y = newY;
    }    
        
    grid.set(SNAKE, tail.x, tail.y);
    snake.insert(tail.x, tail.y);
    
}
function draw(){
    
    var theWidth = canvas.width/grid.width;
    var theHeight = canvas.height/grid.height;
    
    for(var x = 0;x < grid.width; x++){
        for(var y=0; y < grid.height; y++){
            switch(grid.get(x,y)){
                case EMPTY:
                    context.fillStyle = "#222";
                    break;
                case SNAKE:
                    context.fillStyle = "#5A5";
                    break;
                case FRUIT:
                    context.fillStyle = "#F00";
                    break;
                case WALL:
                    context.fillStyle = "#F0F";
                    break;
            
            }
            context.fillRect(x*theWidth, y*theHeight, theWidth, theHeight);
        }
    }
    
    context.fillStyle = "#FFF";
    context.fillText("SCORE: " + score, 10, 10);
    context.fillText("Top Score: " + document.cookie, 100,10);
    
}
function loop(){
    update();
    draw();
}
function init(){
    
    grid.init();    
    score=0;
    var snakePos = {x:Math.floor(GRID_COLS/2), y:GRID_ROWS - 1};
    snake.init(UP, snakePos.x, snakePos.y);
    grid.set(SNAKE, snakePos.x, snakePos.y);
    
    setFruit();
    setWall();
    
}

function main(){
//    alert("Dope Javascript");
    
    canvas = document.createElement("canvas");
    canvas.width = GRID_COLS*SCALAR;
    canvas.height=GRID_ROWS*SCALAR;
    context = canvas.getContext("2d");
    
    
    $('#GameOver').hide();
    $('#GameScreen').hide();
    
    $(document).on("click",'#PlayButton',function(){
        $('#MainScreen').hide();
        $('#GameOver').hide();
    })
    
    
    var gameCanvas = document.getElementById("GameScreen");    
    gameCanvas.appendChild(canvas);
    $('#GameScreen').show();
    
    keystate={};
    document.addEventListener("keydown", function(evt){
        keystate[evt.keyCode]=true;
    });
    document.addEventListener("keyup", function(evt){
       delete keystate[evt.keyCode]; 
    });
    wallFrames=0;
    frames=0;
    
    init();
    setInterval(function(){loop()}, 1000/FPS);
}
if( !!(window.addEventListener)) {
    window.addEventListener("DOMContentLoaded", main);
}
else { //MSIE
    window.attachEvent("onLoad", main);
}



