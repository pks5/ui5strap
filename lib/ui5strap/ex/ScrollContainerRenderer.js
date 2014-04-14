/*
 * 
 * UI5Strap
 *
 * ScrollContainer Renderer
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

	jQuery.sap.declare("de_pksoftware.ui5strap.ex.ScrollContainerRenderer");

	de_pksoftware.ui5strap.ex.ScrollContainerRenderer = {};

	de_pksoftware.ui5strap.ex.ScrollContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		//TODO: implement as classes (first, we need a ui5strap stylesheet)
		var elStyle = 'width:100%; height:100%;-webkit-overflow-scrolling: touch;';
		
		elStyle += 'overflow-x:' + (oControl.getHorizontal() ? 'scroll' : 'hidden') + ';';
		elStyle += 'overflow-y:' + (oControl.getVertical() ? 'scroll' : 'hidden') + ';';
				

		rm.write("<div style='" + elStyle + "'");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-scroll-container");
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");

	};

}());