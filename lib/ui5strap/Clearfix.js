/*
 * 
 * UI5Strap
 *
 * Base Control for any kind of Row Content
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

	jQuery.sap.declare("ui5strap.Clearfix");
	jQuery.sap.require("ui5strap.AbstractColumn");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.AbstractColumn.extend("ui5strap.Clearfix", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				visibilityExtraSmall : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilitySmall : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilityMedium : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilityLarge : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				}
				
			}

		}
	});

}());