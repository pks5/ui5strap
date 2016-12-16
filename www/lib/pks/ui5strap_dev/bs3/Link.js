/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Link
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

			interfaces : ["pks.ui5strap.core.IText"],
			
			library : "pks.ui5strap.bs3",

			properties : { 
				
				text : {
					type:"string", 
					defaultValue : ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue : ""
				},
				
				contentPlacement : {
					type:"pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.Start
				},
				trail : {
					type:"pks.ui5strap.core.TrailHtml", 
					defaultValue : ui5strapCoreLib.TrailHtml.None
				},
				
				//Default functionality
				href : {
					type : "string", 
					defaultValue : ""
				},
				target  : {
					type : "string", 
					defaultValue : ""
				},	
				
				//@deprecated
				type : {
					deprecated : true,
					type : "pks.ui5strap.bs3.LinkType",
					defaultValue : ui5strapBs3Lib.LinkType.Default
				}
			},

			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			
			defaultAggregation : "content",
			
			events : {
				
				//TODO Rename 'tap' event to 'press' sometimes
		        tap : {allowPreventDefault : true}
		    }

		};
	
	PositionSupport.meta(mMetaData);
	/**
	 * Constructor for a new Link instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating links.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-SNAPSHOT
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Link
	 * 
	 */
	var Link = ControlBase.extend("pks.ui5strap.bs3.Link", /** @lends pks.ui5strap.bs3.Link.prototype */ {
		metadata : mMetaData,
		
		renderer : function(rm, oControl) {
			var href = oControl.getHref(),
				title = oControl.getTitle(),
				target = oControl.getTarget();
		
			rm.write("<a");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			    
			//Attributes
			
			if('' !== href){
				rm.writeAttribute('href', href);
			}
		
			if('' !== target){
				rm.writeAttribute('target', target);
			}
		
			if('' !== title){
		    	rm.writeAttribute('title', title);
		    }
		
			rm.write(">");
			
			//Content
			RenderUtils.renderContent(rm, oControl);
			
			rm.write("</a>");

			//Trail
			RenderUtils.renderTrail(rm, oControl);
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Link.prototype
	 */
	LinkProto = Link.prototype;
	
	PositionSupport.proto(LinkProto);
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	LinkProto._getStyleClassPrefix = function(){
		return "ui5strapLink";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	LinkProto._getStyleClassDesign = function(){
		var styleClass = "";
		
		var type = this.getType();
		if(this.isOptionEnabled("Thumbnail")){
			styleClass += " thumbnail";
		}
		
		return styleClass;
	};
	
	Utils.dynamicAttributes(
		LinkProto, 
		[
			"title",
			"href",
			"target"
		]
	);

	Utils.dynamicText(LinkProto);
	
	/**
	 * Handler for Tap / Click Events
	 * @Protected
	 */
	LinkProto._handlePress = function(oEvent) {
		//if (this.getEnabled()) {
		//Mark the event so parent Controls know that event has been handled already
		oEvent.setMarked();
		oEvent.setMarked("pks.ui5strap.bs3.Link");

			if (!this.fireTap() || !this.getHref()) {
				oEvent.preventDefault();
			}
		//} else {
		//	oEvent.preventDefault();
		//}
	};
	
	if(ui5strapBs3Lib.support.touch){
		LinkProto.ontap = LinkProto._handlePress;
	}
	else{
		LinkProto.onclick = LinkProto._handlePress;
	}
	
	return Link;

});