/*
 * 
 * UI5Strap
 *
 * Nav
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

	jQuery.sap.declare("ui5strap.Nav");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.Nav", {
		metadata : {

			defaultAggregation : "items",
				
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.NavType", 
					defaultValue:ui5strap.NavType.Default
				},
				stacked : {
					type:"boolean", 
					defaultValue:false
				},
				justified : {
					type:"boolean", 
					defaultValue:false
				},
				navbarAlign : {
					type:"ui5strap.NavBarAlignment",
					defaultValue:ui5strap.NavBarAlignment.None
				}
			},
					
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "items"
				} 
			}

		}
	});

	var NavProto = ui5strap.Nav.prototype;

}());