/*
 * 
 * UI5Strap
 *
 * ListMediaItem
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

	jQuery.sap.declare("ui5strap.ListMediaItem");
		jQuery.sap.require("ui5strap.ListItem");

	ui5strap.ListItem.extend("ui5strap.ListMediaItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "media",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				contentPlacement : {
					type : "ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.End
				},

				heading : {
					type : "string",
					defaultValue : ""
				}
			},
			aggregations : { 
				media : {
					multiple : false
				}
			}
		}
	});

	ui5strap.ListMediaItem.prototype.setText = function(newText){
		if(this.getMedia() === null){
			ui5strap.Utils.updateText(this, newText);
		}
		else{
			this.setProperty('text', newText);
		}
	};

}());