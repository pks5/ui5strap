/*
 * 
 * UI5Strap
 *
 * Tooltip Renderer
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

	jQuery.sap.declare("ui5strap.TooltipRenderer");

	ui5strap.TooltipRenderer = {};

	ui5strap.TooltipRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.writeAttribute("style", "display:none;");
		rm.addClass("tooltip-data");
		rm.writeClasses();
		rm.write(">");

		rm.write("<div");
			   
		rm.addClass("tooltip-data-title");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderTitleContent(rm, oControl);

		rm.write("</div>");
		rm.write("</div>");
		    
	};

}());