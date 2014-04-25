/*
 * 
 * UI5Strap
 *
 * Progress bar
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ProgressBar");
	jQuery.sap.require("de_pksoftware.ui5strap.library");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.ProgressBar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
				value : {
					type:"int", 
					defaultValue:0
				}, 
				minValue : {
					type:"int", 
					defaultValue:0
				},
				maxValue : {
					type:"int", 
					defaultValue:100
				},  
				severity : {
					type:"de_pksoftware.ui5strap.Severity", 
					defaultValue:de_pksoftware.ui5strap.Severity.None
				},
				labelFormat : {
					type:"string", 
					defaultValue:""
				}
			}
		}
	});

}());