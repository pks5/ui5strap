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

sap.ui.define(['./library', './ListBase', './ListItemBase'], function(library, ListBase, ListItemBase){

	var ListDropdownMenu = ListBase.extend("ui5strap.ListDropdownMenu", {
		metadata : {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : {
				
			},
	
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}

		}
	}),
	ListDropdownMenuProto = ListDropdownMenu.prototype;
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 * @Override
	 */
	ListDropdownMenuProto._handlePress = function(oEvent){
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("ui5strap.ISelectionProvider");
		oEvent.setMarked("ui5strap.IItemsProvider");
		oEvent.setMarked("ui5strap.ListDropdownMenu");
		
		//Find the closest item. Should be an item from the dropdown menu.
		var item = ui5strap.Utils.findClosestParentControl(oEvent.srcControl, ListItemBase);
		
		this.pressItem(oEvent.srcControl, item, false, this, item);
	};

	if(ui5strap.support.touch){
		ListDropdownMenuProto.ontap = ListDropdownMenuProto._handlePress;
	}
	else{
		ListDropdownMenuProto.onclick = ListDropdownMenuProto._handlePress;
	}
	
	return ListDropdownMenu;
});