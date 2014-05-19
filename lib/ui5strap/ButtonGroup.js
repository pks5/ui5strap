/*
 * 
 * UI5Strap
 *
 * ButtonGroup
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
				navbarAlign : {
					type:"ui5strap.NavBarAlignment",
					defaultValue:ui5strap.NavBarAlignment.None
				}
			},
					
			aggregations : { 
				buttons : {
					singularName: "buttons"
				} 
			},

			events:{
		        click : {},
		        tap : {},
		        select : {}
		    }
		}
	});

	var ButtonGroupProto = ui5strap.ButtonGroup.prototype;

	ButtonGroupProto.setSelectedIndex = function(itemIndex){

		var items = this.getButtons();
		if(itemIndex < 0 || itemIndex >= items.length){
			return false;
		}
		this.setSelectedControl(items[itemIndex]);

	};

	ButtonGroupProto.getSelectedIndex = function(){
		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return i;
			}
		}
		return -1;
	};

	ButtonGroupProto.setSelectedControl = function(item){

		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			if(items[i] === item){
				item.setSelected(true);
				this.fireSelect({});
			}
			else{
				items[i].setSelected(false);
			}
		}
		
	};

	ButtonGroupProto.getSelectedControl = function(){
		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return items[i];
			}
		}
		return null;
	};

	var _processSelection = function(_this, oEvent){
		var srcControl = oEvent.srcControl,
			selectionMode = _this.getSelectionMode(),
			eventOptions = {
				button : srcControl
			};

		if(!(srcControl instanceof ui5strap.Button)){
			var parentControl = srcControl.getParent();
			if(parentControl instanceof ui5strap.Button){
				eventOptions.button = parentControl;
			}
		}

		if(selectionMode === ui5strap.SelectionMode.Single){
			_this.setSelectedControl(eventOptions.button);
		}

		return eventOptions;
	};

	if(ui5strap.options.enableTapEvents){
		ButtonGroupProto.ontap = function(oEvent){
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	if(ui5strap.options.enableClickEvents){
		ButtonGroupProto.onclick = function(oEvent){
			this.fireClick(_processSelection(this, oEvent));
		};
	}

}());