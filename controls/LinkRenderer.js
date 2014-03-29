/*
 * 
 * UI5Strap
 *
 * Link Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.LinkRenderer");

	de_pksoftware.ui5strap.controls.LinkRenderer = {};

	de_pksoftware.ui5strap.controls.LinkRenderer.render = function(rm, oControl) {
		var cssClass = oControl.getCssClass(),
			content = oControl.getContent();
		
		rm.write("<a");
		rm.writeControlData(oControl);
		if('' !== cssClass){
			rm.addClass(cssClass);
		}
		rm.writeClasses();
		    
		var href = oControl.getHref();
		if('' !== href){
			rm.writeAttribute('href', href);
		}

		var target = oControl.getTarget();
		if('' !== target){
			rm.writeAttribute('target', target);
		}
		rm.write(">");
		    
		var subText = oControl.getText();
		if('' !== subText){
			rm.write(subText);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}

		rm.write("</a>");
	};

}());