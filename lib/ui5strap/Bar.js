/*
 * 
 * UI5Strap
 *
 * Bar
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

	jQuery.sap.declare("ui5strap.Bar");

	sap.ui.core.Control.extend("ui5strap.Bar", {
		metadata : {

			// ---- object ----
			"defaultAggregation" : "middle",

			// ---- control specific ----
			"library" : "ui5strap",
			
			"properties" : { 
				"inverse" : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			"aggregations" : { 
				"left" : {
					"singularName" : "left"
				},
				"middle" : {
					"singularName" : "middle"
				}, 
				"right" : {
					"singularName" : "right"
				}  
			}

		}
	});

}());