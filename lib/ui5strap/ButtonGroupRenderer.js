 /*
 * UI5Strap
 *
 * Button Group Renderer
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

jQuery.sap.declare("ui5strap.ButtonGroupRenderer");

ui5strap.ButtonGroupRenderer = {
	typeToClass : {
		Default : "btn-group",
		Justified : "btn-group btn-group-justified",
		Vertical : "btn-group-vertical"
	}
};

ui5strap.ButtonGroupRenderer.render = function(rm, oControl) {
	var size = oControl.getSize(),
		type = oControl.getType(),
		buttons = oControl.getButtons();

	rm.write("<div");
	rm.writeControlData(oControl);

	rm.addClass(this.typeToClass[type]);
	
	if(ui5strap.Size.Default !== size){
		rm.addClass('btn-group-' + ui5strap.BSSize[size]);
	}

	ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-btn');

	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < buttons.length; i++){
		var button = buttons[i];
		if(type === ui5strap.ButtonGroupType.Justified && button instanceof ui5strap.Button){
			rm.write('<div class="btn-group">');
			rm.renderControl(button);
			rm.write("</div>");
		}
		else{
			rm.renderControl(button);
		}
	}
	
	rm.write("</div>");

};

}());
