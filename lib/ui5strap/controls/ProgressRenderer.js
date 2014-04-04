/*
 * 
 * UI5Strap
 *
 * Progress Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ProgressRenderer");

	de_pksoftware.ui5strap.controls.ProgressRenderer = {
	};

	de_pksoftware.ui5strap.controls.ProgressRenderer.render = function(rm, oControl) {
		var items = oControl.getBars();

		rm.write("<div");
		rm.writeControlData(oControl);

		rm.addClass('progress');
		
		if(oControl.getActive()){
			rm.addClass('active');
		}
		if(oControl.getStriped()){
			rm.addClass('progress-striped');
		}
		
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</div>");
	};

}());
