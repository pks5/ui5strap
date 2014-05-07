/*
 * 
 * UI5Strap
 *
 * NavBar
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

	jQuery.sap.declare("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.includes.collapse");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.NavBar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "collapse",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				brand : {
					type:"string", 
					defaultValue:null
				},
				type : {
					type:"ui5strap.NavBarType", 
					defaultValue:ui5strap.NavBarType.Default
				},
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				position : {
					type:"ui5strap.NavBarPosition", 
					defaultValue: ui5strap.NavBarPosition.Default
				},
				toggleButtonHtml : {
					type : "string",
					defaultValue : '<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>'
				}
			},

			aggregations : { 
				
				collapse : {
					singularName: "collapse"
				}
			},

			events : {
				brandClick : {},
				brandTap : {}
			}

		}
	});

	var NavBarProto = ui5strap.NavBar.prototype;

	NavBarProto.onclick = function(oEvent){
		
		if(jQuery(oEvent.target).hasClass('navbar-brand')){
			this.fireBrandClick({ brand : oEvent.target });
		}
	};

	NavBarProto.ontap = function(oEvent){
		
		if(jQuery(oEvent.target).hasClass('navbar-brand')){
			this.fireBrandTap({ brand : oEvent.target });
		}
	};

}());