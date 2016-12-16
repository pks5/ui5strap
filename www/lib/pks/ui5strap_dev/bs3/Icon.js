/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Icon
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", "../core/RenderUtils", "./PositionSupport"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, RenderUtils, PositionSupport){
	
	"use strict";
	
	var mMetaData = {

			library : "pks.ui5strap.bs3",
			
			interfaces : ["pks.ui5strap.core.IText", "pks.ui5strap.bs3.IInputGroupAddon"],
			
			properties : { 
				iconSet : {
					type:"string", 
					defaultValue:"fa"
				},
				icon : {
					type:"string", 
					defaultValue:""
				},
				type : {
					type:"pks.ui5strap.bs3.IconType",
					defaultValue:ui5strapBs3Lib.IconType.Default
				},
				fixedWidth : {
					type : "boolean",
					defaultValue : false
				},
				border : {
					type : "boolean",
					defaultValue : false
				},
				spin : {
					type : "boolean",
					defaultValue : false
				},
				inverse : {
					type : "boolean",
					defaultValue : false
				},
				size : {
					type : "pks.ui5strap.bs3.IconSize",
					defaultValue : ui5strapBs3Lib.IconSize.Default
				},
				transform : {
					type : "pks.ui5strap.bs3.IconTransform",
					defaultValue : ui5strapBs3Lib.IconTransform.Default
				},
				severity : {
					type: "pks.ui5strap.bs3.Severity", 
					defaultValue: ui5strapBs3Lib.Severity.None
				},
				trail : {
					type:"pks.ui5strap.core.TrailHtml", 
					defaultValue:ui5strapCoreLib.TrailHtml.Space
				}
			}
		};
	
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new Icon instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap and Font Awesome icons.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Icon
	 * 
	 */
	var Icon = ControlBase.extend("pks.ui5strap.bs3.Icon", /** @lends pks.ui5strap.bs3.Icon.prototype */ {
		metadata : mMetaData,
		
		renderer : function(rm, oControl) {
			rm.write("<span");
			rm.writeControlData(oControl);
			
			rm.addClass(oControl._getStyleClass());
			
			rm.writeClasses();
			rm.write(">");
			rm.write("</span>");

			RenderUtils.renderTrail(rm, oControl);
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Icon.prototype
	 */
	IconProto = Icon.prototype;
	
	PositionSupport.proto(IconProto);
	
	IconProto._sizeToClass = {
	    Large : "lg",
	    X2 : "2x",
	    X3 : "3x",
	    X4 : "4x",
	    X5 : "5x"
	 };

	IconProto._transformToClass = {
	    Rotate90 : "rotate-90",
	    Rotate180 : "rotate-180",
	    Rotate270 : "rotate-270",
	    FlipHorizontal : "flip-horizontal",
	    FlipVertical : "flip-vertical"
	  };
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	IconProto._getStyleClassPrefix = function(){
		return "ui5strapIcon";
	};
	  
	/**
	 * @Protected
	 * @Override
	 */
	IconProto._getStyleClassDesign = function(){
		var iconGroup = this.getIconSet(),
			size = this.getSize(),
			transform = this.getTransform(),
			severity = this.getSeverity(),
			prefix = iconGroup + '-',
			modPrefix = 'fa-',
			styleClass = " " + iconGroup
				+ " " + prefix + this.getIcon();
		
		//Font Awesome only
		if(prefix === modPrefix){
			if(size !== ui5strapBs3Lib.IconSize.Default){
				styleClass += " " + modPrefix + this._sizeToClass[size];
			}
	
			if(transform !== ui5strapBs3Lib.IconTransform.Default){
				styleClass += " " + modPrefix + this._transformToClass[transform];
			}
	
			if(this.getFixedWidth()){
				styleClass += " " + modPrefix + 'fw';
			}
	
			if(this.getSpin()){
				styleClass += " " + modPrefix + 'spin';
			}
	
			if(this.getInverse()){
				styleClass += " " + modPrefix + 'inverse';
			}
	
			if(this.getBorder()){
				styleClass += " " + modPrefix + 'border';
			}
		}
		
		if(ui5strapBs3Lib.IconType.FormFeedback === this.getType()){
			styleClass += " form-control-feedback";
		}

		if(ui5strapBs3Lib.Severity.None !== severity){
			styleClass += " text-" + ui5strapBs3Lib.BSSeverity[severity];
		}
		
		return styleClass;
	};
	
	return Icon;
});