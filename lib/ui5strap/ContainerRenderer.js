/*
 * 
 * UI5Strap
 *
 * Container Renderer
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

	jQuery.sap.declare("ui5strap.ContainerRenderer");

	ui5strap.ContainerRenderer = {
		typeToClass : {
			Default : "",
			Page : "container",
			Fluid : "container-fluid"
		}
	};

	ui5strap.ContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity();
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass(this.typeToClass[oControl.getType()]);
		if(ui5strap.Severity.None !== severity){
			rm.addClass("bg-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};


}());