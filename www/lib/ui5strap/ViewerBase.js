/*
 * 
 * UI5Strap
 *
 * ui5strap.ViewerBase
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
 

sap.ui.define(['./library', 'sap/ui/base/Object'], function(library, ObjectBase){
	
	var ViewerBase = ObjectBase.extend('ui5strap.ViewerBase', {
		"constructor" : function(options){
			sap.ui.base.Object.apply(this);
			
			if(!options.app){
				throw new Error("Please specify the default app in the Viewer Options!");
			}
			
			//Device Log Level
			if(!options.logLevel){
				options.logLevel = 0;
			}

			//Error to Browser
			if(!options.errorToBrowser){
				options.errorToBrowser = false;
			}
			
			if(!options.container){
				//Default container dom id
				options.container = "ui5strap-container";
			}

			if(!options.overlay){
				//Default overlay dom id
				options.overlay = "ui5strap-overlay";
			}
			
			if(!options.environments){
				options.environments = {
						local : {
							pathToServerRoot : ".",
							pathToStaticRoot : ".",
							pathToThemeRoot : "./theme"
						}
				}
			}

			if(!options.environment){
				options.environment = "local";
			}
			
			this.options = options;
		}
	}),
	ViewerBaseProto = ViewerBase.prototype;
	
	/**
	 * Initialzer
	 * @Public
	 */
	ViewerBaseProto.init = function(){
		//Register Loader Layer
		ui5strap.Layer.register('ui5strap-loader');
  		
		this._initOverlay();
	};

	/**
	 * @Public
	 */
	ViewerBaseProto.start = function(callback, loadCallback){
		throw new Error("Please inherit ui5strap.ViewerBase.prototype.start in your Viewer instance.");
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Global Overlay ---------------------------------
	* ----------------------------------------------------------------------
	*/

	/**
	* Inititalzes the overlay
	* @Protected
	*/
	ViewerBaseProto._initOverlay = function(){
		var _this = this;
		
		ui5strap.Layer.register(this.options.overlay);

		this.overlayControl = new ui5strap.NavContainer();
		this.overlayControl.placeAt(this.options.overlay + '-content');

		jQuery('#' + this.options.overlay + '-backdrop').on('tap', function onTap(event){
			_this.hideOverlay();
		});
	};

	/**
	* Returns whether the overlay layer is visible
	* @Public
	*/
	ViewerBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.options.overlay);
	};

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerBaseProto.showOverlay = function(viewDataOrControl, callback, transitionName){
		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'transition-slide-ttb';
		
		ui5strap.Layer.setVisible(this.options.overlay, true, function(){
			if(viewDataOrControl instanceof ui5strap.Control){
				//Control is directly injected into the frame
				overlayControl.toPage(viewDataOrControl, "content", transitionName, callback);
			}
			else{ 
				//viewDataOrControl is a data object
				if("appId" in viewDataOrControl){
					var viewApp = _this.getApp(viewDataOrControl.appId);
					if(null === viewApp){
						throw new Error('Invalid app: ' + viewDataOrControl.appId);
					}
					//View from a app
					viewApp.includeStyle(function includeStyle_complete(){
						var viewConfig = viewApp.config.getViewConfig(viewDataOrControl),
							view = viewApp.createView(viewConfig);

						overlayControl.toPage(view, 'content', transitionName, function(){
							viewApp.isVisibleInOverlay = true;

							viewApp.onShowInOverlay(new sap.ui.base.Event("ui5strap.app.showInOverlay", viewApp, { 
								view : view, 
								viewConfig : viewConfig
							}));
							
							callback && callback();	
						});
					});
				}
				else{
					//TODO How should this work here?
					overlayControl.toPage(viewDataOrControl, 'content', transitionName, callback);
				}
			}
		});
	};

	/**
	* Hides the overlay layer
	* @Public
	*/
	ViewerBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			page = overlayControl.targets["content"],
			transitionName = transitionName || 'slide-btt';
		
		overlayControl.toPage(null, 'content', transitionName, function toPage_complete(){
			ui5strap.Layer.setVisible(_this.options.overlay, false, function(){
				if(page instanceof sap.ui.core.mvc.View){
					var pageViewData = page.getViewData();
					if(pageViewData.app){
						var viewApp = pageViewData.app;
						viewApp.isVisibleInOverlay = false;
						viewApp.onHideInOverlay(new sap.ui.base.Event("ui5strap.app.hideInOverlay", viewApp, {})); 
						_this.removeStyle(viewApp);
					}
				}

				callback && callback();
			});
		});	
	};
	
	/*
	* ----------------------------------------------------------------------
	* --------------------- Settings  ----------------------------------
	* ----------------------------------------------------------------------
	*/
	
	/**
	 * @Public
	 */
	ViewerBaseProto.setLanguage = function(language){
		//sap.ui.getCore().getConfiguration().setLanguage(language);
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Browser Flow  ----------------------------------
	* ----------------------------------------------------------------------
	*/
	
	/**
	*	Replaces the current browser content and opens a app defined in viewer config
	* @param sappId Sapplication ID
	* TODO Remove?
	* @deprecated
	*/
	ViewerBaseProto.openSapplication = function(appUrl){
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
		var appUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();

		this.exitViewer(appUrl);
	};
	
	/**
	* Changes the browser URL to an (external) url
	* @param url The URL to browse to
	* @Public
	*/
	ViewerBaseProto.exitViewer =  function(url){
		window.location.href = url; 
	};

	/**
	* Request the client's browser to switch to full screen mode
	* @Public
	*/  
	ViewerBaseProto.requestFullscreen =  function(element){
		if(typeof element === 'undefined'){
			element = document.documentElement;
		}
		if(element.requestFullscreen) {
	    	element.requestFullscreen();
	  	} else if(element.mozRequestFullScreen) {
	    	element.mozRequestFullScreen();
	  	} else if(element.webkitRequestFullscreen) {
	    	element.webkitRequestFullscreen();
	  	} else if(element.msRequestFullscreen) {
	    	element.msRequestFullscreen();
	  	}
	};

	//End ViewerBase
	
	return ViewerBase;
});