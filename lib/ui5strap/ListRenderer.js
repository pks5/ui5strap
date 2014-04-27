 /*
 * UI5Strap
 *
 * List Renderer
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

jQuery.sap.declare("ui5strap.ListRenderer");

ui5strap.ListRenderer = {
};

ui5strap.ListRenderer.render = function(rm, oControl) {
	var items = oControl.getItems();

	var tagName = 'ul';
	if(oControl.getType() === ui5strap.ListType.Ordered){
		tagName = 'ol';
	}

	rm.write("<" + tagName);
	rm.writeControlData(oControl);
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</" + tagName + ">");
};

}());
