/*
 * 
 * UI5Strap
 *
 * ui5strap.ListBase
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

	jQuery.sap.declare("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.Control.extend("ui5strap.ListBase", {
		metadata : {
			interfaces : ["ui5strap.ISelectionProvider"],

			library : "ui5strap",
			
			properties : {
				"selectionMode" : {
					"type" : "ui5strap.SelectionMode",
					"defaultValue" : ui5strap.SelectionMode.None
				}
			},
			
			events:{

				select : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"},
						srcControl : {type : "ui5strap.Control"}
					}
				},
				tap : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"},
						srcControl : {type : "ui5strap.Control"}
					}
				}

			}
		}
	});

	var ListBaseProto = ui5strap.ListBase.prototype;
	
	/*
	 * START implementation of Selectable interface
	 */
	
	/**
	 * Set list item selected by index
	 */
	ListBaseProto.setSelectedIndex = function(itemIndex){
		var items = this._getItems();
		if(itemIndex < 0 || itemIndex >= items.length){
			return false;
		}
		
		return this.setSelectedControl(items[itemIndex]);
	};
 
	/**
	 * Get index of selected index
	 */
	ListBaseProto.getSelectedIndex = function(){
		var items = this._getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return i;
			}
		}
		return -1;
	};

	
	/**
	 * Set control selected by reference
	 */
	ListBaseProto.setSelectedControl = function(item){
		var items = this._getItems(),
			changed = false;
		for(var i = 0; i < items.length; i++){
			if(item && items[i] === item){
				if(!item.getSelected()){
					changed = true;
					items[i].setSelected(true);
					
				}
			}
			else{
				items[i].setSelected(false);
			}
		}
		
		return changed;
	};
	
	/**
	 * Get selected list item control
	 */
	ListBaseProto.getSelectedControl = function(){
		var items = this._getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return items[i];
			}
		}
		return null;
	};
	
	/**
	 * Select by custom data value
	 */
	ListBaseProto.setSelectedCustom = function(dataKey, value){
		items = this._getItems(),
			selectedItem = null;
		
		for(var i = 0; i < items.length; i++){
			if(items[i].data(dataKey) === value){
				selectedItem = items[i];
				break;
			}
		}
		
		this.setSelectedControl(selectedItem);
	};
	
	
	/*
	 * END implementation of Selectable interface
	 */
	
	ListBaseProto._getItems = function(){
		return this.getItems();
	};
	
	ListBaseProto._findClosestListItem = function(srcControl){
		return ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.ListItem);
	};
	
	ListBaseProto.getListItemIndex = function(item){
		return this.indexOfAggregation("items", item);
	};
	
	ListBaseProto._getEventOptions = function(srcControl){
		var listItem = this._findClosestListItem(srcControl);
		
		return {
			srcControl : srcControl,
			listItem : listItem,
			listItemIndex : this.getListItemIndex(listItem)
		};
	};
	
	/**
	 * @Private
	 */
	var _processSelection = function(_this, oEvent){
		var eventOptions = _this._getEventOptions(oEvent.srcControl),
			selectionMode = _this.getSelectionMode(),
			listItem = eventOptions.listItem;

		if(listItem && listItem.getSelectable()){
			if(selectionMode === ui5strap.SelectionMode.Single){
				if(_this.setSelectedControl(listItem)){
					_this.fireSelect(eventOptions);
				}
			}
			
		}
		else{
			jQuery.sap.log.warning("Could not select list item: List Item not found.");
		}

		return eventOptions;
	};
	
	/*
	 * HANDLE UI EVENTS
	 */
	
	//Touchscreen
	if(ui5strap.options.enableTapEvents){
		ListBaseProto.ontap = function(oEvent){
			oEvent.stopPropagation();
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	//Mouse
	if(ui5strap.options.enableClickEvents){
		ListBaseProto.onclick = function(oEvent){
			oEvent.stopPropagation();
			this.fireTap(_processSelection(this, oEvent));
		};
	}

}());