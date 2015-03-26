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
		"constructor" : function(config){
			ui5strap.AppBase.call(this, config);
			
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
				jQuery.sap.log.debug("[APP] PRELOAD VIEWS " + consoleOutput);
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

	/*
	* Load the app
	*/
	AppProto.load = function(callback){
		jQuerySap.log.debug('[APP] LOADING THE APP');

		var _this = this,
			_configData = this.config.data,
			appBase = _configData.app['location'];

		this.preload(function(){
			_this.getRootControl().placeAt(_this.config.options.container);
			
			_this.includeStyle(function includeStyle_complete(){
				_preloadViews(_configData.views, function preloadViews_complete(){
					
					_this.onLoad(new sap.ui.base.Event("ui5strap.app.load", _this, {}));
				
					callback && callback.call(_this);
				});
			});
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
		//TODO Replace by normal for loop 
		for(var i = 0; i < callbackCount; i++){
			var cssKey = cssKeys[i],
				cssPath = this.config.resolvePath(configData.css[cssKey]);

			cssKey = 'css--' + this.getId() + '--' + cssKey;

			if(! ( cssKey in this._runtimeData.css ) ){	
				this.log.debug('[APP] LOAD CSS "' + cssPath + '"');
					
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