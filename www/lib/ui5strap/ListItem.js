/*
 * 
 * UI5Strap
 *
 * ui5strap.ListItem
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

sap.ui.define(['./library', 'pks/ui5strap/core/ListItemBase', 'pks/ui5strap/core/SelectableSupport', "pks/ui5strap/core/Utils"], function(ui5strapBs3Lib, ListItemBase, SelectableSupport, Utils){
	
	"use strict";
	
	var _meta = {
			interfaces : [],
			
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
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				
				//@deprecated
				itemId : {
					deprecated: true,
					type:"string",
					defaultValue : ""
				}
			}

		};
	
	SelectableSupport.meta(_meta);
	
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
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.ListItem
	 * 
	 */
	var ListItem = ListItemBase.extend("ui5strap.ListItem", {
		metadata : _meta
	}),
	ListItemProto = ListItem.prototype;

	SelectableSupport.proto(ListItemProto);
	
	Utils.dynamicText(ListItemProto);

	return ListItem;
});