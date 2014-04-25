/*
 * 
 * UI5Strap
 *
 * form.Form
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.Form");
	jQuery.sap.require("de_pksoftware.ui5strap.library");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.form.Form", {
		metadata : {

			defaultAggregation : "content",
			
			library : "de_pksoftware.ui5strap",

			properties : { 
				type : {
					type:"de_pksoftware.ui5strap.FormType", 
					defaultValue:de_pksoftware.ui5strap.FormType.Default
				},
				action : {
					type:"string", 
					defaultValue:""
				},
				method : {
					type:"string", 
					defaultValue:""
				},
				navbarAlign : {
					type:"de_pksoftware.ui5strap.NavBarAlignment",
					defaultValue:de_pksoftware.ui5strap.NavBarAlignment.None
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