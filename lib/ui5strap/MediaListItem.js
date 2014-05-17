/*
 * 
 * UI5Strap
 *
 * MediaListItem
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

	jQuery.sap.declare("ui5strap.MediaListItem");
		jQuery.sap.require("ui5strap.ListItem");

	ui5strap.ListItem.extend("ui5strap.MediaListItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "media",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				heading : {
					type:"string", 
					defaultValue:""
				},
				text : {
					type:"string", 
					defaultValue:""
				}
			},
			aggregations : { 
				media : {
					multiple : false
				},
				content : {
					singularName: "content"
				} 
			}
		}
	});

}());