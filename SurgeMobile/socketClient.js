
socket.on('goToUniverse', function(msg){
  //navigate to the universe page
  console.log('logged in as: ' + msg);
  if(msg == username){
    //fade login page out
    $('#login-container').fadeOut();
    //release clicking restraint
    loggedin = true;
    //make ui elements visible
    showUniverseUI();
    //request previous posts from server
    //send username so the server only populates this client.
    socket.emit('populate', username);
  }
});

socket.on('populateWithData', function(data){

  if(data.data.userposts.length != undefined && firstTimeLoading == false && data.username == username){  

    for(var i = 0; i < data.data.userposts.length; i++){
      if(data.data.userposts[i].url){
        console.log('adding an article to the universe');
        universe.addPost(new Post(random(width), random(height),null, millis(), data.data.userposts[i].text, hashTagList, universe.posts.length,'article',data.data.userposts[i].OP));
      } else {
        console.log('adding a user post to the universe');
        universe.addPost(new Post(random(width), random(height),null, millis(), data.data.userposts[i].text, hashTagList, universe.posts.length,null,data.data.userposts[i].OP));
      }
    } 
    
    //prevent the client from adding new posts everytime another
    //client connects and sends out a population request.
    firstTimeLoading = true; 
  }
});

socket.on('updatePostViews', function(data){

});

socket.on('addUserPostToUniverse', function(data){
  //add post to universe
  console.log('added post to universe');
  universe.addPost(new Post(width/2, height/2,null, millis(), data.text, hashTagList, universe.posts.length,null,data.OP));
});