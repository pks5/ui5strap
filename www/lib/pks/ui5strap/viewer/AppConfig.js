/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.AppConfig
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
	
	"use strict";
	
	/**
	 * Constructor for a new AppConfig instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Class representing the ui5strap configuration.
	 * @extends sap.ui.base.Object
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.AppConfig
	 * 
	 */
	var AppConfig = ObjectBase.extend("pks.ui5strap.viewer.AppConfig", {
		"constructor" : function(options, parameters){
			this.options = options || {};
			this.parameters = parameters || {};
			
			this.data = {};
		}
	}),
	AppConfigProto = AppConfig.prototype;

	/**
	* Sets the configuration data after validating.
	*/
	AppConfigProto.setData = function(newData){
		this._validate(newData);
		
		this.data = newData;
	};

	/**
	 * Gets a Model based on Configuration Data.
	 */
	AppConfigProto.getModel = function(){
		return new JSONModel(this.data);
	};
	
	/**
	 * Returns this app's dom id.
	 */
	AppConfigProto.getDomId = function(){
		return this._domId;
	}
	
	/**
	 * Creates a global dom id based on the app's dom id.
	 */
	AppConfigProto.createDomId = function(newId){
		return this._domId + "----" + newId;
	};

	/**
	 * Creates a globally unique Control ID.
	 * TODO This method should not be used when root component is an UIComponent.
	 */
	AppConfigProto.createControlId = function(controlId, viewId){
		//TODO Should the app prefix have a subElement with ----?
		var appPrefix = this.getDomId() + '---';
		if(jQuery.sap.startsWith(controlId, appPrefix)){
			if(viewId){
				throw new Error("Cannot create absolute control id: controlId is already absolute but viewId is given!");
			}
			
			//ControlID already has a app prefix, just return it.
			jQuery.sap.log.debug("Control ID '" + controlId + "' already have an app prefix.");
			
			return controlId;
		}
		
		if(viewId){
			if(jQuery.sap.startsWith(viewId, appPrefix)){
				controlId = viewId + "--" + controlId;
			}
			else{
				controlId = appPrefix + viewId + "--" + controlId;
			}
		}
		else{
			controlId = appPrefix + controlId;
		}
		
		return controlId;
	
	};
	
	/**
	* Returns config information about a view. If only an ID is provided, the view with that ID is returned. 
	* If an ID and viewName is provided, it first looks for a view with that ID - if there is no view with the ID but ONE with the provided viewName without any ID, that view is returned.
	* If only a viewName is provided, it looks if there is ONE view with that viewName or throws an error.
	*/
	AppConfigProto.getViewConfig = function(viewDef){
		//If viewDef is a string, use it as id.
		if(typeof viewDef === "string"){
			viewDef = {
				id : viewDef
			};
		}
		
		var viewOptions = jQuery.extend({}, viewDef),
			viewName = viewOptions.viewName,
			viewId = viewOptions.id,
			viewConfig = {},
			viewConfigOrg = null,
			foundById = false;
		
		//Resolve View ID
		if(viewId){
			viewId = this.createControlId(viewId);
			
			//Search View by ID
			if(this.data.viewsById[viewId]){
				//Delete viewName that is inside the provided view definition since we will use the viewName from config.
				delete viewOptions.viewName;
				//Delete id that is inside the provided view definition since it might be unresolved.
				delete viewOptions.id;
				
				viewConfigOrg = this.data.viewsById[viewId];
				foundById = true;
			}
		}
		
		//Resolve View Name
		if(viewName){
			viewName = this.resolvePackage(viewName, "views");
			var viewsByName = this.data.viewsByName[viewName];
			
			//Search by View Name if not found by ID
			if(!foundById && viewsByName){
				for(var j = 0; j < viewsByName.length; j++){
					if(viewId && viewsByName[j].id){
						//We skip all views that are found by viewName but have an id - if also a search id is specified
						continue;
					}
					
					//Check if there are multiple candidates
					if(viewConfigOrg){
						throw new Error("Cannot determine view configuration by viewName: more than one view is defined with that name!");
					}
					
					//Delete viewName that is inside the provided view definition since we will use the resolved name.
					delete viewOptions.viewName;
					
					if(viewId){
						//Set the resolved view ID.
						viewOptions.id = viewId;
					}
					
					viewConfigOrg = viewsByName[j];
				}
			}
		}
		
		//Test if view configuration has been found
		if(viewConfigOrg){
			jQuery.extend(viewConfig, viewConfigOrg, viewOptions);
		}
		else{
			//No view config for the given ID and Name.
			if(viewName){
				//Set the resolved viewName.
				viewOptions.viewName = viewName;
			}
			if(viewId){
				//Set the resolved view ID.
				viewOptions.id = viewId;
			}
			
			viewConfig = viewOptions;
		}
		
		return viewConfig;
	};

	/**
	* Returns a list of events / actions for given scope, eventName and viewName.
	*/
	AppConfigProto.getEvents = function(eventGroup, eventName, viewDef){
		var eventList = [],
			_configData = this.data,
			viewData = this.getViewConfig(viewDef);
		
		//Add global events to event list.
		if(_configData.events 
			&& _configData.events[eventGroup] 
			&& _configData.events[eventGroup][eventName]){
			eventList = eventList.concat(_configData.events[eventGroup][eventName]);
		}
		
		//Add view events to event list.
		if(viewData
				&& viewData.events 
				&& viewData.events[eventGroup] 
				&& viewData.events[eventGroup][eventName]){
			
			eventList = eventList.concat(viewData.events[eventGroup][eventName]);
		}

		return eventList;
	};
	
	/**
	 * Returns the current environment settings.
	 */
	AppConfigProto.getEnvironment = function(){
		var currentEnv = this.data.app.environment,
			envData = this.data.environments[currentEnv];
		
		if(!envData){
			throw new Error("No such environment: " + currentEnv);
		}
		
		if(!(envData.pathToServerRoot && envData.pathToStaticRoot && envData.pathToThemeRoot)){
			throw new Error("Environment definition must contain 'pathToServerRoot', 'pathToStaticRoot' and 'pathToThemeRoot'!");
		}
		
		return envData;
	};

	/**
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

	/**
	* Resolves the raw information.
	*/
	AppConfigProto.resolve = function(){
		var configDataJSON = this.data,
			viewerOptions = this.options,
			appId = this.data.app.id;
		
		//START read Views
		configDataJSON.viewsById = {};
		configDataJSON.viewsByName = {};
		configDataJSON.routing = [];
		
		if(jQuery.isArray(configDataJSON.views)){
			//New format as array
			var views = configDataJSON.views,
				viewsLength = views.length;
			
			for(var i = 0; i < viewsLength; i++){
				var viewData = views[i],
					viewName = viewData.viewName;
				
				if(typeof viewData === 'string'){
					//Comment
					continue;
				}
				
				if(!viewName){
					jQuery.sap.log.warning("Skipped view definition because attribute 'viewName' is missing.");
					continue;
				}
				
				//TODO Move this to getViewConfig to add these default value also for non configured views?
				//Currenty, if a view is not defined in views, you get a no view type specified if you refer the View.
				if(!viewData.type){
					viewData.type = "XML";
				}
				
				if(!("cache" in viewData)){
					viewData.cache = true;
				}
				
				var viewNameResolved = this.resolvePackage(viewName, "views");
				viewData.viewName = viewNameResolved;
				if(!configDataJSON.viewsByName[viewNameResolved]){
					configDataJSON.viewsByName[viewNameResolved] = [];
				}
				configDataJSON.viewsByName[viewNameResolved].push(viewData);
				
				if(viewData.id){
					viewData.id = this.createControlId(viewData.id);
					configDataJSON.viewsById[viewData.id] = viewData;
				}
				
				var routingPath = viewData.route;
				if(viewData.id && routingPath){
					//if(jQuery.sap.startsWith(routingPath, "/")){
					//	throw new Error("Route must not start with a /: " + routingPath);
					//}
					
					var pathParameters = [],
						route = routingPath.replace(/\{([\w]+[\w\.]*)\}/g, function(s, parameterName, x, y){
							pathParameters.push(parameterName);
							
							//TODO more precise
							return "([\\w\\-]+)";
						}) + "$";
					
					configDataJSON.routing.push({
						id : viewData.id,
						route : route,
						pathParameters : pathParameters
					});
				}
			}
		}
		else{
			//TODO remove
			//START deprecated views format
			//@deprecated
			
			jQuery.sap.log.warning("Declaring views as object is deprecated. Please use an array instead.");
			
			var viewNames = Object.keys(configDataJSON.views),
				viewNamesLength = viewNames.length;
			for(var i = 0; i < viewNamesLength; i++){
				var viewName = viewNames[i],
					viewNameResolved = this.resolvePackage(viewName, "views"),
					viewData = configDataJSON.views[viewName];
				
				if(!viewData.type){
					viewData.type = "XML";
				}
				
				if(!("cache" in viewData)){
					viewData.cache = true;
				}
				
				viewData.viewName = viewNameResolved;
				if(!configDataJSON.viewsByName[viewNameResolved]){
					configDataJSON.viewsByName[viewNameResolved] = [];
				}
				configDataJSON.viewsByName[viewNameResolved].push(viewData);
				
				if(viewData.id){
					viewData.id = this.createControlId(viewData.id);
					configDataJSON.viewsById[viewData.id] = viewData;
				}
			}
			
			//END deprecated views format
		}
		//END read Views
		
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
	
	/**
	* Resolves a path relative to app location
	*/
	AppConfigProto.resolvePath = function (path, isStatic){
		var resourceLocation = null,
			env = this.getEnvironment(),
			envRoot = isStatic ? env.pathToStaticRoot : env.pathToServerRoot;
		
		if(typeof path === 'object'){
			//If path is an object, it should contain a "src" attribute and can contain a "package" attribute
			if(path["package"]){
				resourceLocation = jQuery.sap.getModulePath(path["package"]) + "/";
			}

			path = path["src"];
		}
		
		if(jQuery.sap.startsWith(path, 'http')){
			//Return relative (to html file) path unchanged
			return path;
		}
		else if(jQuery.sap.startsWith(path, '/')){
			if(envRoot.charAt(envRoot.length - 1) === "/"){
				envRoot = envRoot.substr(0, envRoot.length - 1);
			}
			
			return envRoot + path;
		}
		
		//Relative to resource location
		//Resource location can either be the app location, or a package location.
		
		if(!resourceLocation){
			resourceLocation = this.data.app["location"];
			if(!resourceLocation){
				throw new Error("Cannot resolve relative path '" + path + "': no app location defined.");
			}
		}
		
		if(!jQuery.sap.startsWith(resourceLocation, "http")){
			if(envRoot.charAt(envRoot.length - 1) !== "/" && resourceLocation.charAt(0) !== "/"){
				envRoot += "/";
			}
			resourceLocation = envRoot + resourceLocation;
		}
		
		if(resourceLocation.charAt(resourceLocation.length - 1) !== "/" && path.charAt(0) !== "/"){
			resourceLocation += "/";
		}
		
		return resourceLocation + path;
	};

	/**
	* Resolves a package relative to app package.
	*/
	AppConfigProto.resolvePackage = function (packageString, defaultFolder){
		if(-1 === packageString.indexOf(".")){
			jQuery.sap.log.warning("Please add a leading dot '.' to " + packageString);
			packageString = "." + packageString;
		}
		
		if(jQuery.sap.startsWith(packageString, ".")){
			if(defaultFolder && !jQuery.sap.startsWith(packageString, "." + defaultFolder)){
				throw new Error("Default Folders are deprecated and will be dropped. Thus '" + packageString + "' should be '" + "." + defaultFolder + packageString + "'"); 
			}
			else{
				packageString = this.data.app["package"] + packageString;
			}
			
		}
		
		return packageString;
	};
	
	/**
	* Validates the configuration JSON data. If mandatory properties are missing, empty ones will created.
	* @protected
	*/
	AppConfigProto._validate = function(configDataJSON){
		var appSection = configDataJSON.app;
		
		if(!appSection){
			throw new Error("Invalid app configuration: attribute 'app' is missing.");
		}

		//ID
		var appId = appSection["id"];
		
		if(!appId){
			throw new Error("Invalid app config: attribute 'app.id' is missing.");
		}
		
		if(!appId.match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app id "' + appId + '": may only contain letters, digits, dots and underscores.');
		}
		
		this._domId = appId.replace(/\./g, '-');

		//Package
		if(!appSection["package"]){
			appSection["package"] = appId;
		}

		if(!appSection["package"].match(/(^[a-zA-Z0-9_]+)(\.[a-zA-Z0-9_]+)+$/)){
			throw new Error('Package name may only contain letters and digits and the underscore char, separated by a ".", and must have at least one sub package.');
		}
		
		//Version
		if(!appSection.version){
			appSection.version = "0.0.1-SNAPSHOT";
		}
		
		//Type
		if(!appSection["type"]){
			if(appSection.module){
				jQuery.sap.log.warning("Config setting 'app.module' is deprecated! Use 'app.type' instead.")
				appSection["type"] = appSection.module;
			}
			else{
				appSection["type"] = "pks.ui5strap.viewer.App";
			}
		}
		
		//Style Class
		if(!appSection.styleClass){
			appSection.styleClass = 'ui5strap-app-standard';
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
		
		//Default App Transition
		if(!appSection.transition){
			appSection.transition = 'zoom-in';
		}
		
		//App Icons
		if(!configDataJSON.icons){
			configDataJSON.icons = {};
		}
		
		//App Options
		if(!configDataJSON.options){
			configDataJSON.options = {};
		}
		
		//Libraries
		if(!configDataJSON.libraries){
			configDataJSON.libraries = {};
		}
		
		//Views directory
		if(!configDataJSON.views){
			configDataJSON.views = [];
		}
		
		/*
		if(!appSection["pages"]){
			if(appSection.views){
				jQuery.sap.log.warning("Config setting 'app.views' is deprecated! Use 'app.pages' instead.")
			}
			else{
				appSection["views"] = "pks.ui5strap.viewer.App";
			}
		}
		*/
		
		//App Components
		if(!configDataJSON.components){
			configDataJSON.components = [];
		}

		//Actions to be preloaded
		if(!configDataJSON.actions){
			configDataJSON.actions = [];
		}
		
		//Models
		if(!configDataJSON.models){
			configDataJSON.models = [];
		}
		
		//Custom css files
		if(!configDataJSON.css){
			configDataJSON.css = [];
		}

		//Custom JavaScript libraries
		//Deprecated
		if(!configDataJSON.js){
			configDataJSON.js = [];
		}
		
		//Any kind of file to be preloaded
		//TODO Is this used somewhere?
		/*
		if(!configDataJSON.resources){
			configDataJSON.resources = [];
		}
		*/
		
		//App Events
		if(!configDataJSON.events){
			configDataJSON.events = {};
		}
	};

	/*
	 * ----------
	 * DEPRECATED
	 * ----------
	 */
	
	/**
	* @deprecated
	*/
	AppConfigProto.getMenuData = function(menuId){
		if(!(menuId in this.data.menus)){
			return null;
		}
		return this.data.menus[menuId];
	};
	
	/**
	* Returns the Dom ID of the App.
	* @deprecated
	*/
	AppConfigProto.getAppDomId = function(subElement){
		jQuery.sap.log.warning("getAppDomId is deprecated. Use createDomId instead.");
		
		return subElement ? this.createDomId(subElement) : this.getDomId();
	};
	
	//Return Constructor
	return AppConfig;
});