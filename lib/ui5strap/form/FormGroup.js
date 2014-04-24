/*
 * 
 * UI5Strap
 *
 * form.FormGroup
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.FormGroup");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.form.FormGroup", {
		metadata : {

			defaultAggregation : "formControls",
			
			library : "de_pksoftware.ui5strap",

			properties : { 
				type : {
					type:"string", 
					defaultValue:""
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				feedback : {
					type:"boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				formControls : {
					multiple : true,
					singularName : "formControl"
				},
				labelColumn : {
					type : "de_pksoftware.ui5strap.controls.Col",
					multiple : false
				}
			}

		}
	});

}());