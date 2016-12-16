/*
 * 
 * UI5Strap
 *
 * pks.ui5strap.bs3.Paragraph
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

sap.ui.define(['./library', "../core/library", "../core/ControlBase", "../core/Utils", "../core/RenderUtils"], function(ui5strapBs3Lib, ui5strapCoreLib, ControlBase, Utils, RenderUtils){
	
	"use strict";
	
	/**
	 * Constructor for a new Paragraph instance.
	 * 
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * 
	 * @class
	 * Control for creating text paragraphs.
	 * @extends pks.ui5strap.core.ControlBase
	 * 
	 * @author Jan Philipp Knoeller
	 * @version 1.0.0-RELEASE
	 * 
	 * @constructor
	 * @public
	 * @alias pks.ui5strap.bs3.Paragraph
	 * 
	 */
	var Paragraph = ControlBase.extend("pks.ui5strap.bs3.Paragraph", /** @lends pks.ui5strap.bs3.Paragraph.prototype */ {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "pks.ui5strap.bs3",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"pks.ui5strap.core.ContentPlacement",
					defaultValue : ui5strapCoreLib.ContentPlacement.End
				},
				severity : {
					type: "pks.ui5strap.bs3.Severity", 
					defaultValue: ui5strapBs3Lib.Severity.None
				},
				textAlign : {
					type : "pks.ui5strap.bs3.TextAlignment",
					defaultValue : ui5strapBs3Lib.TextAlignment.Default
				},
				formStatic : {
					type : "boolean",
					defaultValue:false
				}
			},
			aggregations : { 
				content : {
					singularName: "content",
					type:"pks.ui5strap.core.IText"
				}
			}

		},
		
		renderer : function(rm, oControl) {
			var content = oControl.getContent(),
				severity = oControl.getSeverity(),
				textAlign = oControl.getTextAlign();

			rm.write("<p");
			rm.writeControlData(oControl);
			rm.addClass(oControl._getStyleClass());
			rm.writeClasses();
			rm.write(">");
			
			RenderUtils.renderContent(rm, oControl);
			
			rm.write("</p>");
		}
	}),
	/**
	 * @alias pks.ui5strap.bs3.Paragraph.prototype
	 */
	ParagraphProto = Paragraph.prototype;
	
	/**
	 * Returns the style prefix of this control.
	 * @override
	 * @protected
	 */
	ParagraphProto._getStyleClassPrefix = function(){
		return "ui5strapParagraph";
	};
	
	ParagraphProto._getStyleClassDesign = function(){
		var styleClass = "",
			severity = this.getSeverity(),
			textAlign = this.getTextAlign();
		
		//CSS Classes
		if(ui5strapBs3Lib.Severity.None !== severity){
			//Severity for general text
			styleClass += " text-" + ui5strapBs3Lib.BSSeverity[severity];
		}
		
		if(ui5strapBs3Lib.TextAlignment.Default !== textAlign){
			styleClass += " ui5strap-textAlign-" + textAlign;
		}
		
		if(this.getFormStatic()){
			styleClass += " form-control-static";
		}
		
		return styleClass;
	};

	Utils.dynamicText(Paragraph.prototype);
	
	return Paragraph;
});