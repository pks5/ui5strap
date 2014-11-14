/*
 * 
 * UI5Strap
 *
 * Heading
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

	jQuery.sap.declare("ui5strap.Heading");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Heading", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type: "string", 
					defaultValue: ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				type : {
					type: "ui5strap.HeadingType", 
					defaultValue: ""
				},
				level : {
					type: "int", 
					defaultValue: 3
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

	ui5strap.Utils.dynamicText(ui5strap.Heading.prototype);

}());