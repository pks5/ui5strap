/*
 * 
 * UI5Strap
 *
 * Startup Script
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
	
	/*
	* ui5os
	*/
	jQuerySap.declare('ui5os');

	jQuerySap.require("ui5strap.library");

	jQuerySap.require("ui5strap.AppConfig");
	jQuerySap.require("ui5strap.App");

 	ui5os = {};

 	/*
 	* Error Handling
 	*/
	var _fatalError = function(message){
		var $fatalLayer = jQuery('#ui5strap-fatal');
		$fatalLayer.html(message);
		$fatalLayer.css('display', 'block');
	};

	window.onerror = function(message, file, line) { 
		_fatalError(message);
	};

	/*
	*
	* Test system requirements
	*
 	* @private
 	* @static
 	*/
	var _testRequirements = function(){
		if(!Object.keys){
			jQuerySap.log.warning('Object.keys is not supported by the browser!');
			return false;
		}

		return true;
	};

	/*
	* Frame messages
	*/
	var appInstance = null,
		_onFrameMessage = function(event){
		
		appInstance.onMessage(event.data);
	
	};

	window.addEventListener("message", _onFrameMessage, false);

	/*
	* Init
	*/
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

		//Device ready handler
		var onDeviceReady = function(){

			var appConfig = new ui5strap.AppConfig();

			appConfig.load(options.app.defaultValue, function(configDataJSON){
				var configAppNode = configDataJSON.app;
				if("logLevel" in configAppNode){
					jQuerySap.log.setLevel(configAppNode.logLevel);
				}

				//Deprecated
				//Use <title> in <head> instead
				if(configAppNode.title){
					document.title = configAppNode.title;
				}
				
				jQuerySap.registerModulePath(configAppNode['package'], configAppNode["location"]);
				
				if(!configAppNode.module){
					configAppNode.module = "ui5strap.App";
				}

				var AppConstructor = jQuerySap.getObject(configAppNode.module);

				appInstance = new AppConstructor(appConfig, options);

			 	appInstance.init();

			 	appInstance.preload(function(){
			 		appInstance.start();

			 		appInstance.onShow();

			 		appInstance.onFirstShow();
			 	});

			 	//init callback
			 	callback && callback();
			});
		};

		//Device Ready handling
		if(options.cordova){
			//Device Ready handler for Cordova
			document.addEventListener('deviceready', onDeviceReady, false);
		}
		else{
			//Device is ready!
			onDeviceReady();
		}
	};

}());