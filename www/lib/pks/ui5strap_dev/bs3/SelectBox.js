/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.SelectBox
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", "./PositionSupport"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, PositionSupport){
	
	"use strict";
	
	var mMetaData = {
			interfaces : ["pks.ui5strap.core.IText", "pks.ui5strap.bs3.IInputGroupControl"],
			defaultAggregation : "items",

			library : "pks.ui5strap.bs3",
			
			properties : { 
				type : {
					type: "pks.ui5strap.bs3.SelectBoxType", 
					defaultValue: ui5strapBs3Lib.SelectBoxType.FormControl
				},
				selectedKey : {
					type:"string", 
					defaultValue:""
				},
				/*
				value : {
					type:"string", 
					defaultValue:""
				},
				*/
				size : {
					type: "pks.ui5strap.bs3.Size", 
					defaultValue: ui5strapBs3Lib.Size.Default
				},
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				trail : {
					type:"pks.ui5strap.core.TrailHtml", 
					defaultValue:ui5strapCoreLib.TrailHtml.Space
				}
			},

			aggregations : { 
				items : {
					type : "sap.ui.core.Item",
					singularName: "items"
				} 
			}

		};
	
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new SelectBox instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap select boxes.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.SelectBox
	 * 
	 */
	var SelectBox = ControlBase.extend("pks.ui5strap.bs3.SelectBox", /** @lends pks.ui5strap.bs3.SelectBox.prototype */ {
		metadata : mMetaData
	}),
	/**
	 * @alias pks.ui5strap.bs3.SelectBox.prototype
	 */
	SelectBoxProto = SelectBox.prototype;
	
	PositionSupport.proto(SelectBoxProto);
	
	SelectBoxProto.exit = function(){
		this.$().off();
	};
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	SelectBoxProto._getStyleClassPrefix = function(){
		return "ui5strapSelectBox";
	};
	
	var _getInputValue = function(_this){
		return _this.$().val();
	};
	
	var _onChange = function(_this){
		return function(ev){
			var sKey = _getInputValue(_this);
			if(sKey !== _this.getSelectedKey()){ 
				_this.setProperty("selectedKey", sKey, true);
			}
		}
	};

	SelectBoxProto.onAfterRendering = function(){
		this.$().on('change', _onChange(this));
	};

	SelectBoxProto.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$().off();
		}
	};

	SelectBoxProto.setSelectedKey = function(sKey, bSuppressInvalidate) {
		sKey = this.validateProperty("selectedKey", sKey);
		
		if (sKey != this.getValue()) {
			if (this.getDomRef()){
				this.setProperty("selectedKey", sKey, true);
				this.$().val(sKey);
			}
			else{
				this.setProperty("selectedKey", sKey, bSuppressInvalidate);
			}
		}
		
		return this;
	};

	return SelectBox;
});