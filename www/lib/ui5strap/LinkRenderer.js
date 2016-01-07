/*
 * 
 * UI5Strap
 *
 * ui5strap.LinkRenderer
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

	var LinkRenderer = {};

	LinkRenderer.render = function(rm, oControl) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			action = oControl.getBsAction(),
			target = oControl.getTarget();
	
		rm.write("<a");
		rm.writeControlData(oControl);
		rm.addClass(oControl._getStyleClass());
		rm.writeClasses();
		    
		//Attributes
		
		if('' !== href){
			rm.writeAttribute('href', href);
		}
	
		if('' !== target){
			rm.writeAttribute('target', target);
		}
	
		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }
	
		//@deprecated
		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
		
		rm.write(">");
		
		//Content
		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write("</a>");

		//Trail
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};
	
	return LinkRenderer;
	
}, true);