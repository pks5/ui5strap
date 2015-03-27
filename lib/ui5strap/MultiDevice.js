/*
 * 
 * UI5Strap
 *
 * ui5strap.MultiDevice
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
		HOME_URL = 'apps/com__ui5os__system__home__app/app.json',
		HOME_PACKAGE = 'com__ui5os__system.home__app';

	jQuerySap.declare("ui5strap.MultiDevice");
	
	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.AppConfig");
	jQuerySap.require("ui5strap.NavContainer");

	jQuerySap.require("ui5strap.Console");

	jQuerySap.require("ui5strap.App");
	//jQuerySap.require("ui5strap.AppSystem");
	jQuerySap.require("ui5strap.AppSandbox");
	jQuerySap.require("ui5strap.AppConsole");
	
	sap.ui.base.Object.extend("ui5strap.MultiDevice", {
		"constructor" : function(options){
			sap.ui.base.Object.apply(this);

			this.options = options || {};

			this._loadedLibraries = {};
			this._loadingSapplication = null;

			this._dom = null;
			this._browser = null;
			this._overlayFrame = null;
			this._console = null;
			this._isOverlayVisible = false;
		}
	});

	var Device = ui5strap.MultiDevice,
		DeviceProto = Device.prototype;

	//----------------- STATIC methods -------------------
	Device.UI5OS_CONTAINER_ID = "ui5strap-body";

	Device.KnownLibraryIssues = {
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
	 * Initializes the Device instance
	 * @param viewerConfigUrl Url to viewer configuration file
	 */
	DeviceProto._init = function(){
		jQuery.sap.log.debug("F DeviceProto::init");
		
		//Object vars
		_m_loadedSapplicationsById = {};
		_m_loadedSapplicationsByUrl = {};

		//Init methods
		this._initBrowser();
		this._initDom();
		this._initConsole();
		this._initOverlay();
		this._initEvents();
	};

	/*
	* Executes a app by given sapp-url from a get parameter
	*/
	DeviceProto.ready = function(callback){
		jQuery.sap.log.debug("F DeviceProto::start");

		this._init();

		var sappUrl = ui5strap.AppConfig.processOption("app", this.options.app);

		if(null === sappUrl){
			throw new Error('Cannot start viewer: no app url specified.');
		}

		this.executeSapplication(sappUrl, false, callback);	
	};

	/*
	*	Executes a app by a given sapp-url
	*/
	DeviceProto.executeSapplication = function(sappUrl, doNotShow, callback){
		console.debug("Executing app '" + sappUrl + "'");
		this.showLoader();
		var viewer = this;
		
		this.loadSapplication(sappUrl, function anon_loadSapplicationComplete(appInstance){
				if(!appInstance.isRunning){
					viewer.startSapplication(appInstance.getId());
				}

				if(!doNotShow){
					viewer.showSapplication(appInstance.getId(), null, callback);
				}
				else{
					this.hideLoader();
				}
		});
	};

	DeviceProto.closeSapplication = function(sappId, callback){
		var viewer = this;

		var appInstance = this.getLoadedSapplication(sappId);

		if(null === appInstance){
			throw new Error('Cannot close app "' + sappId + '" - app not loaded.');
		}

		if ( _m_currentSapplication === appInstance ) {
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
	DeviceProto.loadSapplication = function(sappUrl, callback){
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
	DeviceProto.unloadSapplication = function(sappId){
		jQuery.sap.log.debug("Unloading app '" + sappId + "'...");

		var appInstance = this.getLoadedSapplication(sappId);

		if(null === appInstance){
			throw new Error('Cannot unload app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			throw new Error('Cannot stop app "' + sappId + '" - app still running.');
		}
		
		appInstance.onUnload();
		
		delete _m_loadedSapplicationsByUrl[appInstance.getUrl()];
		delete _m_loadedSapplicationsById[sappId];

		return appInstance;
	};

	/*
	* Starts a previously loaded app.
	*/
	DeviceProto.startSapplication = function(sappId){
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
	DeviceProto.stopSapplication = function(sappId){
		jQuery.sap.log.debug("Stopping app '" + sappId + "'");

		var appInstance = this.getLoadedSapplication(sappId);

		if(null === appInstance){
			throw new Error('Cannot stop app "' + sappId + '" - app not loaded.');
		}

		if ( _m_currentSapplication === appInstance ) {
			throw new Error('Cannot stop app "' + sappId + '" - app is currently visible.');
		}
		
		appInstance.stop();
		
		return appInstance;
	};

	DeviceProto.hideSapplication = function(transitionName, callback){ 
		this.showSapplication(HOME_ID, transitionName, callback);
	};

	/*
	* Shows a previously started app, means bringing the app to foreground.
	*/
	DeviceProto.showSapplication = function(sappId, transitionName, callback){ 
		jQuery.sap.log.debug("Showing app '" + sappId + "'"); 

		if(null !== this._loadingSapplication){
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

		var previousSapplication = _m_currentSapplication;
		var needAttach = false;
		
		//Set the app as current foreground app				
		_m_currentSapplication = appInstance;
		this._loadingSapplication = appInstance;	

		if(!appInstance.domRef){
			var preparedRoot = document.createElement('div');
			preparedRoot.id = appInstance.getDomId();
			preparedRoot.className = 'sapplication-root-container sapplication-root-container-prepared ui5strap-hidden';
			appInstance.domRef = preparedRoot;
			needAttach = true;
		}
		else{
			appInstance.domRef.className = 'sapplication-root-container sapplication-root-container-prepared ui5strap-hidden';
		}

		var viewer = this;
		var $currentRoot = jQuery(null === previousSapplication ?  '#sapplication-root-container--initial' : previousSapplication.domRef);
		var $preparedRoot = jQuery(appInstance.domRef);
		
		//Remove current app dom after transition
		var currentRootCallbackI = 0;
		var currentRootCallback = function(){
			currentRootCallbackI++
			if(currentRootCallbackI < 2){
				return;
			}

			if(null !== previousSapplication){
				previousSapplication.isVisible = false;
				previousSapplication.onHide();
				previousSapplication.onHidden();

				previousSapplication.domRef.className = 'sapplication-root-container sapplication-root-container-inactive ui5strap-hidden';
				
				viewer.removeStyle(previousSapplication);
			}
			else{
				$currentRoot.remove();
			}
		};

		//Introduce new app dom
		var preparedRootCallback = function(){
			requestAnimationFrame(function(){
				appInstance.domRef.className = 'sapplication-root-container sapplication-root-container-current';
				
				//@experimental
				/*
				window.setTimeout(function setTimeout_complete(){
					$preparedRoot.find('.coolui5-trigger-transition-end').addClass('coolui5-trigger-active');
				}, 0);
				*/
			});
			

			currentRootCallback();
			
			callback && callback.call(appInstance);
			
			//appInstance.shown();
		};

		//Load app css
		appInstance.includeStyle(function includeStyle_complete(){
			
			if(needAttach){
				viewer._dom.$root[0].appendChild(appInstance.domRef);

				appInstance.show();

				appInstance.getRootControl().placeAt(appInstance.domRef);
			}
			//Set Browser Title
			document.title = appInstance.config.data.app.name;

			if(appInstance.hasNature('UI5OS_HOME')){
				viewer._dom.$body.addClass('ui5os-with-bar-home');
			}
		
			//<DOM_ATTACH_TIMEOUT>
			window.setTimeout(function setTimeout_complete(){
				
				//RAF
				requestAnimationFrame(function RAF1(){
					
					//Create new transition
					var transition = new ui5strap.Transition(transitionName, $currentRoot, $preparedRoot, 'transition-show-sapplication');
					
					//Prepare transition
					transition.prepare();
					
					//RAF
					requestAnimationFrame(function RAF2(){
						//Hide the loader
						viewer.hideLoader();

						//Execure transition
						transition.execute(currentRootCallback, preparedRootCallback);
						
						//Set viewer to available
						viewer._loadingSapplication = null;
					
					});

				});
				
			}, 50);
			//</DOM_ATTACH_TIMEOUT>

		});	
		
		

		return appInstance;
	};


	DeviceProto.sendMessage = function(appMessage){
		if(!('receiver' in appMessage)){
			throw new Error('Invalid message: missing receivers attribute!');
		}
		if(!('sender' in appMessage)){
			throw new Error('Invalid message: missing sender!');
		}
		if(!('message' in appMessage)){
			throw new Error('Invalid message: missing message!');
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
	DeviceProto.showLoader = function(callback){
		this._dom.$loader.removeClass('ui5strap-hidden');
		if(typeof callback === 'function'){
			callback();
		}
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	DeviceProto.hideLoader = function(callback){
		this._dom.$loader.addClass('ui5strap-hidden');
		if(typeof callback === 'function'){
			callback();
		}
	};

	/*
	* Returns whether the overlay layer is visible
	* @public
	*/
	DeviceProto.isOverlayVisible = function(){
		return this._isOverlayVisible;
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	DeviceProto.showOverlay = function(view, callback, overlayType){
		if(this.isOverlayVisible()){
		//	throw new Error('Overlay already visible!');
		}

		this._isOverlayVisible = true;
		
		var viewer = this,
		_this = this;

		if(typeof overlayType !== 'string'){
			 overlayType = 'STRIPE';
		}

		var overlayFrame = this._overlayFrame;

		overlayFrame.$overlayRoot.addClass('coolui5-overlay-type-' + overlayType);
		var transition = overlayFrame.transitionShow;
		
		requestAnimationFrame(function RAF1(){
			transition.prepare();
			requestAnimationFrame(function RAF2(){ 
				transition.execute(null, function execute_complete(){
					if(view instanceof sap.ui.core.Control){
						//Control is directly injected into the frame
						overlayFrame.toPage(view, "content", 'transition-slide');
					}
					else{ 
						//view is a data object
						if("appId" in view){
							var viewApp = _this.getLoadedSapplication(view.appId);
							if(null === viewApp){
								throw new Error('Invalid app: ' + view.appId);
							}
							//View from a app
							viewApp.includeStyle(function includeStyle_complete(){
								viewConfig = viewApp.config.getViewConfig(view); 

								overlayFrame.toPage(viewApp.createView(viewConfig), 'content', 'transition-slide');
								
								viewApp.isVisibleInOverlay = true;

								viewApp.onShowOverlay({ 
									view : view, 
									viewConfig : viewConfig
								});

							});
						}
						else{
							overlayFrame.toPage(view, 'content', 'transition-slide');
						}
					}
				});
			});
		});


		
	};

	/*
	* Hides the overlay layer
	* @public
	*/
	DeviceProto.hideOverlay = function(callback){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		this._isOverlayVisible = false;

		var viewer = this;

		var overlayFrame = this._overlayFrame;
		var page = overlayFrame.targets["content"];

		
		var transition = overlayFrame.transitionHide;
		var $overlay = overlayFrame.$overlayRoot;

		overlayFrame.toPage(null, 'content', 'transition-slide', function toPage_complete(){
			
			requestAnimationFrame(function RAF1(){
				transition.prepare();
				requestAnimationFrame(function RAF2(){
					transition.execute(
						function execute_complete(){
							$overlay.attr('class', overlayFrame.orgClass);

							if(page instanceof sap.ui.core.mvc.View){
								var pageViewData = page.getViewData();
								if("app" in pageViewData){
									pageViewData.app.isVisibleInOverlay = false;
									pageViewData.app.onHideOverlay(); 
									viewer.removeStyle(pageViewData.app);
								}
							}

							if( typeof callback === 'function' ){
								callback();
							}	
						}, 
						null
					);
				});
			});
		});	
		

		
	};


	/*
	* Removes app specific style from the head.
	* @public
	*/
	DeviceProto.removeStyle = function(appInstance){
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
	DeviceProto.getLoadedSapplication = function(sappId){
		if(!(sappId in _m_loadedSapplicationsById)){
			return null;
		}

		return _m_loadedSapplicationsById[sappId];
	};

	/*
	* Returns an array of all loaded apps
	* @TODO security manager
	*/
	DeviceProto.getLoadedSapplications = function(){
		return _m_loadedSapplicationsById;
	};





	/**
	*	Get the current (in foreground) running app
	*/
	DeviceProto.getApp = function(){
		return _m_currentSapplication;
	};

	/*
	* @Deprecated 
	*/
	DeviceProto.getSapplication = function(){
		return this.getApp();
	};

	/**
	*	Get the console control reference
	* @public
	*/
	DeviceProto.getConsole = function(){
		return this._console;
	};

	/*
	* Registers a SAP UI 5 library once
	* @public
	*/
	DeviceProto.registerLibrary = function (libraryName, libraryUrl){
		jQuery.sap.log.debug("F DeviceProto::registerLibrary");
		if(libraryName in this._loadedLibraries){
			return false;
		}
		jQuery.sap.registerModulePath(libraryName, libraryUrl);
		this._loadedLibraries[libraryName] = libraryUrl;
		if(libraryName in Device.KnownLibraryIssues){ 
			Device.KnownLibraryIssues[libraryName].call(this);
			jQuery.sap.log.debug("Fix for library '" + libraryName + "' loaded.");
		}
		jQuery.sap.log.debug("Library '" + libraryName + "' (" + libraryUrl + ") registered.");
	};

	/*
	* Inititalizes browser's capabilties
	* @protected
	*/
	DeviceProto._initBrowser = function(){
		this._browser = {};

		if("ontransitionend" in window){
			this._browser.transitionEndEvent = 'transitionend';
			this._browser.cssTransition = 'transition';
			this._browser.cssTransform = 'transform';
		}
		else if("onwebkitTransitionEnd" in window){
			this._browser.transitionEndEvent = 'webkitTransitionEnd';
			this._browser.cssTransition = '-webkit-transition';
			this._browser.cssTransform = '-webkit-transform';
		}
		else if("onoTransitionEnd" in window){
			this._browser.transitionEndEvent = 'oTransitionEnd';
			this._browser.cssTransition = '-o-transition';
			this._browser.cssTransform = '-o-transform';
		}
		else if("onMSTransitionEnd" in window){
			this._broser.transitionend = 'MSTransitionEnd';
			this._browser.cssTransition = '-ms-transition';
			this._browser.cssTransform = '-ms-transform';
		}
		else{
			this._browser.transitionEndEvent = null;
			this._browser.cssTransition = null;
			this._browser.cssTransform = null;

			console.warn('No transitionend event found', window);
		
			this._browser.transitionEndEvent = 'transitionend';
			this._browser.cssTransition = 'transition';
			this._browser.cssTransform = 'transform';
		}

		var CoolTransition = ui5strap.Transition;
		CoolTransition.transitionEndEvent = this._browser.transitionEndEvent;
		CoolTransition.cssTransition = this._browser.cssTransition;
		CoolTransition.cssTransform = this._browser.cssTransform;

		jQuery.sap.log.debug("Transition end event is: '" + (null === this._browser.transitionEndEvent ? 'no supported' : this._browser.transitionEndEvent) + "'.");
	};

	/*
	* Inititalizes the dom cache
	* @protected
	*/
	DeviceProto._initDom = function(){
		var _this = this;

		this._dom = {};

		this._dom.$body = jQuery(document.body);
		this._dom.$root = jQuery('#' + Device.UI5OS_CONTAINER_ID);
		this._dom.$loader = jQuery('#sappos-loader');

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
	* Inititalzes the overlay
	*/
	DeviceProto._initOverlay = function(){
		var viewer = this;

		var overlayFrame = new ui5strap.NavContainer();
		this._overlayFrame = overlayFrame;

		var $overlay = jQuery('#sappos-overlay');
		
		overlayFrame.$overlayRoot = $overlay;
		overlayFrame.transitionShow = new ui5strap.Transition("transition-fade", null, $overlay, "transition-show-overlay");
		overlayFrame.transitionHide = new ui5strap.Transition("transition-fade", $overlay, null, "transition-hide-overlay");
		overlayFrame.orgClass = $overlay.attr('class');		
		
		overlayFrame.placeAt('sappos-overlay-inner');

		$overlay.find('#sappos-overlay-close').on('tap', function anon_overlayCloseTap(){
			viewer.hideOverlay();
		});
	};

	/*
	+ Initializes the console
	* @protected
	*/
	DeviceProto._initConsole = function(){
		if(this.options.enableConsole){
			this._console = new ui5strap.Console();
		}
	};	

	/*
	* Inititalizes the events
	* @protected
	*/
	DeviceProto._initEvents = function(){
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
	DeviceProto.createSapplication = function(appConfig, callback){
		jQuery.sap.log.debug("F DeviceProto::createSapplication");
		
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
	DeviceProto.openSapplication = function(sappUrl){
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');

		//TODO find a better way to enforce the mobile events
		var appUrl = currentUrl + '?sapp=' + encodeURIComponent(sappUrl) + '&rand=' + Math.random() + '&sap-ui-xx-fakeOS=ipad';

		this.exitViewer(appUrl);
	};

	/*
	*	Changes the browser URL to an (external) url
	* @param url The URL to browse to
	*/
	DeviceProto.exitViewer =  function(url){
		window.location.href = url; 
	};	

	/*
	* Request the client's browser to switch to full screen mode
	*/  
	DeviceProto.requestFullscreen =  function(element){
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

}());