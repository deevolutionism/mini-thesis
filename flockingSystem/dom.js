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