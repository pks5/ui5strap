/*
 * 
 * UI5Strap
 *
 * Application Main Module
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

 (function(){

	jQuery.sap.declare("de_pksoftware.ui5strap.StrapApp");

	sap.ui.base.Object.extend("de_pksoftware.ui5strap.StrapApp");

	var MyApp = de_pksoftware.ui5strap.StrapApp,
		MyAppProto = MyApp.prototype;

	MyApp._instance = null;

	MyApp.getInstance = function(){
		if(null === MyApp._instance){
			MyApp._instance = new MyApp();
		}
		return MyApp._instance;
	};

	MyAppProto.init = function(){
		var app = this;

		this._appRoot = jQuery.sap.getModulePath("de_pksoftware.ui5strap");
		
		this._initLocalization();

		//Require frame module
		jQuery.sap.require("de_pksoftware.ui5strap.StrapFrame");
			
		//Create a new frame instance
		this._appFrame = new de_pksoftware.ui5strap.StrapFrame();
		//this._appFrame.init();

		

		var sheets = [
			this._appRoot + "/bootstrap-3.1.1-dist/css/bootstrap.min.css",
			this._appRoot + "/bootstrap-3.1.1-dist/css/bootstrap-theme.min.css",
			this._appRoot + "/css/theme.css"
				
		];

		this._initStyle(sheets, function(){
			app.start();
		});
	};

	MyAppProto.getFrame = function(){
		return this._appFrame;
	};

	MyAppProto.start = function(){
		this._appFrame.gotoHome();
	};

	MyAppProto._initStyle = function(sheets, callback){
		var callI = 0;
		var callMax = sheets.length;
		var success = function anon_loadCssComplete(){
				callI ++;
				if(callI === callMax){
					callback();
				}
		};

		var error = function anon_loadCssFailed(){
				throw new Error('Could not load css file: ' + sheets[i]);
		};

		
		for (var i = 0; i < sheets.length; i++){
			jQuery.sap.includeStyleSheet(sheets[i], 'style-sheet-' + i, success, error);
		}
	};

	MyAppProto._initLocalization = function(){
		//Localization
		this._localization = new sap.ui.model.resource.ResourceModel({
			bundleUrl : this._appRoot + "/i18n/i18n.properties"
		});
		sap.ui.getCore().setModel(this._localization, "i18n");
		
		document.title = this._localization.getProperty("HTML_TITLE");
	};

}());