console.log('the bot works!');

var Twit = require('twit');
var config = require('./config');


var T = new Twit(config);

// T.get('search/tweets', {q: 'banana since: 2011-11-11', count: 100}, function(err, data, response){
// 	console.log(data);
// });

// function gotData(err, data, response) {
// 	var tweets = data.statuses;
// 	for (var i = 0; i < tweets.length; i++){
// 		console.log(tweets[i].text);
// 	}
// 	// console.log(data); <-- reveal all information
// }

// var params = {
// 	q: 'trump',
// 	count: 2
// }

// T.get('search/tweets', params, gotData);


// var tweet = {
// 	status: 'hello world! -- posted using twitter api 💻'
// }

// function tweeted(err, data, response){
// 	console.log('it worked yo');
// }

// T.post('statuses/update', tweet, tweeted){

// }


T.post('statuses/update', { status: 'hello world! -- posted using twitter api' }, function(err, data, response) {
  console.log(data)
})