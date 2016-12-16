/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ListLinkItem
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

sap.ui.define(['./library', "../core/library", '../core/ListItemBase', "../core/Utils"], function(ui5strapBs3Lib, ui5strapCoreLib, ListItemBase, Utils){
	
	"use strict";
	
	/**
	 * Constructor for a new ListLinkItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating list items with containing links.
	 * @extends pks.ui5strap.core.ListItemBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.ListLinkItem
	 * 
	 */
	var ListLinkItem = ListItemBase.extend("pks.ui5strap.bs3.ListLinkItem", /** @lends pks.ui5strap.bs3.ListLinkItem.prototype */ {
		metadata : {
			library : "pks.ui5strap.bs3",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.Start
				},
				title : {
					type:"string", 
					defaultValue:""
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			}
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.ListLinkItem.prototype
	 */
	ListLinkItemProto = ListLinkItem.prototype;

	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ListLinkItemProto._getStyleClassPrefix = function(){
		return "ui5strapListLinkItem";
	};
	
	ListLinkItemProto.setText = function(newText){
		Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
	};
	
	return ListLinkItem;
});