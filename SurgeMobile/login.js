var socket = io();
window.onload = function(){
	var login = document.getElementById('loginSubmit');
	login.onclick = function(){
		username = $('#login-username').val();
		console.log('user entered username: ' + username);
		createUserName(username);

	}
}

function createUserName(name){
	//add new username to json array via socket
	console.log('sending username: ' +  name);
	socket.emit('addnewuser', name);
}

socket.on('goToUniverse', function(msg){
	//navigate to the universe page
	console.log('logged in as: ' + msg);
	//fade login page out
	$('login-container').fadeOut();
	//make ui elements visible
	
});