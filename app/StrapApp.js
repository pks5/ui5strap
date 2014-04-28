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
 	var packageName = "com_mycompany.my_app",
 		moduleName = packageName + ".StrapApp";

 	//jQuery.sap.registerModulePath("de_pksoftware.ui5strap", "./lib/ui5strap");
 	jQuery.sap.registerModulePath("ui5strap", "./lib/ui5strap");

	jQuery.sap.declare(moduleName);
	
	sap.ui.base.Object.extend(moduleName);

	var MyApp = com_mycompany.my_app.StrapApp,
		MyAppProto = MyApp.prototype;

	MyApp._instance = null;

	jQuery.sap.require(packageName + ".StrapFrame");

	var MyAppFrame =  com_mycompany.my_app.StrapFrame;

	MyApp.getInstance = function(){
		if(null === MyApp._instance){
			MyApp._instance = new MyApp();
		}
		return MyApp._instance;
	};

	MyAppProto.init = function(){
		var app = this;

		

		this._strapRoot = jQuery.sap.getModulePath("ui5strap");
		this._appRoot = jQuery.sap.getModulePath(packageName);
		
		this.getLocalization();

		
			
		//Create a new frame instance
		this._appFrame = new MyAppFrame();
		//this._appFrame.init();
		this._appFrame.init();
		this._appFrame.placeAt('ui5strap-body');

		this.sheets = [
			this._strapRoot + "/bootstrap-3.1.1-dist/css/bootstrap.min.css",
			//this._appRoot + "/bootstrap-3.1.1-dist/css/bootstrap-theme.min.css",
			this._appRoot + "/css/theme.css"
		];	

		this._initStyle(this.sheets, function(){
			app.start();
		});
	};

	MyAppProto.getFrame = function(){
		return this._appFrame;
	};

	MyAppProto.start = function(){
		this._appFrame.gotoHome();
		this.showLoader(false);
	};

	MyAppProto.showLoader = function(visible){
		jQuery('#loader').css('display', visible ? 'block' : 'none');
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

	MyAppProto.getLocalization = function(){
		if(!this._localization){
			//Localization
			this._localization = new sap.ui.model.resource.ResourceModel({
				bundleUrl : this._appRoot + "/i18n/i18n.properties"
			});
			sap.ui.getCore().setModel(this._localization, "i18n");
			
			document.title = this._localization.getProperty("HTML_TITLE");
		}
		else{
			return this._localization;
		}
	};

}());