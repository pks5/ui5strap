/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Heading
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", "../core/Utils", "../core/RenderUtils", "./PositionSupport"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, Utils, RenderUtils, PositionSupport){
	
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
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Heading
	 * 
	 */
	var Heading = ControlBase.extend("pks.ui5strap.bs3.Heading", /** @lends pks.ui5strap.bs3.Heading.prototype */ {
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
	/**
	 * @alias pks.ui5strap.bs3.Heading.prototype
	 */
	HeadingProto = Heading.prototype;
	
	PositionSupport.proto(HeadingProto);
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	HeadingProto._getStyleClassPrefix = function(){
		return "ui5strapHeading";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	HeadingProto._getStyleClassRoot = function(){
		var classAdd = "";
		
		if(this.isOptionEnabled("ListGroupItemHeading")){
			classAdd += " list-group-item-heading";
		}
		
		if(this.isOptionEnabled("MediaHeading")){
			classAdd += " media-heading";
		}
		
		return classAdd;
	};
	
	Utils.dynamicText(HeadingProto);
	
	return Heading;
});