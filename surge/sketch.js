var bubbles = [];
var images = [];
var postP, postI, postB, pt;
var hashTagP, hashTagI, hashTagB, hashTagBP, numTags;
var func = 0;
var postTextInput, hashTagList = [];
var postButtonPressed = false;
var reactionType = null;

var canvas = document.getElementById("DefaultCanvas0"); // need to determine mouse position in canvas

function preload() {
  images[0] = loadImage("images/love.png");
  images[1] = loadImage("images/happy.png");
  images[2] = loadImage("images/surprised.png");
  images[3] = loadImage("images/sad.png");
  images[4] = loadImage("images/disgusted.png");
  images[5] = loadImage("images/angry.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  // for (var i = 0; i < 1; i++){
  //   bubbles[i] = new Bubble(width/2, height/2); //make 100 bubbles
  // }
  numTags = 0;

}

//increase relative size

function postText() {
  //grab the text and the hashtags entered into the inputs
  //place them in temporary variable to later be injected into
  //a bubble post object
  postTextInput = document.getElementById('pt').value;
  pt = postTextInput;
  console.log(postText);
  document.getElementById('pt').value = '';
  document.getElementById('ht').value = '';
  postButtonPressed = true;
}

function addHashTag() {

  hashTagInput = document.getElementById('ht').value;
  hashTagList.push(hashTagInput);
  //creat a new element which includes the hashtag just entered


  var element = document.getElementById('tags');
  var p = document.createElement('p') //create p element
  var tag = document.createTextNode(hashTagList[numTags]); //create text
  p.appendChild(tag); //put the text inside the p element
  element.appendChild(p); //add the p element to a container
  //var hashTagI = document.createTextNode(hashTagList[i]);
  //tagContainer.appendChild(tag);


  document.getElementById('ht').value = '';
  numTags++;
}

function draw() {
  clear();
  background(230);

  for (var i = 0; i < bubbles.length; i++) { //loop through all instantiations
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].addReaction();
    if (bubbles[i].dead()) {
      bubbles.splice(i, 1);
    }
    for (var j = i + 1; j < bubbles.length; j++) { //check every other instance for collision
      bubbles[i].intersects(bubbles[j]);
    }
  }

  if (bubbles.length > 100) {
    bubbles.splice(0, 1);
  }
  
  if(postButtonPressed == true){
    noFill();
    ellipse(mouseX, mouseY, 100, 100);
    textAlign(CENTER);
    textSize(24);
    fill(150);
    text("place your post somewhere on screen", width/2, height/2);
  }

}

function mousePressed() {
  if (mouseY >= 0 && postButtonPressed == true) {
    var b = new Bubble(mouseX, mouseY, millis(), postText);
    bubbles.push(b);
    postButtonPressed = false;
    pt = '';
  }
  check();//is mouse intersecting with post bubble when pressed?
  //if so, then show menu around the post
}

function check() {
  for (var i = 0; i < bubbles.length; i++) {
    console.log(bubbles[i].mouseIntersectsWithPost);
    if (bubbles[i].mouseIntersectsWithPost()) { //is the mouse intersecting with the post?
      bubbles[i].showMenu = true;
      console.log('show menu');
    } else if (bubbles[i].mouseIntersectsWithPost() == false) {
      bubbles[i].showMenu = false;
      console.log('hide menu');
    }
    
    console.log(bubbles[i].mouseIntersectsWithReactions());
    if(bubbles[i].mouseIntersectsWithReactions() == bubbles[i].reactionType[i]){
      bubbles[i].updateType[i] = true;
    } else {
      
    }
    //bubbles[i].updateReactions(bubbles[i].mouseIntersectsWithReactions());
    //bubbles[i].updateReactions(String(bubbles[i].mouseIntersectsWithReactions()));
    // if(bubbles[i].mouseIntersectsWithReactions() == bubbles[i].reactionType[i]){
    //   bubbles[i].updateReactions(bubbles[i].reactionType[i]);
    // }
    //is the mouse intersecting with one of the buttons? determine which one.
    //if(bubbles[i].mouseIntersectsWithReactions()){ 
      //if its intersecting with a bubble when the button was pressed, change boolean.
      //console.log(bubbles[i].reactionType[i]);
      //bubbles[i].addReaction(bubbles[i].reactionType[i]);
    //}
  }
}



function Bubble(x, y, time, t) { //capitalize to distinguish as a class
  //class constructor
  this.xpos = x;
  this.ypos = y;
  this.lifetime = 100;
  this.postText = t;
  this.startTime = time;
  this.nextSecond = this.startTime + 1000;
  this.showMeny = false;
  this.desiredSeparation;
  this.scalar = 6;
  this.col = 255;
  this.s = 100;
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.maxReactionSize;
  
  //array = [index0: heart, index1: happy, index2: surprised, index3: sad, index4: disgusted, index5: angry]
  this.reactionPosx =[0,0,0,0,0,0];
  this.reactionPosy =[0,0,0,0,0,0];
  this.reactionSize = [0,0,0,0,0,0];
  this.reactionType = ['heart', 'happy', 'surprised', 'sad', 'disgusted', 'angry'];
  this.percentTotalReactions = [0,0,0,0,0,0];
  this.numReactions = [0,0,0,0,0,0];
  this.reactionColor = [150,150,150,150,150,150];
  this.reactionScale = [0,0,0,0,0,0];
  this.reactionRS = [0,0,0,0,0,0];
  this.updateType = [false,false,false,false,false,false]
  
  
  this.totalReactionCount = 0; //for calculating percentages
  this.heartPosx, this.heartPosy, this.heartSize, this.heartC = 150, this.numHeartReactions = 0, this.hrs = 0;
  this.happyPosx, this.happyPosy, this.happySize, this.happyC = 150, this.numHappyReactions = 0, this.hprs = 0;
  this.surprisedPosx, this.surprisedPosy, this.surprisedSize, this.surprisedC = 150, this.numSurprisedReactions = 0, this.surrs = 0;
  this.sadPosx, this.sadPosy, this.sadSize, this.sadC = 150, this.numSadReactions = 0, this.sadrs = 0;
  this.disgustedPosx, this.disgustedPosy, this.disgustedSize, this.disgustedC = 150, this.numDisgustedReactions = 0, this.drs = 0;
  this.angryPosx, this.angryPosy, this.angrySize, this.angryC = 150, this.numAngryReactions = 0, this.ars = 0;

  this.percentTotalHeartReactions = 0;
  this.percentTotalHappyReactions = 0;
  this.percentTotalSurprisedReactions = 0;
  this.percentTotalSadReactions = 0;
  this.percentTotalDisgustedReactions = 0;
  this.percentTotalAngryReactions = 0;


  //class method
  this.display = function() {
    fill(this.r, this.g, this.b);
    stroke(5);
    ellipse(this.xpos, this.ypos, this.lifetime, this.lifetime);
    textFont("monaco");
    textSize(this.lifetime / 2);
    text(this.lifetime, this.xpos - 10, this.ypos + 10)

    strokeWeight(2);
    stroke(2);

    if (this.showMenu == true) {
      
      fill(255);
      for (var i = 0; i < this.reactionType.length; i++){
        this.reactionScale[i] = map(this.reactionSize[i],0,100 / this.scalar,0,100);
        stroke(this.reactionColor[i]);
        ellipse(this.reactionPosx[i], this.reactionPosy[i], this.reactionSize[i], this.reactionSize[i]);
        image(images[i], 0,0,100,100, this.reactionPosx[i] - (this.reactionScale[i] / 16), this.reactionPosy[i] - (this.reactionScale[i] / 16), this.reactionScale[i] / 8, this.reactionScale[i] / 8);
      }
      
      //scaling and positioning images
      // this.hs = map(this.heartSize, 0, 100 / this.scalar, 0, 100);
      // this.hps = map(this.happySize, 0, 100 / this.scalar, 0, 100);
      // this.ss = map(this.sadSize, 0, 100 / this.scalar, 0, 100);
      // this.as = map(this.angrySize, 0, 100 / this.scalar, 0, 100);
      // this.sps = map(this.surprisedSize, 0, 100 / this.scalar, 0, 100);
      // this.ds = map(this.disgustedSize, 0, 100 / this.scalar, 0, 100);
      //console.log(this.hs);


      // fill(255);
      // stroke(this.heartC)
      // ellipse(this.heartPosx, this.heartPosy, this.heartSize, this.heartSize);
      // image(heart, 0, 0, 100, 100, this.heartPosx - (this.hs / 16), this.heartPosy - (this.hs / 16), this.hs / 8, this.hs / 8);

      // stroke(this.happyC);
      // ellipse(this.happyPosx, this.happyPosy, this.happySize, this.happySize);
      // image(happy, 0, 0, 100, 100, this.happyPosx - (this.hps / 16), this.happyPosy - (this.hps / 16), this.hps / 8, this.hps / 8);

      // stroke(this.surprisedC);
      // ellipse(this.surprisedPosx, this.surprisedPosy, this.surprisedSize, this.surprisedSize);
      // image(surprised, 0, 0, 100, 100, this.surprisedPosx - (this.sps / 16), this.surprisedPosy - (this.sps / 16), this.sps / 8, this.sps / 8);

      // stroke(this.sadC);
      // ellipse(this.sadPosx, this.sadPosy, this.sadSize, this.sadSize);
      // image(sad, 0, 0, 100, 100, this.sadPosx - (this.ss / 16), this.sadPosy - (this.ss / 16), this.ss / 8, this.ss / 8);

      // stroke(this.disgustedC);
      // ellipse(this.disgustedPosx, this.disgustedPosy, this.disgustedSize, this.disgustedSize);
      // image(disgusted, 0, 0, 100, 100, this.disgustedPosx - (this.ds / 16), this.disgustedPosy - (this.ds / 16), this.ds / 8, this.ds / 8);

      // stroke(this.angryC);
      // ellipse(this.angryPosx, this.angryPosy, this.angrySize, this.angrySize);
      // image(angry, 0, 0, 100, 100, this.angryPosx - (this.as / 16), this.angryPosy - (this.as / 16), this.as / 8, this.as / 8);
    }

  };

  this.update = function() {
    //every second that passes, subtract one lifetime
    if (millis() >= this.nextSecond) {
      this.lifetime--
        this.s = this.lifetime;
      this.desiredSeparation = this.lifetime * 2;
      this.nextSecond = millis() + 1000;
    }


    if (this.showMenu == true) {
      
      for(var i = 0; i < this.reactionType.length; i++){
        this.reactionSize[i] = (this.s / this.scalar) + this.reactionRS[i];
      }
      
      //heart
      this.reactionPosx[0] = this.xpos - this.s / 2;
      this.reactionPosy[0] = this.ypos - this.s;
      //happy;
      this.reactionPosx[1] = this.xpos + this.s / 2;
      this.reactionPosy[1] = this.ypos + this.s;
      //suprised;
      this.reactionPosx[2] = this.xpos - this.s / 2;
      this.reactionPosy[2] = this.ypos + this.s;
      //sad;
      this.reactionPosx[3] = this.xpos + this.s / 2;
      this.reactionPosy[3] = this.ypos - this.s;
      //disgusted;
      this.reactionPosx[4] = this.xpos + this.s;
      this.reactionPosy[4] = this.ypos;
      //angry;
      this.reactionPosx[5] = this.xpos - this.s;
      this.reactionPosy[5] = this.ypos;
    }

  };

  this.mouseIntersectsWithPost = function() {
    //if mouse was clicked and the mouse x and y coordinates
    //intersect with this post, then return true.
    var d = dist(this.xpos, this.ypos, mouseX, mouseY)
    if (d < this.lifetime / 2) {
      console.log('mouse intersecting');
      return true;
    } else if (d > this.lifetime+20){
      console.log('nope');
      return false;
    }
  }
  
  this.mouseIntersectsWithReactions = function(){
    for(var i = 0; i < this.reactionType.length; i++){
      var d = dist(this.reactionPosx[i], this.reactionPosy[i], mouseX, mouseY)
      if(d < this.reactionSize[i] / 2){
        this.updateReactions(this.reactionType[i]);
        return this.reactionType[i]; // tell the mouse which one it clicked on
      }
    }
  }

  this.dead = function() {
    if (this.lifetime < 0) {
      return true;
    } else {
      return false;
    }
  }

  this.intersects = function(other) {
    var d = dist(this.posx, this.posy, other.posx, other.posy);
    if (d < this.desiredSeparation + other.desiredSeparation) { //do they intersect?
      this.col = random(255);
      //console.log("intersecting");
    }
  }

  this.separate = function(other) { //make bubbles move away from each other to create space and prevent overlap.
    this.desiredSeparation = this.s * 2;

  }

  this.addReaction = function() {
    //when mouse is inside the circle, highlight it
    if (this.showMenu == true) {
      for (var i = 0; i < this.reactionType.length; i++){
        var d = dist(this.reactionPosx[i], this.reactionPosy[i], mouseX, mouseY);
        if(d <= this.reactionSize[i] /2 ){ //is the mouse overlapping with the button?
          this.reactionColor[i] = 0; // change color to notify when overlapping
        } else {
          this.reactionColor[i] = 150;
        }
      }
    }
  }

  this.updateReactions = function(reaction) {
    var r = reaction;
    this.maxReactionSize = this.lifetime / 2;
    console.log('hello from update reactions')
    for (var i = 0; i < this.reactionType.length; i++){
      if(r == this.reactionType[i]){

        this.totalReactionCount++;
        this.numReactions[i]++;
        console.log(this.reactionType[i] + ' has been updated to ' + this.numReactions[i]);
      }
    }



    //console.log(r)
    // if (r === 'heart') {
    //   this.totalReactionCount++; //add 1 to total count
    //   this.numHeartReactions++; //add one to heart
    //   this.g++;
    //   this.r--;
    //   this.clickedHeart = false;
    //     //50% of post size = max hrs size
    //     //hrs = heartReactionSize
    //     //map(value: hrs,min-val: 0, max-val: pecentageheartreactions, min-outpus: 0, max-output: postSize/2)
    //     //percentage of total reactions = numHeartReactions/totalReactionCount * 100

    //     //console.log(this.totalReactionCount);

    // }
    // if (r === 'happy') {
    //   //console.log('happy working')
    //   this.totalReactionCount++;
    //   this.numHappyReactions++;
    //   this.g++;
    //   this.r++;
    //   this.b++;
    // }
    // if (r === 'surprised') {
    //   this.totalReactionCount++;
    //   this.numSurprisedReactions++;
    //   //this.b++
    //   this.r++
    //   this.g++
    //   this.b--
    // }
    // if (r === 'sad') {
    //   this.totalReactionCount++;
    //   this.numSadReactions++;
    //   this.r--;
    //   this.g--
    //   this.b++
    //   //this.b--;
    // }
    // if (r === 'disgusted') {
    //   this.totalReactionCount++;
    //   this.numDisgustedReactions++;
    //   this.r++;
    //   this.g++;
    //   this.b--;
    // }
    // if (r === 'angry') {
    //   this.totalReactionCount++;
    //   this.numAngryReactions++;
    //   this.r++;
    //   this.g--;
    //   this.b--;
    // } else if (r === 'null') {

    // }
    
    
    for (var i = 0; i < this.reactionType.length; i++){
      this.percentTotalReactions[i] = (this.numReactions[i] / this.totalReactionCount) * 100;
      this.reactionRS[i] = map(this.percentTotalReactions[i], 0, 100, 0, this.maxReactionSize);
    }
    
    // this.percentTotalHeartReactions = (this.numHeartReactions / this.totalReactionCount) * 100;
    // this.percentTotalHappyReactions = (this.numHappyReactions / this.totalReactionCount) * 100;
    // this.percentTotalSurprisedReactions = (this.numSurprisedReactions / this.totalReactionCount) * 100;
    // this.percentTotalSadReactions = (this.numSadReactions / this.totalReactionCount) * 100;
    // this.percentTotalDisgustedReactions = (this.numDisgustedReactions / this.totalReactionCount) * 100;
    // this.percentTotalAngryReactions = (this.numAngryReactions / this.totalReactionCount) * 100;
    // this.hrs = map(this.percentTotalHeartReactions, 0, 100, 0, this.maxReactionSize);
    // this.hprs = map(this.percentTotalHappyReactions, 0, 100, 0, this.maxReactionSize);
    // this.surrs = map(this.percentTotalSurprisedReactions, 0, 100, 0, this.maxReactionSize);
    // this.sadrs = map(this.percentTotalSadReactions, 0, 100, 0, this.maxReactionSize);
    // this.drs = map(this.percentTotalDisgustedReactions, 0, 100, 0, this.maxReactionSize);
    // this.ars = map(this.percentTotalAngryReactions, 0, 100, 0, this.maxReactionSize);
    // console.log('angry r: ' + this.numAngryReactions + 'total reactions: ' + this.totalReactionCount);

  }




}