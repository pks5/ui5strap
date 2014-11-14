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

	jQuery.sap.declare("ui5strap.TextRenderer");


	ui5strap.TextRenderer = {
		typeToTag : {
			Default : "",
			Phrasing : "span",
			Strong : "strong",
			Emphasized : "em",
			Paragraph : "p",
			Blockquote : "blockquote",
			Quote : "q",
			Preformatted : "pre",
			Code : "code",
			Small : "small",
			Lead : "p",
			Abbreviation : "abbr",
			HelpBlock : "p"
 		}

	};

	ui5strap.TextRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			type = oControl.getType(),
			text = oControl.getText(),
			parse = oControl.getParse(),
			title = oControl.getTitle();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		if(ui5strap.TextType.Default === type){
			if(parse){
				rm.write(text);
			}
			else{
				rm.writeEscaped(text);
			}
		}
		else{
			var tagName = this.typeToTag[type];

			rm.write("<" + tagName);
			rm.writeControlData(oControl);
			
			//CSS Classes
			if(ui5strap.Severity.None !== severity){
				rm.addClass("text-" + ui5strap.BSSeverity[severity]);
			}
			
			if(ui5strap.TextType.Lead === type){
				rm.addClass("lead");
			}
			else if(ui5strap.TextType.HelpBlock === type){
				rm.addClass("help-block");
			}
			
			rm.writeClasses();
			
			//Attributes
			if('' !== title){
	    		rm.writeAttribute('title', title);
	    	}
			
			rm.write(">");
			
			ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
			
			rm.write("</" + tagName + ">");

		}
		
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
