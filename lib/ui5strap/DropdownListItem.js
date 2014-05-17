/*
 * 
 * UI5Strap
 *
 * DropdownListItem
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

	jQuery.sap.declare("ui5strap.DropdownListItem");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListLinkItem");
	
	ui5strap.ListLinkItem.extend("ui5strap.DropdownListItem", {
		metadata : {
			library : "ui5strap",

			defaultAggregation : "dropdown",
			
			aggregations : { 
				dropdown : {
					type : "ui5strap.DropdownMenu",
					multiple : false
				} 
			}
		}
	});


}());