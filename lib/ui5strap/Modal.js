/*
 * 
 * UI5Strap
 *
 * Modal
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

	jQuery.sap.declare("ui5strap.Modal");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Modal", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				show : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				header : {
					singularName: "header"
				},
				body : {
					singularName: "body"
				},
				footer : {
					singularName: "footer"
				}
			}

		}
	});

	ui5strap.Modal.prototype.onAfterRendering = function(){

		var modalOptions = {
			show : this.getShow(),

			backdrop: false
		};

		this.$().modal(modalOptions);
	};

	ui5strap.Modal.prototype.show = function(){
		this.$().modal('show');
	};

}());