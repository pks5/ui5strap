/*
 * 
 * UI5Strap
 *
 * Library
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

	jQuery.sap.declare("ui5strap.library");
	jQuery.sap.require("sap.ui.core.Core");
	//jQuery.sap.require("sap.ui.core.Control");

	sap.ui.getCore().initLibrary({
	  name : "ui5strap",
	  dependencies : [],
	  types: [
	  	"ui5strap.Size",
	  	"ui5strap.Type"
	  ],
	  interfaces: [],
	  controls: [],
	  elements: [],
  	version: "0.0.3"});

	var tapSupport = jQuery.sap.touchEventMode != "OFF";
  	ui5strap.options = {
  		enableTapEvents : tapSupport,
  		enableClickEvents : !tapSupport
  	};

	jQuery.sap.declare("ui5strap.Size");

	ui5strap.Size = {
		ExtraSmall : "ExtraSmall",
		Small : "Small",
		Medium : "Medium",
		Large : "Large",
		Default : "Default"
	};

	ui5strap.BSSize = {
		ExtraSmall : "xs",
		Small : "sm",
		Medium : "md",
		Large : "lg"
	};

	jQuery.sap.declare("ui5strap.Severity");

	ui5strap.Severity = {
		Default : "Default",
		Primary : "Primary",
		Success : "Success",
		Warning : "Warning",
		Info : "Info",
		Danger : "Danger",
		None : "None"
	};

	ui5strap.BSSeverity = {
		Default : "default",
		Primary : "primary",
		Success : "success",
		Warning : "warning",
		Info : "info",
		Danger : "danger"
	};

	jQuery.sap.declare("ui5strap.Visibility");

	ui5strap.Visibility = {
		Default : "Default",
		Visible : "Visible",
		Hidden : "Hidden"
	};

  ui5strap.BSVisibility = {
    Visible : "show",
    Hidden : "hidden",
    Invisible : "invisible"
  };

  jQuery.sap.declare("ui5strap.TriggerMode");

	ui5strap.TriggerMode = {
		Click : "Click",
		Hover : "Hover",
		Focus : "Focus",
		Manual : "Manual"
	};

	ui5strap.BSTriggerMode = {
      Click : "click",
      Hover : "hover",
      Focus : "focus",
      Manual : "manual"
  };

  jQuery.sap.declare("ui5strap.TrailHtml");

  ui5strap.TrailHtml = {
      "None" : "None",
      "Space" : "Space",
      "DoubleSpace" : "DoubleSpace",
      "Break" : "Break"
  };

  jQuery.sap.declare("ui5strap.ContentPlacement");

  ui5strap.ContentPlacement = {
      Start : "Start",
      End : "End"
  };

	jQuery.sap.declare("ui5strap.Placement");

	ui5strap.Placement = {
		None : "None",
		Default : "Default",
		Top : "Top",
		Left : "Left",
		Bottom : "Bottom",
		Right : "Right",
		AutoTop : "AutoTop",
		AutoLeft : "AutoLeft",
		AutoBottom : "AutoBottom",
		AutoRight : "AutoRight"
	};

  ui5strap.BSPlacement = {
	      Top : "top",
	      Left : "left",
	      Bottom : "bottom",
	      Right : "right",
	      AutoTop : "auto top",
	      AutoLeft : "auto left",
	      AutoBottom : "auto bottom",
	      AutoRight : "auto right"
  };

  jQuery.sap.declare("ui5strap.Alignment");

  ui5strap.Alignment = {
    Default : "Default",
    NavBar : "NavBar",
    NavBarLeft : "NavBarLeft",
    NavBarRight : "NavBarRight",
    PullLeft : "PullLeft",
    PullRight : "PullRight",
    CenterBlock : "CenterBlock"
  };

  ui5strap.BSAlignment = {
    NavBarLeft : "navbar-left",
    NavBarRight : "navbar-right",
    PullLeft : "pull-left",
    PullRight : "pull-right",
    CenterBlock : "center-block"
  };

  jQuery.sap.declare("ui5strap.TextType");

	ui5strap.TextType = {
		Default : "Default",
		Phrasing : "Phrasing",
		Strong : "Strong",
		Blockquote : "Blockquote",
		Quote : "Quote",
		Preformatted : "Preformatted",
		Emphasized : "Emphasized",
		Code : "Code",
		Paragraph : "Paragraph",
    HelpBlock : "HelpBlock",
    Small : "Small",
    Lead : "Lead",
    Abbreviation : "Abbreviation"
	};

	jQuery.sap.declare("ui5strap.ListType");

	ui5strap.ListType = {
		Unordered : "Unordered",
		Ordered : "Ordered"
	};

	jQuery.sap.declare("ui5strap.LinkType");

	ui5strap.LinkType = {
		Default : "Default",
		Thumbnail : "Thumbnail"
	};

  jQuery.sap.declare("ui5strap.HeadingType");

  ui5strap.HeadingType = {
    Default : "Default",
    PageHeader : "PageHeader",
    ListGroupItemHeading : "ListGroupItemHeading",
    MediaHeading : "MediaHeading"
  };

	jQuery.sap.declare("ui5strap.ButtonType");

	ui5strap.ButtonType = {
		Default : "Default",
		Button : "Button",
    Block : "Block",
    Close : "Close",
		Icon : "Icon",
    Link : "Link"
	};

  jQuery.sap.declare("ui5strap.ButtonGroupType");

  ui5strap.ButtonGroupType = {
    Default : "Default",
    Justified : "Justified",
    Vertical : "Vertical"
  };

  jQuery.sap.declare("ui5strap.IconType");

  ui5strap.IconType = {
    Default : "Default",
    FormFeedback : "FormFeedback"
  };

  jQuery.sap.declare("ui5strap.IconSize");

  ui5strap.IconSize = {
    Default : "Default",
    Large : "Large",
    X2 : "X2",
    X3 : "X3",
    X4 : "X4",
    X5 : "X5"
  };

  jQuery.sap.declare("ui5strap.IconTransform");

  ui5strap.IconTransform = {
    Default : "Default",
    Rotate90 : "Rotate90",
    Rotate180 : "Rotate180",
    Rotate270 : "Rotate270",
    FlipHorizontal : "FlipHorizontal",
    FlipVertical : "FlipVertical"
  };

	jQuery.sap.declare("ui5strap.BsAction");

	ui5strap.BsAction = {
		None : "None",
		DismissModal : "DismissModal",
		ToggleNavBar : "ToggleNavBar"
	};

	jQuery.sap.declare("ui5strap.FormSeverity");

	ui5strap.FormSeverity = {
		Success : "Success",
		Warning : "Warning",
		Error : "Error",
		None : "None"
	};

	jQuery.sap.declare("ui5strap.FormType");

	ui5strap.FormType = {
		Default : "Default",
		Horizontal : "Horizontal",
		Inline : "Inline"
	};

  jQuery.sap.declare("ui5strap.TextInputType");

  ui5strap.TextInputType = {
      Default : "Default",
      FormControl : "FormControl"
  };

  jQuery.sap.declare("ui5strap.SelectBoxType");

  ui5strap.SelectBoxType = {
      Default : "Default",
      FormControl : "FormControl"
  };

  jQuery.sap.declare("ui5strap.TextInputFormat");

  ui5strap.TextInputFormat = {
      Default : "Default",
      Plain : "Plain",
      Html : "Html",
      Email : "Email",
      Date : "Date"
  }

	jQuery.sap.declare("ui5strap.CheckboxType");

	ui5strap.CheckboxType = {
		Default : "Default",
		Block : "Block",
		Inline : "Inline"
	};

	jQuery.sap.declare("ui5strap.RadioButtonType");

	ui5strap.RadioButtonType = {
		Default : "Default",
		Block : "Block",
		Inline : "Inline"
	};

	jQuery.sap.declare("ui5strap.FormMethod");

	ui5strap.FormMethod = {
		None : "None",
		Default : "Default",
		POST : "POST",
		GET : "GET",
		PUT : "PUT"
	};

	jQuery.sap.declare("ui5strap.NavBarType");

	ui5strap.NavBarType = {
		Default : "Default",
		None : "None"
	};

	jQuery.sap.declare("ui5strap.NavBarPosition");

	ui5strap.NavBarPosition = {
		Default : "Default",
		FixedTop : "FixedTop",
		FixedBottom : "FixedBottom",
		StaticTop : "StaticTop"
	};

	jQuery.sap.declare("ui5strap.NavType");

	ui5strap.NavType = {
		Tabs : "Tabs",
		Pills : "Pills",
    PillsStacked : "PillsStacked",
    PillsJustified : "PillsJustified",
    TabsJustified : "TabsJustified",
		Default : "Default"
	};

  jQuery.sap.declare("ui5strap.SelectionMode");

  ui5strap.SelectionMode = {
    None : "None",
    Single : "Single",
    SingleMaster : "SingleMaster",
    Master : "Master",
    Multiple : "Multiple"
  };

	jQuery.sap.declare("ui5strap.ContainerType");

	ui5strap.ContainerType = {
		Default : "Default",
		Page : "Page",
		Fluid : "Fluid",
		Paragraph : "Paragraph",
    Floating : "Floating",
    Section : "Section",
    Phrasing : "Phrasing"
	};

  jQuery.sap.declare("ui5strap.ImageShape");

  ui5strap.ImageShape = {
    Default : "Default",
    Rounded : "Rounded",
    Circle : "Circle",
    Thumbnail : "Thumbnail"
  };

  ui5strap.Utils = {

      dynamicAttributes : function(controlProto, attributeNames){
          for(var i = 0; i < attributeNames.length; i++){
              ui5strap.Utils.dynamicAttribute(controlProto, attributeNames[i]);
          }
      },

      dynamicAttribute : function(controlProto, attributeName){
          controlProto['set' + jQuery.sap.charToUpperCase(attributeName, 0)] = function(newValue){
              ui5strap.Utils.updateAttribute(this, attributeName, newValue);
          };
      },

      updateAttribute : function(oControl, attributeName, newValue){
          if(oControl.getDomRef()){
            oControl.$().attr(attributeName, newValue);
            oControl.setProperty(attributeName, newValue, true);
          }
          else{
            oControl.setProperty(attributeName, newValue);
          }
      },

      dynamicClass : function(controlProto, propertyName, valueMapping){
          controlProto['set' + jQuery.sap.charToUpperCase(propertyName, 0)] = function(newValue){ 
              ui5strap.Utils.updateClass(this, propertyName, newValue, valueMapping);
          };
      },

      updateClass : function(oControl, propertyName, newValue, valueMapping){
          if(oControl.getDomRef()){
              var oldValue = oControl['get' + jQuery.sap.charToUpperCase(propertyName, 0)]();
              if(oldValue in valueMapping){
                    oControl.$().removeClass(valueMapping[oldValue]);
              }
              if(newValue in valueMapping){
                    oControl.$().addClass(valueMapping[newValue]);
              }

              oControl.setProperty(propertyName, newValue, true);
          }
          else{
              oControl.setProperty(propertyName, newValue);
          }
      },

      dynamicText : function(controlProto){
          controlProto.setText = function(newText){
              ui5strap.Utils.updateText(this, newText);
          };
      },

      updateText : function(oControl, newText){
          if(oControl.getDomRef() && oControl.getContent().length === 0){
              oControl.$().text(newText);
              oControl.setProperty('text', newText, true);
          }
          else{
              oControl.setProperty('text', newText);
          }
      },

      updateHtml : function(oControl, newHtml){

      }
  };

  ui5strap.RenderUtils = {

      renderTitleContent : function(rm, oControl, text){
          var content = oControl.getTitleContent(),
              contentPlacement = oControl.getTitleContentPlacement(),
              text = oControl.getTitle();
        
          if(contentPlacement === ui5strap.ContentPlacement.End){
              rm.writeEscaped(text);
          }

          for(var i = 0; i < content.length; i++){ 
              rm.renderControl(content[i]);
          }

          if(contentPlacement === ui5strap.ContentPlacement.Start){
              rm.writeEscaped(text);
          }
      },

      renderContent : function(rm, oControl, text){
          var content = oControl.getContent(),
              contentPlacement = oControl.getContentPlacement(),
              text = oControl.getText();
        
          if(contentPlacement === ui5strap.ContentPlacement.End){
              rm.writeEscaped(text);
          }

          for(var i = 0; i < content.length; i++){ 
              rm.renderControl(content[i]);
          }

          if(contentPlacement === ui5strap.ContentPlacement.Start){
              rm.writeEscaped(text);
          }
      },

      trailHtml : {
          Space : ' ',
          DoubleSpace : '&nbsp; ',
          Break : '<br />'
      },

      renderTrail : function(rm, oControl, text){
          var trail = oControl.getTrail();

          if(trail !== ui5strap.TrailHtml.None){
              rm.write(this.trailHtml[trail]);
          }
      },

      alignment : function(rm, oControl, navbarClass){
          var align = oControl.getAlign(),
              Alignment = ui5strap.Alignment;

          if(align !== Alignment.Default){
              rm.addClass(ui5strap.BSAlignment[align]);
          }

          if(typeof navbarClass === 'string'){
              if(align === Alignment.NavBar ||
                align === Alignment.NavBarLeft ||
                align === Alignment.NavBarRight){
                  rm.addClass(navbarClass);
              }
          }
      },

      visibility : function(rm, oControl){
          var visibility = oControl.getVisibility(),
              visibilityExtraSmall = oControl.getVisibilityExtraSmall(),
              visibilitySmall = oControl.getVisibilitySmall(),
              visibilityMedium = oControl.getVisibilityMedium(),
              visibilityLarge = oControl.getVisibilityLarge(),
              Visibility = ui5strap.Visibility;

          if(visibility !== Visibility.Default){
              rm.addClass(ui5strap.BSVisibility[visibility]);
          }

          if(visibilityExtraSmall === Visibility.Visible){
              rm.addClass('visible-xs');
          }
          else if(visibilityExtraSmall === Visibility.Hidden){
              rm.addClass('hidden-xs');
          }

          if(visibilitySmall === Visibility.Visible){
              rm.addClass('visible-sm');
          }
          else if(visibilitySmall === Visibility.Hidden){
              rm.addClass('hidden-sm');
          }

          if(visibilityMedium === Visibility.Visible){
              rm.addClass('visible-md');
          }
          else if(visibilityMedium === Visibility.Hidden){
              rm.addClass('hidden-md');
          }

          if(visibilityLarge === Visibility.Visible){
              rm.addClass('visible-lg');
          }
          else if(visibilityLarge === Visibility.Hidden){
              rm.addClass('hidden-lg');
          }

          if(oControl.getInvisible()){
            rm.addClass('invisible');
          }
      }

  };

}());

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);



/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
