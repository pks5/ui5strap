/*
 * 
 * UI5Strap
 *
 * Button
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

	jQuery.sap.declare("ui5strap.Button");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Button", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				type : {
					type: "ui5strap.ButtonType", 
					defaultValue: ui5strap.ButtonType.Button
				},
				bsAction : {
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				text : {
					type: "string", 
					defaultValue: ""
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			events:{
		        "click":{},
		        "tap":{}
		    }

		}
	});

	var ButtonPrototype = ui5strap.Button.prototype;

	ui5strap.Utils.dynamicAttributes(
		ButtonPrototype, 
		[
			"title"
		]
	);

	ui5strap.Utils.dynamicText(ButtonPrototype);

	ui5strap.Utils.dynamicClass(ButtonPrototype, 'selected', { 'true' : 'active' });

	if(ui5strap.options.enableTapEvents){
		ButtonPrototype.ontap = function(){
			this.fireTap();
		};
	}

	if(ui5strap.options.enableClickEvents){
		ButtonPrototype.onclick = function(){
			this.fireClick();
		};
	}



}());