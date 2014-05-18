/*
 * 
 * UI5Strap
 *
 * Tooltip
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

  jQuery.sap.declare("ui5strap.Tooltip");
  jQuery.sap.require("ui5strap.library");

  sap.ui.core.Control.extend("ui5strap.Tooltip", {
    metadata : {

      // ---- object ----
      defaultAggregation : "titleContent",
      // ---- control specific ----
      library : "ui5strap",
      
      properties : { 
        title : {
          type:"string", 
          defaultValue:""
        },

        placement : {
          type: "ui5strap.Placement", 
          defaultValue: ui5strap.Placement.Right
        },

        trigger : {
          type: "ui5strap.TriggerMode", 
          defaultValue: ui5strap.TriggerMode.Hover
        }
      },
      
      aggregations : { 
        titleContent : {singularName: "titleContent"},
      },
      
      associations : {
        source : {
            multiple : false
        }
      }

    }
  });

  var Tooltip = ui5strap.Tooltip;

  Tooltip.prototype.init = function(){
      this.sourceControl = null;
  };

  Tooltip.prototype.getSourceControl = function(){
      if(null === this.sourceControl){
        this.sourceControl = sap.ui.getCore().byId(this.getSource());
        
      }

      return this.sourceControl;
  };

  Tooltip.prototype.getSourceDomRef = function(){
      return this.getSourceControl().$();
  };

  Tooltip.prototype.onAfterRendering = function(){
    var $this = this.$();

    var tooltipOptions = {
      title : function(){
        return $this.find('.tooltip-data-title').html();
      },
      
      trigger : ui5strap.BSTriggerMode[this.getTrigger()],
      
      html : true
    };

    var placement = this.getPlacement();
    if(placement !== ui5strap.Placement.None){
        if(placement !== ui5strap.Placement.Default){
          tooltipOptions.placement = ui5strap.BSPlacement[placement];
        }
        this.getSourceDomRef().tooltip(tooltipOptions);
    }
  };

  Tooltip.prototype.show = function(){
      this.getSourceDomRef().tooltip('show');
  };

  Tooltip.prototype.hide = function(){
      this.getSourceDomRef().tooltip('hide');
  };
  
}());