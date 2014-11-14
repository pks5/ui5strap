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

	jQuery.sap.declare("ui5strap.HtmlTagRenderer");

	ui5strap.HtmlTagRenderer = {};

	ui5strap.HtmlTagRenderer.render = function(rm, oControl) {

		var content = oControl.getContent(),
			tagName = oControl.getTagName(),
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		rm.write("<" + tagName);
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);

		rm.write("</" + tagName + ">");

	};

}());