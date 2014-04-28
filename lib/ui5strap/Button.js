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
				text : {
					type: "string", 
					defaultValue: ""
				},
				html : {
					type: "string", 
					defaultValue: ""
				},
				cssClass : {
					type: "string", 
					defaultValue: "",
					deprecated : true
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
				active : {
					type:"boolean", 
					defaultValue:false
				}, 
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				trailingSpace : {
					type:"boolean", 
					defaultValue:true
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

	ui5strap.Button.prototype.onclick = function(){
		this.fireClick();
	};

	ui5strap.Button.prototype.ontap = function(){
		this.fireTap();
	};

}());