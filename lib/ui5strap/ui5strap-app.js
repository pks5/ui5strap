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
	
	/*
	* Global ui5os compatibility object
	*/
	jQuerySap.declare('ui5os');

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

}());