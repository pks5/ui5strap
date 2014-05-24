/*
 * 
 * UI5Strap
 *
 * ListDropdownItem
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

	jQuery.sap.declare("ui5strap.ListDropdownItem");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListLinkItem");
	
	ui5strap.ListLinkItem.extend("ui5strap.ListDropdownItem", {
		metadata : {
			library : "ui5strap",

			defaultAggregation : "menu",
			
			properties : {
				selectable : {
					type : "boolean",
					defaultValue : false
				}
			},

			aggregations : { 
				menu : {
					type : "ui5strap.ListDropdownMenu",
					multiple : false
				}
			}
		}
	});

	var ListDropdownItemProto = ui5strap.ListDropdownItem.prototype;

	ListDropdownItemProto.setText = function(newText){
		if(this.getMenu() === null){
			ui5strap.Utils.updateText(this, newText);
		}
		else{
			this.setProperty('text', newText);
		}
	};

	ListDropdownItemProto.open = function(){
		this.$().addClass('open');
	};
	
	ListDropdownItemProto.close = function(){
		this.$().removeClass('open');
	};

	ListDropdownItemProto.toggle = function(){
		this.$().toggleClass('open');
	};

	if(ui5strap.options.enableTapEvents){
		ListDropdownItemProto.ontap = function(oEvent){
			this.$().toggleClass('open');
		};
	};

	if(ui5strap.options.enableClickEvents){
		ListDropdownItemProto.onclick = function(oEvent){
			this.$().toggleClass('open');
		};
	};
	

}());