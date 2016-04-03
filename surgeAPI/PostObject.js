function Universe() {
  this.posts = [];
  
  this.run = function(){
    for (var i = 0; i < this.posts.length; i++) {
      this.posts[i].run(this.posts,xo,yo);
      if (this.posts[i].dead()) {
        this.posts.splice(i, 1);
      }
    }
  }
  
  this.addPost = function(b){
    this.posts.push(b);
    id++;
  }
  
}