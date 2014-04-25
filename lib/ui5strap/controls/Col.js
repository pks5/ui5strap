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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Col");

	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Col", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",
			properties : { 
				columnsExtraSmall : {
					type:"int", defaultValue:0
				},
				columnsSmall : {
					type:"int", defaultValue:0
				},
				columnsMedium : {
					type:"int", defaultValue:0
				},
				columnsLarge : {
					type:"int", defaultValue:0
				},
				offsetExtraSmall : {
					type:"int", defaultValue:0
				},
				offsetSmall : {
					type:"int", defaultValue:0
				},
				offsetMedium : {
					type:"int", defaultValue:0
				},
				offsetLarge : {
					type:"int", defaultValue:0
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