/*
 * 
 * UI5Strap
 *
 * ListMedia
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

	jQuery.sap.declare("ui5strap.ListMedia");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListMediaItem");

	ui5strap.ListBase.extend("ui5strap.ListMedia", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				useContainer : {
					type:"boolean", 
					defaultValue:false
				}
			},
			aggregations : { 
				items : {
					type : "ui5strap.ListMediaItem",
					singularName: "item"
				} 
			}

		}
	});

}());