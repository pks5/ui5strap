/*
 * 
 * UI5Strap
 *
 * Nav
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Nav");
	jQuery.sap.require("de_pksoftware.ui5strap.library");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Nav", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
				
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
				type : {
					type:"de_pksoftware.ui5strap.NavType", 
					defaultValue:de_pksoftware.ui5strap.NavType.Default
				},
				stacked : {
					type:"boolean", 
					defaultValue:false
				},
				justified : {
					type:"boolean", 
					defaultValue:false
				},
				navbarAlign : {
					type:"de_pksoftware.ui5strap.NavBarAlignment",
					defaultValue:de_pksoftware.ui5strap.NavBarAlignment.None
				}
			},
					
			aggregations : { 
				items : {
					type : "de_pksoftware.ui5strap.controls.NavItem",
					singularName: "items"
				} 
			},

			events:{
		        click : {},
		        tap : {}
		    }

		}
	});

	var NavProto = de_pksoftware.ui5strap.controls.Nav.prototype;

	NavProto.setItemActive = function(itemIndex){

		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			items[i].setActive(i === itemIndex);
		}
		
	};

	NavProto.ontap = function(oEvent){
		//console.log('n', oEvent, oEvent.srcControl);
		this.fireTap();
	};

	NavProto.onclick = function(oEvent){
		this.fireClick();
	};

}());