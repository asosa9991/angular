var express = require('express'),
bodyParser = require('body-parser'),
request = require('request-json'),
app = express();

var client = request.createClient('http://jsonplaceholder.typicode.com/');

app.use(bodyParser());

app.get('/', function(req,res){
res.sendFile(__dirname + '/client/view/index.html');
});

app.use('/js',express.static(__dirname+'/client/js'));

app.get('/api/players',function(req,res){
client.get('users/', function(err, res1, body) {
	console.log(body);
res.json(body);
});
});
 
app.listen(3000, function(){
console.log('Listening @ 3000 .....');
});