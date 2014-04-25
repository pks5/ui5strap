/*
 * 
 * UI5Strap
 *
 * form.InputRenderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.InputRenderer");

	de_pksoftware.ui5strap.form.InputRenderer = {};

	de_pksoftware.ui5strap.form.InputRenderer.render = function(rm, oControl) {
		rm.write("<input");
		
		rm.writeControlData(oControl);
		rm.addClass('form-control');
		rm.writeAttribute('type', oControl.getType());
		rm.writeAttribute('placeholder', oControl.getPlaceholder());
		rm.writeAttribute('value', oControl.getValue());
		if(oControl.getDisabled()){
			rm.writeAttribute('disabled', 'disabled');
		}
		rm.writeClasses();
		rm.write("/>");
		if(oControl.getTrailingSpace()){
		    	rm.write(' ');
		    }
	};

}());
