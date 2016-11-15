/*
 * 
 * UI5Strap
 *
 * ui5strap.Clearfix
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

	/**
	 * Constructor for a new Clearfix instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap grid clearfix.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.0
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Clearfix
	 * 
	 */
	var Clearfix = ControlBase.extend("ui5strap.Clearfix", {
		metadata : {
			interfaces : ["ui5strap.IText", "ui5strap.IColumn"],
			library : "ui5strap"
		},
		
		renderer : function(rm, oControl) {
			rm.write("<span");
			
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			rm.write("</span>");
		}
	}),
	ClearFixProto = Clearfix.prototype;
	
	ClearFixProto._getStyleClassDesign = function(){
		return " clearfix";
	};

});