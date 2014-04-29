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

	jQuery.sap.require("ui5strap.NavContainerBase");

	var packageName = "com_mycompany.my_app",
 		moduleName = packageName + ".modules.NavContainer";

	jQuery.sap.declare(moduleName);
	
	ui5strap.NavContainerBase.extend(moduleName, {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "com_mycompany.my_app",
			
			properties : { },
			
			aggregations : { 
				
				navBar : {
					singularName: "navBar",
					multiple : false
				}, 
				content : {
					singularName: "content"
				}
			}

		}
	});

}());