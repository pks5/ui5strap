/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ListDropdownItem
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

sap.ui.define(['./library', '../core/ListItemBase', './ListLinkItem', "../core/Utils"], function(ui5strapBs3Lib, ListItemBase, ListLinkItem, Utils){
	
	"use strict";
	
	/**
	 * Constructor for a new ListDropdownItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating dropdown items for the Bootstrap list.
	 * @extends pks.ui5strap.bs3.ListLinkItem
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.ListDropdownItem
	 * 
	 */
	var ListDropdownItem = ListLinkItem.extend("pks.ui5strap.bs3.ListDropdownItem", /** @lends pks.ui5strap.bs3.ListDropdownItem.prototype */ {
		metadata : {
			interfaces : ["pks.ui5strap.bs3.IDropdownMenuHost"],
			
			library : "pks.ui5strap.bs3",

			defaultAggregation : "menu",
			
			properties : {
				update : {
					type : "pks.ui5strap.bs3.DropdownMenuHostUpdate",
					defaultValue : ui5strapBs3Lib.DropdownMenuHostUpdate.None
				}
			},

			aggregations : { 
				menu : {
					type : "pks.ui5strap.bs3.DropdownMenu",
					multiple : false
				}
			}
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.ListDropdownItem.prototype
	 */
	ListDropdownItemProto = ListDropdownItem.prototype;

	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ListDropdownItemProto._getStyleClassPrefix = function(){
		return "ui5strapListDropdownItem";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ListDropdownItemProto._getStyleClassDesign = function(){
		var styleClass = " dropdown";
		if(this.getSelected()){
			styleClass += " active";
		}
		if(!this.getEnabled()){
			styleClass += " disabled";
		}
		return styleClass;
	};
	
	ListDropdownItemProto.setText = function(newText){
		if(this.getMenu() === null){
			Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
		}
		else{
			this.setProperty('text', newText);
		}
	};
	
	/**
	 * @Public
	 * @Override
	 */
	ListDropdownItemProto.isSelectable = function(selectionProvider){
		return this.getSelectable() && selectionProvider === this.getMenu();
	};

	ListDropdownItemProto.open = function(){
		this.$().addClass('open');
	};
	
	ListDropdownItemProto.close = function(){
		this.$().removeClass('open');
	};

	ListDropdownItemProto.toggle = function(){
		this.$().toggleClass('open');
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	ListDropdownItemProto._handlePress = function(oEvent){
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("pks.ui5strap.core.ISelectableItem");
		oEvent.setMarked("pks.ui5strap.bs3.ListDropdownItem");
		
		if(this.getEnabled()){
			if(oEvent.isMarked("pks.ui5strap.bs3.DropdownMenu")){
				this.close();
				
				var menuListItem = Utils.findClosestParentControl(oEvent.srcControl, ListItemBase),
					hostUpdate = this.getUpdate();
				
				if(menuListItem){
					var DropdownMenuHostUpdate = ui5strapBs3Lib.DropdownMenuHostUpdate;
					if(hostUpdate === DropdownMenuHostUpdate.TextAndData
						|| hostUpdate === DropdownMenuHostUpdate.Text){
						
						this.setText(menuListItem.getText());
					}
					
					if(hostUpdate === DropdownMenuHostUpdate.TextAndData
						|| hostUpdate === DropdownMenuHostUpdate.Data){
						
						this.data(menuListItem.data());
					}
					
					if(hostUpdate !== DropdownMenuHostUpdate.None){
						oEvent.setMarked("pks.ui5strap.core.ISelectableItem.update");
					}
				}
			}
			else{
				this.toggle();
			}
		}
	};

	//Registering Event Handler
	//TODO Desktop / Mobile Test!!!
	if(ui5strapBs3Lib.support.touch){
		ListDropdownItemProto.ontap = ListDropdownItemProto._handlePress;
	}
	else{
		ListDropdownItemProto.onclick = ListDropdownItemProto._handlePress;
	}
	
	return ListDropdownItem;
});