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
				selectionChange : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"}
					}
				},
				selectionChanged : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"}
					}
				},

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
	
	/**
	 * Returns an array of selected items and indices
	 * @Private
	 */
	var _getSelection = function(_this){
		var items = _this._getItems(),
			selection = {
				x : [],
				items : []
			};
		
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				selection.items.push(items[i]);
				selection.x.push(i);
			}
		}
		
		return selection;
	};
	
	/*
	 * --------------------
	 * START implementation of ISelectionProvider interface
	 * --------------------
	 */
	
	
	
	/**
	 * Selects one or multiple items
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelection = function(itemsSelected, dimension){
		
		var items = this._getItems(),
			changes = {
				"selected" : [],
				"deselected" : [],
				"changed" : [],
				"unchanged" : [],
				"all" : []
			};
		
		if(!dimension){
			for(var i = 0; i < items.length; i++){
				var item = items[i],
					change = {
						item : item,
						x : i
					};
				changes.all.push(change);
				if(itemsSelected && item === itemsSelected){
					if(!item.getSelected()){
						change.selected = true;
						changes.selected.push(change);
						changes.changed.push(change);
						
						item.setSelected(true);
					}
					else{
						changes.unchanged.push(change);
					}
				}
				else{
					if(item.getSelected()){
						change.selected = false;
						changes.deselected.push(change);
						changes.changed.push(change);
					}
					else{
						changes.unchanged.push(change);
					}
					
					item.setSelected(false);
				}
			}
		}
		else if(1 === dimension){
			for(var i = 0; i < items.length; i++){
				var item = items[i],
					change = {
						item : item,
						x : i
					};
				if(-1 !== jQuery.inArray(item, itemsSelected)){
					if(!item.getSelected()){
						change.selected = true;
						changes.selected.push(change);
						changes.changed.push(change);
						
						item.setSelected(true);
					}
					else{
						changes.unchanged.push(change);
					}
				}
				else{
					if(item.getSelected()){
						change.selected = false;
						changes.deselected.push(change);
						changes.changed.push(change);
					}
					else{
						changes.unchanged.push(change);
					}
					
					item.setSelected(false);
				}
			}
		}
		else{
			throw new Error("Lists do not support more than 1 dimension!");
		}
		
		if(changes.changed.length){
			this.fireSelectionChange({ selectionChanges: changes });
		
			this.fireSelectionChanged({ selectionChanges: changes });
		}
		
		return changes;
	};
	
	/**
	 * Adds one or multiple items to selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelection = function(itemsSelected, dimension){
	};
	
	/**
	 * Removes one or multiple items from selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelection = function(itemsSelected, dimension){
	};
	
	/**
	 * Gets one or multiple selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelection = function(dimension){
		var selection = _getSelection(this);
		if(!dimension){
			return selection.items.length ? selection.items[0] : null;
		}
		else if(1 === dimension){
			return selection.items;
		}
		else{
			throw new Error("Lists do not support more than 1 dimension!");
		}
	};
	
	/**
	 * Selects one or multiple items by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionIndices = function(indices, dimension){
		var changes = null;
		if(!dimension){
			var items = this._getItems();
			if(indices >= 0 && indices < items.length){
				throw new Error("Array out of bounds!");
			}
			
			changes = this.setSelection(items[indices], dimension);
		}
		else if(1 === dimension){
			var items = this._getItems(),
				toSelect = [];
			for(var i=0; i<indices; i++){
				var index = indices[i];
				if(indices < 0 || indices >= items.length){
					throw new Error("Array out of bounds!");
				}
				toSelect.push(items[index]);
			}
			
			changes = this.setSelection(toSelect, dimension);
		}
		else{
			throw new Error("Lists do not support more than 1 dimension!");
		}
		
		return changes;
	};
	
	/**
	 * Adds one or multiple items to selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelectionIndices = function(indices, dimension){
	};
	
	/**
	 * Removes one or multiple items from selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelectionIndices = function(indices, dimension){
	};
	
	/**
	 * Gets one or multiple indices of selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelectionIndices = function(dimension){
		var selection = _getSelection(this);
		if(!dimension){
			return selection.x.length ? selection.x[0] : undefined;
		}
		else if(1 === dimension){
			return selection.indices;
		}
		else{
			throw new Error("Lists do not support more than 1 dimension!");
		}
	};
	
	/**
	 * Selects one or multiple items that have the given value in the specified property.
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionByProperty = function(propertyName, values, dimension){
		throw new Error("Please implement ui5strap.ListBase.prototype.setSelectionByProperty");
	};
	
	
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionByCustomData = function(dataKey, values, dimension){
		throw new Error("Please implement ui5strap.ListBase.prototype.setSelectionByCustomData");
	};
	
	/**
	 * Gets one or multiple selected items that have the given value in the specified property.
	 * @Public
	 * @Override
	 */
	ListBaseProto.getItemsByProperty = function(propertyName){
		throw new Error("Please implement ui5strap.ListBase.prototype.getItemsByProperty");
	};
	
	/**
	 * Gets one or multiple selected items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.getItemsByCustomData = function(dataKey){
		throw new Error("Please implement ui5strap.ListBase.prototype.getItemsByCustomData");
	};
	
	/*
	 * ------------------
	 * END implementation of ISelectionProvider interface
	 * ------------------
	 */
	
	
	
	/**
	 * Set list item selected by index
	 * @deprecated
	 */
	ListBaseProto.setSelectedIndex = function(itemIndex){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedIndex is deprecated! Use .setSelectionIndices instead.");
		
		return this.setSelectionIndices(itemIndex, 0);
	};
 
	/**
	 * Get index of selected index
	 * @deprecated
	 */
	ListBaseProto.getSelectedIndex = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedIndex is deprecated! Use .getSelectionIndices instead.");
		
		return this.getSelectionIndices(0);
	};

	
	/**
	 * Set control selected by reference
	 * @deprecated
	 */
	ListBaseProto.setSelectedControl = function(item){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedControl is deprecated! Use .setSelection instead.");
	
		return this.setSelection(item, 0);
	};
	
	/**
	 * Get selected list item control
	 * @deprecated
	 */
	ListBaseProto.getSelectedControl = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedControl is deprecated! Use .getSelection instead.");
		
		return this.getSelection(0);
	};
	
	/**
	 * Select by custom data value
	 * @deprecated
	 */
	ListBaseProto.setSelectedCustom = function(dataKey, value){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedCustom is deprecated! Use .setSelectionByCustomData instead.");
		
		items = this._getItems(),
			selectedItem = null;
		
		for(var i = 0; i < items.length; i++){
			if(items[i].data(dataKey) === value){
				selectedItem = items[i];
				break;
			}
		}
		
		this.setSelection(selectedItem);
	};
	
	
	
	/**
	 * @Public
	 */
	ListBaseProto._getItems = function(){
		return this.getItems();
	};
	
	/**
	 * @Protected
	 */
	ListBaseProto._findClosestListItem = function(srcControl){
		return ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.ListItem);
	};
	
	/**
	 * @Public
	 */
	ListBaseProto.getListItemIndex = function(item){
		return this.indexOfAggregation("items", item);
	};
	
	/**
	 * @Protected
	 */
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

		if(listItem && listItem.getEnabled() && listItem.getSelectable()){
			if(selectionMode === ui5strap.SelectionMode.Single){
				var changes = _this.setSelection(listItem, 0);
				
				if(changes.changed.length){
					eventOptions.selectionChanges = changes;
					_this.fireSelect(eventOptions);
				}
				else{
					jQuery.sap.log.debug("Event 'select' not fired: no changes in selection.");
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
		/**
		 * @Public
		 * @Override
		 */
		ListBaseProto.ontap = function(oEvent){
			oEvent.stopPropagation();
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	//Mouse
	if(ui5strap.options.enableClickEvents){
		/**
		 * @Public
		 * @Override
		 */
		ListBaseProto.onclick = function(oEvent){
			oEvent.stopPropagation();
			this.fireTap(_processSelection(this, oEvent));
		};
	}

}());