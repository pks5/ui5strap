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

(function(){

	jQuery.sap.declare("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.ButtonGroup", {
		metadata : {

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
				selectionMode : {
					type : "ui5strap.SelectionMode",
					defaultValue : ui5strap.SelectionMode.None
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
					
			aggregations : { 
				buttons : {
					singularName: "buttons"
				} 
			},

			events:{
		        tap : {},
		        select : {}
		    }
		}
	});

	var ButtonGroupProto = ui5strap.ButtonGroup.prototype;

	/*
	 * START implementation of Selectable interface
	 */
	
	/**
	 * Set button selected by index
	 */
	ButtonGroupProto.setSelectedIndex = function(itemIndex){

		var items = this.getButtons();
		if(itemIndex < 0 || itemIndex >= items.length){
			return false;
		}
		
		return this.setSelectedControl(items[itemIndex]);

	};

	/**
	 * Get index of selected button
	 */
	ButtonGroupProto.getSelectedIndex = function(){
		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return i;
			}
		}
		return -1;
	};

	/**
	 * Set button selected by reference
	 */
	ButtonGroupProto.setSelectedControl = function(item){
		var items = this.getButtons(),
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
	 * Get selected button control
	 */
	ButtonGroupProto.getSelectedControl = function(){
		var items = this.getButtons();
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
	ButtonGroupProto.setSelectedCustom = function(dataKey, value){console.log(dataKey, value);
		items = this.getButtons(),
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
	
	/**
	 * @Private
	 */
	var _processSelection = function(_this, oEvent){
		var srcControl = oEvent.srcControl,
			selectionMode = _this.getSelectionMode(),
			eventOptions = {
				srcControl : srcControl,
				button : ui5strap.Utils.findClosestParentControl(srcControl, ui5strap.Button)
			};
		
		if(eventOptions.button){
			if(selectionMode === ui5strap.SelectionMode.Single){
				if(_this.setSelectedControl(eventOptions.button)){
					//TODO is this needed for Button Group?
					eventOptions.selectionSource = _this;
				
					_this.fireSelect(eventOptions);
				}
			}
		}
		else{
			jQuery.sap.log.warning("Could not select button: not found.");
		}

		return eventOptions;
	};

	/*
	 * UI EVENTS
	 */
	
	if(ui5strap.options.enableTapEvents){
		ButtonGroupProto.ontap = function(oEvent){
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	if(ui5strap.options.enableClickEvents){
		ButtonGroupProto.onclick = function(oEvent){
			this.fireTap(_processSelection(this, oEvent));
		};
	}

}());