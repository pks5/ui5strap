/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Progress
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
	 * Constructor for a new Progress instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap progress.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.1-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Progress
	 * 
	 */
	var Progress = ControlBase.extend("pks.ui5strap.bs3.Progress", /** @lends pks.ui5strap.bs3.Progress.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "bars",
				
			// ---- control specific ----
			library : "pks.ui5strap.bs3",

			properties : { 
				animate : {
					type:"boolean", 
					defaultValue:false
				},
				striped : {
					type:"boolean", 
					defaultValue:false
				}
			},
					
			aggregations : { 
				bars : {
					type : "pks.ui5strap.bs3.ProgressBar",
					singularName: "bar"
				} 
			}
		},
		
		renderer : function(rm, oControl) {
			var items = oControl.getBars();

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < items.length; i++){
				rm.renderControl(items[i]);
			}
			
			rm.write("</div>");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Progress.prototype
	 */
	ProgressProto = Progress.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ProgressProto._getStyleClassPrefix = function(){
		return "ui5strapProgress";
	};
	
	ProgressProto._getStyleClassDesign = function(){
		var styleClass = " progress";
		
		if(this.getAnimate()){
			styleClass += " active";
		}
		if(this.getStriped()){
			styleClass += " progress-striped";
		}
		return styleClass;
	};
	
	ProgressProto.getFirstBar = function(){
		var bars = this.getBars();
		if(bars.length === 0){
			return null;
		}
		return bars[0];
	};

	return Progress;
});