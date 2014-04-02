/*
 * 
 * UI5Strap
 *
 * Link
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.Link");

	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.Link", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				cssClass  : {
					type:"string", 
					defaultValue : ""
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				}
			},
			events:{
		        "click": {},
		        "tap" : {}
		    }

		}
	});

	de_pksoftware.ui5strap.controls.Link.prototype.onclick = function(){
		this.fireClick();
	};

	de_pksoftware.ui5strap.controls.Link.prototype.ontap = function(){
		this.fireTap();
	};

}());