/*
 * 
 * ui5strap
 *
 * AMChangeTheme
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.AMChangeTheme");

	ui5strap.ActionModule.extend("ui5strap.AMChangeTheme");

	var AMChangeThemeProto = ui5strap.AMChangeTheme.prototype;

	/*
	* @Override
	*/
	AMChangeThemeProto.namespace = 'changeTheme';

	/*
	* @Override
	*/
	AMChangeThemeProto.parameters = {
		"theme" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMChangeThemeProto.run = function(){
		var newTheme = this.getParameter('theme');

		if('default' === newTheme){
			newTheme = jQuery.sap.getModulePath('ui5strap') + '/bootstrap-3.1.1-dist/css/bootstrap.min.css';
		}

		var app = this.context.app;

		app.setLoaderVisible(true, function(){

			window.setTimeout(function(){
				
				//This is a hack: older browser do not fire the onload event for stylesheets
				//We use window.requestAnimationFrame to find out how old the broser is
				//TODO: Find a better way to securely detect if the browser does support onload on stylesheets
				if(window.requestAnimationFrame){
					jQuery.sap.includeStyleSheet(newTheme, 'bootstrap-css', function(){
						window.setTimeout(function(){
							app.setLoaderVisible(false);
						}, 500);
					}, null);
				}
				else{
					jQuery.sap.includeStyleSheet(newTheme, 'bootstrap-css', function(){}, null);
					window.setTimeout(function(){
						app.setLoaderVisible(false);
					}, 800);
				}

			}, 200);

		}, 'opaque');
	};

}());