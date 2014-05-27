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

 	var _initConfig = function(callback){
		var configModel = new sap.ui.model.json.JSONModel();
		
		configModel.attachRequestCompleted({}, function(){
			callback(configModel.getData());
		});
		configModel.attachRequestFailed({}, function(){
			alert('Could not load app config!');
		});
		
		configModel.loadData(_appBase + '/app.json');
	};

	_initConfig(function _initConfigSuccess(_configData){
		if(!("app" in _configData)){
			throw new Error('Invalid config data: app property missing!');
		}

		document.title = _configData.app.title;

		var _packageName = _configData.app['package'],
	 		_moduleName = _packageName + ".App";

	 	jQuery.sap.registerModulePath(_packageName, _appBase);

	 	jQuery.sap.declare(_moduleName);
		sap.ui.base.Object.extend(_moduleName);

		var LibertyApp = jQuery.sap.getObject(_moduleName),
			LibertyAppProto = LibertyApp.prototype;

		var _instance = null;

		jQuery.sap.declare('liberty');

		liberty = {};

		var _libertyViewer = {
			getApp : function(){
				if(null === _instance){
					_instance = new LibertyApp();
				}
				return _instance;
			}
		};

	 	liberty.getViewer = function(){
	 		return _libertyViewer;
	 	};

		var _initStyle = function(css, callback){
			jQuery.sap.log.debug('Loading style sheets...');

			var callI = 0;
			var callMax = css.length;
			var success = function(){
					callI ++;
					if(callI === callMax){
						window.setTimeout(callback, 500);
					}
			};

			var error = function(){
					throw new Error('Could not load css file: ');
			};

			
			for (var i = 0; i < css.length; i++){
				var sheet = css[i],
					sheetSrc = _appBase + "/" + sheet,
					cssId = 'ui5strap-css-' + i;
				if(typeof sheet === 'object'){
					sheetSrc =("package" in sheet ? jQuery.sap.getModulePath(sheet['package']) : _appBase) + "/" + sheet.src;
					if("id" in sheet){
						cssId = sheet.id;
					}
				}

				jQuery.sap.includeStyleSheet(sheetSrc, cssId, success, error);
			}
		};

		var _start = function(_this){
			jQuery.sap.log.debug('Starting the application...');
			_this.getFrame().showInitialContent();

			_this.setLoaderVisible(false, function(){
				_this.setSplashVisible(false);
			});
		};

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

		LibertyAppProto.getConfig = function(){
			return _configData;
		};

		LibertyAppProto.setFrame = function(frameId){
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
			
			this.getFrame = function(){
				return frame;
			};

			_configData.getFrame = function(){
				return frameOptions;
			};

			frame.init();
			frame.setConfig(_configData);

			frame.placeAt('ui5strap-body');

			return this;
		};

		LibertyAppProto.init = function(){
			var app = this;

			//Libs
			var libs = _configData.libraries;

			for(var i = 0; i < libs.length; i++){
				var lib = libs[i];
				jQuery.sap.registerModulePath(lib['package'], lib['location']);
			}

			//Models
			var models = _configData.models;
			for(var i = 0; i < models.length; i++){
				var model = models[i];

				var oModel = null;

				var baseDir = "package" in model ? jQuery.sap.getModulePath(model["package"]) : _appBase;
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

			//Views
			var views = _configData.views;

			_configData.getViewData = function(viewName){
				if(!(viewName in views)){
					return null;
				}
				return jQuery.extend({ viewName : viewName }, views[viewName]);
			};

			this.setFrame('default');

			_initStyle(_configData.css, function(){
				jQuery.sap.log.debug('CSS has been loaded.');
				_start(app);
			});
		};

		

		LibertyAppProto.loaderVisible = false;
		LibertyAppProto.$loader = jQuery('#ui5strap-loader');

		LibertyAppProto.setLoaderVisible = function(visible, callback, option){
			_setLayerVisible(this, 'loaderVisible', this.$loader, option, visible, callback);
		};

		LibertyAppProto.splashVisible = false;
		LibertyAppProto.$splash = jQuery('#ui5strap-splash');

		LibertyAppProto.setSplashVisible = function(visible, callback, option){
			_setLayerVisible(this, 'splashVisible', this.$splash, option, visible, callback);
		};

		liberty.getViewer().getApp().init();

	}); //End _initConfig

}; //End libertyLite