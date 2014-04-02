/*
 * 
 * UI5Strap
 *
 * Alert
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Alert");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Alert", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",
			
			properties : { 
				strongText : {
					type:"string", 
					defaultValue:""
				}, 
				text : {
					type:"string", 
					defaultValue:""
				}, 
				type : {
					type:"string", 
					defaultValue:"info"
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			}

		}
	});

}());