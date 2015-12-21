/*
 * 
 * UI5Strap
 *
 * ui5strap.RadioButtonRenderer
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

	var RadioButtonRenderer = {};

	RadioButtonRenderer.render = function(rm, oControl) {
		var groupName = oControl.getGroupName(),
			type = oControl.getType(),
			typeBlock = ui5strap.RadioButtonType.Block;

		if(type === typeBlock){ 
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('radio');
			rm.writeClasses();
			rm.write(">");
		}
			
			rm.write("<label");
			if(type === ui5strap.RadioButtonType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('radio-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.RadioButtonType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', 'ui5strap-radio---' + oControl.getId());
				}
				rm.writeAttribute('type', 'radio');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeAttribute('name', groupName);
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.addClass('ui5strap-radio-' + groupName);
				rm.writeClasses();
				rm.write('/>');
					
					rm.writeEscaped(oControl.getLabel());
		
			rm.write("</label>");

		if(type === typeBlock){ 
			rm.write("</div>");
		}
	};
	
	return RadioButtonRenderer;

}, true);
