/*
 * 
 * UI5Strap
 *
 * Heading Renderer
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

	jQuery.sap.declare("ui5strap.HeadingRenderer");

	ui5strap.HeadingRenderer = {

		typeToClass : {
			"PageHeader" : 'page-header',
			'ListGroupItemHeading' : 'list-group-item-heading',
			'MediaHeading' : 'media-heading'
		}
	};

	ui5strap.HeadingRenderer.render = function(rm, oControl) {
		var level = oControl.getLevel(),
			type = oControl.getType(),
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
			

		rm.write("<h" + level);
		rm.writeControlData(oControl);

		if(ui5strap.HeadingType.Default !== type){
			rm.addClass(this.typeToClass[type]);
		}
		
		rm.writeClasses();
		rm.write(">");
		    
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		    
		rm.write("</h" + level + ">");
	};

}());