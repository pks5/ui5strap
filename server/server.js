//Lets require/import the HTTP module
var ui5strap = require("./lib/ui5strap/library.js");

var server = new ui5strap.Server("../server/server.json");
	
server.start();

	

