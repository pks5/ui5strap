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

	jQuery.sap.declare("ui5strap.Form");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Form", {
		metadata : {

			defaultAggregation : "content",
			
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.FormType", 
					defaultValue:ui5strap.FormType.Default
				},
				action : {
					type:"string", 
					defaultValue:""
				},
				method : {
					type:"ui5strap.FormMethod", 
					defaultValue:ui5strap.FormMethod.None
				},
				navbarAlign : {
					type:"ui5strap.NavBarAlignment",
					defaultValue:ui5strap.NavBarAlignment.None
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			events : {
				submit : {

				}
			}

		}
	});

	ui5strap.Form.prototype.onAfterRendering = function(){
		var _this = this;
		this.$().on('submit', function(){
			_this.fireSubmit({});
			if(_this.getMethod() === ui5strap.FormMethod.None){
				return false;
			}
		});
	};

}());