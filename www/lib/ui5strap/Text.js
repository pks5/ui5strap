/*
 * 
 * UI5Strap
 *
 * ui5strap.Text
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

	var Text = ControlBase.extend("ui5strap.Text", {
		metadata : {
			interfaces : ["ui5strap.IText"],
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
				type : {
					type:"ui5strap.TextType", 
					defaultValue:ui5strap.TextType.Default
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				textAlign : {
					type : "ui5strap.TextAlignment",
					defaultValue : ui5strap.TextAlignment.Default
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	}),
	TextProto = Text.prototype;
	
	TextProto._typeToTag = {
		Default : { 
			tagName : "span",
			className : null
		},
		Strong : {
			tagName : "strong",
			className : null
		},
		Emphasized : {
			tagName : "em",
			className : null
		},
		Paragraph : {
			tagName : "p",
			className : null
		},
		Blockquote : {
			tagName : "blockquote",
			className : null
		},
		Quote : {
			tagName : "q",
			className : null
		},
		Preformatted : {
			tagName : "pre",
			className : null
		},
		Code : {
			tagName : "code",
			className : null
		},
		Small : {
			tagName : "small",
			className : null
		},
		Lead : {
			tagName : "p",
			className : "lead"
		},
		Abbreviation : {
			tagName : "abbr",
			className : null
		},
		HelpBlock : {
			tagName : "p",
			className : "help-block"
		},
		FormStatic : {
			tagName : "p",
			className : "form-static"
		},
		Label : {
			tagName : "span",
			className : "label"
		},
		Badge : {
			tagName : "span",
			className : "badge"
		},
		
		//Deprecated
		Phrasing : {
			tagName : "span",
			className : null
		}
		
	};
	
	/**
	 * @Protected
	 * @Override
	 */
	TextProto._getStyleClassRoot = function(){
		var styleClass = "",
			severity = this.getSeverity(),
			textAlign = this.getTextAlign(),
			type = this.getType(),
			tagData = this._typeToTag[type];
		
		//CSS Classes
		if(ui5strap.TextType.Label === type){
			//Severity for labels
			styleClass += " label-" + ui5strap.BSSeverity[ui5strap.Severity.None === severity ? ui5strap.Severity.Default : severity];
		}
		else if(ui5strap.Severity.None !== severity){
			//Severity for general text
			styleClass += " text-" + ui5strap.BSSeverity[severity];
		}
		
		if(ui5strap.TextAlignment.Default !== textAlign){
			styleClass += " ui5strap-textAlign-" + textAlign;
		}
		
		if(tagData.className){
			styleClass += " " + tagData.className;
		}
		
		return styleClass;
	};

	/**
	 * Dynamic text
	 * @Override
	 * @Public
	 */
	TextProto.setText = function(newText, suppressInvalidate){
		ui5strap.Utils.updateText(this, this.$(), newText, suppressInvalidate);
	};

	/**
	 * Dynamic title
	 * @Override
	 * @Public
	 */
	TextProto.setTitle = function(newTitle, suppressInvalidate){
		ui5strap.Utils.updateAttribute(this, 'title', newTitle, suppressInvalidate);
	};

	return Text;
});