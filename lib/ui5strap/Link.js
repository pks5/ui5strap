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

	jQuery.sap.declare("ui5strap.Link");
	jQuery.sap.require("ui5strap.library");
	

	sap.ui.core.Control.extend("ui5strap.Link", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				type : {
					type : "ui5strap.LinkType",
					defaultValue : ui5strap.LinkType.Default
				},
				bsAction : {
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.None
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			},

			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			events:{
		        click: {},
		        tap : {}
		    }

		}
	});

	ui5strap.Utils.dynamicAttributes(
		ui5strap.Link.prototype, 
		[
			"title",
			"href",
			"target"
		]
	);

	ui5strap.Utils.dynamicText(ui5strap.Link.prototype);

	if(ui5strap.options.enableTapEvents){
		ui5strap.Link.prototype.ontap = function(){
			this.fireTap();
		};
	}

	if(ui5strap.options.enableClickEvents){
		ui5strap.Link.prototype.onclick = function(){
			this.fireClick();
		};
	}

}());