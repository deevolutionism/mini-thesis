
/*
 * @name Flocking
 * @description Demonstration of Craig Reynolds' "Flocking" behavior.
 * See: http://www.red3d.com/cwr/
 * Rules: Cohesion, Separation, Alignment
 * (from <a href="http://natureofcode.com">natureofcode.com</a>).
 *  Drag mouse to add boids into the system.
 */


var universe;

var text;

var posts = [];
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

function setup() {
  canvas = createCanvas(windowWidth/1.5,windowHeight);
  universe = new Universe();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  canvas.position(windowWidth/3,0);
  background(230);
  universe.run();
  
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

function mousePressed(){
  if(postButtonPressed == true){
    universe.addPost(new Post(mouseX, mouseY,null, millis(), pt, hashTagList, id));
    postButtonPressed = false;
    pt = '';
    id++;
  } 
  check();
}

function check() {
  console.log(postButtonPressed);
  for (var i = 0; i < universe.posts.length; i++) {
    
        
    if (universe.posts[i].mouseIntersectsWithPost()) { //is the mouse intersecting with the post?
      universe.posts[i].showMenu = true; //show the menu around the post
      //revealPostContents(bubbles[i].ID); //populate the window with this post's contents
      // console.log('show menu!!!');
      
    } else if (universe.posts[i].mouseIntersectsWithPost() == false) {
      universe.posts[i].showMenu = false; //hide the menu
      //if the mouse was pressed outside the boundaries of any of the current posts, then hide the post contents
    }
    
    
    if(universe.posts[i].mouseIntersectsWithReactions() == universe.posts[i].reactionType[i]){
      universe.posts[i].updateType[i] = true;
    } else {
      
    }
    
    //evaluate all other bubbles to see if any of them are currently pressed. if none are pressed, then hide the postcontents window
    // if(universe.posts[i].showMenu == true){
    //   showPostContents = true; //one of the posts has been clicked on, dont hide contents
    // } else if (universe.posts[i].showMenu == false && showPostContents == false){
    //   hidePostContents();
    // } else {
    //   showPostContents = false; //none of the posts are selected, hide all contents
    // }

  }
}

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
  document.getElementById('post-text').innerHTML = universe.posts[id].postText;
  document.getElementById('op').innerHTML = id;
  console.log('revealPostContents from post# ' + id);
  
  $('#comment-section').empty();//clear all previous content
  
  for (var i = 0; i<universe.posts[id].userComments.length; i++){
    //populate with with the current post
    var myNode = document.getElementById('comment-section');
    var p = document.createElement('p')
    var comment = document.createTextNode(universe.posts[id].userComments[i] + " says: " + universe.posts[id].comments[i]);
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
  universe.posts[currentPostID].comments.push(newComment); //add the comment to the post data
  universe.posts[currentPostID].userComments.push('Gentry Demchak');
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
  for (i = 0; i<universe.posts.length; i++){
    universe.posts[i].showMenu = false; 
  }
}

