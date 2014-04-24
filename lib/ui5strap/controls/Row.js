/*
 * 
 * UI5Strap
 *
 * Row
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Row");

	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Row", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",
			
			properties : { 
				
				cssClass : {
					type:"string", 
					defaultValue:"",
					deprecated : true
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});


}());