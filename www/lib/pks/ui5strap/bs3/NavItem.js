/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.NavItem
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

sap.ui.define(['./library', './ListLinkItem'], function(ui5strapBs3Lib, ListLinkItem){
	
	"use strict";
	
	/**
	 * Constructor for a new NavItem instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating items for a Bootstrap nav list.
	 * @extends pks.ui5strap.bs3.ListLinkItem
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.NavItem
	 * 
	 */
	var NavItem = ListLinkItem.extend("pks.ui5strap.bs3.NavItem", /** @lends pks.ui5strap.bs3.NavItem.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			properties : { 
				badge : {
					type:"string",
					defaultValue : ""
				}
			}
		}
	});
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	NavItem.prototype._getStyleClassPrefix = function(){
		return "ui5strapNavItem";
	};
	
	return NavItem;
});