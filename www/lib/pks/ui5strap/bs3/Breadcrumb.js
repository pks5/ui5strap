/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Breadcrumb
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
	 * Constructor for a new Breadcrumb instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap Breadcrumbs.
	 * @extends pks.ui5strap.core.ListBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Breadcrumb
	 * 
	 */
	var Breadcrumb = ListBase.extend("pks.ui5strap.bs3.Breadcrumb", {
		metadata : {

			library : "pks.ui5strap.bs3",
			
			defaultAggregation : "items",
			
			aggregations : { 
				items : {
					type : "pks.ui5strap.bs3.ListLinkItem",
					singularName: "item"
				} 
			}
			
		},
		
		renderer : function(rm, oControl) {
			var items = oControl.getItems();
		
			rm.write("<ol");
			rm.writeControlData(oControl);
			rm.addClass('breadcrumb');
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < items.length; i++){
				rm.renderControl(items[i]);
			}
			
			rm.write("</ol>");
		}
	}),
	BreadcrumbProto = Breadcrumb.prototype;
	
	return Breadcrumb;
});