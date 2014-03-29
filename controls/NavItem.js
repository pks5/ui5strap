/*
 * 
 * UI5Strap
 *
 * NavItem
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.NavItem");

	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.NavItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "de_pksoftware.ui5strap",

			properties : { 
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
		        "click": {},
		        "tap" : {}
		    }

		}
	});

	de_pksoftware.ui5strap.controls.NavItem.prototype.ontap = function(){
		this.fireTap();
	};

	de_pksoftware.ui5strap.controls.NavItem.prototype.onclick = function(){
		this.fireClick();
	};

}());