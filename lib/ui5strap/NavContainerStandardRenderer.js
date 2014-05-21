/*
 * 
 * UI5Strap
 *
 * Renderer for Standard Nav Container
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

	jQuery.sap.declare("ui5strap.NavContainerStandardRenderer");

	var NavContainerRenderer = {};

	ui5strap.NavContainerStandardRenderer = NavContainerRenderer;

	NavContainerRenderer.render = function(rm, oControl) {
		var navBar = oControl.getNavBar();

		oControl.renderStart(rm, 'standard');

		if(null !== navBar){
			rm.write("<div");
			rm.addClass('nav-container-navbar');
			rm.writeClasses();
			rm.write(">");

			rm.renderControl(navBar);

			rm.write("</div>");
		}

		oControl.renderTarget(rm, 'content');

		oControl.renderEnd(rm);
	};

}());
