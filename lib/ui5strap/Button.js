/*
 * 
 * UI5Strap
 *
 * Button
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

	jQuery.sap.declare("ui5strap.Button");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Button", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				type : {
					type: "ui5strap.ButtonType", 
					defaultValue: ui5strap.ButtonType.Button
				},
				action : {
					type: "ui5strap.Action", 
					defaultValue: ui5strap.Action.None
				},
				text : {
					type: "string", 
					defaultValue: ""
				},
				html : {
					type: "string", 
					defaultValue: ""
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				block : {
					type:"boolean",
					defaultValue:false
				},
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				trailingSpace : {
					type:"boolean", 
					defaultValue:true
				},
				navbarAlign : {
					type:"ui5strap.NavBarAlignment",
					defaultValue:ui5strap.NavBarAlignment.None
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			events:{
		        "click":{},
		        "tap":{}
		    }

		}
	});

	if(ui5strap.options.enableTapEvents){
		ui5strap.Button.prototype.ontap = function(){
			this.fireTap();
		};
	}

	if(ui5strap.options.enableClickEvents){
		ui5strap.Button.prototype.onclick = function(){
			this.fireClick();
		};
	}



}());