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

jQuery.sap.declare("ui5strap.ButtonGroupRenderer");

ui5strap.ButtonGroupRenderer = {
};

ui5strap.ButtonGroupRenderer.render = function(rm, oControl) {
	var size = oControl.getSize(),
		buttons = oControl.getButtons(),
		navbarAlign = oControl.getNavbarAlign();

	rm.write("<div");
	rm.writeControlData(oControl);

	rm.addClass('btn-group');
	if(ui5strap.Size.Default !== size){
		rm.addClass('btn-group-' + ui5strap.BSSize[size]);
	}

	if(ui5strap.NavBarAlignment.None !== navbarAlign){
		rm.addClass('navbar-btn');
		if(ui5strap.NavBarAlignment.Default !== navbarAlign){
			rm.addClass(ui5strap.BSNavBarAlignment[navbarAlign]);
		}
	}

	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < buttons.length; i++){
		rm.renderControl(buttons[i]);
	}
	
	rm.write("</div>");
};

}());
