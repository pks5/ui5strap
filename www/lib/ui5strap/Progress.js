/*
 * 
 * UI5Strap
 *
 * ui5strap.Progress
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

sap.ui.define(['./library', './ControlBase'], function(library, ControlBase){

	var Progress = ControlBase.extend("ui5strap.Progress", {
		metadata : {

			// ---- object ----
			defaultAggregation : "bars",
				
			// ---- control specific ----
			library : "ui5strap",

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
					type : "ui5strap.ProgressBar",
					singularName: "bar"
				} 
			}
		}
	}),
	ProgressProto = Progress.prototype;

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