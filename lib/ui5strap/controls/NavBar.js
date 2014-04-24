/*
 * 
 * UI5Strap
 *
 * NavBar
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.NavBar");
	jQuery.sap.require("de_pksoftware.ui5strap.includes.collapse");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.NavBar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "collapse",
			
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
				brand : {
					type:"string", 
					defaultValue:null
				},
				type : {
					type:"string", 
					defaultValue:"default"
				},
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				align : {
					type:"string", 
					defaultValue: ""
				}
			},

			aggregations : { 
				collapse : {singularName: "collapse"}
			},

			events : {
				brandClick : {},
				brandTap : {}
			}

		}
	});

	var NavBarProto = de_pksoftware.ui5strap.controls.NavBar.prototype;

	NavBarProto.onclick = function(oEvent){
		
		if(jQuery(oEvent.target).hasClass('navbar-brand')){
			this.fireBrandClick({ brand : oEvent.target });
		}
	};

	NavBarProto.ontap = function(oEvent){
		
		if(jQuery(oEvent.target).hasClass('navbar-brand')){
			this.fireBrandTap({ brand : oEvent.target });
		}
	};

}());