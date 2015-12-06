/*
 * 
 * UI5Strap
 *
 * ui5strap.ContainerRenderer
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

	jQuery.sap.declare("ui5strap.ContainerRenderer");

	ui5strap.ContainerRenderer = {
		typeToTag : {
			Default : {
				tagName : "div",
				className : "container-default"
			},
			Text : {
				tagName : "span",
				className : "container-text"
			},
			Section : {
				tagName : "section",
				className : "container-section"
			},
			
			//Bootstrap container and container-fluid
			//container-inset is an additional class that adds padding-top and padding-bottom
			
			Fluid : {
				tagName : "div",
				className : "container-fluid"
			},
			Inset : {
				tagName : "div",
				className : "container-inset"
			},
			Full : {
				tagName : "div",
				className : "container-full"
			},
			
			FluidInset : {
				tagName : "div",
				className : "container-fluid container-inset"
			},
			FluidFull : {
				tagName : "div",
				className : "container-fluid container-full"
			},
			InsetFull : {
				tagName : "div",
				className : "container-inset container-full"
			},
			FluidInsetFull : {
				tagName : "div",
				className : "container-fluid container-inset container-full"
			},
			
			
			//Bootstrap Components
			Website : {
				tagName : "div",
				className : "container"
			},
			Jumbotron : {
				tagName : "div",
				className : "container-jumbotron jumbotron"
			},
			Well : {
				tagName : "div",
				className : "container-well well"
			},
			WellLarge : {
				tagName : "div",
				className : "container-well well well-lg"
			},
			PageHeader : {
				tagName : "div",
				className : "container-page-header page-header"
			},
			
			
			
			//Deprecated
			Page : {
				tagName : "div",
				className : "container"
			},
			Paragraph : {
				tagName : "div",
				className : "container-paragraph"
			},
			Phrasing : {
				tagName : "div",
				className : "container-phrasing"
			},
			Floating : {
				tagName : "div",
				className : "container-floating"
			}
		}
	};

	/*
	Show : "show",
			Hidden : "hidden",
			Invisible : "invisible",
			
			*/

	ui5strap.ContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity(),
			tagData = this.typeToTag[oControl.getType()],
			html = oControl.getHtml();

		rm.write("<" + tagData.tagName);
		rm.writeControlData(oControl);
		
		rm.addClass(tagData.className);

		if(ui5strap.Severity.None !== severity){
			rm.addClass("bg-" + ui5strap.BSSeverity[severity]);
		}

		ui5strap.RenderUtils.visibility(rm, oControl);

		ui5strap.RenderUtils.alignment(rm, oControl);

		rm.writeClasses();
		rm.write(">");

		if('' !== html){
			rm.write(html);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</" + tagData.tagName + ">");
	};


}());