/*
 * 
 * UI5Strap
 *
 * ui5strap.ListNavItemRenderer
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

	jQuery.sap.declare("ui5strap.ListNavItemRenderer");
	jQuery.sap.require("ui5strap.LinkRenderer");

	ui5strap.ListNavItemRenderer = {
	};

	ui5strap.ListNavItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge(),
			LinkRenderer = ui5strap.LinkRenderer;

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		LinkRenderer.startRender(rm, oControl, { listLink : true });
		
		LinkRenderer.renderContent(rm, oControl);

		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}

		LinkRenderer.endRender(rm, oControl);
		    
		rm.write("</li>");
	};

}());
