/*
 * 
 * UI5Strap
 *
 * ListGroupItem
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

	jQuery.sap.declare("de_pksoftware.ui5strap.controls.ListGroupItem");

	sap.ui.core.Control.extend("de_pksoftware.ui5strap.controls.ListGroupItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "de.pksoftware.bootstrapui5",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				badge : {
					type:"string",
					defaultValue : ""
				},
				active : {
					type:"boolean",
					defaultValue : false
				}


			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			events:{
		        "tap":{},
		        "click" :{}
		    }

		}
	});

	de_pksoftware.ui5strap.controls.ListGroupItem.prototype.ontap = function(){
		this.fireTap();
	};

	de_pksoftware.ui5strap.controls.ListGroupItem.prototype.onclick = function(){
		this.fireClick();
	};

}());