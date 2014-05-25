/*
 * 
 * UI5Strap
 *
 * ListGroup
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

	jQuery.sap.declare("ui5strap.ListGroup");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListGroupItem");

	ui5strap.ListBase.extend("ui5strap.ListGroup", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				container : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListGroupItem",
					singularName: "item"
				} 
			}

		}
	});

}());