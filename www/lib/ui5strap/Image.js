/*
 * 
 * UI5Strap
 *
 * ui5strap.Image
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

	var ImageControl = ControlBase.extend("ui5strap.Image", {
		metadata : {
			interfaces : ["ui5strap.IText"],
			
			library : "ui5strap",
			properties : { 
				src : {
					type:"string", 
					defaultValue:""
				},
				mpath : {
					type:"string", 
					defaultValue:""
				},
				ext : {
					type : "string",
					defaultValue : "jpg"
				},
				
				responsive : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				alt : {
					type:"string", 
					defaultValue:""
				},
				width: {
					type:"int",
					defaultValue:-1
				},
				height: {
					type:"int",
					defaultValue:-1
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.None
				},
				shape: {
					type:"ui5strap.ImageShape",
					defaultValue:ui5strap.ImageShape.Default
				},
				
				//@deprecated
				type: {
					deprecated : true,
					type:"ui5strap.ImageType",
					defaultValue:ui5strap.ImageType.Default
				}
			}

		}
	}),
	ImageProto = ImageControl.prototype;
	
	ImageProto._shapeToClass = {
		Rounded : 'img-rounded',
		Circle : 'img-circle',
		Thumbnail : 'img-thumbnail'
	};
	
	ImageProto._typeToClass = {
		MediaObject : "media-object",
		Responsive : "img-responsive"
	};
	
	ImageProto._getStyleClassDesign = function(){
		var styleClass = "",
			shape = this.getShape(),
			type = this.getType();
		
		if(this.getResponsive()){
			styleClass += " img-responsive";
		}
		if(this._shapeToClass[shape]){
			styleClass += " " + this._shapeToClass[shape];
		}
		if(this._typeToClass[type]){
			styleClass += " " + this._typeToClass[type];
		}
		
		return styleClass;
	};
	
	return ImageControl;
});