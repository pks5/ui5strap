//Lets require/import the HTTP module
var nodeHttp = require('http'), nodeUrl = require('url'), nodeFs = require('fs'), nodePath = require('path'), nodeMime = require('mime'), Library = require("./lib/Library.js");

// Lets define a port we want to listen to
const
PORT = 8282;
var pathToWWW = "../www";

var errorListener = function(request, response) {
	response.writeHead(404);
	response.end('Not found');
};

var config = nodePath.join(pathToWWW, "./apps/demoapp/app.json");
nodeFs.readFile(config, 'utf8', function(err, file) {
	if (err) {
		errorListener(request, response);
		return;
	}

	var controllers = {
		"Feed" : require("./apps/demoapp/controllers/Feed.controller.js")
	};

	var Feed = new controllers.Feed(JSON.parse(file));
	Feed._install();

	// Lets use our dispatcher
	function handleRequest(request, response) {
		var requestUrl = request.url;

		if (requestUrl === "/") {
			requestUrl = "/index.html";
		}

		var url = nodeUrl.parse(requestUrl, true);

		if (Library.RestController.handleRequest(url, request, response)) {
			return;
		}

		var filename = nodePath.join(pathToWWW, url.pathname);

		nodeFs.readFile(filename, function(err, file) {
			if (err) {
				errorListener(request, response);
				return;
			}
			response.writeHeader(200, {
				"Content-Type" : nodeMime.lookup(filename)
			});
			response.write(file, 'binary');
			response.end();
		});
	}

	// Create a server
	var server = nodeHttp.createServer(handleRequest);

	// Lets start our server
	server.listen(PORT, function() {
		// Callback triggered when server is successfully listening. Hurray!
		console.log("Server listening on: http://localhost:%s", PORT);
	});

});