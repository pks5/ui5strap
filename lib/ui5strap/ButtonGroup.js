/*
 * 
 * UI5Strap
 *
 * ButtonGroup
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

	jQuery.sap.declare("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.ButtonGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "buttons",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				navbarAlign : {
					type:"ui5strap.NavBarAlignment",
					defaultValue:ui5strap.NavBarAlignment.None
				}
			},
					
			aggregations : { 
				buttons : {
					singularName: "buttons"
				} 
			},

			events:{
		        click : {},
		        tap : {}
		    }
		}
	});

	var ButtonGroupProto = ui5strap.ButtonGroup.prototype;

	ButtonGroupProto.setSelectedIndex = function(itemIndex){

		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			items[i].setActive(i === itemIndex);
		}
		
	};

	ButtonGroupProto.setSelectedButton = function(button){

		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			items[i].setActive(items[i] === button);
		}
		
	};

	ButtonGroupProto.ontap = function(oEvent){
		this.fireTap({ button : oEvent.srcControl });
	};

	ButtonGroupProto.onclick = function(oEvent){
		this.fireClick({ button : oEvent.srcControl });
	};

}());