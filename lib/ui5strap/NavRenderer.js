 /*
 * UI5Strap
 *
 * Nav Renderer
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

jQuery.sap.declare("ui5strap.NavRenderer");

ui5strap.NavRenderer = {
	typeToClass : {
		Tabs : "nav-tabs",
		Pills : "nav-pills",
		PillsStacked : "nav-pills nav-stacked",
		PillsJustified : "nav-pills nav-justified",
		TabsJustified : "nav-tabs nav-justified"
	}

};

ui5strap.NavRenderer.render = function(rm, oControl) {
	var type = oControl.getType(),
		items = oControl.getItems();

	rm.write("<ul");
	
	rm.writeControlData(oControl);

	rm.addClass('nav');
	if(ui5strap.NavType.Default !== type){
		rm.addClass(this.typeToClass[type]);
	}
	
	ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-nav');

	rm.writeClasses();
	
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ul>");
};

}());
