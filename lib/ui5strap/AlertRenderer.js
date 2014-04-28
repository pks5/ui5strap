/*
 * 
 * UI5Strap
 *
 * Alert Renderer
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

	jQuery.sap.declare("ui5strap.AlertRenderer");

	ui5strap.AlertRenderer = {};

	ui5strap.AlertRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			strongText = oControl.getStrongText();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("alert alert-" + ui5strap.BSSeverity[oControl.getSeverity()] );
		rm.writeClasses();
		rm.write(">");
		
		if('' !== strongText){
			rm.write('<strong>' + strongText + '</strong>');
		}

		rm.write(oControl.getText());
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}

		rm.write("</div>");

	};

}());