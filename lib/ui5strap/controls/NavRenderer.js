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

jQuery.sap.declare("de_pksoftware.ui5strap.controls.NavRenderer");

de_pksoftware.ui5strap.controls.NavRenderer = {
};

de_pksoftware.ui5strap.controls.NavRenderer.render = function(rm, oControl) {
	var type = oControl.getType(),
		items = oControl.getItems(),
		navbarAlign = oControl.getNavbarAlign();

	rm.write("<ul");
	rm.writeControlData(oControl);

	rm.addClass('nav');
	if('' !== type){
		rm.addClass('nav-' + type);
	}
	if(oControl.getStacked()){
		rm.addClass('nav-stacked');
	}
	if(oControl.getJustified()){
		rm.addClass('nav-justified');
	}
	if(oControl.getInNavbar()){
		rm.addClass('navbar-nav');
	}
	if('' !== navbarAlign){
		rm.addClass('navbar-' + navbarAlign);
	}
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ul>");
};

}());
