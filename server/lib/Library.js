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

var base = "/apps/demoapp/server/";

RestController.controllers = {
		
};

RestController.routing = {
		
};

RestController.handleRequest = function(url, request, response){
	var routing = this.routing[url.pathname];
		
		if(routing){
			response.writeHeader(200, {
				"Content-Type": "application/json"
			});
			
			response.end(JSON.stringify(routing.controller[routing.method]()));
			return true;
		}
	
	
	return false;
};

RestController.prototype.install = function(){
	this.configure();
	
	var methods = this.options.methods;
	var methodKeys = Object.keys(methods);
	
	for(var i = 0; i < methodKeys.length; i++){
		var methodName = methodKeys[i],
			method = methods[methodName],
			path = base + this.options.url + "/" + (method.path || Utils.hyphenize(methodName));
		
		RestController.routing[path] = {
				"controller" : this,
				"method" : methodName
		};
	}
};

module.exports = {
	"RestController" : RestController,
	"Utils" : Utils
};