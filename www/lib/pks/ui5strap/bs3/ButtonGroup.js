/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ButtonGroup
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", '../core/ListSelectionSupport', "./PositionSupport", './Button', '../core/ListItemBase', "../core/Utils", "../core/RenderUtils"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, ListSelectionSupport, PositionSupport, Button, ListItemBase, Utils, RenderUtils){
	
	"use strict";
	
	var mMetaData = {
			
			interfaces : [],
			
			defaultAggregation : "buttons",
				
			library : "pks.ui5strap.bs3",

			properties : { 
				size : {
					type: "pks.ui5strap.bs3.Size", 
					defaultValue: ui5strapBs3Lib.Size.Default
				},
				type : {
					type: "pks.ui5strap.bs3.ButtonGroupType", 
					defaultValue: ui5strapBs3Lib.ButtonGroupType.Default
				},
				trail : {
					type:"pks.ui5strap.core.TrailHtml", 
					defaultValue: ui5strapCoreLib.TrailHtml.Space
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
	
	ListSelectionSupport.meta(mMetaData);
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new ButtonGroup instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap button groups.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.ButtonGroup
	 * 
	 */
	var ButtonGroup = ControlBase.extend("pks.ui5strap.bs3.ButtonGroup", /** @lends pks.ui5strap.bs3.ButtonGroup.prototype */ {
		metadata : mMetaData,
		
		renderer : function(rm, oControl) {
			var buttons = oControl.getButtons(),
				type = oControl.getType();
		
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < buttons.length; i++){
				var button = buttons[i];
				if(type === ui5strapBs3Lib.ButtonGroupType.Justified && button instanceof Button){
					rm.write('<div class="btn-group">');
					rm.renderControl(button);
					rm.write("</div>");
				}
				else{
					rm.renderControl(button);
				}
			}
			
			rm.write("</div>");
		
			RenderUtils.renderTrail(rm, oControl);
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.ButtonGroup.prototype
	 */
	ButtonGroupProto = ButtonGroup.prototype,
	_typeToClass = {
		Default : "btn-group",
		Justified : "btn-group btn-group-justified",
		Vertical : "btn-group-vertical"
	};
	
	ListSelectionSupport.proto(ButtonGroupProto);
	PositionSupport.proto(ButtonGroupProto);
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ButtonGroupProto._getStyleClassPrefix = function(){
		return "ui5strapButtonGroup";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ButtonGroupProto._getStyleClassRoot = function(){
		var size = this.getSize(),
			type = this.getType(),
			styleClass = " " + _typeToClass[type];
		
		if(ui5strapBs3Lib.Size.Default !== size){
			styleClass += ' btn-group-' + ui5strapBs3Lib.BSSize[size];
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
		oEvent.setMarked("pks.ui5strap.core.ISelectionProvider");
		oEvent.setMarked("pks.ui5strap.core.IItemsProvider");
		oEvent.setMarked("pks.ui5strap.bs3.ButtonGroup");
		
		var button = Utils.findClosestParentControl(oEvent.srcControl, Button),
			selectionProvider = this,
			providerItem = button,
			buttonUpdated = false;
		
		if(oEvent.isMarked("pks.ui5strap.bs3.ListDropdownMenu")){
			//TODO search for selectable item instead
			providerItem = Utils.findClosestParentControl(oEvent.srcControl, ListItemBase);
			if(providerItem){
				selectionProvider = providerItem.getParent();
				
				if(oEvent.isMarked("pks.ui5strap.core.ISelectableItem.update")){
					buttonUpdated = true;
				}
			}
		}
		
		this.pressItem(oEvent.srcControl, button, buttonUpdated, selectionProvider, providerItem);
		
	};
	
	//Touchscreen
	if(ui5strapBs3Lib.support.touch){
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
		jQuery.sap.log.warning("pks.ui5strap.core.ListBase.prototy.setSelectedIndex is deprecated! Use .setSelectionIndices instead.");
		
		return this.setSelectionIndex(itemIndex);
	};
 
	/**
	 * Get index of selected index
	 * @deprecated
	 */
	ButtonGroupProto.getSelectedIndex = function(){
		jQuery.sap.log.warning("pks.ui5strap.core.ListBase.prototy.getSelectedIndex is deprecated! Use .getSelectionIndices instead.");
		
		var selection = this.getSelectionIndex();
		return selection && selection.length ? selection[0] : null;
	};

	
	/**
	 * Set control selected by reference
	 * @deprecated
	 */
	ButtonGroupProto.setSelectedControl = function(item){
		jQuery.sap.log.warning("pks.ui5strap.core.ListBase.prototy.setSelectedControl is deprecated! Use .setSelection instead.");
	
		return this.setSelection(item);
	};
	
	/**
	 * Get selected list item control
	 * @deprecated
	 */
	ButtonGroupProto.getSelectedControl = function(){
		jQuery.sap.log.warning("pks.ui5strap.core.ListBase.prototy.getSelectedControl is deprecated! Use .getSelection instead.");
		
		var selection = this.getSelection();
		return selection && selection.length ? selection[0] : null;
	};
	
	/**
	 * Select by custom data value
	 * @deprecated
	 */
	ButtonGroupProto.setSelectedCustom = function(dataKey, value){
		jQuery.sap.log.warning("pks.ui5strap.core.ListBase.prototy.setSelectedCustom is deprecated! Use .setSelectionByCustomData instead.");
		
		return this.setSelectionByCustomData(dataKey, value);
	};
	
	return ButtonGroup;
});