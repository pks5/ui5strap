/*
 * 
 * UI5Strap
 *
 * Button Dropdown
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

	jQuery.sap.declare("ui5strap.ButtonDropdown");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.Button");
	
	ui5strap.Button.extend("ui5strap.ButtonDropdown", {
		metadata : {

			// ---- object ----
			defaultAggregation : "menu",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				dropup : {
					type:"boolean", 
					defaultValue:false
				},
				split : {
					type:"boolean", 
					defaultValue:false
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

	var ButtonDropdownProto = ui5strap.ButtonDropdown.prototype;

	ButtonDropdownProto.setText = function(newText){
		if(this.getMenu() === null){
			ui5strap.Utils.updateText(this, newText);
		}
		else{
			this.setProperty('text', newText);
		}
	};

/*
	ButtonDropdownProto.onAfterRendering = function(){
		this.$().dropdown();
	};	
*/
	
	ButtonDropdownProto.open = function(){
		this.$().addClass('open');
	};
	
	ButtonDropdownProto.close = function(){
		this.$().removeClass('open');
	};

	ButtonDropdownProto.toggle = function(){
		this.$().toggleClass('open');
	};
	
	if(ui5strap.options.enableTapEvents){
		ButtonDropdownProto.ontap = function(oEvent){
			if(!jQuery(oEvent.target).hasClass('dropdown-toggle')){
				this.fireTap();
			}
			else{
				this.$().toggleClass('open');
			}
		};
	}

	if(ui5strap.options.enableClickEvents){
		ButtonDropdownProto.onclick = function(oEvent){
			if(!jQuery(oEvent.target).hasClass('dropdown-toggle')){
				this.fireClick();
			}
			else{
				this.$().toggleClass('open');
			}
		};
	}

}());