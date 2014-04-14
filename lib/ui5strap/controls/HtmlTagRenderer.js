/*
 * 
 * UI5Strap
 *
 * Badge Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.HtmlTagRenderer");

	de_pksoftware.ui5strap.controls.HtmlTagRenderer = {};

	de_pksoftware.ui5strap.controls.HtmlTagRenderer.render = function(rm, oControl) {

		var content = oControl.getContent(),
			tagName = oControl.getTagName(),
			cssClass = oControl.getCssClass(),
			text = oControl.getText();

		rm.write("<" + tagName);
		rm.writeControlData(oControl);
		if('' !== cssClass){
			rm.addClass(cssClass);
		}
		rm.writeClasses();
		rm.write(">");
		
		if('' !== text){
			rm.writeEscaped(text);
		}

		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}

		rm.write("</" + tagName + ">");

	};

}());