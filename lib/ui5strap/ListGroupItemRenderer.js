/*
 * 
 * UI5Strap
 *
 * ListGroupItem Renderer
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

	jQuery.sap.declare("ui5strap.ListGroupItemRenderer");

	ui5strap.ListGroupItemRenderer = {
	};

	ui5strap.ListGroupItemRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			badge = oControl.getBadge(),
			parent = oControl.getParent(),
			tag = parent.getUseContainer() ? 'a' : 'li';

		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group-item');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		rm.writeClasses();
		rm.write(">");

		if('' !== badge){
			rm.write('<span class="badge">' + badge + '</span>');
		}
		 
		rm.write(oControl.getText());

		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		    
		rm.write("</"+ tag + ">");
	};

}());
