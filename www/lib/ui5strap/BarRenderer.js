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

sap.ui.define(['jquery.sap.global'], function(jQuery) {

	var BarRenderer = {
			typeToTag : {
				Default : {
					typeClassName : "ui5strapBar-type-default",
					containerClassName : ""
				},
				Fluid : {
					typeClassName : "ui5strapBar-type-fluid",
					containerClassName : "container-fluid"
				}
				
			}
	};

	BarRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
	 	
			contentLeft = oControl.getLeft(),
		 	contentMiddle = oControl.getMiddle(),
			contentRight = oControl.getRight();
		

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass(oControl._getStyleClass());
		rm.writeClasses();
		rm.write(">");

			rm.write("<div");
			rm.addClass(oControl._getStyleClassPart("inner"));
			rm.writeClasses();
			rm.write(">");
			  
			//Middle
			//@deprecated
			if(contentMiddle.length > 0){     
				rm.write("<div");
				rm.addClass("ui5strapBar-contentMiddle");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentMiddle.length; i++){ 
					rm.renderControl(contentMiddle[i]);
				}
				rm.write("</div>");
			}
			
			//Left
			//@deprecated
			if(contentLeft.length > 0){     
				rm.write("<div");
				rm.addClass("ui5strapBar-contentLeft");
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
			//@deprecated
			if(contentRight.length > 0){     
				rm.write("<div");
				rm.addClass("ui5strapBar-contentRight");
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
	
	return BarRenderer;
	
}, true);