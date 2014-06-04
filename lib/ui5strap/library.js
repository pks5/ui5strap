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
	
  //Register Ui5Strap as library
	sap.ui.getCore().initLibrary(
      {
      	  name : "ui5strap",
      	  dependencies : [],
      	  types: [
      	  	"ui5strap.Size",
      	  	"ui5strap.Severity",
            "ui5strap.Visibility",
            "ui5strap.TriggerMode",
            "ui5strap.TrailHtml",
            "ui5strap.ContentPlacement",
            "ui5strap.Placement",
            "ui5strap.Alignment",
            "ui5strap.TextType",
            "ui5strap.ListType",
            "ui5strap.LinkType",
            "ui5strap.HeadingType",
            "ui5strap.ButtonType",
            "ui5strap.ButtonGroupType",
            "ui5strap.IconType",
            "ui5strap.IconSize",
            "ui5strap.IconTransform",
            "ui5strap.BsAction",
            "ui5strap.FormSeverity",
            "ui5strap.FormType",
            "ui5strap.TextInputType",
            "ui5strap.SelectBoxType",
            "ui5strap.TextInputFormat",
            "ui5strap.CheckboxType",
            "ui5strap.RadioButtonType",
            "ui5strap.FormMethod",
            "ui5strap.NavBarType",
            "ui5strap.NavBarPosition",
            "ui5strap.NavType",
            "ui5strap.SelectionMode",
            "ui5strap.ContainerType",
            "ui5strap.ImageShape"
      	  ],
      	  interfaces: [],
      	  controls: [
            "ui5strap.Alert",
            "ui5strap.Badge",
            "ui5strap.Breadcrumb",
            "ui5strap.Break",
            "ui5strap.Button",
            "ui5strap.ButtonDropdown",
            "ui5strap.ButtonGroup",
            "ui5strap.ButtonToolbar",
            "ui5strap.Carousel",
            "ui5strap.Checkbox",
            "ui5strap.Clearfix",
            "ui5strap.Col",
            "ui5strap.Container",
            "ui5strap.Form",
            "ui5strap.FormGroup",
            "ui5strap.Heading",
            "ui5strap.HtmlTag",
            "ui5strap.Icon",
            "ui5strap.Image",
            "ui5strap.InputGroup",
            "ui5strap.Jumbotron",
            "ui5strap.Label",
            "ui5strap.Line",
            "ui5strap.Link",
            "ui5strap.List",
            "ui5strap.ListBase",
            "ui5strap.ListDropdownItem",
            "ui5strap.ListDropdownMenu",
            "ui5strap.ListGroup",
            "ui5strap.ListGroupItem",
            "ui5strap.ListItem",
            "ui5strap.ListLinkItem",
            "ui5strap.ListMedia",
            "ui5strap.ListMediaItem",
            "ui5strap.ListNavItem",
            "ui5strap.Modal",
            "ui5strap.Nav",
            "ui5strap.NavBar",
            "ui5strap.NavContainer",
            "ui5strap.NavContainerStandard",
            "ui5strap.PageHeader",
            "ui5strap.Pager",
            "ui5strap.Pagination",
            "ui5strap.Panel",
            "ui5strap.PanelGroup",
            "ui5strap.Paragraph",
            "ui5strap.Popover",
            "ui5strap.Progress",
            "ui5strap.ProgressBar",
            "ui5strap.RadioButton",
            "ui5strap.Row",
            "ui5strap.RowContent",
            "ui5strap.ScrollContainer",
            "ui5strap.SelectBox",
            "ui5strap.Sidebar",
            "ui5strap.TabContainer",
            "ui5strap.Table",
            "ui5strap.Text",
            "ui5strap.TextInput",
            "ui5strap.Thumbnail",
            "ui5strap.Tooltip",
            "ui5strap.Well"
          ],
      	  elements: [
            "ui5strap.Item",
            "ui5strap.TableColumn",
            "ui5strap.TableRow"
          ],
        	version: "0.1.0"
      }
  );

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
    Sidebar : "Sidebar",
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
		DismissModal : "DismissModal"
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
              ui5strap.Utils.updateClass(this, this.$(), propertyName, newValue, valueMapping);
          };
      },

      updateClass : function(oControl, $target, propertyName, newValue, valueMapping){
          if(oControl.getDomRef()){
              var oldValue = oControl['get' + jQuery.sap.charToUpperCase(propertyName, 0)]();
              if(oldValue in valueMapping){
                    $target.removeClass(valueMapping[oldValue]);
              }
              if(newValue in valueMapping){
                    $target.addClass(valueMapping[newValue]);
              }

              oControl.setProperty(propertyName, newValue, true);
          }
          else{
              oControl.setProperty(propertyName, newValue);
          }
      },

      dynamicText : function(controlProto){
          controlProto.setText = function(newText){
              ui5strap.Utils.updateText(this, this.$(), newText);
          };
      },

      updateText : function(oControl, $target, newText){
          if(oControl.getDomRef() && oControl.getContent().length === 0){
              $target.text(newText);
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

      alignment : function(rm, oControl, navbarClass, sidebarClass){
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

          if(typeof sidebarClass === 'string'){
              if(align === Alignment.Sidebar){
                  rm.addClass(sidebarClass);
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