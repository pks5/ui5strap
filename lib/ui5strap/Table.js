/*
 * 
 * UI5Strap
 *
 * Table
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

	jQuery.sap.declare("ui5strap.Table");
	jQuery.sap.require("sap.ui.core.Control");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Table", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				striped : {
					type : "boolean",
					defaultValue : false
				},
				bordered : {
					type : "boolean",
					defaultValue : false
				},
				condensed : {
					type : "boolean",
					defaultValue : false
				},
				hover : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				head : {
					type : "ui5strap.TableRow",
					multiple : false
				}, 
				body : {
					type : "ui5strap.TableRow"
				} 
			}

		}
	});

	ui5strap.Table.prototype.init = function(){

	};

}());