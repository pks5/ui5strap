/*
 * 
 * UI5Strap
 *
 * ui5strap.TabContainerRenderer
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

	jQuery.sap.declare("ui5strap.TabContainerRenderer");

	ui5strap.TabContainerRenderer = {
	};

	ui5strap.TabContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getPanes(),
			selectedIndex = oControl.getSelectedIndex(),
			customAssociation = oControl.getCustomAssociation();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('tab-content')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			var item = content[i];
			var paneId = i;
			if('' !== customAssociation){
				paneId = item.data(customAssociation);
			}

			rm.write('<div id="' + oControl.getId() + '---' + paneId + '"');
			rm.writeAttribute('data-pane-index', i);
			rm.addClass('tab-pane');
			if(selectedIndex > -1 && i === selectedIndex){
				rm.addClass('active');
			}
			rm.writeClasses();
			rm.write(">");
			
			rm.renderControl(item);

			rm.write("</div>");
		};

		rm.write("</div>");
	};

}());