/*
 * 
 * UI5Strap
 *
 * Image Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ImageRenderer");

	de_pksoftware.ui5strap.controls.ImageRenderer = {
	};

	de_pksoftware.ui5strap.controls.ImageRenderer.render = function(rm, oControl) {
		var cssClass = oControl.getCssClass();
		rm.write("<img");
		rm.writeControlData(oControl);
		if('' !== cssClass){
			rm.addClass(cssClass);
		}
		rm.writeClasses();
		
		rm.writeAttribute('src', oControl.getSrc());
		rm.writeAttribute('alt', oControl.getAlt());
		rm.write("/>");
	};

}());
