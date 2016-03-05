var bubbles = [];

var images = [];

function preload() {
  heart = loadImage("images/love.png");
  happy = loadImage("images/happy.png");
  surprised = loadImage("images/surprised.png");
  sad = loadImage("images/sad.png");
  disgusted = loadImage("images/disgusted.png");
  angry = loadImage("images/angry.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  for (var i = 0; i < 1; i++){
    bubbles[i] = new Bubble(width/2, height/2); //make 100 bubbles
  }
  
}

function draw() {
  clear();
  
  for (var i = 0; i < bubbles.length; i++){ //loop through all instantiations
    bubbles[i].update();
    bubbles[i].display();
    if (bubbles[i].dead()){
      bubbles.splice(i, 1);
    }
    for (var j = i + 1; j < bubbles.length; j++){ //check every other instance for collision
      bubbles[i].intersects(bubbles[j]);
    }
  }
  
  if (bubbles.length > 100){
    bubbles.splice(0,1);
  }
  
}

function mousePressed(){
  var b = new Bubble(mouseX, mouseY);
  bubbles.push(b);
}


function Bubble(x, y) { //capitalize to distinguish as a class
//class constructor
  this.xpos = x;
  this.ypos = y;
  this.lifetime = 255;
  this.col = 255;
  this.s = 100;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
  this.heartPosx, this.heartPosy, this.heartSize;
  this.happyPosx, this.happyPosy, this.happySize;
  this.surprisedPosx, this.surprisedPosy, this.surprisedSize;
  this.sadPosx, this.sadPosy, this.sadSize;
  this.disgustedPosx, this.disgustedPosy, this.disgustedSize;
  this.angryPosx, this.angryPosy, this.angrySize;
  
  // //heart;
  // this.heartPosx = this.xpos - this.s;
  // this.heartPosy = this.ypos - this.s;
  // this.heartSize = this.s/6;
  
  // //happy;
  // this.happyPosx = this.xpos + this.s;
  // this.happyPosy = this.ypos + this.s;
  // this.happySize = this.s/6;
  
  // //suprised;
  // this.surprisedPosx = this.xpos - this.s;
  // this.surprisedPosy = this.ypos + this.s;
  // this.surprisedSize = this.s/6;
  
  // //sad;
  // this.sadPosx = this.xpos + this.s;
  // this.sadPosy = this.ypos - this.s;
  // this.sadSize = this.s/6;
  
  // //disgusted;
  // this.disgustedPosx = this.xpos + this.s;
  // this.disgustedPosy = this.ypos;
  // this.disgustedSize = this.s/6;
  
  // //angry;
  // this.angryPosx = this.xpos - this.s;
  // this.angryPosy = this.ypos;
  // this.angrySize = this.s/6;
  
  //class method
  this.display = function() {
    fill(this.col);
    stroke(5);
    ellipse(this.xpos, this.ypos, this.lifetime,this.lifetime);
    strokeWeight(4);
    stroke(2);
    ellipse(this.heartPosx, this.heartPosy, this.heartSize, this.heartSize);
    image(heart, this.heartPosx, this.heartPosy);
    ellipse(this.happyPosx, this.happyPosy, this.happySize, this.happySize);
    image(happy, this.happyPosx, this.happyPosy);
    ellipse(this.surprisedPosx, this.surprisedPosy, this.surprisedSize, this.surprisedSize);
    image(surprised, this.surprisedPosx, this.surprisedPosy);
    ellipse(this.sadPosx, this.sadPosy, this.sadSize, this.sadSize);
    image(sad, this.sadPosx, this.sadPosy);
    ellipse(this.disgustedPosx, this.disgustedPosy, this.disgustedSize, this.disgustedSize);
    image(disgusted, this.disgustedPosx, this.disgustedPosy);
    ellipse(this.angryPosx, this.angryPosy, this.angrySize, this.angrySize);
    image(angry, this.angryPosx, this.angryPosy);
  };
  
  this.update = function() {
    this.lifetime--;
    this.s = this.lifetime;
    
    this.heartPosx = this.xpos - this.s;
    this.heartPosy = this.ypos - this.s;
    this.heartSize = this.s/6;
    
    //happy;
    this.happyPosx = this.xpos + this.s;
    this.happyPosy = this.ypos + this.s;
    this.happySize = this.s/6;
    
    //suprised;
    this.surprisedPosx = this.xpos - this.s;
    this.surprisedPosy = this.ypos + this.s;
    this.surprisedSize = this.s/6;
    
    //sad;
    this.sadPosx = this.xpos + this.s;
    this.sadPosy = this.ypos - this.s;
    this.sadSize = this.s/6;
  
    //disgusted;
    this.disgustedPosx = this.xpos + this.s;
    this.disgustedPosy = this.ypos;
    this.disgustedSize = this.s/6;
    
    //angry;
    this.angryPosx = this.xpos - this.s;
    this.angryPosy = this.ypos;
    this.angrySize = this.s/6;
  };
  
  this.dead = function() {
    if(this.lifetime < 0){
      return true;
    } else {
      return false;
    }
  }
  
  this.intersects = function(other){
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.lifetime/2 + other.lifetime/2){ //do they intersect?
      this.col = random(255);
    }
  }
  
}