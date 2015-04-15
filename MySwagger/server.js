var express = require('express'),
bodyParser = require('body-parser'),
app = express();

app.use(bodyParser());

app.get('/', function(req,res){
res.sendFile(__dirname + '/index.html');
});

app.use('/images',express.static(__dirname+'/images'));
app.use('/css',express.static(__dirname+'/css'));
app.use('/lib',express.static(__dirname+'/lib'));

app.get('/swagger-ui.js', function(req,res){
res.sendFile(__dirname + '/swagger-ui.js');
});

app.get('/myswagger', function(req,res){
res.sendFile(__dirname + '/myswagger_resp.txt');
});


app.listen(3000, function(){
console.log('Listening @ 3000 .....');
});