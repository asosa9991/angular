var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
app = express();

mongoose.connect('mongodb://localhost:27017/playersDB');

var Player = mongoose.model('Player',{
name: String
});

app.use(bodyParser());

app.get('/', function(req,res){
res.sendFile(__dirname + '/client/view/index.html');
});

app.use('/js',express.static(__dirname+'/client/js'));

app.post('/api/players',function(req,res){
var player = new Player(req.body);
player.save(function(err,result){
res.json(result);
});
});

app.get('/api/players',function(req,res){
Player.find({}, function(err,results){
res.json(results);
});
});

app.listen(3000, function(){
console.log('Listening @ 3000 .....');
});