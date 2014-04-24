/*
 * 
 * UI5Strap
 *
 * form.CheckboxRenderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.CheckboxRenderer");

	de_pksoftware.ui5strap.form.CheckboxRenderer = {};

	de_pksoftware.ui5strap.form.CheckboxRenderer.render = function(rm, oControl) {
		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('checkbox');
		rm.writeClasses();
		rm.write(">");
			rm.write("<label>");
			rm.write('<input type="checkbox" value="' + rm.writeEscaped(oControl.getValue()) + '" />');
			rm.write(oControl.getLabel());
		rm.write("</label></div>");
	};

}());
