/*
 * 
 * UI5Strap
 *
 * App
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

	jQuerySap.declare('ui5strap.App');

	jQuerySap.require("sap.ui.core.mvc.HTMLView");
	jQuerySap.require("sap.ui.core.CustomData");
	jQuerySap.require("sap.ui.model.resource.ResourceModel");
	jQuerySap.require("sap.ui.model.json.JSONModel");
	
	sap.ui.base.Object.extend('ui5strap.App', {
		"constructor" : function(config, options){
			sap.ui.base.Object.apply(this);
			
			this.config = config;
			this.options = options;

			this.components = {};

			this._events = {};
			this._isRunning = false;

			//Init local vars
			this._runtimeData = {
				"theme" : null,
				"css" : {},
				"js" : {}
			};

			this._initLog();
		}
	});

	var App = ui5strap.App,
		AppProto = App.prototype,
		AppConfig = ui5strap.AppConfig;

	/*
	* Preload resources e.g. images and json files
	* @protected
	*/
	var _preloadViews = function(views, callback){
		//TODO use Object.keys
		var viewsLeft = 0;
		for(var viewSrc in views){
			viewsLeft++;
		}

		if(!views || 0 === viewsLeft){
			callback && callback();
		}

		var consoleOutput = '';

		var viewCallback = function(){
			viewsLeft -- ;
			if(viewsLeft === 0){
				jQuery.sap.log.debug("[APP] PRELOAD " + consoleOutput);
				callback && callback();
			}
		};

		for(var viewSrc in views){
			var viewData = views[viewSrc];
			if(viewData.preload && 'HTML' === viewData.type){
				//We are currently only able to cache HTML views
				var viewUrl = sap.ui.core.mvc.HTMLView._getViewUrl(viewSrc);

				if(viewUrl in sap.ui.core.mvc.HTMLView._mTemplates){
					viewCallback();
				}
				else{ 
					jQuery.ajax({
							"url" : viewUrl,
							"cache" : true,
							"dataType" : "text",
							"success" : function(text){
								consoleOutput += viewSrc + " ";
								sap.ui.core.mvc.HTMLView._mTemplates[this.url] = text;
								viewCallback();
							},
								
							"error" : viewCallback
					});	
				}
				
			}
			else{
				viewCallback();
			}
		} 
	};

	/*
	* Preload JavaScript libraries
	*/
	var _preloadJavaScript = function(_this, callback){
		var scripts = [];
		if("js" in _this.config.data){
			scripts = _this.config.data.js;
		}

		if(scripts.length === 0){
			callback && callback.call(_this);

			return;
		}

		var files = [];
		for(var i = 0; i < scripts.length; i++){
			var jsPath = AppConfig.resolvePath(scripts[i], _this._config.app["package"]);

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

	var _preloadModels = function(_this, models, appBase, callback){
		//Models
		var callI = models.length, 
			successCallback = function(oEvent, oData){
				callI --;
				//jQuery.sap.log.debug('[APP] LOADED MODEL ' + oData.modelName + ' ...');
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
				modelSrc = ("package" in model ? jQuery.sap.getModulePath(model["package"]) : appBase) + "/" + model['src'];

			
			if(modelType === 'RESOURCE'){
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelSrc
					,
					async : true
				});
				//successCallback({}, { modelName: modelName, oModel : oModel });
				oModel.attachRequestCompleted({ modelName: modelName, oModel : oModel }, successCallback);
				oModel.attachRequestFailed({ modelName: modelName, modelSrc : modelSrc }, errorCallback);
			}
			else if(modelType === 'JSON'){
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(modelSrc);
				oModel.attachRequestCompleted({ modelName: modelName, oModel : oModel }, successCallback, oModel);
				oModel.attachRequestFailed({ modelName: modelName, modelSrc : modelSrc }, errorCallback);
			}
			else{
				throw new Error('Invalid model type!');
			}
		}
	};

	/*
	* @Private
	*/
	var _setLayerVisible = function(_this, statusVarName, $layer, option, visible, callback){
			if(visible && _this[statusVarName] || $layer.length === 0){
				if(typeof callback === 'function'){ 
					callback.call(_this);
				}
				return this;
			}

			_this[statusVarName] = visible;

			if(visible){
				$layer.css({
					display : 'block',
					opacity : 0
				});

				if(option){
					$layer.attr('class', $layer.attr('id') + '-' + option);
				}
			}

			window.setTimeout(function(){

				$layer.animate(
					{
						opacity: visible ? 1 : 0,
				  	}, 
				  	250, 
				  	function() {
					    if(!visible){
					    	$layer.css('display', 'none');
					    }

					    if(typeof callback === 'function'){ 
							callback.call(_this);
						}
					}
				);

			}, 50);
			
	};

	/*
	* Init sapplication specific logging
	* @protected
	*/
	AppProto._initLog = function(){
		
		this.log = {

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

	/*
	* Initializes the App
	*/
	AppProto.init = function(){
		this.onInit();
	};

	AppProto.preload = function(callback){
		var app = this,
			_this = this;

		var _configData = this.config.data;

		var appBase = _configData.app['location'],
			libs = _configData.libraries;

		//Libraries
		for(var i = 0; i < libs.length; i++){
			var lib = libs[i],
				libPackage = lib['package'];

			if(libPackage === 'ui5os' ||
				libPackage === 'ui5strap'){
				throw new Error('Do not include the libraries "ui5strap" and "ui5os" into your libraries configuration.');
			}
			jQuerySap.registerModulePath(libPackage, lib['location']);

			if(lib.preload){
				
				jQuerySap.require(libPackage + '.library');

				var consoleOutput = '',
					libData = sap.ui.getCore().getLoadedLibraries()[libPackage];
				
				for(var j = 0; j < libData.elements.length; j++){
					consoleOutput += libData.elements[j] + " ";
					jQuerySap.require(libData.elements[j]);
				}

				for(var j = 0; j < libData.controls.length; j++){
					consoleOutput += libData.controls[j] + " ";
					jQuerySap.require(libData.controls[j]);
				}

				jQuerySap.log.debug('[APP] PRELOAD ' + consoleOutput); 
			}
		}

		//Init Frame
		this.initFrame();

		var comps = _configData.components;
		for(var i = 0; i < comps.length; i++){
			var comp = comps[i];
			
			this.registerComponent(comp);
		}

		_preloadModels(_this, _configData.models, appBase, function(){
			
			_this.getRootControl().placeAt(_this.options.container || 'ui5strap-body');

			_this.includeStyle(function(){
				_preloadJavaScript(_this, function preloadJavaScriptComplete(){
					_preloadViews(_configData.views, function preloadViewsComplete(){
						_this.onLoad();
					
						callback && callback.call(_this);
					});
				});
			});
		});

	};

	AppProto.start = function(){
		var _this = this;
		if(this._isRunning){
			throw new Error(this + " is already running.");
		}
		
		jQuery.sap.log.debug('[APP] START');
		
		this._isRunning = true;

		_this.onStart();
	};

	AppProto.stop = function(){
		if(!this._isRunning){
			throw new Error(this + " is not running.");
		}

		jQuery.sap.log.debug('[APP] STOP');

		this._isRunning = false;

		this.onHide();
		
		this.onHidden();

		this.onStop();
	};

	/*
	* Initializes the frame module
	* @deprecated
	*/
	AppProto.initFrame = function(){
		var frameConfig = this.config.data.frames.default;

		if(!frameConfig){
			return;
		}

		frameConfig.id = "frame";

		this.registerComponent(frameConfig);

		var frame = this.getFrame();

		frame.init();
	};

	/*
	* Include the style that is neccessary for this app
	* @public
	*/
	AppProto.includeStyle = function(callback){
		var _this = this;
		var configData = this.config.data;
		if(configData.app.theme){ 
			this.setTheme(configData.app.theme);
		}
		
		if(! ("css" in configData)){
			configData.css = {};
		}

		var cssKeys = Object.keys(configData.css);
		var callbackCount = cssKeys.length;

		if(callbackCount === 0){
			callback && callback.call(this);

			return;
		}

		
		var error = function(e){
			alert('Could not load style!');
			throw e;
		};

		var callbackI = 0;

		var success = function(){
			callbackI++;
			if(callbackI === callbackCount){
				callback && callback.call(_this);
			}
		};

		var loadStyles = [];
		//TODO Replace by normal for loop 
		for(var i = 0; i < cssKeys.length; i++){
			var cssKey = cssKeys[i],
				cssPath = AppConfig.resolvePath(configData.css[cssKey], configData.app["package"]);

			cssKey = 'css--' + this.getId() + '--' + cssKey;

			if(! ( cssKey in this._runtimeData.css ) ){	
				this.log.debug("Css stylesheet '" + cssPath + "' included.");
					
				this._runtimeData.css[cssKey] = cssPath;
			//	loadStyles.push(cssPath);
				jQuery.sap.includeStyleSheet(cssPath, cssKey, success, error);
			}
			
			else{
				this.log.debug("Css stylesheet '" + cssPath + "' already included.");
				success();
			}
		}
	};

	AppProto.registerComponent = function(compConfig){
		if(!("module" in compConfig) || !("id" in compConfig)){
			throw new Error("Invalid component declaration!");
		}
		var _this = this,
			compId = compConfig.id,
			compModule = compConfig.module,
			methodName = 'get' + jQuery.sap.charToUpperCase(compId);

		this.components[compId] = null;

		this[methodName] = function(){
			if(!this.components[compId]){
				jQuery.sap.require(compModule);

				var CompConstructor = jQuery.sap.getObject(compModule),
					comp = new CompConstructor(this, compConfig);
				
				comp.init();

				this.components[compId] = comp;
			}

			return this.components[compId];
		}

		if(compConfig.events){
			for(var i = 0; i < compConfig.events.length; i++){
				var stringParts = compConfig.events[i].split('.');
				if(stringParts.length === 2){ //console.log(stringParts);
					this.registerEventAction(stringParts[0], stringParts[1], function(orgEvent){
						var comp = _this[methodName]();
						var eventName = 'on' + jQuery.sap.charToUpperCase(stringParts[1]);
						if(eventName in comp){
							comp[eventName](orgEvent);
						}
					});
				}
			}
		}
	};
	
	/*
	* Returns the ID of the App
	*/
	AppProto.getId = function(){
		return this.config.data.app.id;
	};

	/*
	* Returns the Dom ID of the App
	*/
	AppProto.getDomId = function(){
		return this.config.data.app.id.replace(/\./g, '__');
	};

	/*
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	*/
	AppProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.createControlId(controlId, viewId));
	};

	AppProto.getRootControl = function(){
		return this.getFrame().control;
	}; 

	/*
	* Create an control id with app namespace. If viewId is given, the controlId must be local.
	*/ 
	AppProto.createControlId = function(controlId, viewId){

		if(viewId){
			controlId = viewId + '--' + controlId;
		}
		
		var appPrefix = this.getDomId() + '---';
		if(!jQuery.sap.startsWith(controlId, appPrefix)){
			controlId = appPrefix + controlId;
		}
		
		return controlId;
	
	};

	AppProto.getLocaleString = function(languageKey){
		return this.getModelProperty(languageKey, 'i18n');
	};

	AppProto.getModelProperty = function(dataPath, modelName){
		var ressourceModel = this.getRootControl().getModel(modelName);
		if(!ressourceModel){
			throw new Error('Invalid model name: "' + modelName + '"');
		}
		return ressourceModel.getProperty(dataPath);
	};

	/*
	* Sets the theme of the app
	*/
	AppProto.setTheme = function(themeName){
		if(!themeName || "base" === themeName){
			sap.ui.getCore().applyTheme("base");
			return;
		}

		if(jQuery.sap.startsWith(themeName, "sap_")){
			sap.ui.getCore().applyTheme(themeName);
			return;
		}
		//sap.ui.getCore().setThemeRoot(themeName, );
		sap.ui.getCore().applyTheme(themeName, this.options.pathToServletRoot + '/theme');
	};
	
	/*
	* Loader
	*/
	AppProto.loaderVisible = false;
	AppProto.$loader = jQuery('#ui5strap-loader');

	AppProto.setLoaderVisible = function(visible, callback, option){
		_setLayerVisible(this, 'loaderVisible', this.$loader, option, visible, callback);
	};

	/*
	* Splash Screen
	*/
	AppProto.splashVisible = false;
	AppProto.$splash = jQuery('#ui5strap-splash');

	AppProto.setSplashVisible = function(visible, callback, option){
		_setLayerVisible(this, 'splashVisible', this.$splash, option, visible, callback);
	};

	/*
	* Triggered when the app has been initialized
	* @public
	*/
	AppProto.onInit = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "init"
		});
	};

	/*
	* Triggered when the app has been (pre-)loaded
	* @public
	*/
	AppProto.onLoad = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "load"
		});
	};

	/*
	* Triggered when the app has been started
	* @public
	*/
	AppProto.onStart = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "start"
		});
	};

	/*
	* Triggered when the app is going to show
	* @public
	*/
	AppProto.onShow = function(){
		if(this._isVisible){
			throw new Exception('App is already visible!');
		}

		this._isVisible = true;

		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "show"
		});
	};

	/*
	* Triggered when the app is going to show for the first time
	* @public
	*/
	AppProto.onFirstShow = function(){
		var _this = this;

		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShow"
		});

		this.getFrame().showInitialContent(function showInitialContentComplete(){
			_this.setLoaderVisible(false, function(){
				_this.setSplashVisible(false, function(){
					_this.onShown();

					_this.onFirstShown();
				});
			});
		});
	};

	/*
	* Triggered when the app has been shown
	* @public
	*/
	AppProto.onShown = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "shown"
		});
	};

	/*
	* Triggered when the app has been shown for the first time
	* @public
	*/
	AppProto.onFirstShown = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShown"
		});
	};

	/*
	* Triggered when the app is going to hide
	* @public
	*/
	AppProto.onHide = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hide"
		});
	};

	/*
	* Triggered when the app has been hidden
	* @public
	*/
	AppProto.onHidden = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hidden"
		});
	};

	/*
	* Triggered when the app has been stopped
	* @public
	*/
	AppProto.onStop = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "stop"
		});
	};

	/*
	* Triggered when the app has been unloaded
	* @public
	*/
	AppProto.onUnload = function(){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "unload"
		});
	};

	/**
	* Triggered when a message is sent to this app
	* @public
	*/
	AppProto.onMessage = function(appMessageEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "message",
			"orgEvent" : appMessageEvent
		});
	};

	/*
	* App messages from a Ui5Strap app is directly passed to the current window's parent, if available.
	*/
	AppProto.sendMessage = function(appMessage){
		appMessage.sender = this.getId();

		if(appMessage.toParent && self !== top){
	    	parent.postMessage(appMessage, '*');
	    }
	};

	/*
	* Run an action that is assiged to a certain event
	* @public
	*/
	AppProto.runEventAction = function (eventParameters, actionGroupId){
		this.log.debug("Executing event '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
		var actionParameters = {
			"parameters" : actionGroupId, 
			"app" : this  
		};

		//OpenUI5 Standard Event (e.g. ontap)
		//TODO rename attribute "oEvent"
		if("oEvent" in eventParameters){
			actionParameters.oEvent = eventParameters.oEvent;
		}

		//OpenUI5 Controller
		if("controller" in eventParameters){
			actionParameters.controller = eventParameters.controller;
		}

		//Original Custom Event (e.g. onMessage)
		if("orgEvent" in eventParameters){
			actionParameters.orgEvent = eventParameters.orgEvent;
		}

		ui5strap.Action.run(actionParameters);
	};

	/*
	* Fires an app event. 
	* The event is either defined in the configuration, or attached to the app instance programatically.
	* @public
	*/
	AppProto.fireEventAction = function(eventParameters){
		if(!("events" in this.config.data)){
			return;
		}

		var appEvents = this.config.data.events;
		
		//Run the events that are defined in the config
		if(eventParameters.scope in appEvents){
			var events = appEvents[eventParameters.scope];

			if(eventParameters.eventName in events){
				
				//Run the list of events
				for(var i in events[eventParameters.eventName]){ 
					this.runEventAction(eventParameters, events[eventParameters.eventName][i]);
				}

			}

		}

		//Runtime events
		if(eventParameters.scope in this._events){
			var events = this._events[eventParameters.scope];
			if(eventParameters.eventName in events){

				//Run the list of events
				for(var i in events[eventParameters.eventName]){
					var actionOrFunction = events[eventParameters.eventName][i];
					if(typeof actionOrFunction === 'function'){
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
	AppProto.registerEventAction = function(scope, eventName, actionOrFunction){
		if(!(scope in this._events)){
			this._events[scope] = {};
		}

		if(!(eventName in this._events[scope])){
			this._events[scope][eventName] = [];
		}
				
		this._events[scope][eventName].push(actionOrFunction);
	};

}());