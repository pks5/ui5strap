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

			library : "ui5strap",

			properties : {
				updateMasterText : {
					type : "boolean",
					defaultValue : false
				}
			}

		}
	});

	var ListDropdownMenuProto = ui5strap.ListDropdownMenu.prototype;

	ListDropdownMenuProto.setMasterSelected = function(listItem){ 
		ui5strap.ListBase.prototype.setMasterSelected.call(this, listItem);
		
		var parent = this.getParent(),
			grandParent = parent.getParent(),
			updateText = false;

		if(grandParent instanceof ui5strap.ButtonGroup){
			grandParent.setSelectedControl(parent, this);

			updateText = this.getUpdateMasterText();
		}
		else if(parent instanceof ui5strap.ButtonDropdown){
			parent.setSelected(true);

			updateText = this.getUpdateMasterText();
		}
		else if(grandParent instanceof ui5strap.ListBase){
			updateText = this.getUpdateMasterText();
		}
		
		if(updateText){
				var selectedText = listItem.getText();
				if(selectedText === ''){
					var listItemContent = listItem.getContent();
					if(listItemContent.length > 0){
						if('getText' in listItemContent[0]){
							selectedText = listItemContent[0].getText();
						}
					}
				}

				if(selectedText !== ''){
					parent.setText(selectedText);
				}
			}
	};

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