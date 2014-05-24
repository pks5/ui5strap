/*
 * 
 * UI5Strap
 *
 * PanelGroup
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

	jQuery.sap.declare("ui5strap.PanelGroup");

	sap.ui.core.Control.extend("ui5strap.PanelGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "panels",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
			
			aggregations : { 
				panels : {
					type : "ui5strap.Panel",
					singularName: "panel"
				}
			}

		}
	});

	ui5strap.PanelGroup.prototype.setSelectedControl = function(panel){
		var panels = this.getPanels();
		for(var i = 0; i < panels.length; i++){
			if(panels[i].getCollapse()){
				if(panels[i] !== panel){
					panels[i].setCollapsed(true);
				}
				else{
					panel.setCollapsed(false);
				}
			}
		}
	};

}());