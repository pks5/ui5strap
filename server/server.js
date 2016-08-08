var express    =    require('express'),
	bodyParser = require('body-parser'),
	nodeFs = require('fs'),
	proxy = require('express-http-proxy');

var app        =    express();

app.use('/destinations/northwind', proxy('services.odata.org/'));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

require('./router/main')(app);

nodeFs.readFile(__dirname + "/server.json", 'utf8', function(err, file) {
	if (err) {
		console.error("Could not load server.json!", err);
		return;
	}
	
	var serverConfig = JSON.parse(file);
	
	app.use('/', express.static(__dirname + "/" + serverConfig.server.pathToPublic));
	
	var server     =    app.listen(serverConfig.server.port,function(){
	    console.log("Serving '" + serverConfig.server.pathToPublic + "' on port " + serverConfig.server.port);
	});
});