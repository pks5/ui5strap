/*
 * 
 * UI5Strap
 *
 * Popover
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

  jQuery.sap.declare("ui5strap.Popover");
  jQuery.sap.require("ui5strap.library");
  jQuery.sap.require("ui5strap.Tooltip");

  ui5strap.Tooltip.extend("ui5strap.Popover", {
    metadata : {

      // ---- object ----
      defaultAggregation : "content",
      // ---- control specific ----
      library : "ui5strap",
      
      properties : {
         trigger : {
            type: "ui5strap.TriggerMode", 
            defaultValue: ui5strap.TriggerMode.Click
        }
      },

      aggregations : { 
        content : {singularName: "content"},
      }

    }
  });

  var Popover = ui5strap.Popover;

  Popover.lastShownInstance = null;

  Popover.prototype.onAfterRendering = function(){
    var $this = this.$();

    var popoverOptions = {
      title : function(){
        return $this.find('.popover-data-title').html();
      },
      content : function(){
        return $this.find('.popover-data-content').html();
      },
      
      trigger : ui5strap.BSTriggerMode[this.getTrigger()],
      html : true
    };

    var placement = this.getPlacement();
    if(placement !== ui5strap.Placement.None){
        if(placement !== ui5strap.Placement.Default){
          popoverOptions.placement = ui5strap.BSPlacement[placement];
        }
        this.getSourceDomRef().popover(popoverOptions);
    }
  };

  Popover.prototype.show = function(){
    var lastShownInstance = Popover.lastShownInstance;
    if(null !== lastShownInstance && lastShownInstance !== this){
        lastShownInstance.hide();
    }

    Popover.lastShownInstance = this;
    this.getSourceDomRef().popover('show');
  };

  Popover.prototype.hide = function(){
    this.getSourceDomRef().popover('hide');
  };
  
}());