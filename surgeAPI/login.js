var app = {};

app.init = function(){
	console.log('Initializing Application!');
}

var hashRouter = function() {
	$(window).off('hashchange').on('hashchange', function(){
		console.log('current hash is ' + location.hash );
		//two pages - login & universe
		if(location.hash == '#tasks'){
			renderTasks();
		} else if(location.hash == '#create'){
			renderCreate();
		}
		attachEvents();
	});
}

/* E V E N T S */

//a function for all user interaction event listeners
var attachEvents = function(){
	console.log('attached events');

	$('#btnAdd').off('click').on('click', function(){
		//when the create button is pressed we want to go to create page
		location.hash = '#create';
	});
	//submit button
	//will send a POST request to the Server through the route made
	//for creating tasks
	$('#btnSubmit').off('click').on('click', function(){
		//when someone creates a task and hits Submit, send this to
		//the Server. This will go through the '/task' route and will
		//send a POST method. First assign input values to variables.
		var title = $('#iptTaskTitle').val();
		var description = $('#iptTaskDescription').val(); //do i need this?

		$.post('/task', {
			//what to post / send to the server as a request
			task : title,
			task_description : description
		}, function(res){
			//response from the server will be res
			console.log(res);
			location.hash = "#tasks"
		});
	});

	
}