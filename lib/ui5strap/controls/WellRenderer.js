/*
 * 
 * UI5Strap
 *
 * Well Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.WellRenderer");

	de_pksoftware.ui5strap.controls.WellRenderer = {};

	de_pksoftware.ui5strap.controls.WellRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			size = oControl.getSize();

		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass("well");
		if(de_pksoftware.ui5strap.Size.Default !== size){
			rm.addClass("well-" + de_pksoftware.ui5strap.BSSize[size]);
		}
		rm.writeClasses();
		rm.write(">");
		
		var subText = oControl.getText();
		if('' !== subText){
			rm.write(subText);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};

}());
