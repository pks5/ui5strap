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
			
		},
				
		aggregations : { 
			items : {
				type : "ui5strap.ListItem",
				singularName: "items"
			} 
		},

		events:{}
	};

	if(ui5strap.options.enableTapEvents){
		_metadata.events.tap = {};
	}

	if(ui5strap.options.enableClickEvents){
		_metadata.events.tap = {};
	}

	sap.ui.core.Control.extend("ui5strap.ListBase", {
		metadata : _metadata
	});

	var NavProto = ui5strap.ListBase.prototype;

	NavProto.setSelectedIndex = function(itemIndex){

		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			items[i].setSelected(i === itemIndex);
		}
		
	};

	NavProto.setSelectedItem = function(item){

		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			items[i].setSelected(items[i] === item);
		}
		
	};

	var _getEventOptions = function(oEvent){
		var srcControl = oEvent.srcControl;
		var eventOptions = {
			srcControl : srcControl,
			listItem : srcControl
		};

		if(!(srcControl instanceof ui5strap.ListItem)){
			var parentControl = srcControl.getParent();
			if(parentControl instanceof ui5strap.ListItem){
				eventOptions.listItem = parentControl;
			}
		}

		return eventOptions;
	};

	if(ui5strap.options.enableTapEvents){
		NavProto.ontap = function(oEvent){
			this.fireTap(_getEventOptions(oEvent));
		};
	}

	if(ui5strap.options.enableClickEvents){
		NavProto.onclick = function(oEvent){
			this.fireClick(_getEventOptions(oEvent));
		};
	}

}());