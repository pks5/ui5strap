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

sap.ui.define(['./library', './ControlBase', './ListSelectionSupport'], function(library, ControlBase, ListSelectionSupport){

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
	ListBaseProto._addEventOptions = function(eventOptions){
		//@deprecated
		eventOptions.listItem = eventOptions.srcItem;
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
	
	return ListBase;
});