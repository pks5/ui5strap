/*
 * 
 * UI5Strap
 *
 * Dropdown Button
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.DropdownButton");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.Button");
	jQuery.sap.require("ui5strap.includes.dropdown");
	
	ui5strap.Button.extend("ui5strap.DropdownButton", {
		metadata : {

			// ---- object ----
			defaultAggregation : "dropdown",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				dropup : {
					type:"boolean", 
					defaultValue:false
				}
			},
					
			aggregations : { 
				dropdown : {
					type : "ui5strap.DropdownMenu",
					multiple : false
				} 
			}

		}
	});

	ui5strap.DropdownButton.prototype.onAfterRendering = function(){
		//jQuery(this.getId() + '---button').dropdown();
	};	

}());