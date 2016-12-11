/*
 * 
 * UI5Strap
 *
 * ui5strap.Heading
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

sap.ui.define(['./library', "pks/ui5strap/core/library", "pks/ui5strap/core/ControlBase", "pks/ui5strap/core/Utils", "pks/ui5strap/core/RenderUtils", "./PositionSupport"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, Utils, RenderUtils, PositionSupport){
	
	"use strict";
	
	var mMetaData = {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			properties : { 
				text : {
					type: "string", 
					defaultValue: ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				level : {
					type: "int", 
					defaultValue: 3
				},
				contentPlacement : {
					type:"pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.Start
				},
				
				type : {
					deprecated : true,
					type: "ui5strap.HeadingType", 
					defaultValue: ui5strapBs3Lib.HeadingType.Default
				}
				
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		};
	
	PositionSupport.meta(mMetaData);
	/**
	 * Constructor for a new Heading instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap headings.
	 * @extends ui5strap.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias ui5strap.Heading
	 * 
	 */
	var Heading = ControlBase.extend("ui5strap.Heading", {
		metadata : mMetaData,
		
		renderer : function(rm, oControl) {
			var level = oControl.getLevel();

			rm.write("<h" + level);
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			RenderUtils.renderContent(rm, oControl);
			    
			rm.write("</h" + level + ">");
		}
	}),
	HeadingProto = Heading.prototype;
	
	PositionSupport.proto(HeadingProto);
	
	Heading._typeToClass = {
		"PageHeader" : 'page-header',
		'ListGroupItemHeading' : 'list-group-item-heading',
		'MediaHeading' : 'media-heading'
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	HeadingProto._getStyleClassRoot = function(){
		var type = this.getType(),
			classAdd = "";
		if(ui5strapBs3Lib.HeadingType.Default !== type){
			classAdd = " " + Heading._typeToClass[type] + " " + this._getStyleClassType(type);
		}
		
		return classAdd;
	};
	
	Utils.dynamicText(HeadingProto);
	
	return Heading;
});