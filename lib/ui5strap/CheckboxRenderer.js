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

	jQuery.sap.declare("ui5strap.CheckboxRenderer");

	ui5strap.CheckboxRenderer = {};

	ui5strap.CheckboxRenderer.render = function(rm, oControl) {
		var type = oControl.getType(),
			typeBlock = ui5strap.CheckboxType.Block;

		if(type === typeBlock){
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('checkbox');
			rm.writeClasses();
			rm.write(">");
		}
		

			rm.write("<label");
			if(type === ui5strap.CheckboxType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('checkbox-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.CheckboxType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', oControl.getId() + '---checkbox');
				}
				rm.writeAttribute('type', 'checkbox');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeClasses();
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.write('/>');
				
					rm.writeEscaped(oControl.getLabel());

			rm.write("</label>");

		if(type === typeBlock){
			rm.write("</div>");
		}
	};

}());
