
/*
 * @name Flocking
 * @description Demonstration of Craig Reynolds' "Flocking" behavior.
 * See: http://www.red3d.com/cwr/
 * Rules: Cohesion, Separation, Alignment
 * (from <a href="http://natureofcode.com">natureofcode.com</a>).
 *  Drag mouse to add boids into the system.
 */


var universe;

var articles;

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
var x,y,px,py;
var panx = 0;
var pany = 0;
var last = [0,0];
var startCoords = [];
var panning = false;
var ctx;
var c;
var mouse={x:0,y:0};

var xoffset = 0;
var yoffset = 0;

var originalPostCoords = [];
var postIsFocused = false;
var focusedPostID;
var postInputVisible = false;

var previewPostTime = 0;
var previewing = false;
var postID;


function preload(){
  articles = loadJSON('data.json');
}


function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
  // canvas.addClass('canvas');


  universe = new Universe();
  xo = 0;
  yo = 0;
  px=0;
  py=0;
  rx=0;
  ry=0;
  xoff=0;
  yoff=0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  //clear();
  canvas.position(0,0);
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
  fill(0);
  panx = startCoords[0];
  pany = startCoords[1];
  xoffset = x - panx;
  yoffset = y - pany;
}

window.onload = function(){
  var createPostBtn = document.getElementById('action-container');
  var viewPostContents = document.getElementById('preview-post')
  var searchbtn = document.getElementById('search-button');
  var rightbtn = document.getElementById('right-button');
  var leftbtn = document.getElementById('left-button');
  var createCommentBtn = document.getElementById('create-comment-button');
  var leftIcon, rightIcon;
  var postComment = document.getElementById('post-comment-button');


  createPostBtn.onclick = function(){
    console.log('post UI');
    //clear all elements
    $('#left-button').empty();
    $('#right-button').empty();
    
    //change the title
    generatetitle('POST');

    //replace left icon with back button
    backbutton();

    //replace right icon with search button
    searchbutton();

    //show post ui
    postinputUI('visible');

    //hide create post button
    createPostButton('hidden');
  };

  //attach event listener to backbutton
  leftbtn.onclick = function(){
    var leftButtonAttribute = $('.icon-left').attr('alt');
    var title = $('#title').text();
    if(leftButtonAttribute == "profile"){
      //do nothing
    } else if (leftButtonAttribute == "back"){
      //generate home page

      if( title == 'COMMENT' ){
        createCommentButton('visible');
        createCommentUI('hidden');
        generatetitle('CONTENTS');
      } else {
        hideInterface();
      }
    }
  }

  createCommentBtn.onclick = function(){
    //show the create comment interface
    console.log('create comment');
    createCommentUI('visible');
    //hide the create comment button
    createCommentButton('hidden');
    generatetitle('COMMENT')
  }

  postComment.onclick = function(){
    //show comment input container
    createCommentUI('hidden');
    postNewComment();
    //show create comment button
  }
  



  viewPostContents.onclick = function(){
    if(millis() > previewPostTime + 1000){
      //hide preview window
      previewPost('hidden');
      //change title
      generatetitle('CONTENTS');
      //show post contents window
      postcontentsUI('visible', postID, 'userpost');
      //show add comment button
      createCommentButton('visible');
    }
  }

}




function translate(){
  //ctx.translate(xoff,yoff);
}

function mousePressed(){
  //add a post 
  console.log('mouse clicked');
  
  if(postIsFocused == false){
    check();//what has the mouse been pressed on?
  }
  startCoords = [ //store beginning mouse coordinates
        mouseX - last[0],
        mouseY - last[1]
   ];
  x = mouseX;
  y = mouseY;
}

function mouseReleased(){
  last = [ //store last mouse coordinates
    mouseX - startCoords[0],
    mouseY - startCoords[1]
  ]
}

function mouseDragged(){
  if(mouseX >= 0){ //is the mouse being dragged inside the canvas?
    x = mouseX;
    y = mouseY;
  }
}

function check() { //check to see if a post was clicked on
  
  for (var i = 0; i < universe.posts.length; i++) {
      
        
    if (universe.posts[i].mouseIntersectsWithPost() == true) { //is the mouse intersecting with the post?
      
      //focus post to center of screen
      console.log('post # ' + i + ' was clicked on');
      
      //preview the post when clicked on
      previewPost('visible',i);

      //increment # of views
      universe.posts[i].views++;

      //change title to preview
      generatetitle('preview');

      //hide post button
      createPostButton('hidden');

      //set timer so click doesnt automatically
      //register the post contents view
      previewPostTime = millis();

      //capture the posts id number
      postID = i;

      //the post is focused, so don't let the
      //mouse register on any other post objects.
      postIsFocused = true;
    

    } else if (universe.posts[i].mouseIntersectsWithPost() == false) { //mouse is not intersecting
      
      
    }
    
    
    if(universe.posts[i].mouseIntersectsWithReactions() == universe.posts[i].reactionType[i]){
      universe.posts[i].updateType[i] = true;
    } else {
      
    }
    //profilebutton();
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

// function focusPost(id){
//   //move the post to the center and expand it
//   //store original coordinates
//   originalPostCoords = [universe.posts[id].position.x - xoffset, universe.posts[id].position.y - yoffset];
//   universe.posts[id].position.x = width/2 + xoffset;
//   universe.posts[id].position.y = height/2 + yoffset
//   console.log('post #' + id + ' is forcused');
//   postIsFocused = true;
// }

// function unfocusPost(id){
//   universe.posts[id].position.x = originalPostCoords[0];
//   universe.posts[id].position.y = originalPostCoords[1];
//   postIsFocused = false;
// }

function postText() {
  //grab the text and the hashtags entered into the inputs
  //place them in temporary variable to later be injected into
  //a bubble post object
  postTextInput = document.getElementById('input-area').innerHTML;
  pt = postTextInput;
  console.log(pt);
  document.getElementById('input-area').innerHTML = 'what are you thinking about?';
  postinputUI('hidden');
  createPostButton('visible');
  $('#input-area').css('color', 'lightgrey');
  profilebutton();
  generatetitle('SURGE');
  universe.addPost(new Post(width/2, height/2,null, millis(), pt, hashTagList, universe.posts.length,'userpost',null));
  pt = ''; 
  id++;
}

function postNewComment(){
  postCommentInput = document.getElementById('input-comment-area').innerHTML;
  var commentText = postCommentInput;
  console.log(commentText);
  updateComments(commentText, postID);
  $('input-comment-area').css('color', 'lightgrey');
  createCommentButton('visible');
  generatetitle('CONTENTS');
}

function addHashTag() {

  hashTagInput = document.getElementById('ht').value;
  hashTagList.push(hashTagInput);
  //creat a new element which includes the hashtag just entered

  var element = document.getElementById('tags');
  var p = document.createElement('p'); //create p element
  var tag = document.createTextNode(hashTagList[numTags]); //create text
  p.appendChild(tag); //put the text inside the p element
  element.appendChild(p); //add the p element to a container
  //var hashTagI = document.createTextNode(hashTagList[i]);
  //tagContainer.appendChild(tag);


  document.getElementById('ht').value = '';
  numTags++;
}

function queryNYT(){
  var query = document.getElementById("search").value;
  console.log(query);
  var path = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
  var key = "&api-key=6a28ebb558fde10851695af03590a246%3A2%3A74827428";
  var url = path + query + key;
  nyt = loadJSON(url, getData);
  document.getElementById('search').value = '';
}

function getData(data){
  console.log(data);
  populateWithNYT(data);
}


function revealPostContents(id){
  //show post content as well as comments and related tags
  //console.log(universe.posts[id].a.article);

  //focus the bubble to center of screen and increase the size for readability
 
  //generate back button
  backbutton();
  currentPostID = id;
}

function revealArticleContents(id){

}

function revealArticleContents(id){
   //show article url
    var articleNode = document.getElementById('article-title');
    var link = document.createElement('a');
    var linkText = document.createTextNode(universe.posts[id].a.web_url);
  link.appendChild(linkText);
  link.title = universe.posts[id].a.headline.main;
  link.href = universe.posts[id].a.web_url;
  link.target = '_blank';
  articleNode.appendChild(link);
  //show article contents
  //split article into paraphs
  var txt = universe.posts[id].a.lead_paragraph;
  //var txtarr = splitTokens(txt,'#');
  // for (var i = 0; i < txtarr.length; i++){
    var n = document.getElementById('article-contents');
    var p = document.createElement('p');
    var t = document.createTextNode(txt);
    p.appendChild(t);
    n.appendChild(p);
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


function populateWithNYT(data) {
  //console.log(articles.articles[1].article);
  //populate with some initial articles
  for (var i = 0; i < data.response.docs.length; i++){
    //console.log(articles.articles[i].article);
    universe.addPost(new Post(windowWidth/2, windowHeight/2, null, millis(), data.response.docs[i].headline.main, hashTagList, id,'article',data.response.docs[i]));
  }
}


























