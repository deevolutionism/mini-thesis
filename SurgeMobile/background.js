/*
This is a background application that runs in the login screen.
It might represent information about the current state
of the universe such as number of user logged in right now,
how many articles there are at the moment, how many comments
have been made, how many posts people have created, and maybe
something happens everytime a new post is created.
*/
var startTime;
var currentTime;
var lastDrawTime = 0;
function setup(){
	createCanvas(windowWidth, windowHeight);
	startTime = millis();
}

function draw(){
	background(0,0,100,5);
	noStroke();
	fill(0, random(100), random(200));
	currentTime = millis();
	if(currentTime - lastDrawTime > 100){
		circle(); //draw another circle
	}
}

function circle(){
	lastDrawTime = millis();
	ellipse(random(width), random(height), 50,50);
}