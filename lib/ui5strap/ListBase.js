/*
 * 
 * UI5Strap
 *
 * Nav
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
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

	var NavProto = ui5strap.ListBase.prototype;

	NavProto.setSelectedIndex = function(itemIndex){

		var items = this.getItems();
		if(itemIndex < 0 || itemIndex >= items.length){
			return false;
		}
		this.setSelectedItem(items[itemIndex]);

	};

	NavProto.getSelectedIndex = function(){
		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return i;
			}
		}
		return -1;
	};

	/*
	* @deprecated
	*/
	NavProto.setSelectedItem = function(item){
		this.setSelectedControl(item);
	};

	NavProto.setSelectedControl = function(item){

		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i] === item){
				item.setSelected(true);
				this.fireSelect(
					{ 
						selectedIndex : i, 
						selectedControl : item, 
						listItem : item
					}
				);
			}
			else{
				items[i].setSelected(false);
			}
		}
		
	};

	NavProto.getSelectedControl = function(){
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
				srcControl : srcControl,
				listItem : srcControl
			},
			selectionMode = _this.getSelectionMode();

		if(!(srcControl instanceof ui5strap.ListItem)){
			var parentControl = srcControl.getParent();
			if(parentControl instanceof ui5strap.ListItem){
				eventOptions.listItem = parentControl;
			}
		}

		if(selectionMode === ui5strap.SelectionMode.Single){
			_this.setSelectedItem(eventOptions.listItem);
		}

		return eventOptions;
	};

	if(ui5strap.options.enableTapEvents){
		NavProto.ontap = function(oEvent){
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	if(ui5strap.options.enableClickEvents){
		NavProto.onclick = function(oEvent){
			this.fireClick(_processSelection(this, oEvent));
		};
	}

}());