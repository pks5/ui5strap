/*
 * 
 * UI5Strap
 *
 * NavBarToggle Renderer
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

	jQuery.sap.declare("ui5strap.NavBarToggleRenderer");

	ui5strap.NavBarToggleRenderer = {
	};

	ui5strap.NavBarToggleRenderer.render = function(rm, oControl) {
		var parent = oControl.getParent();
		if(!(parent instanceof ui5strap.NavBar)){
			throw new Error('ui5strap.NavBarToggle is only allowed inside a ui5strap.NavBar control.');
			return;
		}
		rm.write('<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#' + parent.getCollapseId() + '">');
		rm.write('<span class="sr-only">' + oControl.getSrText() + '</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>');
		rm.write('</button>');
	};

}());