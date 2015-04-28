/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownMenu
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
						//TODO define "textual" interface
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