/*
 * 
 * UI5Strap
 *
 * Breadcrumb
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

	jQuery.sap.declare("ui5strap.Breadcrumb");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListItem");
	
	sap.ui.core.Control.extend("ui5strap.Breadcrumb", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
					
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "items"
				} 
			},

			events:{
		        click : {},
		        tap : {}
		    }

		}
	});

	var NavProto = ui5strap.Breadcrumb.prototype;

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