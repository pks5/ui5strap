/*
 * 
 * UI5Strap
 *
 * AppConfig
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

(function (){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare("ui5strap.AppConfig");
	sap.ui.base.Object.extend("ui5strap.AppConfig");

	var AppConfig = ui5strap.AppConfig,
		AppConfigProto = AppConfig.prototype;

	AppConfigProto.load = function(configUrl, callback){
		var config = this;

		jQuery.ajax({
	  		"dataType": "json",
	  		"url": configUrl,
	  		"data": {},
	  		"success": function anon_loadSappConfigComplete(configDataJSON){
	  			if(!('app' in configDataJSON)){
					throw new Error("Invalid app configuration: attribute 'app' is missing.");
				}
	  			configDataJSON.app.url = configUrl;

	  			config.setData(configDataJSON);

	  			callback.call(this, configDataJSON);
	  		},
	  		"error" : function anon_loadSappConfigError(){
	  			throw new Error('Could not load app config from url: ' + configUrl);
	  		}
		});
	};

	AppConfigProto.getFrame = function(){
		return this.data.frames.default;
	};

	AppConfigProto.getMenuData = function(menuId){
		if(!(menuId in this.data.menus)){
			return null;
		}
		return this.data.menus[menuId];
	};

	AppConfigProto.getViewData = function(viewName){
		if(!(viewName in this.data.views)){
			return null;
		}
		return jQuery.extend({ viewName : viewName }, this.data.views[viewName]);
	};

	AppConfigProto.getEvents = function(eventGroup, eventName, viewName){
			var eventList = [],
				_configData = this.data;

			if(_configData.events 
				&& _configData.events[eventGroup] 
				&& _configData.events[eventGroup][eventName]){
				eventList = eventList.concat(_configData.events[eventGroup][eventName]);
			}
			
			if(viewName){
				var viewData = this.getViewData(viewName);
				if(viewData
					&& viewData.events 
					&& viewData.events[eventGroup] 
					&& viewData.events[eventGroup][eventName]){
					
					eventList = eventList.concat(viewData.events[eventGroup][eventName]);
				
				}
			}

			return eventList;
		};
	
	/*
	* Resolves a path in the configuration
	*/
	AppConfig.resolvePath = function (path, sappPackage) {
		if(typeof path === 'string'){
			if(jQuery.sap.startsWith(path, '/')){
				//Root path to the level of the servlet root directory
				return ui5os.pathToServletRoot + path;
			}
			else if(jQuery.sap.startsWith(path, './')){
				return path;
			}
			else if(jQuery.sap.startsWith(path, 'http')){
				//Absolute path
				return path;
			}
		}	
		else if(typeof path === 'object'){
			
			if("package" in path){
				sappPackage = path["package"];
			}

			path = path["src"];
		}

		return jQuery.sap.getModulePath(sappPackage) + '/' + path;
	};

	/*
	* Validates the configuration
	* @TODO make static
	*/
	AppConfig.validate = function(configDataJSON){
		if(!('app' in configDataJSON)){
			throw new Error("Invalid app configuration: attribute 'app' is missing.");
		}

		//Populate deprecated sapplication attribute
		configDataJSON.sapplication = configDataJSON.app;

		if(!('package' in configDataJSON.app)){
			throw new Error("Invalid app config: attribute 'app/package' is missing.");
		}

		if(!configDataJSON.app["package"].match(/(^[a-zA-Z0-9_]+)(\.[a-zA-Z0-9_]+)+$/)){
			throw new Error('Package name may only contain letters and digits and the underscore char, separated by a ".", and must have at least one sub package.');
		}

		if(!('id' in configDataJSON.app)){
			configDataJSON.app["id"] = configDataJSON.app["package"];
		}	

		if(!configDataJSON.app["id"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app id "' + configDataJSON.app["id"] + '": may only contain letters, digits, dots and underscores.');
		}

		if(!('namespace' in configDataJSON.app)){
			configDataJSON.app["namespace"] = configDataJSON.app["package"];
		}	

		if(!configDataJSON.app["namespace"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app namespace "' + configDataJSON.app["namespace"] + '": may only contain letters, digits, dots and underscores.');
		}

		if(!('type' in configDataJSON.app)){
			configDataJSON.app.type = 'STANDARD';
		}

		if(!('icons' in configDataJSON)){
			configDataJSON.icons = {};
		}

		if(!('options' in configDataJSON)){
			configDataJSON.options = {};
		}

		if(!('transition' in configDataJSON.app)){
			configDataJSON.app.transition = 'coolui5-transition-zoom';
		}
		
		if(!("libraries" in configDataJSON)){
			configDataJSON.libraries = {};
		}

		if(!("views" in configDataJSON)){
			configDataJSON.views = {};
		}

		if(!("components" in configDataJSON)){
			configDataJSON.components = [];
		}

		if(!("modules" in configDataJSON)){
			configDataJSON.modules = [];
		}

		if(!("resources" in configDataJSON)){
			configDataJSON.resources = [];
		}

		if(!("events" in configDataJSON)){
			configDataJSON.events = {};
		}

		//Add the location of the sapp if its not specified
		if(!("location" in configDataJSON.app)){
			var sappUrlParts = configDataJSON.app.url.split('/');
			sappUrlParts[sappUrlParts.length - 1] = '';
			configDataJSON.app["location"] = sappUrlParts.join('/');
		}

		/*
		if(!("module" in configDataJSON.app)){
			var defaultAppModule = "ui5os.App";
			if("SYSTEM" === configDataJSON.app.type){
				defaultAppModule = "ui5os.AppSystem";
			}
			else if("SANDBOX" === configDataJSON.app.type){
				defaultAppModule = "ui5os.AppSandbox";
			}
			configDataJSON.app.module = defaultAppModule;
		}
		*/
	};

	AppConfigProto.setData = function(newData){
		AppConfig.validate(newData);
		
		this.data = newData;
	};

}());