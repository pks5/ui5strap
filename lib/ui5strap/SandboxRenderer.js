/*
 * 
 * Ui5Strap
 * 
 * Renderer SandboxRenderer
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

(function ui5osControlSandboxRenderer(){

	jQuery.sap.declare("ui5strap.SandboxRenderer");

	ui5strap.SandboxRenderer = {};

	ui5strap.SandboxRenderer.render = function(rm, oControl) {
		 rm.write("<div");
		 rm.writeControlData(oControl);
		 rm.addClass("sandbox");
		 rm.writeClasses();
		 rm.write(">");
		 rm.write("</div>");
	};

}());