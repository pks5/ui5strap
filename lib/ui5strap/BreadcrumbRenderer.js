 /*
 * UI5Strap
 *
 * Breadcrumb Renderer
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

jQuery.sap.declare("ui5strap.BreadcrumbRenderer");

ui5strap.BreadcrumbRenderer = {
};

ui5strap.BreadcrumbRenderer.render = function(rm, oControl) {
	var items = oControl.getItems();

	rm.write("<ol");
	rm.writeControlData(oControl);
	rm.addClass('breadcrumb');
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ol>");
};

}());
