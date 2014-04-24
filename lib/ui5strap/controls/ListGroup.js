/*
 * 
 * UI5Strap
 *
 * ListGroup
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ListGroup");

	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.ListGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
			
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",
			properties : { 
				useDiv : {
					type:"boolean", 
					defaultValue:false
				},
			},
			aggregations : { 
				items : {
					type : "de_pksoftware.ui5strap.controls.ListGroupItem",
					singularName: "item"
				} 
			}

		}
	});

}());