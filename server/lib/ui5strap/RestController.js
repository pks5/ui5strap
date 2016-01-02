var nodeQuery = require('querystring'), Utils = require("./Utils");

/*
 * RestController
 */

var RestController = function(){};

/**
 * @Protected
 * @Static
 */
RestController.controllers = {};

/**
 * @Protected
 * @Static
 */
RestController._routing = [];

var _buildArguments = function(param){
	var args = [];
	if(!param.arguments){
		return args;
	}
	var postFormat = null;
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
			if(postFormat === "payload"){
				throw new Error("Cannot read payload: post body has been interpreted as json!");
			}
			if(!param.postParameters){
				param.postParameters = nodeQuery.parse(param.postBody);
			}
			args.push(param.postParameters[p[1]]);
			
			postFormat = key;
		}
		else if(key === "payload"){
			if(postFormat === "post"){
				throw new Error("Cannot read payload: post body has been interpreted as url encoded!");
			}
			args.push(JSON.parse(param.postBody));
			
			postFormat = key;
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


function processPost(request, response, callback) {
    var queryData = "";
    if(request.method == 'POST') {
        request.on('data', function(data) {
            queryData += data;
            if(queryData.length > 1e6) {
                queryData = "";
                response.writeHead(413, {'Content-Type': 'text/plain'}).end();
                request.connection.destroy();
            }
        });

        request.on('end', function() {
            
            callback && callback(queryData);
        });

    } else {
        callback && callback(null);
    }
}

/**
 * @Public
 * @Static
 */
RestController.handleRequest = function(url, request, response){
	for(var i = 0; i < this._routing.length; i++){
		var routing = this._routing[i],
			matches = url.pathname.match(routing.route);
		
		
		if(matches && matches.length){
			console.log("Route '%s' matched with %s parameters.", routing.route, matches.length-1);
			var pathParam = {};
			if(matches.length > 1){
				for(var j = 0; j < routing.pathParameters.length; j++){
					pathParam[routing.pathParameters[j]] = matches[1 + j];
				}
			}
			response.writeHeader(200, {
				"Content-Type": "application/json"
			});
			
			//TODO beforeRequest handler
			var execMethod = routing.controller[routing.methodName];
			
			if(execMethod){
				processPost(request, response, function(body){
					var param = { 
							"arguments" : routing.methodOptions.arguments,
							"pathParameters" : pathParam,
							"queryParameters" : url.query
					};
					
					if(body){
						param.postBody = body;
					}
					
					var args = _buildArguments(param);
					
					response.end(JSON.stringify(execMethod.apply(routing.controller, args)));
				
				});
				//TODO afterRequest handler
				
				return true;
			}
			else{
				console.warn("Route '" + routing.route + "' matches but no method '" + routing.methodName + "' defined in controller.");
			}
		}
	}
	
	return false;
};

/**
 * Configure
 * @Protected
 */
RestController.prototype._configure = function(){};

/**
 * @Protected
 */
RestController.prototype._createMethodPath = function(methodName, method){
    var path = this.configLocation;
    if(path.charAt(0) !== "/"){
            path = "/" + path;
    }
    if(path.charAt(path.length - 1) !== "/"){
            path = path + "/";
    }
    path += this.options.url;
    if(path.charAt(path.length - 1) !== "/"){
            path = path + "/";
    }
    path += method.path || Utils.hyphenize(methodName);
    return path;
};

/**
 * @Protected
 */
RestController.prototype._install = function(){
	this._configure();
	
	var methods = this.options.methods;
	var methodKeys = Object.keys(methods);
	
	for(var i = 0; i < methodKeys.length; i++){
		var methodName = methodKeys[i],
			method = methods[methodName],
			path = this._createMethodPath(methodName, method);
		
		//if(method.type){
		
		var pathParameters = [];
		var route = path.replace(/\{([a-zA-Z_0-9]+)\}/g, function(s, parameterName, x, y){
			//console.log(s, q, x, y);
			pathParameters.push(parameterName);
			return "([a-zA-Z_0-9]+)";
		});
		
		console.log("Registered method '" + methodName + "' on path '" + path + "'");
		RestController._routing.push({
				"route" : route,
				"pathParameters" : pathParameters,
				"controller" : this,
				"methodName" : methodName,
				"methodOptions" : method
		});
		//}
	}
	
	this.onInit();
};

/**
 * @Public
 */
RestController.prototype.onInit = function(){};

module.exports = RestController;