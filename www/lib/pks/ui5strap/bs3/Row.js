/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Row
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
	 * Constructor for a new Row instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap grid rows.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Row
	 * 
	 */
	var Row = ControlBase.extend("pks.ui5strap.bs3.Row", {
		metadata : {

			// ---- object ----
			defaultAggregation : "columns",
			
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			
			properties : { 
				
				
			},
			
			aggregations : { 
				columns : {
					type : "pks.ui5strap.bs3.IColumn"
				}
			}

		},
		
		renderer : function(rm, oControl) {
			var content = oControl.getColumns();
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}
			
			rm.write("</div>");
		}
	}),
	RowProto = Row.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	RowProto._getStyleClassPrefix = function(){
		return "ui5strapRow";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	RowProto._getStyleClassDesign = function(){
		return " row";
	};

	return Row;
});