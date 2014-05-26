/*
 * 
 * UI5Strap
 *
 * ListNavItem Renderer
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

	jQuery.sap.declare("ui5strap.ListNavItemRenderer");
	jQuery.sap.require("ui5strap.LinkRenderer");

	ui5strap.ListNavItemRenderer = {
	};

	ui5strap.ListNavItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge(),
			LinkRenderer = ui5strap.LinkRenderer;

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		LinkRenderer.startRender(rm, oControl, { toggleDropdown : true });
		
		LinkRenderer.renderContent(rm, oControl);

		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}

		LinkRenderer.endRender(rm, oControl);
		    
		rm.write("</li>");
	};

}());
