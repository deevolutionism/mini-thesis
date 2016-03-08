function Bubble(x, y, time, t, hash, ID) { //capitalize to distinguish as a class
  //class constructor
  this.xpos = x;
  this.ypos = y;
  this.ID = ID;
  this.hashTags = hash;
  this.lifetime = 100;
  this.postText = t;
  this.userComments = ['user1', 'user2', 'user3'];
  this.comments = ['this is a test comment blah blah this is just a test', 'this is another test comment by test user2. hello!', 'this is the third and final test comment. hooray!'];
  this.startTime = time;
  this.nextSecond = this.startTime + 1000;
  this.showMeny = false;
  this.desiredSeparation;
  this.scalar = 6;
  this.col = 150;
  this.s = 100;
  this.r = 255;
  this.g = 255;
  this.b = 255;
  this.maxReactionSize;
  this.d;
  
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

  


  //class method
  this.display = function() {
    // fill(255);
    // stroke(this.col);
    // strokeWeight(5);
    // ellipse(this.xpos, this.ypos, this.lifetime, this.lifetime);
    // textFont("monaco");
    // textSize(this.lifetime / 2);
    // //text(this.lifetime, this.xpos - 10, this.ypos + 10)

    // strokeWeight(2);
    // stroke(2);
    
    
    if (this.showMenu == true) {
      
      fill(255);
      stroke(this.col);
      strokeWeight(5);
      ellipse(this.xpos, this.ypos, 100, 100);
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
      rect(this.xpos, this.ypos, 60, 30);
      fill(150);
      noStroke();
      rectMode(CENTER);
      text(this.postText, this.xpos, this.ypos, 120,50);
      
    } else { //if the post is not selected:
      
      fill(255);
      var d = dist(this.xpos, this.ypos, mouseX, mouseY);
      if( d < this.lifetime/2){
        stroke(0)
      } else {
        stroke(this.col);
      }
      strokeWeight(5);
      ellipse(this.xpos, this.ypos, this.lifetime, this.lifetime);
      textFont("monaco");
      textSize(this.lifetime / 2);
      //text(this.lifetime, this.xpos - 10, this.ypos + 10)

      strokeWeight(2);
      stroke(2);
      
      
      textSize(this.lifetime/10)
      fill(150);
      noStroke();
      rectMode(CENTER);
      text(this.postText, this.xpos, this.ypos, 80,50);
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
      this.s = 100;
      // for(var i = 0; i < this.reactionType.length; i++){
      //   this.reactionSize[i] = (this.s / this.scalar) + this.reactionRS[i];
      // }
      
      for(var i = 0; i < this.reactionType.length; i++){
        this.reactionSize[i] = (15) + this.reactionRS[i];
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
    this.d = dist(this.xpos, this.ypos, mouseX, mouseY);//does mouse overlap with this post?
    console.log('mouse distance: ' + this.d + ' from post# ' + this.ID);
    //console.log("mouse intersect id: " + this.ID);
    if (this.d < this.lifetime / 2) {
      console.log('mouse intersecting with post# ' + this.ID );
      revealPostContents(this.ID);
      //call function to show comments and full post contents
      //console.log("from this post: " + this.ID);
      return true;
    } else if (this.d > this.s+20 && mouseX > 0){
      //console.log('nope');
      //console.log('mouse position: ' + mouseX);
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

  this.intersects = function() {
    var d = dist(this.posx, this.posy, mouseX, mouseY);
    if (d < this.lifetime / 2) { //do they intersect?
      this.col = 0;
      // console.log('hello');
    } else {
      this.col = 150;
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
    this.maxReactionSize = 100 / 2;
    //console.log('hello from update reactions')
    for (var i = 0; i < this.reactionType.length; i++){
      if(r == this.reactionType[i]){
        this.totalReactionCount++;
        this.numReactions[i]++;
        //console.log(this.reactionType[i] + ' has been updated to ' + this.numReactions[i]);
      }
    }
    
    for (var i = 0; i < this.reactionType.length; i++){
      this.percentTotalReactions[i] = (this.numReactions[i] / this.totalReactionCount) * 100;
      this.reactionRS[i] = map(this.percentTotalReactions[i], 0, 100, 0, this.maxReactionSize);
    }

  }


}