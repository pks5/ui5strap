/*
 * 
 * Liberty Platform
 *
 *
 * Liberty Lite Bootstrap
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

/*
* Liberty Lite main
*/
function libertyLite(_appBase){

	var jQuerySap = jQuery.sap;

	jQuerySap.require("sap.ui.core.mvc.HTMLView");
	jQuerySap.require("sap.ui.core.CustomData");
	jQuerySap.require("sap.ui.model.resource.ResourceModel");
	jQuerySap.require("sap.ui.model.json.JSONModel");

 	var _initConfig = function(appBase, callback){
		var configModel = new sap.ui.model.json.JSONModel();
		
		configModel.attachRequestCompleted({}, function(){
			callback(configModel.getData());
		});
		configModel.attachRequestFailed({}, function(){
			alert('Could not load app config!');
		});
		
		configModel.loadData(appBase + '/app.json');
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

		var viewCallback = function(){
			viewsLeft -- ;
			if(viewsLeft === 0){
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
								jQuery.sap.log.debug("Preloaded template: " + this.url);

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
		jQuery.sap.log.debug('Loading JavaScript files...');

		if(!js || js.length === 0){
			callback && callback();

			return;
		}
		
		var scripts = [];
		for(var i = 0; i < js.length; i++){
			var scr = js[i],
				jsPath = appBase + "/" + scr;
			
			if(typeof scr === 'object'){
				jsPath =("package" in scr ? jQuery.sap.getModulePath(scr['package']) : appBase) + "/" + scr.src;
			}
			scripts.push(jsPath);
		}

		var scriptBlock = new liberty.ScriptBlock();

		scriptBlock.load(scripts, function(){
			scriptBlock.execute(true);

			callback && callback();
		});
	};

	var _initStyle = function(css, appBase, callback){
		jQuery.sap.log.debug('Loading style sheets...');

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

			jQuery.sap.log.debug('Loading stylesheet ' + sheetSrc + ' ...');
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
			_initStyle(css);

			window.setTimeout(callback, 500);
		}
	};

	/*
	* Liberty compatibility object
	*/
	jQuery.sap.declare('liberty');

	liberty = {};

	liberty.ScriptBlock = function(){
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
	* liberty.AppStandard
	*
	*/
	jQuerySap.declare('liberty.AppStandard');

	sap.ui.base.Object.extend('liberty.AppStandard');

	var LibertyApp = liberty.AppStandard,
		LibertyAppProto = LibertyApp.prototype;

	/*
	* Pseudo Liberty Viewer with App instance
	* @Private
	*/
	var _instance = null,
		_libertyViewer = {
		getApp : function(){
			if(null === _instance){
				_instance = new LibertyApp();
				_instance._initLog();
			}
			return _instance;
		}
	};

	/*
 	* @Private
 	*/
	var _start = function(_this){
		jQuery.sap.log.debug('Starting the application...');
		
		_this.getFrame().showInitialContent();

		_this.setLoaderVisible(false, function(){
			_this.setSplashVisible(false, function(){

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
	LibertyAppProto._initLog = function(){
		
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
	* Returns the viewer instance
	*/
 	liberty.getViewer = function(){
 		return _libertyViewer;
 	};

 	/*
	* Initializes the frame module
	*/
	LibertyAppProto.initFrame = function(frameId){
		var _configData = this.getConfig();

		if(!(frameId in _configData.frames)){
			throw new Error('Cannot set frame: frame id not defined in configuration.');
		}

		jQuery.sap.log.debug('Setting the frame controller...');

		//Frame
		var frameOptions = _configData.frames[frameId];
		
		var frameModule = frameOptions.module;
		jQuery.sap.require(frameModule);

		var FrameConstructor = jQuery.sap.getObject(frameModule);
		var frame =  new FrameConstructor();
		
		/*
		* Getter for frame module instance
		*/
		this.getFrame = function(){
			return frame;
		};

		/*
		* Getter for frame config
		*/
		_configData.getFrame = function(){
			return frameOptions;
		};

		frame.init();
		frame.setConfig(_configData);
		frame.setOwner(this);

		frame.placeAt('ui5strap-body');

		return this;
	};

	/*
	* Initializes the App
	*/
	LibertyAppProto.init = function(_configData){
		var app = this,
			_this = this;

		this.config = _configData;
		this.config.data = _configData;

		/*
	 	* Returns configuration data
	 	* @Deprecated
	 	*/
		this.getConfig = function(){
			return _configData;
		};

		var appBase = _configData.app.location;

		//Libs
		var libs = _configData.libraries;

		for(var i = 0; i < libs.length; i++){
			var lib = libs[i];
			var libPackage = lib['package'];
			jQuery.sap.registerModulePath(libPackage, lib['location']);

			if(lib.preload){
				jQuerySap.require(libPackage + '.library');
				var libData = sap.ui.getCore().getLoadedLibraries()[libPackage];
				
				for(var j = 0; j < libData.elements.length; j++){
					jQuerySap.log.debug('Preloading element ' + libData.elements[j]);
					jQuerySap.require(libData.elements[j]);
				}

				for(var j = 0; j < libData.controls.length; j++){
					jQuerySap.log.debug('Preloading control ' + libData.controls[j]);
					jQuerySap.require(libData.controls[j]);
				}
			}
		}

		//Models
		var models = _configData.models;
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

		//Menus
		var menus = _configData.menus;

		_configData.getMenuData = function(menuId){
			if(!(menuId in menus)){
				return null;
			}
			return menus[menuId];
		};

		//Views
		var views = _configData.views;

		_configData.getViewData = function(viewName){
			if(!(viewName in views)){
				return null;
			}
			return jQuery.extend({ viewName : viewName }, views[viewName]);
		};

		//Init Frame
		this.initFrame('default');

		//Preloading
		_preloadCss(_configData.css, appBase, function preloadCssComplete(){
			_preloadJavaScript(_configData.js, appBase, function preloadJavaScriptComplete(){
				_preloadViews(_configData.views, function preloadViewsComplete(){
					_start(_this);
				});
			});
		});
	};

	
	/*
	* Loader
	*/
	LibertyAppProto.loaderVisible = false;
	LibertyAppProto.$loader = jQuery('#ui5strap-loader');

	LibertyAppProto.setLoaderVisible = function(visible, callback, option){
		_setLayerVisible(this, 'loaderVisible', this.$loader, option, visible, callback);
	};

	/*
	* Splash Screen
	*/
	LibertyAppProto.splashVisible = false;
	LibertyAppProto.$splash = jQuery('#ui5strap-splash');

	LibertyAppProto.setSplashVisible = function(visible, callback, option){
		_setLayerVisible(this, 'splashVisible', this.$splash, option, visible, callback);
	};

	/*
	* Finally, initialize the app
	*/
	_initConfig(_appBase, function _initConfigSuccess(_configData){
		if(!("app" in _configData)){
			throw new Error('Invalid config data: app property missing!');
		}

		if("logLevel" in _configData.app){
			jQuery.sap.log.setLevel(_configData.app.logLevel);
		}

		document.title = _configData.app.title;

		jQuery.sap.registerModulePath(_configData.app['package'], _appBase);
		_configData.app.location = _appBase;

	 	liberty.getViewer().getApp().init(_configData);

	}); //End _initConfig

}; //End libertyLite