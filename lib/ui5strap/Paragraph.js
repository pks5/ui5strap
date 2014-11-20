/*
 * 
 * UI5Strap
 *
 * Paragraph
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

	jQuery.sap.declare("ui5strap.Paragraph");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Paragraph", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.End
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				formStatic : {
					type : "boolean",
					defaultValue:false
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	ui5strap.Utils.dynamicText(ui5strap.Paragraph.prototype);

}());