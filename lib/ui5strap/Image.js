/*
 * 
 * UI5Strap
 *
 * Image
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

	jQuery.sap.declare("ui5strap.Image");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Image", {
		metadata : {

			library : "ui5strap",
			properties : { 
				src : {
					type:"string", 
					defaultValue:""
				},
				dataSrc : {
					type:"string", 
					defaultValue:""
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				responsive : {
					type : "boolean",
					defaultValue : true
				},
				alt : {
					type:"string", 
					defaultValue:""
				},
				width: {
					type:"int",
					defaultValue:-1
				},
				height: {
					type:"int",
					defaultValue:-1
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.None
				},
				shape: {
					type:"ui5strap.ImageShape",
					defaultValue:ui5strap.ImageShape.Default
				}
			}

		}
	});

}());