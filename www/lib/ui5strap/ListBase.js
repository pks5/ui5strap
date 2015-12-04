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
	 * Returns an array of selected items and their indices.
	 * 
	 * @Private
	 */
	var _getSelectionData = function(_this){
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
	
	/**
	 * @Private
	 */
	var _getSelection = function(_this, dimension){
		var selection = _getSelectionData(_this);
		if(!dimension){
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
			//more than dimensional array
			throw new Error("At most 3 dimension are supported.");
		}
	};
	
	/**
	 * @Private
	 */
	var _changeSelection = function(_this, itemsToSelect, dimension, mode){
		var items = _this._getItems(),
			changes = {
				"selected" : [],
				"deselected" : [],
				"changed" : [],
				"unchanged" : [],
			};
		
		if(!dimension){
			//Single value
			for(var i = 0; i < items.length; i++){
				var item = items[i];
				if(itemsToSelect && item === itemsToSelect){
					//Item is subject to select / deselect
					if("replace" === mode || "add" === mode){
						if(!item.getSelected()){
							changes.selected.push(item);
							changes.changed.push(item);
							
							item.setSelected(true);
						}
						else{
							changes.unchanged.push(item);
						}
					}
					else if("remove" === mode){
						if(item.getSelected()){
							changes.deselected.push(item);
							changes.changed.push(item);
							
							item.setSelected(false);
						}
						else{
							changes.unchanged.push(item);
						}
					}
				}
				else{
					//Item is no subject to select / deselect
					if("replace" === mode){
						if(item.getSelected()){
							changes.deselected.push(item);
							changes.changed.push(item);
							
							item.setSelected(false);
						}
						else{
							changes.unchanged.push(item);
						}
					}
					else if("add" === mode || "remove" === mode){
						changes.unchanged.push(item);
					}
			     }
			}
		}
		else if(1 === dimension){
			//1 dimensional array
			for(var i = 0; i < items.length; i++){
				var item = items[i];
				if(-1 !== jQuery.inArray(item, itemsToSelect)){
					//Item is subject to select / deselect
					if("replace" === mode || "add" === mode){
						if(!item.getSelected()){
							changes.selected.push(item);
							changes.changed.push(item);
							
							item.setSelected(true);
						}
						else{
							changes.unchanged.push(item);
						}
					}
					else if("remove" === mode){
						if(item.getSelected()){
							changes.deselected.push(item);
							changes.changed.push(item);
							
							item.setSelected(false);
						}
						else{
							changes.unchanged.push(item);
						}
					}
				}
				else{
					//Item is no subject to select / deselect
					if("replace" === mode){
						if(item.getSelected()){
							changes.deselected.push(item);
							changes.changed.push(item);
							
							item.setSelected(false);
						}
						else{
							changes.unchanged.push(item);
						}
					}
					else if("add" === mode || "remove" === mode){
						changes.unchanged.push(item);
					}
				}
			}
		}
		else{
			//more dimensional array
			throw new Error("Lists do not support more than 1 dimension!");
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
	var _getSelectionIndex = function(_this, dimension){
		var selection = _getSelectionData(_this);
		if(!dimension){
			//single value
			return selection.x.length ? selection.x[0] : undefined;
		}
		else if(1 === dimension){
			//1 dimensional array
			return selection.x;
		}
		else if(2 === dimension){
			//2 dimensional array
			return [selection.x];
		}
		else if(3 === dimension){
			//3 dimensional array
			return [[selection.x]];
		}
		else{
			//more than 3 dimensional array
			throw new Error("At most 3 dimension are supported.");
		}
	};
	
	/**
	 * @Private
	 */
	var _changeSelectionIndices = function(_this, indices, dimension, mode){
		var items = this._getItems();
		
		if(!dimension){
			//Single value
			if(indices < 0 || indices >= items.length){
				throw new Error("Array out of bounds!");
			}
			
			return _changeSelection(_this, items[indices], dimension, mode);
		}
		else if(1 === dimension){
			//1 dimensional array
			var itemsToSelect = [];
			for(var i=0; i<indices.length; i++){
				var index = indices[i];
				if(index < 0 || index >= items.length){
					throw new Error("Array out of bounds!");
				}
				itemsToSelect.push(items[index]);
			}
			
			return _changeSelection(_this, itemsToSelect, dimension, mode);
		}
		else{
			//more dimensional array
			throw new Error("Lists do not support more than 1 dimension!");
		}
	};
	
	/*
	 * --------------------
	 * START implementation of ISelectionProvider interface
	 * --------------------
	 */
	
	/**
	 * Tries to select one or multiple items and returns all changes.
	 * 
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelection = function(itemsToSelect, dimension){
		return _changeSelection(this, itemsToSelect, dimension, "replace");
	};
	
	/**
	 * Adds one or multiple items to selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelection = function(itemsToSelect, dimension){
		return _changeSelection(this, itemsToSelect, dimension, "add");
	};
	
	/**
	 * Removes one or multiple items from selection
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelection = function(itemsToSelect, dimension){
		return _changeSelection(this, itemsToSelect, dimension, "remove");
	};
	
	/**
	 * Gets one or multiple selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelection = function(dimension){
		return _getSelection(this, dimension);
	};
	
	/**
	 * Selects one or multiple items by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionIndex = function(indices, dimension){
		return _changeSelectionIndices(this, indices, dimension, "replace");
	};
	
	/**
	 * Adds one or multiple items to selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.addSelectionIndex = function(indices, dimension){
		return _changeSelectionIndices(this, indices, dimension, "add");
	};
	
	/**
	 * Removes one or multiple items from selection by indices
	 * @Public
	 * @Override
	 */
	ListBaseProto.removeSelectionIndex = function(indices, dimension){
		return _changeSelectionIndices(this, indices, dimension, "remove");
	};
	
	/**
	 * Gets one or multiple indices of selected items
	 * @Public
	 * @Override
	 */
	ListBaseProto.getSelectionIndex = function(dimension){
		return _getSelectionIndex(this, dimension);
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
	 * Gets one or multiple selected items that have the given value in the specified property.
	 * @Public
	 * @Override
	 */
	ListBaseProto.getItemsByProperty = function(propertyName){
		throw new Error("Please implement ui5strap.ListBase.prototype.getItemsByProperty");
	};
	
	
	
	/**
	 * Selects one or multiple items that have the given value in the specified custom data field.
	 * @Public
	 * @Override
	 */
	ListBaseProto.setSelectionByCustomData = function(dataKey, values, dimension){
		var items = this._getItems();
		
		if(!dimension){
			for(var i = 0; i < items.length; i++){
				if(items[i].data(dataKey) === values){
					selectedItem = items[i];
					
					return _changeSelection(this, selectedItem, dimension, "replace");
				}
			}
		}
		else if(1 === dimension){
			var itemsToSelect = [];
			for(var i = 0; i < items.length; i++){
				if(-1 !== jQuery.inArray(items[i].data(dataKey), values)){
					itemsToSelect.push(items[i]);
				}
			}
			return _changeSelection(this, itemsToSelect, dimension, "replace");
		}
		else{
			throw new Error("Lists do not support more than 1 dimension!");
		}
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
	 * @Public
	 */
	ListBaseProto._getItems = function(){
		return this.getItems();
	};
	
	/**
	 * @Protected
	 */
	ListBaseProto._findClosestItem = function(srcControl){
		return ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.ListItem);
	};
	
	/**
	 * @Public
	 */
	ListBaseProto.getItemIndex = function(item){
		return this.indexOfAggregation("items", item);
	};
	
	/**
	 * @Protected
	 */
	ListBaseProto._getEventOptions = function(item){
		return {
			listItem : item
		};
	};
	
	
	/*
	 * ----------------
	 * HANDLE UI EVENTS
	 * ----------------
	 */
	
	/**
	 * @Private
	 */
	var _processSelection = function(_this, oEvent){
		var item = _this._findClosestItem(oEvent.srcControl),
			selectionMode = _this.getSelectionMode(),
			eventOptions = _this._getEventOptions(item);
		
		eventOptions.srcControl = oEvent.srcControl;

		if(item && item.getEnabled() && item.getSelectable()){
			var changes = null;
			
			if(selectionMode === ui5strap.SelectionMode.Single){
				changes = _this.setSelection(item);
			}
			
			if(changes && changes.changed.length){
				eventOptions.selectionChanges = changes;
				
				//Select event is deprecated
				_this.fireSelect(eventOptions);
			}
			else{
				jQuery.sap.log.debug("Event 'select' not fired: no changes in selection.");
			}
		}
		else{
			jQuery.sap.log.warning("Could not select list item: List Item not found.");
		}

		return eventOptions;
	};
	
	
	//Touchscreen
	if(ui5strap.options.enableTapEvents){
		/**
		 * @Public
		 * @Override
		 */
		ListBaseProto.ontap = function(oEvent){
			var eventOptions = _processSelection(this, oEvent);
			//if(eventOptions.item.getEnabled()){
				oEvent.stopPropagation();
				this.fireTap(eventOptions);
			//}
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