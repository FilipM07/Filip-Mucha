window.addEventListener("deviceorientation", orientation, true);
let time;
let interval;
let board = { //class for board
    width: 640,
    height: 480
}

let ball = { //class ball
    width: 25,
    height: 25,

    x: 332.5, // x,y set in the middle of board
    y: 252.5,

    updatedX: 0,
    updatedY: 0
}

let hole = { //class hole
    width: 25,
    height: 25,

    x: 600,
    y: 40
}

let phone = { //phone orientation variables
    x: 0,
    y: 0
}

function orientation(e) { //function to get phone position
    phone.x = e.gamma;
    phone.y = e.beta;
}



function update() {

    document.querySelector("#ball").style.top = ball.y + 'px';
    document.querySelector("#ball").style.left = ball.x + 'px';   

    ball.updatedX = ball.x + (phone.x * 0.2);    
    ball.updatedY = ball.y + (phone.y * 0.2);

    // console.log(ball.updatedX);
 
    if(ball.updatedX > 0 && ball.updatedX < (board.width - ball.width)) {
        ball.x = ball.updatedX;
    }
    
    if(ball.updatedY > 0 && ball.updatedY < (board.height - ball.height)) {
        ball.y = ball.updatedY;
    }

    if(checkCollisions()) { // if ball touches hole
        let stopTime = Date.now();
        let playTime = time - stopTime;
        alert("Win! your time: "+ playTime);
        clearInterval(interval); //stop updating 
    }

}

function checkCollisions() {
    let dx = hole.x - ball.x;
    let dy = hole.y - ball.y;

    let rad = ball.width + hole.width;

    if((dx * dx) + (dy * dy)  < rad * rad) return true; else return false;  
}

function start() {
    document.querySelector("#hole").style.top = hole.y + 'px'; console.log(hole.y);
    document.querySelector("#hole").style.left = hole.x + 'px';

    time = Date.now();
    interval = setInterval(update, 10); // play update() function every 10 miliseconds

}

window.onload = () => {
    start();
}
