/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.PlainList
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

sap.ui.define(['./library', './ListBase'], function(ui5strapCoreLib, ListBase){
	
	"use strict";
	
	/**
	 * Constructor for a new List instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating plain lists.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.core.PlainList
	 * 
	 */
	var List = ListBase.extend("pks.ui5strap.core.PlainList", /** @lends pks.ui5strap.core.PlainList.prototype */ {
		metadata : {

			library : "pks.ui5strap.core",
			
			defaultAggregation : "items",
			
			properties : { 
				type : {
					type:"pks.ui5strap.core.PlainListType", 
					defaultValue:ui5strapCoreLib.PlainListType.Unordered
				}
			},
			
			aggregations : { 
				items : {
					type : "pks.ui5strap.core.PlainListItem",
					singularName: "item"
				} 
			}

		},
		
		renderer : function(rm, oControl) {
			var items = oControl.getItems();
			
			var tagName = 'ul';
			if(oControl.getType() === ui5strapCoreLib.PlainListType.Ordered){
				tagName = 'ol';
			}
		
			rm.write("<" + tagName);
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < items.length; i++){
				rm.renderControl(items[i]);
			}
			
			rm.write("</" + tagName + ">");
		}
	}),
	/**
	 * @alias pks.ui5strap.core.PlainList.prototype
	 */
	ListProto = List.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ListProto._getStyleClassPrefix = function(){
		return "ui5strapPlainList";
	};
	
	return List;
});