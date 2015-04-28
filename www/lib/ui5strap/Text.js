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

(function(){

	jQuery.sap.declare("ui5strap.Text");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Text", {
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
	});

	var TextProto = ui5strap.Text.prototype;

	TextProto.setText = function(newText){
		if(ui5strap.TextType.Default === this.getType()){
			this.setProperty('text', newText);
		}
		else{ 
			ui5strap.Utils.updateText(this, this.$(), newText);
		}
		
	};

	TextProto.setTitle = function(newTitle){
		if(ui5strap.TextType.Default === this.getType()){
			this.setProperty('title', newTitle, true);
		}
		else{ 
			ui5strap.Utils.updateAttribute(this, 'title', newTitle);
		}
	};

}());