/*
 * 
 * UI5Strap
 *
 * ui5strap.Paragraph
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

	var Paragraph = ControlBase.extend("ui5strap.Paragraph", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
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
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.End
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				textAlign : {
					type : "ui5strap.TextAlignment",
					defaultValue : ui5strap.TextAlignment.Default
				},
				formStatic : {
					type : "boolean",
					defaultValue:false
				}
			},
			aggregations : { 
				content : {
					singularName: "content",
					type:"ui5strap.IText"
				}
			}

		}
	}),
	ParagraphProto = Paragraph.prototype;
	
	ParagraphProto._getStyleClassDesign = function(){
		var styleClass = "",
			severity = this.getSeverity(),
			textAlign = this.getTextAlign();
		
		//CSS Classes
		if(ui5strap.Severity.None !== severity){
			//Severity for general text
			styleClass += " text-" + ui5strap.BSSeverity[severity];
		}
		
		if(ui5strap.TextAlignment.Default !== textAlign){
			styleClass += " ui5strap-textAlign-" + textAlign;
		}
		
		if(this.getFormStatic()){
			styleClass += " form-control-static";
		}
		
		return styleClass;
	};

	ui5strap.Utils.dynamicText(Paragraph.prototype);
	
	return Paragraph;
});