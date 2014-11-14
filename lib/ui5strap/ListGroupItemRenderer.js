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
		var badge = oControl.getBadge(),
			parent = oControl.getParent(),
			tag = parent.getContainer() ? 'a' : 'li',
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
		
		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group-item');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		rm.writeClasses();
		rm.write(">");

		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl);
		    
		rm.write("</"+ tag + ">");
	};

}());
