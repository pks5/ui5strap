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

sap.ui.define(['./library', './ViewerBase', './App', './AppConfig', './NavContainer', './ResponsiveTransition'], 
				function(library, ViewerBase, App, AppConfig, NavContainer, ResponsiveTransition){
	
	var ViewerMulti = ViewerBase.extend("ui5strap.Viewer", {
		"constructor" : function(options){
			ViewerBase.call(this, options);

			this._loadedLibraries = {};
			this._loadingSapplication = null;

			this._dom = null;
			
			this._console = null;
		}
	}),
	ViewerMultiProto = ViewerMulti.prototype,
	domAttachTimeout = 50;

	//Private properties that are linked to the scope of the anonymous self executing function around this module
	//This prevents other apps from accessing data easily
	//@TODO these properties must be NON-STATIC! Currently they are STATIC.
	//@Static
	var _m_currentSapplication = null;
	var _m_loadedSapplicationsById = {};
	


	/**
	 * Initializes the ViewerMulti instance
	 * @param viewerConfigUrl Url to viewer configuration file
	 * @Public
	 */
	ViewerMultiProto.init = function(){
		ViewerBase.prototype.init.call(this);
		
		//Init methods
		//TOOO Move to Viewer base
		this._initDom();
		this._initConsole();
		this._initEvents();
	};

	/**
	* Executes the the default app defined by configuration.
	* If the GET parameter "app" is specified with an url to an app config file, that app is loaded.
	* @Public
	*/
	ViewerMultiProto.start = function(callback, loadCallback, parameters){
		jQuery.sap.log.debug("ViewerProto.start");
		
		this.init();

		var appUrl = AppConfig.processOption("app", this.options.app);

		if(null === appUrl){
			throw new Error('Cannot start viewer: no app url specified.');
		}

		this.executeApp(
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
			    loadCallback && loadCallback();
				
			    var startedCallback = function(){
					if(!doNotShow){
						_this.showApp(appInstance.getId(), null, callback);
					}
					else{
						//_this.hideLoader(callback);
						callback && callback(appInstance);
					}
				};
			
			//_this.showLoader(function(){
				if(!appInstance.isRunning){
					_this.startApp(appInstance.getId(), startedCallback);
				}
				else{
					startedCallback();
				}
			//});
	
			},
			
			/*
			 * 
			 */
			_loadApp = function loadAppConfigComplete(oConfigData){
				_this.loadApp(
					appDefinition.url,
					oConfigData, 
					appDefinition.parameters,
					_loadAppComplete
				);
			};
		
		//Process App Type
		//Valid App Types: "HTML5" and "UI5STRAP"
		if("HTML5" === appType){
			//HTML5 App: ordinary webapp that is executed within a Sandbox.
			
			if(
				!appDefinition.name 
				|| !appDefinition.id 
				|| !appDefinition.package 
				|| !appDefinition.url
			){
				throw new Error("Cannot execute HTML5 App: at least one of required attributes missing in definition.");
			}
			
			//Now load the App
			_loadApp({
		        "app" : {
		        	"name" : appDefinition.name,
		            "id" : appDefinition.id,
		            "package" : appDefinition.package,
		            "module" : "ui5strap.AppSandbox",
		            "appURL" : appDefinition.url,
		            "propagateMessages" : true
		        },
	            "icons" : {
	            	"default" : appDefinition.icon
	            }
			});
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
				ui5strap.readTextFile(
					appDefinition.url, 
					"json", 
					_loadApp, 
					function(err){
						throw new Error("Could not load app configuration from '" + appDefinition.url + "'!");
					}
				);
			}
			else{
				//External Ui5Strap App: Executed within a Sandbox.
				
				if(
					!appDefinition.name 
					|| !appDefinition.id 
					|| !appDefinition.package 
					|| !appDefinition.url
				){
					throw new Error("Cannot execute external UI5STRAP App: at least one of required attributes missing in definition.");
				}
				
				//The Launcher is the HTML file which is executing the App.
				var launcher = appDefinition.launcher || "index.html";
				
				//Now load the App
				_loadApp({
			        "app" : {
			            "name" : appDefinition.name,
			            "id" : appDefinition.id,
			            "package" : appDefinition.package,
			            "module" : "ui5strap.AppSandbox",
			            "appURL" : launcher + "?app=" + encodeURIComponent(appDefinition.url),
			            "propagateMessages" : true
			        },
		            "icons" : {
		            	"default" : appDefinition.icon
		            }
				});
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
	ViewerMultiProto.loadApp = function(configURL, oConfigData, parameters, callback){
		jQuery.sap.log.debug("ViewerProto.loadApp");
		
		var _this = this,
			configAppSection = oConfigData.app;
		
		if(!configAppSection){
			throw new Error("Invalid app configuration: attribute 'app' is missing.");
		}
		
		if(_m_loadedSapplicationsById[configAppSection.id]){
			return callback(_m_loadedSapplicationsById[configAppSection.id]);
		}
		
		var appConfig = new AppConfig(this.options, parameters);
		
		configAppSection.url = configURL;
		
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
	 * @Private
	 */
	var _preloadLibraries = function(_this, libs, callback){
		jQuery.sap.log.debug("ViewerProto._preloadLibraries");
		
		var callI = libs.length,
			successCallback = function(){
				callI--;
				if(callI === 0){
					callback && callback();
				}
			};

		for(var i = 0; i < libs.length; i++){
			var lib = libs[i],
				libPackage = lib["package"], 
				libLocation = lib["location"];

			if(libPackage === 'ui5os' ||
				libPackage === 'ui5strap'){
				throw new Error('Do not include the libraries "ui5strap" and "ui5os" into your libraries configuration.');
			}
			
			jQuery.sap.registerModulePath(libPackage, libLocation);
			_this._loadedLibraries[libPackage] = libLocation;

			if(lib.preload){
				//Preload Controls an Elements
				var preloadLibs = [libPackage + '.library'],
					libData = sap.ui.getCore().getLoadedLibraries()[libPackage];
				
				for(var j = 0; j < libData.elements.length; j++){
					preloadLibs.push(libData.elements[j]);
				}

				for(var j = 0; j < libData.controls.length; j++){
					preloadLibs.push(libData.controls[j]);
				}
				
				jQuery.sap.require(preloadLibs);
			}
			
			successCallback();
		}
	};

	/**
	* Creates a app instance
	* @param appConfig SappConfig instance
	* @Public
	*/
	ViewerMultiProto.createApp = function(appConfig, callback){
		jQuery.sap.log.debug("ViewerProto.createApp");
		
		var oConfigData = appConfig.data,
			configAppSection = oConfigData.app,
			appModuleName = configAppSection.module,
			libraries = [],
			_this = this;

		//register the libraries
		for(var i = 0; i < oConfigData.libraries.length; i++){
			var dependencyLib = oConfigData.libraries[i];
			libraries.push({
				"package" : dependencyLib["package"],
				"location" : appConfig.resolvePath(dependencyLib["location"], true),
				"preload" : dependencyLib.preload
			});
			
		} 

		libraries.push({ 
			"package" : configAppSection["package"],
			"location" : configAppSection["location"]
		});

		_preloadLibraries(this, libraries, function(){
			jQuery.sap.require(appModuleName);
			var AppConstructor = jQuery.sap.getObject(appModuleName);
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
		
		if(this._loadingSapplication){
			jQuery.sap.log.warning("App '" + this._loadingSapplication + "' is currently loading."); 
			
			return;
		}

		var appInstance = this.getApp(sappId);

		if(!appInstance){
			throw new Error('Cannot show app "' + sappId + '" - app not loaded.');
		}
		
		//Check if App is running
		if(!appInstance.isRunning){
			throw new Error('Cannot show a app which is not running.');
		}

		//If App has no Root Control, or is already visible, return immeadiately
		if(!appInstance.getRootControl() || appInstance.isVisible){
			//this.hideLoader(function(){
				callback && callback(appInstance);
			//});

			return;
		}
		
		var configAppSection = appInstance.config.data.app;
		
		//Set Browser Title
		//TODO Is this good here?
		document.title = configAppSection.name;
		
		//TODO log level should only affect on app level
		configAppSection.logLevel && jQuery.sap.log.setLevel(configAppSection.logLevel);
		
		//Store Previous App
		var previousSapplication = this.getApp();
		
		//Set the app as current foreground app				
		_m_currentSapplication = appInstance;
		this._loadingSapplication = appInstance;	

		//Create or Update App Container
		appInstance.updateContainer();

		var viewer = this,
			$currentRoot = previousSapplication ? previousSapplication.$() : jQuery('#ui5strap-app-initial'),
			
			//Remove current app dom after transition
			currentRootCallbackI = 0,
			currentRootCallback = function(){
				currentRootCallbackI++
				if(currentRootCallbackI < 2){
					return;
				}
	
				if(previousSapplication){
					//Previous App onHidden
					previousSapplication.hidden(function(){
						viewer.removeStyle(previousSapplication);
					});
				}
				else{
					//Remove Initial View
					$currentRoot.remove();
				}
			},
	
			//Introduce new app dom
			preparedRootCallback = function(){
				currentRootCallback();
				
				//Current App onShown
				appInstance.shown(function(){
					//Show App Completed, trigger the Callback
					callback && callback.call(appInstance);
				});
			};

		//Load app css
		appInstance.includeStyle(function includeStyle_complete(){
			
			jQuery.sap.log.debug("Attaching root to DOM...");
			
			//Append App to DOM is not yet
			appInstance.attach(viewer._dom.$root[0]);
			
			//Create new Transition
			var transition = new ResponsiveTransition(
					{
					"transitionAll" : transitionName || configAppSection.transition, 
					"$current" : $currentRoot, 
					"$next" : appInstance.$(), 
					id : appInstance.getId()
					}
			);
			
			//<DOM_ATTACH_TIMEOUT>
			window.setTimeout(function setTimeout_complete(){
				
				//Previous App onHide
				previousSapplication && previousSapplication.hide();
				
				//Current App onShow
				appInstance.show(function(){
					
					//RAF start
					ui5strap.polyfill.requestAnimationFrame(function RAF1(){
						
						//Prepare Transition
						transition.prepare();
						
						//RAF
						ui5strap.polyfill.requestAnimationFrame(function RAF2(){
							
							//Hide the loader
							//viewer.hideLoader(function(){
								//Execure Transition
								transition.execute(currentRootCallback, preparedRootCallback);
							
								//Set viewer to available
								viewer._loadingSapplication = null;
							//});
							
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
		ui5strap.Layer.setVisible('ui5strap-loader', true, callback);
	};

	/**
	* Shows the overlay layer
	* @Public
	*/
	ViewerMultiProto.hideLoader = function(callback){
		ui5strap.Layer.setVisible('ui5strap-loader', false, callback);
	};

	/*
	* -------------
	*
	* TODO
	*
	* -------------
	*/

	/**
	* Get the console control reference
	* @public
	*/
	ViewerMultiProto.getConsole = function(){
		return this._console;
	};

	/**
	* Inititalizes the dom cache
	* @Protected
	*/
	ViewerMultiProto._initDom = function(){
		var _this = this;

		this._dom = {};

		this._dom.$body = jQuery(document.body);
		this._dom.$root = jQuery('#' + this.options.container);

		if(this._dom.$root.length === 0){
			throw new Error('Root Container not found in HTML: ' + this.options.container);
		}
	};

	

	/**
	* Initializes the console
	* @Protected
	*/
	ViewerMultiProto._initConsole = function(){
		if(this.options.enableConsole){
			jQuery.sap.require("ui5strap.Console");
			this._console = new ui5strap.Console();
		}
	};	

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

	      		sappmaker.log.debug("Key pressed: " + evtobj.keyCode);

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
	      			if(viewer.options.enableConsole){
		      			if(viewer.isOverlayVisible()){ 
		      				viewer.hideOverlay();
		      			}
		      			else{
		      				var viewerConsole = viewer.getConsole();
		      				viewerConsole.setCurrentLog(viewer.getApp().getId());
		      				viewer.showOverlay(viewerConsole, function(){
		      						viewerConsole.flush();
		      				});
		      				
		      			}
	      			}		
	      		}
	      		else if (evtobj.keyCode === 70){
	      			viewer.requestFullscreen();
	      		}
			}
		)
		
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
		
		//Listen to Html Frame Messages
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
		
		//Listen to Html Frame Messages
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
	};
	
	return ViewerMulti;
});