/*
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
				function(library, AppBase, AppConfig, AppComponent, HTMLView, XMLView, CustomData, ResourceModel, JSONModel){

	var App = AppBase.extend('ui5strap.App', {
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

		}
	}),
	AppProto = App.prototype;

	/*
	* ------------------------------------------------
	* --------------------- Events -------------------
	* ------------------------------------------------
	*/

	/**
	* Preload resources e.g. images and json files
	* @Private
	* @Static
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
	 * @Public
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
	* @Public
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
	* @Public
	*/
	AppProto.onHideInOverlay = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hideOverlay",
			"orgEvent" : oEvent 
		});
	};

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	/**
	* Include the style that is neccessary for this app
	* @Public
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
	 * @Public
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
	* @Public
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
	 * @Public
	 * @Override
	 */
	AppProto.show = function(callback){
		var _this = this;
		AppBase.prototype.show.call(this, function(firstTime){
			if(firstTime){
				if(_this.config.data.app.mode === "Devel" && jQuery.sap.getUriParameters().get("_viewName")){
					callback && callback(firstTime);
				}
				else{
					_this._rootComponent._showInitialContent(callback);
				}
			}
			else{
				callback && callback(firstTime);
			}
		});
	};
	
	/**
	 * @Protected
	 */
	AppProto._showInitialContent = function(callback){
			jQuery.sap.log.debug("Showing initial content...");
			var _this = this,
				initialViews = this.config.data.rootNavigation.initialViews,
				callI = 0;
		
			var complete = function(){
				callI--;
				if(callI === 0){
					if(!_this.initialized){
						_this.initialized = true;
					}
		
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
				else{
					initialView = jQuery.extend({}, initialView);
				}
				
				if(!this.initialized){
					initialView.transition = 'transition-none';
				}
				this.navigateTo(this.getRootControl(), initialView, complete);
			}
		
	};
	
	/**
	 * @Protected
	 */
	AppProto._buildRootControl = function(){
		var _this = this;
		var navigatorOptions = this.config.data.rootNavigation;
		
		//Init default NavContainer
		var navContainerModule = navigatorOptions.module || "ui5strap.NavContainer";
		
		jQuery.sap.require(navContainerModule);
		var NavContainerConstructor = jQuery.sap.getObject(navContainerModule);
		if(!NavContainerConstructor){
			throw new Error('Invalid NavContainer: ' + navContainerModule);
		}
		
		var navContainerOptions = navigatorOptions.settings || {};
		if(navContainerOptions.id){
			navContainerOptions.id = this.config.createControlId(navContainerOptions.id);
		}
		
		var rootControl = new NavContainerConstructor(navContainerOptions);
		
		if(navigatorOptions.events && navigatorOptions.events.control){
			var eKeys = Object.keys(navigatorOptions.events.control),
				eKeysLength = eKeys.length;
			for(var i = 0; i < eKeysLength; i++){
				var evs = navigatorOptions.events.control[eKeys[i]];
				
				rootControl.attachEvent(eKeys[i], { "actions" : evs }, function(oEvent, data){
					
					for(var j = 0; j < data.actions.length; j ++){
						_this.runAction({
							"parameters" : data.actions[j], 
							"eventSource" : oEvent.getSource(),
							"eventParameters" : oEvent.getParameters()
						});
					}
					
					//console.log(data);
				});
			}
		}
		
		return rootControl;
	};
	
	AppProto.navigateTo = function (navControl, viewConfig, callback, suppressResolve) {
		this._rootComponent._navigateTo(navControl, viewConfig, callback, suppressResolve);
	};
	
	AppProto._navigateTo = function (navControl, viewConfig, callback, suppressResolve) {
		jQuery.sap.log.debug("AppBaseProto.navigateTo");
		
		if(!suppressResolve){
			viewConfig = this.config.getViewConfig(viewConfig);
		}
		
		//TODO use default target here...
		if(!viewConfig.target){
			viewConfig.target = navControl.defaultTarget;
		}
		
		if(!viewConfig.target){
			throw new Error('Cannot navigate to page: no "target" specified!');
		}
		
		if(navControl.isTargetBusy(viewConfig.target)){
			jQuery.sap.log.warning('[APP_FRAME] Cannot navigate: Target is busy: "' + viewConfig.target + '"');

			return false;
		}

		var _this = this,
			target = viewConfig.target,
			oPage = this.createView(viewConfig);

		//Set target busy
		navControl.setTargetBusy(target, true);

		//Trigger onUpdate events
		navControl.updateTarget(target, oPage, viewConfig.parameters);

		//Change NavContainer to page
		navControl.toPage(
			oPage, 
			target, 
			viewConfig.transition,
			function toPage_complete(){
				window.setTimeout(function(){
					//Set target available
					navControl.setTargetBusy(target, false);
				}, 50);
				
				//Trigger callback
				callback && callback();
			}
		);
		
		return oPage;
	};

	//Return Module Constructor
	return App;
	
});