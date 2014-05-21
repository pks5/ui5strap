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

/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);