/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.PlainListItem
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

sap.ui.define(['./library', './ListItemBase', "./Utils", "./RenderUtils"], function(ui5strapCoreLib, ListItemBase, Utils, RenderUtils){
	
	"use strict";
	
	var _meta = {
			interfaces : [],
			
			library : "pks.ui5strap.core",

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
				}
			}

		};
	
	/**
	 * Constructor for a new ListItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating items for List controls.
	 * @extends pks.ui5strap.core.ListItemBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.core.PlainListItem
	 * 
	 */
	var ListItem = ListItemBase.extend("pks.ui5strap.core.PlainListItem", /** @lends pks.ui5strap.core.PlainListItem.prototype */ {
		metadata : _meta
	}),
	/**
	 * @alias pks.ui5strap.core.PlainListItem.prototype
	 */
	ListItemProto = ListItem.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ListItemProto._getStyleClassPrefix = function(){
		return "ui5strapPlainListItem";
	};
	
	Utils.dynamicText(ListItemProto);

	return ListItem;
});