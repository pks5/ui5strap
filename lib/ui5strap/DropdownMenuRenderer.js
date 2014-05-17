 /*
 * UI5Strap
 *
 * Dropdown Menu Renderer
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

jQuery.sap.declare("ui5strap.DropdownMenuRenderer");

ui5strap.DropdownMenuRenderer = {
};

ui5strap.DropdownMenuRenderer.render = function(rm, oControl) {
	var items = oControl.getItems();

	rm.write("<ul");
	rm.writeControlData(oControl);
	rm.addClass("dropdown-menu");
	rm.writeClasses();
	rm.writeAttribute("role", "menu");
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ul>");
};

}());
