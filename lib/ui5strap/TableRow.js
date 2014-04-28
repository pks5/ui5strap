/*
 * 
 * UI5Strap
 *
 * Table row
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

jQuery.sap.declare("ui5strap.TableRow");
jQuery.sap.require("sap.ui.core.Element");


sap.ui.core.Element.extend("ui5strap.TableRow", {
	metadata : {

		// ---- object ----
		defaultAggregation : "columns",
		// ---- control specific ----
		library : "ui5strap",

		aggregations : { 
			"columns" : {
				type : "ui5strap.TableColumn"
			} 
		}

	}
});

ui5strap.TableRow.prototype.init = function(){

};

}());