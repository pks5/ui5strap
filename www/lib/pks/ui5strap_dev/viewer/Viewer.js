/*
 * 
 * UI5Strap
 *
 * ui5strap.Viewer
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

sap.ui.define(['./library', "../core/library", './ViewerBase', './App', './AppConfig', '../core/NavContainer', '../core/ResponsiveTransition', "../core/Utils", "../core/Layer"], 
				function(ui5strapViewerLib, ui5strapCoreLib, ViewerBase, App, AppConfig, NavContainer, ResponsiveTransition, Utils, Layer){
	
	"use strict";
	
	/**
	 * Constructor for a new Viewer instance.
	 * 
	 * @param {object} mOptions - Viewer options.
	 * 
	 * @class
	 * App module for system apps.
	 * @extends pks.ui5strap.viewer.ViewerBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.viewer.Viewer
	 * 
	 */
	var ViewerMulti = ViewerBase.extend("pks.ui5strap.viewer.Viewer"),
	/**
	 * @alias pks.ui5strap.viewer.Viewer.prototype
	 */
	ViewerMultiProto = ViewerMulti.prototype,
	domAttachTimeout = 50;

	//Private properties that are linked to the scope of the anonymous self executing function around this module
	//This prevents other apps from accessing data easily
	//@TODO these properties must be NON-STATIC! Currently they are STATIC.
	//@Static
	var _m_currentSapplication = null;
	var _m_loadedSapplicationsById = {};
	
	var _oInstance;
	
	ViewerMulti.load = function(mOptions, fnLoadCallback, fnStartCallback){
		if(!_oInstance){
			_oInstance = new ViewerMulti(mOptions);
			_oInstance.start(fnStartCallback, fnLoadCallback);
		}
	};

	/**
	 * Initializes the ViewerMulti instance
	 * @param viewerConfigUrl Url to viewer configuration file
	 * @Public
	 */
	ViewerMultiProto.init = function(){
		ViewerBase.prototype.init.call(this);
		
		
		this._initEvents();
	};
	
	var _waitForLibraryCss = function(_this, callback){
		var oNavContainerRef = _this.overlayControl.getDomRef(),
			bCssAvailable = false;
		
		if(oNavContainerRef){
			var sNavContainerHeight = Utils.getComputedStyle(oNavContainerRef, "height");
			
			//console.log(sNavContainerHeight, sOverlayWidth);	
				
			bCssAvailable = "100%" === sNavContainerHeight || -1 !== sNavContainerHeight.indexOf("px"); //|| _this._waitCssTime >= ui5strapCoreLib.options.timeoutWaitForCss;
		}
		
		if (bCssAvailable) {
			window.clearTimeout(_this._waitCssTimer);
			_this._waitCssTimer = null;
			
			callback && callback();
		} else {
			jQuery.sap.log
					.debug("Ui5Strap library CSS is not available yet...");

			_this._waitCssTimer = window.setTimeout(
					function() {
						_waitForLibraryCss(_this, callback);
					}, ui5strapCoreLib.options.intervalWaitForCss);
			_this._waitCssTime += ui5strapCoreLib.options.intervalWaitForCss;
		}
	};
	
	
	/**
	* Executes the the default app defined by configuration.
	* If the GET parameter "app" is specified with an url to an app config file, that app is loaded.
	* @Public
	*/
	ViewerMultiProto.start = function(callback, loadCallback, parameters){
		jQuery.sap.log.info("Starting Ui5Strap Viewer...");
		
		var _this = this;
		this.init();

		var appUrl = AppConfig.processOption("app", this.options.app);

		if(null === appUrl){
			throw new Error('Cannot start viewer: no app url specified.');
		}
		
		_this._waitCssTime = 0;
		_waitForLibraryCss(this, function(){
			_this.executeApp(
					{
						"internal" : true,
						"type" : "UI5STRAP",
						"url" : appUrl,
						"parameters" : parameters
					}, 
					false, 
					callback, 
					loadCallback
				);	
		});
		
	};

	/*
	* --------
	*
	* App Flow
	*
	* --------
	*/

	/**
	* Get the current (in foreground) running app
	* TODO make static?
	* @Public
	*/
	ViewerMultiProto.getApp = function(appId){
		return appId ? _m_loadedSapplicationsById[appId] : _m_currentSapplication;
	};

	/**
	 * @Public
	 */
	ViewerMultiProto.getLoadedApps = function(){
		return _m_loadedSapplicationsById;
	};

	/*
	 * EXECUTE APP
	 * This is the starting point when opening an app.
	 */
	
	/**
	* Load, start and show an App. The appUrl must point to a valid app.json file.
	* @Public
	*/
	ViewerMultiProto.executeApp = function(appDefinition, doNotShow, callback, loadCallback){
		jQuery.sap.log.debug("ViewerProto.executeApp");
		
		var _this = this,
			appType = appDefinition.type || "HTML5",
		
			/*
			 * 
			 */
			_loadAppComplete = function loadAppComplete(appInstance){
				loadCallback && loadCallback(appInstance);
				
			    var startedCallback = function(){
					if(!doNotShow){
						_this.showApp(appInstance.getId(), null, callback);
					}
					else{
						callback && callback(appInstance);
					}
				};
			
				if(!appInstance.isRunning){
					_this.startApp(appInstance.getId(), startedCallback);
				}
				else{
					startedCallback();
				}
			};
		
		//Process App Type
		//Valid App Types: "HTML5" and "UI5STRAP"
		if("HTML5" === appType){
			//HTML5 App: ordinary webapp that is executed within a Sandbox.
			
			if(
				!appDefinition.id 
				|| !appDefinition.url
			){
				throw new Error("Cannot execute HTML5 App: at least one of required attributes missing in definition.");
			}
			
			//Now load the App
			_this.loadApp(
				{
			        "app" : {
			        	"name" : appDefinition.name,
			            
			        	"id" : appDefinition.id,
			            "location" : appDefinition["location"] || Utils.getFileLocation(appDefinition.url),
			            
			            "type" : "pks.ui5strap.viewer.SandboxApp",
			            
			            "appURL" : appDefinition.url,
			            "propagateMessages" : true
			        },
		            "icons" : {
		            	"default" : appDefinition.icon
		            }
				}, 
				appDefinition.parameters,
				_loadAppComplete
			);
		}
		else if("SAPUI5" === appType){
			//Now load the App
			_this.loadApp(
				{
			        "app" : {
			            "name" : appDefinition.name,
			            
			            "id" : appDefinition.id,
			            "location" : appDefinition["location"],
			            
			            "type" : "pks.ui5strap.viewer.AppBase",
			            "rootComponent" : true,
			            "theme" : "sap_bluecrystal"
			        },
		            "icons" : {
		            	"default" : appDefinition.icon
		            }
				}, 
				appDefinition.parameters,
				_loadAppComplete
			);
		}
		else if("UI5STRAP" === appType){
			//Ui5Strap App
			
			if(appDefinition.internal){
				//Internal Ui5Strap App: Executed within same context like current app.
				
				if(appDefinition.id){
					//An ID is provided, so we can check whether app has been loaded already.
					if(_m_loadedSapplicationsById[appDefinition.id]){
						_loadAppComplete(_m_loadedSapplicationsById[appDefinition.id]);
						return;
					}
				}
				
				//Config URL provided, so load config data from the app.json file.
				jQuery.ajax({
					"dataType" : "json",
					"url" : appDefinition.url,
					"success" : function(oConfigData){
						oConfigData.app["location"] = appDefinition["location"] || Utils.getFileLocation(appDefinition.url);
						
						_this.loadApp(
							oConfigData, 
							appDefinition.parameters,
							_loadAppComplete
						);
					},
					"error" : function(err){
						throw new Error("Could not load app configuration from '" + appDefinition.url + "'!");
					}
				});
			}
			else{
				//External Ui5Strap App: Executed within a Sandbox.
				
				if(
					!appDefinition.id 
					|| (!appDefinition.launcher && !appDefinition.url)
				){
					throw new Error("Cannot execute external UI5STRAP App: at least one of required attributes missing in definition.");
				}
				
				//The Launcher is the HTML file which is executing the App.
				var appURL = appDefinition.launcher || "index.html",
					appLocation = appDefinition["location"];
				
				if(appDefinition.url){
					appURL += "?app=" + encodeURIComponent(appDefinition.url);
					
					if(!appLocation){
						 appLocation = Utils.getFileLocation(appDefinition.url);
					}
				}
				
				//Now load the App
				_this.loadApp(
					{
				        "app" : {
				            "name" : appDefinition.name,
				            
				            "id" : appDefinition.id,
				            "location" : appLocation,
				            
				            "type" : "pks.ui5strap.viewer.SandboxApp",
				            
				            "appURL" : appURL,
				            "propagateMessages" : true
				        },
			            "icons" : {
			            	"default" : appDefinition.icon
			            }
					}, 
					appDefinition.parameters,
					_loadAppComplete
				);
			}
		}
		else{
			throw new Error("Cannot execute App: Invalid Type: '" + appType + "'");
		}
	};
	
	/*
	 * LOAD APP
	 * Called by EXECUTE APP.
	 */
	
	/**
	* Loads an App by a given appUrl. The appUrl must point to a valid app.json file.
	* @Public
	*/
	ViewerMultiProto.loadApp = function(oConfigData, parameters, callback){
		jQuery.sap.log.debug("ViewerProto.loadApp");
		
		var _this = this,
			configAppSection = oConfigData.app;
		
		if(!configAppSection){
			throw new Error("Invalid app configuration: attribute 'app' is missing.");
		}
		
		configAppSection.logLevel && jQuery.sap.log.setLevel(configAppSection.logLevel);
		
		if(_m_loadedSapplicationsById[configAppSection.id]){
			return callback(_m_loadedSapplicationsById[configAppSection.id]);
		}
		
		var appConfig = new AppConfig(this.options, parameters);
		
		appConfig.setData(oConfigData);
		
		//Create App Instance
		_this.createApp(appConfig, function createAppComplete(appInstance){
			appInstance.init();

			_m_loadedSapplicationsById[appInstance.getId()] = appInstance;

			appInstance.load(function loadAppComplete(){
				callback && callback.call(_this, appInstance);
			});
		});
	};

	/*
	 * CREATE APP
	 * Called by LOAD APP if the app has not been loaded yet.
	 */
	
	/**
	* Creates a app instance
	* @param appConfig SappConfig instance
	* @Public
	*/
	ViewerMultiProto.createApp = function(appConfig, callback){
		jQuery.sap.log.debug("ViewerProto.createApp");
		
		var oConfigData = appConfig.data,
			libs = oConfigData.libraries,
			libCount = libs.length,
			configAppSection = oConfigData.app,
			_this = this,
			i;

		//Register Library Module Pathes
		for(i = 0; i < libCount; i++){
			var dependencyLib = libs[i];
			jQuery.sap.registerModulePath(dependencyLib["package"], appConfig.resolvePath(dependencyLib["location"], true));
		} 
		
		//Register App Module Path if location is provided
		configAppSection["location"] && jQuery.sap.registerModulePath(configAppSection["package"], configAppSection["location"]);

		sap.ui.require([configAppSection["type"].replace(/\./g, "/")], function(AppConstructor){
			callback && callback(new AppConstructor(appConfig, _this));
		});
	};
	
	/*
	 * START APP
	 * Called by EXECUTE APP if app has not been started yet.
	 */

	/**
	* Starts a previously loaded app.
	* @Public
	*/
	ViewerMultiProto.startApp = function(sappId, callback){
		jQuery.sap.log.debug("ViewerProto.startApp");
		
		var appInstance = this.getApp(sappId);
		
		if(null === appInstance){
			throw new Error('Cannot start app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			return appInstance;
		}

		appInstance.start(callback);
		
		return appInstance;
	};

	/*
	 * START APP
	 * Called by EXECUTE APP if app has not been shown yet.
	 */

	/**
	* Shows a previously started app, means bringing the app to foreground.
	* @Public
	*/
	ViewerMultiProto.showApp = function(sappId, transitionName, callback){
		jQuery.sap.log.debug("ViewerProto.showApp");
		
		if(this._loadingApp){
			jQuery.sap.log.warning("App '" + this._loadingApp + "' is currently loading."); 
			
			return;
		}

		var appInstance = this.getApp(sappId),
			_this = this;

		if(!appInstance){
			throw new Error('Cannot show app "' + sappId + '" - app not loaded.');
		}
		
		//Check if App is running
		if(!appInstance.isRunning){
			throw new Error('Cannot show a app which is not running.');
		}

		//If App has no Root Control, or is already visible, return immeadiately
		if(!appInstance.getRootControl() || appInstance.isVisible){
			callback && callback(appInstance);
			
			return;
		}
		
		var configAppSection = appInstance.config.data.app;
			
		//Set Browser Title
		//TODO Is this good here?
		document.title = configAppSection.name;
		
		//Store Previous App
		var prevApp = this.getApp();
		
		//Set the app as current foreground app				
		_m_currentSapplication = appInstance;
		this._loadingApp = appInstance;	

		//Create or Update App Container
		appInstance.updateContainer();

		var $currentRoot = prevApp ? prevApp.$() : this._dom.$viewer.find('.ui5strapApp');

		//Load app css
		appInstance.includeStyle(function includeStyle_complete(){
			
			jQuery.sap.log.debug("Attaching root to DOM...");
			
			//Append App to DOM is not yet
			appInstance.attach(_this._dom.$viewer[0]);
			
			//Create new Transition
			var transition = new ResponsiveTransition(
					{
					"transitionAll" : transitionName || configAppSection.transition || "zoom-out", 
					"$current" : $currentRoot, 
					"$next" : appInstance.$(), 
					id : appInstance.getId()
					}
			);
			
			transition.on("last", function(){
				var fnHidden = function(){
					//Current App onShown
					appInstance.shown(function(){
						//Show App Completed, trigger the Callback
						callback && callback.call(appInstance);
					});
				}
				
				if(prevApp){
					//Previous App onHidden
					prevApp.hidden(function(){
						_this.removeStyle(prevApp);
						
						fnHidden();
					});
				}
				else{
					if($currentRoot.length){
						//Remove splash screen.
						$currentRoot.remove();
						jQuery.sap.log.info("Splash screen removed.");
					}
					
					fnHidden();
				}
			});
			
			//<DOM_ATTACH_TIMEOUT>
			window.setTimeout(function setTimeout_complete(){
				
				//Previous App onHide
				prevApp && prevApp.hide();
				
				//Current App onShow
				appInstance.show(function(){
					
					//RAF start
					ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF1(){
						
						//Prepare Transition
						transition.prepare();
						
						//RAF
						ui5strapCoreLib.polyfill.requestAnimationFrame(function RAF2(){
							
							//Execure Transition
							transition.execute();
							
							//Set viewer to available
							_this._loadingApp = null;
							
							
						});

					});
					//RAF end
				});
				
			}, domAttachTimeout);
			//</DOM_ATTACH_TIMEOUT>

		});	
	
	};
	
	/*
	 * STOP APP
	 */
	
	/**
	* Stops a previously started app.
	* @Public
	*/
	ViewerMultiProto.stopApp = function(sappId){
		jQuery.sap.log.debug("ViewerProto.stopApp");
		
		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot stop app "' + sappId + '" - app not loaded.');
		}

		if ( this.getApp() === appInstance ) {
			throw new Error('Cannot stop app "' + sappId + '" - app is currently visible.');
		}
		
		appInstance.stop();
		
		return appInstance;
	};
	
	/*
	 * UNLOAD APP
	 * Destroys everything that has been previously loaded by the app.
	 */
	
	/**
	* Unloads an app
	* @Public
	*/
	ViewerMultiProto.unloadApp = function(sappId){
		jQuery.sap.log.debug("ViewerProto.unloadApp");
		
		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot unload app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			throw new Error('Cannot stop app "' + sappId + '" - app still running.');
		}
		
		appInstance.unload();
		
		delete _m_loadedSapplicationsById[sappId];

		return appInstance;
	};

	/**
	* Removes app specific style from the head.
	* @Public
	*/
	ViewerMultiProto.removeStyle = function(appInstance){
		if(!appInstance.isVisible && 
			!appInstance.isVisibleInOverlay && 
			!appInstance.isVisibleEmbedded){
			appInstance.removeStyle();
		}
	};

	/*
	* ------------
	*
	* App Messages
	*
	* ------------
	*/
	
	/**
	 * Sends a message to one or multiple Apps that run within this Viewer instance
	 * @Public
	 */
	ViewerMultiProto.sendMessage = function(appMessage){
		if(!appMessage 
			|| !appMessage.receiver 
			|| !appMessage.sender
			|| !appMessage.message){
			//jQuery.sap.log.error("Cannot send message: parameters are missing.");
			return;
		}
		
		var receivers = appMessage.receiver;
		if(typeof receivers === 'string'){
			receivers = [receivers];
		}
		
		for(var i = 0; i < receivers.length; i++){
			var receiverAppId = receivers[i];
			var app = this.getApp(receiverAppId);

			if(app){
				app.onMessage(new sap.ui.base.Event("ui5strap.app.message", null, appMessage));
			}
			else{
				jQuery.sap.log.error("Cannot send message to app " + receiverAppId);
			}
			
	    }

	    if(appMessage.export && self !== top){
	    	//Send the Message as Html Frame Message to the Frame parent.
	    	//TODO more precise origin control
	    	delete appMessage.export;
	    	parent.postMessage(appMessage, '*');
	    }
	};

	/*
	* -------------
	*
	* Global Loader
	*
	* -------------
	*/

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerMultiProto.showLoader = function(callback){
		Layer.setVisible(ViewerBase.LOADER_ID, true, callback);
	};

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerMultiProto.hideLoader = function(callback){
		Layer.setVisible(ViewerBase.LOADER_ID, false, callback);
	};

	/*
	* -------------
	*
	* TODO
	*
	* -------------
	*/

	

	/**
	* Inititalizes the events
	* @Protected
	*/
	ViewerMultiProto._initEvents = function(){
		var _this = this;
		
		/*
		jQuery(document)
		
		
		.on('keyup', function(e) {
	      		var evtobj = window.event? window.event : e

	      		jQuery.sap.log.debug("Key pressed: " + evtobj.keyCode);

	      		if (evtobj.keyCode === 84){
	      			var apps = _m_loadedSapplicationsById;

	      			for(var appUrl in apps){
	      				apps[appUrl].fireEventAction({ 
							"scope" : "app",
							"eventName" : "keyUp",
							"eventData" : evtobj
						});
	      			};


	      		}
	      		else if (evtobj.keyCode === 67){
	      			//Key 'c'
	      			if(_this._console){
		      			if(_this.isOverlayVisible()){ 
		      				_this.hideOverlay();
		      			}
		      			else{
		      				_this.showConsole();
		      			}
	      			}		
	      		}
	      		else if (evtobj.keyCode === 70){
	      			//Key 'f'
	      			_this.requestFullscreen();
	      		}
			}
		);
		*/
		
		/*
		.on('swipeupdown', function anon_eventSwipeUpDown(eventData){

				var appInstances = _m_loadedSapplicationsById;

	      			for(var appUrl in appInstances){
	      				appInstances[appUrl].fireEventAction({ 
							"scope" : "app",
							"eventName" : "swipeUpDown",
							"eventData" : eventData
						});
	      			};
		});
		*/
		
		//Listen to Frame Messages
		window.addEventListener(
			"message", 
			function(event){
				var appMessage = event.data;
				if(appMessage 
					&& appMessage.receiver 
					&& appMessage.sender
					&& appMessage.message){
					
					appMessage.origin = event.origin;
					
					_this.sendMessage(appMessage);
				}
			}, 
			false
		);
		
		//Listen to Resize Events
		window.addEventListener(
			"resize", 
			function(event){
				var appIds = Object.keys(_m_loadedSapplicationsById);
				for(var i = 0; i < appIds.length; i++){
					_m_loadedSapplicationsById[appIds[i]].onResize(new sap.ui.base.Event("ui5strap.app.resize", null, {}));
				}
			},
			false
		);
		
		//Listen to Hash Change Events
		window.addEventListener(
			"hashchange", 
			function(event){
				_this.getApp().onHashChange(new sap.ui.base.Event("ui5strap.app.hashChange", null, {}));
			}
		);
		
		window.addEventListener(
			"error", function(e) { 
			  _this._dom.$fatal.append("<span>" + e.message + " in " + e.filename + " on line " + e.lineno + "</span>").removeClass("ui5strap-hidden");
		}, false);
		
	};
	
	return ViewerMulti;
});