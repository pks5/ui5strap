/*
 * 
 * UI5Strap
 *
 * ui5strap.Nav
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

sap.ui.define(['./library', 'pks/ui5strap/core/ListBase', "./PositionSupport"], function(library, ListBase, PositionSupport){
	
	var mMetaData = {

			library : "ui5strap",
			
			defaultAggregation : "items",
			
			properties : { 
				type : {
					type:"ui5strap.NavType", 
					defaultValue:ui5strap.NavType.Default
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListItem",
					singularName: "item"
				} 
			}

		};
	
	PositionSupport.meta(mMetaData);
	/**
	 * Constructor for a new Nav instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Boostrap nav lists.
	 * @extends pks.ui5strap.core.ListBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Nav
	 * 
	 */
	var Nav = ListBase.extend("ui5strap.Nav", {
		metadata : mMetaData,
		
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
	NavProto = ui5strap.Nav.prototype;
	
	PositionSupport.proto(NavProto);
	
	var _typeToClass = {
		Default : "nav-default",
		Tabs : "nav-tabs",
		Pills : "nav-pills",
		PillsStacked : "nav-pills nav-stacked",
		PillsJustified : "nav-pills nav-justified",
		TabsJustified : "nav-tabs nav-justified"
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	NavProto._getStyleClassDesign = function(){
		var styleClass = " nav " + _typeToClass[this.getType()];
		return styleClass;
	};
	
	return Nav;
});