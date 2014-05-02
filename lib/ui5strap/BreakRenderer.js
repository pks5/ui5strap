/*
 * 
 * UI5Strap
 *
 * Break Renderer
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

	jQuery.sap.declare("ui5strap.BreakRenderer");

	ui5strap.BreakRenderer = {};

	ui5strap.BreakRenderer.render = function(rm, oControl) {
		rm.write("<br />");
	};

}());