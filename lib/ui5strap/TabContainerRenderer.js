/*
 * 
 * UI5Strap
 *
 * TabContainer Renderer
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

	jQuery.sap.declare("ui5strap.TabContainerRenderer");

	ui5strap.TabContainerRenderer = {
	};

	ui5strap.TabContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getPanes(),
			customAssociation = oControl.getCustomAssociation();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('tab-content')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			var item = content[i];
			var paneId = i;
			if('' !== customAssociation){
				paneId = item.data(customAssociation);
			}

			rm.write('<div id="' + oControl.getId() + '---' + paneId + '"');
			rm.addClass('tab-pane')
			rm.writeClasses();
			rm.write(">");
			
			rm.renderControl(item);

			rm.write("</div>");
		};

		rm.write("</div>");
	};

}());