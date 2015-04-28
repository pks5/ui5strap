/*
 * 
 * UI5Strap
 *
 * ui5strap.TextRenderer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
