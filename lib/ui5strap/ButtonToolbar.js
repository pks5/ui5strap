/*
 * 
 * UI5Strap
 *
 * Button Toolbar
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

	jQuery.sap.declare("ui5strap.ButtonToolbar");
	
	sap.ui.core.Control.extend("ui5strap.ButtonToolbar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "buttonGroups",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
					
			aggregations : { 
				"buttonGroups" : {
					type : "ui5strap.ButtonGroup",
					singularName: "buttonGroups"
				} 
			}
		}
	});

}());