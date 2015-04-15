var express = require('express'), bodyParser = require('body-parser'), mongoose = require('mongoose'), app = express();

mongoose.connect('mongodb://localhost:27017/MovieDB');

var schema = new mongoose.Schema({
	items : 'Object'
});

var Movie = mongoose.model('movielist', schema);

app.use(bodyParser());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/view/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));

app.get('/api/players', function(req, res) {
	Movie.find({}, function(err, results) {
		console.log(results);
		res.json(results);
	});
});

app.listen(3000, function() {
	console.log('Listening @ 3000 .....');
});