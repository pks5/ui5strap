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

	jQuerySap.declare('ui5strap.AppBase');

	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.Action");

	//jQuerySap.require("sap.ui.base.Event");

	sap.ui.base.Object.extend('ui5strap.AppBase', {
		"constructor" : function(config, viewer){
			sap.ui.base.Object.apply(this);

			this.config = config;

			this.components = {};

			this._pageCache = {};
			this._events = {};

			this.isRunning = false;
			this.isVisible = false;
			this.hasFirstShow = false;
			this.hasFirstShown = false;

			this._initLog();

			/*
			* Loader
			*/
			this.setLoaderVisible = function(visible, callback){
				//ui5strap.Layer.setVisible('ui5strap-loader', visible, callback, option);
				ui5strap.Layer.setVisible(this.getDomId('loader'), visible, callback);
			};

			/*
			* Splash Screen
			*/
			this.setSplashVisible = function(visible, callback){
				callback && callback();
				//ui5strap.Layer.setVisible('ui5strap-splash', visible, callback);
			};
		}
	});

	var AppBase = ui5strap.AppBase,
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

	/*
	* Initializes the App
	*/
	AppBaseProto.init = function(){
		this.onInit(new sap.ui.base.Event("ui5strap.app.init", this, {}));
	};

	/*
	* Preload JavaScript libraries
	*/
	var _preloadJavaScript = function(_this, callback){
		var scripts = _this.config.data.js;
		if(scripts.length === 0){
			callback && callback.call(_this);

			return;
		}

		var files = [];
		for(var i = 0; i < scripts.length; i++){
			var jsPath = _this.config.resolvePath(scripts[i]);

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

	var _preloadModels = function(_this, callback){
		_this.log.debug('PRELOADING MODELS');

		//Models
		var models = _this.config.data.models,
			callI = models.length, 
			successCallback = function(oEvent, oData){
				callI --;
				_this.log.debug('LOAD MODEL ' + oData.modelName + ' ...');
				_this.getRootControl().setModel(oData.oModel, oData.modelName);

				if(callI === 0){
					//sap.ui.getCore().setModel(oModel, model['modelName']);
					callback && callback();
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
				modelSrc = _this.config.resolvePath(model);

			
			if(modelType === 'RESOURCE'){
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelSrc,
					async : true
				});
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

	var _preloadComponents = function(_this, callback){
		_this.log.debug('PRELOADING COMPONENTS');

		//Components
		var components = _this.config.data.components;

		var frameConfig = _this.config.data.frames['default'];

		if(frameConfig){
			if(!frameConfig.module){
				frameConfig.module = 'ui5strap.AppFrame';
			}
			frameConfig.id = "frame";
			components.unshift(frameConfig);
		}
		
		var loadModules = [],
			compConfigs = [];
		
		for(var i = 0; i < components.length; i++){
			var compConfig = components[i];
			
			if(!compConfig.module || !compConfig.id){
				throw new Error("Cannot load component #" + i + ": module or id attribute missing!");
			}
			else if(false !== compConfig.enabled){
				compConfigs.push(compConfig);
				loadModules.push(compConfig.module);
			}
		}
		
		ui5strap.require(loadModules, function require_complete(){
			for(var i = 0; i < loadModules.length; i++){
				var ComponentConstructor = jQuery.sap.getObject(loadModules[i]),
					compConfig = compConfigs[i],
					componentId = compConfig.id,
					oComp = new ComponentConstructor(_this, compConfig),
					methodName = 'get' + jQuery.sap.charToUpperCase(componentId);
				
				if(_this[methodName]){
					throw new Error("Name conflict: " + componentId);
				}
				
				oComp.init();
				
				_this.components[componentId] = oComp;
				
				(function(){
					var comp = oComp;
					_this[methodName] = function(){
						return comp;
					};
				}());
				
				if(compConfig.events){
					//Array of strings of format "scope.event"
					for(var j = 0; j < compConfig.events.length; j++){
						var stringParts = compConfig.events[j].split('.');
						if(stringParts.length === 2){
							(function(){
								var eventScope = stringParts[0],
									eventName = stringParts[1],
									eventHandlerName = 'on' + jQuery.sap.charToUpperCase(eventName),
									comp = oComp;
								
								_this.registerEventAction(eventScope, eventName, function on_event(oEvent){
									comp[eventHandlerName] && comp[eventHandlerName](oEvent);
								});
							}());
						}
						else{
							_this.log.error("Cannot register Component event: " + compConfig.events[j]);
						}
					}
				}
			}
	
			callback && callback();
		});
	};
	
	/*
	* Preload Actions for faster execution
	*/
	var _preloadActions = function(_this, callback){
		var actions = _this.config.data.actions,
			callI = actions.length;
		if(callI === 0){
			callback && callback.call(_this);

			return;
		}
		
		var successCallback = function(){
			callI--;
			if(callI === 0){
				callback && callback.call(_this);
			}
		};
		
		for(var i = 0; i < actions.length; i++){
			ui5strap.Action.loadFromFile(actions[i], successCallback);
		}
	};

	AppBaseProto.preload = function(callback){
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

	AppBaseProto.load = function(callback){
		this.log.debug('LOAD');

		var _this = this;
		this.preload(function(){

			_this.onLoad(new sap.ui.base.Event("ui5strap.app.load", _this, {}));

			callback && callback();
		
		});
	};

	/*
	* Start the app
	*/
	AppBaseProto.start = function(callback){
		this.log.debug('START');

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

	AppBaseProto.show = function(callback){
		this.log.debug('SHOW');

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

	AppBaseProto.shown = function(callback){
		this.log.debug('SHOWN');

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

	AppBaseProto.hide = function(callback){
		this.log.debug('HIDE');
		this.isVisible = false;
		
		this.onHide(new sap.ui.base.Event("ui5strap.app.hide", this, {}));

		callback && callback();
	};

	AppBaseProto.hidden = function(callback){
		this.log.debug('HIDDEN');

		var _this = this;
		ui5strap.polyfill.requestAnimationFrame(function(){
			_this.domRef.className = _createAppClass(_this, 'ui5strap-app ui5strap-app-inactive ui5strap-hidden');
				
			_this.onHidden(new sap.ui.base.Event("ui5strap.app.hidden", _this, {}));

			callback && ui5strap.polyfill.requestAnimationFrame(callback);
		})
	};

	/*
	* Stop the app
	*/
	AppBaseProto.stop = function(callback){
		this.log.debug('STOP');

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
		this.log.debug('UNLOAD');

		ui5strap.Layer.unregister(this.overlayId);
		ui5strap.Layer.unregister(this.getDomId('loader'));

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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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

	/*
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
			actionParameters.event = eventParameters.orgEvent;
		}

		this.runAction(actionParameters);
	};

	/*
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

	/*
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

	/*
	* Inititalzes the overlay
	*/
	AppBaseProto.registerOverlay = function(){
		var _this = this;
		
		this.overlayId = this.getDomId('overlay');

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

	/*
	* Returns whether the overlay layer is visible
	* @public
	*/
	AppBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.overlayId);
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	AppBaseProto.showOverlay = function(viewDataOrControl, callback, transitionName){
		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'transition-slide-ttb';
		
		ui5strap.Layer.setVisible(this.overlayId, true, function(){
			if(!(viewDataOrControl instanceof sap.ui.core.Control)){
				viewDataOrControl = _this.createView(_this.config.getViewConfig(viewDataOrControl));
			}
			overlayControl.toPage(viewDataOrControl, "content", transitionName, callback);
		});
	};

	/*
	* Hides the overlay layer
	* @public
	*/
	AppBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'transition-slide-btt';
		
		overlayControl.toPage(null, 'content', transitionName, function toPage_complete(){
			ui5strap.Layer.setVisible(_this.overlayId, false, callback);
		});	
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Views ------------------------------
	* ----------------------------------------------------------
	*/

	/*
	 * Create a new page
	 */
	AppBaseProto.createView = function(viewConfig){
		
		var _this = this,
			pageId = viewConfig.id;

		//If id specified check for cache
		//Also create a new valid control id for the view
		if(pageId){
			var cachedPage = this._pageCache[pageId];
			if(viewConfig.cache){
				if(cachedPage){

					//This is not very good
					//Replace cached viewDef with new viewDef 
					cachedPage.getViewData().__ui5strap.viewDef = viewConfig.viewData.__ui5strap.viewDef;
					
					return cachedPage;
				}
			}
			else{
				if(cachedPage){
					delete this._pageCache[pageId];
					cachedPage.destroy();
					delete cachedPage;
				}
			}

			viewConfig.id = this.createControlId(pageId);
		}

		if(!viewConfig.viewData){
			viewConfig.viewData = {};
		}

		if(!viewConfig.viewData.__ui5strap){
			viewConfig.viewData.__ui5strap = {};
		}

		viewConfig.viewData.__ui5strap.app = this;

		//if(!viewConfig.viewName){
		//	throw new Error('Cannot obtain view configuration: no "viewName" specified.');
		//}

		//Will crash if "viewName" or "type" attribute is missing!
		var page = new sap.ui.view(viewConfig);

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

	/*
	* Execute an Action
	*/
	AppBaseProto.runAction = function(action){
		action.app = this;

		jQuery.sap.require('ui5strap.Action');
		ui5strap.Action.run(action);
	};

	/*
	* --------------------------------------------------
	* --------------------- MESSAGES -------------------
	* --------------------------------------------------
	*/

	/*
	* App messages from a Ui5Strap app is directly passed to the current window's parent, if available.
	*/
	AppBaseProto.sendMessage = function(appMessage){
		appMessage.sender = this.getId();

		if(appMessage.toParent && self !== top){
	    	parent.postMessage(appMessage, '*');
	    }
	};
	
	/*
	* --------------------------------------------------
	* --------------------- STORAGE --------------------
	* --------------------------------------------------
	*/
	
	AppBaseProto.setLocalStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		localStorage[this.getId() + '.localStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
	AppBaseProto.getLocalStorageItem = function(storageKey){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		var storageId = this.getId() + '.localStorage.' + storageKey;
		
		return localStorage[storageId] ? JSON.parse(localStorage[storageId]) : null;
	};
	
	AppBaseProto.setSessionStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		sessionStorage[this.getId() + '.sessionStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
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

		if(viewId){
			controlId = viewId + '--' + controlId;
		}
		
		var appPrefix = this.getDomId() + '---';
		if(!jQuery.sap.startsWith(controlId, appPrefix)){
			controlId = appPrefix + controlId;
		}
		
		return controlId;
	
	};

	/*
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	*/
	AppBaseProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.createControlId(controlId, viewId));
	};

	AppBaseProto.getRootControl = function(){
		
		alert("Please inherit ui5strap.AppBase.getRootControl");
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

	/*
	* Get the id of the app defined in the config
	* @public
	*/
	AppBaseProto.getUrl = function(){
		return this.config.data.app.url;
	};

	/*
	* Returns the Dom ID of the App
	*/
	AppBaseProto.getDomId = function(subElement){
		return this.config.data.app.id.replace(/\./g, '__') + (subElement ? '---' + subElement : '');
	};

	AppBaseProto.createDomRef = function(){
		var _this = this;
		
		//App Container
		var appContainer = document.createElement('div');
		appContainer.className = _createAppClass(this, 'ui5strap-app ui5strap-app-prepared ui5strap-hidden');
		appContainer.id = this.getDomId();
		
		//App Content
		var appContent = document.createElement('div');
		appContent.className = 'ui5strap-app-content';
		appContent.id = this.getDomId('content');
		appContainer.appendChild(appContent);

		//App Overlay
		var appOverlay = document.createElement('div');
		appOverlay.className = 'ui5strap-app-overlay ui5strap-overlay ui5strap-layer ui5strap-hidden';
		appOverlay.id = this.getDomId('overlay');

		//var appOverlayBackdrop = document.createElement('div');
		//appOverlayBackdrop.className = 'ui5strap-overlay-backdrop';
		//appOverlayBackdrop.id = this.getDomId('overlay-backdrop');
		/*
		appOverlayBackdrop.onclick = function(){
			_this.hideOverlay();
		};
		*/
		//appOverlay.appendChild(appOverlayBackdrop);

		var appOverlayContent = document.createElement('div');
		appOverlayContent.className = 'ui5strap-overlay-content';
		appOverlayContent.id = this.getDomId('overlay-content');
		appOverlay.appendChild(appOverlayContent);

		appContainer.appendChild(appOverlay);

		//App Loader
		var appLoader = document.createElement('div');
		appLoader.className = 'ui5strap-app-loader ui5strap-loader ui5strap-layer ui5strap-hidden';
		appLoader.id = this.getDomId('loader');
		appContainer.appendChild(appLoader);

		ui5strap.Layer.register(appLoader.id, jQuery(appLoader));

		//App Splash
		var appSplash = document.createElement('div');
		appSplash.className = 'ui5strap-app-splash ui5strap-layer ui5strap-hidden';
		appSplash.id = this.getDomId('splash');
		appContainer.appendChild(appSplash);

		//Cache DOM Ref
		this.domRef = appContainer;
		this.contentDomRef = appContent;
	};
	
	AppBaseProto.updateDomRef = function(){
		this.domRef.className = _createAppClass(this, 'ui5strap-app ui5strap-app-next ui5strap-hidden');
	};

	/*
	* @override
	*/
	AppBaseProto.toString = function(){
		return '[' + this.getId() + ']';
	};

	/*
	* Destroys the App and all of its components
	* @override
	*/
	AppBaseProto.destroy = function(){
		//Destroy the root control first
		var rootControl = this.getRootControl();
		if(rootControl){
			rootControl.destroy();
		}

		//Finally, destroy the app object
		sap.ui.base.Object.prototype.destroy.call(this);
	};

	/*
	* --------------------------------------------------
	* --------------------- Controller -----------------
	* --------------------------------------------------
	*/

	var _createActionEventHandler = function(controllerImpl, eventName){
		var eventFunctionName = 'on' + jQuery.sap.charToUpperCase(eventName, 0),
			oldOnPageShow = controllerImpl[eventFunctionName];

		controllerImpl[eventFunctionName] = function(oEvent){ 
			var app = this.getApp();
				
			if(app){
				var view = this.getView(),
					updateEvents = app.config.getEvents('controller', eventName, view.getViewName()),
					updateEventsLength = updateEvents.length,
					viewId = view.getId();

				for(var i = 0; i < updateEventsLength; i++){
				 	var actionName = updateEvents[i];
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: '" + eventName + "') ...");
					app.runAction({
						"parameters" : actionName, 
						"controller" : this,
						"event" : oEvent
					});
				}
			}
			
			if(oldOnPageShow){
				oldOnPageShow.call(this, oEvent);
			}
		};
	};

	/*
	* @Static
	*/
	AppBase.blessController = function(controllerImpl){

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

        //Controller event handler
        var _controllerEventHandler = function(oEvent){
			this.getApp().runAction({
				"event" : oEvent, 
				"controller" : this
			});
		};

		//New action event handler
		controllerImpl["a_run"] = _controllerEventHandler;
		
		var _controllerEventHandler2 = function(oEvent){
			this.getApp().runAction({
				"event" : oEvent, 
				"controller" : this,
				"parameters" : {
					"__format" : "AJ2.0"
				}
			});
		};

		controllerImpl["__execute"] = _controllerEventHandler2;

		var oldOnInit = controllerImpl.onInit;

		controllerImpl.onInit = function(oEvent){ 
			var app = this.getApp();

			if(app){
				//TODO find out if view.sViewName is reliable
				var view = this.getView(),
					initEvents = app.config.getEvents('controller', 'init', view.sViewName),
					initEventsLength = initEvents.length,
					viewId = view.getId();

				for(var i = 0; i < initEventsLength; i++){
					var actionName = initEvents[i];
					
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: 'onInit') ...");
					
					app.runAction({
						"parameters" : actionName, 
						"event" : oEvent,
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
		_createActionEventHandler(controllerImpl, 'update');

		//PageHide
		_createActionEventHandler(controllerImpl, 'pageHide');
		
		//PageHidden
		_createActionEventHandler(controllerImpl, 'pageHidden');
		
		//PageShow
		_createActionEventHandler(controllerImpl, 'pageShow');
		
		//PageShown
		_createActionEventHandler(controllerImpl, 'pageShown');
		
	};

}());