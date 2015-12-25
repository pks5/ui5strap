var Utils = function(){
	
};

Utils.hyphenize = function(str){
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

var RestController = function(){
	this.options = {
			methods : {}
	};
	
};

RestController.controllers = {
		
};

RestController.routing = {
		
};

RestController.prototype.install = function(){
	this.configure();
	
	var methods = this.options.methods;
	var methodKeys = Object.keys(methods);
	
	for(var i = 0; i < methodKeys.length; i++){
		var methodName = methodKeys[i],
			method = methods[methodName],
			path = this.options.url + "/" + (method.path || Utils.hyphenize(methodName));
		
		RestController.routing[path] = {
				"controller" : this,
				"method" : methodName
		};
	}
};

RestController.handleRequest = function(url, request, response){
	var urlParts = url.pathname.split("/");
	if(urlParts[2] === "demoapp" && urlParts[4] === "test-service"){
		console.log(url);
		var routing = this.routing[urlParts[4] + "/" + urlParts[5]];
		
		if(routing){
			response.writeHeader(200, {
				"Content-Type": "application/json"
			});
			
			response.end(JSON.stringify(routing.controller[routing.method]()));
			return true;
		}
	}
	
	return false;
};

module.exports = {
	"RestController" : RestController,
	"Utils" : Utils
};