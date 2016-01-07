/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonGroup
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

sap.ui.define(['./library', './ControlBase', './ListSelectionSupport', './Button', './ListItemBase'], function(library, ControlBase, ListSelectionSupport, Button, ListItemBase){

	var _meta = {
			
			interfaces : [],
			
			defaultAggregation : "buttons",
				
			library : "ui5strap",

			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				type : {
					type: "ui5strap.ButtonGroupType", 
					defaultValue: ui5strap.ButtonGroupType.Default
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			},
					
			aggregations : { 
				buttons : {
					singularName: "button"
				} 
			},

			events:{
				
		    }
		};
	
	ListSelectionSupport.meta(_meta);
	
	var ButtonGroup = ControlBase.extend("ui5strap.ButtonGroup", {
		metadata : _meta
	}),
	ButtonGroupProto = ButtonGroup.prototype,
	_typeToClass = {
		Default : "btn-group",
		Justified : "btn-group btn-group-justified",
		Vertical : "btn-group-vertical"
	};
	
	ListSelectionSupport.proto(ButtonGroupProto);
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._getStyleClassRoot = function(){
		var size = this.getSize(),
			type = this.getType(),
			styleClass = " " + _typeToClass[type];
		
		if(ui5strap.Size.Default !== size){
			styleClass += ' btn-group-' + ui5strap.BSSize[size];
		}
		
		return styleClass;
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._getItems = function(){
		return this.getButtons();
	};
	
	/**
	 * @Public
	 * @Override
	 */
	ButtonGroupProto.getItemIndex = function(item){
		return this.indexOfAggregation("buttons", item);
	};
	
	/**
	 * Adds additional event options.
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._addEventOptions = function(eventOptions, oEvent){
		//@deprecated
		eventOptions.button = eventOptions.srcItem;
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ButtonGroupProto._handlePress = function(oEvent){
		//console.log(oEvent.isMarked());
		
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("ui5strap.ISelectionProvider");
		oEvent.setMarked("ui5strap.IItemsProvider");
		oEvent.setMarked("ui5strap.ButtonGroup");
		
		var button = ui5strap.Utils.findClosestParentControl(oEvent.srcControl, Button),
			selectionProvider = this,
			providerItem = button,
			buttonUpdated = false;
		
		if(oEvent.isMarked("ui5strap.ListDropdownMenu")){
			//TODO search for selectable item instead
			providerItem = ui5strap.Utils.findClosestParentControl(oEvent.srcControl, ListItemBase);
			if(providerItem){
				selectionProvider = providerItem.getParent();
				
				if(oEvent.isMarked("ui5strap.ISelectableItem.update")){
					buttonUpdated = true;
				}
			}
		}
		
		this.pressItem(oEvent.srcControl, button, buttonUpdated, selectionProvider, providerItem);
		
	};
	
	//Touchscreen
	if(ui5strap.support.touch){
		ButtonGroupProto.ontap = ButtonGroupProto._handlePress;
	}
	else{
		ButtonGroupProto.onclick = ButtonGroupProto._handlePress;
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
	ButtonGroupProto.setSelectedIndex = function(itemIndex){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedIndex is deprecated! Use .setSelectionIndices instead.");
		
		return this.setSelectionIndex(itemIndex);
	};
 
	/**
	 * Get index of selected index
	 * @deprecated
	 */
	ButtonGroupProto.getSelectedIndex = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedIndex is deprecated! Use .getSelectionIndices instead.");
		
		var selection = this.getSelectionIndex();
		return selection && selection.length ? selection[0] : null;
	};

	
	/**
	 * Set control selected by reference
	 * @deprecated
	 */
	ButtonGroupProto.setSelectedControl = function(item){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedControl is deprecated! Use .setSelection instead.");
	
		return this.setSelection(item);
	};
	
	/**
	 * Get selected list item control
	 * @deprecated
	 */
	ButtonGroupProto.getSelectedControl = function(){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.getSelectedControl is deprecated! Use .getSelection instead.");
		
		var selection = this.getSelection();
		return selection && selection.length ? selection[0] : null;
	};
	
	/**
	 * Select by custom data value
	 * @deprecated
	 */
	ButtonGroupProto.setSelectedCustom = function(dataKey, value){
		jQuery.sap.log.warning("ui5strap.ListBase.prototy.setSelectedCustom is deprecated! Use .setSelectionByCustomData instead.");
		
		return this.setSelectionByCustomData(dataKey, value);
	};
	
	return ButtonGroup;
});