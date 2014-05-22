/*
 * 
 * UI5Strap
 *
 * Icon
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

	jQuery.sap.declare("ui5strap.Icon");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Icon", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				iconGroup : {
					type:"string", 
					defaultValue:"fa"
				},
				modifierGroup : {
					type:"string", 
					defaultValue:"fa"
				},
				icon : {
					type:"string", 
					defaultValue:""
				},
				withinForm : {
					type:"boolean",
					defaultValue:false
				},
				fixedWidth : {
					type : "boolean",
					defaultValue : false
				},
				border : {
					type : "boolean",
					defaultValue : false
				},
				spin : {
					type : "boolean",
					defaultValue : false
				},
				inverse : {
					type : "boolean",
					defaultValue : false
				},
				size : {
					type : "ui5strap.IconSize",
					defaultValue : ui5strap.IconSize.Default
				},
				align : {
					type : "ui5strap.Alignment",
					defaultValue : ui5strap.Alignment.Default
				},
				transform : {
					type : "ui5strap.IconTransform",
					defaultValue : ui5strap.IconTransform.Default
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}
		}
	});

}());