 /*
 * 
 * UI5Strap
 *
 * Panel
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

	jQuery.sap.declare("ui5strap.Panel");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Panel", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				title : {
					type:"string", defaultValue:""
				},
				titleContentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				collapse : {
					type : "boolean",
					defaultValue : false
				},
				collapsed : {
					type : "boolean",
					defaultValue : true
				},
				text : {
					type:"string", defaultValue:""
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			aggregations : { 
				titleContent : {
					singularName: "titleContent"
				},
				content : {
					singularName: "content"
				} 
			}

		}
	});

	var PanelProto = ui5strap.Panel.prototype;

	PanelProto.setCollapsed = function(newCollapsed){
		if(!this.getCollapse()){
			return false;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#panel-collapse---' + this.getId());
			if(newCollapsed){
				$collapse.removeClass('in');
			}
			else{
				$collapse.addClass('in');
			}
			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed);
		}
	};

	PanelProto.toggle = function(){
		this.setCollapsed(!this.getCollapsed());
	};

	if(ui5strap.options.enableTapEvents){
		PanelProto.ontap = function(e){
			var $target = jQuery(e.target);
			if($target.hasClass('panel-heading') || $target.parent().hasClass('panel-heading')){
				var parent = this.getParent();
				if(parent instanceof ui5strap.PanelGroup){
					parent.setSelectedControl(this);
				}
				else{ 
					this.toggle();
				}
			}
		};
	}

	if(ui5strap.options.enableClickEvents){
		PanelProto.onclick = function(e){
			var $target = jQuery(e.target);
			if($target.hasClass('panel-heading') || $target.parent().hasClass('panel-heading')){
				var parent = this.getParent();
				if(parent instanceof ui5strap.PanelGroup){
					parent.setSelectedControl(this);
				}
				else{ 
					this.toggle();
				}
			}
		};
	}

}());