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

	jQuery.sap.declare("ui5strap.InputRenderer");

	ui5strap.InputRenderer = {};

	ui5strap.InputRenderer.render = function(rm, oControl) {
		var size = oControl.getSize();

		rm.write("<input");
		
		rm.writeControlData(oControl);
		rm.addClass('form-control');
		rm.writeAttribute('type', oControl.getInputType());
		rm.writeAttribute('placeholder', oControl.getPlaceholder());
		rm.writeAttribute('value', oControl.getValue());
		if(oControl.getDisabled()){
			rm.writeAttribute('disabled', 'disabled');
		}
		if(ui5strap.Size.Default !== size){
		    	rm.addClass('input-' + ui5strap.BSSize[size]);
		    }
		rm.writeClasses();
		rm.write("/>");
		
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
