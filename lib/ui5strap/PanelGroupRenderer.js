/*
 * 
 * UI5Strap
 *
 * PanelGroupRenderer
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

	jQuery.sap.declare("ui5strap.PanelGroupRenderer");

	ui5strap.PanelGroupRenderer = {
	};

	ui5strap.PanelGroupRenderer.render = function(rm, oControl) {
		var panels = oControl.getPanels();

		rm.write("<div");

		rm.writeControlData(oControl);
		rm.addClass('panel-group')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < panels.length; i++){ 
			rm.renderControl(panels[i]);
		};

		rm.write("</div>");
	};

}());