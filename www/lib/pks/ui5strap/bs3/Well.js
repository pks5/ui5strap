/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Well
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

sap.ui.define(['./library', "../core/ControlBase", "../core/Utils"], function(ui5strapBs3Lib, ControlBase, Utils){
	
	"use strict";
	
	/**
	 * Constructor for a new Well instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap wells.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Well
	 * 
	 */
	var Well = ControlBase.extend("pks.ui5strap.bs3.Well", /** @lends pks.ui5strap.bs3.Well.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type : "pks.ui5strap.bs3.Size",
					defaultValue:ui5strapBs3Lib.Size.Default
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		},
		renderer : function(rm, oControl) {
			var content = oControl.getContent(),
				text = oControl.getText();
	
			rm.write('<div');
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			text && rm.writeEscaped(text);
			
			//Content
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}
			
			rm.write("</div>");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Well.prototype
	 */
	WellProto = Well.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	WellProto._getStyleClassPrefix = function(){
		return "ui5strapWell";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	WellProto._getStyleClassDesign = function(){
		var styleClass = " well";
		var size = this.getSize();
		if(ui5strapBs3Lib.Size.Default !== size){
			styleClass += " well-" + ui5strapBs3Lib.BSSize[size];
		}
		return styleClass;
	};
	
	Utils.dynamicText(WellProto);
	
	return Well;
});