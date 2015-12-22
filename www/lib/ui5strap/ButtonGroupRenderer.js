/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonGroupRenderer
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

sap.ui.define(['jquery.sap.global', './Button'], function(jQuery, Button) {

	var ButtonGroupRenderer = {
		typeToClass : {
			Default : "btn-group",
			Justified : "btn-group btn-group-justified",
			Vertical : "btn-group-vertical"
		}
	};
	
	ButtonGroupRenderer.render = function(rm, oControl) {
		var size = oControl.getSize(),
			type = oControl.getType(),
			buttons = oControl.getButtons();
	
		rm.write("<div");
		rm.writeControlData(oControl);
	
		rm.addClass(this.typeToClass[type]);
		
		if(ui5strap.Size.Default !== size){
			rm.addClass('btn-group-' + ui5strap.BSSize[size]);
		}
	
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < buttons.length; i++){
			var button = buttons[i];
			if(type === ui5strap.ButtonGroupType.Justified && button instanceof Button){
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
	
	return ButtonGroupRenderer;

}, true);
