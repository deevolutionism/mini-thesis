function backbutton(display){
	$('#left-button').empty();
  	var backIcon = $('<img>', {
      class : "icon-left", 
      src : "images/back.png", 
      alt : "back", 
      title : "back icon"
    });

  backIcon.appendTo('#left-button');
}

function showUniverseUI(){
	$('#left-button').css('visibility', 'visible');
	$('#right-button').css('visibility', 'visible');
	$('#action-container').css('visibility', 'visible');
}

function createCommentButton(display){
	if(display == 'hidden'){
		//hide create comment button
		$('#create-comment-button').css('visibility','hidden');
	} else if(display == 'visible'){
		//show create comment button
		console.log('show create comment button!')
		$('#create-comment-button').css('visibility','visible');
	}
}

function createCommentUI(display){
	if(display == 'hidden'){
		$('#create-comment-container').css('visibility', 'hidden');
		$('#create-comment-container').css('height', '0');
	} else if(display == 'visible'){
		console.log('comment button set to visible!');
		$('#create-comment-container').css('visibility', 'visible');
		$('#create-comment-container').animate({height:'70vh'});
	}
}


function createPostButton(display){
	if(display == 'hidden'){
		$('#action-container').css('visibility', 'hidden');
	} else if (display == 'visible'){
		$('#action-container').css('visibility', 'visible');
	}
}

function updateComments(comment, id, username){
	//add the comment to the post object
	// universe.posts[id].comments.push(comment);
	console.log(username + 'replied to post# ' + id + 'with: ' + comment);
	socket.emit('pushNewComment', {'id':id,'comment':comment,'username':username});
	//clear the comments container
	$('#post-comments').html('');
}

socket.on('updateComments', function(data){
	//clear comments
	$('#post-comments').html('');
	//regenerate the comments li with new comment prepended
	console.log(data);
	var commentBlock = $('<li>',{class:'comment-block'});
	var profile = $('<img>',{class: 'icon-left',src:'images/anonymous-small.png',alt:'profile',title:'profile icon'});
	commentBlock.append(profile);
	commentBlock.append(comment);
	$('#post-comments').prepend(commentBlock);
	for(var i = 0; i < data.jsonobj.userposts[data.id].comments.length; i++){
		var commentBlock = $('<li>', {
				class: 'comment-block'
			});
		var profile = $('<img>',{
			class : "icon-left", 
 			src : "images/anonymous-small.png", 
  			alt : "profile", 
  			title : "profile icon"
		});
		var comment = $('<span />').html(data.jsonobj.userposts[data.id].comments[i].comment);
		console.log('comment: ' + comment);
		commentBlock.append(profile);
		commentBlock.append(comment);
		$('#post-comments').prepend(commentBlock);
	}
});

function searchbutton(){
	$('#right-button').empty();
	searchIcon = $('<img>', {
      class: "icon-right",
      src : "images/search-icon.png",
      alt : "search",
      title : "search icon"
    });

    searchIcon.appendTo('#right-button');
}

function profilebutton(){
	$('#left-button').empty();
  	var profileIcon = $('<img>', {
      class : "icon-left", 
      src : "images/profile.png", 
      alt : "profile", 
      title : "profile icon"
    });

  profileIcon.appendTo('#left-button');
}

function generatetitle(title){
	$('#title').text(title);
}

function previewPost(display,id,username){
	if(display == 'hidden'){
		$('#preview-post').css('visibility', 'hidden');
		previewing = false;
		previewPostID = id;
		
	} else if(display == 'visible'){
		previewing = true;
		socket.emit('requestPreviewPost', {id:id,user:username});
		console.log('reveal!');
		$('#preview-post').css('visibility', 'visible');
	}
}

socket.on('previewPost', function(data){
	if(data.user == username){
		$('#preview-post-text').html(data.text);
		$('#preview-post-author').html(data.OP);
		$('#preview-views-number').html(data.views);
		$('#preview-comments-number').html(data.comments);
	}
});

function postinputUI(display){
	if(display == 'hidden'){
		$('#post-container').css('visibility', 'hidden');
		$('#post-container').css('height', '0');
		postInputVisible = false;
	} else if (display == 'visible'){
		$('#post-container').css('visibility', 'visible');
  		$('#post-container').animate({height:'80vh'});
  		postInputVisible = true;
	}
}

function postcontentsUI(display, id, type, username){
	if(display == 'hidden'){
		$('#add-comment-button').css('visibility', 'hidden');
		$('#post-contents').css('visibility', 'hidden');
		$('#post-contents').css('height', '0');
		//empty all content
		$("#post-author").html('');
		$("#post-text").html('');
		$('#post-comments').html('');
	} else if (display == 'visible'){
		$('#add-comment-button').css('visibility', 'visible');
		//request post data
		socket.emit('requestPostContents', {id:id, user:username});
	}
}

socket.on('postContents', function(data){
	console.log('data: ' + data.user + ' username: ' + username);
	if(data.user == username){
		console.log('generate post contents');
		$('#post-author').html(data.OP);
		$('#post-text').html(data.text);
		//comments
		for(var i = 0; i < data.comments.length; i++){
			var commentBlock = $('<li>', {
					class: 'comment-block'
				});
			var profile = $('<img>',{
				class : "icon-left", 
	 			src : "images/anonymous-small.png", 
	  			alt : "profile", 
	  			title : "profile icon"
			});
			var comment = $('<span />').html(data.comments[i].comment);
			console.log('comment: ' + comment);
			commentBlock.append(profile);
			commentBlock.append(comment);
			$('#post-comments').prepend(commentBlock);
		}
		$('#post-contents').css('visibility', 'visible');
	  	$('#post-contents').animate({height:'85vh'});
  	}
});

function hideInterface(){
	createPostButton('visible');
	postinputUI('hidden');
	createCommentButton('hidden');
    profilebutton();
    generatetitle('SURGE');
    postcontentsUI('hidden');
    previewPost('hidden');
    postIsFocused = false;
    createPostButton('visible');
}

// OTHER STUFF //

// $(window).resize(function(){

// 	$('#preview-post').css({
// 		position:'absolute',
// 		left: ($(window).width() - $('#preview-post').outerWidth())/2,
// 		top: ($(window).height() - $('#preview-post').outerHeight())/2
// 	});

// });

// To initially run the function:
$(window).resize();


//content-editable span text placeholder
$('#input-area').on('activate', function() {
    $(this).empty();
    var range, sel;
    if ( (sel = document.selection) && document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(this);
        range.select();
    }
});

$('#input-area').focus(function() {
    if (this.hasChildNodes() && document.createRange && window.getSelection) {
        $(this).empty();
        var range, sel;
        range = document.createRange();
        range.selectNodeContents(this);
        sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
});

function replacepostinputtext(){
	$('#input-area').empty();
	$('#input-area').css('color', 'black');
}

function replacecommentinputtext(){
	$('#input-comment-area').empty();
	$('#input-comment-area').css('color', 'black');
}

function replacetext(area){
	if(area == 'input-area'){
		$('#input-area').empty();
		$('#input-area').css('color', 'black');
	} else if(area == 'comment-area'){
		$('#input-comment-area').empty();
		$('#input-comment-area').css('color', 'black');
	}
}






















