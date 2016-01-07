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

sap.ui.define(['./library', './ControlBase', './ListSelectionSupport', './ListItemBase'], function(library, ControlBase, ListSelectionSupport, ListItemBase){

	var _meta = {
			interfaces : [],

			library : "ui5strap",
			
			properties : {
				
			},
			
			events : {
				
			}
		};
	
	ListSelectionSupport.meta(_meta);
	
	var ListBase = ControlBase.extend("ui5strap.ListBase", {
		metadata : _meta
	}),
	ListBaseProto = ListBase.prototype;
	
	ListSelectionSupport.proto(ListBaseProto);
	
	/**
	 * Adds additional event options.
	 * @Protected
	 * @Override
	 */
	ListBaseProto._addEventOptions = function(eventOptions){
		//@deprecated
		eventOptions.listItem = eventOptions.srcItem;
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ListBaseProto._handlePress = function(oEvent){
		//console.log(oEvent.isMarked());
		
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("ui5strap.ISelectionProvider");
		oEvent.setMarked("ui5strap.IItemsProvider");
		oEvent.setMarked("ui5strap.ListBase");
		
		//TODO find the right list item! (dropdown menu)
		var item = ui5strap.Utils.findClosestParentControl(oEvent.srcControl, ListItemBase),
			selectionProvider = this,
			listItem = item,
			listItemUpdated = false;
		
		if(oEvent.isMarked("ui5strap.ListDropdownMenu")){
			selectionProvider = item.getParent();
			//TODO search for selectable item instead
			listItem = ui5strap.Utils.findClosestParentControl(selectionProvider, ListItemBase);
			
			if(listItem){
				if(oEvent.isMarked("ui5strap.ISelectableItem.update")){
					listItemUpdated = true;
				}
			}
		}
		
		this.pressItem(oEvent.srcControl, listItem, listItemUpdated, selectionProvider, item);
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
		
		return this.setSelectionIndex(itemIndex);
	};
 
	/**
	 * Get index of selected index
	 * @deprecated
	 */
	ListBaseProto.getSelectedIndex = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedIndex is deprecated! Use .getSelectionIndices instead.");
		
		var selection = this.getSelectionIndex();
		return selection && selection.length ? selection[0] : null;
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
		
		var selection = this.getSelection();
		return selection && selection.length ? selection[0] : null;
	};
	
	/**
	 * Select by custom data value
	 * @deprecated
	 */
	ListBaseProto.setSelectedCustom = function(dataKey, value){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedCustom is deprecated! Use .setSelectionByCustomData instead.");
		
		return this.setSelectionByCustomData(dataKey, value);
	};
	
	return ListBase;
});