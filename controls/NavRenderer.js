/**
 * 
 * Bootstrap nav renderer
 * 
 * Author: Philipp Knöller <info@http://pksoftware.de>
 * 
 * Copyright (c) 2013 PKSoftware.de
 * 
 * http://pksoftware.de
 * 
 */

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
