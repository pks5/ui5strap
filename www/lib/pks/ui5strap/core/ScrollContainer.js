/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.core.ScrollContainer
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

sap.ui.define(['./library', "./ControlBase"], function(ui5strapCoreLib, ControlBase){
	
	"use strict";
	
	/**
	 * Constructor for a new ScrollContainer instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating containers with scrolling abilities.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 0.11.6
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.core.ScrollContainer
	 * 
	 */
	var ScrollContainer = ControlBase.extend("pks.ui5strap.core.ScrollContainer", {
		
		metadata : {

			library : "pks.ui5strap.core",

			properties : { 
				vertical : {
					type:"boolean", 
					defaultValue:false
				},
				horizontal : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			
			defaultAggregation : "content"
		},
		
		renderer : function(rm, oControl){
			var content = oControl.getContent();

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			for(var i = 0; i < content.length; i++){ 
					rm.renderControl(content[i]);
			}
			
			rm.write("</div>");
		}
	
	}),
	ScrollContainerProto = ScrollContainer.prototype;
	
	/**
	 * @Protected
	 * @Override
	 */
	ScrollContainerProto._getStyleClassRoot = function(){
		var styleClass = "";
		if(this.getHorizontal()){
			styleClass += " " + this._getStyleClassFlag("Horizontal");
		}
		
		if(this.getVertical()){
			styleClass += " " + this._getStyleClassFlag("Vertical");
		}
		
		return styleClass;
	};
	
	/**
	 * @Override
	 */
	ScrollContainerProto.onBeforeRendering = function(){
		if(this.getDomRef()){
			this._scrollTop = this.getDomRef().scrollTop;
		}
		else{
			this._scrollTop =  null;
		}
	};

	/**
	 * @Override
	 */
	ScrollContainerProto.onAfterRendering = function(){
		if(this._scrollTop){
			this.getDomRef().scrollTop = this._scrollTop;
		}
	};
	
	//Return Module Constructor
	return ScrollContainer;
});