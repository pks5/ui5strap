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

sap.ui.define(['./library', 'sap/ui/base/Object', './Action'], function(library, ObjectBase, Action){

	var AppBase = ObjectBase.extend('ui5strap.AppBase', {
		"constructor" : function(config, viewer){
			sap.ui.base.Object.apply(this);
			
			this.config = config;

			this.components = {};
			this._rootComponent = this;

			this._pageCache = {};
			this._events = {};
			
			this.isAttached = false;
			this.isRunning = false;
			this.isVisible = false;
			this.hasFirstShow = false;
			this.hasFirstShown = false;

			this._initLog();

			this.sendMessage = function(appMessage){
				appMessage.sender = this.getId();

				viewer.sendMessage(appMessage);
			};
		}
	}),
	AppBaseProto = AppBase.prototype;

	/*
	* Init sapplication specific logging
	* @protected
	*/
	AppBaseProto._initLog = function(){
		var _this = this;
		this.log = {

			debug : function (message) {
				jQuery.sap.log.debug(_this + " " + message);
			},

			warning : function (message) {
				jQuery.sap.log.warning(_this + " " + message);
			},

			error : function (message) {
				jQuery.sap.log.error(_this + " " + message);
			},

			info : function (message) {
				jQuery.sap.log.info(_this + " " + message);
			},

			fatal : function (message) {
				jQuery.sap.log.fatal(_this + " " + message);
			}

		};
	};
	
	/**
	 * @Private
	 */
	var _createAppClass = function(_this, appClasses){
		if(_this.config.data.app.styleClass){
			appClasses += " " + _this.config.data.app.styleClass;
		}
		return appClasses;
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Events -----------------------------
	* ----------------------------------------------------------
	*/

	/**
	* Initializes the App
	* @Public
	*/
	AppBaseProto.init = function(){
		this.onInit(new sap.ui.base.Event("ui5strap.app.init", this, {}));
	};

	/**
	* Preload JavaScript libraries
	* @Private
	*/
	var _preloadJavaScript = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadJavaScript");
		
		var scripts = _this.config.data.js;
		if(scripts.length === 0){
			callback && callback.call(_this);

			return;
		}

		var files = [];
		for(var i = 0; i < scripts.length; i++){
			var jsPath = _this.config.resolvePath(scripts[i], true);

			var jsKey = 'js---' + _this.getId() + '--' + jsPath;

			if(! ( jsKey in _this._runtimeData.js ) ){	
				_this._runtimeData.js[jsKey] = jsPath;

				files.push(jsPath);
			}
		}

		var scriptBlock = new ui5strap.ScriptBlock();

		scriptBlock.load(files, function(){
			scriptBlock.execute(true);

			callback && callback.call(_this);
		});
	};
	
	/**
	 * @Private
	 */
	var _preloadModels = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadModels");

		//Models
		var models = _this.config.data.models,
			callI = models.length, 
			loaded = {},
			successCallback = function(oEvent, oData){
				callI --;
				
				if(callI >= 0){
					if(oData.oModel !== loaded[oData.modelName]){
						_this.log.debug("Loaded model '" + oData.modelName + "'");
						_this.getRootControl().setModel(oData.oModel, oData.modelName);
						loaded[oData.modelName] = oData.oModel;
					}
					else{
						jQuery.sap.log.warning("Model already loaded: " + oData.modelName);
					}
				}
				
				if(callI === 0){
					//sap.ui.getCore().setModel(oModel, model['modelName']);
					callback && callback();
				}
				
				if(callI < 0){
					jQuery.sap.log.warning("Loaded additional model data: " + oData.modelName);
					//_this.getRootControl().rerender();
					//sap.ui.getCore().fireLocalizationChanged();
					console.log(sap.ui.getCore());
				}
			},
			errorCallback = function(){
				throw new Error('Cannot load model!');
			};

		if(callI === 0){
			callback && callback();
		}

		for(var i = 0; i < models.length; i++){
			var model = models[i],
				oModel = null,
				modelType = model['type'],
				modelName = model['modelName'],
				modelSrc = _this.config.resolvePath(model, true);

			
			if(modelType === 'RESOURCE'){
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelSrc,
					async_DEACTIVATED : true
				});
				/*
				oModel.attachRequestCompleted(
					{ 
						modelName: modelName, 
						oModel : oModel
					}, 
					successCallback
				);
				oModel.attachRequestFailed(
					{ 
						modelName: modelName, 
						modelSrc : modelSrc
					}, 
					errorCallback
				);
				*/
				successCallback(null, { 
					modelName: modelName, 
					oModel : oModel
				});
			}
			else if(modelType === 'JSON'){
				oModel = new sap.ui.model.json.JSONModel();
				oModel.attachRequestCompleted(
					{ 
						modelName: modelName, 
						oModel : oModel
					}, 
					successCallback, 
					oModel
				);
				oModel.attachRequestFailed(
					{
						modelName: modelName,
						modelSrc : modelSrc
					}, 
					errorCallback
				);
				oModel.loadData(modelSrc);
			}
			else{
				throw new Error('Invalid model type!');
			}
		}
	};
	
	/**
	 * @Private
	 */
	var _initComponent = function(_this, compConfig){
		var ComponentConstructor = jQuery.sap.getObject(compConfig.module),
			componentId = compConfig.id,
			compEvents = compConfig.events,
			methodName = 'get' + jQuery.sap.charToUpperCase(componentId),
			oComp = new ComponentConstructor(_this, compConfig);
		
		//Check if magic getter conflicts with existing method
		if(_this[methodName]){
			throw new Error("Method already exists: " + methodName);
		}
		
		//Register Component in App
		_this.components[componentId] = oComp;
		
		//Create magic getter
		_this[methodName] = function(){
			return oComp;
		};
	
		//Register Component Events
		if(compEvents){
			//Array of strings of format "scope.event"
			for(var j = 0; j < compEvents.length; j++){
				var stringParts = compEvents[j].split('.');
				if(stringParts.length === 2){
					(function(){
						var eventScope = stringParts[0],
							eventName = stringParts[1],
							eventHandlerName = 'on' + jQuery.sap.charToUpperCase(eventName);
						
						_this.registerEventAction(eventScope, eventName, function on_event(oEvent){
							oComp[eventHandlerName] && oComp[eventHandlerName](oEvent);
						});
					}());
				}
				else{
					throw new Error("Invalid Component event: " + compEvents[j]);
				}
			}
		}
		
		//Init Component
		oComp.init();
	};
	
	/**
	 * @Private
	 * 
	 */
	var _preloadComponents = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadComponents");

		//Components
		var components = _this.config.data.components,
			loadModules = [],
			compConfigs = [];
		
		for(var i = 0; i < components.length; i++){
			var compConfig = components[i];
			
			if(!compConfig.module || !compConfig.id){
				throw new Error("Cannot load component #" + i + ": module or id attribute missing!");
			}
			else if(false !== compConfig.enabled){
				var moduleName = _this.config.resolvePackage(compConfig.module, "modules");
				compConfig.module = moduleName;
				
				//TODO async!!!
				jQuery.sap.require(moduleName);
				_initComponent(_this, compConfig);
			}
		}

		//Trigger Callback
		callback && callback();
	};
	
	/**
	* Preload Actions for faster execution
	* @Private
	*/
	var _preloadActions = function(_this, callback){
		jQuery.sap.log.debug("AppBase::_preloadActions");
		
		var actions = _this.config.data.actions,
			callI = actions.length;
		
		if(callI === 0){
			callback && callback.call(_this);

			return;
		}
		
		var successCallback = function(data){
			callI--;
			if(callI === 0){
				callback && callback.call(_this);
			}
		};
		
		for(var i = 0; i < actions.length; i++){
			Action.loadFromFile(_this.config.resolvePackage(actions[i], "actions"), successCallback, true);
		}
	};
	
	/**
	 * @Public
	 */
	AppBaseProto.setLanguage = function(language){
		sap.ui.getCore().getConfiguration().setLanguage(language);
	};
	
	/**
	 * @Public
	 */
	AppBaseProto.preload = function(callback){
		jQuery.sap.log.debug("AppBaseProto.preload");
		
		this.config.resolve();

		var _this = this;
		
		_preloadJavaScript(_this, function preloadJavaScriptComplete(){
			_preloadComponents(_this, function _preloadComponentsComplete(){
				_preloadModels(_this, function _preloadModelsComplete(){
					_preloadActions(_this, callback);
				});
			});
		});
	};

	/**
	 * @Public
	 */
	AppBaseProto.load = function(callback){
		jQuery.sap.log.debug("AppBaseProto.load");

		var _this = this;
		this.preload(function(){

			_this.onLoad(new sap.ui.base.Event("ui5strap.app.load", _this, {}));

			callback && callback();
		
		});
	};

	/**
	* Start the app
	*/
	AppBaseProto.start = function(callback){
		jQuery.sap.log.debug("AppBaseProto.start");

		var _this = this;
		if(this.isRunning){
			throw new Error(this + " is already running.");
		}
		
		this.isRunning = true;

		window.addEventListener(
			"message", 
			function on_message(event){
				_this.onMessage(new sap.ui.base.Event("ui5strap.app.message", _this, event.data));
			}, 
			false
		);

		this.onStart(new sap.ui.base.Event("ui5strap.app.start", _this, {}));

		callback && callback();
	};

	/**
	 * 
	 */
	AppBaseProto.show = function(callback){
		jQuery.sap.log.debug("AppBaseProto.show");

		this.isVisible = true;
		this.onShow(new sap.ui.base.Event("ui5strap.app.show", this, {}));

		var isFirstTimeShow = !this.hasFirstShow;
		if(isFirstTimeShow){
			this.log.debug('FIRST SHOW');
		
			this.hasFirstShow = true;
			this.onFirstShow(new sap.ui.base.Event("ui5strap.app.firstShow", this, {}));
		}

		callback && callback(isFirstTimeShow);
	};

	/**
	 * 
	 */
	AppBaseProto.shown = function(callback){
		jQuery.sap.log.debug("AppBaseProto.shown");

		var _this = this;

		ui5strap.polyfill.requestAnimationFrame(function(){
			_this.domRef.className = _createAppClass(_this, 'ui5strap-app ui5strap-app-current');
			
			_this.onShown(new sap.ui.base.Event("ui5strap.app.shown", _this, {}));

			var isFirstTimeShown = !_this.hasFirstShown;
			if(isFirstTimeShown){
				_this.log.debug('FIRST SHOWN');
				_this.hasFirstShown = true;
				_this.onFirstShown(new sap.ui.base.Event("ui5strap.app.firstShown", _this, {}));
			}

			callback && callback(isFirstTimeShown);
		});
	};
	
	/**
	 * 
	 */
	AppBaseProto.hide = function(callback){
		jQuery.sap.log.debug("AppBaseProto.hide");
		
		this.isVisible = false;
		
		this.onHide(new sap.ui.base.Event("ui5strap.app.hide", this, {}));

		callback && callback();
	};
	
	/**
	 * 
	 */
	AppBaseProto.hidden = function(callback){
		jQuery.sap.log.debug("AppBaseProto.hidden");

		var _this = this;
		ui5strap.polyfill.requestAnimationFrame(function(){
			if(null === _this.domRef){
				jQuery.sap.log.warning("AppBaseProto.stop seemed to be executed before AppBaseProto.hidden. This seems to be a bug.");
			}
			else{
				_this.domRef.className = _createAppClass(_this, 'ui5strap-app ui5strap-app-inactive ui5strap-hidden');
			}	
			
			_this.onHidden(new sap.ui.base.Event("ui5strap.app.hidden", _this, {}));

			callback && ui5strap.polyfill.requestAnimationFrame(callback);
		})
	};

	/**
	* Stop the app
	*/
	AppBaseProto.stop = function(callback){
		jQuery.sap.log.debug("AppBaseProto.stop");

		if(!this.isRunning){
			throw new Error(this + " is not running.");
		}

		this.$().remove();
		this.domRef = null;
		this.isRunning = false;

		this.onStop(new sap.ui.base.Event("ui5strap.app.stop", this, {}));

		callback && callback();
	};

	AppBaseProto.unload = function(callback){
		jQuery.sap.log.debug("AppBaseProto.unload");
		
		ui5strap.Layer.unregister(this.overlayId);
		ui5strap.Layer.unregister(this.config.getAppDomId('loader'));

		this.onUnload(new sap.ui.base.Event("ui5strap.app.unload", this, {}));

		this.destroy();

		callback && callback();
	};

	/**
	* Triggered when a message is sent to this app
	* @public
	*/
	AppBaseProto.onMessage = function(oEvent){
		//Fire the message event
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "message",
			"orgEvent" : oEvent
		});
	};
	
	/**
	* Triggered when the window is resized
	* @public
	*/
	AppBaseProto.onResize = function(oEvent){
		//Fire the resize event
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "resize",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been initialized
	* @public
	*/
	AppBaseProto.onInit = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "init",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been (pre-)loaded
	* @public
	*/
	AppBaseProto.onLoad = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "load",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been unloaded
	* @public
	*/
	AppBaseProto.onUnload = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "unload",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been started
	* @public
	*/
	AppBaseProto.onStart = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "start",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been stopped
	* @public
	*/
	AppBaseProto.onStop = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "stop",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app is going to show
	* @public
	*/
	AppBaseProto.onShow = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "show",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been shown
	* @public
	*/
	AppBaseProto.onShown = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "shown",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app is going to show for the first time
	* @public
	*/
	AppBaseProto.onFirstShow = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShow",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been shown for the first time
	* @public
	*/
	AppBaseProto.onFirstShown = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShown",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app is going to hide
	* @public
	*/
	AppBaseProto.onHide = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hide",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been hidden
	* @public
	*/
	AppBaseProto.onHidden = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hidden",
			"orgEvent" : oEvent
		});
	};

	/**
	* Run an action that is assiged to a certain event
	* @public
	*/
	AppBaseProto.runEventAction = function (eventParameters, actionGroupId){
		this.log.debug("Executing event '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
		var actionParameters = {
			"parameters" : actionGroupId
		};

		//OpenUI5 Controller
		if("controller" in eventParameters){
			actionParameters.controller = eventParameters.controller;
		}

		//Original Event
		if("orgEvent" in eventParameters){
			actionParameters.eventSource = eventParameters.orgEvent.getSource();
			actionParameters.eventParameters = eventParameters.orgEvent.getParameters();
			
		}

		this.runAction(actionParameters);
	};

	/**
	* Fires an app event. 
	* The event is either defined in the configuration, or attached to the app instance programatically.
	* @public
	*/
	AppBaseProto.fireEventAction = function(eventParameters){
		if(this.config.data.events){
			var appEvents = this.config.data.events;
			
			//Run the events that are defined in the config
			if(eventParameters.scope in appEvents){
				var events = appEvents[eventParameters.scope];

				if(eventParameters.eventName in events){
					var eventList = events[eventParameters.eventName];
					//Run the list of events
					for(var i = 0; i < eventList.length; i++){ 
						this.runEventAction(eventParameters, eventList[i]);
					}

				}

			}
		}

		//Runtime events
		if(this._events && this._events[eventParameters.scope]){
			var events = this._events[eventParameters.scope];
			if(eventParameters.eventName in events){
				var eventList = events[eventParameters.eventName];
				//Run the list of events
				for(var i = 0; i < eventList.length; i++){ 
					var actionOrFunction = eventList[i];
					if(typeof actionOrFunction === 'function'){
						//Call the registered function with original event as parameter
						this.log.debug("Executing event function '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
						actionOrFunction.call(this, eventParameters.orgEvent);
					}
					else{
						this.runEventAction(eventParameters, actionOrFunction);
					}
				}

			}
		}
	};

	/**
	* Registers an event action to this app instance
	* @public
	*/ 
	AppBaseProto.registerEventAction = function(scope, eventName, actionOrFunction){
		if(!(scope in this._events)){
			this._events[scope] = {};
		}

		if(!(eventName in this._events[scope])){
			this._events[scope][eventName] = [];
		}
		
		this.log.debug("Registered event '" + eventName + "' for scope '" + scope + "'");
		this._events[scope][eventName].push(actionOrFunction);
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- App Overlay ------------------------------------
	* ----------------------------------------------------------------------
	*/
	
	/**
	* Loader
	*/
	AppBaseProto.setLoaderVisible = function(visible, callback){
		//ui5strap.Layer.setVisible('ui5strap-loader', visible, callback, option);
		ui5strap.Layer.setVisible(this.config.getAppDomId('loader'), visible, callback);
	};

	/**
	* Splash Screen
	* @notimplemented
	*/
	AppBaseProto.setSplashVisible = function(visible, callback){
		callback && callback();
		//ui5strap.Layer.setVisible('ui5strap-splash', visible, callback);
	};
	
	

	/**
	* Inititalzes the overlay
	*/
	AppBaseProto.registerOverlay = function(){
		var _this = this;
		
		this.overlayId = this.config.getAppDomId('overlay');

		if(ui5strap.Layer.get(this.overlayId)){
			this._log.warning("Layer already registered: " + this.overlayId);
			return;
		}

		ui5strap.Layer.register(this.overlayId);

		this.overlayControl = new ui5strap.NavContainer();
		//this.overlayControl.placeAt(this.overlayId);
		this.overlayControl.placeAt(this.overlayId + '-content');

		var oModels = this.getRootControl().oModels;
		//var uiArea = sap.ui.getCore().createUIArea(newPage, _this);
		for(var sName in oModels){
			//page.setModel(oModel, sName);
			this.overlayControl.setModel(oModels[sName], sName);
		};

		//jQuery('#' + this.overlayId + '-backdrop').on('tap', function onTap(event){
		//	_this.hideOverlay();
		//});
	};

	/**
	* Returns whether the overlay layer is visible
	* @public
	*/
	AppBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.overlayId);
	};

	/**
	* Shows the overlay layer
	* @public
	*/
	AppBaseProto.showOverlay = function(viewDataOrControl, callback, transitionName){
		var _this = this,
			navControl = this.overlayControl,
			target = "content",
			transitionName = transitionName || 'slide-ttb';
		
		//Set target busy
		navControl.setTargetBusy(target, true);
		
		if(!(viewDataOrControl instanceof ui5strap.Control)){
			var viewParameters = viewDataOrControl.parameters;
			viewDataOrControl = _this.createView(_this.config.getViewConfig(viewDataOrControl));
			
			//Trigger onUpdate events
			navControl.updateTarget(target, viewDataOrControl, viewParameters);
		}
		
		ui5strap.Layer.setVisible(this.overlayId, true, function(){
			navControl.toPage(viewDataOrControl, target, transitionName, function toPage_complete(){
				
				//Set target available
				navControl.setTargetBusy(target, false);
				
				//Trigger callback
				callback && callback();
			});
		});
	};

	/**
	* Hides the overlay layer
	* @public
	*/
	AppBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'slide-btt';
		
		overlayControl.toPage(null, 'content', transitionName, function toPage_complete(){
			ui5strap.Layer.setVisible(_this.overlayId, false, callback);
		});	
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Views ------------------------------
	* ----------------------------------------------------------
	*/

	/**
	 * Create a new View based on configuration object.
	 */
	AppBaseProto.createView = function(viewDef){
		var _this = this,
			pageId = viewDef.id;

		//If id specified check for cache
		//Also create a new valid control id for the view
		if(pageId){
			var cachedPage = this._pageCache[pageId];
			if(viewDef.cache){
				if(cachedPage){
					_this.log.debug("Returning cached page '" + page + "'.");
					
					return cachedPage;
				}
			}
			else{
				//View is NOT cached
				if(cachedPage){
					//View already have been created before
					//Delete cache entry and destroy existing view
					delete this._pageCache[pageId];
					cachedPage.destroy();
				}
			}
		}
		
		var viewConfig = {};
		jQuery.extend(viewConfig, viewDef);
		
		if(pageId){
			viewConfig.id = this.config.createControlId(pageId);
		}
		
		var viewSettings = {};
		jQuery.extend(viewSettings, viewConfig);

		//START Build ViewData
		//The View Data holds the app reference.
		if(!viewConfig.viewData){
			viewConfig.viewData = {};
		}

		if(!viewConfig.viewData.__ui5strap){
			viewConfig.viewData.__ui5strap = {};
		}

		viewConfig.viewData.__ui5strap.app = this;
		viewConfig.viewData.__ui5strap.settings = viewSettings;
		
		//END Build ViewData
		
		//Create View
		//Will crash if "viewName" or "type" attribute is missing!
		var page = new sap.ui.view(viewConfig);
		
		/*
		page.attachAfterInit(null, function(){
			jQuery.sap.log.info("Created page has been initialized.");
		});
		*/
		
		//Add css style class
		if(viewConfig.styleClass){
			page.addStyleClass(viewConfig.styleClass);
		}
		
		if(pageId){
			//Add to page cache
			this._pageCache[pageId] = page;
		}

		return page;
	};

	/*
	* --------------------------------------------------
	* --------------------- ACTIONS --------------------
	* --------------------------------------------------
	*/

	/**
	* Execute an Action
	*/
	AppBaseProto.runAction = function(action){
		action.app = this;
		
		var actionName = action.parameters;
		if(typeof actionName === 'string'){
			actionName = this.config.resolvePackage(actionName, "actions");
			action.parameters = actionName;
		}
		Action.run(action);
	};

	/*
	* --------------------------------------------------
	* --------------------- STORAGE --------------------
	* --------------------------------------------------
	*/
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.setLocalStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		localStorage[this.getId() + '.localStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.getLocalStorageItem = function(storageKey){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		var storageId = this.getId() + '.localStorage.' + storageKey;
		
		return localStorage[storageId] ? JSON.parse(localStorage[storageId]) : null;
	};
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.setSessionStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		sessionStorage[this.getId() + '.sessionStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
	/**
	 * @deprecated
	 * TODO move to component
	 */
	AppBaseProto.getSessionStorageItem = function(storageKey){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		var storageId = this.getId() + '.sessionStorage.' + storageKey;
		
		return sessionStorage[storageId] ? JSON.parse(sessionStorage[storageId]) : null;
	};

	/*
	* --------------------------------------------------
	* --------------------- MODELS ---------------------
	* --------------------------------------------------
	*/

	AppBaseProto.getLocaleString = function(languageKey){
		return this.getModelProperty(languageKey, 'i18n');
	};

	/*
	* Returns a property of a model that is assigned to the root control.
	*/
	AppBaseProto.getModelProperty = function(dataPath, modelName){
		var ressourceModel = this.getRootControl().getModel(modelName);
		if(!ressourceModel){
			return "MISSING: " + dataPath;
			//throw new Error('Invalid model name: "' + modelName + '"');
		}
		return ressourceModel.getProperty(dataPath);
	};

	/*
	* --------------------------------------------------
	* --------------------- Controls -------------------
	* --------------------------------------------------
	*/

	/*
	* Create an control id with app namespace. If viewId is given, the controlId must be local.
	*/ 
	AppBaseProto.createControlId = function(controlId, viewId){
		jQuery.sap.log.warning("ui5strap.AppBase.prototype.createControlId is deprecated! Use ui5strap.AppConfig.prototype.createControlId instead!");
		return this.config.createControlId(controlId, viewId);
	
	};
	
	AppBaseProto.extractRelativeControlId = function(controlId, viewId){
		var prefix = this.config.getAppDomId() + '---';
		
		if(viewId){
			if(jQuery.sap.startsWith(controlId, prefix)){
				//View ID is given, but control ID is already absolute.
				throw new Error("Cannot extract relative control id: controlId is absolute but viewId is given!");
			}
			
			if(jQuery.sap.startsWith(viewId, prefix)){
				//View ID is absolute (has an app prefix)
				prefix = viewId;
			}
			else{	
				//View ID is relative
				prefix += viewId + "--";
			}
		}
		else if(!jQuery.sap.startsWith(controlId, prefix)){
			//View ID is given, but control ID is already absolute.
			throw new Error("Cannot extract relative control id: controlId is not absolute!");
		}
		
		return controlId.substring(prefix.length);
	};

	/*
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	*/
	AppBaseProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.config.createControlId(controlId, viewId));
	};

	AppBaseProto._buildRootControl = function(){
		  alert("Please inherit ui5strap.AppBase._buildRootControl");
	};
	
	/**
	 * @Protected
	 */
	AppBaseProto._buildSingleViewRootControl = function(viewConfig){
		var viewConfig = this.config.getViewConfig(viewConfig),
			oPage = this.createView(viewConfig),
			oController = oPage.getController();
		
		oController.onpageUpdateSingle && oController.onPageUpdateSingle(new sap.ui.base.Event("ui5strap.controller.pageUpdateSingle", this, viewConfig.parameters || {}));
		
		jQuery.sap.require("ui5strap.Container");
		var container = new ui5strap.Container();
		container.addContent(oPage);
		
		return container;
	};
	
	/**
	 * @Public
	 */
	AppBaseProto.getRootComponent = function(){
		return this._rootComponent;
	};
	
	/**
	 * @Public
	 */
	AppBaseProto.setRootComponent = function(rootComponent){
		this._rootComponent = rootComponent;
	};
	
	/**
	 * @Public
	 */
	AppBaseProto.getRootControl = function(){
		
		if(!this._rootControl){
			var rootControl = null;
			if(this.config.data.app.mode === "Devel"){
				var uriParameters = jQuery.sap.getUriParameters(),
					viewName = uriParameters.get("_viewName");
				if(viewName){
					if(jQuery.sap.startsWith(viewName, ".")){
						viewName = this.config.data.app["package"] + viewName;
					}
					var viewParameters = uriParameters.get("_viewParameters");
					if(viewParameters){
						viewParameters = JSON.parse(viewParameters);
					}
					var viewConfig = { 
						type : uriParameters.get("_viewType"),
						viewName : viewName,
						parameters : viewParameters
					};
					rootControl = this._buildSingleViewRootControl(viewConfig);
				}
				else{
					rootControl = this._rootComponent._buildRootControl();
				}
			}
			else{
				rootControl = this._rootComponent._buildRootControl();
			}
			
			this._rootControl = rootControl;
		}
		
		return this._rootControl;
	};

	/*
	* --------------------------------------------------
	* --------------------- Object ---------------------
	* --------------------------------------------------
	*/

	AppBaseProto.hasNature = function(nature){
		return -1 !== jQuery.inArray(nature, this.config.data.app.nature);
	};

	/*
	* Returns the ID of the App
	*/
	AppBaseProto.getId = function(){
		return this.config.data.app.id;
	};
	
	/**
	 * @deprecated Will be removed!
	 */
	AppBaseProto.$ = function(){
		return jQuery(this.domRef);
	};

	/**
	* Get the id of the app defined in the config
	* @public
	* @deprecated
	*/
	AppBaseProto.getUrl = function(){
		return this.config.data.app.url;
	};

	/**
	* Returns the Dom ID of the App
	*/
	AppBaseProto.getDomId = function(subElement){
		jQuery.sap.log.warning("ui5strap.App.prototype.getDomId is deprecated! Use ui5strap.AppConfig.prototype.getAppDomId instead!");
		return this.config.getAppDomId(subElement);
	};

	/**
	 * @Public
	 */
	AppBaseProto.updateContainer = function(){
		if(this.domRef){
			this.domRef.className = _createAppClass(this, 'ui5strap-app ui5strap-app-next ui5strap-hidden');
			return;
		}
		
		var _this = this;
		
		//App Container
		var appContainer = document.createElement('div');
		appContainer.className = _createAppClass(this, 'ui5strap-app ui5strap-app-prepared ui5strap-hidden');
		appContainer.id = this.config.getAppDomId();
		
		//App Content
		var appContent = document.createElement('div');
		appContent.className = 'ui5strap-app-content';
		appContent.id = this.config.getAppDomId('content');
		appContainer.appendChild(appContent);

		//App Overlay
		var appOverlay = document.createElement('div');
		appOverlay.className = 'ui5strap-app-overlay ui5strap-overlay ui5strap-layer ui5strap-hidden';
		appOverlay.id = this.config.getAppDomId('overlay');

		//var appOverlayBackdrop = document.createElement('div');
		//appOverlayBackdrop.className = 'ui5strap-overlay-backdrop';
		//appOverlayBackdrop.id = this.config.getAppDomId('overlay-backdrop');
		/*
		appOverlayBackdrop.onclick = function(){
			_this.hideOverlay();
		};
		*/
		//appOverlay.appendChild(appOverlayBackdrop);

		var appOverlayContent = document.createElement('div');
		appOverlayContent.className = 'ui5strap-overlay-content';
		appOverlayContent.id = this.config.getAppDomId('overlay-content');
		appOverlay.appendChild(appOverlayContent);

		appContainer.appendChild(appOverlay);

		//App Loader
		var appLoader = document.createElement('div');
		appLoader.className = 'ui5strap-app-loader ui5strap-loader ui5strap-layer ui5strap-hidden';
		appLoader.id = this.config.getAppDomId('loader');
		appContainer.appendChild(appLoader);

		ui5strap.Layer.register(appLoader.id, jQuery(appLoader));

		//App Splash
		var appSplash = document.createElement('div');
		appSplash.className = 'ui5strap-app-splash ui5strap-layer ui5strap-hidden';
		appSplash.id = this.config.getAppDomId('splash');
		appContainer.appendChild(appSplash);

		//Cache DOM Ref
		this.domRef = appContainer;
		this.contentDomRef = appContent;
	};
	
	/**
	 * Appends the App to the DOM
	 */
	AppBaseProto.attach = function(containerEl){
		if(!this.isAttached){
			jQuery.sap.log.debug("Attaching app '" + this.getId() + "' to DOM...");
			this.isAttached = true;
			containerEl.appendChild(this.domRef);
			this.registerOverlay();
			this.getRootControl().placeAt(this.contentDomRef);
		}
	};

	/**
	* @Override
	* @Public
	*/
	AppBaseProto.toString = function(){
		return '[' + this.getId() + ']';
	};

	/**
	* Destroys the App and all of its components
	* @Override
	*/
	AppBaseProto.destroy = function(){
		this.log.debug("Destroying app...");
		
		var cacheKeys = Object.keys(this._pageCache);
		
		for(var i = 0; i < cacheKeys.length; i++){
			this.log.debug("Destroying view: " + cacheKeys[i]);
			this._pageCache[cacheKeys[i]].destroy(true);
			delete this._pageCache[cacheKeys[i]];
		}
		
		//Destroy the root control first
		var rootControl = this.getRootControl();
		if(rootControl){
			rootControl.destroy(true);
		}
		
		//Finally, destroy the app object
		sap.ui.base.Object.prototype.destroy.call(this);
	};

	/*
	* --------------------------------------------------
	* --------------------- Controller -----------------
	* --------------------------------------------------
	*/

	/**
	 * Creates an action event handler for the given event.
	 * @Private
	 * @Static
	 */
	var _createActionEventHandler = function(controllerImpl, eventName){
		var eventFunctionName = 'on' + jQuery.sap.charToUpperCase(eventName, 0),
			oldOnPageShow = controllerImpl[eventFunctionName];

		controllerImpl[eventFunctionName] = function(oEvent){ 
			var app = this.getApp();
				
			if(app){
				var view = this.getView(),
					viewId = view.getId(),
					updateEvents = app.config.getEvents('controller', eventName, viewId),
					updateEventsLength = updateEvents.length;

				for(var i = 0; i < updateEventsLength; i++){
				 	var actionName = updateEvents[i];
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: '" + eventName + "') ...");
					app.runAction({
						"parameters" : actionName, 
						"controller" : this,
						"eventSource" : oEvent.getSource(),
						"eventParameters" : oEvent.getParameters()
					});
				}
			}
			
			if(oldOnPageShow){
				oldOnPageShow.call(this, oEvent);
			}
		};
	};

	/**
	 * Adds action functionality to the controller.
	* @Static
	* @Public
	*/
	AppBase.blessController = function(controllerImpl){
		
		if(!controllerImpl.actionEventHandler){
			controllerImpl.actionEventHandler = "__execute";
		}
		if(!controllerImpl.actionAttribute){
			controllerImpl.actionAttribute = "__action";
		}
		
		//Add getApp method if not already exists
		if(!controllerImpl.getApp){
	          controllerImpl.getApp = function(){
	              var viewData = this.getView().getViewData();
	            
	              if(!viewData || !viewData.__ui5strap || !viewData.__ui5strap.app){
	                  return null;
	              }
	              
	              return viewData.__ui5strap.app;
	          }
      	}
		
		/*
		 * All available formatters
		 */
		if(!controllerImpl.formatters){
			controllerImpl.formatters = {};
		}
		
		/**
		 * Formatter that resolves a i18n string.
		 * @Public
		 */
		controllerImpl.formatters.localeString = function(localeString){
			return this.getApp().getLocaleString(localeString);
		};
		
		/**
		 * Extracts the action names for the given event.
		 * @Private
		 * @Static
		 */
		var _getActionFromEvent = function(oEvent, customDataKey){
			var actionName = oEvent.getSource().data(customDataKey),
				actionNamesList = ui5strap.Utils.parseIContent(actionName);
			
			if(typeof actionNamesList === 'object'){
				var eventId = oEvent.getId();
				//Different actions for each event
				if(!eventId || !actionNamesList[eventId]){
					throw new Error('Cannot execute action: no action for eventId ' + eventId);
				}
				actionName = actionNamesList[eventId];
			}
			
			return actionName;
		};

		/*
		 * Action event handler
		 */
		controllerImpl[controllerImpl.actionEventHandler] = function(oEvent){
			this.getApp().runAction({
				"eventSource" : oEvent.getSource(),
				"eventParameters" : oEvent.getParameters(),
				"controller" : this,
				"parameters" : _getActionFromEvent(oEvent, this.actionAttribute)
			});
		};

		var oldOnInit = controllerImpl.onInit;

		controllerImpl.onInit = function(oEvent){ 
			var app = this.getApp();

			if(app){
				//if(!this.actions){
				//	this.actions = jQuery.sap.getObject(app.config.data.app["package"] + ".actions");
				//	console.log("AC", this.actions);
				//}
				
				//TODO find out if view.sViewName is reliable
				var view = this.getView(),
					viewId = view.getId(),
					initEvents = app.config.getEvents('controller', 'init', viewId),
					initEventsLength = initEvents.length;

				for(var i = 0; i < initEventsLength; i++){
					var actionName = initEvents[i];
					
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: 'onInit') ...");
					
					app.runAction({
						"parameters" : actionName, 
						"eventSource" : oEvent.getSource(),
						"eventParameters" : oEvent.getParameters(),
						"controller" : this
					});
				}
			}

			//Call old onInit function
			if(oldOnInit){
				oldOnInit.call(this, oEvent);
			}
		};
		
		//Update
		//TODO rename to pageUpdate
		_createActionEventHandler(controllerImpl, 'update');
		
		//Update
		_createActionEventHandler(controllerImpl, 'pageUpdateSingle');

		//PageHide
		_createActionEventHandler(controllerImpl, 'pageHide');
		
		//PageHidden
		_createActionEventHandler(controllerImpl, 'pageHidden');
		
		//PageShow
		_createActionEventHandler(controllerImpl, 'pageShow');
		
		//PageShown
		_createActionEventHandler(controllerImpl, 'pageShown');
		
	};

	//Return Module Constructor
	return AppBase;
});