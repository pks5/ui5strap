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

sap.ui.define(['./library', "pks/ui5strap/core/library", "pks/ui5strap/core/ControlBase", "pks/ui5strap/core/RenderUtils", "./PositionSupport"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, RenderUtils, PositionSupport){
	
	"use strict";
	
	var mMetaData = {
			interfaces : ["pks.ui5strap.core.IText"],
			
			library : "pks.ui5strap.bs3",
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
					type:"pks.ui5strap.core.TrailHtml", 
					defaultValue:ui5strapCoreLib.TrailHtml.None
				},
				shape: {
					type:"ui5strap.ImageShape",
					defaultValue:ui5strapBs3Lib.ImageShape.Default
				},
				
				//@deprecated
				type: {
					deprecated : true,
					type:"ui5strap.ImageType",
					defaultValue:ui5strapBs3Lib.ImageType.Default
				}
			}

		};
	
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new Image instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating images.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Image
	 * 
	 */
	var ImageControl = ControlBase.extend("ui5strap.Image", {
		metadata : mMetaData,
		
		renderer : function(rm, oControl) {
			var src = oControl.getSrc(),
				mpath = oControl.getMpath(),
				mext = oControl.getExt(),

				width = oControl.getWidth(),
				height = oControl.getHeight(),
				
				title = oControl.getTitle();

			if(mpath){
				src = jQuery.sap.getModulePath(mpath, '.' + mext);
			}

			rm.write("<img");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			
			src && rm.writeAttribute('src', src);
			
			title && rm.writeAttribute('title', title);
			
			if(-1 !== width){
				rm.writeAttribute('width', width);
			}
			
			if(-1 !== height){
				rm.writeAttribute('height', height);
			}
			
			rm.writeAttribute('alt', oControl.getAlt());
			
			rm.write("/>");

			RenderUtils.renderTrail(rm, oControl);
		}
	}),
	ImageProto = ImageControl.prototype;
	
	PositionSupport.proto(ImageProto);
	
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