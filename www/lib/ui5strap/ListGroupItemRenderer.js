/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroupItemRenderer
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

	var ListGroupItemRenderer = {};

	ListGroupItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge(),
			icon = oControl.getIcon(),
			parent = oControl.getParent(),
			tag = parent.getListMode() === ui5strap.ListGroupMode.Default ? 'li' : 'a',
			severity = oControl.getSeverity();

		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group-item');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(ui5strap.Severity.None !== severity){
			//Severity for general text
			rm.addClass("list-group-item-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");

		if('' !== icon){
			rm.write('<span class="list-group-item-icon fa fa-' + icon + '"></span>');
		}
		
		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl);
		    
		rm.write("</"+ tag + ">");
	};
	
	return ListGroupItemRenderer;

}, true);
