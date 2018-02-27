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

let showingWinScreen = false

let paddle1Y = 250
let paddle2Y = 250
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
}

function handleMouseClick(evt){
	if(showingWinScreen){
		player1Score = 0
		player2Score = 0
		showingWinScreen = false
	}
}

$(document).ready(function () {
	canvas = document.getElementById('gameCanvas')
	canvasContext = canvas.getContext('2d')
	canvasContext.font = '20px Bungee'

	const framesPerSecond = 30

	setInterval(function(){
		moveEverything()
		drawEverything() //to show animated html canvas
	}, 1000/framesPerSecond)

	canvas.addEventListener('mousedown', handleMouseClick)

	canvas.addEventListener('mousemove', 
		function(evt){
			let mousePos = calMousePos(evt)
			paddle1Y = mousePos.y-(PADDLE_HEIGHT/2) 
		})

	function ballReset(){
		if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE){
			showingWinScreen = true
		}

		ballSpeedX = -ballSpeedX
		ballX = canvas.width/2
		ballY = canvas.height/2
	}

	function compMovement(){
		const paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2)
		if(paddle2YCenter <ballY-35){
			paddle2Y += 10
		} else if(paddle2YCenter>ballY+35) {
			paddle2Y -= 10
		}
	}

//start game
	function moveEverything(){
		if(showingWinScreen){
			return
		}

		compMovement()

		ballX += ballSpeedX
		ballY += ballSpeedY

		if(ballX < 0+5){
			if(ballY > paddle1Y && 
				ballY < paddle1Y+PADDLE_HEIGHT){
				ballSpeedX = -ballSpeedX
				let deltaY = ballY
						-(paddle1Y+PADDLE_HEIGHT/2)
				ballSpeedY = deltaY * 0.35
				totalMove++	
				trigger()
			} else {
				player2Score++
				ballReset()
			}
		}

		if (ballX > canvas.width-5) {
			if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
				ballSpeedX = -ballSpeedX
				let deltaY = ballY
						-(paddle2Y+PADDLE_HEIGHT/2)
				ballSpeedY = deltaY * 0.35
				totalMove++
			} else {
				player1Score++
				ballReset()
			}
		} 

		if (ballY <0){
			ballSpeedY = -ballSpeedY
		} else if (ballY > canvas.height) {
			ballSpeedY = -ballSpeedY
		} 
	}

	function drawNet(){
		for(let i=0; i<canvas.height; i+=50){
		colorRect(canvas.width/2-1,i,2,20,'white')
		}
	}



	function drawEverything(){
		//canvas
		colorRect(0,0,canvas.width, canvas.height, 'black')
		//end game screen
		if(showingWinScreen){
			canvasContext.fillStyle = 'white'
			if(player1Score >= WINNING_SCORE){
				canvasContext.textAlign = 'center'
				canvasContext.fillText("LEFT PLAYER WON", 400, 200)
			} else if(player2Score >= WINNING_SCORE){
				canvasContext.textAlign = 'center'
				canvasContext.fillText("RIGHT PLAYER WON", 400, 200)
			}
			canvasContext.textAlign = 'center'
			canvasContext.fillText("CLICK TO CONTINUE", 400, 500)
			return
		}

		drawNet()
		//left paddle
		colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white')
		//right paddle
		colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white')
		//render the ball
		colorCircle(ballX, ballY, 10, 'white')
		canvasContext.fillText(player1Score, 100, 100)
		canvasContext.fillText(player2Score, canvas.width-100, 100)
		canvasContext.strokeStyle='black'; //for centering
		canvasContext.moveTo(400, 580); //for centering
		canvasContext.lineTo(400, 20); //for centering
		canvasContext.stroke(); //for centering

		canvasContext.textAlign = 'center' //center text
		canvasContext.fillText("Tennis is fun", 400, 200)
		canvasContext.fillText("You're on the left side", 400, 250)

	}

	function colorCircle(centerX, centerY, radius, drawColor){
		canvasContext.fillStyle = drawColor;
		canvasContext.beginPath() //
		canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true) //try 0,Math.PI/2, true and false for fun
		canvasContext.fill()
	}

	function colorRect(leftX, topY, width, height, drawColor){
		canvasContext.fillStyle = drawColor
		canvasContext.fillRect(leftX, topY, width, height)
	}


})//end jquery