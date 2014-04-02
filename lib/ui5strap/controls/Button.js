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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Button");
	
	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Button", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",
			properties : { 
				"text" : {
					"type": "string", 
					"defaultValue": ""
				},
				"html" : {
					"type": "string", 
					"defaultValue": ""
				},
				"cssClass" : {
					"type": "string", 
					"defaultValue": ""
				},
				"type" : {
					"type": "string", 
					"defaultValue": "default"
				},
				"size" : {
					"type": "string", 
					"defaultValue": ""
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

	de_pksoftware.ui5strap.controls.Button.prototype.onclick = function(){
		this.fireClick();
	};

	de_pksoftware.ui5strap.controls.Button.prototype.ontap = function(){
		this.fireTap();
	};

}());