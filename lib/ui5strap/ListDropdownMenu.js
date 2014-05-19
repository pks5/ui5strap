/*
 * 
 * UI5Strap
 *
 * Dropdown Menu
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

	jQuery.sap.declare("ui5strap.ListDropdownMenu");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.ListDropdownMenu", {
		metadata : {

			library : "ui5strap"

		}
	});

	ui5strap.ListDropdownMenu.prototype.init = function(){
		var _this = this;
		this.attachEvent('select', {}, function(oEvent){
			var parent = oEvent.getSource().getParent(),
				grandParent = parent.getParent();

			if(grandParent instanceof ui5strap.ListBase || grandParent instanceof ui5strap.ButtonGroup){
				grandParent.setSelectedControl(parent, _this);
				
			}
		});
	};
}());