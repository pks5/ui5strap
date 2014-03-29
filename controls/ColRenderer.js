/*
 * 
 * UI5Strap
 *
 * Col Renderer
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

jQuery.sap.declare("de_pksoftware.ui5strap.controls.ColRenderer");

de_pksoftware.ui5strap.controls.ColRenderer = {
};

de_pksoftware.ui5strap.controls.ColRenderer.render = function(rm, oControl) {
	var content = oControl.getContent();

	rm.write("<div");
	rm.writeControlData(oControl);
	var columsMedium = oControl.getColumnsMedium(),
		columsLarge = oControl.getColumnsLarge(),
		columsSmall = oControl.getColumnsSmall(),
		columsExtraSmall = oControl.getColumnsExtraSmall();

	if(0 !== columsMedium){
		rm.addClass("col-md-" + columsMedium);
	}
	if(0 !== columsLarge){
		rm.addClass("col-lg-" + columsLarge);
	}
	if(0 !== columsSmall){
		rm.addClass("col-sm-" + columsSmall);
	}
	if(0 !== columsExtraSmall){
		rm.addClass("col-xs-" + columsExtraSmall);
	}
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
	}
	
	rm.write("</div>");
};


}());
