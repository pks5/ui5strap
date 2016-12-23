/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ListGroupItem
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

sap.ui.define(['./library', "../core/library", '../core/ListItemBase'], function(ui5strapBs3Lib, ui5strapCoreLib, ListItemBase){
	
	"use strict";
	
	/**
	 * Constructor for a new ListGroupItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating items for ListGroup controls.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.ListGroupItem
	 * 
	 */
	var ListGroupItem = ListItemBase.extend("pks.ui5strap.bs3.ListGroupItem", /** @lends pks.ui5strap.bs3.ListGroupItem.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
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
				badge : {
					type:"string",
					defaultValue : ""
				},
				icon : {
					type:"string",
					defaultValue : ""
				},
				severity : {
					type: "pks.ui5strap.bs3.Severity", 
					defaultValue: ui5strapBs3Lib.Severity.None
				}
			}
		}
	});
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ListGroupItem.prototype._getStyleClassPrefix = function(){
		return "ui5strapListGroupItem";
	};
	
	return ListGroupItem;
});