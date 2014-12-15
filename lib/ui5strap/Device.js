/*
 * 
 * UI5Strap
 *
 * ui5strap.Device
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

	jQuerySap.declare('ui5strap.Device');

	sap.ui.base.Object.extend('ui5strap.Device', {
		"constructor" : function(options){
			this.options = options;

			_validateOptions(this);
		}
	});

	var _validateOptions = function(_this){
		//Device Log Level
		if(!_this.options.logLevel){
			_this.options.logLevel = 0;
		}

		//Error to Browser
		if(!_this.options.errorToBrowser){
			_this.options.errorToBrowser = false;
		}
	};

	var _ready = function(_this, callback){
		jQuerySap.require("ui5strap.AppConfig");
		var appConfig = new ui5strap.AppConfig(_this.options);

		appConfig.load(ui5strap.AppConfig.processOption("app", _this.options.app), function load_complete(configDataJSON){
			var configAppNode = configDataJSON.app;
			
			//App Log Level
			jQuerySap.log.setLevel(configAppNode.logLevel || 0);
			
			jQuerySap.registerModulePath(configAppNode.package, configAppNode.location);
			
			if(!configAppNode.module){
				configAppNode.module = "ui5strap.App";
			}

			jQuerySap.require(configAppNode.module);
			var AppConstructor = jQuerySap.getObject(configAppNode.module),
				appInstance = new AppConstructor(appConfig);

			appInstance.init();

		 	appInstance.load(function(){
		 		appInstance.start();

		 		_this.showApp(appInstance);

		 		callback && callback.call(_this, appInstance);
			});
		});
	};

	var DeviceProto = ui5strap.Device.prototype;

	DeviceProto.ready = function(callback){
		var _this = this;

		/*
	 	* Error Handling
	 	*/
	 	if(this.options.errorToBrowser){
			window.onerror = function(message, file, line) { 
				jQuery('#ui5strap-fatal').html(message).css('display', 'block');
			};
		}

		/*
		* Device Log Level
		*/
		jQuery.sap.log.setLevel(this.options.logLevel);

		/*
		* Cordova handling
		*/
		if(this.options.cordova){
			document.addEventListener('deviceready', function on_deviceready(){
				_ready(_this, callback);
			});
		}
		else{
			_ready(_this, callback);
		}
		
	};

	DeviceProto.showApp = function(appInstance){
		if(appInstance.isVisible){
			throw new Exception('App is already visible!');
		}

		//Set dpcument title
		if(appInstance.config.data.app.documentTitle){
			document.title = appInstance.getLocaleString(appInstance.config.data.app.documentTitle);
		}

		appInstance.isVisible = true;
		appInstance.onShow();

		if(!appInstance.hasFirstShow){
			appInstance.hasFirstShow = true;
			appInstance.onFirstShow();
		}
	};
}());