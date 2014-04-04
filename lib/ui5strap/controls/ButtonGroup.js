/*
 * 
 * UI5Strap
 *
 * ButtonGroup
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ButtonGroup");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.ButtonGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "buttons",
				
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
				"size" : {
					"type": "string", 
					"defaultValue": ""
				}
			},
					
			aggregations : { 
				"buttons" : {
					singularName: "buttons"
				} 
			}
		}
	});

}());