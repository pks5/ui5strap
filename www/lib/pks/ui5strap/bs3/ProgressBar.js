/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.ProgressBar
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
	 * Constructor for a new ProgressBar instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap progress bar.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.ProgressBar
	 * 
	 */
	var ProgressBar = ControlBase.extend("pks.ui5strap.bs3.ProgressBar", /** @lends pks.ui5strap.bs3.ProgressBar.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",

			properties : { 
				value : {
					type:"int", 
					defaultValue:0
				}, 
				minValue : {
					type:"int", 
					defaultValue:0
				},
				maxValue : {
					type:"int", 
					defaultValue:100
				},  
				severity : {
					type:"pks.ui5strap.bs3.Severity", 
					defaultValue:ui5strapBs3Lib.Severity.None
				},
				labelFormat : {
					type:"string", 
					defaultValue:""
				}
			}
		},
		
		renderer : function(rm, oControl) {
			var labelFormat = oControl.getLabelFormat(),
				value = oControl.getValue(),
				maxValue = oControl.getMaxValue(),
				minValue = oControl.getMinValue(),
				percentage = oControl.getProgress();
			
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.writeAttribute('style', 'width:' + percentage + '%');
			rm.write(">");
			
				if('' !== labelFormat){
					rm.write(
						labelFormat
						.replace('[val]', value)
						.replace('[min]', minValue)
						.replace('[max]', maxValue)
						.replace('[left]', maxValue - value)
						.replace('[progress]', percentage));
				}

			rm.write("</div>");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.ProgressBar.prototype
	 */
	ProgressBarProto = pks.ui5strap.bs3.ProgressBar.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ProgressBarProto._getStyleClassPrefix = function(){
		return "ui5strapProgressBar";
	};
	
	ProgressBarProto._getStyleClassDesign = function(){
		var styleClass = " progress-bar",
			type = this.getSeverity();
		
		if(ui5strapBs3Lib.Severity.None !== type){
			styleClass += " progress-bar-" + ui5strapBs3Lib.BSSeverity[type];
		}

		return styleClass;
	};
	
	ProgressBarProto.setValue = function(newValue){
		if(this.getDomRef()){
			if(newValue > this.getMaxValue() || newValue < this.getMinValue()){
				throw new Error('Value out of bounds.');
			}

			this.setProperty('value', newValue, true);
			this.$().css('width', this.getProgress() + '%');
			
		}
		else{
			this.setProperty('value', newValue);
		}
	};

	ProgressBarProto.getProgress = function(){
		var percentage = ( this.getValue() - this.getMinValue() ) / ( this.getMaxValue() - this.getMinValue() ) * 100;
		return Math.round(percentage * 100) / 100;
	};
	
	return ProgressBar;
});