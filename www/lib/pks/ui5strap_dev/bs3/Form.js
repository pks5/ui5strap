/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Form
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

sap.ui.define(['./library', "../core/ControlBase", "./PositionSupport"], function(ui5strapBs3Lib, ControlBase, PositionSupport){
	
	"use strict";
	
	var mMetaData = {

		defaultAggregation : "content",
		
		library : "pks.ui5strap.bs3",

		properties : { 
			type : {
				type:"pks.ui5strap.bs3.FormType", 
				defaultValue:ui5strapBs3Lib.FormType.Default
			},
			action : {
				type:"string", 
				defaultValue:""
			},
			method : {
				type:"pks.ui5strap.bs3.FormMethod", 
				defaultValue:ui5strapBs3Lib.FormMethod.None
			}
		},
		aggregations : { 
			content : {
				singularName: "content"
			}
		},
		events : {
			submit : {

			}
		}

	};
	
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new Form instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap forms.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Form
	 * 
	 */
	var Form = ControlBase.extend("pks.ui5strap.bs3.Form", /** @lends pks.ui5strap.bs3.Form.prototype */ {
		metadata : mMetaData,
		
		renderer : function(rm, oControl) {
			var content = oControl.getContent(),
				action = oControl.getAction(),
				method = oControl.getMethod();

			rm.write("<form");
			
			rm.writeControlData(oControl);
			
			rm.addClass(oControl._getStyleClass());
			
			rm.writeClasses();
			
			//Attributes
			rm.writeAttribute('role', 'form');
			
			action && rm.writeAttribute('action', action);
			
			if(ui5strapBs3Lib.FormMethod.Default !== method && ui5strapBs3Lib.FormMethod.None !== method){
				rm.writeAttribute('method', method);
			}
			
			rm.write(">");
			
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}
			
			rm.write("</form>");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Form.prototype
	 */
	FormProto = Form.prototype;
	
	PositionSupport.proto(FormProto);
	
	var _typeToClass = {
		"Horizontal" : 'form-horizontal',
		"Inline" : 'form-inline',
	};
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	FormProto._getStyleClassPrefix = function(){
		return "ui5strapForm";
	};
	
	FormProto._getStyleClassDesign = function(){
		return  " " + _typeToClass[this.getType()];
	};
	
	FormProto.onAfterRendering = function(){
		var _this = this;
		this.$().on('submit', function(){
			_this.fireSubmit({});
			if(_this.getMethod() === ui5strapBs3Lib.FormMethod.None){
				return false;
			}
		});
	};
	
	return Form;
});