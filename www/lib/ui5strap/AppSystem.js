/*
 * 
 * Ui5OS
 * 
 * AppSystem
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

 (function(){

	var jQuerySap = jQuery.sap;

	jQuerySap.require("ui5strap.App");
	
	jQuerySap.declare("ui5strap.AppSystem");

	ui5strap.App.extend("ui5strap.AppSystem", {
		"constructor" : function(config, viewer){
			ui5strap.App.call(this, config, viewer);

			this.getViewer = function(){
				return viewer;
			};
		}
	});
	var AppSystem = ui5strap.AppSystem, 
		AppSystemProto = AppSystem.prototype;

}());