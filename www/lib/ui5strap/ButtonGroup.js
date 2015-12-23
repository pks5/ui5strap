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

sap.ui.define(['./library', './ControlBase', './ListSelectionSupport', './Button', './ListItem'], function(library, ControlBase, ListSelectionSupport, Button, ListItem){

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
	ButtonGroupProto = ButtonGroup.prototype;
	
	ListSelectionSupport.proto(ButtonGroupProto);
	
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
			providerItem = ui5strap.Utils.findClosestParentControl(oEvent.srcControl, ListItem);
			selectionProvider = providerItem.getParent();
			
			if(oEvent.isMarked("ui5strap.ISelectableItem.update")){
				buttonUpdated = true;
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
	
	return ButtonGroup;
});