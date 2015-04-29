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

(function(){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.App');

	jQuerySap.require("ui5strap.library");

	jQuerySap.require("ui5strap.AppBase");
	jQuerySap.require("ui5strap.AppComponent");
	
	jQuerySap.require("sap.ui.core.mvc.HTMLView");
	jQuerySap.require("sap.ui.core.CustomData");
	jQuerySap.require("sap.ui.model.resource.ResourceModel");
	jQuerySap.require("sap.ui.model.json.JSONModel");
	
	ui5strap.AppBase.extend('ui5strap.App', {
		"constructor" : function(config, viewer){
			ui5strap.AppBase.call(this, config, viewer);
			
			//Init local vars
			this._runtimeData = {
				"theme" : null,
				"css" : {},
				"js" : {}
			};

		}
	});

	var App = ui5strap.App,
		AppProto = App.prototype,
		AppConfig = ui5strap.AppConfig;

	/*
	* ------------------------------------------------
	* --------------------- Events -------------------
	* ------------------------------------------------
	*/

	/*
	* Preload resources e.g. images and json files
	* @protected
	*/
	var _preloadViews = function(views, callback){
		//TODO use Object.keys
		var viewsLeft = 0;
		for(var viewSrc in views){
			viewsLeft++;
		}

		if(!views || 0 === viewsLeft){
			callback && callback();
		}

		var consoleOutput = '';

		var viewCallback = function(){
			viewsLeft -- ;
			if(viewsLeft === 0){
				callback && callback();
			}
		};

		for(var viewSrc in views){
			var viewConfig = views[viewSrc];
			if(viewConfig.preload && 'HTML' === viewConfig.type){
				//We are currently only able to cache HTML views
				var viewUrl = sap.ui.core.mvc.HTMLView._getViewUrl(viewSrc);

				if(viewUrl in sap.ui.core.mvc.HTMLView._mTemplates){
					viewCallback();
				}
				else{ 
					jQuery.ajax({
							"url" : viewUrl,
							"viewSrc" : viewSrc,
							"cache" : true,
							"dataType" : "text",
							"success" : function(text){
								consoleOutput += '"' + this.viewSrc + '" ';
								
								//TODO
								//Find a better way to preload HTML views!
								sap.ui.core.mvc.HTMLView._mTemplates[this.url] = text;
								
								viewCallback();
							},
								
							"error" : viewCallback
					});	
				}
				
			}
			else{
				viewCallback();
			}
		} 
	};

	AppProto.preload = function(callback){
		var _this = this;
		ui5strap.AppBase.prototype.preload.call(this, function(){
			_this.includeStyle(function includeStyle_complete(){
				_this.log.debug("PRELOADING VIEWS...");
				
				_preloadViews(_this.config.data.views, callback);
			});
		});
	};

	AppProto.show = function(callback){
		var _this = this;
		ui5strap.AppBase.prototype.show.call(this, function(firstTime){
			if(firstTime && _this.getFrame && _this.getFrame()){
				_this.getFrame().showInitialContent(callback);
			}
			else{
				callback && callback();
			}
		});
	};

	/*
	* Triggered when a view of the app is shown in the global overlay
	* @public
	*/
	AppProto.onShowInOverlay = function(oEvent){ 
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "showOverlay",
			"orgEvent" : oEvent 
		});

	};

	/*
	* Triggered when a view of the app is hidden from the global overlay
	* @public
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

	/*
	* Include the style that is neccessary for this app
	* @public
	*/
	AppProto.includeStyle = function(callback){
		var _this = this;
		var configData = this.config.data;
		if(configData.app.theme){ 
			this.setTheme(configData.app.theme);
		}
		
		var cssKeys = Object.keys(configData.css);
		var callbackCount = cssKeys.length;

		if(callbackCount === 0){
			callback && callback.call(this);

			return;
		}

		
		var error = function(e){
			alert('Could not load style!');
			throw e;
		};

		var callbackI = 0;

		var success = function(){
			callbackI++;
			if(callbackI === callbackCount){
				callback && callback.call(_this);
			}
		};

		var loadStyles = [];
		for(var i = 0; i < callbackCount; i++){
			var cssKey = cssKeys[i],
				cssPath = this.config.resolvePath(configData.css[cssKey]);

			cssKey = 'css--' + this.getId() + '--' + cssKey;

			if(! ( cssKey in this._runtimeData.css ) ){	
				this.log.debug('LOADING CSS "' + cssPath + '"');
					
				this._runtimeData.css[cssKey] = cssPath;
			//	loadStyles.push(cssPath);
				jQuery.sap.includeStyleSheet(cssPath, cssKey, success, error);
			}
			
			else{
				this.log.debug("Css stylesheet '" + cssPath + "' already included.");
				success();
			}
		}
	};

	AppProto.removeStyle = function(){
		for(var cssKey in this._runtimeData.css){
			jQuery('link#' + cssKey).remove();
			delete this._runtimeData.css[cssKey];
			this.log.info("Css stylesheet '" + cssKey + "' removed.");
		}
	};

	/*
	* Sets the theme of the app
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
		sap.ui.getCore().applyTheme(themeName, this.config.options.pathToThemeRoot);

		this.log.debug("Theme '" + themeName + "' set.");
	};

	/*
	* -------------------------------------------------------------
	* --------------------- Controls ------------------------------
	* -------------------------------------------------------------
	*/
	
	AppProto.getRootControl = function(){
		
		if(!this.getFrame || !this.getFrame()){
			throw new Error('Cannot determine root Control of the App: no Frame is set. Please set a AppFrame or override ui5strap.App.prototype.getRootControl in your own App instance.')
		}

		var control = this.getFrame().getControl();
		if(!control){
			throw new Error('Cannot determine root Control of the App: No frame control is set in the Frame.');
		}

		return control;
	};

}());