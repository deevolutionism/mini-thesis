var bubbles = [];
var images = [];
var postP, postI, postB, pt;
var hashTagP, hashTagI, hashTagB, hashTagBP, numTags;
var func = 0;
var postTextInput, hashTagList = [];
var postButtonPressed = false;
var reactionType = null;
var emotions = ["💚","😊", "😮", "😢","😬", "😡"];
var id = 0;
var canvas;
var showPostContents;
var currentPostID = null;

function preload() {
  images[0] = loadImage("images/love.png");
  images[1] = loadImage("images/happy.png");
  images[2] = loadImage("images/surprised.png");
  images[3] = loadImage("images/sad.png");
  images[4] = loadImage("images/disgusted.png");
  images[5] = loadImage("images/angry.png");
}



function setup() {
  canvas = createCanvas(windowWidth/1.5, windowHeight);
  
  // for (var i = 0; i < 1; i++){
  //   bubbles[i] = new Bubble(width/2, height/2); //make 100 bubbles
  // }
  numTags = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//increase relative size

function postText() {
  //grab the text and the hashtags entered into the inputs
  //place them in temporary variable to later be injected into
  //a bubble post object
  postTextInput = document.getElementById('pt').innerHTML;
  pt = postTextInput;
  console.log(pt);
  document.getElementById('pt').innerHTML = '';
  document.getElementById('ht').value = '';
  postButtonPressed = true; //allow user to post a comment somewhere
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


function revealPostContents(id){
  //show post content as well as comments and related tags
  currentPostID = id;
  document.getElementById("post-container").style.display = "none";
  document.getElementById("post-contents").style.display = "initial";
  document.getElementById('post-text').innerHTML = bubbles[id].postText;
  document.getElementById('op').innerHTML = id;
  console.log('revealPostContents from post# ' + id);
  
  $('#comment-section').empty();//clear all previous content
  
  for (var i = 0; i<bubbles[id].userComments.length; i++){
    //populate with with the current post
    var myNode = document.getElementById('comment-section');
    var p = document.createElement('p')
    var comment = document.createTextNode(bubbles[id].userComments[i] + " says: " + bubbles[id].comments[i]);
    p.appendChild(comment);
    p.setAttribute('id', 'comment');
    myNode.appendChild(p);
  }
}


function createComment(){
  //create textarea with button to add the new comment
  document.getElementById("ct").style.display = "initial";
  
}

function addComment(){
  var newComment = document.getElementById('ct').innerHTML; //grab text value
  document.getElementById('ct').innerHTML = ''; //clear the text field
  bubbles[currentPostID].comments.push(newComment); //add the comment to the post data
  bubbles[currentPostID].userComments.push('Gentry Demchak');
  var myNode = document.getElementById('comment-section');
  var p = document.createElement('p');
  var comment = document.createTextNode('Gentry Demchak says: '+newComment);
  p.appendChild(comment);
  p.setAttribute('id', 'comment');
  myNode.appendChild(p);
  console.log('add comment');
}

function hidePostContents(){
  console.log('hiding post contents!');
  document.getElementById('post-contents').style.display = "none";
  document.getElementById('post-container').style.display = "initial";
}

function draw() {
  clear();
  canvas.position(windowWidth/3,0);
  background(230);

  for (var i = 0; i < bubbles.length; i++) { //loop through all instantiations
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].intersects();
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
    stroke(1);
    ellipse(mouseX, mouseY, 100, 100);
    noStroke();
    textAlign(CENTER);
    textSize(24);
    fill(150);
    text("place your post somewhere on screen", width/2, height/2);
  }

}

function mousePressed() {
  if (postButtonPressed == true) {
    var b = new Bubble(mouseX, mouseY, millis(), pt, hashTagList, id);
    bubbles.push(b);
    postButtonPressed = false; //hide the target bubble
    pt = '';
    // console.log(id);
    id++;
  }
  check();//is mouse intersecting with post bubble when pressed?
  //if so, then show menu around the post and populate window with the post's contents
}

function check() {
  for (var i = 0; i < bubbles.length; i++) {
    
        
    if (bubbles[i].mouseIntersectsWithPost()) { //is the mouse intersecting with the post?
      bubbles[i].showMenu = true; //show the menu around the post
      //revealPostContents(bubbles[i].ID); //populate the window with this post's contents
      // console.log('show menu!!!');
      
    } else if (bubbles[i].mouseIntersectsWithPost() == false) {
      bubbles[i].showMenu = false; //hide the menu
      console.log(showPostContents);
      // console.log('post # ' + bubbles[i].ID + ' hide menu');
      //if the mouse was pressed outside the boundaries of any of the current posts, then hide the post contents
    }
    
    
    if(bubbles[i].mouseIntersectsWithReactions() == bubbles[i].reactionType[i]){
      bubbles[i].updateType[i] = true;
    } else {
      
    }
    
    //evaluate all other bubbles to see if any of them are currently pressed. if none are pressed, then hide the postcontents window
    if(bubbles[i].showMenu == true){
      showPostContents = true; //one of the posts has been clicked on, dont hide contents
    } else if (bubbles[i].showMenu == false && showPostContents == false){
      hidePostContents();
    } else {
      showPostContents = false; //none of the posts are selected, hide all contents
    }
    
    
    
  }
}



