 /*
 * UI5Strap
 *
 * Button Group Renderer
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

jQuery.sap.declare("de_pksoftware.ui5strap.controls.ButtonGroupRenderer");

de_pksoftware.ui5strap.controls.ButtonGroupRenderer = {
};

de_pksoftware.ui5strap.controls.ButtonGroupRenderer.render = function(rm, oControl) {
	var size = oControl.getSize(),
		buttons = oControl.getButtons();

	rm.write("<div");
	rm.writeControlData(oControl);

	rm.addClass('btn-group');
	if('' !== size){
		rm.addClass('btn-group-' + size);
	}

	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < buttons.length; i++){
		rm.renderControl(buttons[i]);
	}
	
	rm.write("</div>");
};

}());