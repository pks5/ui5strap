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
(function(){

	var jQuerySap = jQuery.sap;

	jQuerySap.require("sap.ui.core.mvc.HTMLView");
	jQuerySap.require("sap.ui.core.CustomData");
	jQuerySap.require("sap.ui.model.resource.ResourceModel");
	jQuerySap.require("sap.ui.model.json.JSONModel");
	jQuerySap.require("jquery.sap.history");
	jQuerySap.require("ui5strap.App");

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

	

	var _initConfig = function(pathToAppConfig, callback){
		var configModel = new sap.ui.model.json.JSONModel();
		
		configModel.attachRequestCompleted({}, function(){
			var configData = configModel.getData();

			if(!("app" in configData)){
				throw new Error('Invalid config data: app property missing!');
			}

			if(!('id' in configData.app)){
				configData.app["id"] = configData.app["package"].replace(/\./g, '__');
			}

			configData.app.url = pathToAppConfig;

			//Add the location of the sapp if its not specified
			if(!("location" in configData.app)){
				var sappUrlParts = pathToAppConfig.split('/');
				sappUrlParts[sappUrlParts.length - 1] = '';
				configData.app["location"] = sappUrlParts.join('/');
			}

			var config = {};

			config.data = configData;

			config.getFrame = function(){
				return this['data'].frames['default'];
			};

			config.getEvents = function(eventGroup, eventName, viewName){
				var eventList = [],
					configData = this.data;

				if(configData.events 
					&& configData.events[eventGroup] 
					&& configData.events[eventGroup][eventName]){
					eventList = eventList.concat(configData.events[eventGroup][eventName]);
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

			config.getMenuData = function(menuId){
				var menus = this.data.menus;
				if(!(menuId in menus)){
					return null;
				}
				return menus[menuId];
			};

			config.getViewData = function(viewName){
				var views = this.data.views;
				
				if(!(viewName in views)){
					return null;
				}
				
				return jQuery.extend({ viewName : viewName }, views[viewName]);
			};

			callback(config);
		});

		configModel.attachRequestFailed({}, function(){
			alert('Could not load app config!');
		});
		
		configModel.loadData(pathToAppConfig);
	};

	var _fatalError = function(message){
		var $fatalLayer = jQuery('#ui5strap-fatal');
		$fatalLayer.html(message);
		$fatalLayer.css('display', 'block');
	};

	/*
	* Global ui5os compatibility object
	*/
	jQuery.sap.declare('ui5os');
	
	ui5os = {};

	ui5os.init = function(options, callback){

		if(!_testRequirements(this)){
			_fatalError(
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

		if(!("pathToServletRoot" in options)){
			throw new Error('Please specify servlet root in options.');
		}

		var pathToAppConfig = options.app.defaultValue;
		var onDeviceReady = function(){
			/*
			* Finally, initialize the app
			*/
			_initConfig(pathToAppConfig, function _initConfigSuccess(config){
				var configData = config.data;

				if("logLevel" in configData.app){
					jQuery.sap.log.setLevel(configData.app.logLevel);
				}

				document.title = configData.app.title;

				jQuery.sap.registerModulePath(configData.app['package'], configData.app["location"]);
				
			 	(new ui5strap.App(config, options)).init();

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

/*
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
*/
	

}());