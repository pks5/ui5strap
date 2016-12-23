/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Pagination
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

sap.ui.define(['./library', './ListBase'], function(ui5strapBs3Lib, ListBase){
	
	"use strict";
	
	/**
	 * Constructor for a new Pagination instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap paginations.
	 * @extends pks.ui5strap.core.ListBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.2-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Pagination
	 * 
	 */
	var Pagination = ListBase.extend("pks.ui5strap.bs3.Pagination", /** @lends pks.ui5strap.bs3.Pagination.prototype */ {
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
		},
		
		renderer : function(rm, oControl) {
			var items = oControl.getItems();
		
			rm.write("<ul");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < items.length; i++){
				rm.renderControl(items[i]);
			}
			
			rm.write("</ul>");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Pagination.prototype
	 */
	PaginationProto = Pagination.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	PaginationProto._getStyleClassPrefix = function(){
		return "ui5strapPagination";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	PaginationProto._getStyleClassDesign = function(){
		var styleClass = " pagination";
		return styleClass;
	};
	
	return Pagination;
});