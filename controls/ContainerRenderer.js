/*
 * 
 * UI5Strap
 *
 * Container Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ContainerRenderer");

	de_pksoftware.ui5strap.controls.ContainerRenderer = {
	};

	de_pksoftware.ui5strap.controls.ContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass(oControl.getFluid() ? "container-fluid" : "container");
		rm.addClass(oControl.getCssClass());
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};


}());