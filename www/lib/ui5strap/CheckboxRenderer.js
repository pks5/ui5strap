/*
 * 
 * UI5Strap
 *
 * ui5strap.CheckboxRenderer
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

	var CheckboxRenderer = {};

	CheckboxRenderer.render = function(rm, oControl) {
		var type = oControl.getType(),
			typeBlock = ui5strap.CheckboxType.Block;

		if(type === typeBlock){
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('checkbox');
			rm.writeClasses();
			rm.write(">");
		}
		

			rm.write("<label");
			if(type === ui5strap.CheckboxType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('checkbox-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.CheckboxType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', oControl.getId() + '---checkbox');
				}
				rm.writeAttribute('type', 'checkbox');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeClasses();
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.write('/>');
				
					rm.writeEscaped(oControl.getLabel());

			rm.write("</label>");

		if(type === typeBlock){
			rm.write("</div>");
		}
	};
	
	return CheckboxRenderer;

}, true);
