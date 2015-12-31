/*
 * 
 * UI5Strap
 *
 * ui5strap.Icon
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

	var Icon = ControlBase.extend("ui5strap.Icon", {
		metadata : {

			library : "ui5strap",
			
			interfaces : ["ui5strap.IText"],
			
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
					type:"ui5strap.IconType",
					defaultValue:ui5strap.IconType.Default
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
					type : "ui5strap.IconSize",
					defaultValue : ui5strap.IconSize.Default
				},
				transform : {
					type : "ui5strap.IconTransform",
					defaultValue : ui5strap.IconTransform.Default
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}
		}
	}),
	IconProto = Icon.prototype;
	
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
			if(size !== ui5strap.IconSize.Default){
				styleClass += " " + modPrefix + this._sizeToClass[size];
			}
	
			if(transform !== ui5strap.IconTransform.Default){
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
		
		if(ui5strap.IconType.FormFeedback === this.getType()){
			styleClass += " form-control-feedback";
		}

		if(ui5strap.Severity.None !== severity){
			styleClass += " text-" + ui5strap.BSSeverity[severity];
		}
		
		return styleClass;
	};
	
	return Icon;
});