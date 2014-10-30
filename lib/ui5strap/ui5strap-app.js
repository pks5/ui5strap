/*
 * 
 * Liberty Lite
 *
 * Liberty Connector for Ui5Strap
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */
(function ui5strapAppMain(){

	var jQuerySap = jQuery.sap;

	jQuerySap.require("sap.ui.core.mvc.HTMLView");
	jQuerySap.require("sap.ui.core.CustomData");
	jQuerySap.require("sap.ui.model.resource.ResourceModel");
	jQuerySap.require("sap.ui.model.json.JSONModel");
	jQuerySap.require("jquery.sap.history");

 	/*
 	* @Private
 	*/
	var _testRequirements = function(){
		if(!Object.keys){
			jQuery.sap.log.warning('Object.keys is not supported by the browser!');
			return false;
		}

		return true;
	};

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

		var scriptBlock = new ui5os.ScriptBlock();

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

	var _initConfig = function(pathToAppConfig, callback){
		var configModel = new sap.ui.model.json.JSONModel();
		
		configModel.attachRequestCompleted({}, function(){
			callback(configModel.getData());
		});
		configModel.attachRequestFailed({}, function(){
			alert('Could not load app config!');
		});
		
		configModel.loadData(pathToAppConfig);
	};

	/*
	* Global ui5os compatibility object
	*/
	jQuery.sap.declare('ui5os');
	
	ui5os = {};

	ui5os.init = function(options, callback){

		if(!("pathToServletRoot" in options)){
			throw new Error('Please specify servlet root in options.');
		}

		this.options = options;
		this.pathToServletRoot = options.pathToServletRoot;

		var pathToAppConfig = options.app.defaultValue;
		

		var onDeviceReady = function(){
			/*
			* Finally, initialize the app
			*/
			_initConfig(pathToAppConfig, function _initConfigSuccess(_configData){
				if(!("app" in _configData)){
					throw new Error('Invalid config data: app property missing!');
				}

				if("logLevel" in _configData.app){
					jQuery.sap.log.setLevel(_configData.app.logLevel);
				}

				if(!('id' in _configData.app)){
					_configData.app["id"] = _configData.app["package"].replace(/\./g, '__');
				}

				_configData.app.url = pathToAppConfig;

				//Add the location of the sapp if its not specified
				if(!("location" in _configData.app)){
					var sappUrlParts = pathToAppConfig.split('/');
					sappUrlParts[sappUrlParts.length - 1] = '';
					_configData.app["location"] = sappUrlParts.join('/');
				}

				document.title = _configData.app.title;

				jQuery.sap.registerModulePath(_configData.app['package'], _configData.app["location"]);
				
			 	ui5os.getViewer().getApp().init(_configData);

			 	callback && callback();
			});
		};

		if(options.cordova){
			document.addEventListener('deviceready', onDeviceReady, false);
		}
		else{
			onDeviceReady();
		}
	};

	ui5os.ScriptBlock = function(){
		this._pending = {};
		this._order = [];
		this._pendingRequests = 0;
		this._buffer = '';

		var _this = this;

		var successCallback = function(response, callback){
			_this._pending[this.url]["script"] = response;
			
			_this._pendingRequests--;
			if(0 == _this._pendingRequests){
				_this._addToBuffer();

				callback();
			}
		};

		this._addToBuffer = function(){
			for(var i = 0; i<this._order.length; i++){
				if(null === this._order[i].script){
					throw new Error('Could not continue script loading: unexspected error.');
				}
				this._buffer = this._buffer.concat("\n;\n" + this._order[i].script + "\n;\n");
			}

			this._pending = {};
			this._order = [];

		};

		this.load = function(scripts, callback){
			if(0 < this._pendingRequests || this._order.length > 0){
				throw new Error('Could not load scripts: requests still pending.');
			}

			this._pendingRequests = scripts.length;

			for(var i = 0; i < this._pendingRequests; i++){
				var scriptUrl = scripts[i];
				//if(scriptUrl in this._pending){
				//	continue;
				//}

				var scriptData = {
					"index" : i,
					"script" : null
				};

				this._pending[scriptUrl] = scriptData;
				this._order.push(scriptData);

				jQuery.ajax({
	  					url: scriptUrl,
	  					dataType: "text",
	  					success: function(response){
	  						successCallback.call(this, response, callback);
	  					},
	  					error : function(){
	  						throw new Error('Could not load script: ' + scriptUrl);
	  					}
				});
			}
		};

		this.execute = function(useEval){
			if('' === this._buffer){
				return false;
			}
			var returnValue = null;
			if( true === useEval ){
				returnValue = eval.call(window, this._buffer);
			}
			else{
				returnValue = (new Function(this._buffer))(); //.call(window);
			}
			this._buffer = '';

			return returnValue;
		};
	};

	/*
	*
	* ui5os.AppLite
	*
	*/
	jQuerySap.declare('ui5os.AppLite');

	sap.ui.base.Object.extend('ui5os.AppLite');

	var AppLite = ui5os.AppLite,
		AppLiteProto = AppLite.prototype;

	/*
	* Pseudo Liberty Viewer with App instance
	* @Private
	*/
	var _instance = null,
		_ui5osViewer = {
		
			getApp : function(){
				if(null === _instance){
					_instance = new AppLite();
					_instance._initLog();
				}
				return _instance;
			},

			fatalError : function(message){
				var $fatalLayer = jQuery('#ui5strap-fatal');
				$fatalLayer.html(message);
				$fatalLayer.css('display', 'block');
			}
		};

	/*
	* Returns the viewer instance
	*/
 	ui5os.getViewer = function(){
 		return _ui5osViewer;
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
	AppLiteProto._initLog = function(){
		
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
	AppLiteProto.init = function(_configData){
		var app = this,
			_this = this;

		if(!_testRequirements(this)){
			ui5os.getViewer().fatalError(
				"<h4>We are sorry!</h4>" 
				+ "<p>You're browser / device is not supported by Ui5Strap yet.</p>"
				+ "<p>Please use one of following browsers:</p>" 
				+ "<ul>" 
				+ "<li>Chrome 26+</li>"
				+ "<li>Firefox 10+</li>"
				+ "<li>Safari 5+</li>"
				+ "<li>Internet Explorer 9+</li>"
				+ "</ul>"
			);

			throw new Error('This device/browser is currently not supported!');

			return;
		}

		this.config = {};

		this.config.data = _configData;

		this.config.getFrame = function(){
			return this['data'].frames['default'];
		};

		this.config.getEvents = function(eventGroup, eventName, viewName){
			var eventList = [],
				_configData = this.data;

			if(_configData.events 
				&& _configData.events[eventGroup] 
				&& _configData.events[eventGroup][eventName]){
				eventList = eventList.concat(_configData.events[eventGroup][eventName]);
			}
			
			if(viewName){
				var viewData = this.getViewData(viewName);
				if(viewData.events 
					&& viewData.events[eventGroup] 
					&& viewData.events[eventGroup][eventName]){
					
					eventList = eventList.concat(viewData.events[eventGroup][eventName]);
				
				}
			}

			return eventList;
		};

		this.config.getMenuData = function(menuId){
			var menus = this.data.menus;
			if(!(menuId in menus)){
				return null;
			}
			return menus[menuId];
		};

		this.config.getViewData = function(viewName){
			var views = this.data.views;
			
			if(!(viewName in views)){
				return null;
			}
			
			return jQuery.extend({ viewName : viewName }, views[viewName]);
		};

		var appBase = _configData.app['location'],
			libs = _configData.libraries,
			models = _configData.models;

		//Libraries
		for(var i = 0; i < libs.length; i++){
			var lib = libs[i],
				libPackage = lib['package'];
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

		//Models
		for(var i = 0; i < models.length; i++){
			var model = models[i];

			var oModel = null;

			var baseDir = "package" in model ? jQuery.sap.getModulePath(model["package"]) : appBase;
			var modelType = model['type'],
				modelSrc = baseDir + "/" + model['src'];

			if(modelType === 'RESOURCE'){
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelSrc
				});
			}
			else if(modelType === 'JSON'){
				oModel = new sap.ui.model.json.JSONModel(modelSrc);
			}

			if(null !== oModel){
				sap.ui.getCore().setModel(oModel, model['modelName']);
			}
		}

		//Init Frame
		this.initFrame('default');

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
		

		
	};

	/*
	* Initializes the frame module
	*/
	AppLiteProto.initFrame = function(frameId){
		var _configData = this.config.data;

		if(!(frameId in _configData.frames)){
			throw new Error('Cannot set frame: frame id not defined in configuration.');
		}

		//jQuery.sap.log.debug('Setting the frame controller...');

		//Frame
		var frameOptions = _configData.frames[frameId],
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

		frame.placeAt('ui5strap-body');

		return this;
	};

	
	/*
	* Returns the configuration object
	*/
	AppLiteProto.getConfig = function(){
		return this.config;
	};

	/*
	* Returns the ID of the App
	*/
	AppLiteProto.getId = function(){
		return this.config.data.app.id;
	};

	/*
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	*/
	AppLiteProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.createControlId(controlId, viewId));
	};

	AppLiteProto.getRootControl = function(){
		return this.frame.getNavContainer();
	}; 

	/*
	* Create an control id with app namespace. If viewId is given, the controlId must be local.
	*/ 
	AppLiteProto.createControlId = function(controlId, viewId){

		if(viewId){
			controlId = viewId + '--' + controlId;
		}
		
		var appPrefix = this.getId() + '---';
		if(!jQuery.sap.startsWith(controlId, appPrefix)){
			controlId = appPrefix + controlId;
		}
		
		return controlId;
	
	};

	/*
	* Sets the theme of the app
	*/
	AppLiteProto.setTheme = function(themeName){
		if(!themeName || "base" === themeName){
			sap.ui.getCore().applyTheme("base");
			return;
		}

		if(jQuery.sap.startsWith(themeName, "sap_")){
			sap.ui.getCore().applyTheme(themeName);
			return;
		}
		//sap.ui.getCore().setThemeRoot(themeName, );
		sap.ui.getCore().applyTheme(themeName, ui5os.pathToServletRoot + '/theme');
	};
	
	/*
	* Loader
	*/
	AppLiteProto.loaderVisible = false;
	AppLiteProto.$loader = jQuery('#ui5strap-loader');

	AppLiteProto.setLoaderVisible = function(visible, callback, option){
		_setLayerVisible(this, 'loaderVisible', this.$loader, option, visible, callback);
	};

	/*
	* Splash Screen
	*/
	AppLiteProto.splashVisible = false;
	AppLiteProto.$splash = jQuery('#ui5strap-splash');

	AppLiteProto.setSplashVisible = function(visible, callback, option){
		_setLayerVisible(this, 'splashVisible', this.$splash, option, visible, callback);
	};

}()); //End ui5strap-app