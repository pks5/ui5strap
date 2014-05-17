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

	jQuery.sap.declare("ui5strap.DropdownListItemRenderer");
	jQuery.sap.require("ui5strap.ListLinkItemRenderer");

	ui5strap.DropdownListItemRenderer = {
	};

	ui5strap.DropdownListItemRenderer.render = function(rm, oControl) {
		var menu = oControl.getDropdown(),
			ListLinkItemRenderer = ui5strap.ListLinkItemRenderer;

		ListLinkItemRenderer.startRender(rm, oControl, { toggleDropdown : true });

		this.renderContent(rm, oControl);

		ui5strap.LinkRenderer.endRender(rm, oControl);
		
		if(null !== menu){
			rm.renderControl(menu);
		}

		rm.write("</li>");
	};

	ui5strap.DropdownListItemRenderer.renderContent = function(rm, oControl){
		ui5strap.LinkRenderer.renderContent(rm, oControl);
		rm.write(' <span class="caret"></span>');
	};

}());
