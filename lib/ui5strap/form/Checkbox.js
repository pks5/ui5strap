/*
 * 
 * UI5Strap
 *
 * form.Checkbox
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.Checkbox");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.form.Checkbox", {
		metadata : {

			library : "de_pksoftware.ui5strap",
			
			properties : { 
				value : {
					type:"string", 
					defaultValue:""
				},
				label : {
					type:"string", 
					defaultValue:""
				}
			}

		}
	});

}());