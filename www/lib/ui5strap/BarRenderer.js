/*
 * 
 * UI5Strap
 *
 * ui5strap.BarRenderer
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

	jQuery.sap.declare("ui5strap.BarRenderer");

	var BarRenderer = {
			typeToTag : {
				Fluid : {
					typeClassName : "u5sl-bar-type-fluid",
					containerClassName : "container-fluid"
				},
				Inset : {
					typeClassName : "u5sl-bar-type-inset",
					containerClassName : "container-inset"
				},
				Full : {
					typeClassName : "u5sl-bar-type-full",
					containerClassName : "container-full"
				},
				
				FluidInset : {
					typeClassName : "u5sl-bar-type-fluid-inset",
					containerClassName : "container-fluid container-inset"
				},
				FluidFull : {
					typeClassName : "u5sl-bar-type-fluid-full",
					containerClassName : "container-fluid container-full"
				},
				InsetFull : {
					typeClassName : "u5sl-bar-type-inset-full",
					containerClassName : "container-inset container-full"
				},
				FluidInsetFull : {
					typeClassName : "u5sl-bar-type-fluid-inset-full",
					containerClassName : "container-fluid container-inset container-full"
				}
			}
	};

	ui5strap.BarRenderer = BarRenderer;

	BarRenderer.render = function(rm, oControl) {
		var inverse = oControl.getInverse(),
			tagData = this.typeToTag[oControl.getType()],
		 	contentLeft = oControl.getLeft(),
		 	content = oControl.getContent(),
		 	contentMiddle = oControl.getMiddle(),
			contentRight = oControl.getRight();
		

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('u5sl-bar ' + (inverse ? 'u5sl-bar-flag-inverse' : 'u5sl-bar-flag-default'));
		rm.addClass(tagData.typeClassName);
		rm.addClass(oControl._getOptionsClassString());
		rm.writeClasses();
		rm.write(">");

			rm.write("<div");
			rm.addClass('u5sl-bar-inner ' + tagData.containerClassName);
			rm.writeClasses();
			rm.write(">");
			  
			//Middle
			if(contentMiddle.length > 0){     
				rm.write("<div");
				rm.addClass("u5sl-bar-content u5sl-bar-content-middle");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentMiddle.length; i++){ 
					rm.renderControl(contentMiddle[i]);
				}
				rm.write("</div>");
			}
			
			//Left
			if(contentLeft.length > 0){     
				rm.write("<div");
				rm.addClass("u5sl-bar-content u5sl-bar-content-left");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentLeft.length; i++){ 
					rm.renderControl(contentLeft[i]);
				}
				rm.write("</div>");
			}
	
			//Content
			if(content.length > 0){     
				for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
				}
			}
			   
			//Right
			if(contentRight.length > 0){     
				rm.write("<div");
				rm.addClass("u5sl-bar-content u5sl-bar-content-right");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentRight.length; i++){ 
					rm.renderControl(contentRight[i]);
				}
				rm.write("</div>");
			}   
			    
			rm.write("</div>");    
		rm.write("</div>");
	};
}());