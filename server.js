var express = require('express'),
    bodyParser = require('body-parser'),
    port = 8080,
    app = express();

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(bodyParser.json({limit: '50mb'}));

// Use node-based weltmeister api
var wm = require('./lib/weltmeister/nopache-modules/weltmeister');
wm({rootDir: __dirname}, app);

app.set('views', __dirname + '/views');

app.use('/lib', express.static(__dirname + '/lib'));
app.use('/media', express.static(__dirname + '/media'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/wm', function(req, res){
  res.sendFile(__dirname + '/views/weltmeister.html');
});

app.listen(port);

console.log('app listening on port', port);
