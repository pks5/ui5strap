/*
	*
	* ui5strap.App
	*
	*/

(function(){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.App');

	sap.ui.base.Object.extend('ui5strap.App', {
		"constructor" : function(config, options){
			sap.ui.base.Object.apply(this);
			
			this.config = config;
			this.options = options;

			this._events = {};
		}
	});

	var App = ui5strap.App,
		AppProto = App.prototype;

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
	var _preloadJavaScript = function(js, appBase, callback){
		if(!js || js.length === 0){
			callback && callback();

			return;
		}
		
		jQuery.sap.log.debug('Loading JavaScript files...');

		var scripts = [];
		for(var i = 0; i < js.length; i++){
			var scr = js[i],
				jsPath = appBase + "/" + scr;
			
			if(typeof scr === 'object'){
				jsPath =("package" in scr ? jQuery.sap.getModulePath(scr['package']) : appBase) + "/" + scr.src;
			}
			scripts.push(jsPath);
		}

		var scriptBlock = new ui5strap.ScriptBlock();

		scriptBlock.load(scripts, function(){
			scriptBlock.execute(true);

			callback && callback();
		});
	};

	var _initStyle = function(css, appBase, callback){
		if(!css || css.length === 0){
			callback && callback();

			return;
		}

		var callI = css.length;
		var success = function(){
			callI--;
			if(callI === 0){
				callback && callback();
			}
		};

		var error = function(){
				throw new Error('Could not load css file: ');
		};

		
		for (var i = 0; i < css.length; i++){
			var sheet = css[i],
				sheetSrc = appBase + "/" + sheet,
				cssId = 'ui5strap-css-' + i;
			
			if(typeof sheet === 'object'){
				sheetSrc =("package" in sheet ? jQuery.sap.getModulePath(sheet['package']) : appBase) + "/" + sheet.src;
				if("id" in sheet){
					cssId = sheet.id;
				}
			}

			jQuery.sap.log.debug('[APP] LOAD STYLESHEET ' + sheetSrc + ' ...');
			jQuery.sap.includeStyleSheet(sheetSrc, cssId, success, error);
		}
	};

	var _preloadCss = function(css, appBase, callback){
		//TODO FIXME
		//We are using requestAnimationFrame as indicator for browser moderness
		if (window.requestAnimationFrame){
			//Brosers that support requestAnimationFrame surely support onload on stylesheets
			_initStyle(css, appBase, callback);
		}
		else{
			//Old browsers that do not support onload on stylesheets
			_initStyle(css, appBase);

			window.setTimeout(callback, 500);
		}
	};

	var _preloadModels = function(_this, models, appBase, callback){
		//Models
		var callI = models.length, 
			successCallback = function(oEvent, oData){
				callI --;

				if(callI === 0){
					_this.getRootControl().setModel(oData.oModel, oData.modelName);
						//sap.ui.getCore().setModel(oModel, model['modelName']);
					jQuery.sap.log.debug('[APP] LOADED MODEL ' + oData.modelName + ' ...');
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
					bundleUrl : modelSrc,
					async : true
				});
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

	var _onStart = function(_this){
 		var startEvents = _this.config.getEvents('app', 'start'),
			startEventsLength = startEvents.length;
			
		for(var i = 0; i < startEventsLength; i++){
		 	var actionGroupId = startEvents[i];
			_this.log.debug("Executing action '" + actionGroupId + "' (event: 'start') ...");
			ui5strap.Action.run({
				"parameters" : actionGroupId, 
				"app" : _this  
			});
		}
 	};

 	/*
 	* @Private
 	*/
	var _start = function(_this){
		jQuery.sap.log.debug('[APP] START');
		
		_this.getFrame().showInitialContent(function showInitialContentComplete(){
			_this.setLoaderVisible(false, function(){
				_this.setSplashVisible(false, function(){
					_onStart(this);
				});
			});
		});
		
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
		var app = this,
			_this = this;

		this._initLog();

		var _configData = this.config.data;

		var appBase = _configData.app['location'],
			libs = _configData.libraries,
			models = _configData.models;

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
		var frame = this.initFrame('default');

		_preloadModels(_this, models, appBase, function(){});
			frame.placeAt('ui5strap-body');

			//Preloading
			_preloadCss(_configData.css, appBase, function preloadCssComplete(){

				var themeName = _configData.app.theme;

				if(themeName){
					_this.setTheme(themeName);
				}

				_preloadJavaScript(_configData.js, appBase, function preloadJavaScriptComplete(){
					_preloadViews(_configData.views, function preloadViewsComplete(){
						_start(_this);
					});
				});
			});
		//});

		
		

		
	};

	/*
	* Initializes the frame module
	*/
	AppProto.initFrame = function(frameId){
		var configData = this.config.data;

		if(!(frameId in configData.frames)){
			throw new Error('Cannot set frame: frame id not defined in configuration.');
		}

		//jQuery.sap.log.debug('Setting the frame controller...');

		//Frame
		var frameOptions = configData.frames[frameId],
			frameModule = frameOptions.module;
		
		jQuery.sap.require(frameModule);

		var FrameConstructor = jQuery.sap.getObject(frameModule),
			frame =  new FrameConstructor();
		
		/*
		* Getter for frame module instance
		*/
		this.getFrame = function(){
			return frame;
		};

		this.frame = frame;

		frame.init();
		frame.setConfig(this.config);
		frame.setOwner(this);

		frame.initHistory();

		return frame;
	};

	
	/*
	* Returns the configuration object
	*/
	AppProto.getConfig = function(){
		return this.config;
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
		return this.frame.getNavContainer();
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

	/**
	* Triggered when a message is sent to this app
	* @public
	*/
	AppProto.onMessage = function(appEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "message"
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

		if("oEvent" in eventParameters){
			actionParameters.oEvent = eventParameters.oEvent;
		}

		if("controller" in eventParameters){
			actionParameters.controller = eventParameters.controller;
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
				for(var i in events[eventParameters.eventName]){ 
					this.runEventAction(eventParameters, events[eventParameters.eventName][i]);
				}
			}

		}

		if(eventParameters.scope in this._events){
			var events = this._events[eventParameters.scope];
			if(eventParameters.eventName in events){
				for(var i in events[eventParameters.eventName]){ 
					this.runEventAction(eventParameters, events[eventParameters.eventName][i]);
				}
			}
		}
	};

	/*
	* Registers an event action to this app instance
	* @public
	*/ 
	AppProto.registerEventAction = function(scope, eventName, actionGroupDef){
		if(!(scope in this._events)){
			this._events[scope] = {};
		}

		if(!(eventName in this._events[scope])){
			this._events[scope][eventName] = [];
		}
				
		this._events[scope][eventName].push(actionGroupDef);
	};
}());