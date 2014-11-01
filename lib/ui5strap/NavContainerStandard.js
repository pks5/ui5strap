/*
 * 
 * UI5Strap
 *
 * Standard Nav Container with navbar and content
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

	jQuery.sap.require("ui5strap.NavContainer");
	jQuery.sap.declare("ui5strap.NavContainerStandard");
	
	ui5strap.NavContainer.extend("ui5strap.NavContainerStandard", {
		metadata : {

			
			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				name : {
					type : "string",
					defaultValue : 'standard'
				},
				options : {
					type : "string",
					defaultValue : ''
				}
			}

		},

		renderer : "ui5strap.NavContainerRenderer"
	});

	ui5strap.NavContainerStandard.prototype._initNavContainer = function(){
		this.targets = {
			"content" : null,
			"sidebar" : null,
			"navbar" : null
		};
	};

}());