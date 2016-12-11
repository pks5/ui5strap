/*
 * 
 * UI5Strap
 *
 * ui5strap.PickerWheelRenderer
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

sap.ui.define([], function(){
	
	"use strict";
	
	/**
	 * Picker wheel renderer.
	 * @namespace
	 */
	var PickerWheelRenderer = {};
	
	PickerWheelRenderer.render = function(rm, oControl) {
		 rm.write("<div");
		    rm.writeControlData(oControl);
		    
		    rm.addClass(oControl._getStyleClass());
		    
		    rm.writeClasses();
		    rm.write(">");
	
		    rm.write("<div");
		   	rm.addClass("ui5strapPickerWheel-inner ui5strap-hidden");
		    rm.writeClasses();
		    rm.write(">");
		    
		    rm.write("<div");
		   	rm.addClass("ui5strapPickerWheel-pointer");
		    rm.writeClasses();
		    rm.write(">");
		    rm.write("</div>");
	
		    rm.write("<div");
		   	rm.addClass("ui5strapPickerWheel-wheel");
		    rm.writeClasses();
		    rm.write(">");
		    
		    var panels = oControl.getPanels();
		    for(var i = 0; i < panels.length; i++){
		    	rm.write('<div id="' + oControl.getId() + '---panel-' + i + '"');
				
		    	rm.addClass("ui5strapPickerWheel-panel");
				rm.writeClasses();
				
				rm.writeAttribute('data-index', i);
				
				rm.write(">");
				
				rm.renderControl(panels[i]);
				rm.write("</div>");
		    }
		    
			rm.write("</div>");
		    rm.write("</div>");
		    rm.write("</div>");
	};
	
	return PickerWheelRenderer;

}, true);