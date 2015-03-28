/*
 * 
 * UI5Strap
 *
 * ui5strap.ViewerMulti
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
	var jQuerySap = jQuery.sap,
		HOME_ID = 'com.ui5os.system.home.app',
		HOME_URL = 'home.dev/app.json',
		HOME_PACKAGE = 'com__ui5os__system.home__app';

	jQuerySap.declare("ui5strap.ViewerMulti");
	
	jQuerySap.require("ui5strap.library");
	
	jQuerySap.require("ui5strap.ViewerBase");
	
	jQuerySap.require("ui5strap.AppConfig");
	jQuerySap.require("ui5strap.NavContainer");

	jQuerySap.require("ui5strap.Console");

	jQuerySap.require("ui5strap.App");
	//jQuerySap.require("ui5strap.AppSystem");
	jQuerySap.require("ui5strap.AppSandbox");
	jQuerySap.require("ui5strap.AppConsole");
	
	ui5strap.ViewerBase.extend("ui5strap.ViewerMulti", {
		"constructor" : function(options){
			ui5strap.ViewerBase.call(this, options);

			this._loadedLibraries = {};
			this._loadingSapplication = null;

			this._dom = null;
			
			this._console = null;
		}
	});

	var ViewerMulti = ui5strap.ViewerMulti,
		ViewerMultiProto = ViewerMulti.prototype;

	//----------------- STATIC methods -------------------
	ViewerMulti.KnownLibraryIssues = {
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
		jQuery.sap.log.debug("F ViewerMultiProto::init");
		
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
	ViewerMultiProto.start = function(callback){
		jQuery.sap.log.debug("F ViewerMultiProto::start");

		this.init();

		var sappUrl = ui5strap.AppConfig.processOption("app", this.options.app);

		if(null === sappUrl){
			throw new Error('Cannot start viewer: no app url specified.');
		}

		this.executeSapplication(sappUrl, false, callback);	
	};

	/*
	*	Executes a app by a given sapp-url
	*/
	ViewerMultiProto.executeSapplication = function(sappUrl, doNotShow, callback){
		console.debug("Executing app '" + sappUrl + "'");
		var _this = this;
			
		this.showLoader(function(){
			_this.loadSapplication(sappUrl, function anon_loadSapplicationComplete(appInstance){
					if(!appInstance.isRunning){
						_this.startSapplication(appInstance.getId());
					}

					if(!doNotShow){
						_this.showSapplication(appInstance.getId(), null, callback);
					}
					else{
						_this.hideLoader(callback);
					}
			});

		});
	};

	ViewerMultiProto.closeSapplication = function(sappId, callback){
		var viewer = this;

		var appInstance = this.getLoadedSapplication(sappId);

		if(null === appInstance){
			throw new Error('Cannot close app "' + sappId + '" - app not loaded.');
		}

		if ( this.getApp() === appInstance ) {
			this.hideSapplication('transition-zoom2', function(){
				viewer.stopSapplication(sappId);
				viewer.unloadSapplication(sappId);
				if(typeof callback === 'function'){
					callback();
				}
			});
		}	
		else{ 
			this.stopSapplication(sappId);
			this.unloadSapplication(sappId);

			if(typeof callback === 'function'){
				callback();
			}
		}


	};

	/*
	* Loads a app by a given sapp-url. Loading in this context means creating the app class and calling its init method.
	*/
	ViewerMultiProto.loadSapplication = function(sappUrl, callback){
		jQuery.sap.log.debug("Loading app '" + sappUrl + "'");

		if(sappUrl in _m_loadedSapplicationsByUrl){
			return callback(_m_loadedSapplicationsByUrl[sappUrl]);
		}
		var viewer = this;

		var appConfig = new ui5strap.AppConfig(this.options);

		appConfig.load(sappUrl, function load_complete(configDataJSON){
			//TODO log level should only affect on app level
			if("logLevel" in configDataJSON.app){
				jQuerySap.log.setLevel(configDataJSON.app.logLevel);
			}

			if(!("module" in configDataJSON.app)){
				var defaultAppModule = "ui5strap.App";
				configDataJSON.app.module = defaultAppModule;
			}

			//Create App Instance
			viewer.createSapplication(appConfig, function createSapplication_complete(appInstance){
				appInstance.init();

				_m_loadedSapplicationsByUrl[sappUrl] = appInstance;
				_m_loadedSapplicationsById[appInstance.getId()] = appInstance;

				appInstance.load(function load_complete(){
					callback && callback.call(viewer, appInstance);
				});
			});
		});

		
	};

	/*
	* Unloads an app
	*/
	ViewerMultiProto.unloadSapplication = function(sappId){
		jQuery.sap.log.debug("Unloading app '" + sappId + "'...");

		var appInstance = this.getLoadedSapplication(sappId);

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
	ViewerMultiProto.startSapplication = function(sappId){
		jQuery.sap.log.debug("Starting app '" + sappId + "'");

		var appInstance = this.getLoadedSapplication(sappId);
		
		if(null === appInstance){
			throw new Error('Cannot start app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			return appInstance;
		}

		appInstance.start();
		
		return appInstance;
	};

	/*
	* Stops a previously started app.
	*/
	ViewerMultiProto.stopSapplication = function(sappId){
		var appInstance = this.getLoadedSapplication(sappId);

		if(null === appInstance){
			throw new Error('Cannot stop app "' + sappId + '" - app not loaded.');
		}

		if ( this.getApp() === appInstance ) {
			throw new Error('Cannot stop app "' + sappId + '" - app is currently visible.');
		}
		
		appInstance.stop();
		
		return appInstance;
	};

	ViewerMultiProto.hideSapplication = function(transitionName, callback){ 
		this.showSapplication(HOME_ID, transitionName, function(){
			appInstance.hidden();
		});
	};

	/*
	* Shows a previously started app, means bringing the app to foreground.
	*/
	ViewerMultiProto.showSapplication = function(sappId, transitionName, callback){ 
		jQuery.sap.log.debug("Showing app '" + sappId + "'"); 

		if(null !== this._loadingSapplication){
			jQuery.sap.log.warning("App '" + this._loadingSapplication + "' is currently loading."); 
			return false;
		}

		var appInstance = this.getLoadedSapplication(sappId);

		if(null === appInstance){
			throw new Error('Cannot show app "' + sappId + '" - app not loaded.');
		}

		if(!appInstance.isRunning){
			throw new Error('Cannot show a app which is not running.');
		}

		if(!appInstance.getRootControl()){
			this.hideLoader();

			return appInstance;
		}

		if(appInstance.isVisible){
			this.hideLoader();
			
			return appInstance;
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
			appInstance.domRef.className = 'ui5strap-app ui5strap-app-next ui5strap-hidden';
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
					appInstance.log.debug("SHOW COMPLETE");
					//RAF
					ui5strap.polyfill.requestAnimationFrame(function RAF1(){
						
						//Create new transition
						var transition = new ui5strap.Transition(transitionName, $currentRoot, $preparedRoot, 'transition-show-app');
						transition.prepare();
						
						//RAF
						ui5strap.polyfill.requestAnimationFrame(function RAF2(){
							
							//Hide the loader
							viewer.hideLoader(function(){
								//Execure transition
								transition.execute(currentRootCallback, preparedRootCallback);
							
								//Set viewer to available
								viewer._loadingSapplication = null;
							});
							
							
						});

					});
				});
				
			}, 50);
			//</DOM_ATTACH_TIMEOUT>

		});	
		
		return appInstance;
	};


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
			var app = this.getLoadedSapplication(receiverAppId);

			if(app){
				app.onMessage(new sap.ui.base.Event("message", null, appMessage));
			}
			
	    }

	    if(appMessage.toParent && self !== top){
	    	parent.postMessage(appMessage, '*');
	    }
	};



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
	* Returns the loaded app with the id sappId, or null if the app has not been loaded.
	* @public
	*/ 
	ViewerMultiProto.getLoadedSapplication = function(sappId){
		if(!(sappId in _m_loadedSapplicationsById)){
			return null;
		}

		return _m_loadedSapplicationsById[sappId];
	};

	/*
	* Returns an array of all loaded apps
	* @TODO security manager
	*/
	ViewerMultiProto.getLoadedSapplications = function(){
		return _m_loadedSapplicationsById;
	};





	/**
	*	Get the current (in foreground) running app
	*/
	ViewerMultiProto.getApp = function(){
		return _m_currentSapplication;
	};

	/*
	* @Deprecated 
	*/
	ViewerMultiProto.getSapplication = function(){
		return this.getApp();
	};

	/**
	*	Get the console control reference
	* @public
	*/
	ViewerMultiProto.getConsole = function(){
		return this._console;
	};

	/*
	* Registers a SAP UI 5 library once
	* @public
	*/
	ViewerMultiProto.registerLibrary = function (libraryName, libraryUrl){
		jQuery.sap.log.debug("F ViewerMultiProto::registerLibrary");
		if(libraryName in this._loadedLibraries){
			return false;
		}
		jQuery.sap.registerModulePath(libraryName, libraryUrl);
		this._loadedLibraries[libraryName] = libraryUrl;
		if(libraryName in ViewerMulti.KnownLibraryIssues){ 
			ViewerMulti.KnownLibraryIssues[libraryName].call(this);
			jQuery.sap.log.debug("Fix for library '" + libraryName + "' loaded.");
		}
		jQuery.sap.log.debug("Library '" + libraryName + "' (" + libraryUrl + ") registered.");
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
		
		var $homeButton = jQuery('#ui5os-button-home'),
			$taskmanagerButton = jQuery('#ui5os-button-taskmanager');

		this._dom.$barHome = jQuery('#ui5os-bar-home');
		
		$homeButton.on('click', function(){
			_this.executeSapplication(HOME_URL, false);
		});
		
		$taskmanagerButton.on('click', function(){
			_this.showOverlay({
				"appId" : HOME_ID,
				"target" : "content",
                "viewName" : HOME_PACKAGE + ".views.TaskManager",
                "id" : "taskManager"
			});
		});
	};

	

	/*
	+ Initializes the console
	* @protected
	*/
	ViewerMultiProto._initConsole = function(){
		if(this.options.enableConsole){
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
	      			var apps = viewer.getLoadedSapplications();

	      			for(var sappUrl in apps){
	      				apps[sappUrl].fireEventAction({ 
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
		      				viewerConsole.setCurrentLog(viewer.getSapplication().getId());
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

				var appInstances = viewer.getLoadedSapplications();

	      			for(var sappUrl in appInstances){
	      				appInstances[sappUrl].fireEventAction({ 
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

	/*
	* Creates a app instance
	* @param appConfig SappConfig instance
	*/
	ViewerMultiProto.createSapplication = function(appConfig, callback){
		jQuery.sap.log.debug("F ViewerMultiProto::createSapplication");
		
		var configDataJSON = appConfig.data,
			sappClass = configDataJSON.app.module,
			sappId = configDataJSON.app.id,
			viewer = this;

		this.registerLibrary(configDataJSON.app["package"], configDataJSON.app["location"]);
		
		//register the libraries
		for(var i = 0; i < configDataJSON.libraries.length; i++){
			var library = configDataJSON.libraries[i];
			this.registerLibrary(library.package, appConfig.resolvePath(library.location));
		} 

		//Get Constructor
		ui5strap.require(sappClass, function require_complete(){
			var AppConstructor = jQuery.sap.getObject(sappClass);

			var appInstance = new AppConstructor(appConfig, viewer);

			callback(appInstance);
		});
		
		//console.log(sap.ui.getCore().getLoadedLibraries());
	};	

	// ---- NEW INSTANCE (Browser URL change)

	/*
	*	Replaces the current browser content and opens a app defined in viewer config
	* @param sappId Sapplication ID
	*/
	ViewerMultiProto.openSapplication = function(sappUrl){
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');

		//TODO find a better way to enforce the mobile events
		var appUrl = currentUrl + '?sapp=' + encodeURIComponent(sappUrl) + '&rand=' + Math.random() + '&sap-ui-xx-fakeOS=ipad';

		this.exitViewer(appUrl);
	};

	

}());