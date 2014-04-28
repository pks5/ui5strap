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

	jQuery.sap.declare("ui5strap.ListGroupItem");

	sap.ui.core.Control.extend("ui5strap.ListGroupItem", {
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
				content : {
					singularName: "content"
				} 
			},
			events:{
		        tap:{},
		        click :{}
		    }

		}
	});

	ui5strap.ListGroupItem.prototype.ontap = function(){
		this.fireTap();
	};

	ui5strap.ListGroupItem.prototype.onclick = function(){
		this.fireClick();
	};

}());