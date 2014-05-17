/*
 * 
 * UI5Strap
 *
 * Col
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

	jQuery.sap.declare("ui5strap.Col");
	jQuery.sap.require("ui5strap.RowContent");

	ui5strap.RowContent.extend("ui5strap.Col", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				columnsExtraSmall : {
					type:"int", defaultValue:-1
				},
				columnsSmall : {
					type:"int", defaultValue:-1
				},
				columnsMedium : {
					type:"int", defaultValue:-1
				},
				columnsLarge : {
					type:"int", defaultValue:-1
				},
				offsetExtraSmall : {
					type:"int", defaultValue:-1
				},
				offsetSmall : {
					type:"int", defaultValue:-1
				},
				offsetMedium : {
					type:"int", defaultValue:-1
				},
				offsetLarge : {
					type:"int", defaultValue:-1
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