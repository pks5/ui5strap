 /*
 * UI5Strap
 *
 * Dropdown Button Renderer
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

	jQuery.sap.declare("ui5strap.DropdownButtonRenderer");
	jQuery.sap.require("ui5strap.ButtonRenderer");

	ui5strap.DropdownButtonRenderer = {
	};

	ui5strap.DropdownButtonRenderer.render = function(rm, oControl) {
		var menu = oControl.getDropdown(),
			buttonRenderer = ui5strap.ButtonRenderer;

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("btn-group");
		if(oControl.getDropup()){
			rm.addClass('dropup');
		}
		rm.writeClasses();
		rm.write(">");

		buttonRenderer.startRender(rm, oControl, { toggleDropdown : true });

	    this.renderContent(rm, oControl);

	    buttonRenderer.endRender(rm, oControl);

	    if(null !== menu){
			rm.renderControl(menu);
		}
		
		rm.write("</div>");

		if(oControl.getTrailingSpace()){
	    	rm.write(' ');
	    }
	};

	ui5strap.DropdownButtonRenderer.renderContent = function(rm, oControl) {
		ui5strap.ButtonRenderer.renderContent(rm, oControl);
		rm.write(' <span class="caret"></span>');
	};

}());