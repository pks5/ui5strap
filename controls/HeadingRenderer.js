/*
 * 
 * UI5Strap
 *
 * Heading Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.HeadingRenderer");

	de_pksoftware.ui5strap.controls.HeadingRenderer = {};

	de_pksoftware.ui5strap.controls.HeadingRenderer.render = function(rm, oControl) {
		var level = oControl.getLevel(),
			content = oControl.getContent();

		rm.write("<h" + level);
		rm.writeControlData(oControl);
		    //rm.addClass("container");
		    //rm.writeClasses();
		rm.write(">");
		    
		var text = oControl.getText();
		if('' !== text){
		   	rm.write(text);
		}
		    
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		};
		    
		rm.write("</h" + level + ">");
	};

}());