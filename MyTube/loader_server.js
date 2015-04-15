var express = require('express'), 
bodyParser = require('body-parser'), 
request = require('request-json'), 
mongoose = require('mongoose'),
//i18nPlugin = require('mongoose-i18n'),
app = express();

var client = request
		.createClient('https://www.googleapis.com/youtube/v3/playlistItems');

mongoose.connect('mongodb://localhost:27017/MovieDB');

var schema = new mongoose.Schema({ items: 'Object' });

//schema.plugin(i18nPlugin, {languages: ['en', 'te'], defaultLanguage: 'en'});

var Movie = mongoose.model('movielist',schema);


var pl = [ 'PLzTiNL8wJzyC5oN0EmViMQmd2YUYRq574','PLzTiNL8wJzyCFCSeQHPIUg1wbC0ggFx6E','PLzTiNL8wJzyD7HkP-_m6bm_E5q9SC20Qs','PLaEL1LTyEXg1n9fcF5ZE-3SwuwY7oIvRZ',
			'PLoBDkJXxnuE66Hi8GBRCF9KNBWNo_TlDW',
			'PLuPm_Z49ejrdOZuPuxDnkTfuFAlgFnb2Y','PLzTiNL8wJzyCHD9JHNqAAmDQT16oJmoAq','PLzTiNL8wJzyA2kUs7E_8NnfEK1zS9YHRR','PLSPuDpldWomv6mVNPTDl3zGlCAj8QTR68','PLSPuDpldWomscMEj8v_YIXDz1amhgKEJq' ];
	

app.use(bodyParser());

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/view/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));

app
		.get(
				'/api/players',
				function(req, res) {
					client
							.get(
									'?part=snippet&playlistId=PLSPuDpldWomscMEj8v_YIXDz1amhgKEJq&maxResults=50&fields=items(snippet(title,resourceId(videoId)))',
									{'auth': {'bearer': 'ya29.UgEXZfB251GKT9wjPoL-_rnxqc5OZ1bk0YoifC1Wus5ppNcq0n2hsnFjtQppQdiDLsf4IpVDv-p4wA'}},function(err, res1, body) {
										console.log(body);
										var movie = new Movie(body);
										movie.save(function(err,result){
											console.log(result);
										});
									});
				});

app.listen(3000, function() {
	console.log('Listening @ 3000 .....');
});