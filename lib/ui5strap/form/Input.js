/*
 * 
 * UI5Strap
 *
 * form.Input
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

	jQuery.sap.declare("de_pksoftware.ui5strap.form.Input");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.form.Input", {
		metadata : {

			library : "de_pksoftware.ui5strap",
			
			properties : { 
				value : {
					type:"string", 
					defaultValue:""
				},
				inputType : {
					type:"string", 
					defaultValue:"text"
				},
				placeholder : {
					type:"string", 
					defaultValue:""
				},
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				trailingSpace : {
					type:"boolean", 
					defaultValue:true
				}
			}

		}
	});

	//de_pksoftware.ui5strap.form.Input.prototype.getValue = function(){
	//	return this.$().val();
	//};

}());