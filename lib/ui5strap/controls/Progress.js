/*
 * 
 * UI5Strap
 *
 * Progress
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Progress");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Progress", {
		metadata : {

			// ---- object ----
			defaultAggregation : "bars",
				
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
				active : {
					type:"boolean", 
					defaultValue:false
				},
				striped : {
					type:"boolean", 
					defaultValue:false
				}
			},
					
			aggregations : { 
				bars : {
					type : "de_pksoftware.ui5strap.controls.ProgressBar",
					singularName: "bar"
				} 
			}
		}
	});

}());