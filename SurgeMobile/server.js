var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request');
var express = require("express");
var app = express();//create instance of express
var port = 8000;
var url='localhost'
var server = app.listen(port);
var io = require("socket.io").listen(server);//socket io listen on port
var nyt_key = {
	id : '6a28ebb558fde10851695af03590a246:2:74827428'
}

app.use(bodyParser.urlencoded({
    extended: false
}));

//parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log('incoming request from ---> ' + ip);
    // Show the target URL that the user just hit
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);
    next();
});

//statically host "/public" folder i.e. index.html will be hosted
//at the '/' = ROOT of our webserverHost. = http://localhost:PORT/
app.use(express.static(__dirname + '/'));//serve diectory this file is in
console.log('Simple static server listening at '+url+':'+port);

var PATH_TO_JSON = 'data';
var JSON_FILE_NAME = 'User_Accounts';

/* S E R V E R	R O U T E S */



/* S O C K E T */

io.sockets.on('connection', function (socket) {//open io connection
		console.log('socket connection established');
});	