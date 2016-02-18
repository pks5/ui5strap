/*
 * 
 * UI5Strap Server
 *
 * Server.js
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

var nodeFs = require('fs'), nodePath = require('path'), nodeHttp = require('http'), nodeUrl = require('url'),
	nodeMime = require('mime'), pathToRoot = "../../",
	RestController = require("./RestController");

/*
 * Server
 */
var Server = function(pathToConfig){
	this._pathToConfig = pathToConfig;
},
ServerProto = Server.prototype;

/**
 * @Public
 */
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
		
		
		var apps = serverConfig.apps,
			cnr = apps.length;

		for(var i = 0; i < apps.length; i++){
			(function(){
				var appConfigUrl = apps[i].config,
					pathToAppConfig = nodePath.join(serverConfig.server.pathToPublic,
						appConfigUrl);
				nodeFs.readFile(pathToAppConfig, 'utf8', function(err, file) {
					if (err) {
						console.warn("Could not load app config from '" + pathToAppConfig + "'!");
					}
					else{
						var appConfig = JSON.parse(file),
							appServerId = appConfig.app.id + ".api";
						
						//Extract location of app.json
						var sappUrlParts = appConfigUrl.split('/');
						sappUrlParts[sappUrlParts.length - 1] = '';
						var appConfigLocation = sappUrlParts.join('/');
						
						for(var j=0; j < appConfig.components.length; j++){
							var component = appConfig.components[j],
								controllerDef = component.restController;
							if(controllerDef){
								if(-1 === controllerDef.indexOf(".")){
									controllerDef = appServerId + ".rest." + controllerDef;
								}
								else if("." === controllerDef.charAt(0)){
									controllerDef = appServerId + ".rest." + controllerDef;
								}
								
								if(0 === controllerDef.indexOf(appServerId)){
									var rest = controllerDef.substring(appServerId.length).replace(/\./g, "/") + ".js";
									console.log("Loaded Controller '" + controllerDef + "' from '" + pathToAppConfig + "'.");
						
									var Controller = require(nodePath.join(pathToRoot, "apps/demoapp/" + rest));
									//ui5strap.demoapp.server
									
									//Install Controller
									var controller = new Controller(component, appConfigLocation);
									controller._install();
								}
							}
						}
					}
					cnr --;
					
					if(cnr === 0){
						_this.listen();
					}
				});
			}());
		}
	});
};

/**
 * @Public
 */
ServerProto.listen = function(){
	var _this = this;
	// Create a server
	this._nodeHttpServer = nodeHttp.createServer(function handleRequest(request, response) {
		var requestUrl = request.url;
		console.log("Request: %s", requestUrl);
		if (requestUrl.charAt(0) === "/" && (requestUrl.length === 1 || requestUrl.charAt(1) === "?")) {
			
			requestUrl = "/index.html" + requestUrl.substring(1);
		}

		var url = nodeUrl.parse(requestUrl, true);

		if (RestController.handleRequest(url, request, response)) {
			return;
		}

		var filename = nodePath.join(_this._pathToWWW, url.pathname);
		console.log("Serving static file %", filename);
		nodeFs.readFile(filename, function(err, file) {
			if (err) {
				response.writeHead(404);
				response.end('Not found');
				
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

module.exports = Server;