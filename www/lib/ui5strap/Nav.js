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

sap.ui.define(['./library', './ListBase'], function(library, ListBase){

	var Nav = ListBase.extend("ui5strap.Nav", {
		metadata : {

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

		}
	}),
	NavProto = ui5strap.Nav.prototype;
	
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