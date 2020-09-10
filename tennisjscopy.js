let canvas
let canvasContext
let ballX = 50 //x axis of the ball
let ballY = 50 //y axis of the ball
let ballSpeedX = 10 //moving the ball x axis with a speed of 10
let ballSpeedY = 4 //moving the ball y axis with a speed of 4
let totalMove = 0 //for event elements later

let player1Score = 0
let player2Score = 0
const WINNING_SCORE = 5

let showingWinScreen = false //find what this is later

let paddle1Y = 250 //find what this is later
let paddle2Y = 250 //find what this is later
const PADDLE_THICKNESS = 10
const PADDLE_HEIGHT = 100

function calMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
};

function handleMouseClick(evt){
	if(showingWinScreen){
		player1Score = 0
		player2Score = 0
		showingWinScreen = false
	}
}

//jquery
$(document).ready(function () {
	canvas = document.getElementByID('gameCanvas')
	canvasContext = canvas.getContext('2d')
	canvasContext.font = '20px Bungee'

	const framesPerSecond = 30 //this defines the speed of scene changes

	setInterval(function(){
		moveEverything()
		drawEverything() //to show the animated html canvas
	}, 1000/framesPerSecond)

	canvas.addEventListener('mousedown', handleMouseClick)

	canvas.addEventListener('mousemove',
		function(evt){
			let mousePos = calMousePos(evt)
			paddle1Y = mousePos.y-(PADDLE_HEIGHT/2)
		})

	function ballReset() {
		if(player1Score >= WINNING_SCORE || player1Score >= WINNING_SCORE){
			showingWinScreen = true
		}

		ballSpeedX = -ballSpeedX
		ballX = canvas.width/2
		ballY = canvas.width/2
	}

})
























