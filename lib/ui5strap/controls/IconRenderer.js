/*
 * 
 * UI5Strap
 *
 * Icon Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.IconRenderer");

	de_pksoftware.ui5strap.controls.IconRenderer = {};

	de_pksoftware.ui5strap.controls.IconRenderer.render = function(rm, oControl) {
		var iconGroup = oControl.getIconGroup();

		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass(iconGroup);
		rm.addClass(iconGroup+'-'+oControl.getIcon());
		rm.writeClasses();
		rm.write(">");
		rm.write("</span>");

	};

}());