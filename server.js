var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var api = require('./routes/api');
var config = require('./config');

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
server.use(function (req, res, next) {
  console.log(req.body) // populated!
  next()
});

//var port = process.env.PORT || 8934;
server.set('port', process.env.PORT ||  8934);
//Routing
server.get('/', function(req, res) {

	res.render('home.ejs');

});

server.get('/secret', function(req, res) {

	res.render('secret.ejs');
})

//More Setup
server.use(express.static(__dirname + '/static'));

server.listen(server.get('port'));
//console.log('loffo running on port ' + port);

server.get('/getInfo',  api.getInfo);
server.post('/buyInfo',  api.buyInfo);
server.get('/readData', api.readData);

//http.createServer(server).listen(server.get('port'),'0.0.0.0', function() {
//    console.log("Express server listening on port " + server.get('port'));
//});