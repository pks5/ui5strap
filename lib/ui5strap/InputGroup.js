/*
 * 
 * UI5Strap
 *
 * InputGroup
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

	jQuery.sap.declare("ui5strap.InputGroup");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.Text");
	jQuery.sap.require("ui5strap.Button");
	jQuery.sap.require("ui5strap.TextInput");
	jQuery.sap.require("ui5strap.Checkbox");
	jQuery.sap.require("ui5strap.RadioButton");
	
	sap.ui.core.Control.extend("ui5strap.InputGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				}
			},
			aggregations : { 
				content : {
					
				} 
			}

		}
	});

}());