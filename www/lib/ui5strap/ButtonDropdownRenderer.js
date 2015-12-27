/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonDropdownRenderer
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

	var ButtonDropdownRenderer = {};

	ButtonDropdownRenderer.render = function(rm, oControl) {
		var menu = oControl.getMenu(),
			split = oControl.getSplit();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass(oControl._getStyleClass());
		rm.writeClasses();
		rm.write(">");

		this.startRender(rm, oControl, !split);

	    this.renderContent(rm, oControl);

	    rm.write("</button>");

	    if(split){
		    this.startRender(rm, oControl, true);

		    rm.write(' <span class="caret"></span>');

		    rm.write("</button>");
		}

	    if(null !== menu){
			rm.renderControl(menu);
		}
		
		rm.write("</div>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};
	
	ButtonDropdownRenderer.startRender = function(rm, oControl, tog) {
		var size = oControl.getSize(),
			action = oControl.getBsAction(),
			title = oControl.getTitle();

		rm.write("<button");
	    
	    rm.writeAttribute('id', oControl.getId() + '---' + ( tog ? 'toggle' : 'button') );

    	if(tog && action !== ui5strap.BsAction.ToggleDropdown){ 
	    	rm.addClass("dropdown-toggle");
	    }
	    
	    rm.addClass(Button.prototype._getStyleClassDesign.call(oControl));
	
	    rm.writeClasses();
	    
	    if('' !== title){
	    	rm.writeAttribute('title', title);
	    }
	    
		if(!oControl.getEnabled()){
			rm.writeAttribute("disabled", "disabled");
		}
		
		//Modal close button
		//@deprecated
		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
		
	    rm.write(">");
	};

	ButtonDropdownRenderer.renderContent = function(rm, oControl) {
		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		if(!oControl.getSplit()){
			rm.write(' <span class="caret"></span>');
		}
	};
	
	return ButtonDropdownRenderer;

}, true);