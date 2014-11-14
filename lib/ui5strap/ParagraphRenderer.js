/*
 * 
 * UI5Strap
 *
 * Paragraph
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

	jQuery.sap.declare("ui5strap.ParagraphRenderer");

	ui5strap.ParagraphRenderer = {};

	ui5strap.ParagraphRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity(),
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		rm.write("<p");
		
		rm.writeControlData(oControl);
		if(oControl.getFormStatic()){
			rm.addClass('form-control-static');
		}
		if(ui5strap.Severity.None !== severity){
			rm.addClass("text-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");
		
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		
		rm.write("</p>");
	};

}());
