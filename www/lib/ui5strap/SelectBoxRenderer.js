/*
 * 
 * UI5Strap
 *
 * ui5strap.SelectBoxRenderer
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

	var SelectBoxRenderer = {};

	SelectBoxRenderer.render = function(rm, oControl) {
		var size = oControl.getSize(),
			type = oControl.getType(),
			items = oControl.getItems();

		rm.write("<select");
		
		rm.writeControlData(oControl);
		
		if(oControl.getDisabled()){
			rm.writeAttribute('disabled', 'disabled');
		}
		if(ui5strap.Size.Default !== size){
			rm.addClass('input-' + ui5strap.BSSize[size]);
		}
		if(type === ui5strap.SelectBoxType.FormControl){
			rm.addClass('form-control');
		}
		rm.writeClasses();
		rm.write(">");

		for(var i = 0; i < items.length; i++){
			this.renderOption(rm, oControl, items[i]);
		}

		rm.write("</select>");
		
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	SelectBoxRenderer.renderOption = function(rm, oControl, item) {
		var itemValue = item.getValue();

			rm.write("<option");
			rm.writeAttribute("value", itemValue);
			if(oControl.getValue() === itemValue){
				rm.writeAttribute("selected", "selected");
			}
			rm.write(">");
			rm.writeEscaped(item.getText());
			rm.write("</option>");
	};

	return SelectBoxRenderer;
}, true);
