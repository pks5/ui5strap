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

RestController.handleRequest = function(url, request, response){
	var routing = this.routing[url.pathname];
		
		if(routing){
			response.writeHeader(200, {
				"Content-Type": "application/json"
			});
			
			//TODO beforeRequest handler
			
			response.end(JSON.stringify(routing.controller[routing.method]()));
			
			//TODO afterRequest handler
			
			return true;
		}
	
	
	return false;
};

/**
 * Configure
 */
RestController.prototype._configure = function(){
	
};



RestController.prototype._install = function(){
	this._configure();
	
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
	
	this._init();
};

RestController.prototype._init = function(){
};

module.exports = {
	"RestController" : RestController,
	"Utils" : Utils
};