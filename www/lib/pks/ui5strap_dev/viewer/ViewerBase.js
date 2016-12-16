/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.ViewerBase
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
 

sap.ui.define(['./library', 'sap/ui/base/Object', "sap/ui/core/Control", "./Console", "../core/Layer", "../core/NavContainer"], function(ui5strapViewerLib, ObjectBase, ControlBase, Console, Layer, NavContainer){
	
	"use strict";
	
	/**
	 * Constructor for a new ViewerBase instance.
	 * 
	 * @param {object} mOptions - Viewer options.
	 * 
	 * @class
	 * Abstract base class for viewers.
	 * @extends sap.ui.base.Object
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.ViewerBase
	 * 
	 */
	var ViewerBase = ObjectBase.extend('pks.ui5strap.viewer.ViewerBase', /** @lends pks.ui5strap.viewer.ViewerBase.prototype */{
		/**
		 * @constructs
		 */
		"constructor" : function(options){
			sap.ui.base.Object.apply(this);
			
			if(!options.app || !options.container){
				throw new Error("Missing required viewer options 'app' or 'container'.");
			}
			
			//Error to Browser
			if(!options.errorToBrowser){
				options.errorToBrowser = false;
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
			
			//Initialize the Console
			if(options.console){
				this._console = new Console({ logLevel : jQuery.sap.log.getLevel() });
			}
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.ViewerBase.prototype
	 */
	ViewerBaseProto = ViewerBase.prototype;
	
	ViewerBase.OVERLAY_ID = "ui5strapGlobalOverlay";
	ViewerBase.LOADER_ID = "ui5strapGlobalLoader";
	ViewerBase.FATAL_ID = "ui5strapFatalError";
	
	/**
	 * Initialzer
	 * @Public
	 */
	ViewerBaseProto.init = function(){
		this._initLog();
		
		this._initDom();
		
		//Register Loader Layer
		Layer.register(ViewerBase.LOADER_ID);
  		
		this._initOverlay();
	};
	
	/*
	* Init sapplication specific logging
	* @protected
	*/
	ViewerBaseProto._initLog = function(){
		var _this = this;
		this.log = this._console ? 
		
		{
			debug : function (message, logName) {
				_this._console.debug(message, logName);
				jQuery.sap.log.debug(message);
			},

			warning : function (message, logName) {
				_this._console.warning(message, logName);
				jQuery.sap.log.warning(message);
			},

			error : function (message, logName) {
				_this._console.error(message, logName);
				jQuery.sap.log.error(message);
			},

			info : function (message, logName) {
				_this._console.info(message, logName);
				jQuery.sap.log.info(message);
			},

			fatal : function (message, logName) {
				_this._console.fatal(message, logName);
				jQuery.sap.log.fatal(message);
			}
		} :		
				
		{
			debug : function (message) {
				jQuery.sap.log.debug(message);
			},

			warning : function (message) {
				jQuery.sap.log.warning(message);
			},

			error : function (message) {
				jQuery.sap.log.error(message);
			},

			info : function (message) {
				jQuery.sap.log.info(message);
			},

			fatal : function (message) {
				jQuery.sap.log.fatal(message);
			}
		};
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
	* Inititalizes the dom cache
	* @Protected
	*/
	ViewerBaseProto._initDom = function(){
		var _this = this,
			$oRootContainer = jQuery('#' + this.options.container);
		
		if($oRootContainer.length === 0){
			throw new Error("Cannot find root container: " + this.options.container);
		}
		
		var $oViewer = $oRootContainer.find(".ui5strapViewer");

		if($oViewer.length === 0){
			var oViewerElement = document.createElement("div");
			oViewerElement.className = "ui5strapViewer";
			$oViewer = jQuery(oViewerElement);
			$oRootContainer.append($oViewer);
		}
		
		var $oGlobalOverlay = $oRootContainer.find("#" + ViewerBase.OVERLAY_ID);
			
		if($oGlobalOverlay.length === 0){
			$oGlobalOverlay = jQuery('<div id="' + ViewerBase.OVERLAY_ID + '" class="ui5strapOverlay ui5strapLayer ui5strap-hidden">'
					+ '<div id="' + ViewerBase.OVERLAY_ID + '-backdrop" class="ui5strapOverlay-backdrop"></div>'
					+ '<div id="' + ViewerBase.OVERLAY_ID + '-content" class="ui5strapOverlay-content"></div>'
				+ '</div>');
			
			$oRootContainer.append($oGlobalOverlay);
		}
		
		var $oGlobalLoader = $oRootContainer.find("#" + ViewerBase.LOADER_ID);
		
		if($oGlobalLoader.length === 0){
			$oGlobalLoader = jQuery('<div id="' + ViewerBase.LOADER_ID + '" class="ui5strapLayer ui5strapLoader ui5strap-hidden"></div>');
			
			$oRootContainer.append($oGlobalLoader);
		}
		
		var $oGlobalFatalScreen = $oRootContainer.find("#" + ViewerBase.FATAL_ID);
		
		if($oGlobalFatalScreen.length === 0){
			$oGlobalFatalScreen = jQuery('<div id="' + ViewerBase.FATAL_ID + '" class="ui5strapLayer ui5strap-hidden"></div>');
			
			$oRootContainer.append($oGlobalFatalScreen);
		}
		
		this._dom = {
			$body : jQuery(document.body),
			$root : $oRootContainer,
			$viewer : $oViewer,
			$overlay : $oGlobalOverlay,
			$loader : $oGlobalLoader,
			$fatal : $oGlobalFatalScreen
		};
	};
	
	/**
	* Inititalzes the overlay
	* @Protected
	*/
	ViewerBaseProto._initOverlay = function(){
		var _this = this;
		
		Layer.register(ViewerBase.OVERLAY_ID);

		this.overlayControl = new NavContainer();
		this.overlayControl.placeAt(ViewerBase.OVERLAY_ID + '-content');

		jQuery('#' + ViewerBase.OVERLAY_ID + '-backdrop').on('tap', function onTap(event){
			_this.hideOverlay();
		});
	};

	/**
	* Returns whether the overlay layer is visible
	* @Public
	*/
	ViewerBaseProto.isOverlayVisible = function(){
		return Layer.isVisible(ViewerBase.OVERLAY_ID);
	};

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerBaseProto.showOverlay = function(oPageConfigOrControl, callback, transitionName){
		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'slide-ttb';
		
		Layer.setVisible(ViewerBase.OVERLAY_ID, true, function(){
			if(oPageConfigOrControl instanceof ControlBase){
				//Control is directly injected into the frame
				overlayControl.toPage(oPageConfigOrControl, "content", transitionName, callback);
			}
			else{ 
				//oPageConfigOrControl is a data object
				if("appId" in oPageConfigOrControl){
					var oPageApp = _this.getApp(oPageConfigOrControl.appId);
					if(null === oPageApp){
						throw new Error('Invalid app: ' + oPageConfigOrControl.appId);
					}
					//View from a app
					oPageApp.includeStyle(function includeStyle_complete(){
						var mPageConfig = oPageApp.config.getPageConfig(oPageConfigOrControl),
							view = oPageApp.createPage(mPageConfig),
							target = overlayControl.defaultTarget;
						
						//Set target busy
						overlayControl.setTargetBusy(target, true);
						
						//Trigger onUpdate events
						overlayControl.updateTarget(target, view, {});
						
						view.loaded().then(function(){
							overlayControl.toPage(view, 'content', transitionName, function(param){
								oPageApp.isVisibleInOverlay = true;
								
								//Set target available
								overlayControl.setTargetBusy(target, false);
								
								param.oldPage && oPageApp.detachPage(param.oldPage);

								oPageApp.onShowInOverlay(new sap.ui.base.Event("ui5strap.app.showInOverlay", oPageApp, { 
									view : view, 
									viewConfig : mPageConfig
								}));
								
								callback && callback();	
							});
						});
					});
				}
				else{
					//TODO How should this work here?
					overlayControl.toPage(oPageConfigOrControl, 'content', transitionName, callback);
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
			Layer.setVisible(ViewerBase.OVERLAY_ID, false, function(){
				if(page instanceof sap.ui.core.mvc.View){
					var pageViewData = page.getViewData();
					if(pageViewData.app){
						var oPageApp = pageViewData.app;
						oPageApp.isVisibleInOverlay = false;
						oPageApp.onHideInOverlay(new sap.ui.base.Event("ui5strap.app.hideInOverlay", oPageApp, {})); 
						_this.removeStyle(oPageApp);
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
	* Get the Viewer Console control reference.
	* @public
	*/
	ViewerBaseProto.getConsole = function(){
		return this._console;
	};
	
	/**
	 * Shows the Viewer Console.
	 */
	ViewerBaseProto.showConsole = function(){
		var viewerConsole = this._console;
		viewerConsole.setCurrentLog(this.getApp().getId());
		this.showOverlay(viewerConsole, function(){
				viewerConsole.flush();
		});
	}

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