/*
 * 
 * UI5Strap
 *
 * ui5strap.library
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2014 Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

  var jQuerySap = jQuery.sap;

  /*
  *
  * Test system requirements
  *
  * @private
  * @static
  */
  var _testRequirements = function(){
    if(!Object.keys){
      jQuerySap.log.warning('Object.keys is not supported by the browser!');
      return false;
    }

    return true;
  };

  if(!_testRequirements()){
    throw new Error(
      "<h4>We are sorry!</h4>" 
      + "<p>You're browser / device is not supported by Ui5Strap yet.</p>"
      + "<p>Please use one of following browsers:</p>" 
      + "<ul>" 
      + "<li>Chrome 26+</li>"
      + "<li>Firefox 10+</li>"
      + "<li>Safari 5+</li>"
      + "<li>Internet Explorer 9+</li>"
      + "</ul>"
    );
  }

  jQuerySap.declare("ui5strap.library");
	jQuerySap.require("sap.ui.core.Core");
	
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
      	  interfaces: [
            "ui5strap.IColumn",
            "ui5strap.IBar"
          ],
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
        	version: "0.8.6"
      }
  );
  
  /*
  * -------
  *
  * Options
  *
  * -------
  */

	var tapSupport = jQuery.sap.touchEventMode != "OFF";
  ui5strap.options = {
  	enableTapEvents : tapSupport,
  	enableClickEvents : !tapSupport,
    transitionTimeout : 2000
  };

  /*
  * -------
  *
  * Support
  *
  * -------
  */
  
  ui5strap.support = {
    
  };
   
  var _transitionEndEvents = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'otransitionend'
      },
      elem = document.createElement('div');
  
  for(var t in _transitionEndEvents){
      if(typeof elem.style[t] !== 'undefined'){
        ui5strap.support.transitionEndEvent = _transitionEndEvents[t];
        break;
      }
  }

  /*
  * -------
  *
  * Polyfill
  *
  * -------
  */
  ui5strap.polyfill = {

  };

  var _requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
  })();

  ui5strap.polyfill.requestAnimationFrame = function(callback){
    _requestAnimFrame.call(window, callback);
  };
  

  /*
  * -----
  *
  * Types
  *
  * -----
  */

  /*
  * Size
  */
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

  /*
  * Severity
  */
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

  /*
  * Visibility
  */
	jQuery.sap.declare("ui5strap.Visibility");

	ui5strap.Visibility = {
		Default : "Default",
		Visible : "Visible",
		Hidden : "Hidden",
    Covered : "Covered"
	};

  ui5strap.BSVisibility = {
    Visible : "show",
    Hidden : "hidden",

    //??? is this used
    Invisible : "invisible",
    
    //Not available for all Controls
    Covered : "covered"
  };

  /*
  * TriggerMode
  * Used by Popovers
  */
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

  /*
  * TrailHtml
  * Used by inline Controls
  */
  jQuery.sap.declare("ui5strap.TrailHtml");

  ui5strap.TrailHtml = {
      "None" : "None",
      "Space" : "Space",
      "DoubleSpace" : "DoubleSpace",
      "Break" : "Break"
  };

  /*
  * ContentPlacement
  */
  jQuery.sap.declare("ui5strap.ContentPlacement");

  ui5strap.ContentPlacement = {
      Start : "Start",
      End : "End"
  };

  /*
  * Placement
  */
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

  //Bootstrap CSS mapping
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

  /*
  * Alignment
  */
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

  //Bootstrap CSS mapping
  ui5strap.BSAlignment = {
    NavBarLeft : "navbar-left",
    NavBarRight : "navbar-right",
    
    PullLeft : "pull-left",
    PullRight : "pull-right",
    CenterBlock : "center-block"
  };

  /*
  * TextType
  */
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

  /*
  * ListType
  */
	jQuery.sap.declare("ui5strap.ListType");

	ui5strap.ListType = {
		Unordered : "Unordered",
		Ordered : "Ordered"
	};

  /*
  * LinkType
  */
	jQuery.sap.declare("ui5strap.LinkType");

	ui5strap.LinkType = {
		Default : "Default",
		Thumbnail : "Thumbnail"
	};

  /*
  * HeadingType
  */
  jQuery.sap.declare("ui5strap.HeadingType");

  ui5strap.HeadingType = {
    Default : "Default",
    PageHeader : "PageHeader",
    ListGroupItemHeading : "ListGroupItemHeading",
    MediaHeading : "MediaHeading"
  };

  /*
  * ButtonType
  */
	jQuery.sap.declare("ui5strap.ButtonType");

	ui5strap.ButtonType = {
		Default : "Default",
		Button : "Button",
    Block : "Block",
    Close : "Close",
		Icon : "Icon",
    Link : "Link"
	};

  /*
  * ButtonGroupType
  */
  jQuery.sap.declare("ui5strap.ButtonGroupType");

  ui5strap.ButtonGroupType = {
    Default : "Default",
    Justified : "Justified",
    Vertical : "Vertical"
  };

  /*
  * IconType
  * Only used by ui5strap.Icon
  */
  jQuery.sap.declare("ui5strap.IconType");

  ui5strap.IconType = {
    Default : "Default",
    FormFeedback : "FormFeedback"
  };

  /*
  * IconSize
  * Only used by ui5strap.Icon
  */
  jQuery.sap.declare("ui5strap.IconSize");

  ui5strap.IconSize = {
    Default : "Default",
    Large : "Large",
    X2 : "X2",
    X3 : "X3",
    X4 : "X4",
    X5 : "X5"
  };

  /*
  * IconTransform
  * Only used by ui5strap.Icon
  */
  jQuery.sap.declare("ui5strap.IconTransform");

  ui5strap.IconTransform = {
    Default : "Default",
    Rotate90 : "Rotate90",
    Rotate180 : "Rotate180",
    Rotate270 : "Rotate270",
    FlipHorizontal : "FlipHorizontal",
    FlipVertical : "FlipVertical"
  };

  /*
  * BsAction
  * @deprecated Will be removed in future releases.
  */
	jQuery.sap.declare("ui5strap.BsAction");

	ui5strap.BsAction = {
		None : "None",
		DismissModal : "DismissModal",
    ToggleNavbar : "ToggleNavbar",
    ToggleSidenav : "ToggleSidenav"
	};

  /*
  * FormSeverity
  * Only used by ui5strap.Form
  */
	jQuery.sap.declare("ui5strap.FormSeverity");

	ui5strap.FormSeverity = {
		Success : "Success",
		Warning : "Warning",
		Error : "Error",
		None : "None"
	};

  /*
  * FormType
  * Only used by ui5strap.Form
  */
	jQuery.sap.declare("ui5strap.FormType");

	ui5strap.FormType = {
		Default : "Default",
		Horizontal : "Horizontal",
		Inline : "Inline"
	};

  /*
  * TextInputType
  * Only used by ui5strap.TextInput
  */
  jQuery.sap.declare("ui5strap.TextInputType");

  ui5strap.TextInputType = {
      Default : "Default",
      FormControl : "FormControl"
  };

  /*
  * SelectBoxType
  * Only used by ui5strap.SelectBox
  */
  jQuery.sap.declare("ui5strap.SelectBoxType");

  ui5strap.SelectBoxType = {
      Default : "Default",
      FormControl : "FormControl"
  };

  /*
  * TextInputFormat
  * Only used by ui5strap.TextInput
  */
  jQuery.sap.declare("ui5strap.TextInputFormat");

  ui5strap.TextInputFormat = {
      Default : "Default",
      Plain : "Plain",
      Html : "Html",
      Email : "Email",
      Date : "Date"
  }

  /*
  * CheckboxType
  * Only used by ui5strap.Checkbox
  */
	jQuery.sap.declare("ui5strap.CheckboxType");

	ui5strap.CheckboxType = {
		Default : "Default",
		Block : "Block",
		Inline : "Inline"
	};

  /*
  * RadioButtonType
  * Only used by ui5strap.RadioButton
  */
	jQuery.sap.declare("ui5strap.RadioButtonType");

	ui5strap.RadioButtonType = {
		Default : "Default",
		Block : "Block",
		Inline : "Inline"
	};

  /*
  * FormMethod
  * Only used by ui5strap.Form
  */
	jQuery.sap.declare("ui5strap.FormMethod");

	ui5strap.FormMethod = {
		None : "None",
		Default : "Default",
		POST : "POST",
		GET : "GET",
		PUT : "PUT"
	};

  /*
  * NavBarType
  * Only used by ui5strap.NavBar
  */
	jQuery.sap.declare("ui5strap.NavBarType");

	ui5strap.NavBarType = {
		Default : "Default",
		None : "None"
	};

  /*
  * NavBarPosition
  * Only used by ui5strap.NavBar
  */
	jQuery.sap.declare("ui5strap.NavBarPosition");

	ui5strap.NavBarPosition = {
		Default : "Default",
		FixedTop : "FixedTop",
		FixedBottom : "FixedBottom",
		StaticTop : "StaticTop"
	};

  /*
  * NavType
  * Only used by ui5strap.Nav
  */
	jQuery.sap.declare("ui5strap.NavType");

	ui5strap.NavType = {
		Tabs : "Tabs",
		Pills : "Pills",
    PillsStacked : "PillsStacked",
    PillsJustified : "PillsJustified",
    TabsJustified : "TabsJustified",
		Default : "Default"
	};

  /*
  * SelectionMode
  * Used by ui5strap.ListBase
  */
  jQuery.sap.declare("ui5strap.SelectionMode");

  ui5strap.SelectionMode = {
    None : "None",
    Single : "Single",
    SingleMaster : "SingleMaster",
    Master : "Master",
    Multiple : "Multiple"
  };

  /*
  * ContainerType
  * Only used by ui5strap.Container
  */
	jQuery.sap.declare("ui5strap.ContainerType");

	ui5strap.ContainerType = {
		Default : "Default",
		Page : "Page",
		Fluid : "Fluid",
		FluidInset : "FluidInset",
		Paragraph : "Paragraph",
		Floating : "Floating",
		Section : "Section",
		Phrasing : "Phrasing"
	};

  /*
  * ImageShape
  * Only used by ui5strap.Image
  */
  jQuery.sap.declare("ui5strap.ImageShape");

  ui5strap.ImageShape = {
    Default : "Default",
    Rounded : "Rounded",
    Circle : "Circle",
    Thumbnail : "Thumbnail"
  };

  /*
  * ---------
  *
  * Shorthand
  *
  * ---------
  */

  /*
  * Create a Controller instance with Action support.
  * TODO remove ui5strap.App dependency
  */
  ui5strap.controller = function(controllerName, controllerImpl){
      jQuery.sap.require('ui5strap.AppBase');

      ui5strap.AppBase.blessController(controllerImpl);

      return sap.ui.controller(controllerName, controllerImpl);
  };

  /*
  * Constructs a Transition
  * @constructor
  */
  ui5strap.Transition = function(transitionName, $currentRoot, $nextRoot, transitionId){
    this.$current = $currentRoot;
    this.$next = $nextRoot;
    
    this._prepared = false;
    this._executed = false;
    
    var transitionClass = transitionName,
        transitionTimeout = ui5strap.options.transitionTimeout,
        transitionEndEvent = ui5strap.support.transitionEndEvent;
    
    this.prepare = function (){
		  if(this._prepared || this._executed){
			  throw new Error('Cannot prepare transition: already prepared or executed!');
		  }
		  this._prepared = true;
		
		  if(!transitionName){
			  return;
		  }
		
		  if(null !== this.$current){
		      this.$current.addClass(transitionClass + ' ' + transitionClass+'-current');
		  }
		
		  if(null !== this.$next){
		      this.$next.addClass(transitionClass + ' ' + transitionClass+'-next').removeClass('ui5strap-hidden');
		  }
    };

    this.execute = function (currentRootCallback, nextRootCallback){
	      var _this = this;
	
	      if(!this._prepared){
	    	  throw new Error('Cannot execute transition: not prepared!');
	      }
	
	      if(this._executed){
	    	  throw new Error('Cannot execute transition: already executed!');
	      }
	
	      this._executed = true;
	      this._neca = false;
	      this._cuca = false;
	
	      if(transitionName && transitionEndEvent){
		        jQuery.sap.log.debug('[TRANSITION#' + transitionId + '] ' + transitionName);
		
		        if(currentRootCallback && this.$current){ 
			          var _currentTimout = window.setTimeout(function(){
				            if(_this._cuca){
				            	return;
				            }
				            _this._cuca = true;
				            jQuery.sap.log.warning('[TRANSITION#' + transitionId + '] Transition "' + transitionName + '" of hiding page caused a timeout.');
				            currentRootCallback.call(_this);
			          }, transitionTimeout);
			
			          this.$current.one(transitionEndEvent, function(){
				            if(_this._cuca){
				            	return;
				            }
				            _this._cuca = true;
				            window.clearTimeout(_currentTimout);
				            currentRootCallback.call(_this);
			          });
		        }
		        
		        if(nextRootCallback && this.$next){
			          var _nextTimout = window.setTimeout(function(){
				            if(_this._neca){
				            	return;
				            }
				            _this._neca = true;
				            jQuery.sap.log.warning('[TRANSITION#' + transitionId + '] Transition "' + transitionName + '" of showing page caused a timeout.');
				            nextRootCallback.call(_this);
			          }, transitionTimeout);
			
			          this.$next.one(transitionEndEvent, function(){
				            if(_this._neca){
				            	return;
				            }
				            _this._neca = true;
				            window.clearTimeout(_nextTimout);
				            nextRootCallback.call(_this);
			          });
		        }
		
		        this.$current && this.$current.addClass(transitionClass+'-current-out');
		        this.$next && this.$next.removeClass(transitionClass + '-next');
	      }
	      else{ 
		        jQuery.sap.log.debug('[TRANSITION#' + transitionId + '] No Transition.');
		        this.$next && this.$next.removeClass('ui5strap-hidden');
		
		        ui5strap.polyfill.requestAnimationFrame(function(){
			          currentRootCallback && currentRootCallback.call(_this);
			          nextRootCallback && nextRootCallback.call(_this);
		        });
	      }

     };

  };

  /*
  * -------
  *
  * Wrapper
  *
  * -------
  */

  //Object
  jQuery.sap.declare("ui5strap.Object");

  ui5strap.Object = sap.ui.base.Object;

  //Managed Object
  jQuery.sap.declare("ui5strap.ManagedObject");

  ui5strap.ManagedObject = sap.ui.base.ManagedObject;

  //Element
  jQuery.sap.declare("ui5strap.Element");

  ui5strap.Element = sap.ui.core.Element;

  //Control
  jQuery.sap.declare("ui5strap.Control");

  ui5strap.Control = sap.ui.core.Control;

  //JSONModel
  jQuery.sap.declare("ui5strap.JSONModel");

  ui5strap.JSONModel = sap.ui.model.json.JSONModel;

  /*
  * -----
  *
  * Layer
  *
  * -----
  */

  jQuery.sap.declare("ui5strap.Layer");
  
  ui5strap.Layer = {
    layers : {}
  };
  
  ui5strap.Layer.register = function(layerId, $layer){
      if(this.layers[layerId]){
          throw new Error('Layer ' + layerId + ' already registered.');
      }

      $layer = $layer || jQuery('#' + layerId);
      if($layer.length === 0){
          jQuery.sap.log.error("Layer " + layerId + " does not exist.");
          
          return false;
      }

      if(!$layer.hasClass('ui5strap-layer')){
          throw new Error("Cannot register layer '" + layerId + "': layers must have the css class 'ui5strap-layer'.");
      }

      this.layers[layerId] = {
          visible : !$layer.hasClass('ui5strap-hidden'),
          $domElement : $layer
      }

      return true;
  };

  ui5strap.Layer.get = function(layerId){
    return this.layers[layerId];
  };

  ui5strap.Layer.unregister = function(layerId){
      delete this.layers[layerId];
  };

  ui5strap.Layer.isVisible = function(layerId){
      return this.layers[layerId] && this.layers[layerId].visible;
  };

  /*
  * @Private
  */
  ui5strap.Layer.setVisible = function(layerId, visible, callback){
      
      var layer = this.layers[layerId];

      if(!layer || visible && layer.visible){
        callback && callback();
        return;
      }

      layer.visible = visible;
      var $layer = layer.$domElement;
      
      if(visible){
        $layer.css({
          display : 'block',
          opacity : 0
        });
      }

      var triggered = false,
          transCallback = function(){
              if(!visible){
                  $layer.css('display', 'none');
              }
              
              callback && callback();
          },
          timeout = window.setTimeout(function(){
              if(triggered){
                return;
              }
              triggered = true;
              jQuery.sap.log.warning("Layer '" + layerId + "' transition-end event failed - timeout triggered.");
              transCallback();
          }, ui5strap.options.transitionTimeout);

      ui5strap.polyfill.requestAnimationFrame(function(){
        $layer.one(ui5strap.support.transitionEndEvent, function(){
            if(triggered){
              return;
            }
            triggered = true;
            window.clearTimeout(timeout);
            transCallback();
        });

        //TODO: RAF here neccessary?
        ui5strap.polyfill.requestAnimationFrame(function(){
          $layer.css('opacity', visible ? 1 : 0);
        });
      });
  };

  /*
  * -----
  *
  * Utils
  *
  * -----
  */
  jQuery.sap.declare("ui5strap.Utils");

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
      }
  };

  ui5strap.Utils.getObject = function(packageString, levelsUp){
      if(!levelsUp){
          levelsUp = 0;
      }

    var classParts = packageString.split('.');
      if(!(classParts[0] in window)){
          return;
      }

    var constructor = window[classParts[0]];

    for(var i = 1 ; i < classParts.length - levelsUp; i++){
          if(!(classParts[i] in constructor)){
              return;
          }
      constructor = constructor[classParts[i]];
    }
    
    return constructor;
  };

  ui5strap.Utils.createObject = function(packageString){
    var Constructor = this.getObject(packageString);
    return new Constructor();
  };

  ui5strap.Utils.queryToObject = function(query){
      var vars = query.split('&'),
          obj = {};
      
      for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          obj[pair[0]] = pair[1];
      }

      return obj;
  };

  ui5strap.Utils.parseIContent = function(iContent){
      var iContentType = typeof iContent;
      
      if(iContentType === 'string'){
          if(jQuerySap.startsWith(iContent, "?")){
              return ui5strap.Utils.queryToObject(iContent.slice(1));
          }
      }
      
      return iContent;
  };

  /*
  * ---------
  *
  * Rendering
  *
  * ---------
  */

  jQuery.sap.declare("ui5strap.RenderUtils");

  ui5strap.RenderUtils = {

      renderTitleContent : function(rm, oControl, text){
          var content = oControl.getTitleContent(),
              contentPlacement = oControl.getTitleContentPlacement(),
              text = text || oControl.getTitle();
        
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

      parseMap : {
          '[strong]' : '<strong>',
          '[/strong]' : '</strong>',
          '[em]' : '<em>',
          '[/em]' : '</em>',
          '[small]' : '<small>',
          '[/small]' : '</small>',
          '[span]' : '<span>',
          '[/span]' : '</span>'
      },

      parseText : function(text){
          return text.replace(/\[\/?strong\]|\[\/?em\]|\[\/?small\]|\[\/?span\]/gi, function(matched){
            return ui5strap.RenderUtils.parseMap[matched];
          });
      },

      renderContent : function(rm, oControl, text, dontEscape){
          var content = oControl.getContent(),
              contentPlacement = oControl.getContentPlacement(),
              text = text || oControl.getText();
        
          if(contentPlacement === ui5strap.ContentPlacement.End){
              if(dontEscape){
                rm.write(text);
              }
              else{
                rm.writeEscaped(text);
              }
          }

          for(var i = 0; i < content.length; i++){ 
              rm.renderControl(content[i]);
          }

          if(contentPlacement === ui5strap.ContentPlacement.Start){
              if(dontEscape){
                rm.write(text);
              }
              else{
                rm.writeEscaped(text);
              }
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

  /*
  * ------
  *
  * Script
  *
  * ------
  */
  jQuery.sap.declare("ui5strap.ScriptBlock");

  ui5strap.ScriptBlock = function(){
      this._pending = {};
      this._order = [];
      this._pendingRequests = 0;
      this._buffer = '';

      var _this = this;

      var successCallback = function(response, callback){
        _this._pending[this.url]["script"] = response;
        
        _this._pendingRequests--;
        if(0 == _this._pendingRequests){
          _this._addToBuffer();

          callback();
        }
      };

      this._addToBuffer = function(){
        for(var i = 0; i<this._order.length; i++){
          if(null === this._order[i].script){
            throw new Error('Could not continue script loading: unexspected error.');
          }
          //this._buffer += "\n;\n" + this._order[i].script + "\n;\n";
          this._buffer = this._buffer.concat("\n;\n" + this._order[i].script + "\n;\n");
        }

        this._pending = {};
        this._order = [];

      };

      this.load = function(scripts, callback){
        if(0 < this._pendingRequests || this._order.length > 0){
          throw new Error('Could not load scripts: requests still pending.');
        }

        this._pendingRequests = scripts.length;

        for(var i = 0; i < this._pendingRequests; i++){
          var scriptUrl = scripts[i];
          //if(scriptUrl in this._pending){
          //  continue;
          //}

          var scriptData = {
            "index" : i,
            "script" : null
          };

          this._pending[scriptUrl] = scriptData;
          this._order.push(scriptData);

          jQuery.ajax({
                url: scriptUrl,
                dataType: "text",
                success: function(response){
                  successCallback.call(this, response, callback);
                },
                error : function(){
                  throw new Error('Could not load script: ' + scriptUrl);
                }
          });
        }
      };

      this.execute = function(useEval){
        if('' === this._buffer){
          return false;
        }
        var returnValue = null;
        if( true === useEval ){
          returnValue = eval.call(window, this._buffer);
        }
        else{
          returnValue = (new Function(this._buffer))(); //.call(window);
        }
        this._buffer = '';

        return returnValue;
      };
  };

  /*
  * -------
  *
  * Require
  *
  * -------
  */

  var _callbackStack = [],
    _callbackTimer = null,
    _callbackPending = 0,
    _requiredModules = {};

  var _clearTimer = function(_this){
    if(null !== _callbackTimer){
      window.clearInterval(_callbackTimer);
      _callbackTimer = null;
      //jQuerySap.log.debug('[LIBRARY] require: Timer removed.');
    }
  };

  var _checkModules = function(_this){
    jQuerySap.log.debug('[LIBRARY] _checkModules');
    var i = 0;
    while(i < _callbackStack.length){
      var request = _callbackStack[i];
      //Check whether all modules are defined
      var modulesExecuted = true;
      for(var j = 0; j < request.modules.length; j++){
        var object = ui5strap.Utils.getObject(request.modules[j]);
        if(typeof object === 'undefined'){
          var scriptUrl = jQuerySap.getModulePath(request.modules[j]) + '.js';
          if(!(scriptUrl in _requiredModules)){
            throw new Error('[LIBRARY] _checkModules: Can not execute "' + request.modules[j] + '": Module never has been laoded.' );
          }

          modulesExecuted = false;
          request.attempts ++ ;
          if(request.attempts === 10){
            throw new Error("Could not find module '" + request.modules[j] + "'");
          }
          break;
          
        }
        else{
          //Module is defined now
          jQuerySap.log.debug('[LIBRARY] _checkModules: Module found: "'+ request.modules[j] + '"');
          
          
        }
      }

      if(0 === request.modules.length){
        jQuerySap.log.debug('No dependencies');
      }

      //Run the callback
      if(true === modulesExecuted){
        jQuerySap.log.debug('[LIBRARY] _checkModules: Modules loaded.');

        var callee = _callbackStack.shift();
        callee.callback();
      }
      else{
        jQuerySap.log.debug('[LIBRARY] _checkModules: Some modules are still loading.');
        break;
      }
    }
    
    //Callback stack empty, remove the timer
    if(0 === _callbackStack.length){
      _clearTimer(_this);
    }
  };

  /*
  * Require one or more JavaScript Module, evaluated as one large script block.
  */
  ui5strap.require = function(modules, callback){
    var _this = this;

    if(typeof modules === 'string'){
      modules = [modules];
    }

    jQuerySap.log.debug('[LIBRARY] require ' + modules.join(', '));
    
    _callbackPending += modules.length;

    _callbackStack.unshift({
      "attempts" : 0,
      "modules" : modules,
      "callback" : callback
    });

    var success = function anon_requireSuccess(){
      _callbackPending -- ;

      if(0 === _callbackPending){
        //There are some callbacks pending
        if(null === _callbackTimer){
          jQuerySap.log.debug('[LIBRARY] require: Timer created.');
          _callbackTimer = window.setInterval(function(){ 
            _checkModules(_this);
          }, 250);
        }
      }
      else{
        //No callbacks are pending, stop the timer
        _clearTimer(_this);
      }
    };

    var error = function anon_requireError(e, status){
      _clearTimer(_this);

      console.log(e);
      throw new Error('Could not load module: ' + status);
    };
    
    var loadScriptsSuccess = function(){
      if(null === _callbackTimer){
    	  jQuerySap.log.debug('[LIBRARY] require: Timer created.');
          _callbackTimer = window.setInterval(function(){ 
            _checkModules(_this);
          }, 250);
        }
    }

    var loadModules = [];
    for(var i = 0; i < modules.length; i++){
      var scriptUrl = jQuerySap.getModulePath(modules[i]) + '.js';
      
      if( !(scriptUrl in _requiredModules) ){
        if( !jQuerySap.getObject(modules[i]) ){
            loadModules.push(scriptUrl);
        }

        _requiredModules[scriptUrl] = true;
      }
    }

    if(loadModules.length === 0){
      loadScriptsSuccess();
    }
    else{ 
      var scriptBlock = new ui5strap.ScriptBlock();
      scriptBlock.load(loadModules, function(){
        scriptBlock.execute();
        loadScriptsSuccess();
      });
    } 
    
  };

  //End of library

}());

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


(function ($) {
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

}(jQuery));