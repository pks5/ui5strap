/*
 * 
 * UI5Strap
 *
 * Page Renderer
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

	jQuery.sap.declare("ui5strap.PageRenderer");

	ui5strap.PageRenderer = {};

	ui5strap.PageRenderer.render = function(rm, oControl) {
		var head = oControl.getHead(),
			content = oControl.getBody(),
			footer = oControl.getFooter();

		rm.write("<div");
		
		rm.addClass('page');
		
		rm.writeClasses();
		rm.write(">");
		
		if(null !== head){
			rm.write("<div class='page-head'>");
			rm.renderControl(head);
			rm.write("</div>");
		}

		rm.write("<div class='page-body'>");
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		rm.write("</div>");

		if(null !== footer){
			rm.write("<div class='page-footer'>");
			rm.renderControl(footer);
			rm.write("</div>");
		}

		rm.write("</div>");
	};

}());
