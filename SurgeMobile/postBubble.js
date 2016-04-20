// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Post class
// Methods for Separation, Cohesion, Alignment added

function Post(x,y,size,time,t,hash,ID,postType,article) {
  //class constructor
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-0.2,0.2),random(-0.2,0.2));
  this.position = createVector(x,y);
  this.r = 3.0;
  this.maxspeed = 5;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  //this.s = size;
  
  console.log(postType);
  // this.xpos = x;
  // this.ypos = y;
  this.postType = postType; //is this a user post or an article?
  this.ID = ID;
  this.hashTags = hash;
  this.lifetime = 500;
  this.postText = t;
  this.userComments = ['user1', 'user2', 'user3'];
  this.comments = ['this is a test comment blah blah this is just a test', 'this is another test comment by test user2. hello!', 'this is the third and final test comment. hooray!'];
  this.startTime = time;
  this.nextSecond = this.startTime + 1000;
  this.showMenu = false;
  this.desiredSeparation;
  this.scalar = 6;
  this.col = 150;
  this.s = 500;
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.maxReactionSize;
  this.d;
  this.focused = false;
  this.author = 'anonymous';
  this.views = 0;
  //article data
  this.a = article;


  
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
  
  
  // >>>
  //this chunk may not be needed. Attempt to remove.
  // this.totalReactionCount = 0; //for calculating percentages
  // this.heartPosx, this.heartPosy, this.heartSize, this.heartC = 150, this.numHeartReactions = 0, this.hrs = 0;
  // this.happyPosx, this.happyPosy, this.happySize, this.happyC = 150, this.numHappyReactions = 0, this.hprs = 0;
  // this.surprisedPosx, this.surprisedPosy, this.surprisedSize, this.surprisedC = 150, this.numSurprisedReactions = 0, this.surrs = 0;
  // this.sadPosx, this.sadPosy, this.sadSize, this.sadC = 150, this.numSadReactions = 0, this.sadrs = 0;
  // this.disgustedPosx, this.disgustedPosy, this.disgustedSize, this.disgustedC = 150, this.numDisgustedReactions = 0, this.drs = 0;
  // this.angryPosx, this.angryPosy, this.angrySize, this.angryC = 150, this.numAngryReactions = 0, this.ars = 0;
  // <<<




  this.run = function(posts,xo,yo) {
    this.flock(posts);
    this.update(xo,yo);
    this.borders();
    this.render(xo,yo);
    this.intersects();
    this.addReaction();
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

// We accumulate a new acceleration each time based on three rules
  this.flock = function(posts) {
    var sep = this.separate(posts);   // Separation
    var ali = this.align(posts);      // Alignment
    var coh = this.cohesion(posts);   // Cohesion
    // Arbitrarily weight these forces
    sep.mult(5);
    ali.mult(0.2);
    coh.mult(0.2);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

// Method to update location
  this.update = function(x,y) {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
    
    
    if (millis() >= this.nextSecond) {
      this.lifetime--
      this.s = this.lifetime;
      this.desiredSeparation = this.lifetime * 2;
      this.nextSecond = millis() + 1000;
    }
    
    if (this.showMenu == true) {
      this.s = 100;
      // for(var i = 0; i < this.reactionType.length; i++){
      //   this.reactionSize[i] = (this.s / this.scalar) + this.reactionRS[i];
      // }
      
      for(var i = 0; i < this.reactionType.length; i++){
        this.reactionSize[i] = (15) + this.reactionRS[i];
      }
      
      //heart
      this.reactionPosx[0] = this.position.x - this.s / 2;
      this.reactionPosy[0] = this.position.y - this.s;
      //happy;
      this.reactionPosx[1] = this.position.x + this.s / 2;
      this.reactionPosy[1] = this.position.y + this.s;
      //suprised;
      this.reactionPosx[2] = this.position.x - this.s / 2;
      this.reactionPosy[2] = this.position.y + this.s;
      //sad;
      this.reactionPosx[3] = this.position.x + this.s / 2;
      this.reactionPosy[3] = this.position.y - this.s;
      //disgusted;
      this.reactionPosx[4] = this.position.x + this.s;
      this.reactionPosy[4] = this.position.y;
      //angry;
      this.reactionPosx[5] = this.position.x - this.s;
      this.reactionPosy[5] = this.position.y;
    }
  }
  
  //check to see if the mouse is intersecting with the post
  this.mouseIntersectsWithPost = function() {
    //if mouse was clicked and the mouse x and y coordinates
    //intersect with this post, then return true.
    this.d = dist(this.position.x - xoffset, this.position.y - yoffset, mouseX, mouseY);//does mouse overlap with this post?
    // console.log('mouse distance: ' + this.d + ' from post# ' + this.ID);
    //console.log("mouse intersect id: " + this.ID);
    if (this.d < this.lifetime / 2) {
      // console.log('mouse intersecting with post# ' + this.ID );
      revealPostContents(this.ID);
      //call function to show comments and full post contents
      // console.log("from this post: " + this.ID);
      return true;
    } else if (this.d > this.s+20 && mouseX > 0){
      // console.log('nope');
      return false;
    }
  }
  
  //checks to see if the mouse is intersecting with one of the options 
  this.mouseIntersectsWithReactions = function(){
    for(var i = 0; i < this.reactionType.length; i++){
      var d = dist(this.reactionPosx[i], this.reactionPosy[i], mouseX, mouseY)
      if(d < this.reactionSize[i] / 2){
        this.updateReactions(this.reactionType[i]);
        console.log(this.reactionType[i]);
        return this.reactionType[i]; // tell the mouse which one it clicked on
      }
    }
  }
  
  //change color of post to indicate the mouse is hovering over and an action can be made on it.
  this.intersects = function() {
    var d = dist(this.position.x - xoffset, this.position.y - yoffset, mouseX, mouseY);
    if (d < this.lifetime / 2) { //do they intersect?
      this.col = 0;
    } else {
      this.col = 150;
    }
  }
  
  //highlight the reaction to indicate it can be clicked on.
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
  
  //when the mouse is clicked on a reaction, update its relative size
  this.updateReactions = function(reaction) {
    var r = reaction;
    this.maxReactionSize = 100 / 2;
    for (var i = 0; i < this.reactionType.length; i++){
      if(r == this.reactionType[i]){
        this.totalReactionCount++;
        this.numReactions[i]++;
      }
    }
  }

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {
    var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired,this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }

  this.render = function(x,y) {
    if (this.showMenu == true) {
      
      fill(255);
      stroke(this.col);
      strokeWeight(5);
      ellipse(this.position.x - xoffset, this.position.y - yoffset, 100, 100);
      textFont("monaco");
      textSize(50);
      //text(this.lifetime, this.xpos - 10, this.ypos + 10)
  
      strokeWeight(2);
      stroke(2);
      
      fill(255);
      for (var i = 0; i < this.reactionType.length; i++){
        this.reactionScale[i] = map(this.reactionSize[i],0,100 / this.scalar,0,100);
        stroke(this.reactionColor[i]);
        ellipse(this.reactionPosx[i], this.reactionPosy[i], this.reactionSize[i], this.reactionSize[i]);
        //textSize(int(this.rectionScale[i]));
        textSize(int(this.reactionSize[i]));
        rectMode(RADIUS);
        textAlign(CENTER);
        text(emotions[i], this.reactionPosx[i], this.reactionPosy[i] + this.reactionSize[i]/2.5);
        //image(images[i], 0,0,100,100, this.reactionPosx[i] - (this.reactionScale[i] / 16), this.reactionPosy[i] - (this.reactionScale[i] / 16), this.reactionScale[i] / 8, this.reactionScale[i] / 8);
      }
      
      fill(255);
      textSize(12);
      rectMode(RADIUS);
      rect(this.position.x - xoffset, this.position.y - yoffset, 200, 100);
      fill(150);
      noStroke();
      rectMode(CENTER);
      textAlign(CENTER);
      text(this.postText, this.position.x - xoffset, this.position.y - yoffset, 120,50);
      
    } else { //if the post is not selected:
      
      fill(255);
      var d = dist(this.position.x - xoffset, this.position.y - yoffset, mouseX, mouseY);
      if( d < this.lifetime/2){
        stroke(0)
      } else {
        stroke(this.col);
      }
      strokeWeight(5);
      ellipse(this.position.x - xoffset, this.position.y - yoffset, this.lifetime, this.lifetime);
      textFont("monaco");
      textSize(this.lifetime / 2);
      //text(this.lifetime, this.xpos - 10, this.ypos + 10)

      strokeWeight(2);
      stroke(2);
      
      
      textSize(this.lifetime/10)
      fill(150);
      noStroke();
      rectMode(CENTER);
      text(this.postText, this.position.x - xoffset, this.position.y - yoffset, 300,300);
    }
  
    //ellipse(this.position.x, this.position.y, this.s, this.s);
  }

// Wraparound
  this.borders = function() {
    if (this.position.x - xoffset < -this.s)  this.position.x = width +this.s;
    if (this.position.y - yoffset < -this.s)  this.position.y = height+this.s;
    if (this.position.x - xoffset > width +this.s) this.position.x = -this.s;
    if (this.position.y - yoffset > height+this.s) this.position.y = -this.s;
  }

// Separation
// Method checks for nearby boids and steers away
  this.separate = function(posts) {
    this.desiredSeparation = this.s + 100;
    var steer = createVector(0,0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < posts.length; i++) {
      var d = p5.Vector.dist(this.position,posts[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < this.desiredSeparation)) {
        this.maxspeed = 0.5; //give it speed to move it away
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.position,posts[i].position);
        diff.normalize();
        diff.div(d);        // Weight by distance
        steer.add(diff);
        count++;            // Keep track of how many
      } else {
        this.maxspeed -= 0.001; //slow it down over time
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }
  
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

// Alignment
// For every nearby boid in the system, calculate the average velocity
  this.align = function(posts) {
    var neighbordist = 50;
    var sum = createVector(0,0);
    var count = 0;
    for (var i = 0; i < posts.length; i++) {
      var d = p5.Vector.dist(this.position,posts[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(posts[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum,this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0,0);
    }
  }

  // Cohesion
  // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
  this.cohesion = function(posts) {
    var neighbordist = 50;
    var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < posts.length; i++) {
      var d = p5.Vector.dist(this.position,posts[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(posts[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum);  // Steer towards the location
    } else {
      return createVector(0,0);
    }
  }
  
  
  this.dead = function() {
    if (this.lifetime < 0) {
      return true;
    } else {
      return false;
    }
  }

}