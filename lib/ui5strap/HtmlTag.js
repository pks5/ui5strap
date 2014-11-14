/*
 * 
 * UI5Strap
 *
 * Universal Html Tag
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

	jQuery.sap.declare("ui5strap.HtmlTag");
	
	sap.ui.core.Control.extend("ui5strap.HtmlTag", {
		metadata : {

			library : "ui5strap",

			defaultAggregation : "content",
			
			properties : { 
				tagName : {
					type: "string",
					defaultValue: "div"
				},
				text : {
					type:"string", 
					defaultValue:""
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}
		}
	});

}());