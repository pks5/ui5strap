/*!
 * 
 * UI5Strap
 *
 * pks.ui5strap.viewer.AppBase
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

sap.ui.define(['./library', "../core/library", 'sap/ui/base/Object', 'sap/ui/base/ManagedObject',"sap/ui/core/Control", "sap/ui/core/mvc/View", 'sap/ui/core/UIArea', './Action', "../core/Utils", "../core/Layer"], function(ui5strapViewerLib, ui5strapCoreLib, ObjectBase, ManagedObject, ControlBase, ViewBase, UIArea, Action, Utils, Layer){
	
	"use strict";
	
	/**
	 * Constructor for a new App instance.
	 * 
	 * @param {pks.ui5strap.viewer.AppConfig} oAppConfig - App configuration.
	 * @param {pks.ui5strap.viewer.ViewerBase} oViewer - Viewer instance that loaded this app.
	 * 
	 * @class
	 * Abstract base class for ui5strap apps.
	 * @extends sap.ui.base.Object
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @protected
	 * @alias pks.ui5strap.viewer.AppBase
	 * 
	 */
	var AppBase = ObjectBase.extend('pks.ui5strap.viewer.AppBase', /** @lends pks.ui5strap.viewer.AppBase.prototype */{
		metadata : {
			interfaces : ["pks.ui5strap.viewer.IApp"]
		},
		
		/**
		 * @constructs
		 */
		"constructor" : function(config, viewer){
			sap.ui.base.Object.apply(this);
			
			//App Configuration
			this.config = config;
			
			//Init local vars
			this._runtimeData = {
				"css" : {},
				"js" : {}
			};
			
			//Components
			this.components = {};
			
			//Controls & Root Component
			this._rootComponent = this;
			this._rootControl = null;
			this._overlayNavigator = null;
			
			//Cache and App Events
			this._pageCache = {};
			this._events = {};
			
			//Runtime Flags
			this.isAttached = false;
			this.isRunning = false;
			this.isVisible = false;
			this.hasFirstShow = false;
			this.hasFirstShown = false;
			
			//Init Log
			this._initLog(viewer);
			
			 
            this.m_sInstanceId = Utils.randomUUID();
        
            /**
			 * Send an App Message.
			 */
			this.sendMessage = function(appMessage){
				appMessage.sender = this.getId();

				viewer.sendMessage(appMessage);
			};
			
			this._registerSharedComponent = function(oCompConfig, oComp){
				viewer.registerSharedComponent(oCompConfig.id, oComp);
			};
			
			this._getSharedComponent = function(sId){
				return viewer.getSharedComponent(sId);
			};
		}
	}),
	/**
	 * @alias pks.ui5strap.viewer.AppBase.prototype
	 */
	AppBaseProto = AppBase.prototype,
	SAP_LOG = jQuery.sap.log,
	APP_PREFIX_STYLE_CLASS = "ui5strapApp";

	/**
	* Init app specific logging
	* 
	* @param viewer {ui5strap.ViewerBase} The viewer that loaded this app.
	* @protected
	*/
	AppBaseProto._initLog = function(viewer){
		var _this = this;
		this.log = {

			debug : function (message) {
				viewer.log.debug(_this + " " + message, _this.getId());
			},

			warning : function (message) {
				viewer.log.warning(_this + " " + message, _this.getId());
			},

			error : function (message) {
				viewer.log.error(_this + " " + message, _this.getId());
			},

			info : function (message) {
				viewer.log.info(_this + " " + message, _this.getId());
			},

			fatal : function (message) {
				viewer.log.fatal(_this + " " + message, _this.getId());
			}

		};
	};
	
	/**
	 * Helper function to create the app root css class.
	 * 
	 * @param _this {pks.ui5strap.viewer.AppBase} Instance of the app to apply this function to.
	 * @param appClasses {string} Existing classes.
	 * @private
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
	* Initializes the App. Usually triggered by the viewer.
	*/
	AppBaseProto.init = function(){
		this.onInit(new sap.ui.base.Event("ui5strap.app.init", this, {}));
	};
	
	/**
	* Preload JavaScript libraries defined in configuration.
	* 
	* @param _this {pks.ui5strap.viewer.AppBase} Instance of the app to apply this function to.
	* @param callback {function} The callback function. 
	* @private
	*/
	var _preloadJavaScript = function(_this, callback){
		SAP_LOG.info(_this + " Preloading JavaScript ...");
		
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

		var scriptBlock = new Utils.ScriptBlock();

		scriptBlock.load(files, function(){
			scriptBlock.execute(true);

			callback && callback.call(_this);
		});
	};

	/**
	 * Preload models defined in configuration.
	 * 
	 * @param _this {pks.ui5strap.viewer.AppBase} Instance of the app to apply this function to.
	 * @param callback {function} The callback function. 
	 * @private
	 */
	var _preloadModels = function(_this, callback){
		SAP_LOG.info(_this + " Preloading models ...");

		//Models
		var models = _this.config.data.models,
			callI = models.length, 
			loaded = {},
			successCallback = function(oEvent, oData){
				callI --;
				
				if(callI >= 0){
					if(oData.oModel !== loaded[oData.modelName]){
						SAP_LOG.debug(_this + " Loaded model '" + oData.modelName + "'.");
						
						_this.setRootModel(oData.oModel, oData.modelName);
						loaded[oData.modelName] = oData.oModel;
					}
					else{
						SAP_LOG.warning("Model already loaded: " + oData.modelName);
					}
				}
				
				if(callI === 0){
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
				modelSrc = _this.config.resolvePath(model, true);

			
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
					//TODO define somewhere which resource model is default.
					modelName === "i18n" ?
					function(oEvent, oData){
						_this._i18nModel = oData.oModel;
						var bundle = oData.oModel.getResourceBundle();
						bundle.then(function(theBundle){
							_this._i18nBundle = theBundle;
							successCallback(oEvent, oData);
						});
					}
					: successCallback
				);
				oModel.attachRequestFailed(
					{ 
						modelName: modelName, 
						modelSrc : modelSrc
					}, 
					errorCallback
				);
				
				
				/*
				successCallback(null, { 
					modelName: modelName, 
					oModel : oModel
				});
				*/
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
	 * Initializes an app component.
	 * 
	 * @param _this {pks.ui5strap.viewer.AppBase} Instance of the app to apply this function to.
	 * @param compConfig {object} The component configuration object.
	 * @param oComp {object} The component instance.
	 * @private
	 */
	var _initComponent = function(_this, compConfig, oComp, bSuppressInit){
		var componentId = compConfig.id,
			compEvents = compConfig.events,
			methodName = 'get' + jQuery.sap.charToUpperCase(componentId);
		
		//Check if magic getter conflicts with existing method
		if(_this[methodName]){
			throw new Error("Name Conflict! Please choose a different ID for component " + componentId);
		}
		
		//Register Component in App
		_this.components[componentId] = oComp;
		
		//Create magic getter
		_this[methodName] = function(){
			return oComp;
		};
		
		//Init Component
		if(!(oComp instanceof ManagedObject) && !bSuppressInit){
			oComp.init();
		}
		
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
		
		
	};
	
	/**
	 * Preloads the root component.
	 * 
	 * @param _this {pks.ui5strap.viewer.AppBase} Instance of the app to apply this function to.
	 * @param callback {function} The callback function.
	 */
	var _preloadRootComponent = function(_this, callback){
		//TODO this must become standard
		if(_this.config.data.app.rootComponent){
			sap.ui.getCore().createComponent({
				//TODO Does the root component need a stable ID?
				//id : _this.config.getAppDomId("root"),
		        name: _this.config.data.app["package"],
		        async : true,
		        settings: {
		        	app : _this
		        }
		    }).then(function(rootComponent){
		    	_this._rootComponent = rootComponent;
		    	
		    	callback && callback();
		    });
		}
		else{
			callback && callback();
		}
	};
	
	/**
	 * Preloads components defined in configuration.
	 * 
	 * @param _this {pks.ui5strap.viewer.AppBase} Instance of the app to apply this function to.
	 * @param callback {function} The callback function. 
	 * @private
	 */
	var _preloadComponents = function(_this, callback){
		SAP_LOG.info(_this + " Preloading components ...");
		
		//Components
		var components = _this.config.data.components,
			compCount = components.length,
			asyncHelper = compCount,
			then = function(){
				asyncHelper--;
				
				if(asyncHelper === 0){
					//Trigger Callback
					callback && callback();
				}
			};
		
		//Callback immediately if compCount is 0
		!compCount && callback && callback();	
			
		for(var i = 0; i < compCount; i++){
			(function(){
				var compConfig = components[i];
				if(false === compConfig.enabled){
					then();
					return;
				}
				
				if(!compConfig.id){
					throw new Error("Cannot load component #" + i + ": id attribute missing!");
				}
				
				if(compConfig["type"]){
					var compSettings = { app : _this },
						bViewerScope = "VIEWER" === compConfig.scope;
				
					jQuery.extend(compSettings, compConfig.settings);
					
					if(bViewerScope){
						jQuery.sap.log.info("Loading shared component: " + compConfig.id);
						var oCompInstance = _this._getSharedComponent(compConfig.id);
						
						if(oCompInstance){
							jQuery.sap.log.info("Shared component '" + compConfig.id + "' is already instantiated. Initializing...");
							
							_initComponent(_this, compConfig, oCompInstance, true);
							
							then();
							
							return;
						}
					}
						
					
					var sModulePath = _this.config.resolvePackage(compConfig["type"]).replace(/\./g, "/");
					
					//General Class
					//Use settings as first Parameter
					sap.ui.require([sModulePath], function(ComponentConstructor){
						var oCompInstance = new ComponentConstructor(compSettings);
						
						if(bViewerScope){
							_this._registerSharedComponent(compConfig, oCompInstance);
						}
						
						_initComponent(_this, compConfig, oCompInstance, false);
						
						then();
					});
					
				}
				
				//UI5 Components
				else if(compConfig["package"]){
					jQuery.sap.registerModulePath(
							compConfig["package"], 
							_this.config.resolvePath(compConfig["location"], true)
					);
					
					var compSettings = { app : _this };
					jQuery.extend(compSettings, compConfig.settings);
					
					//UI5 Component
					sap.ui.getCore().createComponent({
				        name: compConfig["package"],
				        async : true,
				        settings: compSettings
				    }).then(function(oComp){
				    	_initComponent(_this, compConfig, oComp);
						
						then();
				    });
				}
				
				//Old Ui5Strap Modules
				else if(compConfig.module){
					//App Component
					//Deprecated soon!
					var moduleName = _this.config.resolvePackage(compConfig.module);
					
					//TODO Async!
					jQuery.sap.require(moduleName);
					
					var ComponentConstructor = jQuery.sap.getObject(moduleName);
					
					_initComponent(_this, compConfig, new ComponentConstructor(_this, compConfig));
					
					then();
				}
				
				else{
					throw new Error("Cannot load component '" + compConfig.id + "': type or package attribute missing!");
				}
				
			}());
		}

		
	};
	
	/**
	 * Preload actions defined in configuration.
	 * 
	 * @param _this {pks.ui5strap.viewer.AppBase} Instance of the app to apply this function to.
	 * @param callback {function} The callback function. 
	 * @private
	 */
	var _preloadActions = function(_this, callback){
		SAP_LOG.info(_this + " Preloading actions ...");
		
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
			Action.loadFromFile(_this.config.resolvePackage(actions[i]), successCallback, true);
		}
	};
	
	/**
	 * Sets the UI5 language.
	 * 
	 * @param language {string} The language to set.
	 * TODO Since you cannot set the language per app, this function should be moved to the viewer.
	 */
	AppBaseProto.setLanguage = function(language){
		sap.ui.getCore().getConfiguration().setLanguage(language);
	};
	
	/**
	 * Preloads the models and resources needed by this app.
	 * 
	 * @param callback {function} The callback function.
	 */
	AppBaseProto.preload = function(callback){
		SAP_LOG.info(this + " Starting preload ...");
		
		//Resolve Configuation
		this.config.resolve();

		var _this = this;
		
		//JavaScript
		_preloadJavaScript(_this, function preloadJavaScriptComplete(){
			//Root Component
			_preloadRootComponent(_this, function _preloadRootCompComplete(){
				//Components / Beans
				_preloadComponents(_this, function _preloadComponentsComplete(){
					//Overlay Navigator
					_this.createOverlayNavigator(function(){
						//Root Control
						_this.createRootControl(function(){
							
							//Preload Models
							_preloadModels(_this, function _preloadModelsComplete(){
								//Preload Actions
								_preloadActions(_this, callback);
							});
						
						});
					});
				});
			});
		});
		
	};

	/**
	 * Loads the neccessary data for this app. Typically triggered by the viewer.
	 * 
	 * @param callback {function} The callback function.
	 */
	AppBaseProto.load = function(callback){
		SAP_LOG.info(this + " Loading ...");

		var _this = this;
		this.preload(function(){

			_this.onLoad(new sap.ui.base.Event("ui5strap.app.load", _this, {}));

			callback && callback();
		
		});
	};

	/**
	* Starts the app. Typically triggered by the viewer.
	* 
	* @param callback {function} The callback function.
	*/
	AppBaseProto.start = function(callback){
		SAP_LOG.info(this + " Starting ...");

		var _this = this;
		if(this.isRunning){
			throw new Error(this + " is already running.");
		}
		
		this.isRunning = true;

		/*
		window.addEventListener(
			"message", 
			function on_message(event){
				_this.onMessage(new sap.ui.base.Event("ui5strap.app.message", _this, event.data));
			}, 
			false
		);
		*/

		this.onStart(new sap.ui.base.Event("ui5strap.app.start", _this, {}));

		callback && callback();
	};

	/**
	* Marks the app as showing. Typically triggered by the viewer.
	* 
	* @param callback {function} The callback function.
	*/
	AppBaseProto.show = function(callback){
		SAP_LOG.info(this + " Showing ...");

		this.isVisible = true;
		this.onShow(new sap.ui.base.Event("ui5strap.app.show", this, {}));

		var isFirstTimeShow = !this.hasFirstShow;
		if(isFirstTimeShow){
			SAP_LOG.debug(this + " First showing ...");
		
			this.hasFirstShow = true;
			this.onFirstShow(new sap.ui.base.Event("ui5strap.app.firstShow", this, {}));
		}

		callback && callback(isFirstTimeShow);
	};

	/**
	* Marks the app as shown. Typically triggered by the viewer.
	* 
	* @param callback {function} The callback function.
	*/
	AppBaseProto.shown = function(callback){
		SAP_LOG.info(this + " Shown ...");

		var _this = this;

		ui5strapCoreLib.polyfill.requestAnimationFrame(function(){
			_this.domRef.className = _createAppClass(_this, APP_PREFIX_STYLE_CLASS + " " + APP_PREFIX_STYLE_CLASS + "-current");
			
			_this.onShown(new sap.ui.base.Event("ui5strap.app.shown", _this, {}));

			var isFirstTimeShown = !_this.hasFirstShown;
			if(isFirstTimeShown){
				SAP_LOG.debug(_this + ' First shown ...');
				_this.hasFirstShown = true;
				_this.onFirstShown(new sap.ui.base.Event("ui5strap.app.firstShown", _this, {}));
			}

			callback && callback(isFirstTimeShown);
		});
	};
	
	/**
	* Marks the app as hiding. Typically triggered by the viewer.
	* 
	* @param callback {function} The callback function.
	*/
	AppBaseProto.hide = function(callback){
		SAP_LOG.info(this + " Hiding ...");
		
		this.isVisible = false;
		
		this.onHide(new sap.ui.base.Event("ui5strap.app.hide", this, {}));

		callback && callback();
	};
	
	/**
	* Marks the app as hidden. Typically triggered by the viewer.
	* 
	* @param callback {function} The callback function.
	*/
	AppBaseProto.hidden = function(callback){
		SAP_LOG.info(this + " Hidden ...");

		var _this = this;
		ui5strapCoreLib.polyfill.requestAnimationFrame(function(){
			if(null === _this.domRef){
				SAP_LOG.warning("AppBaseProto.stop seemed to be executed before AppBaseProto.hidden. This seems to be a bug.");
			}
			else{
				_this.domRef.className = _createAppClass(_this, APP_PREFIX_STYLE_CLASS + " " + APP_PREFIX_STYLE_CLASS + "-inactive ui5strap-hidden");
			}	
			
			_this.onHidden(new sap.ui.base.Event("ui5strap.app.hidden", _this, {}));

			callback && ui5strapCoreLib.polyfill.requestAnimationFrame(callback);
		})
	};

	/**
	* Marks the app as stopped. Typically triggered by the viewer.
	* 
	* @param callback {function} The callback function.
	*/
	AppBaseProto.stop = function(callback){
		SAP_LOG.info(this + " Stopping ...");

		if(!this.isRunning){
			throw new Error(this + " is not running.");
		}

		this.$().remove();
		this.domRef = null;
		this.isRunning = false;

		this.onStop(new sap.ui.base.Event("ui5strap.app.stop", this, {}));

		callback && callback();
	};

	/**
	* Marks the app as unloaded. Typically triggered by the viewer.
	* 
	* @param callback {function} The callback function.
	*/
	AppBaseProto.unload = function(callback){
		SAP_LOG.info(this + " Unloading ...");
		
		Layer.unregister(this._overlayId);
		Layer.unregister(this.config.createDomId('loader'));

		this.onUnload(new sap.ui.base.Event("ui5strap.app.unload", this, {}));

		this.destroy();

		callback && callback();
	};

	/**
	* Triggered when a message is sent to this app.
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* Triggered when the window is resized
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
	*/
	AppBaseProto.onHashChange = function(oEvent){
		//Fire the resize event
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hashChange",
			"orgEvent" : oEvent
		});
	};

	/**
	* Triggered when the app has been initialized
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param oEvent {sap.ui.base.Event} The event object.
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
	* 
	* @param eventParameters {object} Information about the event.
	* @param actionGroupId {string|object} The action name or action definition.
	*/
	AppBaseProto.runEventAction = function (eventParameters, actionGroupId, callback){
		SAP_LOG.debug(this + " Executing event '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
		var actionParameters = {
			"parameters" : actionGroupId,
			callback : callback
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
	* 
	* @param eventParameters {object} Information about the event.
	*/
	AppBaseProto.fireEventAction = function(eventParameters){
		var _this = this;
		
		if(this.config.data.events){
			var appEvents = this.config.data.events;
			
			//Run the events that are defined in the config
			if(eventParameters.scope in appEvents){
				var events = appEvents[eventParameters.scope];

				if(eventParameters.eventName in events){
					var eventList = events[eventParameters.eventName],
						nextAction = function(j){
							if(j >= eventList.length){
								return;
							}
							
							_this.runEventAction(
								eventParameters, 
								eventList[j], 
								function(){
									nextAction(j+1);
								}
							);
						};
					
					nextAction(0);
				}

			}
		}

		//Runtime events
		if(this._events && this._events[eventParameters.scope]){
			var events = this._events[eventParameters.scope];
			if(eventParameters.eventName in events){
				var eventList = events[eventParameters.eventName],
					nextAction = function(j){
						if(j >= eventList.length){
							return;
						}
						
						var actionOrFunction = eventList[j];
						if(typeof actionOrFunction === 'function'){
							//Call the registered function with original event as parameter
							SAP_LOG.debug(_this + " Executing event function '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
							actionOrFunction.call(_this, eventParameters.orgEvent);
							
							nextAction(j+1);
						}
						else{
							//chain via callback
							_this.runEventAction(
									eventParameters, 
									actionOrFunction,
									function(){
										nextAction(j+1);
									});
						}
					};
					
				nextAction(0);

			}
		}
	};

	/**
	* Registers an event action to this app instance
	* 
	* @param scope {string} The event scope.
	* @param eventName {string} The event name.
	* @param actionOrFunction {string|function} Either an action name or a callback function.
	*/ 
	AppBaseProto.registerEventAction = function(scope, eventName, actionOrFunction){
		if(!(scope in this._events)){
			this._events[scope] = {};
		}

		if(!(eventName in this._events[scope])){
			this._events[scope][eventName] = [];
		}
		
		SAP_LOG.debug(this + " Registered event '" + eventName + "' for scope '" + scope + "'.");
		this._events[scope][eventName].push(actionOrFunction);
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- App Overlay ------------------------------------
	* ----------------------------------------------------------------------
	*/
	
	/**
	* Shows or hides the loading screen.
	* 
	* @param visible {boolean} Whether the loading screen is visible.
	* @param callback {function} The callback function.
	*/
	AppBaseProto.setLoaderVisible = function(visible, callback){
		Layer.setVisible(this.config.createDomId('loader'), visible, callback);
	};

	/**
	* Returns whether the overlay layer is visible
	* 
	* @returns {boolean} Whether the overlay is visible.
	*/
	AppBaseProto.isOverlayVisible = function(){
		return Layer.isVisible(this._overlayId);
	};

	/**
	* Shows a view or control inside the overlay.
	* 
	* @param oPageConfigOrControl {object|sap.ui.core.Control} Either a view definition or a control reference.
	* @param callback {function} The callback function.
	* @param transitionName {string} The transition name.
	*/
	AppBaseProto.showOverlay = function(oPageConfigOrControl, callback, transitionName, fnCloseCallback){
		var _this = this;
		if(!(oPageConfigOrControl instanceof ControlBase)){
			var viewParameters = oPageConfigOrControl.parameters;
			
			oPageConfigOrControl = this.createPage(this.config.getPageConfig(oPageConfigOrControl));
		
			oPageConfigOrControl.loaded().then(function(){
				_this._showOverlay(oPageConfigOrControl, callback, transitionName, viewParameters, fnCloseCallback);
			});
		}
		else{
			this._showOverlay(oPageConfigOrControl, callback, transitionName, {}, fnCloseCallback);
		}
	};
	
	/**
	 * Shows a control inside the overlay.
	 * 
	 * @param oPage {sap.ui.core.Control} The control to show.
	 * @param callback {function} The callback function.
	 * @param transitionName {string} The name of the transition.
	 * @param pageUpdateParameters {object} The parameters to pass to the pageUpdate event.
	 * @protected
	 */
	AppBaseProto._showOverlay = function(oPage, callback, transitionName, pageUpdateParameters, fnCloseCallback){
		var navControl = this.getOverlayNavigator(),
			target = navControl.defaultTarget,
			_this = this;
		
		navControl.m_fnCloseCallback = fnCloseCallback;
		
		//Set target busy
		navControl.setTargetBusy(target, true);
		
		//Trigger onUpdate events
		navControl.updateTarget(target, oPage, pageUpdateParameters);
		
		Layer.setVisible(this._overlayId, true, function(){
			navControl.toPage(oPage, target, transitionName || "slide-ttb", function toPage_complete(param){
				
				//Set target available
				navControl.setTargetBusy(target, false);
				
				param.oldPage && _this.detachPage(param.oldPage);
				
				//Trigger callback
				callback && callback();
			});
		}, true);
	};

	/**
	* Hides the overlay.
	* 
	* @param callback {function} The callback function.
	* @param transitionName {string} The name of the transition.
	*/
	AppBaseProto.hideOverlay = function(callback, transitionName, oCloseParameters){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			navigator = this.getOverlayNavigator(),
			transitionName = transitionName || 'slide-btt';
		
		navigator.toPage(null, 'content', transitionName, function toPage_complete(){
			Layer.setVisible(_this._overlayId, false, function(){
			    navigator.m_fnCloseCallback && navigator.m_fnCloseCallback(oCloseParameters);
			    callback && callback(oCloseParameters);
			    navigator.m_fnCloseCallback = null;
			}, true);
		});	
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Views ------------------------------
	* ----------------------------------------------------------
	*/

	/**
	 * Create a new View based on configuration object.
	 * TODO Rename to create page.
	 * 
	 * @param {object} mPageConfig The view definition.
	 * @returns {sap.ui.core.mvc.View} The view reference.
	 */
	AppBaseProto.createPage = function(mPageConfig, fnCallback){
		var _this = this,
			pageId = mPageConfig.id,
			sPageType = mPageConfig.type,
			mControlConfig = {};
		
		if(!sPageType){
			console.log(mPageConfig);
			throw new Error("Missing required page config parameter 'type'.");
		}
		
		var mPageType = this.config.getPageType(sPageType);
		
		if(mPageType.deprecated){
			SAP_LOG.warning("Page type '" + sPageType + "' is deprecated. Use '" + mPageType.deprecated + "' instead.");
		}
		
		if(pageId){
			pageId = this.config.createControlId(pageId);
			mControlConfig.id = pageId;
			
			var cachedPage = this._pageCache[pageId];
			
			if(cachedPage){
				var bCached = mPageConfig.cache;
				
				if(mPageType.nature === "View"){
					var oData = cachedPage.getViewData();
					bCached = bCached && oData.__ui5strap.settings.cache;
				}
				else if(mPageType.nature === "UIComponent"){
				
				}
				else{
					
				}
				
				if(bCached){
					SAP_LOG.info(this + " Returning cached page '" + pageId + "'.");
					return cachedPage;
				}
				else{
					SAP_LOG.warning("Created a new page but a page with that id already exists. Destroying existing page...");
					
					this.destroyPage(cachedPage);
				}
			}
		}
		
		var elPage = document.getElementById(pageId);
		if(elPage){
			if(elPage.parentNode.id === 'sap-ui-preserve'){
				SAP_LOG.warning("Page has been previously rendered and still exists in sap-ui-preserve. Removing...");
				elPage.remove();
			}
			else{
				throw new Error("There is already an element in dom with id: " + pageId);
			}
		}
		
		var oPage,
			mAdditionalData = {};
		
		if(mPageConfig.data){
			jQuery.extend(mAdditionalData, mPageConfig.data);
			
			if(mAdditionalData.__ui5strap){
				throw new Error("Data must not contain __ui5strap");
			}
		}
		
		mAdditionalData.__ui5strap = { 
			app : this,
			settings : mPageConfig
		};
		
		var fnLoaded = function(){
			if(pageId){
				//Add to page cache
				_this._pageCache[pageId] = oPage;
			}
			
			//Add css style class
			if(mPageConfig.styleClass){
				oPage.addStyleClass(mPageConfig.styleClass);
			}
			
			fnCallback && fnCallback(oPage);
		};
		
		if(mPageType.nature === "View"){
			mControlConfig.type = mPageType.viewType;
			mControlConfig.async = true;
			
			if(!mPageConfig.viewName){
				throw new Error("Missing required property viewName!");
			}
			
			mControlConfig.viewName = this.config.resolvePackage(mPageConfig.viewName);
			mControlConfig.viewData = mAdditionalData;
			
			var fnCreateView = function(){
				//Create View
				//Will crash if "viewName" or "type" attribute is missing!
				oPage = new sap.ui.view(mControlConfig);
				
				oPage.attachBeforeExit(function(oEvent){
					//clean up
					var viewData = this.getViewData();
					delete viewData.__ui5strap;
				});
				
				oPage.loaded().then(fnLoaded);
			};

			if(this.config.data.app.rootComponent){
				this._rootComponent.runAsOwner(fnCreateView);
			}
			else{
				fnCreateView();
			}
		}
		else if(mPageType.nature === "UIComponent"){
			//TODO
		}
		else if(mPageType.nature === "Control"){
			//TODO
			sap.ui.require([this.config.resolvePackage(sPageType).replace(/\./g, "/")], function(ControlConstructor){
				
			});
		}
		
		return oPage;
	};
	
	/**
	 * Destroys a page
	 */
	AppBaseProto.destroyPage = function(oView){
		var pageId = oView.getId();
		
		if(this._pageCache[pageId]){
			//View already have been created before
			//Delete cache entry and destroy existing view
			delete this._pageCache[pageId];
		}
		
		var oParent = oView.getParent();
		if(oParent){
			if(oParent instanceof UIArea){
				oParent.destroy();
				SAP_LOG.warning(this + " Page '" + pageId + "' is still attached to a UIArea - destroyed both.");
			}
			else{
				throw new Error("Cannot destroy View: still attached to " + oParent.getId());
			}
		}
		else{
			//Set Parent to null before destroying
			//TODO Why
			//oView.setParent(null);
			
			//Destroy the Page
			oView.destroy();
			SAP_LOG.info(this + " Destroyed Page '" + pageId + "'.");
		}
	};
	
	/**
	 * Dettaches a view/page from DOM
	 */
	AppBaseProto.detachPage = function(oView){
		var oViewData = oView.getViewData();
		if(!oViewData.__ui5strap 
			|| !oViewData.__ui5strap.settings.cache){
			
			this.destroyPage(oView);
		}
	};
	
	/**
	 * Returns the app that owns the Controller
	 * TODO 
	 */
	AppBase.getOwnerAppFor = function(oController){
		var oApp = null,
			oComponent = oController.getOwnerComponent(),
			viewData = oController.getView().getViewData();
		
		if(viewData && viewData.__ui5strap && viewData.__ui5strap.app){
			//App reference is inside view data.
		    oApp = viewData.__ui5strap.app;
		}
		/*
		else if(oComponent && oComponent.getMetadata().isInstanceOf("pks.ui5strap.viewer.IRootComponent")){
			//Component implements pks.ui5strap.viewer.IRootComponent
			oApp = oComponent.getApp();
		}
		*/
		else if(oComponent && oComponent.getApp){
			//Get app reference from Component's getApp method.
			oApp = oComponent.getApp();
		}
		
		if(!oApp || !oApp.getMetadata().isInstanceOf("pks.ui5strap.viewer.IApp")){
			SAP_LOG.warning("Cannot determine app reference from view " + oController.getView().getId());
			
			return null;
		}
		
		return oApp;
	};

	/*
	* --------------------------------------------------
	* --------------------- ACTIONS --------------------
	* --------------------------------------------------
	*/

	/**
	* Execute an Action.
	* 
	* @param action {object} The action definition.
	*/
	AppBaseProto.runAction = function(action){
		action.app = this;
		
		var actionName = action.parameters;
		if(typeof actionName === 'string'){
			actionName = this.config.resolvePackage(actionName);
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
	 * Sets a local storage item.
	 * 
	 * @param storageKey {string} The key.
	 * @param storageValue {object} The value as object.
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
	 * Gets a local storage item.
	 * 
	 * @param storageKey {string} The key.
	 * @returns {object} The value.
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
	 * Sets a session storage item.
	 * 
	 * @param storageKey {string} The key.
	 * @param storageValue {object} The value.
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
	 * Gets a session storage item.
	 * 
	 * @param storageKey {string} The key.
	 * @returns {object} The value.
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

	/**
	 * Gets a locale string from the i18n files in the current language.
	 * The first argument is the key, any additional arguments are passed for replace variables within the string.
	 * TODO "i18n" should be configurable.
	 */
	AppBaseProto.getLocaleString = function(){
		var bundle = this._i18nBundle;
		return bundle.getText.apply(bundle, arguments);
	};

	/**
	* Returns a property of a model that is assigned to the root control.
	* 
	* @param dataPath {string} The data path.
	* @param modelName {string} The name of the model.
	* @returns {mixed} The property value.
	* FIXME
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

	/**
	 * Extracts the ID part of a Control ID without the app namespace.
	 * 
	 * @param controlId {string} The control ID.
	 * @param viewId {string} The view ID that contains the control.
	 * @returns {string} The relative control id.
	 */
	AppBaseProto.extractRelativeControlId = function(controlId, viewId){
		var prefix = this.config.getDomId() + '---';
		
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

	/**
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	* 
	* @param controlId {string} The ID of the control.
	* @param viewId {string} The ID of the View.
	* @returns {sap.ui.core.Control} The control reference.
	*/
	AppBaseProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.config.createControlId(controlId, viewId));
	};

	/**
	 * Returns the Root Component.
	 * 
	 * @returns {object} The root component.
	 */
	AppBaseProto.getRootComponent = function(){
		return this._rootComponent;
	};
	
	/**
	 * Sets the Root Component.
	 * 
	 * @param rootComponent {object} The root component to set.
	 */
	AppBaseProto.setRootComponent = function(rootComponent){
		this._rootComponent = rootComponent;
	};
	
	/**
	 * Creates the Root Control asynchronously.
	 * 
	 * @param callback {function} The callback function.
	 */
	AppBaseProto.createRootControl = function(callback){
		if(this._rootControl){
			callback && callback();
			
			return;
		}
		
		var rootComponent = this._rootComponent,
			_this = this;
		
		//TODO Instead of just checking the existance of the methods,
		//it would be better to check whether the class implements the interface pks.ui5strap.viewer.IRootComponent
		if(rootComponent._buildRootControl){
			this._rootControl = rootComponent._buildRootControl();
			callback && callback();
		}
		else if(rootComponent._createRootControl){
			rootComponent._createRootControl(function(rootControl){
				_this._rootControl = rootControl;
				
				callback && callback();
			});
		}
		else{
			//Load plain ui5 app in a Component Container
			sap.ui.require(["sap/ui/core/ComponentContainer", "sap/ui/core/UIComponent"], function(ComponentContainer, UIComponent){
				if(!(rootComponent instanceof UIComponent)){
					throw new Error("Could not create root control!");
				}
				
				_this._rootControl = new ComponentContainer({
	            	  component : rootComponent,
	            	  height : "100%"
		        });
				
				callback && callback();
			});
	  	}
		
	};
	
	/**
	 * Create Navigator Control for App Overlay.
	 */
	AppBaseProto.createOverlayNavigator = function(callback){
		var _this = this;
		sap.ui.require(["pks/ui5strap/core/NavContainer"], function(NavContainer){
			//TODO Build via root component
			
			_this._overlayNavigator = new NavContainer();
			
			callback && callback();
		});
	};
	
	/**
	 * Returns the Root Control.
	 * 
	 * @returns {sap.ui.core.Control} The root control.
	 */
	AppBaseProto.getRootControl = function(){
		return this._rootControl;
	};
	
	/**
	 * Returns the Overlay Navigator.
	 * 
	 * @returns {sap.ui.core.Control} The root control.
	 */
	AppBaseProto.getOverlayNavigator = function(){
		return this._overlayNavigator;
	};
	
	/**
	 * 
	 */
	AppBaseProto.setRootModel = function(oModel, modelName){
		this.getRootControl().setModel(oModel, modelName);
		this.getOverlayNavigator().setModel(oModel, modelName);
	};

	/*
	* --------------------------------------------------
	* --------------------- Object ---------------------
	* --------------------------------------------------
	*/
	
	/**
	 * Whether this app has a certain nature.
	 * TODO move to app config
	 * 
	 * @param nature {string} The ID of the nature.
	 * @returns {boolean} Whether the app has the nature.
	 */
	AppBaseProto.hasNature = function(nature){
		return -1 !== jQuery.inArray(nature, this.config.data.app.nature);
	};

	/**
	* Returns the ID of the App. The ID is in Java format and contains dots.
	* @deprecated
	* 
	* @returns {string} The app ID.
	*/
	AppBaseProto.getId = function(){
		return this.config.data.app.id;
	};
	
	/**
	 * Returns the world unique UUID of this app instance.
	 */
	AppBaseProto.getInstanceId = function(){
	    return this.m_sInstanceId;  
	};
	
	/**
	 * Returns the JQuery reference to the app root element.
	 * 
	 * @returns {jQuery} The jQuery reference to the app's root element.
	 * @deprecated Will be removed!
	 */
	AppBaseProto.$ = function(){
		return jQuery(this.domRef);
	};

	/**
	* Get the URL of the app defined in the config
	* @deprecated
	* TODO delete
	*/
	AppBaseProto.getUrl = function(){
		return this.config.data.app.url;
	};

	/**
	* Returns the Dom ID of the App.
	* 
	* @deprecated
	* @param subElement {string} Name of the sub element.
	* @returns {string} The dom ID.
	*/
	AppBaseProto.getDomId = function(subElement){
		SAP_LOG.warning("pks.ui5strap.viewer.App.prototype.getDomId is deprecated! Use pks.ui5strap.viewer.AppConfig.prototype.getAppDomId instead!");
		return this.config.createDomId(subElement);
	};

	/**
	 * Updates the app container.
	 */
	AppBaseProto.updateContainer = function(){
		if(this.domRef){
			this.domRef.className = _createAppClass(this, APP_PREFIX_STYLE_CLASS + " " + APP_PREFIX_STYLE_CLASS + "-next ui5strap-hidden");
			return;
		}
		
		var _this = this,
			overlayId = this.config.createDomId("overlay"),
			appContainer = document.createElement('div'),
			appContent = document.createElement('div'),
			appOverlay = document.createElement('div'),
			appOverlayContent = document.createElement('div'),
			appLoader = document.createElement('div'),
			appSplash = document.createElement('div');
			
			
		//App Container
		appContainer.className = _createAppClass(this, APP_PREFIX_STYLE_CLASS + " " + APP_PREFIX_STYLE_CLASS + "-prepared ui5strap-hidden");
		appContainer.id = this.config.getDomId();
		
		//App Content
		appContent.className = APP_PREFIX_STYLE_CLASS + "-content";
		appContent.id = this.config.createDomId('content');
		appContainer.appendChild(appContent);

		//App Overlay
		appOverlay.className = APP_PREFIX_STYLE_CLASS + "-overlay ui5strapOverlay ui5strapLayer ui5strap-hidden";
		appOverlay.id = overlayId;
		
		this._overlayId = overlayId;

		//var appOverlayBackdrop = document.createElement('div');
		//appOverlayBackdrop.className = 'ui5strapOverlay-backdrop';
		//appOverlayBackdrop.id = this.config.createDomId('overlay-backdrop');
		/*
		appOverlayBackdrop.onclick = function(){
			_this.hideOverlay();
		};
		*/
		//appOverlay.appendChild(appOverlayBackdrop);

		appOverlayContent.className = 'ui5strapOverlay-content';
		appOverlayContent.id = this.config.createDomId('overlay-content');
		appOverlay.appendChild(appOverlayContent);

		appContainer.appendChild(appOverlay);
		
		Layer.register(overlayId, jQuery(appOverlay));

		//App Loader
		
		appLoader.className = APP_PREFIX_STYLE_CLASS + "-loader ui5strapLoader ui5strapLayer ui5strap-hidden";
		appLoader.id = this.config.createDomId('loader');
		appContainer.appendChild(appLoader);

		Layer.register(appLoader.id, jQuery(appLoader));

		//Cache DOM Ref
		this.domRef = appContainer;
		this.contentDomRef = appContent;
		this.overlayDomRef = appOverlayContent;
	};
	
	/**
	 * Appends the App to the DOM
	 * 
	 * @param containerEl {HTMLElement} The container dom element.
	 */
	AppBaseProto.attach = function(containerEl){
		if(!this.isAttached){
			SAP_LOG.info(this + " Attaching to dom ...");
			
			this.isAttached = true;
			
			containerEl.appendChild(this.domRef);
			
			this.getOverlayNavigator().placeAt(this.overlayDomRef);
			
			//Place the Root Control
			this.getRootControl().placeAt(this.contentDomRef);
		}
	};

	/**
	 * Returns the string representation of this app.
	* @override
	*/
	AppBaseProto.toString = function(){
		return "{AppBase id='" + this.getId() + "'}";
	};

	/**
	* Destroys the App and all of its components
	* @override
	*/
	AppBaseProto.destroy = function(){
		SAP_LOG.info(this + " Destroying app ...");
		
		//Destroy Root Control
		this._rootControl && this._rootControl.destroy();
		this._rootControl = null;
		
		//Destroy overlay Navigator
		this._overlayNavigator && this._overlayNavigator.destroy();
		this._overlayNavigator = null;
		
		//Destroy Cached Pages
		var cacheKeys = Object.keys(this._pageCache);
		
		for(var i = 0; i < cacheKeys.length; i++){
			this.destroyPage(this._pageCache[cacheKeys[i]]);
		}
		
		//Destroy components
		for(var compId in this.components){
			this.components[compId].destroy();
		}
		this.components = null;
		
		//Destroy Configuration
		this.config.destroy();
		this.config = null;
		
		//Cleanup vars
		this._pageCache = null;
		this._events = null;
		this._runtimeData = null;
		
		//Destroy Root Component
		if(this._rootComponent !== this){
			this._rootComponent.destroy();
			this._rootComponent = null;
		}
		
		//Finally, destroy the app object
		sap.ui.base.Object.prototype.destroy.call(this);
	};
	
	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	/**
	* Include the style that is neccessary for this app
	*
	* @param callback {function} The callback function.
	*/
	AppBaseProto.includeStyle = function(callback){
		var _this = this,
			configData = this.config.data,
			cssKeys = Object.keys(configData.css),
			callbackCount = cssKeys.length;

		var sTheme = this.config.data.app.theme;
		if(sTheme){ 
			this.setTheme(sTheme);
		}
		
		if(callbackCount === 0){
			callback && callback.call(this);

			return;
		}

		var callbackI = 0,
			success = function(){
				callbackI++;
				if(callbackI === callbackCount){
					callback && callback.call(_this);
				}
			},
			error = function(e){
				alert('Could not load style!');
				throw e;
			};

		for(var i = 0; i < callbackCount; i++){
			var cssKey = cssKeys[i],
				cssPath = this.config.resolvePath(configData.css[cssKey], true);

			cssKey = 'css--' + this.getId() + '--' + cssKey;

			if(! ( cssKey in this._runtimeData.css ) ){	
				SAP_LOG.debug(this + " Loading stylesheet from '" + cssPath + "' ...");
					
				this._runtimeData.css[cssKey] = cssPath;
				
				jQuery.sap.includeStyleSheet(
						cssPath, 
						cssKey, 
						success, 
						error
				);
			}
			
			else{
				SAP_LOG.debug(this + " Stylesheet '" + cssPath + "' already included.");
				success();
			}
		}
	};

	/**
	 * Removes the stylesheets added by this app.
	 */
	AppBaseProto.removeStyle = function(){
		for(var cssKey in this._runtimeData.css){
			jQuery('link#' + cssKey).remove();
			delete this._runtimeData.css[cssKey];
			SAP_LOG.info(this + " Css stylesheet '" + cssKey + "' removed.");
		}
	};

	/**
	* Sets the theme of the app
	* 
	* @param {string} sTheme - The name of the new theme.
	*/
	AppBaseProto.setTheme = function(sTheme){
		if(!sTheme || "base" === sTheme){
			sap.ui.getCore().applyTheme("base");
		}
		else if(jQuery.sap.startsWith(sTheme, "ui5strap_")){
			var mEnv = this.config.getEnvironment();
			
			if(!mEnv.pathToThemeRoot){
				throw new Error("Environment attribute 'pathToThemeRoot' needs to be set.");
			}
			
			sap.ui.getCore().applyTheme(sTheme, mEnv.pathToThemeRoot);
		}
		else{
			sap.ui.getCore().applyTheme(sTheme);
		}
		
		SAP_LOG.debug("Theme '" + sTheme + "' set.");
	};

	//Return Module Constructor
	return AppBase;
});
