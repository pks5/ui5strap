/*
 * 
 * UI5Strap
 *
 * form.FormRenderer
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

	jQuery.sap.declare("ui5strap.FormRenderer");

	ui5strap.FormRenderer = {

		typeToClass : {
			"Horizontal" : 'form-horizontal',
			"Inline" : 'form-inline',
		}
	};

	ui5strap.FormRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			action = oControl.getAction(),
			method = oControl.getMethod(),
			type = oControl.getType();

		rm.write("<form");
		
		rm.writeControlData(oControl);
		rm.writeAttribute('role', 'form');
		if('' !== action){
			rm.writeAttribute('action', action);
		}
		if(ui5strap.FormMethod.Default !== method && ui5strap.FormMethod.None !== method){
			rm.writeAttribute('method', method);
		}
		if(ui5strap.FormType.Default !== type){
			rm.addClass(this.typeToClass[type]);
		}
		
		ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-form');

		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</form>");
	};

}());
