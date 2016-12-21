/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Container
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

		library : "pks.ui5strap.bs3",
		
		properties : { 
				type : {
					type:"pks.ui5strap.bs3.ContainerType", 
					defaultValue: ui5strapBs3Lib.ContainerType.Default
				},
				
				severity : {
					type: "pks.ui5strap.bs3.Severity", 
					defaultValue: ui5strapBs3Lib.Severity.None
				},
				
				html : {
					type : "string",
					defaultValue : ""
				},
				
				fullHeight : {
					type : "boolean",
					defaultValue : false
				}
		},
		
		aggregations : { 
			content : {
				singularName: "content"
			}
		},
		
		defaultAggregation : "content"
		
	};
	
	PositionSupport.meta(mMetaData);
	
	/**
	 * Constructor for a new Container instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating Bootstrap grid containers.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.1-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Container
	 * 
	 */
	var Container = ControlBase.extend("pks.ui5strap.bs3.Container", /** @lends pks.ui5strap.bs3.Container.prototype */ {
		metadata : mMetaData,
		
		renderer : function(rm, oControl) {
			var content = oControl.getContent(),
				html = oControl.getHtml();

			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			//Render plain HTML
			html && rm.write(html);
			
			//Render Content
			for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
			}
			
			rm.write("</div>");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Container.prototype
	 */
	ContainerProto = Container.prototype;
	
	PositionSupport.proto(ContainerProto);
	
	ContainerProto._typeData = {
		Default : {
			className : ""
		},
		
		//Bootstrap Components
		Fluid : {
			className : "container-fluid"
		},
		Website : {
			className : "container"
		},
		Jumbotron : {
			className : "jumbotron"
		},
		Well : {
			className : "well"
		},
		WellLarge : {
			className : "well well-lg"
		},
		PageHeader : {
			className : "page-header"
		},
		
		//Deprecated
		FluidInset : {
			tagName : "div",
			className : "container-fluid"
		}
	};
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ContainerProto._getStyleClassPrefix = function(){
		return "ui5strapContainer";
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	ContainerProto._getStyleClassRoot = function(){
		var type = this.getType(),
			styleClass = " " + this._getStyleClassType(type)
						+ " " + this._typeData[type].className,
			
			severity = this.getSeverity();
		
		if(ui5strapBs3Lib.Severity.None !== severity){
			styleClass += " bg-" + ui5strapBs3Lib.BSSeverity[severity];
		}
		
		if(this.getFullHeight()){
			styleClass += " " + this._getStyleClassFlag("FullHeight");
		}
		
		return styleClass;
	};
	
	/**
	 * @deprecated
	 */
	ContainerProto.setVisibility = function(newVisibility, suppressInvalidate){
		this.setProperty("visibility", newVisibility, true);
		this.setVisibilityExtraSmall(newVisibility, suppressInvalidate);
		return this;
	}
	
	//Return Module Constructor
	return Container;
	
});