 /*
 * 
 * UI5Strap
 *
 * Panel Renderer
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

	jQuery.sap.declare("ui5strap.PanelRenderer");

	ui5strap.PanelRenderer = {};

	ui5strap.PanelRenderer.render = function(rm, oControl) {
		var panelType = oControl.getSeverity(),
			panelTitle = oControl.getTitle();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("panel");
		if(ui5strap.Severity.None !== panelType){
			rm.addClass("panel-" + ui5strap.BSSeverity[panelType]);
		}
		rm.writeClasses();
		rm.write(">");
		
		if('' !== panelTitle){
			rm.write("<div");
			rm.addClass("panel-heading");
			rm.writeClasses();
			rm.write(">");
			
			ui5strap.RenderUtils.renderTitleContent(rm, oControl);

			rm.write("</div>");
		}
		
		rm.write("<div");
		rm.addClass("panel-body");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write("</div>");
		
		rm.write("</div>");
	};

}());