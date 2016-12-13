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

sap.ui.define(['./library', 'sap/ui/base/Object', 'sap/ui/model/json/JSONModel'], function(ui5strapViewerLib, ObjectBase, JSONModel){
	
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
	AppConfigProto.createControlId = function(sControlId, sViewId){
		//TODO Should the app prefix have a subElement with ----?
		var appPrefix = this.getDomId() + '---';
		if(jQuery.sap.startsWith(sControlId, appPrefix)){
			if(sViewId){
				throw new Error("Cannot create absolute control id: sControlId is already absolute but sViewId is given!");
			}
			
			//ControlID already has a app prefix, just return it.
			jQuery.sap.log.debug("Control ID '" + sControlId + "' already have an app prefix.");
			
			return sControlId;
		}
		
		if(sViewId){
			if(jQuery.sap.startsWith(sViewId, appPrefix)){
				sControlId = sViewId + "--" + sControlId;
			}
			else{
				sControlId = appPrefix + sViewId + "--" + sControlId;
			}
		}
		else{
			sControlId = appPrefix + sControlId;
		}
		
		return sControlId;
	
	};
	
	/**
	* Returns config information about a view. If only an ID is provided, the view with that ID is returned. 
	* If an ID and viewName is provided, it first looks for a view with that ID - if there is no view with the ID but ONE with the provided viewName without any ID, that view is returned.
	* If only a viewName is provided, it looks if there is ONE view with that viewName or throws an error.
	*/
	AppConfigProto.getViewConfig = function(mViewDef){
		var mPageConfig;
		if(typeof mViewDef === "string"){
			//If mViewDef is a string, use it as id.
			mPageConfig = {
				id : mViewDef
			};
		}
		else{
			mPageConfig = {};
			
			jQuery.extend(mPageConfig, mViewDef);
		}
		
		var sPageId = mPageConfig.id;
		
		//Resolve View ID
		if(sPageId){
			sPageId = this.createControlId(sPageId);
			
			mPageConfig.id = sPageId;
			
			//Search View by ID
			if(this.data.pagesById[sPageId]){
				var mMergedPageConfig = {};
				
				jQuery.extend(mMergedPageConfig, this.data.pagesById[sPageId], mPageConfig);
				
				mPageConfig = mMergedPageConfig;
			}
		}
		
		if(!mPageConfig.type){
			mPageConfig.type = "XMLView";
		}
		
		if(!("cache" in mPageConfig)){
			mPageConfig.cache = true;
		}
		
		return mPageConfig;
	};

	/**
	* Returns a list of events / actions for given scope, eventName and viewName.
	*/
	AppConfigProto.getEvents = function(eventGroup, eventName, mViewDef){
		var eventList = [],
			_configData = this.data,
			mPageConfig = this.getViewConfig(mViewDef);
		
		//Add global events to event list.
		if(_configData.events 
			&& _configData.events[eventGroup] 
			&& _configData.events[eventGroup][eventName]){
			eventList = eventList.concat(_configData.events[eventGroup][eventName]);
		}
		
		//Add view events to event list.
		if(mPageConfig
				&& mPageConfig.events 
				&& mPageConfig.events[eventGroup] 
				&& mPageConfig.events[eventGroup][eventName]){
			
			eventList = eventList.concat(mPageConfig.events[eventGroup][eventName]);
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
	
	var _pageTypes = {
			"XMLView" : {
				"nature" : "View",
				"viewType" : "XML"
			},
			"HTMLView" : {
				"nature" : "View",
				"viewType" : "HTML"
			},
			"JSONView" : {
				"nature" : "View",
				"viewType" : "JSON"
			},
			"JSView" : {
				"nature" : "View",
				"viewType" : "JS"
			},
			
			"XML" : {
				"nature" : "View",
				"viewType" : "XML"
			},
			"HTML" : {
				"nature" : "View",
				"viewType" : "HTML"
			},
			"JSON" : {
				"nature" : "View",
				"viewType" : "JSON"
			},
			"JS" : {
				"nature" : "View",
				"viewType" : "JS"
			},
			
			"UIComponent" : {
				"nature" : "UIComponent"
			}
		};
		
	AppConfigProto.getPageType = function(sPageType){
		var mPageType = _pageTypes[sPageType];
		
		if(!mPageType){
			mPageType = {
				"nature" : "Control"
			};
		}
		
		return mPageType;
	};

	/**
	* Resolves the raw information.
	*/
	AppConfigProto.resolve = function(){
		var configDataJSON = this.data,
			viewerOptions = this.options,
			appId = this.data.app.id,
			aPages = configDataJSON.pages;
		
		//START read Views
		configDataJSON.pagesById = {};
		configDataJSON.routing = [];
		
		if(!jQuery.isArray(aPages)){
			throw new Error("Declaring pages as object is deprecated. Please use an array instead.");
		}
			
		//New format as array
		var iPageConfigLength = aPages.length;
		
		for(var i = 0; i < iPageConfigLength; i++){
			var mPageConfig = aPages[i];
			
			if(typeof mPageConfig === 'string'){
				//Comment
				continue;
			}
			
			var sPageId = mPageConfig.id;
			
			if(!sPageId){
				throw new Error("Page config requires id: " + JSON.stringify(mPageConfig));
			}
			
			sPageId = this.createControlId(sPageId);
			
			mPageConfig.id = sPageId;
			
			configDataJSON.pagesById[sPageId] = mPageConfig;
			
			var mPageType = this.getPageType(mPageConfig.type);
			
			var routingPath = mPageConfig.route;
			if(routingPath){
				//if(jQuery.sap.startsWith(routingPath, "/")){
				//	throw new Error("Route must not start with a /: " + routingPath);
				//}
				
				var aParams = [],
					sRoute = routingPath.replace(/\{([\w]+[\w\.]*)\}/g, function(s, sParamName, x, y){
						aParams.push(sParamName);
						
						//TODO more precise
						return "([\\w\\-]+)";
					}) + "$";
				
				configDataJSON.routing.push({
					id : sPageId,
					route : sRoute,
					pathParameters : aParams
				});
			}
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
	AppConfigProto.resolvePackage = function (packageString){
		if(-1 === packageString.indexOf(".")){
			jQuery.sap.log.warning("Please add a leading dot '.' to " + packageString);
			packageString = "." + packageString;
		}
		
		if(jQuery.sap.startsWith(packageString, ".")){
			packageString = this.data.app["package"] + packageString;
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
		//TODO Use options?
		if(!appSection.styleClass){
			appSection.styleClass = 'ui5strapApp-option-Standard';
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
		if(!configDataJSON.pages){
			if(configDataJSON.views){
				jQuery.sap.log.warning("config data views is deprecated. use pages instead.");
				configDataJSON.pages = configDataJSON.views;
			}
			else{
				configDataJSON.pages = [];
			}
		}
		
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