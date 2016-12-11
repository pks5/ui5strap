/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Bar
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

sap.ui.define(['./library', "../core/ControlBase"], function(ui5strapBs3Lib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new Bar instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating bars.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Bar
	 * 
	 */
	var Bar = ControlBase.extend("pks.ui5strap.bs3.Bar", /** @lends pks.ui5strap.bs3.Bar.prototype */ {
		metadata : {
			interfaces : ["pks.ui5strap.bs3.IBar"],
			
			"library": "pks.ui5strap.bs3",
			
			"properties" : {
				/**
				 * The type of the Bar.
				 */
				type : {
					type:"pks.ui5strap.bs3.BarType", 
					defaultValue: ui5strapBs3Lib.BarType.Fluid
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
	/**
	 * @alias pks.ui5strap.bs3.Bar.prototype
	 */
	BarProto = Bar.prototype; 

	/**
	 * Returns the root style class.
	 * 
	 * @returns {string} The style class string.
	 * @protected
	 * @override
	 */
	BarProto._getStyleClassRoot = function(){
		return " ui5strapBar-type-" + this.getType() 
				+ (this.getInverse() ? ' ui5strapBar-style-Inverse' : ' ui5strapBar-style-Default')
				+ (this.getFullHeight() ? ' ui5strapBar-flag-FullHeight' : '');
	};
	
	/**
	 * Returns the style class for the specified part.
	 * 
	 * @param partName {string} The name of the part.
	 * @returns {string} The style class string.
	 * @protected
	 * @override
	 */
	BarProto._getStyleClassPart = function(partName){
		var partClassName = ControlBase.prototype._getStyleClassPart.call(this, partName);
		if("inner" === partName && this.getType() === ui5strapBs3Lib.BarType.Fluid){
			partClassName += " container-fluid";
		}
		return partClassName;
	};
	
	return Bar;
});