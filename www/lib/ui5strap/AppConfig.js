/*
 * 
 * UI5Strap
 *
 * ui5strap.AppConfig
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
	sap.ui.base.Object.extend("ui5strap.AppConfig", {
		"constructor" : function(options){
			this.options = options || {};

			this.data = {};
		}
	});

	var AppConfig = ui5strap.AppConfig,
		AppConfigProto = AppConfig.prototype;

	/*
	* Loads the configuration from an URL. URL must point to a JSON file.
	*/
	AppConfigProto.load = function(configUrl, callback){
		var _this = this;

		jQuery.ajax({
	  		"dataType": "json",
	  		"url": configUrl,
	  		"data": {},
	  		"success": function ajax_complete(configDataJSON){
	  			if(!configDataJSON.app){
					throw new Error("Invalid app configuration: attribute 'app' is missing.");
				}
	  			configDataJSON.app.url = configUrl;

	  			_this.setData(configDataJSON);

	  			callback && callback.call(_this, configDataJSON);
	  		},
	  		"error" : function ajax_error(){
	  			throw new Error('Could not load app config from url: ' + configUrl);
	  		}
		});
	};

	/*
	* @deprecated
	*/
	AppConfigProto.getFrame = function(){
		return this.data.frames['default'];
	};

	/*
	* @deprecated
	*/
	AppConfigProto.getMenuData = function(menuId){
		if(!(menuId in this.data.menus)){
			return null;
		}
		return this.data.menus[menuId];
	};

	/*
	* Returns config information about a view
	*/
	AppConfigProto.getViewConfig = function(viewDef){
		var viewName = viewDef.viewName,
			viewConfigOrg = {},
			viewOptions = {};
		
		if(viewName in this.data.views){
			viewConfigOrg = jQuery.extend({
				viewName : viewName
			}, this.data.views[viewName]);
		}

		//The "viewOptions" contain the mix of original config and definition
		jQuery.extend(viewOptions, viewConfigOrg, viewDef);

		//The final view constructor object
		var viewConfig = {
			cache : true
		};

		jQuery.extend(viewConfig, viewOptions);

		if(!viewConfig.viewData){
			viewConfig.viewData = {};
		}

		if(!viewConfig.viewData.__ui5strap){
			viewConfig.viewData.__ui5strap = {};
		}

		//Resulting view options (= viewConfigOrg + viewDef)
		viewConfig.viewData.__ui5strap.viewOptions = viewOptions;
		
		//@deprecated
		//View configuration from app.json
		viewConfig.viewData.__ui5strap.viewConfigOrg = viewConfigOrg;
		
		//Original function parameters
		viewConfig.viewData.__ui5strap.viewDef = viewDef;

		return viewConfig;
	};

	/*
	* Returns a list of events / actions for given scope, eventName and viewName
	*/
	AppConfigProto.getEvents = function(eventGroup, eventName, viewName){
		var eventList = [],
			_configData = this.data;

		if(_configData.events 
			&& _configData.events[eventGroup] 
			&& _configData.events[eventGroup][eventName]){
			eventList = eventList.concat(_configData.events[eventGroup][eventName]);
		}
		
		if(viewName){
			var viewData = this.data.views[viewName];
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
	* Processes a given option
	* @static
	*/
	AppConfig.processOption = function(optionKey, option){
		if(typeof option === 'string'){
			return option;
		}
		
		if(!option.type){
			throw new Error("Invalid option: " + optionKey);
		}

		if("URI" === option.type){
			if(!("uriParam" in option)){
				throw new Error("Missing 'uriParam' in option '" + optionKey + "'");
			}

			var uriParamValue = jQuery.sap.getUriParameters().get(option.uriParam);

			if(null === uriParamValue){
				if(true === option.required){
					throw new Error('Missing uri parameter: ' + option.uriParam);
				}
				else{
					uriParamValue = option.defaultValue;
				}
			}

			return uriParamValue;
		}

		throw new Error('Invalid option type: ' + option.type);
	};

	/*
	* Resolves the raw information
	*/
	AppConfigProto.resolve = function(){
		var configDataJSON = this.data,
			viewerOptions = this.options,
			appId = this.data.app.id;

		configDataJSON.iconsResolved = {};
		var iconKeys = Object.keys(configDataJSON.icons),
			iconKeysLength = iconKeys.length;
		for(var i = 0; i < iconKeysLength; i++){
			configDataJSON.iconsResolved[iconKeys[i]] = this.resolvePath(configDataJSON.icons[iconKeys[i]]);
		}

		configDataJSON.optionsResolved = jQuery.extend({}, configDataJSON.options);
		if("override" in viewerOptions && appId in viewerOptions.override){
			jQuery.extend(configDataJSON.optionsResolved, viewerOptions.override[appId]);
		}

		var optionsKeys = Object.keys(configDataJSON.optionsResolved),
			optionsKeysLength = optionsKeys.length;

		for(var i = 0; i < optionsKeysLength; i++){
			var optionKey = optionsKeys[i],
				optionValue = configDataJSON.optionsResolved[optionKey];

			if(typeof optionValue === 'object'){
				configDataJSON.optionsResolved[optionKey] = AppConfig.processOption(optionKey, optionValue);
			}
		}
	};

	/*
	* Resolves a path relative to app location
	*/
	AppConfigProto.resolvePath = function (path){
		//Folder that contains app.json - must end with /
		var location = this.data.app.location;

		if(typeof path === 'string'){
			//If path is a string, treat is as relative or absolute path depending on first char
			
			if(jQuery.sap.startsWith(path, '/')){
				//Return path relative to servlet root (context)
				return this.options.pathToServletRoot + path;
			}
			else if(jQuery.sap.startsWith(path, './')){
				//Return relative (to html file) path unchanged
				return path;
			}
			else if(jQuery.sap.startsWith(path, 'http')){
				//Return absolute path unchanged
				return path;
			}

		}	
		else if(typeof path === 'object'){
			//If path is an object, it should contain a "src" attribute and can contain a "package" attribute
			
			if("package" in path){
				location = jQuery.sap.getModulePath(path["package"]) + "/";
			}

			path = path["src"];
		}

		return location + path;
	};

	
	
	/*
	* Validates the configuration JSON data. If mandatory properties are missing, empty ones will created.
	* @static
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
		
		if(!('styleClass' in configDataJSON.app)){
			configDataJSON.app.styleClass = 'ui5strap-app-standard';
		}
		
		//App Icons
		if(!('icons' in configDataJSON)){
			configDataJSON.icons = {};
		}
		
		//App Options
		if(!('options' in configDataJSON)){
			configDataJSON.options = {};
		}
		
		//Default App Transition
		if(!('transition' in configDataJSON.app)){
			configDataJSON.app.transition = 'transition-zoom';
		}
		
		//Libraries
		if(!("libraries" in configDataJSON)){
			configDataJSON.libraries = {};
		}
		
		//Views directory
		if(!("views" in configDataJSON)){
			configDataJSON.views = {};
		}
		
		//Frames
		//@deprecated
		if(!("frames" in configDataJSON)){
			configDataJSON.frames = {};
		}

		//App Components
		if(!("components" in configDataJSON)){
			configDataJSON.components = [];
		}

		//UI5 Modules to be preloaded
		if(!("modules" in configDataJSON)){
			configDataJSON.modules = [];
		}
		
		//Actions to be preloaded
		if(!("actions" in configDataJSON)){
			configDataJSON.actions = [];
		}
		
		//Models
		if(!("models" in configDataJSON)){
			configDataJSON.models = [];
		}
		
		//Custom css files
		if(!("css" in configDataJSON)){
			configDataJSON.css = [];
		}

		//Custom JavaScript libraries
		if(!("js" in configDataJSON)){
			configDataJSON.js = [];
		}
		
		//Any kind of file to be preloaded
		if(!("resources" in configDataJSON)){
			configDataJSON.resources = [];
		}
		
		//App Events
		if(!("events" in configDataJSON)){
			configDataJSON.events = {};
		}

		//Add the location of the sapp if its not specified
		//Location always should end with a slash
		if(!("location" in configDataJSON.app)){
			var sappUrlParts = configDataJSON.app.url.split('/');
			sappUrlParts[sappUrlParts.length - 1] = '';
			configDataJSON.app["location"] = sappUrlParts.join('/');
		}
	};

	/*
	* Sets the configuration data after validating.
	*/
	AppConfigProto.setData = function(newData){
		AppConfig.validate(newData);
		
		this.data = newData;
	};

	AppConfigProto.getModel = function(){
		return new sap.ui.model.json.JSONModel(this.data);
	};

}());