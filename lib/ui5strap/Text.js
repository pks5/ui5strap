/*
 * 
 * UI5Strap
 *
 * Text
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 *
 * Get the latest version: https://github.com/pks5/ui5strap
 * 
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
			ui5strap.Utils.updateText(this, newText);
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