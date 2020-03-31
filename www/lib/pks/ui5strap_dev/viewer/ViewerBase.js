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
	 * @version 1.0.2-SNAPSHOT
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
				this._console = new Console({ logLevel : SAP_LOG.getLevel() });
			}
			
			this.m_mSharedComponents = {};
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.ViewerBase.prototype
	 */
	ViewerBaseProto = ViewerBase.prototype,
	SAP_LOG = jQuery.sap.log;
	
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
		Layer.register(ViewerBase.FATAL_ID);
		
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
				SAP_LOG.debug(message);
			},

			warning : function (message, logName) {
				_this._console.warning(message, logName);
				SAP_LOG.warning(message);
			},

			error : function (message, logName) {
				_this._console.error(message, logName);
				SAP_LOG.error(message);
			},

			info : function (message, logName) {
				_this._console.info(message, logName);
				SAP_LOG.info(message);
			},

			fatal : function (message, logName) {
				_this._console.fatal(message, logName);
				SAP_LOG.fatal(message);
			}
		} :		
				
		{
			debug : function (message) {
				SAP_LOG.debug(message);
			},

			warning : function (message) {
				SAP_LOG.warning(message);
			},

			error : function (message) {
				SAP_LOG.error(message);
			},

			info : function (message) {
				SAP_LOG.info(message);
			},

			fatal : function (message) {
				SAP_LOG.fatal(message);
			}
		};
	};
	
	ViewerBaseProto.registerSharedComponent = function(sId, oComp){
		this.m_mSharedComponents[sId] = oComp;
	};
	
	ViewerBaseProto.getSharedComponent = function(sId){
		return this.m_mSharedComponents[sId];
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
			elRootContainer = document.getElementById(this.options.container);
		
		if(!elRootContainer){
			throw new Error("Cannot find root container: " + this.options.container);
		}
		
		var $oRootContainer = jQuery(elRootContainer),
			$oViewer = $oRootContainer.find(".ui5strapViewer");

		if($oViewer.length === 0){
			var elViewer = document.createElement("div");
			elViewer.className = "ui5strapViewer";
			$oViewer = jQuery(elViewer);
			elRootContainer.appendChild(elViewer);
		}
		
		var elGlobalOverlay = document.getElementById(ViewerBase.OVERLAY_ID);
			
		if(!elGlobalOverlay){
			elGlobalOverlay = document.createElement("div");
			elGlobalOverlay.id = ViewerBase.OVERLAY_ID;
			elGlobalOverlay.className = "ui5strapOverlay ui5strapLayer ui5strap-hidden";
			
			var elGlobalOverlayBackdrop = document.createElement("div");
			elGlobalOverlayBackdrop.id = ViewerBase.OVERLAY_ID + "-backdrop";
			elGlobalOverlayBackdrop.className = "ui5strapOverlay-backdrop";
			elGlobalOverlay.appendChild(elGlobalOverlayBackdrop);
			
			var elGlobalOverlayContent = document.createElement("div");
			elGlobalOverlayContent.id = ViewerBase.OVERLAY_ID + "-content";
			elGlobalOverlayContent.className = "ui5strapOverlay-content";
			elGlobalOverlay.appendChild(elGlobalOverlayContent);
			
			elRootContainer.appendChild(elGlobalOverlay);
		}
		
		var elGlobalLoader = document.getElementById(ViewerBase.LOADER_ID);
		
		if(!elGlobalLoader){
			elGlobalLoader = document.createElement("div");
			elGlobalLoader.id = ViewerBase.LOADER_ID;
			elGlobalLoader.className = "ui5strapLayer ui5strapLoader ui5strap-hidden";
			
			elRootContainer.appendChild(elGlobalLoader);
		}
		
		var elFatalScreen = document.getElementById(ViewerBase.FATAL_ID);
		
		if(!elFatalScreen){
			elFatalScreen = document.createElement("div");
			elFatalScreen.id = ViewerBase.FATAL_ID;
			elFatalScreen.className = "ui5strapLayer ui5strap-hidden";
			
			elRootContainer.appendChild(elFatalScreen);
		}
		
		this._dom = {
			root : elRootContainer,
			viewer : $oViewer[0],
			globalOverlay : elGlobalOverlay,
			fatalScreen : elFatalScreen
		};
	};
	
	ViewerBaseProto.showFatalError = function(e){
		var elFatalScreen = this._dom.fatalScreen,
			elWindow = document.createElement("div"),
			elErrorMessage = document.createElement("div"),
			elReloadButton = document.createElement("button"),
			sErrorMessage = e.message;
		
		//Window
		elWindow.id = "ui5strapFatalErrorWindow";

		if(e.image){
			//Image
			var elImageContainer = document.createElement("div"),
				elImage = document.createElement("img");
			
			elImageContainer.id = "ui5strapFatalErrorImageContainer";
				
			elImage.id = "ui5strapFatalErrorImage";
			elImage.src = e.image;
			elImageContainer.appendChild(elImage);

			elWindow.appendChild(elImageContainer);
		}

		if(e.lineno){
			sErrorMessage = e.message + " in " + e.filename + " on line " + e.lineno;
		}

		//Message
		elErrorMessage.id = "ui5strapFatalErrorMessage";
		elErrorMessage.innerHTML = sErrorMessage;
		elWindow.appendChild(elErrorMessage);
		
		//Reload Button
		elReloadButton.id = "ui5strapFatalErrorButton";
		elReloadButton.innerHTML = "Reload";
		elReloadButton.onclick = function(){
			location.reload();
		};
		elWindow.appendChild(elReloadButton);
		
		//Add window to screen
		elFatalScreen.innerHTML = '';
		elFatalScreen.appendChild(elWindow);
		
		Layer.setVisible(ViewerBase.FATAL_ID, true);
	};
	
	ViewerBaseProto.hideFatalError = function(){
		Layer.setVisible(ViewerBase.FATAL_ID, false);
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