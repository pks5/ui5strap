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
	
	var _metadata = {
		defaultAggregation : "items",

		library : "ui5strap",

		properties : { 
			selectionMode : {
				type : "ui5strap.SelectionMode",
				defaultValue : ui5strap.SelectionMode.None
			}
		},
				
		aggregations : { 
			items : {
				type : "ui5strap.ListItem",
				singularName: "items"
			} 
		},

		events:{

			select : {}

		}
	};

	if(ui5strap.options.enableTapEvents){
		_metadata.events.tap = {};
	}

	if(ui5strap.options.enableClickEvents){
		_metadata.events.click = {};
	}

	sap.ui.core.Control.extend("ui5strap.ListBase", {
		metadata : _metadata
	});

	var ListBaseProto = ui5strap.ListBase.prototype;

	ListBaseProto.setSelectedIndex = function(itemIndex){

		var items = this.getItems();
		if(itemIndex < 0 || itemIndex >= items.length){
			return false;
		}
		this.setSelectedControl(items[itemIndex]);

	};
 
	ListBaseProto.getSelectedIndex = function(){
		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return i;
			}
		}
		return -1;
	};

	ListBaseProto.setMasterSelected = function(listItem){
		
			var parent = this.getParent(),
				grandParent = parent.getParent();

			if(grandParent instanceof ui5strap.ListBase){
				grandParent.setSelectedControl(parent, this);
			}
	
	};

	ListBaseProto.setSelectedControl = function(item, nestedList){

		var items = this.getItems();
		for(var i = 0; i < items.length; i++){ 
			if(items[i] === item){
				if(!item.getSelected()){
					item.setSelected(true);
					this.fireSelect({ "selectionSource" : nestedList ? nestedList : this });

					if(this.getSelectionMode() === ui5strap.SelectionMode.SingleMaster){
						this.setMasterSelected(item);
					}
				}
			}
			else{
				items[i].setSelected(false);
			}
		}
		
	};

	ListBaseProto.getSelectedControl = function(){
		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return items[i];
			}
		}
		return null;
	};

	var _processSelection = function(_this, oEvent){
		var srcControl = oEvent.srcControl,
			eventOptions = {
				srcControl : srcControl
			},
			selectionMode = _this.getSelectionMode();

		if(srcControl instanceof ui5strap.ListItem){
			eventOptions.listItem = srcControl;
		}
		else{
			var parentControl = srcControl.getParent();
			if(parentControl instanceof ui5strap.ListItem){
				eventOptions.listItem = parentControl;
			}
		}

		if(eventOptions.listItem && eventOptions.listItem.getSelectable()){
			if(selectionMode === ui5strap.SelectionMode.Single || selectionMode === ui5strap.SelectionMode.SingleMaster){
				_this.setSelectedControl(eventOptions.listItem);
			}
			else if(selectionMode === ui5strap.SelectionMode.Master){
				_this.setMasterSelected(eventOptions.listItem);
			}
		}

		return eventOptions;
	};

	if(ui5strap.options.enableTapEvents){
		ListBaseProto.ontap = function(oEvent){
			oEvent.stopPropagation();
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	if(ui5strap.options.enableClickEvents){
		ListBaseProto.onclick = function(oEvent){
			oEvent.stopPropagation();
			this.fireClick(_processSelection(this, oEvent));
		};
	}

}());