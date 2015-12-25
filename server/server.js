//Lets require/import the HTTP module
var http = require('http'),
	nodeUrl = require('url'),
	nodeFs = require('fs'),
	nodeMime = require('mime');

//Lets define a port we want to listen to
const PORT=8282; 

//Lets use our dispatcher
function handleRequest(request, response){
    var requestUrl = request.url;
	
	if(requestUrl === "/"){
		requestUrl = "/index.html";
	}
	
	var url = nodeUrl.parse(requestUrl, true);
	
	var filename = "../www" + url.pathname;//require('path').join(this.staticDirname, url.pathname);
	var errorListener = function(req, res) {
		res.writeHead(404);
		res.end('Not found');
	};
	
	nodeFs.readFile(filename, function(err, file) {
		if(err) {
			errorListener(request, response);
			return;
		}
		response.writeHeader(200, {
			"Content-Type": nodeMime.lookup(filename)
		});
		response.write(file, 'binary');
		response.end();
	});
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});