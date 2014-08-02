/*
 * 
 * UI5Strap
 *
 * Sidebar Renderer
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

	jQuery.sap.declare("ui5strap.SidebarRenderer");

	ui5strap.SidebarRenderer = {
	};

	ui5strap.SidebarRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			inverse = oControl.getInverse();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('sidebar ' + (inverse ? 'sidebar-inverse' : 'sidebar-default'))
		rm.writeClasses();
		rm.write(">");
		

		rm.write("<div");
		rm.addClass('sidebar-content')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		};

		rm.write("</div>");

		rm.write("</div>");
	};

}());