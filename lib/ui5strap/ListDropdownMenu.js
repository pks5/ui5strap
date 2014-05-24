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

	var ListDropdownMenuProto = ui5strap.ListDropdownMenu.prototype;

	if(ui5strap.options.enableTapEvents){
		ListDropdownMenuProto.ontap = function(oEvent){
			ui5strap.ListBase.prototype.ontap.call(this, oEvent);

			var parent = this.getParent();
			if("close" in parent){
				parent.close();
			}
		};
	}

	if(ui5strap.options.enableClickEvents){
		ListDropdownMenuProto.onclick = function(oEvent){
			ui5strap.ListBase.prototype.onclick.call(this, oEvent);

			var parent = this.getParent();
			if("close" in parent){
				parent.close();
			}
		};
	}

}());