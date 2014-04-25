/*
 * 
 * UI5Strap
 *
 * form.RadioRenderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.RadioRenderer");

	de_pksoftware.ui5strap.form.RadioRenderer = {};

	de_pksoftware.ui5strap.form.RadioRenderer.render = function(rm, oControl) {
		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('radio');
		rm.writeClasses();
		rm.write(">");
			rm.write("<label>");
			rm.write('<input')
			rm.writeAttribute('id', oControl.getId() + '---checkbox');
			rm.writeAttribute('type', 'radio');
			rm.writeAttribute('value', oControl.getValue());
			rm.writeAttribute('name', oControl.getName());
			if(oControl.getChecked()){
				rm.writeAttribute('checked', 'checked');
			}
			rm.write('/>');
			rm.write(oControl.getLabel());
		rm.write("</label></div>");
	};

}());
