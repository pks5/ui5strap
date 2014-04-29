/*
 * 
 * UI5Strap
 *
 * List
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

	jQuery.sap.declare("ui5strap.List");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.List", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.ListType", 
					defaultValue:ui5strap.ListType.Unordered
				}
			},
					
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "items"
				} 
			},

			events:{
		        click : {},
		        tap : {}
		    }

		}
	});


}());