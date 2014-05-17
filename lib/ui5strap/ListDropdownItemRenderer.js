/*
 * 
 * UI5Strap
 *
 * ListLinkItem Renderer
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

	jQuery.sap.declare("ui5strap.ListDropdownItemRenderer");
	jQuery.sap.require("ui5strap.ListLinkItemRenderer");

	ui5strap.ListDropdownItemRenderer = {
	};

	ui5strap.ListDropdownItemRenderer.render = function(rm, oControl) {
		var menu = oControl.getMenu(),
			LinkRenderer = ui5strap.LinkRenderer;

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.addClass('dropdown');
		rm.writeClasses();
		rm.write(">");

		LinkRenderer.startRender(rm, oControl, { toggleDropdown : true });
		
		this.renderContent(rm, oControl);

		LinkRenderer.endRender(rm, oControl);
		
		if(null !== menu){
			rm.renderControl(menu);
		}

		rm.write("</li>");
	};

	ui5strap.ListDropdownItemRenderer.renderContent = function(rm, oControl){
		ui5strap.LinkRenderer.renderContent(rm, oControl);
		rm.write(' <span class="caret"></span>');
	};

}());
