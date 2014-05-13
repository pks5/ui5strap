/*
 * 
 * UI5Strap
 *
 * Clearfix Renderer
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

	jQuery.sap.declare("ui5strap.ClearfixRenderer");

	ui5strap.ClearfixRenderer = {};

	ui5strap.ClearfixRenderer.render = function(rm, oControl) {
		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('clearfix');
		
		var visibilityMedium = oControl.getVisibilityMedium(),
			visibilityLarge = oControl.getVisibilityLarge(),
			visibilitySmall = oControl.getVisibilitySmall(),
			visibilityExtraSmall = oControl.getVisibilityExtraSmall(),
			defaultVisibility = ui5strap.ScreenSizeVisibility.Default,
			visible = ui5strap.ScreenSizeVisibility.Visible,
			hidden = ui5strap.ScreenSizeVisibility.Hidden;


		if(defaultVisibility !== visibilityMedium){
			if(visibilityMedium === visible){
				rm.addClass('visible-md');
			}
			if(visibilityMedium === hidden){
				rm.addClass('hidden-md');
			}
		}
		if(defaultVisibility !== visibilityLarge){
			if(visibilityLarge === visible){
				rm.addClass('visible-lg');
			}
			if(visibilityLarge === hidden){
				rm.addClass('hidden-lg');
			}
		}
		if(defaultVisibility !== visibilitySmall){
			if(visibilitySmall === visible){
				rm.addClass('visible-sm');
			}
			if(visibilitySmall === hidden){
				rm.addClass('hidden-sm');
			}
		}
		if(defaultVisibility !== visibilityExtraSmall){
			if(visibilityExtraSmall === visible){
				rm.addClass('visible-xs');
			}
			if(visibilityExtraSmall === hidden){
				rm.addClass('hidden-xs');
			}
		}

		rm.writeClasses();
		rm.write(">");
		
		rm.write("</div>");
	};

}());
