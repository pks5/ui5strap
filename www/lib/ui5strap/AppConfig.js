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

sap.ui.define(['./library', 'sap/ui/base/Object', 'sap/ui/model/json/JSONModel'], function(library, ObjectBase, JSONModel){

	var AppConfig = ObjectBase.extend("ui5strap.AppConfig", {
		"constructor" : function(options, parameters){
			this.options = options || {};
			this.parameters = parameters || {};
			
			this.data = {};
		}
	}),
	AppConfigProto = AppConfig.prototype;

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
			viewId = viewDef.id,
			viewConfigOrg = null,
			viewOptions = {},
			foundById = false;
		
		//First check if a view ID is given
		if(viewId){
			if(this.data.viewsById[viewId]){
				delete viewDef.viewName;
				viewConfigOrg = this.data.viewsById[viewId];
				foundById = true;
			}
		}
		
		if(viewName){
			viewName = this.resolvePackage(viewName, "views");
			
			if(!foundById && this.data.viewsByName[viewName]){
				delete viewDef.viewName;
				viewConfigOrg = this.data.viewsByName[viewName];
			}
		}
		
		if(viewConfigOrg){
			//The "viewOptions" contain the mix of original config and definition
			jQuery.extend(viewOptions, viewConfigOrg, viewDef);
		}
		else{
			//No view config for the given ID and Name.
			if(viewName){
				viewDef.viewName = viewName;
			}
			
			jQuery.extend(viewOptions, viewDef);
		}
		

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
		
		if(!viewConfig.type){
			viewConfig.type = "XML";
		}
		
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
	
	AppConfigProto.getEnvironment = function(){
		var currentEnv = this.data.app.environment,
			envData = this.data.environments[currentEnv];
		console.log("test");
		if(!envData){
			throw new Error("No such environment: " + currentEnv);
		}
		
		if(!(envData.pathToServerRoot && envData.pathToStaticRoot && envData.pathToThemeRoot)){
			throw new Error("Environment definition must contain 'pathToServerRoot', 'pathToStaticRoot' and 'pathToThemeRoot'!");
		}
		
		return envData;
	};

	/*
	* Processes a given option
	* @static
	*/
	AppConfig.processOption = function(optionKey, option){
		if(typeof option === 'string'){
			return option;
		}
		
		/*
		if(!option.type){
			throw new Error("Invalid option: " + optionKey);
		}
		*/

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

		//throw new Error('Invalid option type: ' + option.type);
		return option;
	};

	/*
	* Resolves the raw information
	*/
	AppConfigProto.resolve = function(){
		var configDataJSON = this.data,
			viewerOptions = this.options,
			appId = this.data.app.id;
		
		//Views
		configDataJSON.viewsById = {};
		configDataJSON.viewsByName = configDataJSON.views; //TODO switch to viewsByName
		
		var viewNames = Object.keys(configDataJSON.views),
			viewNamesLength = viewNames.length;
		for(var i = 0; i < viewNamesLength; i++){
			var viewName = viewNames[i],
				viewNameResolved = this.resolvePackage(viewName, "views");
			
			if(viewName !== viewNameResolved){
				configDataJSON.views[viewNameResolved] = configDataJSON.views[viewName];
				delete configDataJSON.views[viewName];
			}
			
			var viewData = configDataJSON.views[viewNameResolved];
			viewData.viewName = viewNameResolved;
			if(viewData.id){
				configDataJSON.viewsById[viewData.id] = viewData;
			}
		}
		
		//Icons
		configDataJSON.iconsResolved = {};
		var iconKeys = Object.keys(configDataJSON.icons),
			iconKeysLength = iconKeys.length;
		for(var i = 0; i < iconKeysLength; i++){
			configDataJSON.iconsResolved[iconKeys[i]] = this.resolvePath(configDataJSON.icons[iconKeys[i]], true);
		}

		//Options
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
	AppConfigProto.resolvePath = function (path, isStatic){
		//Folder that contains app.json - must end with /
		var location = this.data.app.location;
			
		if(typeof path === 'object'){
			//If path is an object, it should contain a "src" attribute and can contain a "package" attribute
			
			if("package" in path){
				location = jQuery.sap.getModulePath(path["package"]) + "/";
			}

			path = path["src"];
		}

		if(jQuery.sap.startsWith(path, '/')){
			var env = this.getEnvironment(),
				envRoot = isStatic ? env.pathToStaticRoot : env.pathToServerRoot;
			
			if(envRoot.charAt(envRoot.length-1) === "/"){
				envRoot = envRoot.substr(0, envRoot.length-1);
			}
			
			return envRoot + path;
		}
		else if(
			/*
			jQuery.sap.startsWith(path, './')
			|| jQuery.sap.startsWith(path, '../')
			||
			*/ 
			jQuery.sap.startsWith(path, 'http')
		){
			//Return relative (to html file) path unchanged
			return path;
		}
		
		return location + path;
	};

	/*
	* Resolves a package relative to app package
	*/
	AppConfigProto.resolvePackage = function (packageString, defaultFolder, baseRelative){
		if(-1 === packageString.indexOf(".")){
			if(!defaultFolder){
				throw new Exception("Please provide a default folder for resolving '" + packageString + "'");
			}
			packageString = this.data.app.package + "." + defaultFolder.replace(/\//g, ".") + "." + packageString;
		}
		else if(jQuery.sap.startsWith(packageString, ".")){
			if(baseRelative){
				packageString = this.data.app.package + packageString;
			}
			else if(!defaultFolder){
				throw new Exception("Please provide a default folder for resolving '" + packageString + "'");
			}
			else{
				packageString = this.data.app.package + "." + defaultFolder.replace(/\//g, ".") + packageString;
			}
		}
		return packageString;
	};
	
	/**
	* Validates the configuration JSON data. If mandatory properties are missing, empty ones will created.
	* @Static
	*/
	AppConfigProto.validate = function(configDataJSON){
		if(!('app' in configDataJSON)){
			throw new Error("Invalid app configuration: attribute 'app' is missing.");
		}

		//Populate deprecated sapplication attribute
		configDataJSON.sapplication = configDataJSON.app;
		
		var appSection = configDataJSON.app;
		
		//ID
		if(!('id' in configDataJSON.app)){
			throw new Error("Invalid app config: attribute 'app.id' is missing.");
		}
		
		if(!configDataJSON.app["id"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app id "' + configDataJSON.app["id"] + '": may only contain letters, digits, dots and underscores.');
		}

		//Package
		if(!('package' in configDataJSON.app)){
			configDataJSON.app["package"] = configDataJSON.app["id"];
		}

		if(!configDataJSON.app["package"].match(/(^[a-zA-Z0-9_]+)(\.[a-zA-Z0-9_]+)+$/)){
			throw new Error('Package name may only contain letters and digits and the underscore char, separated by a ".", and must have at least one sub package.');
		}
		
		//jQuery.sap.declare(configDataJSON.app["package"] + ".actions");
		//var rootPackage = jQuery.sap.getObject(configDataJSON.app["package"]);
		//rootPackage.actions = {};

		//Namespace
		//TODO What's this?
		if(!('namespace' in configDataJSON.app)){
			configDataJSON.app["namespace"] = configDataJSON.app["package"];
		}	

		if(!configDataJSON.app["namespace"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app namespace "' + configDataJSON.app["namespace"] + '": may only contain letters, digits, dots and underscores.');
		}

		//Type
		if(!('type' in configDataJSON.app)){
			configDataJSON.app.type = 'STANDARD';
		}
		
		//Module
		if(!("module" in configDataJSON.app)){
			configDataJSON.app.module = "ui5strap.App";
		}
		
		//Style Class
		if(!('styleClass' in configDataJSON.app)){
			configDataJSON.app.styleClass = 'ui5strap-app-standard';
		}
		
		//Environments
		if(!configDataJSON.environments){
			configDataJSON.environments = this.options.environments;
		}
		else{
			configDataJSON.environments = jQuery.extend({}, this.options.environments, configDataJSON.environments);
		}
		
		if(!appSection.environment){
			appSection.environment = "local";
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
			configDataJSON.app.transition = 'zoom-in';
		}
		
		//Libraries
		if(!("libraries" in configDataJSON)){
			configDataJSON.libraries = {};
		}
		
		//Views directory
		if(!("views" in configDataJSON)){
			configDataJSON.views = {};
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
	};

	/*
	* Sets the configuration data after validating.
	*/
	AppConfigProto.setData = function(newData){
		this.validate(newData);
		
		this.data = newData;
	
		var staticRoot = this.getEnvironment().pathToStaticRoot,
			sappUrlParts = newData.app.url.split('/');
			sappUrlParts[sappUrlParts.length - 1] = '',
			appLocation = sappUrlParts.join('/');
		
		if(!jQuery.sap.startsWith(appLocation, "http")){
			if(staticRoot.charAt(staticRoot.length - 1) !== "/" && appLocation.charAt(0) !== "/"){
				staticRoot += "/";
			}
			appLocation = staticRoot + appLocation;
		}
		
		//Always has a slash at the end
		newData.app["location"] = appLocation;
	};

	AppConfigProto.getModel = function(){
		return new JSONModel(this.data);
	};

	//Return Module Constructor
	return AppConfig;
});