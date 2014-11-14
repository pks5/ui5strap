/*
 * 
 * UI5Strap
 *
 * ListLinkItem
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

	jQuery.sap.declare("ui5strap.ListLinkItem");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.Link");

	ui5strap.ListItem.extend("ui5strap.ListLinkItem", {
		metadata : {
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				bsAction : {
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				title : {
					type:"string", 
					defaultValue:""
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			}
		}
	});

	ui5strap.ListLinkItem.prototype.setText = function(newText){
		ui5strap.Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
	};

}());