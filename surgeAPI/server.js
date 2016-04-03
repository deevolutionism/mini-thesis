var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var express = require("express");
var app = express();//create instance of express
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);//socket io listen on port

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


var nyt_key = {
	id : '6a28ebb558fde10851695af03590a246:2:74827428'
}


app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

//socket.io stuff
io.sockets.on('connection', function (socket) {//open io connection
		console.log('socket connection established');
});	