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
	
	ui5strap.ControlBase.extend("ui5strap.ListBase", {
		metadata : {
			interfaces : ["ui5strap.ISelectionProvider"],

			library : "ui5strap",
			
			properties : {
				selectionMode : {
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
					deprecated : true,
					parameters : {
						listItem : {type : "ui5strap.ListItem"},
						srcControl : {type : "ui5strap.Control"}
					}
				},
				
				//TODO Rename 'tap' event to 'press' sometimes
				tap : {
					parameters : {
						listItem : {type : "ui5strap.ListItem"},
						srcControl : {type : "ui5strap.Control"}
					}
				}

			}
		}
	});

	var ListBaseProto = ui5strap.ListBase.prototype,
		_defaultSelectionGroup = "selectionGroup";
	
	/**
	 * @Private
	 */
	var _changeSelection = function(_this, itemsToSelect, mode, selectionGroup){
		var items = _this._getItems(),
			changes = {
				"selected" : [],
				"deselected" : [],
				"changed" : [],
				"unchanged" : [],
			};
		
		if(!jQuery.isArray(itemsToSelect)){
			itemsToSelect = [itemsToSelect];
		}
		
		if(!selectionGroup){
			selectionGroup = _defaultSelectionGroup;
		}
		
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			if(-1 !== jQuery.inArray(item, itemsToSelect)){
				//Item is subject to select / deselect
				if("replace" === mode || "add" === mode){
					if(!_this._isItemSelected(item, selectionGroup)){
						changes.selected.push(item);
						changes.changed.push(item);
						
						_this._setItemSelected(item, true, selectionGroup);
					}
					else{
						changes.unchanged.push(item);
					}
				}
				else if("remove" === mode){
					if(_this._isItemSelected(item, selectionGroup)){
						changes.deselected.push(item);
						changes.changed.push(item);
						
						_this._setItemSelected(item, false, selectionGroup);
					}
					else{
						changes.unchanged.push(item);
					}
				}
				else if("toggle" === mode){
					var selected = _this._isItemSelected(item, selectionGroup);
						
						if(!selected){
							changes.selected.push(item);
						}
						else{
							changes.deselected.push(item);
						}
						
						changes.changed.push(item);
						
						_this._setItemSelected(item, !selected, selectionGroup);
				}
			}
			else{
				//Item is no subject to select / deselect
				if("replace" === mode){
					if(_this._isItemSelected(item, selectionGroup)){
						changes.deselected.push(item);
						changes.changed.push(item);
						
						_this._setItemSelected(item, false, selectionGroup);
					}
					else{
						changes.unchanged.push(item);
					}
				}
				else if("add" === mode || "remove" === mode || "toggle" === mode){
					changes.unchanged.push(item);
				}
			}
		}
		
		if(changes.changed.length){
			_this.fireSelectionChange({ selectionChanges: changes });
		
			_this.fireSelectionChanged({ selectionChanges: changes });
		}
		
		return changes;
	};
	
	/**
	 * @Private
	 */
	var _changeSelectionIndices = function(_this, indices, mode, selectionGroup){
		var items = this._getItems();
		
		if(!jQuery.isArray(indices)){
			//Single value
			if(indices < 0 || indices >= items.length){
				throw new Error("Array out of bounds!");
			}
			
			return _changeSelection(_this, items[indices], mode, selectionGroup);
		}
		else{
			//1 dimensional array
			var itemsToSelect = [];
			for(var i=0; i<indices.length; i++){
				var index = indices[i];
				if(index < 0 || index >= items.length){
					throw new Error("Array out of bounds!");
				}
				itemsToSelect.push(items[index]);
			}
			
			return _changeSelection(_this, itemsToSelect, mode, selectionGroup);
		}
	};
	
	/**
	 * @Private
	 */
	var _changeSelectionByCustomData = function(_this, dataKey, values, mode, selectionGroup){
		var items = _this._getItems();
		
		if(!jQuery.isArray(values)){
			for(var i = 0; i < items.length; i++){
				if(items[i].data(dataKey) === values){
					selectedItem = items[i];
					
					return _changeSelection(_this, selectedItem, mode, selectionGroup);
				}
			}
		}
		else{
			var itemsToSelect = [];
			for(var i = 0; i < items.length; i++){
				if(-1 !== jQuery.inArray(items[i].data(dataKey), values)){
					itemsToSelect.push(items[i]);
				}
			}
			return _changeSelection(_this, itemsToSelect, mode, selectionGroup);
		}
	};
	
	/*
	 * --------------------
	 * START implementation of ISelectionProvider interface
	 * --------------------
	 */
	
	/**
	 * Gets one or multiple selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelection = function(dimension, selectionGroup){
		var selection = this._getListSelection(selectionGroup);
		if(typeof dimension === "undefined"){
			return selection.items;
		}
		else if(0 === dimension){
			//Single value
			return selection.items.length ? selection.items[0] : null;
		}
		else if(1 === dimension){
			//1 dimensional array
			return selection.items;
		}
		else if(2 === dimension){
			//2 dimensional array
			return [selection.items];
		}
		else if(3 === dimension){
			//3 dimensional array
			return [[selection.items]];
		}
		else{
			throw new Error("Only 3 dimensions are supported by this Control.");
		}
	};
	
	/**
	 * Returns whether one or multiple items are currently part of selection.
	 * @Public
	 */
	ListBaseProto.isInSelection = function(itemsToCheck, selectionGroup){
		var inSelection = true;
		
		if(!jQuery.isArray(itemsToCheck)){
			itemsToCheck = [itemsToCheck];
		}
		
		for(var i = 0; i < itemsToCheck.length; i++){
			if(!this._isItemSelected(itemsToCheck[i], selectionGroup)){
				inSelection = false;
				break;
			}
		}
		
		return inSelection;
	};
	
	/**
	 * Tries to select one or multiple items and returns all changes.
	 * 
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "replace", selectionGroup);
	};
	
	/**
	 * Adds one or multiple items to selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "add", selectionGroup);
	};
	
	/**
	 * Removes one or multiple items from selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "remove", selectionGroup);
	};
	
	/**
	 * Toggles one or multiple items from selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.toggleSelection = function(itemsToSelect, selectionGroup){
		return _changeSelection(this, itemsToSelect, "toggle", selectionGroup);
	};
	
	/*
	 * Index
	 */
	
	/**
	 * Gets one or multiple indices of selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelectionIndex = function(dimension, selectionGroup){
		var selection = this._getListSelection(selectionGroup);
		if(typeof dimension === "undefined"){
			return selection.indices;
		}
		else if(0 === dimension){
			//single value
			return selection.indices.length ? selection.indices[0] : undefined;
		}
		else if(1 === dimension){
			//1 dimensional array
			return selection.indices;
		}
		else if(2 === dimension){
			//2 dimensional array
			return [selection.indices];
		}
		else if(3 === dimension){
			//3 dimensional array
			return [[selection.indices]];
		}
		else{
			throw new Error("Only 3 dimensions are supported by this Control.");
		}
	};
	
	/**
	 * Returns whether one or multiple item indices are currently part of selection.
	 * @Public
	 */
	ListBaseProto.isInSelectionIndex = function(indices, selectionGroup){
		var items = _this._getItems();
		if(!jQuery.isArray(indices)){
			//Single value
			if(indices < 0 || indices >= items.length){
				throw new Error("Array out of bounds!");
			}
			
			return this.isInSelection(items[indices], selectionGroup);
		}
		else{
			var itemsToCheck = [];
			for(var i=0; i<indices.length; i++){
				var index = indices[i];
				if(index < 0 || index >= items.length){
					throw new Error("Array out of bounds!");
				}
				itemsToCheck.push(items[index]);
			}
			
			return this.isInSelection(itemsToCheck, selectionGroup);
		}
	};
	
	/**
	 * Selects one or multiple items by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "replace", selectionGroup);
	};
	
	/**
	 * Adds one or multiple items to selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "add", selectionGroup);
	};
	
	/**
	 * Removes one or multiple items from selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "remove", selectionGroup);
	};
	
	/**
	 * Toggles one or multiple items from selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.toggleSelectionIndex = function(indices, selectionGroup){
		return _changeSelectionIndices(this, indices, "toggle", selectionGroup);
	};
	
	/*
	 * CustomData 
	 */
	
	/**
	 * Returns whether one or multiple items are currently part of selection. Items are selected by custom data key and possible values.
	 * @Public
	 */
	ListBaseProto.isInSelectionByCustomData = function(dataKey, values, selectionGroup){
		var items = _this._getItems();
		
		if(!jQuery.isArray(values)){
			for(var i = 0; i < items.length; i++){
				if(items[i].data(dataKey) === values){
					selectedItem = items[i];
					
					return this.isInSelection(selectedItem, selectionGroup);
				}
			}
		}
		else{
			var itemsToCheck = [];
			for(var i = 0; i < items.length; i++){
				if(-1 !== jQuery.inArray(items[i].data(dataKey), values)){
					itemsToCheck.push(items[i]);
				}
			}
			return this.isInSelection(itemsToCheck, selectionGroup);
		}
	};
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "replace", selectionGroup);
	};
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "add", selectionGroup);
	};
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "remove", selectionGroup);
	};
	
	/**
	 * Toggles one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.toggleSelectionByCustomData = function(dataKey, values, selectionGroup){
		_changeSelectionByCustomData(this, dataKey, values, "toggle", selectionGroup);
	};
	
	/*
	 * Property
	 */
	
	/**
	 * Selects one or multiple items that have the given value in the specified property.
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionByProperty = function(propertyName, values, selectionGroup){
		throw new Error("Please implement ui5strap.ListBase.prototype.setSelectionByProperty");
	};
	
	/*
	 * ------------------
	 * END implementation of ISelectionProvider interface
	 * ------------------
	 */
	
	/*
	 * --------------------
	 * START implementation of IList interface
	 * --------------------
	 */
	/**
	 * Gets one or multiple selected items that have the given value in the specified custom data field.
	 * @Public
	 */
	ListBaseProto.getItemsByCustomData = function(dataKey){
		throw new Error("Please implement ui5strap.ListBase.prototype.getItemsByCustomData");
	};
	
	/**
	 * Gets one or multiple selected items that have the given value in the specified property.
	 * @Public
	 */
	ListBaseProto.getItemsByProperty = function(propertyName){
		throw new Error("Please implement ui5strap.ListBase.prototype.getItemsByProperty");
	};
	
	/**
	 * @Public
	 */
	ListBaseProto.getItemIndex = function(item){
		return this.indexOfAggregation("items", item);
	};
	
	/*
	 * ------------------
	 * END implementation of IList interface
	 * ------------------
	 */
	
	/**
	 * Returns an array of selected items and their indices.
	 * 
	 * @Protected
	 */
	ListBaseProto._getListSelection = function(selectionGroup){
		if(!selectionGroup){
			selectionGroup = _defaultSelectionGroup;
		}
		
		var items = this._getItems(),
			selection = {
				indices : [],
				items : []
			};
		
		for(var i = 0; i < items.length; i++){
			if(this._isItemSelected(items[i], selectionGroup)){
				selection.items.push(items[i]);
				selection.indices.push(i);
			}
		}
		
		return selection;
	};
	
	/**
	 * Defines how to decide whether an item is selected within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._isItemSelected = function(item, selectionGroup){
		return item.getSelected();
	};
	
	/**
	 * Defines how to decide whether an item is enabled within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._isItemEnabled = function(item, selectionGroup){
		return item.getEnabled();
	};
	
	/**
	 * Defines how to decide whether an item is selectable within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._isItemSelectable = function(item, selectionGroup){
		return item.getSelectable();
	};
	
	/**
	 * Defines how to select an item within a selectionGroup.
	 * @Protected
	 */
	ListBaseProto._setItemSelected = function(item, selected, selectionGroup){
		item.setSelected(selected);
	};
	
	/**
	 * Gets the list of items. This depends on the available aggregations.
	 * @Protected
	 */
	ListBaseProto._getItems = function(){
		return this.getItems();
	};
	
	/**
	 * Defines how to find the closest item starting at any control within the item.
	 * For example, if you click a button somewhere within the list, this method finds the corresponding list item.
	 * @Protected
	 */
	ListBaseProto._findClosestItem = function(srcControl){
		return ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.ListItem);
	};
	
	/**
	 * Adds additional event options.
	 * @Protected
	 */
	ListBaseProto._addEventOptions = function(eventOptions, oEvent){
		//@deprecated
		eventOptions.listItem = eventOptions.srcItem;
	};
	
	/*
	 * ----------------
	 * HANDLE UI EVENTS
	 * ----------------
	 */
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ListBaseProto._handlePress = function(oEvent){
		console.log(oEvent.isMarked());
		
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		
		var item = this._findClosestItem(oEvent.srcControl),
			eventOptions = {
				srcControl : oEvent.srcControl,
				srcItem : item,
				srcItems : [item],
			};
				
		this._addEventOptions(eventOptions, oEvent);
		
		if(item && this._isItemEnabled(item, _defaultSelectionGroup)){
			//Item is enabled
			
			//TODO Rename 'tap' event to 'press' sometimes
			this.fireTap(eventOptions);
			
			//Process selection
			var selectionMode = this.getSelectionMode();
			if(ui5strap.SelectionMode.None !== selectionMode 
					&& this._isItemSelectable(item, _defaultSelectionGroup)){
				//List allows selections and item is selectable
				
				var changes = null;
				
				if(selectionMode === ui5strap.SelectionMode.Single){
					changes = this.setSelection(item, _defaultSelectionGroup);
				}
				else if(selectionMode === ui5strap.SelectionMode.SingleToggle){
					if(this.isInSelection(item)){
						changes = this.removeSelection(item, _defaultSelectionGroup);
					}
					else{
						changes = this.setSelection(item, _defaultSelectionGroup);
					}
				}
				else if(selectionMode === ui5strap.SelectionMode.Multiple){
					changes = this.toggleSelection(item, _defaultSelectionGroup);
				}
				
				if(changes && changes.changed.length){
					eventOptions.selectionChanges = changes;
					
					//Select event is deprecated
					this.fireSelect(eventOptions);
				}
				else{
					jQuery.sap.log.debug("Event 'select' not fired: no changes in selection.");
				}
			}
			else{
				jQuery.sap.log.warning("Could not select list item: List item not selectable.");
			}
		}
		else{
			jQuery.sap.log.warning("Could not select list item: List item not found or disabled.");
		}
	};
	
	//Touchscreen
	if(ui5strap.support.touch){
		ListBaseProto.ontap = ListBaseProto._handlePress;
	}
	else{
		ListBaseProto.onclick = ListBaseProto._handlePress;
	}
	
	/*
	 * ----------
	 * DEPRECATED
	 * ----------
	 */
	
	/**
	 * Set list item selected by index
	 * @deprecated
	 */
	ListBaseProto.setSelectedIndex = function(itemIndex){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedIndex is deprecated! Use .setSelectionIndices instead.");
		
		return this.setSelectionIndices(itemIndex);
	};
 
	/**
	 * Get index of selected index
	 * @deprecated
	 */
	ListBaseProto.getSelectedIndex = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedIndex is deprecated! Use .getSelectionIndices instead.");
		
		return this.getSelectionIndices();
	};

	
	/**
	 * Set control selected by reference
	 * @deprecated
	 */
	ListBaseProto.setSelectedControl = function(item){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedControl is deprecated! Use .setSelection instead.");
	
		return this.setSelection(item);
	};
	
	/**
	 * Get selected list item control
	 * @deprecated
	 */
	ListBaseProto.getSelectedControl = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedControl is deprecated! Use .getSelection instead.");
		
		return this.getSelection();
	};
	
	/**
	 * Select by custom data value
	 * @deprecated
	 */
	ListBaseProto.setSelectedCustom = function(dataKey, value){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedCustom is deprecated! Use .setSelectionByCustomData instead.");
		
		return this.setSelectionByCustomData(dataKey, value);
	};

}());