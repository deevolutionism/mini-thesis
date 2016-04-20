function backbutton(){
	$('#left-button').empty();
  	var backIcon = $('<img>', {
      class : "icon-left", 
      src : "images/back.png", 
      alt : "back", 
      title : "back icon"
    });

  backIcon.appendTo('#left-button');
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
		$('#create-comment-container').animate({height:'80vh'});
	}
}


function createPostButton(display){
	if(display == 'hidden'){
		$('#action-container').css('visibility', 'hidden');
	} else if (display == 'visible'){
		$('#action-container').css('visibility', 'visible');
	}
}

function updateComments(comment, id){
	//add the comment to the post object
	universe.posts[id].comments.push(comment);
	//clear the comments container
	$('#post-comments').html('');
	//regenerate the comments li with new comment
	for(var i = 0; i < universe.posts[id].comments.length; i++){
		var commentBlock = $('<li>', {
				class: 'comment-block'
			});
		var profile = $('<img>',{
			class : "icon-left", 
 			src : "images/anonymous-small.png", 
  			alt : "profile", 
  			title : "profile icon"
		});
		var comment = $('<span />').html(universe.posts[id].comments[i]);
		console.log('comment: ' + universe.posts[id].comments[i]);
		commentBlock.append(profile);
		commentBlock.append(comment);
		$('#post-comments').prepend(commentBlock);
	}

}

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

function previewPost(display,id){
	if(display == 'hidden'){
		$('#preview-post').css('visibility', 'hidden');
		previewing = false;
		previewPostID = id;
		
	} else if(display == 'visible'){
		previewing = true;
		console.log('reveal!');
		$('#preview-post').css('visibility', 'visible');
		$('#preview-post-text').html(universe.posts[id].postText);
		$('#preview-post-author').html(universe.posts[id].author + ' # ' + universe.posts[id].ID );
		$('#preview-views-number').html(universe.posts[id].views);
		$('#preview-comments-number').html(universe.posts[id].comments.length);
	}
}

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

function postcontentsUI(display, id, type){
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
		$("#post-author").html("post #: " + id);
		$("#post-text").html(universe.posts[id].postText);
		for(var i = 0; i < universe.posts[id].comments.length; i++){
			var commentBlock = $('<li>', {
    				class: 'comment-block'
    			});
			var profile = $('<img>',{
				class : "icon-left", 
     			src : "images/anonymous-small.png", 
      			alt : "profile", 
      			title : "profile icon"
			});
			var comment = $('<span />').html(universe.posts[id].comments[i]);
			commentBlock.append(profile);
			commentBlock.append(comment);
			$('#post-comments').prepend(commentBlock);
		}
		$('#post-contents').css('visibility', 'visible');
  		$('#post-contents').animate({height:'85vh'});

	}
}

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

$(window).resize(function(){

	$('#preview-post').css({
		position:'absolute',
		left: ($(window).width() - $('#preview-post').outerWidth())/2,
		top: ($(window).height() - $('#preview-post').outerHeight())/2
	});

});

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






















