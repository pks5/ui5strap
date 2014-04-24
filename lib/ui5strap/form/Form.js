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
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.form.Form", {
		metadata : {

			defaultAggregation : "content",
			
			library : "de_pksoftware.ui5strap",

			properties : { 
				type : {
					type:"string", 
					defaultValue:""
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
					type:"string", 
					defaultValue:""
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