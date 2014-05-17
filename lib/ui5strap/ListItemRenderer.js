/*
 * 
 * UI5Strap
 *
 * ListItem Renderer
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

	jQuery.sap.declare("ui5strap.ListItemRenderer");

	ui5strap.ListItemRenderer = {
	};

	ui5strap.ListItemRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<li");
		rm.writeControlData(oControl);
		
		if(oControl.getSelected()){
			rm.addClass("active");
		}
		
		if(!oControl.getEnabled()){
			rm.addClass("disabled");
		}

		rm.writeClasses();

		rm.write(">");

		var subText = oControl.getText();
		if('' !== subText){
			rm.writeEscaped(subText);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}

		rm.write("</li>");
	};

}());