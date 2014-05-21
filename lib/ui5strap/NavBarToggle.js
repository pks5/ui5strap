/*
 * 
 * UI5Strap
 *
 * Toggle Button for ui5strap.NavBar controls
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

	jQuery.sap.declare("ui5strap.NavBarToggle");

	sap.ui.core.Control.extend("ui5strap.NavBarToggle", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				srText : {
					type : "string",
					defaultValue : "Toggle navigation"
				}
			}

		}
	});

}());