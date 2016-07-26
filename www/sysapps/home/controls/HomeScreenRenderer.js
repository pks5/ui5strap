/**
 * 
 * Ui5OS
 * 
 * ui5os.controls.HomeScreenRenderer
 * 
 * Author: Jan Philipp Knoeller
 * 
 * Copyright (c) 2013 Philipp Knoeller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

sap.ui.define(['jquery.sap.global'], function(jQuery) {
	var HomeScreenRenderer = {};

	HomeScreenRenderer.render = function(rm, oControl) {
		var icons = oControl.getIcons(),
			iconsLength = icons.length;
	
		if(0 < iconsLength){
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass("ui5strapHomeScreen");
			rm.writeClasses();
			rm.write(">");
	
			rm.write("<div");
			rm.addClass("ui5strapHomeScreen-inner");
			if(!oControl._transitionTriggered){
				rm.addClass("ui5strapHomeScreen-animation-" + oControl.getIconAnimation());
			}
			rm.writeClasses();
			rm.write(">");
	
			for(var i = 0; i< iconsLength; i++){
				icons[i].setIndex(i);
				rm.renderControl(icons[i]);
			}
	
			rm.write("</div></div>");
		}
		else{
			return false;
		}
	};

	return HomeScreenRenderer;
}, true);

