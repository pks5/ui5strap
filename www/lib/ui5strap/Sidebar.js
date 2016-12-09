/*
 * 
 * UI5Strap
 *
 * ui5strap.Sidebar
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

sap.ui.define(['./library', "pks/ui5strap/core/ControlBase"], function(library, ControlBase){

	/**
	 * Constructor for a new Sidebar instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating sidebars.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Sidebar
	 * 
	 */
	var Sidebar = ControlBase.extend("ui5strap.Sidebar", {
		metadata : {
			deprecated : true,
			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				"inverse" : {
					type:"boolean", 
					defaultValue:false
				},
				"padding" : {
					type:"boolean", 
					defaultValue:true
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		},
		
		renderer : function(rm, oControl) {
			var content = oControl.getContent(),
				inverse = oControl.getInverse();

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('sidebar ' + (inverse ? 'sidebar-inverse' : 'sidebar-default'));
			if(oControl.getPadding()){
				rm.addClass('sidebar-with-padding');
			}
			rm.writeClasses();
			rm.write(">");
			

			rm.write("<div");
			rm.addClass('sidebar-content')
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			};

			rm.write("</div>");

			rm.write("</div>");
		}
	});
	
	return Sidebar;
});