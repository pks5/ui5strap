/*
 * 
 * UI5Strap
 *
 * Table column
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

	jQuery.sap.declare("ui5strap.TableColumn");
	jQuery.sap.require("sap.ui.core.Control");


	sap.ui.core.Element.extend("ui5strap.TableColumn", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				text : {
					"type": "string", 
					"defaultValue": ""
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

	ui5strap.TableColumn.prototype.init = function(){

	};

}());