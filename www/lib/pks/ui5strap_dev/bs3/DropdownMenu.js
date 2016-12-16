/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.DropdownMenu
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

sap.ui.define(['./library', '../core/ListBase', '../core/ListItemBase', "../core/Utils"], function(ui5strapBs3Lib, ListBase, ListItemBase, Utils){
	
	"use strict";
	
	/**
	 * Constructor for a new DropdownMenu instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap dropdown menus.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.DropdownMenu
	 * 
	 */
	var DropdownMenu = ListBase.extend("pks.ui5strap.bs3.DropdownMenu", /** @lends pks.ui5strap.bs3.DropdownMenu.prototype */ {
		metadata : {

			library : "pks.ui5strap.bs3",
			
			defaultAggregation : "items",
			
			properties : {
				
			},
	
			aggregations : { 
				items : {
					type : "pks.ui5strap.bs3.ListLinkItem",
					singularName: "item"
				} 
			}

		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.DropdownMenu.prototype
	 */
	DropdownMenuProto = DropdownMenu.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	DropdownMenuProto._getStyleClassPrefix = function(){
		return "ui5strapDropdownMenu";
	};
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 * @Override
	 */
	DropdownMenuProto._handlePress = function(oEvent){
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("pks.ui5strap.core.ISelectionProvider");
		oEvent.setMarked("pks.ui5strap.core.IItemsProvider");
		oEvent.setMarked("pks.ui5strap.bs3.DropdownMenu");
		
		//Find the closest item. Should be an item from the dropdown menu.
		var item = Utils.findClosestParentControl(oEvent.srcControl, ListItemBase);
		
		this.pressItem(oEvent.srcControl, item, false, this, item);
	};

	if(ui5strapBs3Lib.support.touch){
		DropdownMenuProto.ontap = DropdownMenuProto._handlePress;
	}
	else{
		DropdownMenuProto.onclick = DropdownMenuProto._handlePress;
	}
	
	return DropdownMenu;
});