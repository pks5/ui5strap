/*
 * 
 * UI5Strap
 *
 * Pager
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

	jQuery.sap.declare("ui5strap.Pager");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Pager", {
		metadata : {

			// ---- control specific ----
			library : "ui5strap",
			
			properties : {
				aligned : {
					type : "boolean",
					defaultValue : false
				},
				disabledPrevious : {
					type : "boolean",
					defaultValue : false
				},
				disabledNext : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				previous : {
					multiple:false
				}, 
				next : {
					multiple:false
				}
				
			}

		}
	});

}());