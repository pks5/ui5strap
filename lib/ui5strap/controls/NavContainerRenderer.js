/*
 * 
 * UI5Strap
 *
 * Renderer for Standard Nav Container
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.NavContainerRenderer");

	var NavContainerRenderer = {};

	de_pksoftware.ui5strap.controls.NavContainerRenderer = NavContainerRenderer;

	NavContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-nav-container");
		rm.writeClasses();
		rm.write(">");
		
		rm.renderControl(oControl.getNavBar());
		
		// Render content
		rm.write("<div");
		rm.addClass("ui5strap-nav-container-content");
		rm.writeClasses();
		rm.write(">");
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			};
		rm.write("</div>");
		
		rm.write("</div>");
	};

}());
