/*!
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.App
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

sap.ui.define(['./library', "../core/library", './AppBase', './AppConfig','./AppComponent', "sap/ui/core/mvc/HTMLView", "sap/ui/core/mvc/XMLView", "sap/ui/core/CustomData", "sap/ui/model/resource/ResourceModel", "sap/ui/model/json/JSONModel", "../core/Utils"], 
				function(ui5strapViewerLib, ui5strapCoreLib, AppBase, AppConfig, AppComponent, HTMLView, XMLView, CustomData, ResourceModel, JSONModel, Utils){
	
	"use strict";
	
	/**
	 * Constructor for a new App instance.
	 * 
	 * @param config {pks.ui5strap.viewer.AppConfig} App configuration.
	 * @param viewser {pks.ui5strap.viewer.ViewerBase} Viewer instance that loaded this app.
	 * 
	 * @class
	 * Base Class for ui5strap apps with root navigator.
	 * @extends pks.ui5strap.viewer.AppBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.App
	 * 
	 */
	var App = AppBase.extend('pks.ui5strap.viewer.App', /** @lends pks.ui5strap.viewer.App.prototype */ {
		metadata : {
			interfaces : ["pks.ui5strap.viewer.IRootComponent", "pks.ui5strap.viewer.IRootNavigator"]
		},
		"constructor" : function(config, viewer){
			AppBase.call(this, config, viewer);
			
			if(!config.data.rootNavigation){
				config.data.rootNavigation = {};
			}
			
			this._singleView = false;
			this._historyQueue = [];
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.App.prototype
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
	* @param _this {pks.ui5strap.viewer.App} The reference to the app instance.
	* @param callback {function} The callback function.
	* @private
	*/
	var _preloadViews = function(_this, callback){
		var views = _this.config.data.pagesById,
			viewKeys = Object.keys(views);
		for(var i = 0; i < viewKeys.length; i++){
			var viewConfig = _this.config.getPageConfig(views[viewKeys[i]].id);
			if(viewConfig.preload && viewConfig.cache){
				jQuery.sap.log.debug("Caching view: " + viewConfig.id);
				_this.createPage(viewConfig);
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
				//jQuery.sap.log.debug("Hashchange suppressed.");
				this._suppressHashChange = false;
			}
			else{
				this._processHistory(targetPath, function(){
					_this._historyWorking = false;
				});
			}
			
			
		}
	};
	
	AppProto._processHistory = function(targetPath, callback){
		var _this = this;
		this._historyWorking = true; 
		this.navigateByPath(
			targetPath, 
			{}, 
			function(){
				if(_this._historyQueue.length){
					_this._processHistory(_this._historyQueue.shift(), callback);
				}
				else{
					callback && callback();
				}
			}, 
			false
		);
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
					
					var viewConfig = _this.config.getPageConfig({ 
							type : uriParameters.get("_viewType"),
							viewName : viewName,
							parameters : viewParameters
						}),
						oPage = _this.createPage(viewConfig);
					
					oPage.loaded().then(function(){
						_this.getRootControl().toPage(oPage, "content", "none", callback);
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
	 * @param navigator {pks.ui5strap.core.INavigator} The navigator instance.
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
			
			initialView = this.config.getPageConfig(initialView);
			
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
		sap.ui.require(["pks/ui5strap/core/NavContainer"], function(NavContainerConstructor){
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
			navContainerModule = navigatorOptions["type"] || navigatorOptions.module || "pks.ui5strap.core.NavContainer";
		
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
						var nextAction = function(j){
							if(j >= data.actions.length){
								return;
							}
							
							_this.runAction({
								"parameters" : data.actions[j], 
								"eventSource" : oEvent.getSource(),
								"eventParameters" : oEvent.getParameters(),
								callback : function(){
									nextAction(j+1);
								}
							});
						};
						
						nextAction(0);
					});
				}
			}
			
			callback(rootNavigation);
		});
	};
	
	/**
	 * Navigate to a certain view via root component.
	 * 
	 * @param navControl {pks.ui5strap.core.INavigator} The navigator instance.
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
				
				var viewConfig = this.config.getPageConfig({ id : routeInfo.id });
				
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
						Utils.addToObject(viewConfig.parameters, routeInfo.pathParameters[j], matches[1 + j]);
					}
				}
				
				if(suppressTransitions){
					viewConfig.transition = "none";
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
			document.location.hash = routing + Utils.parsePath(path, parameters);
		}
	};
	
	/**
	 * Finally changes to a page in the given navigator.
	 * 
	 * @param navControl {pks.ui5strap.core.INavigator} The navigator instance.
	 * @param oPage {sap.ui.core.Control} The control representing the page.
	 * @param viewConfigResolved {object} The resolved view definition.
	 * @param excludeSubNavTarget {string} If specified, this target is skipped when initializing a sub navigation.
	 * @param callback {function} The callback function.
	 * @protected
	 */
	AppProto._changePage = function(navControl, oPage, viewConfigResolved, suppressTransitions, excludeSubNavTarget, callback){
		var target = viewConfigResolved.target,
			_this = this;
		
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
			suppressTransitions ? "none" : viewConfigResolved.transition,
			function toPage_complete(param){
				
				//TODO why the timeout here?
				window.setTimeout(function(){
					//Set target available
					navControl.setTargetBusy(target, false);
					
					param.oldPage && _this.detachPage(param.oldPage);
					
					//console.log(window.performance.memory);
					
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
	 * @param navControl {pks.ui5strap.core.INavigator} The navigator instance.
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
			viewConfig = this.config.getPageConfig(viewConfig);
		}
		
		if(!viewConfig.target){
			viewConfig.target = navControl.defaultTarget;
		}
		
		if(!viewConfig.target){
			throw new Error('Cannot navigate to page: no "target" specified!');
		}
		
		var _this = this;
		if(viewConfig.parentId){
			var parentViewConfig = this.config.getPageConfig({ id : viewConfig.parentId });
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

			//TODO Should we call the callback here?
			return false;
		}
		
		var target = viewConfig.target,
			oPage = this.createPage(viewConfig);
		
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