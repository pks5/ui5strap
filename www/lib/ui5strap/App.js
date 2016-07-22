/*!
 * 
 * UI5Strap
 *
 * ui5strap.App
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

sap.ui.define(['./library', './AppBase', './AppConfig','./AppComponent', "sap/ui/core/mvc/HTMLView", "sap/ui/core/mvc/XMLView", "sap/ui/core/CustomData", "sap/ui/model/resource/ResourceModel", "sap/ui/model/json/JSONModel"], 
				function(ulib, AppBase, AppConfig, AppComponent, HTMLView, XMLView, CustomData, ResourceModel, JSONModel){
	
	/**
	 * Constructor for a new App instance.
	 * 
	 * @param config {ui5strap.AppConfig} App configuration.
	 * @param viewser {ui5strap.ViewerBase} Viewer instance that loaded this app.
	 * 
	 * @class
	 * Base Class for ui5strap apps with navigation, views and custom stylesheets.
	 * @extends ui5strap.AppBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.0
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.App
	 * 
	 */
	var App = AppBase.extend('ui5strap.App', /** @lends ui5strap.App.prototype */ {
		"constructor" : function(config, viewer){
			AppBase.call(this, config, viewer);
			
			if(!config.data.rootNavigation){
				config.data.rootNavigation = {};
			}
			
			//Init local vars
			this._runtimeData = {
				"theme" : null,
				"css" : {},
				"js" : {}
			};
			
			this._singleView = false;
			this._historyQueue = [];
		}
	}),
	/**
	 * @alias ui5strap.App.prototype
	 */
	AppProto = App.prototype;

	/*
	* ------------------------------------------------
	* --------------------- Events -------------------
	* ------------------------------------------------
	*/

	/**
	* Preloads views that can be cached.
	* 
	* @param _this {ui5strap.App} The reference to the app instance.
	* @param callback {function} The callback function.
	* @private
	*/
	var _preloadViews = function(_this, callback){
		var views = _this.config.data.viewsById,
			viewKeys = Object.keys(views);
		for(var i = 0; i < viewKeys.length; i++){
			var viewConfig = _this.config.getViewConfig(views[viewKeys[i]].id);
			if(viewConfig.preload && viewConfig.cache){
				jQuery.sap.log.debug("Caching view: " + viewConfig.id);
				_this.createView(viewConfig);
			}
		}
		
		//used for future async
		callback && callback();
	};

	/**
	 * Preloads the required modules for this app.
	 * 
	 * @param callback {function} The callback function.
	 * @override
	 * @method
	 */
	AppProto.preload = function(callback){
		var _this = this;
		AppBase.prototype.preload.call(this, function(){
			_this.includeStyle(function includeStyle_complete(){
				_this.log.debug("PRELOADING VIEWS...");
				
				_preloadViews(_this, callback);
			});
		});
	};

	/**
	* Triggered when a view of the app is shown in the global overlay
	*
	* @param oEvent {sap.ui.base.Event} The event object.
	*/
	AppProto.onShowInOverlay = function(oEvent){ 
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "showOverlay",
			"orgEvent" : oEvent 
		});

	};

	/**
	* Triggered when a view of the app is hidden from the global overlay
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
	*/
	AppProto.onHideInOverlay = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hideOverlay",
			"orgEvent" : oEvent 
		});
	};
	
	/**
	 * Triggered when the browser location hash changes.
	 *
	 * @param oEvent {sap.ui.base.Event} The event object.
	 * @override
	 */
	AppProto.onHashChange = function(oEvent){
		AppBase.prototype.onHashChange.call(this, oEvent);
		
		var routing = this.config.data.app.routing;
		if(routing){
			var newHash = document.location.hash,
				hashPrefix = "#" + routing,
				targetPath = newHash.substring(hashPrefix.length),
				_this = this;
			
			if(!jQuery.sap.startsWith(newHash, hashPrefix)){
				return;
			}
			
			if(this._historyWorking){
				jQuery.sap.log.info("History working.");
				this._historyQueue.push(targetPath);
			}
			else if(this._suppressHashChange){
				jQuery.sap.log.info("Hashchange suppressed.");
				this._suppressHashChange = false;
			}
			else{
				this._x(targetPath, function(){
					_this._historyWorking = false;
				});
			}
			
			
		}
	};
	
	AppProto._x = function(targetPath, callback){
		var _this = this;
		this._historyWorking = true; 
		this.navigateByPath(
			targetPath, 
			{}, 
			function(){
				if(_this._historyQueue.length){
					_this._x(_this._historyQueue.shift(), callback);
				}
				else{
					callback && callback();
				}
			}, 
			false
		);
	};
	
	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	/**
	* Include the style that is neccessary for this app
	*
	* @param callback {function} The callback function.
	*/
	AppProto.includeStyle = function(callback){
		var _this = this,
			configData = this.config.data,
			cssKeys = Object.keys(configData.css),
			callbackCount = cssKeys.length;

		if(configData.app.theme){ 
			this.setTheme(configData.app.theme);
		}
		
		if(callbackCount === 0){
			callback && callback.call(this);

			return;
		}

		var callbackI = 0,
			success = function(){
				callbackI++;
				if(callbackI === callbackCount){
					callback && callback.call(_this);
				}
			},
			error = function(e){
				alert('Could not load style!');
				throw e;
			};

		for(var i = 0; i < callbackCount; i++){
			var cssKey = cssKeys[i],
				cssPath = this.config.resolvePath(configData.css[cssKey], true);

			cssKey = 'css--' + this.getId() + '--' + cssKey;

			if(! ( cssKey in this._runtimeData.css ) ){	
				this.log.debug('LOADING CSS "' + cssPath + '"');
					
				this._runtimeData.css[cssKey] = cssPath;
				
				jQuery.sap.includeStyleSheet(
						cssPath, 
						cssKey, 
						success, 
						error
				);
			}
			
			else{
				this.log.debug("Css stylesheet '" + cssPath + "' already included.");
				success();
			}
		}
	};

	/**
	 * Removes the stylesheets added by this app.
	 */
	AppProto.removeStyle = function(){
		for(var cssKey in this._runtimeData.css){
			jQuery('link#' + cssKey).remove();
			delete this._runtimeData.css[cssKey];
			this.log.info("Css stylesheet '" + cssKey + "' removed.");
		}
	};

	/**
	* Sets the theme of the app
	* @param themeName {string} The name of the new theme.
	*/
	AppProto.setTheme = function(themeName){
		this._runtimeData.theme = themeName;

		if(!themeName || "base" === themeName){
			sap.ui.getCore().applyTheme("base");
			return;
		}

		if(jQuery.sap.startsWith(themeName, "sap_")){
			sap.ui.getCore().applyTheme(themeName);
			return;
		}
		//sap.ui.getCore().setThemeRoot(themeName, );
		sap.ui.getCore().applyTheme(themeName, this.config.getEnvironment().pathToThemeRoot);

		this.log.debug("Theme '" + themeName + "' set.");
	};

	/*
	* -------------------------------------------------------------
	* --------------------- Controls ------------------------------
	* -------------------------------------------------------------
	*/
	
	/**
	 * Shows the app. Should only be triggered by the Viewer.
	 * 
	 * @param callback {function} The callback function.
	 * @override
	 */
	AppProto.show = function(callback){
		var _this = this;
		AppBase.prototype.show.call(this, function(firstTime){
			if(firstTime){
				if(_this._singleView){
					var uriParameters = jQuery.sap.getUriParameters(),
						viewName = _this.config.resolvePackage(uriParameters.get("_viewName")),
						viewParameters = uriParameters.get("_viewParameters");
					
					if(viewParameters){
						viewParameters = JSON.parse(viewParameters);
					}
					
					var viewConfig = _this.config.getViewConfig({ 
							type : uriParameters.get("_viewType"),
							viewName : viewName,
							parameters : viewParameters
						}),
						oPage = _this.createView(viewConfig);
					
					oPage.loaded().then(function(){
						_this.getRootControl().toPage(oPage, "content", "transition-none", callback);
					});
					
					return;
				}
				
				_this._rootComponent._showInitialContent(callback);
			}
			else{
				callback && callback(firstTime);
			}
		});
	};
	
	/**
	 * Initializes a navigator.
	 * 
	 * @param navigator {ui5strap.INavigator} The navigator instance.
	 * @param intitalViews {array} An array of view definitions.
	 * @param excludeTarget {string} If specified, this target will be skipped.
	 * @param callback {function} The callback function.
	 * @protected
	 */
	AppProto._initNavigator = function(navigator, initialViews, suppressTransitions, excludeTarget, callback){
		var _this = this,
			callI = 0;
	
		var complete = function(){
			callI--;
			if(callI === 0){
				callback && callback();
			}
		}
	
		if(!initialViews || initialViews.length === 0){
			callI = 1;
			complete();
			return;
		}
	
		callI = initialViews.length;
	
		for(var i = 0; i < initialViews.length; i++){
			var initialView = initialViews[i];
			if(typeof initialView === "string"){
				initialView = {
					id : initialView	
				};
			}
			
			initialView = this.config.getViewConfig(initialView);
			
			if(!initialView.target){
				initialView.target = navigator.defaultTarget;
			}
			
			if(!initialView.target){
				throw new Error('Cannot navigate to page: no "target" specified!');
			}
			
			if(initialView.target === excludeTarget){
				complete();
				
				continue;
			}
			
			//initialView.transition = 'transition-none';
			
			this.navigateTo(navigator, initialView, complete, true, true, suppressTransitions);
		}
	};
	
	/**
	 * Shows the initial content of this root component.
	 * 
	 * @param callback {function} The callback function.
	 * @protected
	 */
	AppProto._showInitialContent = function(callback, useTransitions){
		jQuery.sap.log.debug("Showing initial content...");
		
		var _this = this,
			ci = 1,
			ca = function(){
				ci --;
				if(ci === 0){
					//Trigger callback
					callback && callback();
				}
			};
		
		this._initNavigator(this.getRootControl(), this.config.data.rootNavigation.initialViews, !useTransitions, null, function(){
			var routing = _this.config.data.app.routing;
			if(routing){
				var newHash = document.location.hash,
					hashPrefix = "#" + routing;
				if(!newHash){
					_this._setRoute("", {}, true);
				}
				else if(newHash === hashPrefix){
					//Do nothing
				}
				else if(jQuery.sap.startsWith(newHash, hashPrefix)){
					ci = 2;
					_this.navigateByPath(newHash.substring(2), {}, ca, true);
				}
			}
			
			ca();
		});
	};
	
	/**
	 * Builds a root control for showing single views (only for dev).
	 * 
	 * @param callback {function} The callback function.
	 * @protected
	 */
	AppProto._buildSingleViewRootControl = function(callback){
		sap.ui.require(["ui5strap/NavContainer"], function(NavContainerConstructor){
			callback && callback(new NavContainerConstructor());
		});
	};
	
	/**
	 * Creates the root control. Should be triggered by the Viewer instance.
	 * 
	 * @param callback {function} The callback function.
	 */
	AppProto.createRootControl = function(callback){
		var _this = this;
		if(this.config.data.app.mode === "Devel"){
			var viewName = jQuery.sap.getUriParameters().get("_viewName");
			if(viewName){
				this._singleView = true;
				
				this._buildSingleViewRootControl(function(rootControl){
					_this._rootControl = rootControl;
					
					callback && callback();
				});
				
				return;
			}
		}
		
		AppBase.prototype.createRootControl.call(this, callback);
	};
	
	/**
	 * Creates the root control for this root component.
	 * 
	 * @param callback {function} The callback function.
	 * @protected
	 */
	AppProto._createRootControl = function(callback){
		var _this = this,
			navigatorOptions = this.config.data.rootNavigation,
			navContainerModule = navigatorOptions["type"] || navigatorOptions.module || "ui5strap.NavContainer";
		
		sap.ui.require([navContainerModule.replace(/\./g, "/")], function(NavContainerConstructor){
			var navContainerOptions = navigatorOptions.settings || {};
			if(navContainerOptions.id){
				navContainerOptions.id = _this.config.createControlId(navContainerOptions.id);
			}
			
			var rootNavigation = new NavContainerConstructor(navContainerOptions);
			
			if(navigatorOptions.events && navigatorOptions.events.control){
				var eKeys = Object.keys(navigatorOptions.events.control),
					eKeysLength = eKeys.length;
				for(var i = 0; i < eKeysLength; i++){
					var evs = navigatorOptions.events.control[eKeys[i]];
					
					rootNavigation.attachEvent(eKeys[i], { "actions" : evs }, function(oEvent, data){
						
						for(var j = 0; j < data.actions.length; j ++){
							_this.runAction({
								"parameters" : data.actions[j], 
								"eventSource" : oEvent.getSource(),
								"eventParameters" : oEvent.getParameters()
							});
						}
					});
				}
			}
			
			callback(rootNavigation);
		});
	};
	
	/**
	 * Navigate to a certain view via root component.
	 * 
	 * @param navControl {ui5strap.INavigator} The navigator instance.
	 * @param viewConfig {object} The view definition.
	 * @param callback {function} The callback function.
	 * @param suppressResolve {boolean} Whether the view definition should not be resolved via config.
	 * @param suppressHashChange {boolean} Whether the path should not be appended to location hash.
	 */
	AppProto.navigateTo = function (navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions) {
		return this._rootComponent._navigateTo(navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions);
	};
	
	/**
	 * Navigates by a given path.
	 * 
	 * @param path {string} the path to navigate to.
	 * @param suppressTransitions {boolean} Whether to suppress transitions.
	 */
	AppProto.navigateByPath = function(path, viewParameters, callback, suppressTransitions){
		if(!path){
			return this._rootComponent._showInitialContent(callback, true);
		}
		
		for(var i = 0; i < this.config.data.routing.length; i++){
			var routeInfo = this.config.data.routing[i],
				matches = path.match(routeInfo.route);
			//console.log("testing", path, routeInfo.route);
			if(matches && matches.length){
				//console.log(matches);
				console.log("Route '%s' matched with %s parameters.", routeInfo.route, matches.length-1);
				
				var viewConfig = this.config.getViewConfig({ id : routeInfo.id });
				
				if(!viewParameters){
					viewParameters = {};
				}
				
				if(!viewConfig.parameters){
					viewConfig.parameters = viewParameters;
				}
				else{
					jQuery.extend(true, viewConfig.parameters, viewParameters);
				}
				
				if(matches.length > 1){
					for(var j = 0; j < routeInfo.pathParameters.length; j++){
						ulib.Utils.addToObject(viewConfig.parameters, routeInfo.pathParameters[j], matches[1 + j]);
					}
				}
				
				if(suppressTransitions){
					viewConfig.transition = "transition-none";
				}
				
				return this.navigateTo(this.getRootControl(), viewConfig, callback, false, true, suppressTransitions);
			}
		}
		
		throw new Error("Route not found: " + path);
	}
	
	/**
	 * Sets a routing path to location hash.
	 * 
	 * @param path {string} The routing path.
	 * @param parameters {array} The path parameters.
	 * @param suppressHashChange {boolean} Whether triggering the onHashChange event should be suppressed.
	 * @protected
	 */
	AppProto._setRoute = function(path, parameters, suppressHashChange){
		var routing = this.config.data.app.routing;
		if(routing){
			this._suppressHashChange = suppressHashChange;
			document.location.hash = routing + ulib.Utils.parsePath(path, parameters);
		}
	};
	
	/**
	 * Finally changes to a page in the given navigator.
	 * 
	 * @param navControl {ui5strap.INavigator} The navigator instance.
	 * @param oPage {sap.ui.core.Control} The control representing the page.
	 * @param viewConfigResolved {object} The resolved view definition.
	 * @param excludeSubNavTarget {string} If specified, this target is skipped when initializing a sub navigation.
	 * @param callback {function} The callback function.
	 * @protected
	 */
	AppProto._changePage = function(navControl, oPage, viewConfigResolved, suppressTransitions, excludeSubNavTarget, callback){
		var target = viewConfigResolved.target;
		
		//Trigger onUpdate events
		navControl.updateTarget(target, oPage, viewConfigResolved.parameters);
		
		var ci = 1,
			ca = function(){
				ci --;
				if(ci === 0){
					//Trigger callback
					callback && callback();
				}
			};
		
		//Set target busy
		navControl.setTargetBusy(target, true);
		
		//Change NavContainer to page
		var pageChanged = navControl.toPage(
			oPage, 
			target, 
			suppressTransitions ? "transition-none" : viewConfigResolved.transition,
			function toPage_complete(){
				
				//TODO why the timeout here?
				window.setTimeout(function(){
					//Set target available
					navControl.setTargetBusy(target, false);
					
					ca();
				}, 50);
				
				
			}
		);
		
		var subNavConfig = viewConfigResolved.subNavigation;
		if(subNavConfig){
			var subNav = oPage.getController().byId(subNavConfig.id);
			if(!subNav){
				throw new Error("Cannot navigate: sub navigation is not available.");
			}
			
			ci = 2;
			this._initNavigator(subNav, subNavConfig.initialViews, suppressTransitions || pageChanged, excludeSubNavTarget, ca);
		}
	}
	
	/**
	 * Implementation of the navigateTo function for this root component.
	 * 
	 * @param navControl {ui5strap.INavigator} The navigator instance.
	 * @param viewConfig {object} The view definition.
	 * @param callback {function} The callback function.
	 * @param suppressResolve {boolean} Whether resolving the view definition should be suppressed.
	 * @param suppressHashChange {boolean} Whether changing the hash should be suppressed.
	 * @param excludeSubNavTarget {string} If specified, this target is skipped when loading sub navigations.
	 * @returns {sap.ui.core.mvc.View} The view instance that has been loaded.
	 * @protected
	 */
	AppProto._navigateTo = function (navControl, viewConfig, callback, suppressResolve, suppressHashChange, suppressTransitions, excludeSubNavTarget) {
		jQuery.sap.log.debug("AppBaseProto.navigateTo");
		
		if(!suppressResolve){
			viewConfig = this.config.getViewConfig(viewConfig);
		}
		
		if(!viewConfig.target){
			viewConfig.target = navControl.defaultTarget;
		}
		
		if(!viewConfig.target){
			throw new Error('Cannot navigate to page: no "target" specified!');
		}
		
		var _this = this;
		if(viewConfig.parentId){
			var parentViewConfig = this.config.getViewConfig({ id : viewConfig.parentId });
			if(!parentViewConfig || !parentViewConfig.subNavigation || !parentViewConfig.cache){
				throw new Error("Parent view is not defined in config, has no subNavigation set or is not cached: " + viewConfig.parentId);
			}
			
			var parentNavControl = _this.getControl(parentViewConfig.subNavigation.id, viewConfig.parentId);
			
			if(navControl !== parentNavControl){
				//Assure that parent view is loaded
				return this._navigateTo(
						navControl, 
						parentViewConfig, 
						function(){
							if(!parentNavControl){
								parentNavControl = _this.getControl(parentViewConfig.subNavigation.id, viewConfig.parentId);
							}
							//Recall original request
							_this._navigateTo(
									parentNavControl, 
									viewConfig, 
									callback, 
									suppressResolve, 
									suppressHashChange,
									suppressTransitions,
									excludeSubNavTarget
							)
						}, 
						true, //Suppress resolve 
						true, //Suppress HashChange
						suppressTransitions, //Suppress Transitions
						viewConfig.target
				);
			
			}
			
			navControl = parentNavControl;
		}
		
		if(navControl.isTargetBusy(viewConfig.target)){
			jQuery.sap.log.warning('[NC#' + navControl.getId() + '] Cannot navigate: Target is busy: "' + viewConfig.target + '"');

			return false;
		}
		
		var target = viewConfig.target,
			oPage = this.createView(viewConfig);
		
		oPage.loaded().then(function(){
			
			_this._changePage(navControl, oPage, viewConfig, suppressTransitions, excludeSubNavTarget, callback);
			
		});
		
		var viewRoute = viewConfig.route;
		if(this.config.data.app.routing && (viewRoute || viewRoute === "") && !suppressHashChange){
			this._setRoute(viewRoute, viewConfig.parameters, true);
		}
		
		return oPage;
	};

	//Return Module Constructor
	return App;
	
});