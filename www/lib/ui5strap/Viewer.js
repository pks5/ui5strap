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

(function(){
	var jQuerySap = jQuery.sap;

	jQuerySap.declare("ui5strap.Viewer");
	
	jQuerySap.require("ui5strap.library");
	
	jQuerySap.require("ui5strap.ViewerBase");
	
	jQuerySap.require("ui5strap.AppConfig");
	jQuerySap.require("ui5strap.NavContainer");

	jQuerySap.require("ui5strap.App");
	//jQuerySap.require("ui5strap.AppSystem");
	//jQuerySap.require("ui5strap.AppSandbox");
	//jQuerySap.require("ui5strap.AppConsole");
	
	ui5strap.ViewerBase.extend("ui5strap.Viewer", {
		"constructor" : function(options){
			ui5strap.ViewerBase.call(this, options);

			this._loadedLibraries = {};
			this._loadingSapplication = null;

			this._dom = null;
			
			this._console = null;
		}
	});

	var ViewerMulti = ui5strap.Viewer,
		ViewerMultiProto = ViewerMulti.prototype;

	//----------------- STATIC methods -------------------
	var _KnownLibraryIssues = {
		"sap.m" : function(){
			//This fixes problems with JSON views, when displaying in editor
			//Since we need Page in any mobile app anyway, this does not harm
			jQuerySap.require("sap.m.Page");
		}
	};

	//----------------- NON-STATIC methods -------------------

	//Private properties that are linked to the scope of the anonymous self executing function around this module
	//This prevents other apps from accessing data easily
	//@TODO these properties must be NON-STATIC! Currently they are STATIC.
	//@static
	var _m_currentSapplication = null;
	var _m_loadedSapplicationsById = null;
	var _m_loadedSapplicationsByUrl = null;
	


	/*
	 * Initializes the ViewerMulti instance
	 * @param viewerConfigUrl Url to viewer configuration file
	 */
	ViewerMultiProto.init = function(){
		jQuery.sap.log.debug("[VIEWER] init");
		
		//Object vars
		_m_loadedSapplicationsById = {};
		_m_loadedSapplicationsByUrl = {};

		ui5strap.ViewerBase.prototype.init.call(this);
		
		//Init methods
		this._initDom();
		this._initConsole();
		this._initEvents();
	};

	/*
	* Executes a app by given sapp-url from a get parameter
	*/
	ViewerMultiProto.start = function(callback, loadCallback){
		jQuery.sap.log.debug("[VIEWER] start");

		this.init();

		var appUrl = ui5strap.AppConfig.processOption("app", this.options.app);

		if(null === appUrl){
			throw new Error('Cannot start viewer: no app url specified.');
		}

		this.executeApp(appUrl, false, callback, loadCallback);	
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
	*/
	ViewerMultiProto.getApp = function(appId){
		return appId ? _m_loadedSapplicationsById[appId] : _m_currentSapplication;
	};

	ViewerMultiProto.getLoadedApps = function(){
		return _m_loadedSapplicationsById;
	};

	/*
	*	Replaces the current browser content and opens a app defined in viewer config
	* @param sappId Sapplication ID
	*/
	ViewerMultiProto.openSapplication = function(appUrl){
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
		var appUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();

		this.exitViewer(appUrl);
	};

	/*
	* Load, start and show an App. The appUrl must point to a valid app.json file.
	*/
	ViewerMultiProto.executeApp = function(appUrl, doNotShow, callback, loadCallback){
		jQuery.sap.log.debug("[VIEWER] executeApp '" + appUrl + "'");
		var _this = this;
			
		
		_this.loadApp(appUrl, function loadAppComplete(appInstance){
			    loadCallback && loadCallback();

			    var startedCallback = function(){
					if(!doNotShow){
						_this.showApp(appInstance.getId(), null, callback);
					}
					else{
						//_this.hideLoader(callback);
						callback && callback();
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

		});
	};

	/**
	* Hide, stop and unload an App.
	*/
	ViewerMultiProto.closeApp = function(sappId, callback){
		var viewer = this;

		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot close app "' + sappId + '" - app not loaded.');
		}

		if ( this.getApp() === appInstance ) {
			this.hideApp('transition-zoom2', function hideAppComplete(){
				viewer.stopApp(sappId);
				viewer.unloadApp(sappId);
				callback && callback();
			});
		}	
		else{ 
			this.stopApp(sappId);
			this.unloadApp(sappId);

			callback && callback();
		}
	};

	var _preloadLibraries = function(_this, libs, callback){
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
			
			jQuerySap.registerModulePath(libPackage, libLocation);
			_this._loadedLibraries[libPackage] = libLocation;

			if(libPackage in _KnownLibraryIssues){
				//Fix function for library
				_KnownLibraryIssues[libPackage].call(this);
				jQuery.sap.log.debug("[VIEWER] Fix for library '" + libPackage + "' loaded.");
			}

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

				ui5strap.require(preloadLibs, successCallback());
			}
			else{
				successCallback();
			}
		}
	};

	/*
	* Creates a app instance
	* @param appConfig SappConfig instance
	*/
	ViewerMultiProto.createApp = function(appConfig, callback){
		jQuery.sap.log.debug("[VIEWER] createApp");
		
		var configDataJSON = appConfig.data,
			appModuleName = configDataJSON.app.module,
			libraries = [],
			_this = this;

		//register the libraries
		for(var i = 0; i < configDataJSON.libraries.length; i++){
			var dependencyLib = configDataJSON.libraries[i];
			libraries.push({
				"package" : dependencyLib["package"],
				"location" : appConfig.resolvePath(dependencyLib["location"]),
				"preload" : dependencyLib.preload
			});
			
		} 

		libraries.push({ 
			"package" : configDataJSON.app["package"],
			"location" : configDataJSON.app["location"]
		});

		_preloadLibraries(this, libraries, function(){
			//Load the App Module
			ui5strap.require(appModuleName, function requireComplete(){
				var AppConstructor = jQuery.sap.getObject(appModuleName);

				callback && callback(new AppConstructor(appConfig, _this));
			});
		});
	};

	/*
	* Loads an App by a given appUrl. The appUrl must point to a valid app.json file.
	*/
	ViewerMultiProto.loadApp = function(appUrl, callback){
		jQuery.sap.log.debug("[VIEWER] loadApp '" + appUrl + "'");

		if(appUrl in _m_loadedSapplicationsByUrl){
			return callback(_m_loadedSapplicationsByUrl[appUrl]);
		}
		var viewer = this,
			appConfig = new ui5strap.AppConfig(this.options);

		appConfig.load(appUrl, function loadAppConfigComplete(configDataJSON){
			//TODO log level should only affect on app level
			if("logLevel" in configDataJSON.app){
				jQuerySap.log.setLevel(configDataJSON.app.logLevel);
			}

			if(!("module" in configDataJSON.app)){
				var defaultAppModule = "ui5strap.App";
				configDataJSON.app.module = defaultAppModule;
			}

			//Create App Instance
			viewer.createApp(appConfig, function createAppComplete(appInstance){
				appInstance.init();

				_m_loadedSapplicationsByUrl[appUrl] = appInstance;
				_m_loadedSapplicationsById[appInstance.getId()] = appInstance;

				appInstance.load(function loadAppComplete(){
					callback && callback.call(viewer, appInstance);
				});
			});
		});

		
	};

	/*
	* Unloads an app
	*/
	ViewerMultiProto.unloadApp = function(sappId){
		jQuery.sap.log.debug("[VIEWER] unloadApp '" + sappId + "'");

		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot unload app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			throw new Error('Cannot stop app "' + sappId + '" - app still running.');
		}
		
		appInstance.unload();
		
		delete _m_loadedSapplicationsByUrl[appInstance.getUrl()];
		delete _m_loadedSapplicationsById[sappId];

		return appInstance;
	};

	/*
	* Starts a previously loaded app.
	*/
	ViewerMultiProto.startApp = function(sappId, callback){
		jQuery.sap.log.debug("[VIEWER] startApp '" + sappId + "'");

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
	* Stops a previously started app.
	*/
	ViewerMultiProto.stopApp = function(sappId){
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
	* Shows a previously started app, means bringing the app to foreground.
	*/
	ViewerMultiProto.showApp = function(sappId, transitionName, callback){ 
		jQuery.sap.log.debug("[VIEWER] showApp '" + sappId + "'"); 

		if(null !== this._loadingSapplication){
			jQuery.sap.log.warning("App '" + this._loadingSapplication + "' is currently loading."); 
			
			return;
		}

		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot show app "' + sappId + '" - app not loaded.');
		}

		if(!appInstance.isRunning){
			throw new Error('Cannot show a app which is not running.');
		}

		if(!appInstance.getRootControl()){
			//this.hideLoader(function(){
				callback && callback(appInstance);
			//});

			return;
		}

		if(appInstance.isVisible){
			//this.hideLoader(function(){
				callback && callback(appInstance);
			//});
			
			return;
		}

		if(typeof transitionName !== 'string'){
			transitionName = appInstance.config.data.app.transition;
		}

		//Set Browser Title
		document.title = appInstance.config.data.app.name;

		if(appInstance.hasNature('UI5OS_HOME')){
			this._dom.$body.addClass('ui5os-with-bar-home');
		}

		var previousSapplication = this.getApp();
		var needAttach = false;
		
		//Set the app as current foreground app				
		_m_currentSapplication = appInstance;
		this._loadingSapplication = appInstance;	

		if(!appInstance.domRef){
			appInstance.createDomRef();
			needAttach = true;
		}
		else{
			appInstance.updateDomRef();
		}

		var viewer = this;
		var $currentRoot = jQuery(previousSapplication ? previousSapplication.domRef : '#ui5strap-app-initial');
		var $preparedRoot = jQuery(appInstance.domRef);
		
		//Remove current app dom after transition
		var currentRootCallbackI = 0;
		var currentRootCallback = function(){
			currentRootCallbackI++
			if(currentRootCallbackI < 2){
				return;
			}

			if(previousSapplication){
				previousSapplication.hidden(function(){
					viewer.removeStyle(previousSapplication);
				});
			}
			else{
				$currentRoot.remove();
			}
		};

		//Introduce new app dom
		var preparedRootCallback = function(){
			currentRootCallback();
			
			//Finally trigger the shown process
			appInstance.shown(function(){
				callback && callback.call(appInstance);
			});
		};

		//Load app css
		appInstance.includeStyle(function includeStyle_complete(){
			
			if(needAttach){
				viewer._dom.$root[0].appendChild(appInstance.domRef);

				appInstance.registerOverlay();

				appInstance.getRootControl().placeAt(appInstance.contentDomRef);
			}
			
			//<DOM_ATTACH_TIMEOUT>
			window.setTimeout(function setTimeout_complete(){
				previousSapplication && previousSapplication.hide();
				appInstance.show(function(){
					
					//RAF
					ui5strap.polyfill.requestAnimationFrame(function RAF1(){
						
						//Create new transition
						var transition = new ui5strap.Transition(transitionName, $currentRoot, $preparedRoot, appInstance.getId());
						transition.prepare();
						
						//RAF
						ui5strap.polyfill.requestAnimationFrame(function RAF2(){
							
							//Hide the loader
							//viewer.hideLoader(function(){
								//Execure transition
								transition.execute(currentRootCallback, preparedRootCallback);
							
								//Set viewer to available
								viewer._loadingSapplication = null;
							//});
							
							
						});

					});
				});
				
			}, 50);
			//</DOM_ATTACH_TIMEOUT>

		});	
	};

	ViewerMultiProto.hideApp = function(transitionName, callback){
		if(!this.options.home){
			throw new Error('options.home must be set to hide an App!');
		}
		this.showApp(this.options.home.id, transitionName, function showAppComplete(appInstance){
			callback && callback();
			//appInstance.hidden();
		});
	};

	/*
	* Removes app specific style from the head.
	* @public
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
				app.onMessage(new sap.ui.base.Event("message", null, appMessage));
			}
			
	    }

	    if(appMessage.toParent && self !== top){
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

	/*
	* Shows the overlay layer
	* @public
	*/
	ViewerMultiProto.showLoader = function(callback){
		ui5strap.Layer.setVisible('ui5strap-loader', true, callback);
	};

	/*
	* Shows the overlay layer
	* @public
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
	*	Get the console control reference
	* @public
	*/
	ViewerMultiProto.getConsole = function(){
		return this._console;
	};

	/*
	* Inititalizes the dom cache
	* @protected
	*/
	ViewerMultiProto._initDom = function(){
		var _this = this;

		this._dom = {};

		this._dom.$body = jQuery(document.body);
		this._dom.$root = jQuery('#' + this.options.container);

		if(this._dom.$root.length === 0){
			throw new Error('Root Container not found in HTML: ' + this.options.container);
		}
		
		var $homeButton = jQuery('#ui5os-button-home'),
			$taskmanagerButton = jQuery('#ui5os-button-taskmanager');
		
		if(this.options.home){
			this._dom.$barHome = jQuery('#ui5os-bar-home');
			
			$homeButton.on('click', function(){
				_this.executeApp(_this.options.home.url, false);
			});
			
			$taskmanagerButton.on('click', function(){
				_this.showOverlay({
					"appId" : _this.options.home.id,
					"target" : "content",
	                "viewName" : _this.options.home.package + ".views.TaskManager",
	                "id" : "taskManager"
				});
			});
		}
	};

	

	/*
	+ Initializes the console
	* @protected
	*/
	ViewerMultiProto._initConsole = function(){
		if(this.options.enableConsole){
			jQuerySap.require("ui5strap.Console");
			this._console = new ui5strap.Console();
		}
	};	

	/*
	* Inititalizes the events
	* @protected
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
		
		window.addEventListener(
			"message", 
			function(event){
				_this.sendMessage(event.data);
			}, 
			false
		);
	};

}());