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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Paragraph");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Paragraph", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				//@deprecated use class instead
				cssClass : {
					type:"string", 
					defaultValue:"",
					deprecated : true
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

}());