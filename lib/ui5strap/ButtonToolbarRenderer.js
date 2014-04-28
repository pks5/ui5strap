 /*
 * UI5Strap
 *
 * Button Toolbar Renderer
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

jQuery.sap.declare("ui5strap.ButtonToolbarRenderer");

ui5strap.ButtonToolbarRenderer = {
};

ui5strap.ButtonToolbarRenderer.render = function(rm, oControl) {
	var buttons = oControl.getButtonGroups();

	rm.write("<div");
	rm.writeControlData(oControl);

	rm.addClass('btn-toolbar');
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < buttons.length; i++){
		rm.renderControl(buttons[i]);
	}
	
	rm.write("</div>");
};

}());
