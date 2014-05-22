/*
 * 
 * UI5Strap
 *
 * TextInputRenderer
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

	jQuery.sap.declare("ui5strap.TextInputRenderer");

	ui5strap.TextInputRenderer = {};

	ui5strap.TextInputRenderer.render = function(rm, oControl) {
		var rows = oControl.getRows(),
			type = oControl.getType();

		if(1 === rows){
			
			rm.write("<input");
			
			rm.writeControlData(oControl);
			
			rm.writeAttribute('type', "text");

			rm.writeAttribute('placeholder', oControl.getPlaceholder());
			rm.writeAttribute('value', oControl.getValue());
			
			if(type === ui5strap.TextInputType.FormControl){
				rm.addClass('form-control');
			}
			
			if(!oControl.getEnabled()){
				rm.writeAttribute('disabled', 'disabled');
			}

			var size = oControl.getSize();
			if(ui5strap.Size.Default !== size){
				rm.addClass('input-' + ui5strap.BSSize[size]);
			}
			
			rm.writeClasses();
			rm.write("/>");

		}
		else if(1 < rows){
			rm.write("<textarea");
			
			rm.writeControlData(oControl);
			
			rm.writeAttribute('rows', rows);
			rm.writeAttribute('placeholder', oControl.getPlaceholder());
			
			if(type === ui5strap.TextInputType.FormControl){
				rm.addClass('form-control');
			}
			
			if(!oControl.getEnabled()){
				rm.writeAttribute('disabled', 'disabled');
			}

			rm.writeClasses();
			rm.write(">");
			
			rm.writeEscaped(oControl.getValue());
			
			rm.write("</textarea>");
		}

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
