/*
 * 
 * UI5Strap
 *
 * ui5strap.Bar
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

(function(){

	jQuery.sap.declare("ui5strap.Bar");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.ControlBase.extend("ui5strap.Bar", {
		metadata : {
			interfaces : ["ui5strap.IBar"],
			
			"library" : "ui5strap",
			
			"properties" : {
				type : {
					type:"ui5strap.ContainerType", 
					defaultValue: ui5strap.ContainerType.Fluid
				},
				"inverse" : {
					type:"boolean", 
					defaultValue: false
				},
				"fullHeight" : {
					type:"boolean", 
					defaultValue: true
				}
			},
			
			"aggregations" : {
				"content":{
					"singularName" : "content"
				},
				
				//@deprecated
				"left" : {
					deprecated : true,
					"singularName" : "left"
				},
				"middle" : {
					deprecated : true,
					"singularName" : "middle"
				}, 
				"right" : {
					deprecated : true,
					"singularName" : "right"
				}  
			},
			
			"defaultAggregation" : "content"
		}
	}),
	BarProto = ui5strap.Bar.prototype; 

	BarProto._stylePrefix = "ui5strapBar";
	
	/**
	 * @Protected
	 * @Override
	 */
	BarProto._getStyleClassesRoot = function(){
		return "ui5strapBar ui5strapBar-type-" + this.getType() 
				+ (this.getInverse() ? ' ui5strapBar-flag-styleInverse' : ' ui5strapBar-flag-styleDefault')
				+ (this.getFullHeight() ? ' ui5strapBar-flag-fullHeight' : '');
	};
}());