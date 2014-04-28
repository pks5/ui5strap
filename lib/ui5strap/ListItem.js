/*
 * 
 * UI5Strap
 *
 * ListItem
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

	jQuery.sap.declare("ui5strap.ListItem");

	sap.ui.core.Control.extend("ui5strap.ListItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				active : {
					type:"boolean", 
					defaultValue:false
				}, 
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				text : {
					type:"string",
					defaultValue:""
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