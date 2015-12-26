var nodeHttp = require('http'),
	nodeUrl = require('url'), nodeFs = require('fs'), nodePath = require('path'), nodeMime = require('mime');



/*
 * Server
 */

var errorListener = function(request, response) {
	response.writeHead(404);
	response.end('Not found');
};

var Server = function(pathToConfig){
	this._pathToConfig = pathToConfig;
},
ServerProto = Server.prototype;

ServerProto.start = function(){
	var _this = this;
	
	nodeFs.readFile(this._pathToConfig, 'utf8', function(err, file) {
		if (err) {
			console.error("Could not load server.json!", err);
			return;
		}

		var serverConfig = JSON.parse(file);
		
		_this.config = serverConfig;
		_this._pathToWWW = serverConfig.server.pathToPublic;
		_this._port = serverConfig.server.port;
		_this._pathToApps = "../../apps/";
		_this._pathToAppsPublic = "/apps/";
		
		var apps = serverConfig.apps,
			cnr = apps.length;

		for(var i = 0; i < apps.length; i++){
			(function(){
				var appConfigUrl = apps[i].config,
					pathToAppConfig = nodePath.join(serverConfig.server.pathToPublic,
						appConfigUrl);
				nodeFs.readFile(pathToAppConfig, 'utf8', function(err, file) {
					if (err) {
						console.error("Could not load app config from '" + pathToAppConfig + "'!");
						return;
					}
					
					cnr --;
		
					var appConfig = JSON.parse(file),
						appServerId = appConfig.app.id + ".server";
					
					var sappUrlParts = appConfigUrl.split('/');
					sappUrlParts[sappUrlParts.length - 1] = '';
					var appConfigLocation = sappUrlParts.join('/');
					
					for(var j=0; j < appConfig.components.length; j++){
						var component = appConfig.components[j];
						if(component.controller && 0 === component.controller.indexOf(appServerId)){
							var rest = component.controller.substring(appServerId.length).replace(/\./g, "/") + ".controller.js";
							console.log("Loaded Controller '" + component.controller + "' from '" + pathToAppConfig + "'.");
				
							var Controller = require(nodePath.join(_this._pathToApps, "demoapp/" + rest));
							//ui5strap.demoapp.server
							var controller = new Controller(component, appConfigLocation);
							controller._install();
						}
					}
		
					if(cnr === 0){
						_this.startUp();
					}
				});
			}());
		}
	});
};

ServerProto.startUp = function(){
	var _this = this;
	// Create a server
	this._nodeHttpServer = nodeHttp.createServer(function handleRequest(request, response) {
		var requestUrl = request.url;

		if (requestUrl === "/") {
			requestUrl = "/index.html";
		}

		var url = nodeUrl.parse(requestUrl, true);

		if (RestController.handleRequest(url, request, response)) {
			return;
		}

		var filename = nodePath.join(_this._pathToWWW, url.pathname);

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
	});

	// Lets start our server
	this._nodeHttpServer.listen(this._port, function() {
		// Callback triggered when server is successfully listening. Hurray!
		console.log("Server listening on: http://localhost:%s", _this._port);
	});
};


/*
 * Utils
 */

var Utils = function(){
	
};

Utils.hyphenize = function(str){
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/*
 * RestController
 */

var RestController = function(){
	this.options = {
			methods : {}
	};
	
};

RestController.controllers = {
		
};

RestController._routing = [];

var _buildArguments = function(param){
	var args = [];
	if(!param.arguments){
		return args;
	}
	
	for(var j=0; j<param.arguments.length; j++){
		var p = param.arguments[j].split("."),
			key = p[0];
		
		if(key === "path"){
			if(!param.pathParameters){
				param.pathParameters = {};
			}
			args.push(param.pathParameters[p[1]]);
		}
		else if(key === "query"){
			if(!param.queryParameters){
				param.queryParameters = {};
			}
			args.push(param.queryParameters[p[1]]);
		}
		else if(key === "post"){
			if(!param.postParameters){
				param.postParameters = {};
			}
			args.push(param.postParameters[p[1]]);
		}
		else if(key === "payload"){
			args.push(param.payload);
		}
		else if(key === "success"){
			args.push(null);
		}
		else if(key === "error"){
			args.push(null);
		}
	}
	
	return args;
};

RestController.handleRequest = function(url, request, response){
	for(var i = 0; i < this._routing.length; i++){
		var routing = this._routing[i];
		var pathParameters = [];
		var route = routing.route.replace(/\{([a-zA-Z_0-9]+)\}/g, function(s, parameterName, x, y){
			//console.log(s, q, x, y);
			pathParameters.push(parameterName);
			return "([a-zA-Z_0-9]+)";
		});
		
		var matches = url.pathname.match(route);
		
		console.log("ROUTE", route, matches);
		if(matches && matches.length){
			var pathParam = {};
			if(matches.length > 1){
				for(var j = 0; j < pathParameters.length; j++){
					pathParam[pathParameters[j]] = matches[1 + j];
				}
			}
			response.writeHeader(200, {
				"Content-Type": "application/json"
			});
			
			//TODO beforeRequest handler
			var execMethod = routing.controller[routing.methodName];
			
			var args = _buildArguments({ 
					"arguments" : routing.methodOptions.arguments,
					"pathParameters" : pathParam,
					"queryParameters" : url.query
					
			});
			
			response.end(JSON.stringify(execMethod.apply(routing.controller, args)));
			
			//TODO afterRequest handler
			
			return true;
		}
	}
	
	return false;
};

/**
 * Configure
 */
RestController.prototype._configure = function(){
	
};

RestController.prototype._resolvePath = function(path){
	return nodePath.join(this.configLocation, path);
};

RestController.prototype._install = function(){
	this._configure();
	
	var methods = this.options.methods;
	var methodKeys = Object.keys(methods);
	
	for(var i = 0; i < methodKeys.length; i++){
		var methodName = methodKeys[i],
			method = methods[methodName],
			path = nodePath.join(this._resolvePath(this.options.url), (method.path || Utils.hyphenize(methodName)));
		
		if(path.charAt(0) !== "/"){
			path = "/" + path;
		}
		console.log("Registered method '" + methodName + "' on path '" + path + "'");
		RestController._routing.push({
				"route" : path,
				"controller" : this,
				"methodName" : methodName,
				"methodOptions" : method
		});
	}
	
	this.onInit();
};

RestController.prototype.onInit = function(){};

module.exports = {
	"Server" : Server,
	"RestController" : RestController,
	"Utils" : Utils,
	"restController" : function(controllerImpl){
		var Controller = function(options, configLocation){
			this.configLocation = configLocation;
			this.options = options;
			
			if(controllerImpl){ 
				var implKeys = Object.keys(controllerImpl);
				for(var i = 0; i < implKeys.length; i++){
					this[implKeys[i]] = controllerImpl[implKeys[i]];
				}
			}
		};
		Controller.prototype = new RestController();
		return Controller;
	}
};