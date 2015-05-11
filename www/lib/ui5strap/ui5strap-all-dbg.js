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
        	version: "0.9.4"
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
    transitionTimeout : 2000,
    layerTimeout : 1000
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
    	  id : layerId,
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
      
      var layer = this.layers[layerId],
      	  $layer = layer.$domElement;

      if(!layer || visible == layer.visible){
    	  //If the layer is not defined or its already visible/invisible, just call the callback
        callback && callback();
        return;
      }
      
      layer.visible = visible;
      
      if(layer.busy){
    	  //Apply Css immediately if the layer is busy but a new request comes in
    	  $layer.css({
              display : visible ? 'block' : 'none',
              opacity : visible ? 1 : 0
          });
    	  
    	  //Call the existing callback
    	  layer.busy(null);
    	  
    	  callback && callback();
          
    	  return;
      }
      
      if(visible){
        $layer.css({
          display : 'block',
          opacity : 0
        });
      }

      var triggered = false,
      	  transTimeout = null,
          transCallback = function(ev){
    	      if(triggered){
                 return;
              }
              
    	      window.clearTimeout(transTimeout);
              
    	  	  triggered = true;
    	  	  
    	  	  if(null === ev){
    	  		  //Callack executed by another instance
    	  		  jQuery.sap.log.warning("Transition of layer " + layer.id + " has been canceled by another instance.");
    	  	  }
    	  	  else{
	    	  	  //Callback executed either by transition end event or timout
    	  		  
    	  		  if(!visible){
	                  $layer.css('display', 'none');
	              }
	    	  	  
	    	  	  if(!ev){
	    	  		  jQuery.sap.log.warning("Layer '" + layerId + "' transition-end event failed - timeout triggered.");
	    	  	  }
    	  	  }
              
    	  	  delete layer.busy;
    	  	  
              callback && callback();
          };
      
      layer.busy = transCallback;
          
      //Transition timeout
      transTimeout = window.setTimeout(transCallback, ui5strap.options.layerTimeout);
      
      ui5strap.polyfill.requestAnimationFrame(function(){
	      //Transition end event
	      $layer.one(ui5strap.support.transitionEndEvent, transCallback);
	  	
	      //Start transition
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

  /*
  var _callbackStack = [],
    _callbackTimer = null,
    _requiredModules = {},
    _checkModules = function(_this){
	    jQuerySap.log.debug('[LIBRARY] _checkModules');
	    
	    var i = 0;
	    while(i < _callbackStack.length){
		      var request = _callbackStack[i],
		      	  modulesExecuted = true;
		      
		      for(var j = 0; j < request.modules.length; j++){
			        if(!jQuerySap.getObject(request.modules[j])){
			        	modulesExecuted = false;
				        request.attempts ++ ;
				        if(request.attempts === 10){
				            throw new Error("Could not find module '" + request.modules[j] + "'");
				        }
				        
				        break;
			        }
		      }
		
		      //Run the callback
		      if(modulesExecuted){
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
	    	_callbackTimer = null;
	    }
	    else{
	    	_callbackTimer = window.setTimeout(function(){ 
	             _checkModules(_this);
	        }, 200);
	    }
	};
  */

  /*
  * Require one or more JavaScript Module, evaluated as one large script block.
  */
  ui5strap.require = function(modules, callback){
	    var _this = this;
	
	    if(typeof modules === 'string'){
	    	modules = [modules];
	    }
	
	    jQuerySap.log.debug('[LIBRARY] require ' + modules.join(', '));
	    
	    var loadModules = [];
	    	//loadModuleNames = [];
	    for(var i = 0; i < modules.length; i++){
	    	  var moduleName = modules[i],
		      	  scriptUrl = jQuerySap.getModulePath(moduleName) + '.js';
		      
	    	  if( !jQuerySap.getObject(moduleName) ){ //&& !_requiredModules[scriptUrl] 
		          loadModules.push(scriptUrl);
		          //loadModuleNames.push(moduleName);
		      }
		      
	    	  //_requiredModules[scriptUrl] = true;
	    }
	    
	    if(loadModules.length === 0){
	    	callback && callback();
	    }
	    else{ 
	    	/*
	    	_callbackStack.unshift({
		      "attempts" : 0,
		      "modules" : loadModuleNames,
		      "callback" : callback
		    });
		    */
	    	
		    var scriptBlock = new ui5strap.ScriptBlock();
		    scriptBlock.load(loadModules, function(){
		        scriptBlock.execute();
		        
		        /*
		        if(null === _callbackTimer){
			    	_checkModules(_this);
			    }
			    */
		        callback && callback();
		    });
	    } 
    
  };
  
  /**
   * Read a text file via GET
   */
  ui5strap.readTextFile = function(url, dataType, success, error){
	  jQuery.ajax({
			"dataType": "json",
			"url": url,
			"success": success,
			"error" : error
	  });
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

}(jQuery));;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionFunctions
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
	
	jQuery.sap.declare('ui5strap.ActionFunctions');

	var ActionFunctions = {};

	ui5strap.ActionFunctions = ActionFunctions;

	ActionFunctions.set = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._setParameter(paramKey, arguments[paramKey]);
			this._log.debug("{set} '" + paramKey + "' = '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.copy = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._copyParameter(paramKey, arguments[paramKey]);
			this._log.debug("{copy} '" + paramKey + "' => '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.move = function(arguments){
		var argumentKeys = Object.keys(arguments),
			argumentKeysLength = argumentKeys.length;
		for(var i = 0; i < argumentKeysLength; i++){
			var paramKey = argumentKeys[i];
			this._moveParameter(paramKey, arguments[paramKey]);
			this._log.debug("{move} '" + paramKey + "' => '" + arguments[paramKey] + "'");
		}
	};

	ActionFunctions.not = function(arguments){
		if(!("srcParam" in arguments)){
			this._log.error("{func} missing argument 'srcParam'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			arguments.tgtParam = arguments.srcParam;
		}

		var srcParamValue = this._getParameter(arguments.srcParam);
		if(null === srcParamValue){
			this._log.error("{not} missing parameter '" + arguments.srcParam + "'");
			return false;
		}

		this._setParameter(arguments.tgtParam, !srcParamValue);
	};

	ActionFunctions["switch"] = function(arguments){
		if(!("srcParam" in arguments)){
			this._log.error("{func} missing argument 'srcParam'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			arguments.tgtParam = arguments.srcParam;
		}

		var srcParamValue = this._getParameter(arguments.srcParam);
		if(null === srcParamValue){
			this._log.error("{switch} missing parameter '" + arguments.srcParam + "'");
			return false;
		}

		var casesKeys = Object.keys(arguments.cases),
			casesKeysLength = argumentKeys.length;
		for(var i = 0; i < casesKeysLength; i++){
			var switchValue = casesKeys[i];
			if(srcParamValue === switchValue){
				this._log.debug("{switch} set '" + arguments.tgtParam + "' = '" + arguments.cases[switchValue] + "'");
				this._setParameter(arguments.tgtParam, arguments.cases[switchValue]);
				return true;
			}
		}
		if("default" in arguments){
			this._log.debug("{switch} set default '" + arguments.tgtParam + "' = '" + arguments["default"] + "'");
			this._setParameter(arguments.tgtParam, arguments["default"]);
			return true;
		}
		this._log.warning("{switch} no matching value found for parameter '" + arguments.srcParam + "'");
		return false;
	};

	ActionFunctions.jquery = function(arguments){
		if(!("selector" in arguments)){
			throw new Error("{jquery} missing argument 'selector'");
		}

		if(!("methodName" in arguments)){
			throw new Error("{jquery} missing argument 'methodName'");
		}

		if(!("methodArgs" in arguments)){
			throw new Error("{jquery} missing argument 'methodArgs'");
		}

		if(!("tgtParam" in arguments)){
			throw new Error("{jquery} missing argument 'tgtParam'");
		}

		var $el = jQuery(arguments.selector);

		if($el.size() === 0){
			return false;
		}

		if(!(arguments.methodName in $el)){
			throw new Error($el + " has no method '" + arguments.methodName + "'");
		}

		var functionArgs = [],
			argumentKeys = Object.keys(arguments.methodArgs),
			argumentKeysLength = argumentKeys.length;
		
		for(var i = 0; i < argumentKeysLength; i++){
			var funcArg = argumentKeys[i];
			var srcParamValue = this._getParameter(arguments.methodArgs[funcArg]);
			if(null === srcParamValue){
				this._log.error("{func} missing parameter '" + arguments.methodArgs[funcArg] + "'");
				return false;
			}
			functionArgs.push(srcParamValue);
		}

		var methodResult = $el[arguments.methodName].apply($el, functionArgs);
		
		this._setParameter(arguments.tgtParam, methodResult);
	};

	ActionFunctions.func = function(arguments){
		

		if(!("funcName" in arguments)){
			this._log.error("{func} missing argument 'funcName'");
			return false;
		}

		if(!("funcArgs" in arguments)){
			this._log.error("{func} missing argument 'funcArgs'");
			return false;
		}

		if(!("tgtParam" in arguments)){
			this._log.error("{func} missing argument 'tgtParam'");
			return false;
		}

		var functionArgs = [],
			argumentKeys = Object.keys(arguments.funcArgs),
			argumentKeysLength = argumentKeys.length;
		
		for(var i = 0; i < argumentKeysLength; i++){
			var funcArg = argumentKeys[i];
			var srcParamValue = this._getParameter(arguments.funcArgs[funcArg]);
			if(null === srcParamValue){
				this._log.error("{func} missing parameter '" + arguments.funcArgs[funcArg] + "'");
				return false;
			}
			functionArgs.push(srcParamValue);
		}

		var functionRef = jQuery.coolui5.getObject(arguments.funcName);
		var functionThis = jQuery.coolui5.getObject(arguments.funcName, 1);


		var functionResult = functionRef.apply(functionThis, functionArgs);

		this._setParameter(arguments.tgtParam, functionResult);
		
		return true;
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionContext
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

	jQuerySap.declare('ui5strap.ActionContext');
	
	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.ActionFunctions");

	/*
	* @constructor
	*/ 
	ui5strap.Object.extend('ui5strap.ActionContext', {
		"constructor" : function(action){
			_init(this, action);
		}
	});

	var ActionContext = ui5strap.ActionContext,
		ActionContextProto = ActionContext.prototype;

	ActionContext.NUMBER = 0;

	var _paramNames = {
		"AJ1.0" : {
			"PREFIX" : "a_",
			"PARAM_ACTION" : "id",
			"PARAM_MODULES" : "modules",
			"PARAM_BINDING_CONTEXT" : "context",
			"PARAM_DOM_SELECTOR" : "selector",
			"PARAM_EVENTS" : "events",
			"PARAM_FUNCTIONS" : "functions"
		},
		"AJ2.0" : {
			"PREFIX" : "__",
			"PARAM_ACTION" : "action",
			"PARAM_MODULES" : "modules",
			"PARAM_BINDING_CONTEXT" : "context",
			"PARAM_DOM_SELECTOR" : "selector",
			"PARAM_EVENTS" : "events",
			"PARAM_FUNCTIONS" : "functions"
		}
	};

	//Default Format
	ActionContext.DEFAULT_FORMAT = "AJ1.0";

	//Prefix
	ActionContext.PREFIX = 'PREFIX';

	//Action Name
	ActionContext.PARAM_ACTION = 'PARAM_ACTION';
	
	//AM Modules
	ActionContext.PARAM_MODULES = 'PARAM_MODULES';
	
	//Binding Context
	ActionContext.PARAM_BINDING_CONTEXT = 'PARAM_BINDING_CONTEXT';
	
	//DOM Selector
	//@deprecated
	ActionContext.PARAM_DOM_SELECTOR = 'PARAM_DOM_SELECTOR';
	
	//Action Events
	ActionContext.PARAM_EVENTS = 'PARAM_EVENTS';
	
	//Action Functions
	ActionContext.PARAM_FUNCTIONS = 'PARAM_FUNCTIONS';

	/*
	* Init log
	* @private
	*/
	var _initLog = function(_this){
		_this._log = {
			debug : function (message) {
				_this.app.log.debug(_this + ' ' + message);
			},

			warning : function (message) {
				_this.app.log.warning(_this + ' ' + message);
			},

			error : function (message) {
				_this.app.log.error(_this + ' ' + message);
			},

			info : function (message) {
				_this.app.log.info(_this + ' ' + message);
			},

			fatal : function (message) {
				_this.app.log.fatal(_this + ' ' + message);
			}
		};
	};

	/*
	* @private
	*/
	var _init = function(_this, action){
		
		//App Reference
		if(!action.app){
			throw new Error('App reference required!')
		}
		_this.app = action.app;

		//Files
		_this.FILES = [];

		//Data to parse
		_this.PARSE = [];

		//Default parameters
		if(action.parameters){
			var actionParametersType = typeof action.parameters;
			if(actionParametersType === 'object'){
				_this.defaultParameters = jQuery.extend({}, action.parameters);

				//Set parameters to default format
				if(!_this.defaultParameters.__format){
					_this.defaultParameters.__format = ActionContext.DEFAULT_FORMAT;
				}
			}
			else{
				//parameters is a string
				throw new Error('Context Parameters must be an object!');
			}
		}
		
		//Event
		if(action.event){ //Expected sap.ui.base.Event instance 
			var oEvent = action.event;

			//Add sap.ui.base.Event object to context
			_this.event = oEvent;

			//Event Source
			var eventSource = oEvent.getSource();
			if(eventSource instanceof sap.ui.base.EventProvider){ //Expected sap.ui.base.EventProvider
				_this.eventSource = eventSource;

				var customData = eventSource.data();
				if(customData && Object.keys(customData).length){ //Expected object
					_this.PARSE.push(customData);
					
					//Format check
					//TODO: Make this better
					if((!_this.defaultParameters || !_this.defaultParameters.__format) && !customData.__format){
						customData.__format = ActionContext.DEFAULT_FORMAT;
					}
				}
			}

			//Event parameters (e.g. from a list selection)
			var eventParameters = oEvent.getParameters();
			if(eventParameters){
				_this.eventParameters = eventParameters;
			}
		
		}

		//OpenUI5 Standard Controller
		if(action.controller){
			//Add Controller reference to context
			_this.controller = action.controller;

			//View
			_this.view = action.controller.getView();

			//Make viewData available
			_this.viewData = _this.view.getViewData();
		}

		//Custom data
		if(action.data){
			//Add custom Data to context
			_this.data = action.data;
		}

		//Local Storage && Session Storage
		_this.localStorage = localStorage ? localStorage : {};
		_this.sessionStorage = sessionStorage ? sessionStorage : {};
		
		//_this.window = window;
		//_this.document = document;
		
		//Number
		ActionContext.NUMBER ++;
		_this._actionNumber = ActionContext.NUMBER;

		//Call stack
		_this._callStack = [];

		//Init Log
		_initLog(_this);
		
		//Merge the context
		_this._merge();
	};

	/*
	* Parse data and merge it into the context
	* @private
	*/
	var _parseAndMerge = function(_this, customData){
		var customDataKeys = Object.keys(customData),
			customDataKeysLength = customDataKeys.length;
		
		for ( var i = 0; i < customDataKeysLength; i++ ){
			var customDataKey = customDataKeys[i],
				iContent = ui5strap.Utils.parseIContent(customData[customDataKey]),
				iContentType = typeof iContent;
			if(iContentType === 'string'){
				//iContent is a string, just set or replace the value in the parameter pool
				_this.parameters[customDataKey] = iContent;
			}
			else if(iContentType === 'object'){ 
				//iContent is an object, if parameter already exists in pool, deep copy, otherwise just set
				if(_this.parameters[customDataKey]){
					jQuery.extend(true, _this.parameters[customDataKey], iContent);
				}
				else{
					_this.parameters[customDataKey] = iContent;
				}

			} 
		}
	};

	/*
	* Apply functions
	* @private
	*/
	var _applyFunctions = function(_this, parameterKey){
		var paramFunctions = _this._getParameter(parameterKey);

		if(paramFunctions){ //Expected array
			var paramFunctionsLength = paramFunctions.length,
				availableFunctions = ui5strap.ActionFunctions;
			_this._log.debug("CALLING " + paramFunctionsLength + " FUNCTIONS OF " + parameterKey);
				
			for( var i = 0; i < paramFunctionsLength; i++ ){
				var functionDef = paramFunctions[i],
					functionName = functionDef['function'];

				if(availableFunctions[functionName]){
					_this._log.debug("Calling parameter function '" + functionName + "'");
					var funcResult = availableFunctions[functionName].call(_this, functionDef.args);
					if(false === funcResult){
						throw new Error("Parameter function '" + functionName + "' failed.");
					}
				}
				else{
					throw new Error('Invalid function: ' + functionName);
				}
			}
		}	

	};

	/*
	* Creates an action parameter based on the prefix for actions
	* @Static
	*/
	ActionContextProto.parameterKey = function (parameterKey, prefix){
		if(!this.parameters.__format || !_paramNames[this.parameters.__format]){
			throw new Error('Cannot read parameter "' + parameterKey + '": Invalid action format: ' + this.parameters.__format);
		}

		var paramData = _paramNames[this.parameters.__format],
			actionParam = paramData[ActionContext.PREFIX] + paramData[parameterKey];
		
		if(prefix){
			actionParam = prefix + '.' + actionParam;
		}
		
		return actionParam;
	};

	/*
	* Gets a parameter by key
	* @Protected
	*/
	ActionContextProto._getParameter = function(parameterKey){
		if(-1 !== parameterKey.indexOf('.')){
			var keyParts = parameterKey.split('.'),
				pointer = this,
				i=0;
			
			while(i < keyParts.length){
				if(keyParts[i] in pointer){ // && null !== pointer[keyParts[i]]
					pointer = pointer[keyParts[i]];
					i++;
				}
				else{
					return null;
				}
			}
			
			return pointer;
		}	
		
		//Without a dot in the key, use "parameters"
		//TODO Is this ever happen somewhere?
		if(!(parameterKey in this.parameters)){
			return null;
		}

		return this.parameters[parameterKey];
	};

	/*
	* @Protected
	*/
	ActionContextProto._setParameter = function(parameterKey, parameterValue){
			if(-1 !== parameterKey.indexOf('.')){
				var keyParts = parameterKey.split('.'),
					pointer = this,
					i=0;
				while(i < keyParts.length){
					var keyPart = keyParts[i];
					
					if(i === keyParts.length - 1){
						 pointer[keyPart] = parameterValue;
					}
					else if(!(keyPart in pointer)){
						pointer[keyPart] = {};
					}
					
					pointer = pointer[keyPart];
					i++;
					
				}
				return this;
			}	
			
			//Without a dot in the key, use "parameters"
			//TODO Is this ever happen somewhere?
			this.parameters[parameterKey] = parameterValue;

			return this;
	};

	/*
	* @Protected
	*/
	ActionContextProto._deleteParameter = function(parameterKey){
			delete this.parameters[parameterKey];

			return this;
	};

	/*
	* @Protected
	*/
	ActionContextProto._copyParameter = function(parameterKeySrc, parameterKeyTgt){
		var paramSrcValue = this._getParameter(parameterKeySrc);
		if(null !== paramSrcValue){
			this._setParameter(parameterKeyTgt, paramSrcValue);
		}

		return this;
	};

	/*
	* @Protected
	*/
	ActionContextProto._moveParameter = function(parameterKeySrc, parameterKeyTgt){
		this._copyParameter(parameterKeySrc, parameterKeyTgt);
		this._deleteParameter(parameterKeySrc);

		return this;
	};

	/*
	* Merge the parameters from custom data into the existing computed parameters
	* @protected
	*/
	ActionContextProto._merge = function(){
			this._log.debug("MERGING PARAMETERS");
			
			//Reinitialize parameters with default values
			this.parameters = {};
			
			//Add JSON Files in opposite order
			for (var i = this.FILES.length-1; i >= 0; i--){
				jQuery.extend(true, this.parameters, this.FILES[i]);
			}

			if(this.defaultParameters){
				//Add Default Values
				jQuery.extend(true, this.parameters, this.defaultParameters);
			}

			//Parse and add Custom Data 
			for (var i = 0; i < this.PARSE.length; i++){
				_parseAndMerge(this, this.PARSE[i]);
			}

			//Load additional data from DOM nodes and Control Context
			//@deprecated
			//this._fetch("parameters");

			//If a format is present, we can process the parameters
			if(this.parameters.__format){
				this._process("parameters");
			}
			
	};

	/*
	* @protected
	*/
	ActionContextProto._process = function(parameterKey){
		_applyFunctions(this, this.parameterKey(ActionContext.PARAM_FUNCTIONS, parameterKey));
	};

	/*
	* Fetch additional data from a dom node and from a binding context inside the event
	* @deprecated
	* @Protected
	*
	ActionContextProto._fetch = function(parameterKey){
		jQuery.sap.log.debug("F ActionContext::_fetch ('" + parameterKey + "')");

		//DOM Selector
		//@deprecated
		var domsel = this._getParameter(this.parameterKey(ActionContext.PARAM_DOM_SELECTOR, parameterKey));
		if(domsel){ //Expected string
			
			var domsels = ui5strap.Utils.parseIContent(domsel);
			if(typeof domsels === 'string'){
				domsels = [domsels];
			}
			var domselsLength = domsels.length;
			
			if(!("DOM" in this)){
				this.DOM = {};
			}
			
			//Copy all attributes of the nodes covered by domselKey
			for ( var i = 0; i < domselsLength; i++ ){

				var domselKey = domsels[i];
				this.DOM[domselKey] = jQuery(domselKey).attr();
			
			}
		
		}

		//Binding Context
		var bindingContextPath = this._getParameter(this.parameterKey(ActionContext.PARAM_BINDING_CONTEXT, parameterKey));
		if(this.eventParameters && bindingContextPath){ //string expected
			var eventParameters = this.eventParameters,
				eventParametersKeys = Object.keys(eventParameters),
				eventParametersKeysLength = eventParametersKeys.length;
			
			for( var i = 0; i < eventParametersKeysLength; i++ ){
				
				var eventParameterValue = eventParameters[ eventParametersKeys[i] ];
				if(eventParameterValue instanceof sap.ui.core.Control){
					var oBindingContext = eventParameterValue.getBindingContext(bindingContextPath);
					if(oBindingContext){ //object expected
						var bModel = oBindingContext.getModel();
						if(bModel){ //sap.ui.core.model.Model expected
							var bPath = oBindingContext.getPath(); 
							
							if(!("CONTEXT" in this)){
								this.CONTEXT = {};
							}

							this.CONTEXT[bindingContextPath] = {
									"model" : bModel,
									"path" : bPath,
									"data" : bModel.getProperty(bPath)
							};

						}
						else{
							this._log.error('Invalid model in binding context: ' + bindingContextPath);
						}
					}
					else{
						this._log.error('Invalid binding context: ' + bindingContextPath);
					}
				}

			}
		}
	};
	*/

	/*
	* 
	* Executes an AM Module (ui5strap.ActionModule)
	* @protected
	*/
	ActionContextProto._run = function(instanceDef){
		//Set index
		instanceDef.index = this._callStack.length;
		
		//Push to callstack
		this._callStack.push(instanceDef);

		var actionModuleName = instanceDef.module,
			ActionModuleConstructor = ui5strap.Utils.getObject(actionModuleName),
			oActionModule = new ActionModuleConstructor();
					
		if(!(oActionModule instanceof ui5strap.ActionModule)){
			throw new Error("Error in action '" + this + "':  '" + actionModuleName +  "' must be an instance of ui5strap.ActionModule!");
		}

		oActionModule.init(this, instanceDef).execute();
	};

	/*
	* String representation of the context
	* @public
	*/
	ActionContextProto.toString = function(){
		return '[ACTION#' + this._actionNumber + ']';
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionModule
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

	jQuery.sap.declare("ui5strap.ActionModule");

	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.ActionContext");

	ui5strap.Object.extend("ui5strap.ActionModule");

	var ActionModule = ui5strap.ActionModule,
		ActionModuleProto = ActionModule.prototype,
		ActionContext = ui5strap.ActionContext;

	/*
	* Name of the event that is triggered when the event is completed
	*/
	ActionModule.EVENT_COMPLETED = "completed";

	/*
	* Namespace of the action module instance
	*/
	ActionModuleProto.namespace = 'action';

	/*
	* Defined parameters for this action module
	*/
	ActionModuleProto.parameters = {};

	/**
	* Initializes the action module
	*/
	ActionModuleProto.init = function(context, instanceDef){
		this.context = context;
		this._instanceDef = instanceDef;
		
		context._log.debug("INIT " + this);
		
		if(instanceDef.namespace){
			this.namespace = instanceDef.namespace;
		}
		
		//Test if Namespace is valid
		var paramPrefix = context.parameterKey("");
		if(jQuery.sap.startsWith(this.namespace, paramPrefix)){
			throw new Error("Action namespace must not start with '" + paramPrefix + "'!");
		}

		return this;
	};

	/**
	 * String representation of the Module
	 */
	ActionModuleProto.toString = function(){
		return this._instanceDef.module + ' ' + this.context;
	};

	/**
	* Returns the Definition for a Parameter
	* @public
	* @return The Definition or null
	*/
	ActionModuleProto.getParameterDefinition = function(parameterKey){
		return this.parameters[parameterKey] || null;
	};	

	/**
	* Returns a Field (type, defaultValue, etc) of a Parameter Definition
	* @public
	* @return The Field intormation or null
	*/
	ActionModuleProto.getParameterDefinitionField = function(parameterKey, fieldKey){
		var paramDef = this.getParameterDefinition(parameterKey);

		if(!paramDef){
			//Parameter is not defined in module
			return null;
		}

		return paramDef[fieldKey] || null;
	};	

	/*
	* Creates a action module specific parameter key
	* @protected
	*/
	ActionModuleProto._createParameterKey = function(parameterKey){
		if(-1 !== parameterKey.indexOf('.')){
			return parameterKey;
		}
		
		//By default, use the Module's Namespace
		return 'parameters.' + this.namespace + '.' + parameterKey;
	};	

	/*
	* Gets the value of an action module specific parameter
	* @public
	*/
	ActionModuleProto.getParameter = function(parameterKey){
		return this.context._getParameter(this._createParameterKey(parameterKey));
	};

	/**
	* Returns the type of an Parameter
	* @public
	*/
	ActionModuleProto.getParameterType = function(parameterKey){
		var paramValue = this.getParameter(parameterKey);
		if(null === paramValue){
			//Parameter does not exist
			return false;
		}
		
		//Return the Type
		return typeof paramValue;
	};	

	/*
	* Sets an action module specific parameter to the action context
	* @public
	*/
	ActionModuleProto.setParameter = function(parameterKey, parameterValue){
		return this.context._setParameter(this._createParameterKey(parameterKey), parameterValue);
	};

	/*
	* Deletes an action module specific parameter from the action context
	* @public
	*/
	ActionModuleProto.deleteParameter = function(parameterKey){
		return this.context._deleteParameter(this._createParameterKey(parameterKey));
	};


	//--------------------------

	/*
	* Execute the action module
	* @public
	*/
	ActionModuleProto.execute = function(){
		this.context._log.debug("EXECUTE " + this);

		//Apply local parameter functions
		this.context._process("parameters." + this.namespace);

		//Prepare parameters
		this.prepareParameters();

		//test if parameters match conditions
		if(!this.testConditions()){
			this.context._log.debug("CONDITIONS DONT MATCH " + this);
		}
		else{
			this.validateParameters();

			this.run();
		}

		//Exceution complete
		this.completed();

		this.context._log.debug("EXECUTION COMPLETE " + this);
	};

	/*
	* Prepare the action module and parameters
	* @protected
	*/
	ActionModuleProto.prepareParameters = function(){
		//throw new Error('Please override the prepareParameters method in action module ' + this);
	};

	/*
	* Check if the conditions for this action module are met
	* @protected
	*/
	ActionModuleProto.testConditions = function(){
		this.context._log.debug("TEST CONDITIONS " + this.context.action_conditions);
		
		//TODO Implement Action Conditions
		
		return true;
	};	

	/*
	* Validate the parameters of this action module
	* @protected
	*/
	ActionModuleProto.validateParameters = function(){
		this.context._log.debug("VALIDATE PARAMETERS " + this);

		for(paramKey in this.parameters){
			var paramDef = this.getParameterDefinition(paramKey);
			var publicParamKey = this._createParameterKey(paramKey);
			if(null === paramDef){
				throw new Error("missing definition for parameter '" + paramKey + "'.");
			}

			var typeDef = this.getParameterDefinitionField(paramKey, "type"); 
			if( null === typeDef ){
				throw new Error("missing type definition for parameter '" + paramKey + "'.");
			}

			if(typeof paramDef.type === 'string'){
				paramDef.type = [paramDef.type];
			}

			
			var parameterValue = this.getParameter(paramKey);
			
			//Test if required param exists
			if( paramDef.required ){
				if(null === parameterValue){
					throw new Error("missing required action parameter: " + publicParamKey);
				}
			}

			//Set default value
			var defaultValueDef = this.getParameterDefinitionField(paramKey, "defaultValue");
			if( null !== defaultValueDef && null === parameterValue){
				this.setParameter(paramKey, defaultValueDef);
			}

			//Check if the parameter type is correct
			var parameterType = this.getParameterType(paramKey);
			if( ( null !== parameterValue ) && ( -1 === jQuery.inArray(parameterType, paramDef.type) ) )
			{
				throw new Error(this + ": wrong type '" + parameterType + "' (expected: " + JSON.stringify(paramDef.type) + ") for parameter '" + publicParamKey + "'.");
			}

		}

		return true;
	};

	ActionModuleProto.findControl = function(){
		var theControl = null,
			controlId = this.getParameter("controlId"),
			scope = this.getParameter("scope");

		if("APP" === scope){
			theControl = this.context.app.getRootControl();
			
			if(null !== controlId){
				theControl = this.context.app.getControl(controlId, this.getParameter("viewId"));
			}
		}
		else if("VIEW" === scope){ 
			if(!this.context.controller){
				throw new Error("Cannot use scope 'VIEW': no 'controller' in context!");
			}

			//By default, use current view as control
			theControl = this.context.controller.getView();
			
			if(controlId){ //Expected string
				theControl = this.context.app.getControl(controlId, theControl.getId());
			}
		}
		else if("SOURCE" === scope){
			if(!this.context.eventSource){
				throw new Error("Cannot use scope 'SOURCE': no 'eventSource' in context!");
			}
			
			theControl = this.context.eventSource;
		}
		else if("SELECTION" === scope){
			if(!this.context.eventSource || !this.context.eventSource.getSelectedControl){
				throw new Error("Cannot use scope 'SELECTION': no 'eventSource' in context or no selection support!");
			}

			theControl = this.context.eventSource.getSelectedControl();
		}
		
		if(!theControl){
			//Either scope or controlId is invalid
			throw new Error('Could not find Control (SCOPE: ' + scope + ', ID: ' + controlId + ')');
		}

		return theControl;
	};

	/*
	* Run the action module
	* @protected
	*/
	ActionModuleProto.run = function(){
		throw new Error('Please override the run method in action module ' + this);
	};

	ActionModuleProto.fireEvents = function(eventName){
		ui5strap.Action.executeEventModules(
			this.context,
			"parameters" 
				+ "." 
				+ this.namespace,
			eventName
		);
	};

	/*
	* Called when the action module has been completed
	* @protected
	*/
	ActionModuleProto.completed = function(){
		this.fireEvents(ActionModule.EVENT_COMPLETED);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Action
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

	jQuerySap.declare('ui5strap.Action');

	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.ActionContext");
	jQuerySap.require('ui5strap.ActionModule');

	ui5strap.Object.extend("ui5strap.Action");

	var Action = ui5strap.Action,
		ActionProto = Action.prototype,
		ActionContext = ui5strap.ActionContext,
		ActionModule = ui5strap.ActionModule;

	Action.cache = {};

	/*
	* @private
	* @static
	*/
	var _getActionInstanceDef = function (actionModuleName){
		var instanceDef = {};

		if(typeof actionModuleName === 'string'){
			//If string, the namespace is taken from the protoype
			instanceDef.module = actionModuleName;
		}	
		else if(typeof actionModuleName === 'object'){
			//Action Module def is an object, it can contain a custom namespace 
			instanceDef = actionModuleName;
		}
		else{
			//Action Module def is invalid
			throw new Error('Invalid action module: ' + actionModuleName);
		}

		return instanceDef;
	};

	/*
	* Executes a list of AM Modules
	* @private
	* @static
	*/
	var _executeModules = function(context, actionModulesList){
		if(typeof actionModulesList === 'string'){
			actionModulesList = [actionModulesList];
		}

		var jsModules = [],
			instanceDefs = [],
			actionModulesListLength = actionModulesList.length;
				
		for ( var i = 0; i < actionModulesListLength; i++ ) { 
			var actionInstanceDef = _getActionInstanceDef(actionModulesList[i]);
			instanceDefs.push(actionInstanceDef);
			jsModules.push(actionInstanceDef.module);
		}

		//Load Action Modules
		ui5strap.require(jsModules, function require_complete(){
			
			var instanceDefsLength = instanceDefs.length;
			for ( var i = 0; i < instanceDefsLength; i++ ) { 
				context._run(instanceDefs[i]);
			}
		
		});
	};

	/*
	* Executes the action modules that are defined in the class parameter of the current context
	* @private
	* @static
	*/
	var _execute = function(context){
		var actionModuleNameParameter = context.parameterKey(ActionContext.PARAM_MODULES),
			actionModuleName = context._getParameter(actionModuleNameParameter);
		
		if(actionModuleName){ //Expected string
			context._deleteParameter(actionModuleNameParameter);
			_executeModules(context, ui5strap.Utils.parseIContent(actionModuleName));
		}
		else{   
			throw new Error("Invalid action '" + context + "': '" + actionModuleNameParameter + "' attribute is missing!");
		}
	};

	/*
	* @private
	* @static
	*/
	var _extendContextFromFileOrMerge = function(context, actionName, callback){
		if(actionName){ //Expected string or object
			var actionNamesList = ui5strap.Utils.parseIContent(actionName); 
			if(typeof actionNamesList === 'object'){
				var eventId = context.event.getId();
				//Different actions for each event
				if(!eventId || !actionNamesList[eventId]){
					throw new Error('Cannot execute action: no action for eventId ' + eventId);
				}
				actionName = actionNamesList[eventId];
			}
			
			Action.loadFromFile(actionName, function _loadActionFromFile_complete(actionJSON){

				//Action JSON files cannot be loaded if they differ in format
				//TODO: Make this better
				actionJSON.__format = actionJSON.__format || ActionContext.DEFAULT_FORMAT;
				if(context.parameters.__format && context.parameters.__format !== actionJSON.__format){
					throw new Error('Cannot load action "' + actionName + '": Bad format: ' + actionJSON.__format + " (expected: " + context.parameters.__format + ")");
				}
				else{
					//If no format string prensent in context, set it to the format of the JSON
					context.parameters.__format = actionJSON.__format;
				}

				//Add to context
				context.FILES.push(actionJSON);

				//Recursive call
				_extendContextFromFileOrMerge(context, actionJSON[context.parameterKey(ActionContext.PARAM_ACTION)], callback);

			});
			
		}
		else{
			context._merge();

			callback && callback();
		}
	};
	
	/*
	* Load an action from a json file
	* @private
	* @static
	*/
	Action.loadFromFile = function(actionName, callback){
		var actionCache = Action.cache;
		if(actionCache[actionName]){
			callback && callback(actionCache[actionName]);
			
			return;
		}
		
		var actionUrl = jQuerySap.getModulePath(actionName) + '.action.json';
		jQuerySap.log.debug("[ACTION] Loading '" + actionName + "' from '" + actionUrl + "'" );
		
		ui5strap.readTextFile(
				actionUrl, 
				'json', 
				function(data){
					actionCache[actionName] = data;
				
					callback && callback(data);
				},
				function(data){
					throw new Error('Invalid Action: "' + actionUrl + '"');
				}
		);
	};

	/*
	* Run events
	* @public
	* @static
	*/
	Action.executeEventModules = function(context, parameterKey, eventName){
		var paramEvents = context._getParameter(context.parameterKey(ActionContext.PARAM_EVENTS, parameterKey));

		if(paramEvents && paramEvents[eventName]){
			context._log.debug("Triggering event actions '" + eventName + "'...");

			//Execute one or multiple AM modules that are defined in the event
			_executeModules(context, paramEvents[eventName]);
		}
	};

	/*
	* Runs an action
	* @static
	*/
	Action.run = function(action){
		jQuerySap.log.debug("[ACTION] RUN");

		var actionName = null;
		if(action.parameters && typeof action.parameters === 'string'){
			actionName = action.parameters;
			delete action.parameters;
		}

		var context = new ActionContext(action);

		if(null === actionName){
			actionName = context._getParameter(context.parameterKey(ActionContext.PARAM_ACTION));
		}

		_extendContextFromFileOrMerge(context, actionName, function _extendContextFromFileOrMerge_complete(){
			_execute(context);
		});
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppConfig
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

(function (){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare("ui5strap.AppConfig");
	sap.ui.base.Object.extend("ui5strap.AppConfig", {
		"constructor" : function(options){
			this.options = options || {};

			this.data = {};
		}
	});

	var AppConfig = ui5strap.AppConfig,
		AppConfigProto = AppConfig.prototype;

	/*
	* Loads the configuration from an URL. URL must point to a JSON file.
	*/
	AppConfigProto.load = function(configUrl, callback){
		var _this = this;

		jQuery.ajax({
	  		"dataType": "json",
	  		"url": configUrl,
	  		"data": {},
	  		"success": function ajax_complete(configDataJSON){
	  			if(!configDataJSON.app){
					throw new Error("Invalid app configuration: attribute 'app' is missing.");
				}
	  			configDataJSON.app.url = configUrl;

	  			_this.setData(configDataJSON);

	  			callback && callback.call(_this, configDataJSON);
	  		},
	  		"error" : function ajax_error(){
	  			throw new Error('Could not load app config from url: ' + configUrl);
	  		}
		});
	};

	/*
	* @deprecated
	*/
	AppConfigProto.getFrame = function(){
		return this.data.frames['default'];
	};

	/*
	* @deprecated
	*/
	AppConfigProto.getMenuData = function(menuId){
		if(!(menuId in this.data.menus)){
			return null;
		}
		return this.data.menus[menuId];
	};

	/*
	* Returns config information about a view
	*/
	AppConfigProto.getViewConfig = function(viewDef){
		var viewName = viewDef.viewName,
			viewConfigOrg = {},
			viewOptions = {};
		
		if(viewName in this.data.views){
			viewConfigOrg = jQuery.extend({
				viewName : viewName
			}, this.data.views[viewName]);
		}

		//The "viewOptions" contain the mix of original config and definition
		jQuery.extend(viewOptions, viewConfigOrg, viewDef);

		//The final view constructor object
		var viewConfig = {
			cache : true
		};

		jQuery.extend(viewConfig, viewOptions);

		if(!viewConfig.viewData){
			viewConfig.viewData = {};
		}

		if(!viewConfig.viewData.__ui5strap){
			viewConfig.viewData.__ui5strap = {};
		}

		//Resulting view options (= viewConfigOrg + viewDef)
		viewConfig.viewData.__ui5strap.viewOptions = viewOptions;
		
		//@deprecated
		//View configuration from app.json
		viewConfig.viewData.__ui5strap.viewConfigOrg = viewConfigOrg;
		
		//Original function parameters
		viewConfig.viewData.__ui5strap.viewDef = viewDef;

		return viewConfig;
	};

	/*
	* Returns a list of events / actions for given scope, eventName and viewName
	*/
	AppConfigProto.getEvents = function(eventGroup, eventName, viewName){
		var eventList = [],
			_configData = this.data;

		if(_configData.events 
			&& _configData.events[eventGroup] 
			&& _configData.events[eventGroup][eventName]){
			eventList = eventList.concat(_configData.events[eventGroup][eventName]);
		}
		
		if(viewName){
			var viewData = this.data.views[viewName];
			if(viewData
				&& viewData.events 
				&& viewData.events[eventGroup] 
				&& viewData.events[eventGroup][eventName]){
				
				eventList = eventList.concat(viewData.events[eventGroup][eventName]);
			
			}
		}

		return eventList;
	};

	/*
	* Processes a given option
	* @static
	*/
	AppConfig.processOption = function(optionKey, option){
		if(typeof option === 'string'){
			return option;
		}
		
		if(!option.type){
			throw new Error("Invalid option: " + optionKey);
		}

		if("URI" === option.type){
			if(!("uriParam" in option)){
				throw new Error("Missing 'uriParam' in option '" + optionKey + "'");
			}

			var uriParamValue = jQuery.sap.getUriParameters().get(option.uriParam);

			if(null === uriParamValue){
				if(true === option.required){
					throw new Error('Missing uri parameter: ' + option.uriParam);
				}
				else{
					uriParamValue = option.defaultValue;
				}
			}

			return uriParamValue;
		}

		throw new Error('Invalid option type: ' + option.type);
	};

	/*
	* Resolves the raw information
	*/
	AppConfigProto.resolve = function(){
		var configDataJSON = this.data,
			viewerOptions = this.options,
			appId = this.data.app.id;

		configDataJSON.iconsResolved = {};
		var iconKeys = Object.keys(configDataJSON.icons),
			iconKeysLength = iconKeys.length;
		for(var i = 0; i < iconKeysLength; i++){
			configDataJSON.iconsResolved[iconKeys[i]] = this.resolvePath(configDataJSON.icons[iconKeys[i]]);
		}

		configDataJSON.optionsResolved = jQuery.extend({}, configDataJSON.options);
		if("override" in viewerOptions && appId in viewerOptions.override){
			jQuery.extend(configDataJSON.optionsResolved, viewerOptions.override[appId]);
		}

		var optionsKeys = Object.keys(configDataJSON.optionsResolved),
			optionsKeysLength = optionsKeys.length;

		for(var i = 0; i < optionsKeysLength; i++){
			var optionKey = optionsKeys[i],
				optionValue = configDataJSON.optionsResolved[optionKey];

			if(typeof optionValue === 'object'){
				configDataJSON.optionsResolved[optionKey] = AppConfig.processOption(optionKey, optionValue);
			}
		}
	};

	/*
	* Resolves a path relative to app location
	*/
	AppConfigProto.resolvePath = function (path){
		//Folder that contains app.json - must end with /
		var location = this.data.app.location;

		if(typeof path === 'string'){
			//If path is a string, treat is as relative or absolute path depending on first char
			
			if(jQuery.sap.startsWith(path, '/')){
				//Return path relative to servlet root (context)
				return this.options.pathToServletRoot + path;
			}
			else if(jQuery.sap.startsWith(path, './')){
				//Return relative (to html file) path unchanged
				return path;
			}
			else if(jQuery.sap.startsWith(path, 'http')){
				//Return absolute path unchanged
				return path;
			}

		}	
		else if(typeof path === 'object'){
			//If path is an object, it should contain a "src" attribute and can contain a "package" attribute
			
			if("package" in path){
				location = jQuery.sap.getModulePath(path["package"]) + "/";
			}

			path = path["src"];
		}

		return location + path;
	};

	
	
	/*
	* Validates the configuration JSON data. If mandatory properties are missing, empty ones will created.
	* @static
	*/
	AppConfig.validate = function(configDataJSON){
		if(!('app' in configDataJSON)){
			throw new Error("Invalid app configuration: attribute 'app' is missing.");
		}

		//Populate deprecated sapplication attribute
		configDataJSON.sapplication = configDataJSON.app;

		if(!('package' in configDataJSON.app)){
			throw new Error("Invalid app config: attribute 'app/package' is missing.");
		}

		if(!configDataJSON.app["package"].match(/(^[a-zA-Z0-9_]+)(\.[a-zA-Z0-9_]+)+$/)){
			throw new Error('Package name may only contain letters and digits and the underscore char, separated by a ".", and must have at least one sub package.');
		}

		if(!('id' in configDataJSON.app)){
			configDataJSON.app["id"] = configDataJSON.app["package"];
		}	

		if(!configDataJSON.app["id"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app id "' + configDataJSON.app["id"] + '": may only contain letters, digits, dots and underscores.');
		}

		if(!('namespace' in configDataJSON.app)){
			configDataJSON.app["namespace"] = configDataJSON.app["package"];
		}	

		if(!configDataJSON.app["namespace"].match(/^[a-zA-Z0-9_\.]+$/)){
			throw new Error('Invalid app namespace "' + configDataJSON.app["namespace"] + '": may only contain letters, digits, dots and underscores.');
		}

		if(!('type' in configDataJSON.app)){
			configDataJSON.app.type = 'STANDARD';
		}
		
		if(!('styleClass' in configDataJSON.app)){
			configDataJSON.app.styleClass = 'ui5strap-app-standard';
		}
		
		//App Icons
		if(!('icons' in configDataJSON)){
			configDataJSON.icons = {};
		}
		
		//App Options
		if(!('options' in configDataJSON)){
			configDataJSON.options = {};
		}
		
		//Default App Transition
		if(!('transition' in configDataJSON.app)){
			configDataJSON.app.transition = 'transition-zoom';
		}
		
		//Libraries
		if(!("libraries" in configDataJSON)){
			configDataJSON.libraries = {};
		}
		
		//Views directory
		if(!("views" in configDataJSON)){
			configDataJSON.views = {};
		}
		
		//Frames
		//@deprecated
		if(!("frames" in configDataJSON)){
			configDataJSON.frames = {};
		}

		//App Components
		if(!("components" in configDataJSON)){
			configDataJSON.components = [];
		}

		//UI5 Modules to be preloaded
		if(!("modules" in configDataJSON)){
			configDataJSON.modules = [];
		}
		
		//Actions to be preloaded
		if(!("actions" in configDataJSON)){
			configDataJSON.actions = [];
		}
		
		//Models
		if(!("models" in configDataJSON)){
			configDataJSON.models = [];
		}
		
		//Custom css files
		if(!("css" in configDataJSON)){
			configDataJSON.css = [];
		}

		//Custom JavaScript libraries
		if(!("js" in configDataJSON)){
			configDataJSON.js = [];
		}
		
		//Any kind of file to be preloaded
		if(!("resources" in configDataJSON)){
			configDataJSON.resources = [];
		}
		
		//App Events
		if(!("events" in configDataJSON)){
			configDataJSON.events = {};
		}

		//Add the location of the sapp if its not specified
		//Location always should end with a slash
		if(!("location" in configDataJSON.app)){
			var sappUrlParts = configDataJSON.app.url.split('/');
			sappUrlParts[sappUrlParts.length - 1] = '';
			configDataJSON.app["location"] = sappUrlParts.join('/');
		}
	};

	/*
	* Sets the configuration data after validating.
	*/
	AppConfigProto.setData = function(newData){
		AppConfig.validate(newData);
		
		this.data = newData;
	};

	AppConfigProto.getModel = function(){
		return new sap.ui.model.json.JSONModel(this.data);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppComponent
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.AppComponent");
	
	sap.ui.base.Object.extend("ui5strap.AppComponent", {
		"constructor" : function(app, options){
			sap.ui.base.Object.apply(this);
			
			this.app = app;
			this.options = options;
		}
	});

	var AppComponentProto = ui5strap.AppComponent.prototype;

	AppComponentProto.init = function(){

	};

	AppComponentProto.getApp = function(){
		return this.app;
	};

	/*
	AppComponentProto.getOptions = function(){
		return this.options;
	};
	*/
	
}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppFrame
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.AppFrame");
	jQuery.sap.require("ui5strap.AppComponent");
	
	ui5strap.AppComponent.extend("ui5strap.AppFrame", {
		"constructor" : function(app, options){
			ui5strap.AppComponent.call(this, app, options);

			this._targetStatus = {};

			this.vTargets = {};

			this.oTargets = {};

			this.initialized = false;
		}
	});

	var AppFrame = ui5strap.AppFrame,
		AppFrameProto = AppFrame.prototype;

	/*
	 * Must be explicitely called from outside
	 * @PostConstruct
	 * @Public
	 */
	AppFrameProto.init = function(){
		
		this.control = this._createControl();
		this._initHistory();

		//Check if old version
		if(this.getNavContainer || this._initControl){
			throw new Error("The method 'ui5strap.AppFram.prototype.getNavContainer' has been removed. Please override the method 'ui5strap.AppFram.prototype._createControl', and return your new NavContainer instance there.");
		}

	};

	AppFrameProto.getControl = function(){
		return this.control;
	};

	/*
	* @deprecated
	*/
	AppFrameProto.getConfig = function(){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.getConfig is deprecated and will be removed soon.");
		return this.app.config;
	};

	/*
	 * Creates the control that represents this AppFrame
	 * @Protected
	 */
	AppFrameProto._createControl = function(){
		//Init default NavContainer
		var frameConfig = this.options,
			navContainerOptions = {},
			navContainerModule = "ui5strap.NavContainerStandard";
		

		if('navContainerOptions' in frameConfig){
			navContainerOptions = frameConfig.navContainerOptions;
		}

		if('navContainer' in frameConfig){
			navContainerModule = frameConfig.navContainer;
		}

		jQuery.sap.require(navContainerModule);
		var NavContainerConstructor = jQuery.sap.getObject(navContainerModule);
		if(!NavContainerConstructor){
			throw new Error('Invalid NavContainer: ' + navContainerModule);
		}
		return new NavContainerConstructor(navContainerOptions);
	};

	/*
	* Inits History for navigation handling in browsers.
	*/
	AppFrameProto._initHistory = function(){

	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		this.app.log.debug('[APP_FRAME] SHOW INITIAL CONTENT');

		var _this = this,
			initialViews = this.options.initialViews,
			callI = 0;

		var complete = function(){
			callI--;
			if(callI === 0){
				if(!_this.initialized){
					_this.initialized = true;
				}

				callback && callback();
			}
		}

		if(!initialViews || initialViews.length === 0){
			callI = 1;
			complete();
			return;
		}

		callI = initialViews.length;

		for(var i = 0; i < initialViews.length; i++){
			var initialViewData = jQuery.extend({}, initialViews[i]);
			if(!_this.initialized){
				initialViewData.transition = 'transition-none';
			}
			this.gotoPage(initialViewData, complete);
		}

	};

	/*
	* Returns the currently shown page within the NavContainer's target
	* @Public
	*/
	AppFrameProto.getCurrentPage = function (target) {
		return this.control.getTarget(target);
	};

	/*
	* Returns whether the frame supports the specified target
	* @Public
	*/
	AppFrameProto.hasTarget = function(target) {
		return this.control.hasTarget(target);
	}
	
	/*
	* Returns whether a target is busy
	* @Public
	*/
	AppFrameProto.isBusy = function(target){
		if(this._targetStatus[target]){
			return true;
		}

		return false;
	};

	/*
	 * Shows a page defined by given data
	 * @Public
	 */
	AppFrameProto.toPage = function (viewConfig, callback) {
		//TODO use default target of navcontainer?
		if(!viewConfig.target){
			throw new Error('Cannot navigate to page: no "target" specified!');
		}

		var _this = this,
			target = viewConfig.target,
			oPage = this.app.createView(viewConfig);

		//Only add this page to a vTarget. Pages in vTargets are not seen by the user.
		if(viewConfig.vTarget){
			this.app.log.debug('[APP_FRAME] VIRTUALLY NAVIGATE {' + target + '}');
			this.vTargets[target] = oPage;
		
			return;
		}

		//Set target busy
		this.app.log.debug('[APP_FRAME] Target busy: "' + target + '"');
		this._targetStatus[target] = true;

		//Trigger onUpdate events
		this.control.updateTarget(viewConfig.target, oPage, viewConfig.parameters);

		//Change NavContainer to page
		this.control.toPage(
			oPage, 
			target, 
			viewConfig.transition,
			function toPage_complete(){
				
				//Set target available
				delete _this._targetStatus[target];
				_this.app.log.debug('[APP_FRAME] Target available: "' + target + '"');
				
				//Trigger callback
				callback && callback();
			
			}
		);
		
		return oPage;
	};

	/*
	* Get the viewConfig based on a definition object. Def object must contain "viewName" attribute!
	*/
	AppFrameProto.getViewConfig = function(viewDef){
		var viewConfig = this.app.config.getViewConfig(viewDef);

		//TODO use default target here...
		if(!viewConfig.target){
			viewConfig.target = this.control.defaultTarget;
		}

		//Override targets
		var target = viewConfig.target;
		if(target in this.oTargets){
			var overrideTarget = this.oTargets[target];
			delete this.oTargets[target];
			viewConfig = this.app.config.getViewConfig(overrideTarget);
		}

		return viewConfig;
	};

	AppFrameProto.validatePage = function(viewDef){
		jQuery.sap.log.warning("ui5strap.AppFrame.prototype.validatePage is deprecated and will be removed soon! Use getViewConfig instead.");
		return this.getViewConfig(viewDef);
	};

	/*
	* @Public
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		//Get final view configuration
		var viewConfig = this.getViewConfig(viewDef),
			target = viewConfig.target;

		//Get final view configuration
		var viewConfig = this.getViewConfig(viewDef),
			target = viewConfig.target;

		if(this.isBusy(target)){
			this.app.log.debug('[APP_FRAME] Target is busy: "' + target + '"');

			return false;
		}
		
		return this.toPage(viewConfig, callback);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.App
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuerySap.declare('ui5strap.AppBase');

	jQuerySap.require("ui5strap.library");
	jQuerySap.require("ui5strap.Action");

	//jQuerySap.require("sap.ui.base.Event");

	sap.ui.base.Object.extend('ui5strap.AppBase', {
		"constructor" : function(config, viewer){
			sap.ui.base.Object.apply(this);

			this.config = config;

			this.components = {};

			this._pageCache = {};
			this._events = {};

			this.isRunning = false;
			this.isVisible = false;
			this.hasFirstShow = false;
			this.hasFirstShown = false;

			this._initLog();

			/*
			* Loader
			*/
			this.setLoaderVisible = function(visible, callback){
				//ui5strap.Layer.setVisible('ui5strap-loader', visible, callback, option);
				ui5strap.Layer.setVisible(this.getDomId('loader'), visible, callback);
			};

			/*
			* Splash Screen
			*/
			this.setSplashVisible = function(visible, callback){
				callback && callback();
				//ui5strap.Layer.setVisible('ui5strap-splash', visible, callback);
			};
		}
	});

	var AppBase = ui5strap.AppBase,
		AppBaseProto = AppBase.prototype;

	/*
	* Init sapplication specific logging
	* @protected
	*/
	AppBaseProto._initLog = function(){
		var _this = this;
		this.log = {

			debug : function (message) {
				jQuery.sap.log.debug(_this + " " + message);
			},

			warning : function (message) {
				jQuery.sap.log.warning(_this + " " + message);
			},

			error : function (message) {
				jQuery.sap.log.error(_this + " " + message);
			},

			info : function (message) {
				jQuery.sap.log.info(_this + " " + message);
			},

			fatal : function (message) {
				jQuery.sap.log.fatal(_this + " " + message);
			}

		};
	};
	
	var _createAppClass = function(_this, appClasses){
		if(_this.config.data.app.styleClass){
			appClasses += " " + _this.config.data.app.styleClass;
		}
		return appClasses;
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Events -----------------------------
	* ----------------------------------------------------------
	*/

	/*
	* Initializes the App
	*/
	AppBaseProto.init = function(){
		this.onInit(new sap.ui.base.Event("ui5strap.app.init", this, {}));
	};

	/*
	* Preload JavaScript libraries
	*/
	var _preloadJavaScript = function(_this, callback){
		var scripts = _this.config.data.js;
		if(scripts.length === 0){
			callback && callback.call(_this);

			return;
		}

		var files = [];
		for(var i = 0; i < scripts.length; i++){
			var jsPath = _this.config.resolvePath(scripts[i]);

			var jsKey = 'js---' + _this.getId() + '--' + jsPath;

			if(! ( jsKey in _this._runtimeData.js ) ){	
				_this._runtimeData.js[jsKey] = jsPath;

				files.push(jsPath);
			}
		}

		var scriptBlock = new ui5strap.ScriptBlock();

		scriptBlock.load(files, function(){
			scriptBlock.execute(true);

			callback && callback.call(_this);
		});
	};

	var _preloadModels = function(_this, callback){
		_this.log.debug('PRELOADING MODELS');

		//Models
		var models = _this.config.data.models,
			callI = models.length, 
			successCallback = function(oEvent, oData){
				callI --;
				_this.log.debug('LOAD MODEL ' + oData.modelName + ' ...');
				_this.getRootControl().setModel(oData.oModel, oData.modelName);

				if(callI === 0){
					//sap.ui.getCore().setModel(oModel, model['modelName']);
					callback && callback();
				}
			},
			errorCallback = function(){
				throw new Error('Cannot load model!');
			};

		if(callI === 0){
			callback && callback();
		}

		for(var i = 0; i < models.length; i++){
			var model = models[i],
				oModel = null,
				modelType = model['type'],
				modelName = model['modelName'],
				modelSrc = _this.config.resolvePath(model);

			
			if(modelType === 'RESOURCE'){
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelSrc,
					async : true
				});
				oModel.attachRequestCompleted(
					{ 
						modelName: modelName, 
						oModel : oModel
					}, 
					successCallback
				);
				oModel.attachRequestFailed(
					{ 
						modelName: modelName, 
						modelSrc : modelSrc
					}, 
					errorCallback
				);
			}
			else if(modelType === 'JSON'){
				oModel = new sap.ui.model.json.JSONModel();
				oModel.attachRequestCompleted(
					{ 
						modelName: modelName, 
						oModel : oModel
					}, 
					successCallback, 
					oModel
				);
				oModel.attachRequestFailed(
					{
						modelName: modelName,
						modelSrc : modelSrc
					}, 
					errorCallback
				);
				oModel.loadData(modelSrc);
			}
			else{
				throw new Error('Invalid model type!');
			}
		}
	};

	var _preloadComponents = function(_this, callback){
		_this.log.debug('PRELOADING COMPONENTS');

		//Components
		var components = _this.config.data.components;

		var frameConfig = _this.config.data.frames['default'];

		if(frameConfig){
			if(!frameConfig.module){
				frameConfig.module = 'ui5strap.AppFrame';
			}
			frameConfig.id = "frame";
			components.unshift(frameConfig);
		}
		
		var loadModules = [],
			compConfigs = [];
		
		for(var i = 0; i < components.length; i++){
			var compConfig = components[i];
			
			if(!compConfig.module || !compConfig.id){
				throw new Error("Cannot load component #" + i + ": module or id attribute missing!");
			}
			else if(false !== compConfig.enabled){
				compConfigs.push(compConfig);
				loadModules.push(compConfig.module);
			}
		}
		
		ui5strap.require(loadModules, function require_complete(){
			for(var i = 0; i < loadModules.length; i++){
				var ComponentConstructor = jQuery.sap.getObject(loadModules[i]),
					compConfig = compConfigs[i],
					componentId = compConfig.id,
					oComp = new ComponentConstructor(_this, compConfig),
					methodName = 'get' + jQuery.sap.charToUpperCase(componentId);
				
				if(_this[methodName]){
					throw new Error("Name conflict: " + componentId);
				}
				
				oComp.init();
				
				_this.components[componentId] = oComp;
				
				(function(){
					var comp = oComp;
					_this[methodName] = function(){
						return comp;
					};
				}());
				
				if(compConfig.events){
					//Array of strings of format "scope.event"
					for(var j = 0; j < compConfig.events.length; j++){
						var stringParts = compConfig.events[j].split('.');
						if(stringParts.length === 2){
							(function(){
								var eventScope = stringParts[0],
									eventName = stringParts[1],
									eventHandlerName = 'on' + jQuery.sap.charToUpperCase(eventName),
									comp = oComp;
								
								_this.registerEventAction(eventScope, eventName, function on_event(oEvent){
									comp[eventHandlerName] && comp[eventHandlerName](oEvent);
								});
							}());
						}
						else{
							_this.log.error("Cannot register Component event: " + compConfig.events[j]);
						}
					}
				}
			}
	
			callback && callback();
		});
	};
	
	/*
	* Preload Actions for faster execution
	*/
	var _preloadActions = function(_this, callback){
		var actions = _this.config.data.actions,
			callI = actions.length;
		if(callI === 0){
			callback && callback.call(_this);

			return;
		}
		
		var successCallback = function(){
			callI--;
			if(callI === 0){
				callback && callback.call(_this);
			}
		};
		
		for(var i = 0; i < actions.length; i++){
			ui5strap.Action.loadFromFile(actions[i], successCallback);
		}
	};

	AppBaseProto.preload = function(callback){
		this.config.resolve();

		var _this = this;
		
		_preloadJavaScript(_this, function preloadJavaScriptComplete(){
			_preloadComponents(_this, function _preloadComponentsComplete(){
				_preloadModels(_this, function _preloadModelsComplete(){
					_preloadActions(_this, callback);
				});
			});
		});
	};

	AppBaseProto.load = function(callback){
		this.log.debug('LOAD');

		var _this = this;
		this.preload(function(){

			_this.onLoad(new sap.ui.base.Event("ui5strap.app.load", _this, {}));

			callback && callback();
		
		});
	};

	/*
	* Start the app
	*/
	AppBaseProto.start = function(callback){
		this.log.debug('START');

		var _this = this;
		if(this.isRunning){
			throw new Error(this + " is already running.");
		}
		
		this.isRunning = true;

		window.addEventListener(
			"message", 
			function on_message(event){
				_this.onMessage(new sap.ui.base.Event("ui5strap.app.message", _this, event.data));
			}, 
			false
		);

		this.onStart(new sap.ui.base.Event("ui5strap.app.start", _this, {}));

		callback && callback();
	};

	AppBaseProto.show = function(callback){
		this.log.debug('SHOW');

		this.isVisible = true;
		this.onShow(new sap.ui.base.Event("ui5strap.app.show", this, {}));

		var isFirstTimeShow = !this.hasFirstShow;
		if(isFirstTimeShow){
			this.log.debug('FIRST SHOW');
		
			this.hasFirstShow = true;
			this.onFirstShow(new sap.ui.base.Event("ui5strap.app.firstShow", this, {}));
		}

		callback && callback(isFirstTimeShow);
	};

	AppBaseProto.shown = function(callback){
		this.log.debug('SHOWN');

		var _this = this;

		ui5strap.polyfill.requestAnimationFrame(function(){
			_this.domRef.className = _createAppClass(_this, 'ui5strap-app ui5strap-app-current');
			
			_this.onShown(new sap.ui.base.Event("ui5strap.app.shown", _this, {}));

			var isFirstTimeShown = !_this.hasFirstShown;
			if(isFirstTimeShown){
				_this.log.debug('FIRST SHOWN');
				_this.hasFirstShown = true;
				_this.onFirstShown(new sap.ui.base.Event("ui5strap.app.firstShown", _this, {}));
			}

			callback && callback(isFirstTimeShown);
		});
	};

	AppBaseProto.hide = function(callback){
		this.log.debug('HIDE');
		this.isVisible = false;
		
		this.onHide(new sap.ui.base.Event("ui5strap.app.hide", this, {}));

		callback && callback();
	};

	AppBaseProto.hidden = function(callback){
		this.log.debug('HIDDEN');

		var _this = this;
		ui5strap.polyfill.requestAnimationFrame(function(){
			_this.domRef.className = _createAppClass(_this, 'ui5strap-app ui5strap-app-inactive ui5strap-hidden');
				
			_this.onHidden(new sap.ui.base.Event("ui5strap.app.hidden", _this, {}));

			callback && ui5strap.polyfill.requestAnimationFrame(callback);
		})
	};

	/*
	* Stop the app
	*/
	AppBaseProto.stop = function(callback){
		this.log.debug('STOP');

		if(!this.isRunning){
			throw new Error(this + " is not running.");
		}

		this.$().remove();
		this.domRef = null;
		this.isRunning = false;

		this.onStop(new sap.ui.base.Event("ui5strap.app.stop", this, {}));

		callback && callback();
	};

	AppBaseProto.unload = function(callback){
		this.log.debug('UNLOAD');

		ui5strap.Layer.unregister(this.overlayId);
		ui5strap.Layer.unregister(this.getDomId('loader'));

		this.onUnload(new sap.ui.base.Event("ui5strap.app.unload", this, {}));

		this.destroy();

		callback && callback();
	};

	/**
	* Triggered when a message is sent to this app
	* @public
	*/
	AppBaseProto.onMessage = function(oEvent){
		//Fire the message event
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "message",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been initialized
	* @public
	*/
	AppBaseProto.onInit = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "init",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been (pre-)loaded
	* @public
	*/
	AppBaseProto.onLoad = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "load",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been unloaded
	* @public
	*/
	AppBaseProto.onUnload = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "unload",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been started
	* @public
	*/
	AppBaseProto.onStart = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "start",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been stopped
	* @public
	*/
	AppBaseProto.onStop = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "stop",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app is going to show
	* @public
	*/
	AppBaseProto.onShow = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "show",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been shown
	* @public
	*/
	AppBaseProto.onShown = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "shown",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app is going to show for the first time
	* @public
	*/
	AppBaseProto.onFirstShow = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShow",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been shown for the first time
	* @public
	*/
	AppBaseProto.onFirstShown = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "firstShown",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app is going to hide
	* @public
	*/
	AppBaseProto.onHide = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hide",
			"orgEvent" : oEvent
		});
	};

	/*
	* Triggered when the app has been hidden
	* @public
	*/
	AppBaseProto.onHidden = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hidden",
			"orgEvent" : oEvent
		});
	};

	/*
	* Run an action that is assiged to a certain event
	* @public
	*/
	AppBaseProto.runEventAction = function (eventParameters, actionGroupId){
		this.log.debug("Executing event '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
		var actionParameters = {
			"parameters" : actionGroupId
		};

		//OpenUI5 Controller
		if("controller" in eventParameters){
			actionParameters.controller = eventParameters.controller;
		}

		//Original Event
		if("orgEvent" in eventParameters){
			actionParameters.event = eventParameters.orgEvent;
		}

		this.runAction(actionParameters);
	};

	/*
	* Fires an app event. 
	* The event is either defined in the configuration, or attached to the app instance programatically.
	* @public
	*/
	AppBaseProto.fireEventAction = function(eventParameters){
		if(this.config.data.events){
			var appEvents = this.config.data.events;
			
			//Run the events that are defined in the config
			if(eventParameters.scope in appEvents){
				var events = appEvents[eventParameters.scope];

				if(eventParameters.eventName in events){
					var eventList = events[eventParameters.eventName];
					//Run the list of events
					for(var i = 0; i < eventList.length; i++){ 
						this.runEventAction(eventParameters, eventList[i]);
					}

				}

			}
		}

		//Runtime events
		if(this._events && this._events[eventParameters.scope]){
			var events = this._events[eventParameters.scope];
			if(eventParameters.eventName in events){
				var eventList = events[eventParameters.eventName];
				//Run the list of events
				for(var i = 0; i < eventList.length; i++){ 
					var actionOrFunction = eventList[i];
					if(typeof actionOrFunction === 'function'){
						//Call the registered function with original event as parameter
						this.log.debug("Executing event function '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
						actionOrFunction.call(this, eventParameters.orgEvent);
					}
					else{
						this.runEventAction(eventParameters, actionOrFunction);
					}
				}

			}
		}
	};

	/*
	* Registers an event action to this app instance
	* @public
	*/ 
	AppBaseProto.registerEventAction = function(scope, eventName, actionOrFunction){
		if(!(scope in this._events)){
			this._events[scope] = {};
		}

		if(!(eventName in this._events[scope])){
			this._events[scope][eventName] = [];
		}
		
		this.log.debug("Registered event '" + eventName + "' for scope '" + scope + "'");
		this._events[scope][eventName].push(actionOrFunction);
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- App Overlay ------------------------------------
	* ----------------------------------------------------------------------
	*/

	/*
	* Inititalzes the overlay
	*/
	AppBaseProto.registerOverlay = function(){
		var _this = this;
		
		this.overlayId = this.getDomId('overlay');

		if(ui5strap.Layer.get(this.overlayId)){
			this._log.warning("Layer already registered: " + this.overlayId);
			return;
		}

		ui5strap.Layer.register(this.overlayId);

		this.overlayControl = new ui5strap.NavContainer();
		//this.overlayControl.placeAt(this.overlayId);
		this.overlayControl.placeAt(this.overlayId + '-content');

		var oModels = this.getRootControl().oModels;
		//var uiArea = sap.ui.getCore().createUIArea(newPage, _this);
		for(var sName in oModels){
			//page.setModel(oModel, sName);
			this.overlayControl.setModel(oModels[sName], sName);
		};

		//jQuery('#' + this.overlayId + '-backdrop').on('tap', function onTap(event){
		//	_this.hideOverlay();
		//});
	};

	/*
	* Returns whether the overlay layer is visible
	* @public
	*/
	AppBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.overlayId);
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	AppBaseProto.showOverlay = function(viewDataOrControl, callback, transitionName){
		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'transition-slide-ttb';
		
		ui5strap.Layer.setVisible(this.overlayId, true, function(){
			if(!(viewDataOrControl instanceof sap.ui.core.Control)){
				viewDataOrControl = _this.createView(_this.config.getViewConfig(viewDataOrControl));
			}
			overlayControl.toPage(viewDataOrControl, "content", transitionName, callback);
		});
	};

	/*
	* Hides the overlay layer
	* @public
	*/
	AppBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'transition-slide-btt';
		
		overlayControl.toPage(null, 'content', transitionName, function toPage_complete(){
			ui5strap.Layer.setVisible(_this.overlayId, false, callback);
		});	
	};

	/*
	* ----------------------------------------------------------
	* --------------------- Views ------------------------------
	* ----------------------------------------------------------
	*/

	/*
	 * Create a new page
	 */
	AppBaseProto.createView = function(viewConfig){
		
		var _this = this,
			pageId = viewConfig.id;

		//If id specified check for cache
		//Also create a new valid control id for the view
		if(pageId){
			var cachedPage = this._pageCache[pageId];
			if(viewConfig.cache){
				if(cachedPage){

					//This is not very good
					//Replace cached viewDef with new viewDef 
					cachedPage.getViewData().__ui5strap.viewDef = viewConfig.viewData.__ui5strap.viewDef;
					
					return cachedPage;
				}
			}
			else{
				if(cachedPage){
					delete this._pageCache[pageId];
					cachedPage.destroy();
					delete cachedPage;
				}
			}

			viewConfig.id = this.createControlId(pageId);
		}

		if(!viewConfig.viewData){
			viewConfig.viewData = {};
		}

		if(!viewConfig.viewData.__ui5strap){
			viewConfig.viewData.__ui5strap = {};
		}

		viewConfig.viewData.__ui5strap.app = this;

		//if(!viewConfig.viewName){
		//	throw new Error('Cannot obtain view configuration: no "viewName" specified.');
		//}

		//Will crash if "viewName" or "type" attribute is missing!
		var page = new sap.ui.view(viewConfig);

		//Add css style class
		if(viewConfig.styleClass){
			page.addStyleClass(viewConfig.styleClass);
		}
		
		if(pageId){
			//Add to page cache
			this._pageCache[pageId] = page;
		}

		return page;
	};

	/*
	* --------------------------------------------------
	* --------------------- ACTIONS --------------------
	* --------------------------------------------------
	*/

	/*
	* Execute an Action
	*/
	AppBaseProto.runAction = function(action){
		action.app = this;

		jQuery.sap.require('ui5strap.Action');
		ui5strap.Action.run(action);
	};

	/*
	* --------------------------------------------------
	* --------------------- MESSAGES -------------------
	* --------------------------------------------------
	*/

	/*
	* App messages from a Ui5Strap app is directly passed to the current window's parent, if available.
	*/
	AppBaseProto.sendMessage = function(appMessage){
		appMessage.sender = this.getId();

		if(appMessage.toParent && self !== top){
	    	parent.postMessage(appMessage, '*');
	    }
	};
	
	/*
	* --------------------------------------------------
	* --------------------- STORAGE --------------------
	* --------------------------------------------------
	*/
	
	AppBaseProto.setLocalStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		localStorage[this.getId() + '.localStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
	AppBaseProto.getLocalStorageItem = function(storageKey){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		var storageId = this.getId() + '.localStorage.' + storageKey;
		
		return localStorage[storageId] ? JSON.parse(localStorage[storageId]) : null;
	};
	
	AppBaseProto.setSessionStorageItem = function(storageKey, storageValue){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		sessionStorage[this.getId() + '.sessionStorage.' + storageKey] = JSON.stringify(storageValue);
	};
	
	AppBaseProto.getSessionStorageItem = function(storageKey){
		if(typeof(Storage) === "undefined"){
			throw new Error('Storage is not supported by this device / browser.');
		}
		
		var storageId = this.getId() + '.sessionStorage.' + storageKey;
		
		return sessionStorage[storageId] ? JSON.parse(sessionStorage[storageId]) : null;
	};

	/*
	* --------------------------------------------------
	* --------------------- MODELS ---------------------
	* --------------------------------------------------
	*/

	AppBaseProto.getLocaleString = function(languageKey){
		return this.getModelProperty(languageKey, 'i18n');
	};

	/*
	* Returns a property of a model that is assigned to the root control.
	*/
	AppBaseProto.getModelProperty = function(dataPath, modelName){
		var ressourceModel = this.getRootControl().getModel(modelName);
		if(!ressourceModel){
			return "MISSING: " + dataPath;
			//throw new Error('Invalid model name: "' + modelName + '"');
		}
		return ressourceModel.getProperty(dataPath);
	};

	/*
	* --------------------------------------------------
	* --------------------- Controls -------------------
	* --------------------------------------------------
	*/

	/*
	* Create an control id with app namespace. If viewId is given, the controlId must be local.
	*/ 
	AppBaseProto.createControlId = function(controlId, viewId){

		if(viewId){
			controlId = viewId + '--' + controlId;
		}
		
		var appPrefix = this.getDomId() + '---';
		if(!jQuery.sap.startsWith(controlId, appPrefix)){
			controlId = appPrefix + controlId;
		}
		
		return controlId;
	
	};

	/*
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	*/
	AppBaseProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.createControlId(controlId, viewId));
	};

	AppBaseProto.getRootControl = function(){
		
		alert("Please inherit ui5strap.AppBase.getRootControl");
	};

	/*
	* --------------------------------------------------
	* --------------------- Object ---------------------
	* --------------------------------------------------
	*/

	AppBaseProto.hasNature = function(nature){
		return -1 !== jQuery.inArray(nature, this.config.data.app.nature);
	};

	/*
	* Returns the ID of the App
	*/
	AppBaseProto.getId = function(){
		return this.config.data.app.id;
	};
	
	/**
	 * @deprecated Will be removed!
	 */
	AppBaseProto.$ = function(){
		return jQuery(this.domRef);
	};

	/*
	* Get the id of the app defined in the config
	* @public
	*/
	AppBaseProto.getUrl = function(){
		return this.config.data.app.url;
	};

	/*
	* Returns the Dom ID of the App
	*/
	AppBaseProto.getDomId = function(subElement){
		return this.config.data.app.id.replace(/\./g, '__') + (subElement ? '---' + subElement : '');
	};

	AppBaseProto.createDomRef = function(){
		var _this = this;
		
		//App Container
		var appContainer = document.createElement('div');
		appContainer.className = _createAppClass(this, 'ui5strap-app ui5strap-app-prepared ui5strap-hidden');
		appContainer.id = this.getDomId();
		
		//App Content
		var appContent = document.createElement('div');
		appContent.className = 'ui5strap-app-content';
		appContent.id = this.getDomId('content');
		appContainer.appendChild(appContent);

		//App Overlay
		var appOverlay = document.createElement('div');
		appOverlay.className = 'ui5strap-app-overlay ui5strap-overlay ui5strap-layer ui5strap-hidden';
		appOverlay.id = this.getDomId('overlay');

		//var appOverlayBackdrop = document.createElement('div');
		//appOverlayBackdrop.className = 'ui5strap-overlay-backdrop';
		//appOverlayBackdrop.id = this.getDomId('overlay-backdrop');
		/*
		appOverlayBackdrop.onclick = function(){
			_this.hideOverlay();
		};
		*/
		//appOverlay.appendChild(appOverlayBackdrop);

		var appOverlayContent = document.createElement('div');
		appOverlayContent.className = 'ui5strap-overlay-content';
		appOverlayContent.id = this.getDomId('overlay-content');
		appOverlay.appendChild(appOverlayContent);

		appContainer.appendChild(appOverlay);

		//App Loader
		var appLoader = document.createElement('div');
		appLoader.className = 'ui5strap-app-loader ui5strap-loader ui5strap-layer ui5strap-hidden';
		appLoader.id = this.getDomId('loader');
		appContainer.appendChild(appLoader);

		ui5strap.Layer.register(appLoader.id, jQuery(appLoader));

		//App Splash
		var appSplash = document.createElement('div');
		appSplash.className = 'ui5strap-app-splash ui5strap-layer ui5strap-hidden';
		appSplash.id = this.getDomId('splash');
		appContainer.appendChild(appSplash);

		//Cache DOM Ref
		this.domRef = appContainer;
		this.contentDomRef = appContent;
	};
	
	AppBaseProto.updateDomRef = function(){
		this.domRef.className = _createAppClass(this, 'ui5strap-app ui5strap-app-next ui5strap-hidden');
	};

	/*
	* @override
	*/
	AppBaseProto.toString = function(){
		return '[' + this.getId() + ']';
	};

	/*
	* Destroys the App and all of its components
	* @override
	*/
	AppBaseProto.destroy = function(){
		//Destroy the root control first
		var rootControl = this.getRootControl();
		if(rootControl){
			rootControl.destroy();
		}

		//Finally, destroy the app object
		sap.ui.base.Object.prototype.destroy.call(this);
	};

	/*
	* --------------------------------------------------
	* --------------------- Controller -----------------
	* --------------------------------------------------
	*/

	var _createActionEventHandler = function(controllerImpl, eventName){
		var eventFunctionName = 'on' + jQuery.sap.charToUpperCase(eventName, 0),
			oldOnPageShow = controllerImpl[eventFunctionName];

		controllerImpl[eventFunctionName] = function(oEvent){ 
			var app = this.getApp();
				
			if(app){
				var view = this.getView(),
					updateEvents = app.config.getEvents('controller', eventName, view.getViewName()),
					updateEventsLength = updateEvents.length,
					viewId = view.getId();

				for(var i = 0; i < updateEventsLength; i++){
				 	var actionName = updateEvents[i];
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: '" + eventName + "') ...");
					app.runAction({
						"parameters" : actionName, 
						"controller" : this,
						"event" : oEvent
					});
				}
			}
			
			if(oldOnPageShow){
				oldOnPageShow.call(this, oEvent);
			}
		};
	};

	/*
	* @Static
	*/
	AppBase.blessController = function(controllerImpl){

		//Add getApp method if not already exists
		if(!controllerImpl.getApp){
	          controllerImpl.getApp = function(){
	              var viewData = this.getView().getViewData();
	            
	              if(!viewData || !viewData.__ui5strap || !viewData.__ui5strap.app){
	                  return null;
	              }
	              
	              return viewData.__ui5strap.app;
	          }
      	}

        //Controller event handler
        var _controllerEventHandler = function(oEvent){
			this.getApp().runAction({
				"event" : oEvent, 
				"controller" : this
			});
		};

		//New action event handler
		controllerImpl["a_run"] = _controllerEventHandler;
		
		var _controllerEventHandler2 = function(oEvent){
			this.getApp().runAction({
				"event" : oEvent, 
				"controller" : this,
				"parameters" : {
					"__format" : "AJ2.0"
				}
			});
		};

		controllerImpl["__execute"] = _controllerEventHandler2;

		var oldOnInit = controllerImpl.onInit;

		controllerImpl.onInit = function(oEvent){ 
			var app = this.getApp();

			if(app){
				//TODO find out if view.sViewName is reliable
				var view = this.getView(),
					initEvents = app.config.getEvents('controller', 'init', view.sViewName),
					initEventsLength = initEvents.length,
					viewId = view.getId();

				for(var i = 0; i < initEventsLength; i++){
					var actionName = initEvents[i];
					
					app.log.debug("Executing action '" + actionName + "' (view: '" + viewId + "', event: 'onInit') ...");
					
					app.runAction({
						"parameters" : actionName, 
						"event" : oEvent,
						"controller" : this
					});
				} 
			}

			//Call old onInit function
			if(oldOnInit){
				oldOnInit.call(this, oEvent);
			}
		};

		//Update
		_createActionEventHandler(controllerImpl, 'update');

		//PageHide
		_createActionEventHandler(controllerImpl, 'pageHide');
		
		//PageHidden
		_createActionEventHandler(controllerImpl, 'pageHidden');
		
		//PageShow
		_createActionEventHandler(controllerImpl, 'pageShow');
		
		//PageShown
		_createActionEventHandler(controllerImpl, 'pageShown');
		
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.App
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuerySap.declare('ui5strap.App');

	jQuerySap.require("ui5strap.library");

	jQuerySap.require("ui5strap.AppBase");
	jQuerySap.require("ui5strap.AppComponent");
	
	jQuerySap.require("sap.ui.core.mvc.HTMLView");
	jQuerySap.require("sap.ui.core.CustomData");
	jQuerySap.require("sap.ui.model.resource.ResourceModel");
	jQuerySap.require("sap.ui.model.json.JSONModel");
	
	ui5strap.AppBase.extend('ui5strap.App', {
		"constructor" : function(config, viewer){
			ui5strap.AppBase.call(this, config, viewer);
			
			//Init local vars
			this._runtimeData = {
				"theme" : null,
				"css" : {},
				"js" : {}
			};

		}
	});

	var App = ui5strap.App,
		AppProto = App.prototype,
		AppConfig = ui5strap.AppConfig;

	/*
	* ------------------------------------------------
	* --------------------- Events -------------------
	* ------------------------------------------------
	*/

	/*
	* Preload resources e.g. images and json files
	* @protected
	*/
	var _preloadViews = function(views, callback){
		//TODO use Object.keys
		var viewsLeft = 0;
		for(var viewSrc in views){
			viewsLeft++;
		}

		if(!views || 0 === viewsLeft){
			callback && callback();
		}

		var consoleOutput = '';

		var viewCallback = function(){
			viewsLeft -- ;
			if(viewsLeft === 0){
				callback && callback();
			}
		};

		for(var viewSrc in views){
			var viewConfig = views[viewSrc];
			if(viewConfig.preload && 'HTML' === viewConfig.type){
				//We are currently only able to cache HTML views
				var viewUrl = sap.ui.core.mvc.HTMLView._getViewUrl(viewSrc);

				if(viewUrl in sap.ui.core.mvc.HTMLView._mTemplates){
					viewCallback();
				}
				else{ 
					jQuery.ajax({
							"url" : viewUrl,
							"viewSrc" : viewSrc,
							"cache" : true,
							"dataType" : "text",
							"success" : function(text){
								consoleOutput += '"' + this.viewSrc + '" ';
								
								//TODO
								//Find a better way to preload HTML views!
								sap.ui.core.mvc.HTMLView._mTemplates[this.url] = text;
								
								viewCallback();
							},
								
							"error" : viewCallback
					});	
				}
				
			}
			else{
				viewCallback();
			}
		} 
	};

	AppProto.preload = function(callback){
		var _this = this;
		ui5strap.AppBase.prototype.preload.call(this, function(){
			_this.includeStyle(function includeStyle_complete(){
				_this.log.debug("PRELOADING VIEWS...");
				
				_preloadViews(_this.config.data.views, callback);
			});
		});
	};

	AppProto.show = function(callback){
		var _this = this;
		ui5strap.AppBase.prototype.show.call(this, function(firstTime){
			if(firstTime && _this.getFrame && _this.getFrame()){
				_this.getFrame().showInitialContent(callback);
			}
			else{
				callback && callback();
			}
		});
	};

	/*
	* Triggered when a view of the app is shown in the global overlay
	* @public
	*/
	AppProto.onShowInOverlay = function(oEvent){ 
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "showOverlay",
			"orgEvent" : oEvent 
		});

	};

	/*
	* Triggered when a view of the app is hidden from the global overlay
	* @public
	*/
	AppProto.onHideInOverlay = function(oEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "hideOverlay",
			"orgEvent" : oEvent 
		});
	};

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	/*
	* Include the style that is neccessary for this app
	* @public
	*/
	AppProto.includeStyle = function(callback){
		var _this = this;
		var configData = this.config.data;
		if(configData.app.theme){ 
			this.setTheme(configData.app.theme);
		}
		
		var cssKeys = Object.keys(configData.css);
		var callbackCount = cssKeys.length;

		if(callbackCount === 0){
			callback && callback.call(this);

			return;
		}

		
		var error = function(e){
			alert('Could not load style!');
			throw e;
		};

		var callbackI = 0;

		var success = function(){
			callbackI++;
			if(callbackI === callbackCount){
				callback && callback.call(_this);
			}
		};

		var loadStyles = [];
		for(var i = 0; i < callbackCount; i++){
			var cssKey = cssKeys[i],
				cssPath = this.config.resolvePath(configData.css[cssKey]);

			cssKey = 'css--' + this.getId() + '--' + cssKey;

			if(! ( cssKey in this._runtimeData.css ) ){	
				this.log.debug('LOADING CSS "' + cssPath + '"');
					
				this._runtimeData.css[cssKey] = cssPath;
			//	loadStyles.push(cssPath);
				jQuery.sap.includeStyleSheet(cssPath, cssKey, success, error);
			}
			
			else{
				this.log.debug("Css stylesheet '" + cssPath + "' already included.");
				success();
			}
		}
	};

	AppProto.removeStyle = function(){
		for(var cssKey in this._runtimeData.css){
			jQuery('link#' + cssKey).remove();
			delete this._runtimeData.css[cssKey];
			this.log.info("Css stylesheet '" + cssKey + "' removed.");
		}
	};

	/*
	* Sets the theme of the app
	*/
	AppProto.setTheme = function(themeName){
		this._runtimeData.theme = themeName;

		if(!themeName || "base" === themeName){
			sap.ui.getCore().applyTheme("base");
			return;
		}

		if(jQuery.sap.startsWith(themeName, "sap_")){
			sap.ui.getCore().applyTheme(themeName);
			return;
		}
		//sap.ui.getCore().setThemeRoot(themeName, );
		sap.ui.getCore().applyTheme(themeName, this.config.options.pathToThemeRoot);

		this.log.debug("Theme '" + themeName + "' set.");
	};

	/*
	* -------------------------------------------------------------
	* --------------------- Controls ------------------------------
	* -------------------------------------------------------------
	*/
	
	AppProto.getRootControl = function(){
		
		if(!this.getFrame || !this.getFrame()){
			throw new Error('Cannot determine root Control of the App: no Frame is set. Please set a AppFrame or override ui5strap.App.prototype.getRootControl in your own App instance.')
		}

		var control = this.getFrame().getControl();
		if(!control){
			throw new Error('Cannot determine root Control of the App: No frame control is set in the Frame.');
		}

		return control;
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.NavContainer");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.NavContainer", {
		metadata : {
			library : "ui5strap",
			
			properties : {
				options : {
					type : "string",
					defaultValue : ""
				},
				defaultTransition : {
					type : "string",
					defaultValue : "transition-slide"
				}
			}
		}
	});

	var NavContainerBase = ui5strap.NavContainer,
		NavContainerBaseProto = NavContainerBase.prototype;

	/*
	*
	* STATIC FIELDS & METHODS
	*
	*/

/*
	var _transitionEndEvent = null,
		_transitionEndEvents = {
		    'transition': 'transitionend',
		    'WebkitTransition': 'webkitTransitionEnd',
		    'MozTransition': 'transitionend',
		    'OTransition': 'otransitionend'
	  	},
	  	elem = document.createElement('div');
	 
	for(var t in _transitionEndEvents){
	    if(typeof elem.style[t] !== 'undefined'){
	      _transitionEndEvent = _transitionEndEvents[t];
	      break;
	    }
	}
	
	*/
	
	/*
	* Triggers a controller event: Update, PageShow, PageShown, PageHide, PageHidden
	*/
	var _triggerControllerEvent = function(_this, target, oControl, eventId, eventParameters){
		if(oControl){
			var controller = oControl;
			
			//If page is a view, use controller
			if(oControl instanceof sap.ui.core.mvc.View){
				controller = oControl.getController();
			}
			
			var funcName = 'on' + jQuery.sap.charToUpperCase(eventId, 0);
			if(controller && controller[funcName]){
				//jQuery.sap.log.debug(' + [NC] EVENT ' + eventName + '() {' + target + '}');
			
				controller[funcName](new sap.ui.base.Event("ui5strap.controller." + eventId, _this, eventParameters || {}));
			}
		}
	};

	/*
	* Constructs a Transition
	* @Constructor
	* @Private
	*/
	/*
	var _Transition = function(transitionName, $currentRoot, $nextRoot, transitionId){
		this.$current = $currentRoot;
		this.$next = $nextRoot;
		
		this._transitionId = transitionId;
		
		this._prepared = false;
		this._executed = false;
		
		var transitionClass = transitionName;
		var transitionTimeout = 2000;
		var _transitionEndEvent = ui5strap.support.transitionEndEvent;

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

			if(transitionName && _transitionEndEvent){
				//jQuery.sap.log.debug('[TRANSITION] ' + _this._transitionId + ' : ' + transitionName);

	 			if(currentRootCallback && this.$current){ 
	 				var _currentTimout = window.setTimeout(function(){
	 					if(_this._cuca){
	 						return;
	 					}
	 					_this._cuca = true;
						//jQuery.sap.log.debug('[NC] TIMEOUT CUCA');
			 			currentRootCallback.call(_this);
					}, transitionTimeout);

	 				this.$current
					//	.off(transitionEndEvent)
					.one(_transitionEndEvent, function(){
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
						//jQuery.sap.log.debug('[NC] TIMEOUT NECA');
			 			nextRootCallback.call(_this);
			 		}, transitionTimeout);

					this.$next
					//.off(transitionEndEvent)
					.one(_transitionEndEvent, function(){
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
				//jQuery.sap.log.debug('[TRANSITION] ' + _this._transitionId + ' : no transition');
				this.$next && this.$next.removeClass('ui5strap-hidden');

				ui5strap.polyfill.requestAnimationFrame(function(){
					currentRootCallback && currentRootCallback.call(_this);
					nextRootCallback && nextRootCallback.call(_this);
				});
			}

		 };

	};
	*/

	/*
	* @Private
	*/
	var _prepareTransition = function(_this, pageChange){
		if(pageChange.transition){
			//There is already a Transition defined
			return false;
		}
		else{
			var changeTransitionName = pageChange.transitionName;
			if(!changeTransitionName){
				changeTransitionName = _this.getDefaultTransition();
			}
			
			//"no-transition" is deprecated, use "transition-none" instead
			if(changeTransitionName === 'no-transition'
				|| changeTransitionName === 'transition-none'){
				changeTransitionName = null;
			}
			
			var transition = new ui5strap.Transition(
					changeTransitionName, 
					pageChange.$current, 
					pageChange.$next, 
					'nc-' + _this.ncType + '-' + pageChange.target
				);
				
			pageChange.transition = transition;

			transition.prepare();

			return true;
		}
	};


	/*
	*
	* PRIVATE FIELDS & METHODS
	*
	*/

	var _transitionCallback = function(_this, pageChange, transList){
		transList.callI --;
		
		var callbacksLength = transList.callbacks.length;
		if(0 === callbacksLength){
			////jQuery.sap.log.debug('[NC][' + pageChange.target + '] No transition callbacks');

			return;
		}

		if(0 === transList.callI){
			//jQuery.sap.log.debug(' + [NC] CALLBACK_0 (' + callbacksLength + ') {' + pageChange.target + '}');

			for(var i = 0; i < callbacksLength; i++){
				transList.callbacks[i]();
			}

			//pageChange 
		}
		else{
			//jQuery.sap.log.debug(' - [NC] C_' + transList.callI + ' {' + pageChange.target + '}');
		}
	};

	/*
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){
		//jQuery.sap.log.debug(' + [NC] T3 (' + transList.callbacks.length + ') {' + pageChange.target + '}');
		
		pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				var $current = this.$current;
				if(null !== $current){
					$current.remove();
				}

				//If next page is null, then execute the callbacks when old page has been hidden
				if(pageChange.page === null){
					_transitionCallback(_this, pageChange, transList);
				}

				//onPageHidden event
				_triggerControllerEvent(_this, pageChange.target, pageChange.currentPage, 'pageHidden', {
					newPage : pageChange.page
				});
			}, 
			function anon_transitionPreparedComplete(){
				this.$next.attr('class', this.$next.attr('data-org-class') + ' navcontainer-page-current');
				
				//Transition callback
				_transitionCallback(_this, pageChange, transList);

				//onPageShown event
				_triggerControllerEvent(_this, pageChange.target, pageChange.page, 'pageShown', {
					oldPage : pageChange.currentPage
				});
			}
		);

	};

	/*
	* @Private
	*/
	var _executePendingTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length;

		//jQuery.sap.log.debug(" + [NC] EXECUTE " + pendingTransitionsLength + " PENDING TRANSITIONS");
		
		var transList = {
			callI : pendingTransitionsLength,
			callbacks : []
		};

		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];

			for(var j = 0; j< pageChanges.length; j++){
				if(pageChanges[j].callback){
					transList.callbacks.push(pageChanges[j].callback);
				}
			}
			
			_executeTransition(_this, pageChanges[pageChanges.length-1], transList);
		}
		
		
	};

	/*
	* @Private
	*/
	var _preparePendingTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length,
			successAll = true;
		//jQuery.sap.log.debug(' + [NC] PREPARE ' + pendingTransitionsLength + ' PENDING TRANSITIONS'); 
		
		for(var i = 0; i < pendingTransitionsLength; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
			successAll = _prepareTransition(_this, pageChanges[pageChanges.length-1]) && successAll;
		}

		return successAll;
	};

	/*
	* @Private
	*/
	var _handlePendingTransitions = function(_this){
		if(0 === _this._pendingTransitions.length){
			//jQuery.sap.log.debug(" - [NC] NO PENDING TRANSITIONS");

			return;
		}
		
		//jQuery.sap.log.debug(" + [NC] HANDLE PENDING TRANSITIONS");

		ui5strap.polyfill.requestAnimationFrame(function RAF1(){

			if(!_preparePendingTransitions(_this)){
				//jQuery.sap.log.debug(" - [NC] CANCEL HANDLING PENDING TRANSITIONS");

				return;
			}
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				_executePendingTransitions(_this);

				_this._pendingTransitions = [];
				_this._targetTransitions = {};
			});
		
		});
	};

	/*
	* @Private
	*/
	var _pageChange = function(_this, pageChange){
		//jQuery.sap.log.debug(' + [NC] T1 {' + pageChange.target + '}');
		ui5strap.polyfill.requestAnimationFrame(function RAF1(){

			_prepareTransition(_this, pageChange);
			
			ui5strap.polyfill.requestAnimationFrame(function RAF2(){
				
				var transList = {
					callI : 1,
					callbacks : []
				};
				if(pageChange.callback){
					transList.callbacks.push(pageChange.callback);
				}
				_executeTransition(_this, pageChange, transList);
			
			});
		
		});
	};

	var _pageChangeLater = function(_this, pageChange, override){
		var target = pageChange.target;
		if(-1 === jQuery.inArray(target, _this._pendingTransitions)){ 
			_this._pendingTransitions.push(target);

			if(!(target in _this._targetTransitions)){
				_this._targetTransitions[target] = [];
			}
		}

		if(override || _this._targetTransitions[target].length === 0){
			//jQuery.sap.log.debug(' + [NC] T1L {' + pageChange.target + '}');
			_this._targetTransitions[target].push(pageChange);
		}
		else{
			//jQuery.sap.log.debug(' + [NC] T1S {' + pageChange.target + '}');
		}
	};

	/*
	var ou = sap.ui.core.Core.prototype.createUIArea;

	sap.ui.core.Core.prototype.createUIArea = function(domRef, nc){
		var uiArea = ou.call(this, domRef);
		
		if(nc){
			jQuery.each(nc.oModels, function (sName, oModel){
				uiArea.oPropagatedProperties.oModels[sName] = oModel;
			});
			uiArea.propagateProperties(true);
		}
		return uiArea;
	};
	*/

	/*
	* @Private
	*/
	var _placePage = function(_this, target, page, isPrepared){
			if(page && page.getDomRef()){
				return page.$().parent();
			}
			
			if(null === page){
				return null;
			}

			//Add new page to DOM
			var newPage = document.createElement('div'),
				orgClassName = 'navcontainer-page navcontainer-' + _this.ncType + '-page navcontainer-' + _this.ncType + '-page-' + target,
				newClassName = orgClassName;
			if(true === isPrepared){
				 newClassName += ' navcontainer-page-next ui5strap-hidden';
			}
			newPage.className = newClassName;
			newPage.id = _this.pageDomId(target, page);
				
			var $nextContent = jQuery(newPage);
			$nextContent.attr('data-org-class', orgClassName);
			jQuery('#' + _this.targetPagesDomId(target)).append($nextContent);
			
			var oModels = _this.oModels;
			//var uiArea = sap.ui.getCore().createUIArea(newPage, _this);
			for(var sName in oModels){
				//page.setModel(oModel, sName);
				page.oPropagatedProperties.oModels[sName] = oModels[sName];
				page.propagateProperties(sName);
			};
			
			//uiArea.addContent(page);

			page.placeAt(newPage);

			//jQuery.sap.log.debug(" + [NC] NEW PAGE {" + target + "} #" + page.getId());

			return $nextContent;
	};

	/*
	*
	* PUBLIC METHODS
	*
	*/

	/*
	* @Public
	* @PostConstruct
	*/
	NavContainerBaseProto.init = function(){
		this._pendingTransitions = [];
		
		this._targetTransitions = {};

		this._targetPagesCount = {};
		
		//TODO Do we need a busy flag here?
		//this._targetStatus = {};

		//Transition timeout
		this.transitionNextTimeout = 2000;
		this.transitionCurrentTimeout = 2000;

		this._initNavContainer();
	};

	/*
	* @Override
	* @Protected
	*/
	NavContainerBaseProto._initNavContainer = function(){
		//NavContainer type string
		//Resulting css class is "navcontainer navcontainer-default"
		this.ncType = "default";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
			"content" : null
		};
	};

	/*
	* Creates a dom id for a given target and page
	* @Public
	*/
	NavContainerBaseProto.createPageDomId = function(target, page){
		if(page === null){
			return 'navcontainer-page---' + this._targetPagesCount[target];
		}

		return 'navcontainer-page---' + page.getId();
	};

	/*
	* Registers a new dom id for a given target and page
	* @Public
	*/
	NavContainerBaseProto.pageDomId = function(target, page){
		if(!(target in this._targetPagesCount)){
			this._targetPagesCount[target] = 0;
		}
		
		this._targetPagesCount[target]++;

		return this.createPageDomId(target, page);
	};

	/*
	* @Override
	*/
	NavContainerBaseProto.setModel = function(oModel, sName){
		for(var target in this.targets){
			var page = this.targets[target];
			if(page){
				//page.setModel(oModel, sName);
				page.oPropagatedProperties.oModels[sName] = oModel;
				page.propagateProperties(sName);
			}
		}
		sap.ui.core.Control.prototype.setModel.call(this, oModel, sName);
	};

	/*
	* @Override
	*/
	NavContainerBaseProto.destroy = function(){
		for(var target in this.targets){
			if(this.targets[target]){
				this.targets[target].destroy();
			}
		}
		sap.ui.core.Control.prototype.destroy.call(this);
	};

	/*
	*
	* @Public
	*/
	NavContainerBaseProto.targetPagesDomId = function(target){
		return 'navcontainer-pages-' + target + '---' + this.getId();
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.targetLayersDomId = function(target){
		return 'navcontainer-layers-' + target + '---' + this.getId();
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.getClassString = function(){
		var navContainerClassName = "navcontainer-" + this.ncType,
				options = this.getOptions();

		var classes = "navcontainer " + navContainerClassName;
	    if('' !== options){
	    	options = options.split(' ');
	    	for(var i = 0; i < options.length; i++){
	    		classes += ' ' + navContainerClassName + '-' + options[i] + ' ' + 'navcontainer-option-' + options[i];
	    	}
	    }

	    return classes;
	};

	/*
	* @Public
	* @Override
	*/
	NavContainerBaseProto.setOptions = function(newOptions){
		if(this.getDomRef()){
			this.setProperty('options', newOptions, true);
			this.$().attr('class', this.getClassString());
		}
		else{
			this.setProperty('options', newOptions);
		}
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.setOptionsEnabled = function(options){
		var currentOptions = [],
			cOptions = this.getOptions();
		
		if(cOptions){
			currentOptions = cOptions.split(' ');
		}
		
		for(var optionName in options){
			var optionIndex = jQuery.inArray(optionName, currentOptions),
				optionEnabled = options[optionName];

			if(optionEnabled && -1 === optionIndex
				|| !optionEnabled && -1 !== optionIndex){
				
				if(optionEnabled){
					currentOptions.push(optionName);
				}
				else{
					currentOptions.splice(optionIndex, 1);
				}
			}
		}
		this.setOptions(currentOptions.join(' '));
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.isOptionEnabled = function(optionName){
		return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.toggleOption = function(optionName){
		var isOptionEnabled = this.isOptionEnabled(optionName);
		var options = {};
		options[optionName] = !isOptionEnabled;
		this.setOptionsEnabled(options);
	};

	/*
	* @Public
	* @Deprecated
	*/
	NavContainerBaseProto.setTargetOption = function(target, optionName, optionEnabled){
		var $aggregation = jQuery('#' + this.targetPagesDomId(target)),
			optionClassName = 'navcontainer-aggregation-' + target+ '-' + optionName;

		if(optionEnabled){
			$aggregation.addClass(optionClassName);
		}
		else{
			$aggregation.removeClass(optionClassName);
		}

	};

	/*
	* @Public
	*/
	NavContainerBaseProto.updateTarget = function(target, oPage, eventParameters){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		_triggerControllerEvent(this, target, oPage, 'update', eventParameters);
	};
	
	NavContainerBaseProto.hasTarget = function(target){
		return target in this.targets;
	};
	
	NavContainerBaseProto.getTarget = function(target){
		return this.targets[target];
	};
	
	/*
	* @Public
	*/
	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		//jQuery.sap.log.debug(' + [NC] NAVIGATE {' + target + '} ' + (page ? '#' + page.getId() : 'CLEAR'));

		var _this = this,
			currentPage = this.targets[target];

		if(this.getDomRef() && currentPage === page){
			//jQuery.sap.log.debug(' + [NC] PAGE IS CURRENT {' + target + '}');

			callback && callback();
			
			return false;
		}

		if(currentPage){
			_triggerControllerEvent(this, target, currentPage, 'pageHide', {
				newPage : page
			});
		}

		this.targets[target] = page;
			
		if(page){
			_triggerControllerEvent(this, target, page, 'pageShow', {
				oldPage : currentPage
			});
		}

		var changeName = '{' + target + '} '
							+ (null === currentPage ? 'None' : '#' + currentPage.getId()) 
							+ ' => '
							+ (null === page ? 'None' : '#' + page.getId())
							+ ' ("'
							+ transitionName + '")';

		var $currentPage = jQuery('#' + this.createPageDomId(target, currentPage)),
			targetTransition = {
				"changeName" : changeName,
				"target" : target,
				"transitionName" : transitionName,
				"transition" : null,
				"$current" : $currentPage.size() > 0 ? $currentPage : null,
				"$next" : null,
				"callback" : callback,
				"page" : page,
				"currentPage" : currentPage
			};

		

		if(this.getDomRef()){
			targetTransition.$next = _placePage(this, target, page, true);
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, 250);
		
		}
		else{
			_pageChangeLater(_this, targetTransition, true);
			
		}

		return true;
	};

	/*
	* @Override
	* @Public
	*/
	NavContainerBaseProto.onBeforeRendering = function(){
		//jQuery.sap.log.debug('[NC] ON BEFORE RENDERING');

		for(var target in this.targets){
			var currentPage = this.targets[target];
			if(currentPage){
				_pageChangeLater(this, {
					changeName : "test",
					target : target,
					transitionName : null,
					transition : null,
					"$current" : null,
					"$next" : null,
					callback : null,
					page : currentPage,
					currentPage : null
				}, false);
			}
	 	}
	};

	/*
	* @Override
	* @Public
	*/
	NavContainerBaseProto.onAfterRendering = function(){ 
		//jQuery.sap.log.debug('[NC] ON AFTER RENDERING');
		
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = this._targetTransitions[_pendingTransitions[i]],
				targetTransition = targetTransitions[targetTransitions.length - 1];

			if(!targetTransition.$next){
				//There is no page reference available, so we have to create it
				targetTransition.$next = _placePage(this, targetTransition.target, targetTransition.page, true); 
			}
			else{
				//Reappend existing reference
				jQuery('#' + this.targetPagesDomId(targetTransition.target)).append(targetTransition.$next);
			}
		}
		
		window.setTimeout(function anon_afterDomTimeout(){
			_handlePendingTransitions(_this);	
		}, 250);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ViewerBase
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuerySap.declare('ui5strap.ViewerBase');

	jQuerySap.require('ui5strap.library');

	sap.ui.base.Object.extend('ui5strap.ViewerBase', {
		"constructor" : function(options){
			sap.ui.base.Object.apply(this);

			this.options = options || {};

			//Device Log Level
			if(!this.options.logLevel){
				this.options.logLevel = 0;
			}

			//Error to Browser
			if(!this.options.errorToBrowser){
				this.options.errorToBrowser = false;
			}

			if(!this.options.pathToServletRoot){
				this.options.pathToServletRoot = '.';
			}

			if(!this.options.pathToThemeRoot){
				this.options.pathToThemeRoot = './theme';
			}

			if(!this.options.container){
				//Default container dom id
				this.options.container = "ui5strap-container";
			}

			if(!this.options.overlay){
				//Default overlay dom id
				this.options.overlay = "ui5strap-overlay";
			}

			if(!this.options.app){
				//Default app config location
				this.options.app = "./app/app.json";
			}
		}
	});

	var ViewerBaseProto = ui5strap.ViewerBase.prototype;

	ViewerBaseProto.init = function(){
		ui5strap.Layer.register('ui5strap-loader');
  		
		this._initOverlay();
	};

	ViewerBaseProto.start = function(callback, loadCallback){
		throw new Error("Please inherit ui5strap.ViewerBase.prototype.start in your Viewer instance.");
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Global Overlay ---------------------------------
	* ----------------------------------------------------------------------
	*/

	/*
	* Inititalzes the overlay
	*/
	ViewerBaseProto._initOverlay = function(){
		var _this = this;
		
		ui5strap.Layer.register(this.options.overlay);

		this.overlayControl = new ui5strap.NavContainer();
		this.overlayControl.placeAt(this.options.overlay + '-content');

		jQuery('#' + this.options.overlay + '-backdrop').on('tap', function onTap(event){
			_this.hideOverlay();
		});
	};

	/*
	* Returns whether the overlay layer is visible
	* @public
	*/
	ViewerBaseProto.isOverlayVisible = function(){
		return ui5strap.Layer.isVisible(this.options.overlay);
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	ViewerBaseProto.showOverlay = function(viewDataOrControl, callback, transitionName){
		var _this = this,
			overlayControl = this.overlayControl,
			transitionName = transitionName || 'transition-slide';
		
		ui5strap.Layer.setVisible(this.options.overlay, true, function(){
			if(viewDataOrControl instanceof sap.ui.core.Control){
				//Control is directly injected into the frame
				overlayControl.toPage(viewDataOrControl, "content", transitionName, callback);
			}
			else{ 
				//viewDataOrControl is a data object
				if("appId" in viewDataOrControl){
					var viewApp = _this.getApp(viewDataOrControl.appId);
					if(null === viewApp){
						throw new Error('Invalid app: ' + viewDataOrControl.appId);
					}
					//View from a app
					viewApp.includeStyle(function includeStyle_complete(){
						var viewConfig = viewApp.config.getViewConfig(viewDataOrControl),
							view = viewApp.createView(viewConfig);

						overlayControl.toPage(view, 'content', transitionName, function(){
							viewApp.isVisibleInOverlay = true;

							viewApp.onShowInOverlay(new sap.ui.base.Event("ui5strap.app.showInOverlay", viewApp, { 
								view : view, 
								viewConfig : viewConfig
							}));
							
							callback && callback();	
						});
					});
				}
				else{
					//TODO How should this work here?
					overlayControl.toPage(viewDataOrControl, 'content', transitionName, callback);
				}
			}
		});
	};

	/*
	* Hides the overlay layer
	* @public
	*/
	ViewerBaseProto.hideOverlay = function(callback, transitionName){
		if(!this.isOverlayVisible()){
			throw new Error('Overlay is not visible!');
		}

		var _this = this,
			overlayControl = this.overlayControl,
			page = overlayControl.targets["content"],
			transitionName = transitionName || 'transition-slide';
		
		overlayControl.toPage(null, 'content', transitionName, function toPage_complete(){
			ui5strap.Layer.setVisible(_this.options.overlay, false, function(){
				if(page instanceof sap.ui.core.mvc.View){
					var pageViewData = page.getViewData();
					if(pageViewData.app){
						var viewApp = pageViewData.app;
						viewApp.isVisibleInOverlay = false;
						viewApp.onHideInOverlay(new sap.ui.base.Event("ui5strap.app.hideInOverlay", viewApp, {})); 
						_this.removeStyle(viewApp);
					}
				}

				callback && callback();
			});
		});	
	};

	/*
	* ----------------------------------------------------------------------
	* --------------------- Browser Flow  ----------------------------------
	* ----------------------------------------------------------------------
	*/

	/*
	*	Changes the browser URL to an (external) url
	* @param url The URL to browse to
	*/
	ViewerBaseProto.exitViewer =  function(url){
		window.location.href = url; 
	};

	/*
	* Request the client's browser to switch to full screen mode
	*/  
	ViewerBaseProto.requestFullscreen =  function(element){
		if(typeof element === 'undefined'){
			element = document.documentElement;
		}
		if(element.requestFullscreen) {
	    	element.requestFullscreen();
	  	} else if(element.mozRequestFullScreen) {
	    	element.mozRequestFullScreen();
	  	} else if(element.webkitRequestFullscreen) {
	    	element.webkitRequestFullscreen();
	  	} else if(element.msRequestFullscreen) {
	    	element.msRequestFullscreen();
	  	}
	};

	
}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Viewer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuerySap.declare("ui5strap.Viewer");
	
	jQuerySap.require("ui5strap.library");
	
	jQuerySap.require("ui5strap.ViewerBase");
	
	jQuerySap.require("ui5strap.AppConfig");
	jQuerySap.require("ui5strap.NavContainer");

	jQuerySap.require("ui5strap.App");
	//jQuerySap.require("ui5strap.AppSystem");
	//jQuerySap.require("ui5strap.AppSandbox");
	//jQuerySap.require("ui5strap.AppConsole");
	
	ui5strap.ViewerBase.extend("ui5strap.Viewer", {
		"constructor" : function(options){
			ui5strap.ViewerBase.call(this, options);

			this._loadedLibraries = {};
			this._loadingSapplication = null;

			this._dom = null;
			
			this._console = null;
		}
	});

	var ViewerMulti = ui5strap.Viewer,
		ViewerMultiProto = ViewerMulti.prototype;

	//----------------- STATIC methods -------------------
	var _KnownLibraryIssues = {
		"sap.m" : function(){
			//This fixes problems with JSON views, when displaying in editor
			//Since we need Page in any mobile app anyway, this does not harm
			jQuerySap.require("sap.m.Page");
		}
	};

	//----------------- NON-STATIC methods -------------------

	//Private properties that are linked to the scope of the anonymous self executing function around this module
	//This prevents other apps from accessing data easily
	//@TODO these properties must be NON-STATIC! Currently they are STATIC.
	//@static
	var _m_currentSapplication = null;
	var _m_loadedSapplicationsById = null;
	var _m_loadedSapplicationsByUrl = null;
	


	/*
	 * Initializes the ViewerMulti instance
	 * @param viewerConfigUrl Url to viewer configuration file
	 */
	ViewerMultiProto.init = function(){
		jQuery.sap.log.debug("[VIEWER] init");
		
		//Object vars
		_m_loadedSapplicationsById = {};
		_m_loadedSapplicationsByUrl = {};

		ui5strap.ViewerBase.prototype.init.call(this);
		
		//Init methods
		this._initDom();
		this._initConsole();
		this._initEvents();
	};

	/*
	* Executes a app by given sapp-url from a get parameter
	*/
	ViewerMultiProto.start = function(callback, loadCallback){
		jQuery.sap.log.debug("[VIEWER] start");

		this.init();

		var appUrl = ui5strap.AppConfig.processOption("app", this.options.app);

		if(null === appUrl){
			throw new Error('Cannot start viewer: no app url specified.');
		}

		this.executeApp(appUrl, false, callback, loadCallback);	
	};

	/*
	* --------
	*
	* App Flow
	*
	* --------
	*/

	/**
	* Get the current (in foreground) running app
	* TODO make static?
	*/
	ViewerMultiProto.getApp = function(appId){
		return appId ? _m_loadedSapplicationsById[appId] : _m_currentSapplication;
	};

	ViewerMultiProto.getLoadedApps = function(){
		return _m_loadedSapplicationsById;
	};

	/*
	*	Replaces the current browser content and opens a app defined in viewer config
	* @param sappId Sapplication ID
	*/
	ViewerMultiProto.openSapplication = function(appUrl){
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');
		var appUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();

		this.exitViewer(appUrl);
	};

	/*
	* Load, start and show an App. The appUrl must point to a valid app.json file.
	*/
	ViewerMultiProto.executeApp = function(appUrl, doNotShow, callback, loadCallback){
		jQuery.sap.log.debug("[VIEWER] executeApp '" + appUrl + "'");
		var _this = this;
			
		
		_this.loadApp(appUrl, function loadAppComplete(appInstance){
			    loadCallback && loadCallback();

			    var startedCallback = function(){
					if(!doNotShow){
						_this.showApp(appInstance.getId(), null, callback);
					}
					else{
						//_this.hideLoader(callback);
						callback && callback();
					}
				};
			
			//_this.showLoader(function(){
				if(!appInstance.isRunning){
					_this.startApp(appInstance.getId(), startedCallback);
				}
				else{
					startedCallback();
				}
			//});

		});
	};

	/**
	* Hide, stop and unload an App.
	*/
	ViewerMultiProto.closeApp = function(sappId, callback){
		var viewer = this;

		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot close app "' + sappId + '" - app not loaded.');
		}

		if ( this.getApp() === appInstance ) {
			this.hideApp('transition-zoom2', function hideAppComplete(){
				viewer.stopApp(sappId);
				viewer.unloadApp(sappId);
				callback && callback();
			});
		}	
		else{ 
			this.stopApp(sappId);
			this.unloadApp(sappId);

			callback && callback();
		}
	};

	var _preloadLibraries = function(_this, libs, callback){
		var callI = libs.length,
			successCallback = function(){
				callI--;
				if(callI === 0){
					callback && callback();
				}
			};

		for(var i = 0; i < libs.length; i++){
			var lib = libs[i],
				libPackage = lib["package"], 
				libLocation = lib["location"];

			if(libPackage === 'ui5os' ||
				libPackage === 'ui5strap'){
				throw new Error('Do not include the libraries "ui5strap" and "ui5os" into your libraries configuration.');
			}
			
			jQuerySap.registerModulePath(libPackage, libLocation);
			_this._loadedLibraries[libPackage] = libLocation;

			if(libPackage in _KnownLibraryIssues){
				//Fix function for library
				_KnownLibraryIssues[libPackage].call(this);
				jQuery.sap.log.debug("[VIEWER] Fix for library '" + libPackage + "' loaded.");
			}

			if(lib.preload){
				//Preload Controls an Elements
				var preloadLibs = [libPackage + '.library'],
					libData = sap.ui.getCore().getLoadedLibraries()[libPackage];
				
				for(var j = 0; j < libData.elements.length; j++){
					preloadLibs.push(libData.elements[j]);
				}

				for(var j = 0; j < libData.controls.length; j++){
					preloadLibs.push(libData.controls[j]);
				}

				ui5strap.require(preloadLibs, successCallback());
			}
			else{
				successCallback();
			}
		}
	};

	/*
	* Creates a app instance
	* @param appConfig SappConfig instance
	*/
	ViewerMultiProto.createApp = function(appConfig, callback){
		jQuery.sap.log.debug("[VIEWER] createApp");
		
		var configDataJSON = appConfig.data,
			appModuleName = configDataJSON.app.module,
			libraries = [],
			_this = this;

		//register the libraries
		for(var i = 0; i < configDataJSON.libraries.length; i++){
			var dependencyLib = configDataJSON.libraries[i];
			libraries.push({
				"package" : dependencyLib["package"],
				"location" : appConfig.resolvePath(dependencyLib["location"]),
				"preload" : dependencyLib.preload
			});
			
		} 

		libraries.push({ 
			"package" : configDataJSON.app["package"],
			"location" : configDataJSON.app["location"]
		});

		_preloadLibraries(this, libraries, function(){
			//Load the App Module
			ui5strap.require(appModuleName, function requireComplete(){
				var AppConstructor = jQuery.sap.getObject(appModuleName);

				callback && callback(new AppConstructor(appConfig, _this));
			});
		});
	};

	/*
	* Loads an App by a given appUrl. The appUrl must point to a valid app.json file.
	*/
	ViewerMultiProto.loadApp = function(appUrl, callback){
		jQuery.sap.log.debug("[VIEWER] loadApp '" + appUrl + "'");

		if(appUrl in _m_loadedSapplicationsByUrl){
			return callback(_m_loadedSapplicationsByUrl[appUrl]);
		}
		var viewer = this,
			appConfig = new ui5strap.AppConfig(this.options);

		appConfig.load(appUrl, function loadAppConfigComplete(configDataJSON){
			//TODO log level should only affect on app level
			if("logLevel" in configDataJSON.app){
				jQuerySap.log.setLevel(configDataJSON.app.logLevel);
			}

			if(!("module" in configDataJSON.app)){
				var defaultAppModule = "ui5strap.App";
				configDataJSON.app.module = defaultAppModule;
			}

			//Create App Instance
			viewer.createApp(appConfig, function createAppComplete(appInstance){
				appInstance.init();

				_m_loadedSapplicationsByUrl[appUrl] = appInstance;
				_m_loadedSapplicationsById[appInstance.getId()] = appInstance;

				appInstance.load(function loadAppComplete(){
					callback && callback.call(viewer, appInstance);
				});
			});
		});

		
	};

	/*
	* Unloads an app
	*/
	ViewerMultiProto.unloadApp = function(sappId){
		jQuery.sap.log.debug("[VIEWER] unloadApp '" + sappId + "'");

		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot unload app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			throw new Error('Cannot stop app "' + sappId + '" - app still running.');
		}
		
		appInstance.unload();
		
		delete _m_loadedSapplicationsByUrl[appInstance.getUrl()];
		delete _m_loadedSapplicationsById[sappId];

		return appInstance;
	};

	/*
	* Starts a previously loaded app.
	*/
	ViewerMultiProto.startApp = function(sappId, callback){
		jQuery.sap.log.debug("[VIEWER] startApp '" + sappId + "'");

		var appInstance = this.getApp(sappId);
		
		if(null === appInstance){
			throw new Error('Cannot start app "' + sappId + '" - app not loaded.');
		}

		if(appInstance.isRunning){
			return appInstance;
		}

		appInstance.start(callback);
		
		return appInstance;
	};

	/*
	* Stops a previously started app.
	*/
	ViewerMultiProto.stopApp = function(sappId){
		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot stop app "' + sappId + '" - app not loaded.');
		}

		if ( this.getApp() === appInstance ) {
			throw new Error('Cannot stop app "' + sappId + '" - app is currently visible.');
		}
		
		appInstance.stop();
		
		return appInstance;
	};

	/*
	* Shows a previously started app, means bringing the app to foreground.
	*/
	ViewerMultiProto.showApp = function(sappId, transitionName, callback){ 
		jQuery.sap.log.debug("[VIEWER] showApp '" + sappId + "'"); 

		if(null !== this._loadingSapplication){
			jQuery.sap.log.warning("App '" + this._loadingSapplication + "' is currently loading."); 
			
			return;
		}

		var appInstance = this.getApp(sappId);

		if(null === appInstance){
			throw new Error('Cannot show app "' + sappId + '" - app not loaded.');
		}

		if(!appInstance.isRunning){
			throw new Error('Cannot show a app which is not running.');
		}

		if(!appInstance.getRootControl()){
			//this.hideLoader(function(){
				callback && callback(appInstance);
			//});

			return;
		}

		if(appInstance.isVisible){
			//this.hideLoader(function(){
				callback && callback(appInstance);
			//});
			
			return;
		}

		if(typeof transitionName !== 'string'){
			transitionName = appInstance.config.data.app.transition;
		}

		//Set Browser Title
		document.title = appInstance.config.data.app.name;

		if(appInstance.hasNature('UI5OS_HOME')){
			this._dom.$body.addClass('ui5os-with-bar-home');
		}

		var previousSapplication = this.getApp();
		var needAttach = false;
		
		//Set the app as current foreground app				
		_m_currentSapplication = appInstance;
		this._loadingSapplication = appInstance;	

		if(!appInstance.domRef){
			appInstance.createDomRef();
			needAttach = true;
		}
		else{
			appInstance.updateDomRef();
		}

		var viewer = this;
		var $currentRoot = jQuery(previousSapplication ? previousSapplication.domRef : '#ui5strap-app-initial');
		var $preparedRoot = jQuery(appInstance.domRef);
		
		//Remove current app dom after transition
		var currentRootCallbackI = 0;
		var currentRootCallback = function(){
			currentRootCallbackI++
			if(currentRootCallbackI < 2){
				return;
			}

			if(previousSapplication){
				previousSapplication.hidden(function(){
					viewer.removeStyle(previousSapplication);
				});
			}
			else{
				$currentRoot.remove();
			}
		};

		//Introduce new app dom
		var preparedRootCallback = function(){
			currentRootCallback();
			
			//Finally trigger the shown process
			appInstance.shown(function(){
				callback && callback.call(appInstance);
			});
		};

		//Load app css
		appInstance.includeStyle(function includeStyle_complete(){
			
			if(needAttach){
				viewer._dom.$root[0].appendChild(appInstance.domRef);

				appInstance.registerOverlay();

				appInstance.getRootControl().placeAt(appInstance.contentDomRef);
			}
			
			//<DOM_ATTACH_TIMEOUT>
			window.setTimeout(function setTimeout_complete(){
				previousSapplication && previousSapplication.hide();
				appInstance.show(function(){
					
					//RAF
					ui5strap.polyfill.requestAnimationFrame(function RAF1(){
						
						//Create new transition
						var transition = new ui5strap.Transition(transitionName, $currentRoot, $preparedRoot, appInstance.getId());
						transition.prepare();
						
						//RAF
						ui5strap.polyfill.requestAnimationFrame(function RAF2(){
							
							//Hide the loader
							//viewer.hideLoader(function(){
								//Execure transition
								transition.execute(currentRootCallback, preparedRootCallback);
							
								//Set viewer to available
								viewer._loadingSapplication = null;
							//});
							
							
						});

					});
				});
				
			}, 50);
			//</DOM_ATTACH_TIMEOUT>

		});	
	};

	ViewerMultiProto.hideApp = function(transitionName, callback){
		if(!this.options.home){
			throw new Error('options.home must be set to hide an App!');
		}
		this.showApp(this.options.home.id, transitionName, function showAppComplete(appInstance){
			callback && callback();
			//appInstance.hidden();
		});
	};

	/*
	* Removes app specific style from the head.
	* @public
	*/
	ViewerMultiProto.removeStyle = function(appInstance){
		if(!appInstance.isVisible && 
			!appInstance.isVisibleInOverlay && 
			!appInstance.isVisibleEmbedded){
			appInstance.removeStyle();
		}
	};

	/*
	* ------------
	*
	* App Messages
	*
	* ------------
	*/

	ViewerMultiProto.sendMessage = function(appMessage){
		if(!appMessage 
			|| !appMessage.receiver 
			|| !appMessage.sender
			|| !appMessage.message){
			//jQuery.sap.log.error("Cannot send message: parameters are missing.");
			return;
		}
		
		var receivers = appMessage.receiver;
		if(typeof receivers === 'string'){
			receivers = [receivers];
		}
		for(var i = 0; i < receivers.length; i++){
			var receiverAppId = receivers[i];
			var app = this.getApp(receiverAppId);

			if(app){
				app.onMessage(new sap.ui.base.Event("message", null, appMessage));
			}
			
	    }

	    if(appMessage.toParent && self !== top){
	    	parent.postMessage(appMessage, '*');
	    }
	};

	/*
	* -------------
	*
	* Global Loader
	*
	* -------------
	*/

	/*
	* Shows the overlay layer
	* @public
	*/
	ViewerMultiProto.showLoader = function(callback){
		ui5strap.Layer.setVisible('ui5strap-loader', true, callback);
	};

	/*
	* Shows the overlay layer
	* @public
	*/
	ViewerMultiProto.hideLoader = function(callback){
		ui5strap.Layer.setVisible('ui5strap-loader', false, callback);
	};

	/*
	* -------------
	*
	* TODO
	*
	* -------------
	*/

	/**
	*	Get the console control reference
	* @public
	*/
	ViewerMultiProto.getConsole = function(){
		return this._console;
	};

	/*
	* Inititalizes the dom cache
	* @protected
	*/
	ViewerMultiProto._initDom = function(){
		var _this = this;

		this._dom = {};

		this._dom.$body = jQuery(document.body);
		this._dom.$root = jQuery('#' + this.options.container);

		if(this._dom.$root.length === 0){
			throw new Error('Root Container not found in HTML: ' + this.options.container);
		}
		
		var $homeButton = jQuery('#ui5os-button-home'),
			$taskmanagerButton = jQuery('#ui5os-button-taskmanager');
		
		if(this.options.home){
			this._dom.$barHome = jQuery('#ui5os-bar-home');
			
			$homeButton.on('click', function(){
				_this.executeApp(_this.options.home.url, false);
			});
			
			$taskmanagerButton.on('click', function(){
				_this.showOverlay({
					"appId" : _this.options.home.id,
					"target" : "content",
	                "viewName" : _this.options.home.package + ".views.TaskManager",
	                "id" : "taskManager"
				});
			});
		}
	};

	

	/*
	+ Initializes the console
	* @protected
	*/
	ViewerMultiProto._initConsole = function(){
		if(this.options.enableConsole){
			jQuerySap.require("ui5strap.Console");
			this._console = new ui5strap.Console();
		}
	};	

	/*
	* Inititalizes the events
	* @protected
	*/
	ViewerMultiProto._initEvents = function(){
		var _this = this;
		/*
		jQuery(document)
		
		.on('keyup', function(e) {
	      		var evtobj = window.event? window.event : e

	      		sappmaker.log.debug("Key pressed: " + evtobj.keyCode);

	      		if (evtobj.keyCode === 84){
	      			var apps = _m_loadedSapplicationsById;

	      			for(var appUrl in apps){
	      				apps[appUrl].fireEventAction({ 
							"scope" : "app",
							"eventName" : "keyUp",
							"eventData" : evtobj
						});
	      			};


	      		}
	      		else if (evtobj.keyCode === 67){
	      			if(viewer.options.enableConsole){
		      			if(viewer.isOverlayVisible()){ 
		      				viewer.hideOverlay();
		      			}
		      			else{
		      				var viewerConsole = viewer.getConsole();
		      				viewerConsole.setCurrentLog(viewer.getApp().getId());
		      				viewer.showOverlay(viewerConsole, function(){
		      						viewerConsole.flush();
		      				});
		      				
		      			}
	      			}		
	      		}
	      		else if (evtobj.keyCode === 70){
	      			viewer.requestFullscreen();
	      		}
			}
		)
		
		.on('swipeupdown', function anon_eventSwipeUpDown(eventData){

				var appInstances = _m_loadedSapplicationsById;

	      			for(var appUrl in appInstances){
	      				appInstances[appUrl].fireEventAction({ 
							"scope" : "app",
							"eventName" : "swipeUpDown",
							"eventData" : eventData
						});
	      			};
		});
		*/
		
		window.addEventListener(
			"message", 
			function(event){
				_this.sendMessage(event.data);
			}, 
			false
		);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.RestClient
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

    jQuery.sap.declare("ui5strap.RestClient");

    jQuery.sap.require("ui5strap.AppComponent");

    ui5strap.AppComponent.extend("ui5strap.RestClient");

    var RestClient = ui5strap.RestClient,
        RestClientProto = RestClient.prototype;

    RestClient.CONTENT_TYPE_TEXT = 'text/plain';
    RestClient.CONTENT_TYPE_XML = 'application/xml';
    RestClient.CONTENT_TYPE_JSON = 'application/json';
    RestClient.CONTENT_TYPE_FORM_URL_ENCODED = 'application/x-www-form-urlencoded';
    RestClient.CONTENT_TYPE_FORM_MULTIPART = 'multipart/form-data';

    RestClient.CHARSET_UTF8 = 'UTF-8';

    RestClient.RESPONSE_DATA_TYPE_TEXT = 'text';
    RestClient.RESPONSE_DATA_TYPE_HTML = 'html';
    RestClient.RESPONSE_DATA_TYPE_SCRIPT = 'script';
    RestClient.RESPONSE_DATA_TYPE_JSON = 'json';
    RestClient.RESPONSE_DATA_TYPE_JSONP = 'jsonp';
    RestClient.RESPONSE_DATA_TYPE_XML = 'xml';
    
    /*
    * Parses a path and replaces {placeholder} with values of pathParam directory, if present.
    * @protected
    */
    RestClientProto._parsePath = function(path, pathParam){
        pathParam = pathParam || {};
        return path.replace(/\{([a-zA-Z0-9]+)\}/g, function(m0, m1){
            return pathParam[m1];
        });
    };

    /*
    * Determine the final request URL based on given options
    */
    RestClientProto._determineRequestURL = function(options){
        var urlBase = this.options.url;
        return (jQuery.sap.endsWith(urlBase, "/") ? urlBase : urlBase + '/') + this._parsePath(options.path, options.pathParameters);
    };

    /*
    * GET Request with Query Parameters
    * @protected 
    */
    RestClientProto._get = function(options){
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }

        jQuery.ajax({
            data: options.queryParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'GET',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Url Encoded Parameters
    * @protected
    * @deprecated Use _postUrlEncoded instead
    */
    RestClientProto._postQuery = function(options){
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }

        jQuery.ajax({
            data: options.queryParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'POST',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Query Parameters to a host
    * @protected
    */
    RestClientProto._postUrlEncoded = function(options){
        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }

        var postUrl = this._determineRequestURL(options);

        if(options.queryParameters){
            postUrl += '?' + (-1 === postUrl.indexOf('?') ? '?' : '&') + jQuery.param(options.queryParameters);
        }

        jQuery.ajax({
            data: options.postParameters,
            dataType: options.responseDataType,
            processData: true,
            type: 'POST',
            url: postUrl,
            success : options.success,
            error : options.error
        });
    };

    /**
    * POST Object
    * @protected
    */
    RestClientProto._postWithPayload = function(options){
        if(!options.requestContentType){
            options.requestContentType = RestClient.CONTENT_TYPE_JSON + '; charset=' + RestClient.CHARSET_UTF8;
        }

        if(!options.responseDataType){
            options.responseDataType = RestClient.RESPONSE_DATA_TYPE_JSON;
        }

        jQuery.ajax({
            contentType: options.requestContentType,
            data: JSON.stringify(options.payload),
            dataType: options.responseDataType,
            processData: false,
            type: 'POST',
            url: this._determineRequestURL(options),
            success : options.success,
            error : options.error
        });
    };

    /*
    * POST Object / Payload to a host
    * @protected
    * @deprecated
    */
    RestClientProto._postPayload = function(options){
        jQuery.sap.log.warning('RestClient.prototype._postPayload is deprecated. Please use _postObject instead.');
        return this._postObject(options);
    };

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Button
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

	jQuery.sap.declare("ui5strap.Button");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Button", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				type : {
					type: "ui5strap.ButtonType", 
					defaultValue: ui5strap.ButtonType.Button
				},
				bsAction : {
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				text : {
					type: "string", 
					defaultValue: ""
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.Default
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			},
			events:{
		        "click":{},
		        "tap":{}
		    }

		}
	});

	var ButtonPrototype = ui5strap.Button.prototype;

	ui5strap.Utils.dynamicAttributes(
		ButtonPrototype, 
		[
			"title"
		]
	);

	ui5strap.Utils.dynamicText(ButtonPrototype);

	ui5strap.Utils.dynamicClass(ButtonPrototype, 'selected', { 'true' : 'active' });

	if(ui5strap.options.enableTapEvents){
		ButtonPrototype.ontap = function(){
			this.fireTap();
		};
	}

	if(ui5strap.options.enableClickEvents){
		ButtonPrototype.onclick = function(){
			this.fireClick();
		};
	}



}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonRenderer
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

	jQuery.sap.declare("ui5strap.ButtonRenderer");

	ui5strap.ButtonRenderer = {};

	ui5strap.ButtonRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, {});

	    this.renderContent(rm, oControl);

	    this.endRender(rm, oControl);

	    ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	ui5strap.ButtonRenderer.renderContent = function(rm, oControl) {
		ui5strap.RenderUtils.renderContent(rm, oControl);
	};

	ui5strap.ButtonRenderer.startRender = function(rm, oControl, options) {
		var size = oControl.getSize(),
			action = oControl.getBsAction(),
			type = oControl.getType(),
			severity = oControl.getSeverity(),
			title = oControl.getTitle();

		rm.write("<button");
	    
	    //Modal close button
		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}
		
		//Navbar toggle
		else if(action === ui5strap.BsAction.ToggleNavbar){
			rm.addClass("btn-toggle-navbar");
		}
		//Sidenav toggle
		else if(action === ui5strap.BsAction.ToggleSidenav){
			rm.addClass("btn-toggle-sidenav");
		}

		//Button is used as dropdown toggle within a ButtonDropdown
	    if('toggleDropdown' in options){
	    	rm.writeAttribute('id', oControl.getId() + '---' + ( options.toggleDropdown ? 'toggle' : 'button') );

	    	if(true === options.toggleDropdown){
		    	if(action !== ui5strap.BsAction.ToggleDropdown){ 
		    		//rm.writeAttribute("data-toggle", "dropdown");
		    		rm.addClass("dropdown-toggle");
		    	}
		    }
	    }
	    else{
	    	
	    	rm.writeControlData(oControl);
	    
	    }

	    if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

	    if(type === ui5strap.ButtonType.Button || ui5strap.ButtonType.Block === type){
		    rm.addClass("btn");
		    rm.addClass("btn-" + ui5strap.BSSeverity[severity]);
		    
			if(ui5strap.Size.Default !== size){
		    	rm.addClass('btn-' + ui5strap.BSSize[size]);
		    }

		    if(ui5strap.ButtonType.Block === type){
				rm.addClass("btn-block");
			}
		}
		else if(type === ui5strap.ButtonType.Link){
			rm.addClass("btn btn-link");
		}
		else if(type === ui5strap.ButtonType.Close || type === ui5strap.ButtonType.Icon){
			rm.addClass("close");
		}

	    if(oControl.getSelected()){
			rm.addClass("active");
		}
	
		if(!oControl.getEnabled()){
			rm.writeAttribute("disabled", "disabled");
		}

		ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-btn');

	    rm.writeClasses();
	    rm.write(">");
	};

	ui5strap.ButtonRenderer.endRender = function(rm, oControl){
		rm.write("</button>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Console
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.Console");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.Control.extend("ui5strap.Console", {
		metadata : {

			library : "ui5strap",
			properties : { 
				"logLevel" : {
					type:"int", 
					defaultValue:0
				}
			},

		}
	});

	var Console = ui5strap.Console,
		ConsolePrototype = Console.prototype;

	Console.LOG_DEFAULT = '__DEFAULT_LOG';
	Console.MAX_SIZE = 200;
	Console.MAX_LINES = 500;

	//Object vars
	ConsolePrototype._currentLogName = null;
	ConsolePrototype._firstLineNr = null;
	ConsolePrototype._scrollTimer = null;

	ConsolePrototype.init = function(){
		this._scrollTimer = null;

		this._firstLineNr = 0;
		this._logs = {}; 

		this.setCurrentLog(Console.LOG_DEFAULT);
	};

	ConsolePrototype.setCurrentLog = function(logName){
		this._currentLogName = logName;

		if(!(this._currentLogName in this._logs)){
			this._logs[this._currentLogName] = [];
		}

	};

	ConsolePrototype.setLogLevel = function(newLogLevel){
		this.setProperty("logLevel", newLogLevel, true);
	}; 

	ConsolePrototype.setBuffer = function(buffer){
		this._logs = buffer;
	};

	ConsolePrototype.getBuffer = function(){
		return this._logs;
	};

	Console.dateString = function(){
	    var d = new Date();
	    
	    var dateMonth = (d.getMonth() + 1);
	    if(dateMonth < 10) dateMonth = '0' + dateMonth;
	    
	    var dateDay = d.getDate();
	    if(dateDay < 10) dateDay = '0' + dateDay;

	    var dateHour = d.getHours();
	    if(dateHour < 10) dateHour = '0' + dateHour;

	    var dateMinutes = d.getMinutes();
	    if(dateMinutes < 10) dateMinutes = '0' + dateMinutes;
	    
	    var dateSeconds = d.getSeconds();
	    if(dateSeconds < 10) dateSeconds = '0' + dateSeconds;

	    return d.getFullYear() + '-' + dateMonth + '-' + dateDay + ' ' + dateHour + ':' + dateMinutes + ':' + dateSeconds;
	};

	ConsolePrototype.addLine = function(line, logType, logName){
		if(typeof logType === 'undefined' || null === logType){
			logType = 'info';
		}

		if(typeof logName === 'undefined' || null === logName){
			logName = Console.LOG_DEFAULT;
		}

		if(!(logName in this._logs)){
			this._logs[logName] = [];
		}

		this._logs[logName].push({
			"logType" : logType,
			"message" : line,
			"date" : Console.dateString()
		});

		if(null !== this._scrollTimer){
			return;
		}

		this._scrollTimer = window.setTimeout(jQuery.proxy(function(){

			

			if(logName === this._currentLogName){
					this.flush();

					this._scrollToBottom();
					
			}


			if(this._logs[logName].length > Console.MAX_SIZE){
				var toDelete = this._logs[logName].length - Console.MAX_SIZE;
				this._firstLineNr += toDelete;
				this._logs[logName].splice(0, toDelete);
			}

			this._scrollTimer = null;
		}, this), 100);	
	};

	ConsolePrototype.flush = function(){
		var logName = this._currentLogName;
		
		if(!(logName in this._logs)){
			throw new Error("Cannot flush undefined log: '" + logName + "'");
		}

		//We dont need to flush an empty log
		if(0 === this._logs[logName].length){
			return;
		}

		//console.log(this._logs, this._currentLogName);
		var $console = this.$().find('.ui5strap-console');
		if($console.size() > 0){
			var $consoleInner = $console.find('.ui5strap-console-inner');

			var startAt = 0;

			if($consoleInner.size() > 0){
				var oldLogName = $consoleInner.attr('data-log-name');

				if(oldLogName === logName){
					var lastLineNo = parseInt($consoleInner.attr('data-last-line-no'));

					if(lastLineNo >= this._firstLineNr){
						startAt = lastLineNo - this._firstLineNr + 1;
					}

					$consoleInner.detach();
				}
				else{ 
					$consoleInner.remove();
					$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + logName + '" data-log-name="' + logName + '"></div>');
					
				}
			}
			else{ 
				$consoleInner = jQuery('<div class="ui5strap-console-inner ui5strap-console-inner-' + logName + '" data-log-name="' + logName + '"></div>');
				
			}

			

			var lastLineNo = null;
			for(var i = startAt; i < this._logs[logName].length; i++){
				var line = this._logs[logName][i];
				lastLineNo = i + this._firstLineNr;
				$consoleInner.append('<div class="ui5strap-console-line ui5strap-console-line-' + line.logType  + '" data-line-no="' + lastLineNo + '">' + lastLineNo + ' ' + line.date + ' ' + line.message.replace(/\n/g, '<br />') + '</div>');
			}

			if(null !== lastLineNo){
				$consoleInner.attr('data-last-line-no', lastLineNo);
			}

			
			
			//Remove old lines
			
			var $lines = $consoleInner.find('.ui5strap-console-line');
			var i=0;
			var toDelete = $lines.size() - Console.MAX_LINES;
			while(i < toDelete){
				$lines[i].remove();
				i++;
			}

			$console.append($consoleInner);
			
		}
	};

	ConsolePrototype._scrollToBottom = function(scrollY){
		var $inner = this.$().find('.ui5strap-console');
		if($inner.size() > 0){
				$inner[0].scrollTop = scrollY ? scrollY : $inner[0].scrollHeight;
		}
	};

	ConsolePrototype.info = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.INFO){
			this.addLine(message, 'info', logName);
		}
	};

	ConsolePrototype.debug = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.DEBUG){
			this.addLine(message, 'debug', logName);
		}
	};

	ConsolePrototype.warning = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.WARNING){
			this.addLine(message, 'warning', logName);
		}
	};

	ConsolePrototype.error = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.ERROR){
			this.addLine(message, 'error', logName);
		}
	};

	ConsolePrototype.fatal = function(message, logName){
		if(this.getLogLevel() >= jQuery.sap.log.Level.FATAL){
			this.addLine(message, 'fatal', logName);
		}
	};

	ConsolePrototype.onBeforeRendering = function(){
        if(this.getDomRef()){
            this._scrollTop = this.$().find('.ui5strap-console')[0].scrollTop;

            this._$controlContent = this.$().children().first().detach();
		}
	};

	ConsolePrototype.onAfterRendering = function(){
        if(null !== this._$controlContent){
            this._scrollToBottom(this._scrollTop);
			
			this.flush();

            this.$().html(this._$controlContent);

            this._$controlContent = null;
		}
        else{
            this.flush();
        }
    };
}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ConsoleRenderer
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013-2015 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.ConsoleRenderer");

	var ConsoleRenderer = {};

	ui5strap.ConsoleRenderer = ConsoleRenderer;

	ConsoleRenderer.render = function(rm, oControl) {
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-console-container");
		rm.writeClasses();
		rm.write(">");
		    
	   		rm.write("<div");
	   		rm.addClass("ui5strap-console");
	   		rm.writeClasses();
		    rm.write(">");
		    
		    rm.write("<div");
	   		rm.addClass("ui5strap-console-inner");
	   		rm.writeClasses();
		    rm.write(">");
		    
		    rm.write("</div>");
		rm.write("</div>");
		    
		rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Sandbox
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

(function ui5osControlSandbox(){

	jQuery.sap.declare("ui5strap.Sandbox");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Sandbox", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				src : {
					type : "string", 
					defaultValue : ""
				}, 
				frameName : {
					type : "string", 
					defaultValue : ""
				}
			}

		}
	});

	var SandboxProto = ui5strap.Sandbox.prototype;

	SandboxProto.init = function(){
		var iframe = document.createElement('iframe');
		iframe.className = 'sandbox-iframe';
		iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-pointer-lock'; //allow-popups
		iframe.id = this.getId() + '----iframe';
		this.$iframe = jQuery(iframe);
	};


	SandboxProto.setSrc = function(src){
		this.$iframe.attr('src', src);
		this.setProperty('src', src, this.getDomRef());
	};
	
	SandboxProto.goHistoryBack = function(){
		this.$iframe[0].contentWindow.history.go(-1);
	};
	
	SandboxProto.goHistoryForward = function(){
		this.$iframe[0].contentWindow.history.go(1);
	};
	
	SandboxProto.refreshContent = function(){
		this.$iframe[0].contentWindow.location.reload();
	};

	SandboxProto.setFrameName = function(frameName){
		this.$iframe.attr('frameName', frameName);
		this.setProperty('frameName', frameName, this.getDomRef());
	};

	SandboxProto.onBeforeRendering = function(){
        if(this.getDomRef()){
            this.$iframe.detach();
		}
	};

	SandboxProto.onAfterRendering = function(){
		this.$().html(this.$iframe);
	};

	SandboxProto.sendMessage = function(appMessage, targetOrigin){
		this.$iframe[0].contentWindow.postMessage(appMessage, targetOrigin);
	};
}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.SandboxRenderer
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

(function ui5osControlSandboxRenderer(){

	jQuery.sap.declare("ui5strap.SandboxRenderer");

	ui5strap.SandboxRenderer = {};

	ui5strap.SandboxRenderer.render = function(rm, oControl) {
		 rm.write("<div");
		 rm.writeControlData(oControl);
		 rm.addClass("sandbox");
		 rm.writeClasses();
		 rm.write(">");
		 rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Icon
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

	jQuery.sap.declare("ui5strap.Icon");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Icon", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				iconSet : {
					type:"string", 
					defaultValue:"fa"
				},
				icon : {
					type:"string", 
					defaultValue:""
				},
				type : {
					type:"ui5strap.IconType",
					defaultValue:ui5strap.IconType.Default
				},
				fixedWidth : {
					type : "boolean",
					defaultValue : false
				},
				border : {
					type : "boolean",
					defaultValue : false
				},
				spin : {
					type : "boolean",
					defaultValue : false
				},
				inverse : {
					type : "boolean",
					defaultValue : false
				},
				size : {
					type : "ui5strap.IconSize",
					defaultValue : ui5strap.IconSize.Default
				},
				align : {
					type : "ui5strap.Alignment",
					defaultValue : ui5strap.Alignment.Default
				},
				transform : {
					type : "ui5strap.IconTransform",
					defaultValue : ui5strap.IconTransform.Default
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.IconRenderer
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

	jQuery.sap.declare("ui5strap.IconRenderer");

	ui5strap.IconRenderer = {

		sizeToClass : {
		    Large : "lg",
		    X2 : "2x",
		    X3 : "3x",
		    X4 : "4x",
		    X5 : "5x"
		  },

		 transformToClass : {
		    Rotate90 : "rotate-90",
		    Rotate180 : "rotate-180",
		    Rotate270 : "rotate-270",
		    FlipHorizontal : "flip-horizontal",
		    FlipVertical : "flip-vertical"
		  }
	};

	ui5strap.IconRenderer.render = function(rm, oControl) {
		var iconGroup = oControl.getIconSet(),
			size = oControl.getSize(),
			transform = oControl.getTransform(),
			severity = oControl.getSeverity(),
			prefix = iconGroup+'-',
			modPrefix = 'fa-';


		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-icon " + iconGroup);
		rm.addClass(prefix+oControl.getIcon());

		if(size !== ui5strap.IconSize.Default){
			rm.addClass(modPrefix+this.sizeToClass[size]);
		}

		if(transform !== ui5strap.IconTransform.Default){
			rm.addClass(modPrefix+this.transformToClass[transform]);
		}

		ui5strap.RenderUtils.alignment(rm, oControl);

		if(oControl.getFixedWidth()){
			rm.addClass(modPrefix+'fw')
		}

		if(oControl.getSpin()){
			rm.addClass(modPrefix+'spin')
		}

		if(oControl.getInverse()){
			rm.addClass(modPrefix+'inverse')
		}

		if(oControl.getBorder()){
			rm.addClass(modPrefix+'border')
		}

		if(ui5strap.IconType.FormFeedback === oControl.getType()){
			rm.addClass('form-control-feedback');
		}

		if(ui5strap.Severity.None !== severity){
			rm.addClass("text-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");
		rm.write("</span>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Link
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

	jQuery.sap.declare("ui5strap.Link");
	jQuery.sap.require("ui5strap.library");
	

	sap.ui.core.Control.extend("ui5strap.Link", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				type : {
					type : "ui5strap.LinkType",
					defaultValue : ui5strap.LinkType.Default
				},
				bsAction : {
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.None
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			},

			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			events:{
		        click: {},
		        tap : {}
		    }

		}
	});

	ui5strap.Utils.dynamicAttributes(
		ui5strap.Link.prototype, 
		[
			"title",
			"href",
			"target"
		]
	);

	ui5strap.Utils.dynamicText(ui5strap.Link.prototype);

	if(ui5strap.options.enableTapEvents){
		ui5strap.Link.prototype.ontap = function(){
			this.fireTap();
		};
	}

	if(ui5strap.options.enableClickEvents){
		ui5strap.Link.prototype.onclick = function(){
			this.fireClick();
		};
	}

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.LinkRenderer
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

	jQuery.sap.declare("ui5strap.LinkRenderer");

	ui5strap.LinkRenderer = {

		typeToClass : {
			Thumbnail : "thumbnail"
		}
	};

	ui5strap.LinkRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, { standalone : true });
		
		this.renderContent(rm, oControl);
		
		this.endRender(rm, oControl);

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	ui5strap.LinkRenderer.renderContent = function(rm, oControl){
		var text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
	};

	ui5strap.LinkRenderer.startRender = function(rm, oControl, options) {
		var href = oControl.getHref(),
			title = oControl.getTitle(),
			action = oControl.getBsAction(),
			target = oControl.getTarget();

		rm.write("<a");

		if(action === ui5strap.BsAction.DismissModal){
			rm.writeAttribute('data-dismiss', 'modal');	
		}

		if(options.toggleDropdown){
			rm.writeAttribute('id', oControl.getId() + '---link');
			rm.addClass("dropdown-toggle");
	    }
	    else if(options.listLink){
			rm.writeAttribute('id', oControl.getId() + '---link');
		}
		else{
			rm.writeControlData(oControl);
			
			if(options.standalone){
				var type = oControl.getType();
				if(ui5strap.LinkType.Default !== type){
					rm.addClass(this.typeToClass[type]);
				}
			}
		}

		rm.writeClasses();
		    
		if('' !== href){
			rm.writeAttribute('href', href);
		}

		if('' !== target){
			rm.writeAttribute('target', target);
		}

		if('' !== title){
	    	rm.writeAttribute('title', title);
	    }

		rm.write(">");
	};

	ui5strap.LinkRenderer.endRender = function(rm, oControl){
		rm.write("</a>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Text
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

	jQuery.sap.declare("ui5strap.Text");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Text", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				type : {
					type:"ui5strap.TextType", 
					defaultValue:ui5strap.TextType.Default
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	var TextProto = ui5strap.Text.prototype;

	TextProto.setText = function(newText){
		if(ui5strap.TextType.Default === this.getType()){
			this.setProperty('text', newText);
		}
		else{ 
			ui5strap.Utils.updateText(this, this.$(), newText);
		}
		
	};

	TextProto.setTitle = function(newTitle){
		if(ui5strap.TextType.Default === this.getType()){
			this.setProperty('title', newTitle, true);
		}
		else{ 
			ui5strap.Utils.updateAttribute(this, 'title', newTitle);
		}
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.TextRenderer
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

	jQuery.sap.declare("ui5strap.TextRenderer");


	ui5strap.TextRenderer = {
		typeToTag : {
			Default : "",
			Phrasing : "span",
			Strong : "strong",
			Emphasized : "em",
			Paragraph : "p",
			Blockquote : "blockquote",
			Quote : "q",
			Preformatted : "pre",
			Code : "code",
			Small : "small",
			Lead : "p",
			Abbreviation : "abbr",
			HelpBlock : "p"
 		}

	};

	ui5strap.TextRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			type = oControl.getType(),
			text = oControl.getText(),
			parse = oControl.getParse(),
			title = oControl.getTitle();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		if(ui5strap.TextType.Default === type){
			if(parse){
				rm.write(text);
			}
			else{
				rm.writeEscaped(text);
			}
		}
		else{
			var tagName = this.typeToTag[type];

			rm.write("<" + tagName);
			rm.writeControlData(oControl);
			
			//CSS Classes
			if(ui5strap.Severity.None !== severity){
				rm.addClass("text-" + ui5strap.BSSeverity[severity]);
			}
			
			if(ui5strap.TextType.Lead === type){
				rm.addClass("lead");
			}
			else if(ui5strap.TextType.HelpBlock === type){
				rm.addClass("help-block");
			}
			
			rm.writeClasses();
			
			//Attributes
			if('' !== title){
	    		rm.writeAttribute('title', title);
	    	}
			
			rm.write(">");
			
			ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
			
			rm.write("</" + tagName + ">");

		}
		
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.TextInput
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

	jQuery.sap.declare("ui5strap.TextInput");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.TextInput", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				type : {
					type : "ui5strap.TextInputType",
					defaultValue : ui5strap.TextInputType.FormControl
				},
				format : {
					type : "ui5strap.TextInputFormat",
					defaultValue : ui5strap.TextInputFormat.Default
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				rows : {
					type: "int",
					defaultValue : 1
				},
				placeholder : {
					type:"string", 
					defaultValue:""
				},
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}

		}
	});
	
	var _getInputValue = function(_this){
		return _this.$().val();
	};
	
	var _onChange = function(_this){
		return function(ev){
			var inputValue = _getInputValue(_this);
			if(inputValue !== _this.getValue()){ 
				_this.setProperty("value", inputValue, true);
			}
		}
	};

	ui5strap.TextInput.prototype.onAfterRendering = function(){
		this.$().on('change', _onChange(this));
	};

	ui5strap.TextInput.prototype.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$().off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	ui5strap.TextInput.prototype.setValue = function(sValue) {
		sValue = this.validateProperty("value", sValue);
		
		if (sValue != this.getValue()) {
			this.setProperty("value", sValue, true);
			if (this.getDomRef() && this.$().val() != sValue) {
				this.$().val(sValue);
				//this._curpos = this._$input.cursorPos();
			}
		}
		return this;
	};


}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.TextInputRenderer
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

	jQuery.sap.declare("ui5strap.TextInputRenderer");

	ui5strap.TextInputRenderer = {};

	ui5strap.TextInputRenderer.render = function(rm, oControl) {
		var rows = oControl.getRows(),
			type = oControl.getType();

		if(1 === rows){
			
			rm.write("<input");
			
			rm.writeControlData(oControl);
			
			rm.writeAttribute('type', "text");

			rm.writeAttribute('placeholder', oControl.getPlaceholder());
			rm.writeAttribute('value', oControl.getValue());
			
			if(type === ui5strap.TextInputType.FormControl){
				rm.addClass('form-control');
			}
			
			if(!oControl.getEnabled()){
				rm.writeAttribute('disabled', 'disabled');
			}

			var size = oControl.getSize();
			if(ui5strap.Size.Default !== size){
				rm.addClass('input-' + ui5strap.BSSize[size]);
			}
			
			rm.writeClasses();
			rm.write("/>");

		}
		else if(1 < rows){
			rm.write("<textarea");
			
			rm.writeControlData(oControl);
			
			rm.writeAttribute('rows', rows);
			rm.writeAttribute('placeholder', oControl.getPlaceholder());
			
			if(type === ui5strap.TextInputType.FormControl){
				rm.addClass('form-control');
			}
			
			if(!oControl.getEnabled()){
				rm.writeAttribute('disabled', 'disabled');
			}

			rm.writeClasses();
			rm.write(">");
			
			rm.writeEscaped(oControl.getValue());
			
			rm.write("</textarea>");
		}

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.RadioButton
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

	jQuery.sap.declare("ui5strap.RadioButton");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.RadioButton", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				type : {
					type:"ui5strap.RadioButtonType", 
					defaultValue:ui5strap.RadioButtonType.Block
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				groupName : {
					type : "string",
					defaultValue : ""
				},
				selected : {
					type : "boolean",
					defaultValue : false
				}
			}

		}
	});

	var _onChange = function(_this){
		return function(ev){
			var inputValue = _this.$checkbox.prop('checked');
			if(inputValue !== _this.getSelected()){ 
				_this.setProperty("selected", inputValue, true);
				_this.updateGroup();
			}
			
		}
	};

	ui5strap.RadioButton.prototype.onAfterRendering = function(){
		this.$checkbox = this.$().find('#' + 'ui5strap-radio---' + this.getId());
		this.$checkbox.on('change', _onChange(this));
	};

	ui5strap.RadioButton.prototype.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$checkbox.off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	ui5strap.RadioButton.prototype.updateGroup = function() {
		var radio = this;
		jQuery('.ui5strap-radio-' + this.getGroupName()).each(function(i, o){
			var controlId = o.id.substr(17);
			if(controlId !== radio.getId()){
				sap.ui.getCore().byId(controlId).setSelected(false);
			}
		});
	};

	ui5strap.RadioButton.prototype.setSelected = function(sValue) {
		var checkbox = this;
		sValue = this.validateProperty("selected", sValue);
		
		if (sValue != this.getSelected()) {
			this.setProperty("selected", sValue, true);
			if (this.getDomRef() && this.$checkbox.prop('checked') != sValue) {
				this.$checkbox.prop('checked', sValue);
				checkbox.updateGroup();
			}


		}
//alert('test');
		
		return this;
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.RadioButtonRenderer
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

	jQuery.sap.declare("ui5strap.RadioButtonRenderer");

	ui5strap.RadioButtonRenderer = {};

	ui5strap.RadioButtonRenderer.render = function(rm, oControl) {
		var groupName = oControl.getGroupName(),
			type = oControl.getType(),
			typeBlock = ui5strap.RadioButtonType.Block;

		if(type === typeBlock){ 
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('radio');
			rm.writeClasses();
			rm.write(">");
		}
			
			rm.write("<label");
			if(type === ui5strap.RadioButtonType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('radio-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.RadioButtonType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', 'ui5strap-radio---' + oControl.getId());
				}
				rm.writeAttribute('type', 'radio');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeAttribute('name', groupName);
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.addClass('ui5strap-radio-' + groupName);
				rm.writeClasses();
				rm.write('/>');
					
					rm.writeEscaped(oControl.getLabel());
		
			rm.write("</label>");

		if(type === typeBlock){ 
			rm.write("</div>");
		}
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.SelectBox
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

	jQuery.sap.declare("ui5strap.SelectBox");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.SelectBox", {
		metadata : {

			defaultAggregation : "items",

			library : "ui5strap",
			
			properties : { 
				type : {
					type: "ui5strap.SelectBoxType", 
					defaultValue: ui5strap.SelectBoxType.FormControl
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				disabled : {
					type:"boolean", 
					defaultValue:false
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			},

			aggregations : { 
				items : {
					type : "ui5strap.Item",
					singularName: "items"
				} 
			}

		}
	});
	
	var _getInputValue = function(_this){
		return _this.$().val();
	};
	
	var _onChange = function(_this){
		return function(ev){
			var inputValue = _getInputValue(_this);
			if(inputValue !== _this.getValue()){ 
				_this.setProperty("value", inputValue, true);
			}
		}
	};

	ui5strap.SelectBox.prototype.onAfterRendering = function(){
		this.$().on('change', _onChange(this));
	};

	ui5strap.SelectBox.prototype.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$().off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	ui5strap.SelectBox.prototype.setValue = function(sValue) {
		sValue = this.validateProperty("value", sValue);
		
		if (sValue != this.getValue()) {
			this.setProperty("value", sValue, true);
			if (this.getDomRef() && this.$().val() != sValue) {
				this.$().val(sValue);
				//this._curpos = this._$input.cursorPos();
			}
		}
		return this;
	};


}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.SelectBoxRenderer
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

	jQuery.sap.declare("ui5strap.SelectBoxRenderer");

	ui5strap.SelectBoxRenderer = {};

	ui5strap.SelectBoxRenderer.render = function(rm, oControl) {
		var size = oControl.getSize(),
			type = oControl.getType(),
			items = oControl.getItems();

		rm.write("<select");
		
		rm.writeControlData(oControl);
		
		if(oControl.getDisabled()){
			rm.writeAttribute('disabled', 'disabled');
		}
		if(ui5strap.Size.Default !== size){
			rm.addClass('input-' + ui5strap.BSSize[size]);
		}
		if(type === ui5strap.SelectBoxType.FormControl){
			rm.addClass('form-control');
		}
		rm.writeClasses();
		rm.write(">");

		for(var i = 0; i < items.length; i++){
			this.renderOption(rm, oControl, items[i]);
		}

		rm.write("</select>");
		
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	ui5strap.SelectBoxRenderer.renderOption = function(rm, oControl, item) {
		var itemValue = item.getValue();

			rm.write("<option");
			rm.writeAttribute("value", itemValue);
			if(oControl.getValue() === itemValue){
				rm.writeAttribute("selected", "selected");
			}
			rm.write(">");
			rm.writeEscaped(item.getText());
			rm.write("</option>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListItem
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

	jQuery.sap.declare("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.ListItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				selected : {
					type:"boolean", 
					defaultValue:false
				}, 
				enabled : {
					type:"boolean", 
					defaultValue:true
				},
				selectable : {
					type : "boolean",
					defaultValue : true
				},
				text : {
					type:"string",
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	var ListItemPrototype = ui5strap.ListItem.prototype;

	ui5strap.Utils.dynamicText(ListItemPrototype);

	ui5strap.Utils.dynamicClass(ListItemPrototype, 'selected', { 'true' : 'active' });

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListItemRenderer
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

	jQuery.sap.declare("ui5strap.ListItemRenderer");

	ui5strap.ListItemRenderer = {
	};

	ui5strap.ListItemRenderer.render = function(rm, oControl) {
		var text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		rm.write("<li");
		rm.writeControlData(oControl);
		
		if(oControl.getSelected()){
			rm.addClass("active");
		}
		
		if(!oControl.getEnabled()){
			rm.addClass("disabled");
		}

		rm.writeClasses();

		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);

		rm.write("</li>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListBase
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

	jQuery.sap.declare("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListItem");
	
	var _metadata = {
		defaultAggregation : "items",

		library : "ui5strap",

		properties : { 
			selectionMode : {
				type : "ui5strap.SelectionMode",
				defaultValue : ui5strap.SelectionMode.None
			}
		},
				
		aggregations : { 
			items : {
				type : "ui5strap.ListItem",
				singularName: "items"
			} 
		},

		events:{

			select : {}

		}
	};

	if(ui5strap.options.enableTapEvents){
		_metadata.events.tap = {};
	}

	if(ui5strap.options.enableClickEvents){
		_metadata.events.click = {};
	}

	sap.ui.core.Control.extend("ui5strap.ListBase", {
		metadata : _metadata
	});

	var ListBaseProto = ui5strap.ListBase.prototype;

	ListBaseProto.setSelectedIndex = function(itemIndex){

		var items = this.getItems();
		if(itemIndex < 0 || itemIndex >= items.length){
			return false;
		}
		this.setSelectedControl(items[itemIndex]);

	};
 
	ListBaseProto.getSelectedIndex = function(){
		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return i;
			}
		}
		return -1;
	};

	ListBaseProto.setMasterSelected = function(listItem){
		
			var parent = this.getParent(),
				grandParent = parent.getParent();

			if(grandParent instanceof ui5strap.ListBase){
				grandParent.setSelectedControl(parent, this);
			}
	
	};

	ListBaseProto.setSelectedControl = function(item, nestedList){

		var items = this.getItems();
		for(var i = 0; i < items.length; i++){ 
			if(items[i] === item){
				if(!item.getSelected()){
					item.setSelected(true);
					this.fireSelect({ "selectionSource" : nestedList ? nestedList : this });

					if(this.getSelectionMode() === ui5strap.SelectionMode.SingleMaster){
						this.setMasterSelected(item);
					}
				}
			}
			else{
				items[i].setSelected(false);
			}
		}
		
	};

	ListBaseProto.getSelectedControl = function(){
		var items = this.getItems();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return items[i];
			}
		}
		return null;
	};

	var _processSelection = function(_this, oEvent){
		var srcControl = oEvent.srcControl,
			eventOptions = {
				srcControl : srcControl
			},
			selectionMode = _this.getSelectionMode();

		if(srcControl instanceof ui5strap.ListItem){
			eventOptions.listItem = srcControl;
		}
		else{
			var parentControl = srcControl.getParent();
			if(parentControl instanceof ui5strap.ListItem){
				eventOptions.listItem = parentControl;
			}
		}

		if(eventOptions.listItem && eventOptions.listItem.getSelectable()){
			if(selectionMode === ui5strap.SelectionMode.Single || selectionMode === ui5strap.SelectionMode.SingleMaster){
				_this.setSelectedControl(eventOptions.listItem);
			}
			else if(selectionMode === ui5strap.SelectionMode.Master){
				_this.setMasterSelected(eventOptions.listItem);
			}
		}

		return eventOptions;
	};

	if(ui5strap.options.enableTapEvents){
		ListBaseProto.ontap = function(oEvent){
			oEvent.stopPropagation();
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	if(ui5strap.options.enableClickEvents){
		ListBaseProto.onclick = function(oEvent){
			oEvent.stopPropagation();
			this.fireClick(_processSelection(this, oEvent));
		};
	}

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListLinkItem
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

	jQuery.sap.declare("ui5strap.ListLinkItem");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListItem");
	jQuery.sap.require("ui5strap.Link");

	ui5strap.ListItem.extend("ui5strap.ListLinkItem", {
		metadata : {
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				bsAction : {
					type: "ui5strap.BsAction", 
					defaultValue: ui5strap.BsAction.None
				},
				title : {
					type:"string", 
					defaultValue:""
				},
				href : {
					type:"string", 
					defaultValue:""
				},
				target  : {
					type:"string", 
					defaultValue : ""
				}			
			}
		}
	});

	ui5strap.ListLinkItem.prototype.setText = function(newText){
		ui5strap.Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListLinkItemRenderer
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

	jQuery.sap.declare("ui5strap.ListLinkItemRenderer");
	jQuery.sap.require("ui5strap.LinkRenderer");

	ui5strap.ListLinkItemRenderer = {
	};

	ui5strap.ListLinkItemRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl, {});

		ui5strap.LinkRenderer.renderContent(rm, oControl);

		this.endRender(rm, oControl);
	};

	ui5strap.ListLinkItemRenderer.startRender = function(rm, oControl){
		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		ui5strap.LinkRenderer.startRender(rm, oControl, { listLink : true });
	};

	ui5strap.ListLinkItemRenderer.endRender = function(rm, oControl){
		ui5strap.LinkRenderer.endRender(rm, oControl);
		    
		rm.write("</li>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroupItem
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

	jQuery.sap.declare("ui5strap.ListGroupItem");
	jQuery.sap.require("ui5strap.ListItem");

	ui5strap.ListItem.extend("ui5strap.ListGroupItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				badge : {
					type:"string",
					defaultValue : ""
				}
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroupItemRenderer
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

	jQuery.sap.declare("ui5strap.ListGroupItemRenderer");

	ui5strap.ListGroupItemRenderer = {
	};

	ui5strap.ListGroupItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge(),
			parent = oControl.getParent(),
			tag = parent.getContainer() ? 'a' : 'li',
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
		
		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group-item');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		rm.writeClasses();
		rm.write(">");

		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl);
		    
		rm.write("</"+ tag + ">");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMediaItem
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
	
	/**
	 * TODO More efficient rerendering
	 */
	ui5strap.ListMediaItem.prototype.setText = function(newText, suppressInvalidate){
		this.setProperty('text', newText, suppressInvalidate);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMediaItemRenderer
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

	jQuery.sap.declare("ui5strap.ListMediaItemRenderer");

	ui5strap.ListMediaItemRenderer = {
	};

	ui5strap.ListMediaItemRenderer.render = function(rm, oControl) {
		var parent = oControl.getParent(),
			media = oControl.getMedia(),
			heading = oControl.getHeading(),
			tag = !(parent instanceof ui5strap.ListMedia) || parent.getContainer() ? 'div' : 'li',
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
		
		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('media');
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		rm.writeClasses();
		rm.write(">");

		if(null !== media){
			media.addStyleClass('pull-left');
			rm.renderControl(media);
		}

		rm.write('<div class="media-body">');

		if('' !== heading){
			rm.write('<h4 class="media-heading">');
			rm.writeEscaped(heading);
			rm.write('</h4>');
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		
		rm.write('</div>');
		    
		rm.write("</"+ tag + ">");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Tooltip
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
        
        titleContentPlacement : {
          type:"ui5strap.ContentPlacement",
          defaultValue : ui5strap.ContentPlacement.Start
        },

        placement : {
          type: "ui5strap.Placement", 
          defaultValue: ui5strap.Placement.Right
        },

        trigger : {
          type: "ui5strap.TriggerMode", 
          defaultValue: ui5strap.TriggerMode.Hover
        },

        animate : {
          type:"boolean", 
          defaultValue:true
        }

      },
      
      aggregations : { 
        titleContent : {
          singularName: "titleContent"
        },
      },
      
      associations : {
        source : {
            multiple : false
        }
      },
      events : {
         shown : {},
         hidden : {}
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
    var $this = this.$(),
        _this = this;

    var tooltipOptions = {
      title : function(){
        var title = $this.find('.tooltip-data-title').html();
        var sourceControl = _this.getSourceControl();
        if('' === title && 'getTitle' in sourceControl){
             title = sourceControl.getTitle(); 
        }
        return title;
      },
      
      trigger : ui5strap.BSTriggerMode[this.getTrigger()],
      
      html : true,

      animation : _this.getAnimate()
    };

    var placement = this.getPlacement();
    if(placement !== ui5strap.Placement.None){
        if(placement !== ui5strap.Placement.Default){
          tooltipOptions.placement = ui5strap.BSPlacement[placement];
        }
        this.getSourceDomRef().tooltip(tooltipOptions);
    }

    this.getSourceDomRef().on('hidden.bs.tooltip', function(){
        _this.fireHidden();
    }).on('shown.bs.tooltip', function(){
        _this.fireShown();
    });
  };

  Tooltip.prototype.show = function(){
      this.getSourceDomRef().tooltip('show');
  };

  Tooltip.prototype.hide = function(){
      this.getSourceDomRef().tooltip('hide');
  };

  Tooltip.prototype.toggle = function(){
      this.getSourceDomRef().tooltip('toggle');
  };
  
}());

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);;/*
 * 
 * UI5Strap
 *
 * ui5strap.TooltipRenderer
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

	jQuery.sap.declare("ui5strap.TooltipRenderer");

	ui5strap.TooltipRenderer = {};

	ui5strap.TooltipRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.writeAttribute("style", "display:none;");
		rm.addClass("tooltip-data");
		rm.writeClasses();
		rm.write(">");

		rm.write("<div");
			   
		rm.addClass("tooltip-data-title");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderTitleContent(rm, oControl);

		rm.write("</div>");
		rm.write("</div>");
		    
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMAppMessage
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

	jQuery.sap.declare("ui5strap.AMAppMessage");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMAppMessage");

	var AMAppMessageProto = ui5strap.AMAppMessage.prototype;

	AMAppMessageProto.namespace = 'appMessage';

	AMAppMessageProto.parameters = {
		"receiver" : {
			"required" : true, 
			"type" : [ "string", "object"]
		},
		"message" : {
			"required" : true, 
			"type" : "object"
		},
		"toParent" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		}
	};

	/*
	* @Override
	*/
	AMAppMessageProto.run = function(){
		this.context.app.sendMessage(this.context.parameters[this.namespace]);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMCallControlMethod
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

	jQuery.sap.declare("ui5strap.AMCallControlMethod");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMCallControlMethod");

	var AMCallControlMethodProto = ui5strap.AMCallControlMethod.prototype;

	/*
	* @Override
	*/
	AMCallControlMethodProto.namespace = 'callControlMethod';

	/*
	* @Override
	*/
	AMCallControlMethodProto.parameters = {
		//Required
		"funcName" : {
			"required" : true,
			"type" : "string"
		},

		//Optional
		"funcArgs" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"tgtParam" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},

		"controlId" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMCallControlMethodProto.run = function(){
		var funcName = this.getParameter("funcName"),
			funcArgs = this.getParameter("funcArgs"),
			tgtParam = this.getParameter("tgtParam"),
			control = this.findControl(false);
		
		if(null === funcArgs){
			funcArgs = [];
		}

		var result = control[funcName].apply(control, funcArgs);

		if(tgtParam){
			this.context._setParameter(tgtParam, result);
		}

		this.context._log.debug("Calling control method '" + funcName + "' of control '" + control.getId() + "'");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMChangeTheme
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

	jQuery.sap.declare("ui5strap.AMChangeTheme");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMChangeTheme");

	var AMChangeThemeProto = ui5strap.AMChangeTheme.prototype;

	/*
	* @Override
	*/
	AMChangeThemeProto.namespace = 'changeTheme';

	/*
	* @Override
	*/
	AMChangeThemeProto.parameters = {
		"theme" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMChangeThemeProto.run = function(){
		var newTheme = this.getParameter('theme');

		var app = this.context.app;

		app.setLoaderVisible(true, function(){

			window.setTimeout(function(){
				
				app.setTheme(newTheme);

				window.setTimeout(function(){
					app.setLoaderVisible(false);
				}, 800);
				

			}, 200);

		}, 'opaque');
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMCloseApp
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

 	jQuery.sap.declare("ui5strap.AMCloseApp");
	
	
 	var AMCloseApp = function(){

	};

	AMCloseApp.prototype = new ui5strap.ActionModule();

	var AMCloseAppProto = AMCloseApp.prototype;
	ui5strap.AMCloseApp = AMCloseApp;

	/*
	* @Override
	*/
	AMCloseAppProto.namespace = 'closeApp';

	/*
	* @Override
	*/
	AMCloseAppProto.parameters = {
		"appId" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMCloseAppProto.run = function(){
		
		if(!(this.context.app instanceof ui5strap.AppSystem)){
			throw new Error('Only system apps can run ui5strap.AMCloseApp');
		}

		var _this = this;

		this.context.app.getViewer().closeApp(this.getParameter('appId'), function(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		});
		
	};

	/*
	* @Override
	*/
	AMCloseAppProto.completed = function(){
		//Originally, the EVENT_COMPLETED is fired here. We have to override this method to disable this default behaviour.
	};

})();;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMCloseOverlay
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.AMCloseOverlay");

	ui5strap.ActionModule.extend("ui5strap.AMCloseOverlay");

	var AMCloseOverlayProto = ui5strap.AMCloseOverlay.prototype;

	/*
	* @Override
	*/
	AMCloseOverlayProto.namespace = 'closeOverlay';

	/*
	* @Override
	*/
	AMCloseOverlayProto.parameters = {
			
			"transition" : {
				"required" : false, 
				"defaultValue" : "transition-slide-btt", 
				"type" : "string"
			},
			"scope" : {
				"required" : false,
				"defaultValue" : "APP",
				"type" : "string"
			}
	};

	/*
	* @Override
	*/
	AMCloseOverlayProto.run = function(){
		var _this = this,
			app = this.context.app,
			overlayParent = app;
		
		if("VIEWER" === this.getParameter("scope")){
			if(!(app instanceof ui5strap.AppSystem)){
				throw new Error("Only System Apps can open global overlays!");
			}
			overlayParent = app.getViewer();
		}
		
		overlayParent.hideOverlay(function CloseOverlayActionComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		}, this.getParameter('transition'));
	};

	/*
	* @Override
	*/
	AMCloseOverlayProto.completed = function(){

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMDummy
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

	//Declare Module
	jQuery.sap.declare("ui5strap.AMDummy");

	//Require ui5strap.ActionModule
	jQuery.sap.require("ui5strap.ActionModule");

	//Define Constructor
	ui5strap.ActionModule.extend("ui5strap.AMDummy");

	/*
	* Run the ActionModule
	* @override
	*/
	ui5strap.AMDummy.prototype.run = function(){};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGetContextData
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

	jQuery.sap.declare("ui5strap.AMGetContextData");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMGetContextData");

	var AMGetContextDataProto = ui5strap.AMGetContextData.prototype;

	/*
	* @Override
	*/
	AMGetContextDataProto.namespace = 'getContextData';

	/*
	* @Override
	*/
	AMGetContextDataProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}
		
	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMGetContextDataProto.run = function(){
			var modelName = this.getParameter("modelName"),
				tgtParam = this.getParameter("tgtParam"),
				control = this.findControl();

			var bindingContext = control.getBindingContext(modelName);
			var model = bindingContext.getModel();
			var data = model.getProperty(bindingContext.getPath());

			this.context._setParameter(tgtParam, data);
			//this.context._log.debug("get '" + propertyKey + "' = '" + propertyValue + "'");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGetProperty
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

	jQuery.sap.declare("ui5strap.AMGetProperty");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMGetProperty");

	var AMGetPropertyProto = ui5strap.AMGetProperty.prototype;

	/*
	* @Override
	*/
	AMGetPropertyProto.namespace = 'getProperty';

	/*
	* @Override
	*/
	AMGetPropertyProto.parameters = {
		
		//Required
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		}
		
	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMGetPropertyProto.run = function(){
			var propertyKey = this.getParameter("propertyName"),
				tgtParam = this.getParameter("tgtParam"),
				control = this.findControl(false),
				propertyValue = control["get" + jQuery.sap.charToUpperCase(propertyKey, 0)]();

			this.context._setParameter(tgtParam, propertyValue);
			this.context._log.debug("get '" + propertyKey + "' = '" + propertyValue + "'");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMGotoPage
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

	jQuery.sap.declare("ui5strap.AMGotoPage");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMGotoPage");

	var AMGotoPageProto = ui5strap.AMGotoPage.prototype;

	/*
	* @Override
	*/
	AMGotoPageProto.namespace = "gotoPage";

	/*
	* @Override
	*/
	AMGotoPageProto.parameters = {
		//Required
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"target" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		},
		
		"writeHistory" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		},
		"bookmarkable" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : true
		},
		"virtual" : {
			"required" : false, 
			"type" : "boolean",
			"defaultValue" : false
		}
		
	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMGotoPageProto.run = function(){
			var viewId = this.getParameter("id"),
				viewType = this.getParameter("type"),
				viewName = this.getParameter("viewName"),
				target = this.getParameter("target"),
				writeHistory = this.getParameter("writeHistory"),
				bookmarkable = this.getParameter("bookmarkable"),
				virtual = this.getParameter("virtual"),
				parameters = this.getParameter("parameters");

			this.context._log.debug("Goto page '" + viewId + "' on target '" + target + "' ...");
			
			var view = {
				id : viewId,
				viewName : viewName,
				type : viewType,
				target : target,
				writeHistory : writeHistory,
				bookmarkable : bookmarkable,
				virtual : virtual,
				parameters : parameters
			};

			this.context.app.getFrame().gotoPage(this.context.parameters[this.namespace]);
	}

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMJsAlert
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

	jQuery.sap.declare("ui5strap.AMJsAlert");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMJsAlert");

	var AMJsAlertProto = ui5strap.AMJsAlert.prototype;

	/*
	* @Override
	*/
	AMJsAlertProto.namespace = 'alert';

	/*
	* @Override
	*/
	AMJsAlertProto.parameters = {
		"message" : {
			"required" : true,
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMJsAlertProto.run = function(){
		alert(this.getParameter('message'));
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMLoadModel
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
	jQuery.sap.declare("ui5strap.AMLoadModel");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMLoadModel");

	var AMLoadModel = ui5strap.AMLoadModel,
		AMLoadModelProto = AMLoadModel.prototype;
	

	AMLoadModel.TYPE_ODATA = "ODATA";
	AMLoadModel.TYPE_JSON = "JSON";
	AMLoadModel.TYPE_RESOURCE = "RESOURCE";

	/*
	* @Override
	*/
	AMLoadModelProto.namespace = 'loadModel';

	/*
	* @Override 
	*/
	AMLoadModelProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"src" : {
			"required" : true, 
			"type" : "string"
		},
		"type" : {
			"required" : true, 
			"type" : "string"
		},

		//Optional
		"serviceId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"paramMapping" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : ["object", "string"]
		},
		"dataPath" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}
		
	};

	/*
	* @Override 
	*/
	AMLoadModelProto.prepareParameters = function(){
			var serviceId = this.getParameter("serviceId");
			if(null !== serviceId){
				var service = this.context.app.getServiceData(serviceId);
				if(null === service){
					throw new Error('Invalid service: "' + serviceId + '"');
				}
				this.setParameter("src", service.url);
			}
	};

	/*
	* @Override 
	*/
	AMLoadModelProto.run = function(){ 
			var _this = this,
				modelUrl = this.context.app.config.resolvePath(this.getParameter("src"));

			var serviceMapping = this.getParameter("paramMapping");
			if(null !== serviceMapping){
				var mapping = {};
				var mappingType = typeof serviceMapping;
				if(mappingType === 'string'){
					mapping = JSON.parse('{' + serviceMapping + '}');
				}
				else if(mappingType === 'object'){
					mapping = serviceMapping;
				}	
				
				for(var paramKey in mapping){
					var replaceValue = this.context._getParameter(mapping[paramKey]);
					modelUrl = modelUrl.replace("{"+paramKey+"}", replaceValue);
				}	
			}

			//TODO create option to disable anti-caching
			modelUrl += (modelUrl.indexOf('?') !== -1 ? '&' : '?') + 'rand=' + Math.random();

			var modelType = this.getParameter("type");
			var modelName = this.getParameter("modelName");
			var modelPath = this.getParameter("dataPath");
			
			jQuery.sap.log.debug("Loading view model: '" + modelUrl + "'");

			var theControl = this.findControl(true);
			
			var oModel = null;
			if(AMLoadModel.TYPE_ODATA === modelType){
				oModel = new sap.ui.model.odata.ODataModel(modelUrl);
			}
			else if(AMLoadModel.TYPE_JSON === modelType){ 
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(modelUrl);
			}
			else if(AMLoadModel.TYPE_RESOURCE === modelType){ 
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelUrl,
					async : true
				});
			}
			else{
				throw new Error('Invalid model type: ' + modelType);
			}

			oModel.attachRequestCompleted({}, function(){
				if(modelPath !== null){ 
					
						var data = oModel.getProperty(modelPath); 
						oModel = new sap.ui.model.json.JSONModel(data);

						if(null !== theControl){
							theControl.setModel(oModel, modelName);
						}
					
				}
				else{
					if(null !== theControl){
						theControl.setModel(oModel, modelName);
					}
				}

				_this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (type: '" + modelType + "', scope: '" + _this.getParameter("scope") + "') loaded.");
			});
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMLog
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

	jQuery.sap.declare("ui5strap.AMLog");

	ui5strap.ActionModule.extend("ui5strap.AMLog");

	var AMLogProto = ui5strap.AMLog.prototype;

	/*
	* @Override
	*/
	AMLogProto.namespace = 'log';

	/*
	* @Override
	*/
	AMLogProto.parameters = {
		"logType" : {
			"required" : true, 
			"type" : "string"
		},
		"message" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMLogProto.run = function(){
		this.context._log[this.getParameter("logType")](this.getParameter("message"));
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMOpenApp
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.AMOpenApp");
	
	jQuery.sap.require("ui5strap.ActionModule");

	var ActionModule = ui5strap.ActionModule;

	ActionModule.extend("ui5strap.AMOpenApp");

	var OpenAppProto = ui5strap.AMOpenApp.prototype;

	/*
	* @Override
	*/
	OpenAppProto.namespace = 'openApp';

	/*
	* @Override
	*/
	OpenAppProto.parameters = {
		"appUrl" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : false, 
			"defaultValue" : "BROWSER", 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	OpenAppProto.run = function(){
		
		var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');

		var appUrl = this.getParameter("appUrl");

		if(!appUrl){
			throw new Error('Invalid sapplication url: ' + appUrl);
		}

		var sapplicationUrl = currentUrl + '?sapp=' + encodeURIComponent(appUrl) + '&rand=' + Math.random();

		this.setParameter("frameUrl", sapplicationUrl);

		if(!(this.context.app instanceof ui5strap.AppSystem)){
			console.log(this.context.app);
			throw new Error('Only system apps can run ui5strap.AMOpenApp');
		}

		var sappViewer = this.context.app.getViewer();
		var target = this.getParameter("target");
		if("BROWSER" === target){
			//Means to redirect
			sappViewer.openSapplication(appUrl);
		}
		else if("VIEWER" === target){
			var _this = this;
			sappViewer.executeApp(appUrl, false, function(){
				//Notify the action module that the action is completed.
				_this.fireEvents(ActionModule.EVENT_COMPLETED);
			});	
		}
		
	};

	/*
	* @Override
	*/
	OpenAppProto.completed = function(){
		//Originally, the EVENT_COMPLETED is fired here. We have to override this method to disable this default behaviour.
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMSetModel
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

	jQuery.sap.declare("ui5strap.AMSetModel");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMSetModel");

	var AMSetModelProto = ui5strap.AMSetModel.prototype;

	/*
	* @Override
	*/
	AMSetModelProto.namespace = 'setModel';

	/*
	* @Override
	*/
	AMSetModelProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"defaultValue" : null, 
			"type" : "string"
		},

		//Optional
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		},
		
		"data" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"srcParam" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "string"
		}

	};

	/*
	* @Override
	*/
	AMSetModelProto.run = function(){ 
			var srcParam = this.getParameter("srcParam"),
				modelName = this.getParameter("modelName"),
				data = this.getParameter("data"),
				theControl = this.findControl(true);
			
			if(null !== srcParam){
				data = this.context._getParameter(srcParam);
			}

			if(!data){
				throw new Error('Data must be an object!');
			}

			theControl.setModel(new sap.ui.model.json.JSONModel(data), modelName);

			this.context._log.debug("Model '" + modelName + "' (src param: '" + srcParam + "', scope: '" + this.getParameter("scope") + "') set.");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMSetProperty
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

	jQuery.sap.declare("ui5strap.AMSetProperty");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMSetProperty");

	var AMSetPropertyProto = ui5strap.AMSetProperty.prototype;

	/*
	* @Override
	*/
	AMSetPropertyProto.namespace = 'setProperty';

	/*
	* @Override
	*/
	AMSetPropertyProto.parameters = {
		
		//Required
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"value" : {
			"required" : true, 
			"type" : ["int", "boolean", "string", "object"]
		},

		//Optional
		"controlId" : {
			"required" : false, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "APP", 
			"type" : "string"
		},

		"srcParam" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		}

	};

	/*
	* Run the ActionModule
	* @override
	*/
	AMSetPropertyProto.run = function(){
			var srcParam = this.getParameter("srcParam"),
				propertyName = this.getParameter("propertyName"),
				propertyValue = this.getParameter("value"),
				control = this.findControl(false);
			
			//Read value from another parameter
			if(null !== srcParam){
				propertyValue = this.context._getParameter(srcParam);
			}

			control.setProperty(propertyName, propertyValue);

			this.context._log.debug("[AMSetProperty]: '" + propertyName + "' = '" + propertyValue + "'");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMShowOverlay
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.AMShowOverlay");

	ui5strap.ActionModule.extend("ui5strap.AMShowOverlay");

	var AMShowOverlayProto = ui5strap.AMShowOverlay.prototype;

	/*
	* @Override
	*/
	AMShowOverlayProto.namespace = 'showOverlay';

	/*
	* @Override
	*/
	AMShowOverlayProto.parameters = {
		"id" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"type" : {
			"required" : false, 
			"defaultValue" : "HTML", 
			"type" : "string"
		},
		"viewName" : {
			"required" : true, 
			"type" : "string"
		},
		"target" : {
			"required" : true, 
			"type" : "string"
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		},
		"transition" : {
			"required" : false, 
			"defaultValue" : "transition-slide-ttb", 
			"type" : "string"
		},
		"scope" : {
			"required" : false,
			"defaultValue" : "APP",
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMShowOverlayProto.run = function(){

		var _this = this,
			viewId = this.getParameter("id"),
			viewType = this.getParameter("type"),
			viewName = this.getParameter("viewName"),
			target = this.getParameter("target"),
			parameters = this.getParameter("parameters"),
			app = this.context.app,
			overlayParent = app;

		var viewOptions = {
			"appId" : app.getId(),
			"id" : viewId,
			"type" : viewType,
			"viewName" : viewName,
			"target" : target,
			"parameters" : parameters
		};
		
		if("VIEWER" === this.getParameter("scope")){
			if(!(app instanceof ui5strap.AppSystem)){
				throw new Error("Only System Apps can open global overlays!");
			}
			overlayParent = app.getViewer();
		}
		
		overlayParent.showOverlay(viewOptions, function AMShowOverlayRunComplete(){
			_this.fireEvents(ui5strap.ActionModule.EVENT_COMPLETED);
		}, this.getParameter('transition'));
	};

	/*
	* @Override
	*/
	AMShowOverlayProto.completed = function(){

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMUnloadModel
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.AMUnloadModel");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMUnloadModel");

	var AMUnloadModelProto = ui5strap.AMUnloadModel.prototype;

	/*
	* @Override
	*/
	AMUnloadModelProto.namespace = 'unloadModel';

	/*
	* @Override
	*/
	AMUnloadModelProto.parameters = {
		
		//Required
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		
		//Optional
		"controlId" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		}

	};

	/*
	* @Override
	*/
	AMUnloadModelProto.run = function(){ 
			var theControl = this.findControl(true),
				modelName = this.getParameter("modelName");
			
			theControl.setModel(null, modelName);
			
			this.context._log.debug(this._actionNameShort + "Model '" + modelName + "' (scope: '" + this.getParameter("scope") + "') unloaded.");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AMWorker
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.AMWorker");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMWorker");

	var AMWorkerProto = ui5strap.AMWorker.prototype;

	/*
	* @Override
	*/
	AMWorkerProto.namespace = 'worker';

	/*
	* @Override
	*/
	AMWorkerProto.parameters = {
		"workerName" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
	*/
	AMWorkerProto.run = function(){
		var workerUrl = jQuery.sap.getModulePath(this.getParameter("workerName")) + '.worker.js',
			worker = new Worker(workerUrl),
			app = this.context.app,
			controller = this.context.controller;

		worker.addEventListener('message', function(e) {
			
			if(!(typeof(e.data) === 'object') || !("type" in e.data)){
				throw new Error('Invalid worker message: ' + JSON.stringify(e.data));
			}
			
			var messageType = e.data.type;
			if('ACTION' === messageType){

				var actionParameters = {
					"parameters" : e.data.message, 
					"app" : app,
					"controller" : controller  
				};
				
				ui5strap.Action.run(actionParameters);
			}

		}, false);

		worker.postMessage('START');
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ActionController
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

	jQuery.sap.require("ui5strap.library");
	
	var controllerImpl = {};

	ui5strap.controller("ui5strap.ActionController", controllerImpl);

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Alert
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

	jQuery.sap.declare("ui5strap.Alert");
	jQuery.sap.require("ui5strap.library");
  jQuery.sap.require("ui5strap.Button");
  jQuery.sap.require("ui5strap.Icon");
	
	sap.ui.core.Control.extend("ui5strap.Alert", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}, 
        animate : {
          type:"boolean", 
          defaultValue:true
        }, 
        visible : {
          type:"boolean", 
          defaultValue:true
        },
        closable : {
          type : "boolean",
          defaultValue : false
        },
        contentPlacement : {
          type:"ui5strap.ContentPlacement",
          defaultValue : ui5strap.ContentPlacement.Start
        },
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.Info
				}
			},
			aggregations : { 
        closeButton : {
          type : "ui5strap.Button",
          multiple : false
        },
				content : {
					singularName: "content"
				} 
			},
      events : {
        closed : {

        }
      }

		}
	});

  var AlertProto = ui5strap.Alert.prototype;

  ui5strap.Utils.dynamicText(AlertProto);

  AlertProto.init = function(){
  
  }

  var _setCloseButton = AlertProto.setCloseButton;

  AlertProto.setCloseButton = function(closeButton, suppressInvalidate){
      var _this = this;
      if(null !== closeButton){
        closeButton.attachEvent('tap', {}, function(oEvent){
          _this.close();
        });
      }

      _setCloseButton.call(this, closeButton, suppressInvalidate);
  };

  AlertProto.onBeforeRendering = function(){
      if(this.getClosable() && this.getCloseButton() === null){
          this.setCloseButton(new ui5strap.Button({ type : ui5strap.ButtonType.Close, content : [ new ui5strap.Icon({ icon : "times", iconSet : "fa" }) ] }));
      }
  };

  AlertProto.onAfterRendering = function(){
        if(this.getVisible()){
              this.$().addClass('in');
        }
  };

  AlertProto.setVisible = function(visible){
      if(this.getDomRef()){
          if(visible){
              this.$().addClass('in');
          }
          else{
              this.$().removeClass('in');
          }
          this.setProperty('visible', visible, true);
      }
      else{
         this.setProperty('visible', visible);
      }
  };

  AlertProto.close = function(){
    var $alert = this.$(),
      _this = this;
    $alert.removeClass('in')

    function removeElement() {
      _this.fireClosed({});
      _this.destroy();
    }

    $.support.transition && $alert.hasClass('fade') ?
      $alert
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  };

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AlertRenderer
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

	jQuery.sap.declare("ui5strap.AlertRenderer");

	ui5strap.AlertRenderer = {};

	ui5strap.AlertRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("alert alert-" + ui5strap.BSSeverity[oControl.getSeverity()] + (oControl.getAnimate() ? " fade" : ''));
		rm.writeClasses();
		rm.write(">");

		var closeButton = oControl.getCloseButton();
		if(null !== closeButton && oControl.getClosable()){
			rm.renderControl(closeButton);
		}
		
		ui5strap.RenderUtils.renderContent(rm, oControl);

		rm.write("</div>");

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.AppConsole
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuerySap.declare("ui5strap.AppConsole");

	jQuerySap.require("ui5strap.library");
	
	jQuerySap.require("ui5strap.AppBase");
	
	jQuerySap.require("ui5strap.Console");
	
	ui5strap.AppBase.extend("ui5strap.AppConsole");

	var AppConsole = ui5strap.AppConsole, 
		AppConsoleProto = AppConsole.prototype;

	/*
	* ------------------------------------------------
	* --------------------- FLOW ---------------------
	* ------------------------------------------------
	*/
	
	/*
	* Init app specific logging
	* @protected
	*/
	AppConsoleProto._initLog = function(){
		
		var _this = this;

		this.log = {

			debug : function (message) {
				_this.console && _this.console.debug(message, _this.getId());
				jQuery.sap.log.debug("[APPLOG] " + message);
			},

			warning : function (message) { 
				_this.console && _this.console.warning(message, _this.getId());
				jQuery.sap.log.warning("[APPLOG] " + message);
			},

			error : function (message) {
				_this.console && _this.console.error(message, _this.getId());
				jQuery.sap.log.error("[APPLOG] " + message);
			},

			info : function (message) {
				_this.console && _this.console.info(message, _this.getId());
				jQuery.sap.log.info("[APPLOG] " + message);
			},

			fatal : function (message) {
				_this.console && _this.console.fatal(message, _this.getId());
				jQuery.sap.log.fatal("[APPLOG] " + message);
			}

		};
	};

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/

	AppConsoleProto.getRootControl = function(){
		if(!this.console){
			this.console = new ui5strap.Console();
			this.console.setCurrentLog(this.getId());
			this.console.setLogLevel(this.config.data.app.logLevel);
		}
		return this.console;
	}; 

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	AppConsoleProto.includeStyle = function(callback){
		callback && callback();
	};

	AppConsoleProto.removeStyle = function(){

	};

	
}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.App
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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
	jQuerySap.declare("ui5strap.AppSandbox");

	jQuerySap.require("ui5strap.library");

	jQuerySap.require("ui5strap.AppBase");
	
	jQuerySap.require("ui5strap.Sandbox");

	ui5strap.AppBase.extend("ui5strap.AppSandbox");

	var AppSandbox = ui5strap.AppSandbox, 
		AppSandboxProto = AppSandbox.prototype;

	/*
	* -------------------------------------------------------------
	* --------------------- GETTERS & SETTERS ---------------------
	* -------------------------------------------------------------
	*/
	
	AppSandboxProto.getRootControl = function(){
		if(!this._sandboxControl){
			this._sandboxControl = new ui5strap.Sandbox();
		}
		return this._sandboxControl;
	}; 

	/*
	* ----------------------------------------------------------
	* --------------------- Event Handlers ---------------------
	* ----------------------------------------------------------
	*/

	/**
	* Triggered when an app message is sent to this app
	* @public
	*/
	AppSandboxProto.onMessage = function(oEvent){
		var appMessage = oEvent.getParameters();
		appMessage.toParent = false;
		this._sandboxControl.sendMessage(appMessage, '*');
	};

	AppSandboxProto.onFirstShow = function(){
		ui5strap.AppBase.prototype.onFirstShow.call(this);

		this._sandboxControl.setSrc(this.config.data.app.appURL);
	};

	/*
	* -------------------------------------------------
	* --------------------- STYLE ---------------------
	* -------------------------------------------------
	*/

	AppSandboxProto.includeStyle = function(callback){
		callback && callback();
	};

	AppSandboxProto.removeStyle = function(){};

}());;/*
 * 
 * Ui5OS
 * 
 * AppSystem
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://pksoftware.de
 *
 * ALL RIGHTS RESERVED
 * 
 */

 (function(){

	var jQuerySap = jQuery.sap;

	jQuerySap.require("ui5strap.App");
	
	jQuerySap.declare("ui5strap.AppSystem");

	ui5strap.App.extend("ui5strap.AppSystem", {
		"constructor" : function(config, viewer){
			ui5strap.App.call(this, config, viewer);

			this.getViewer = function(){
				return viewer;
			};
		}
	});
	var AppSystem = ui5strap.AppSystem, 
		AppSystemProto = AppSystem.prototype;

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Badge
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

	jQuery.sap.declare("ui5strap.Badge");
	
	sap.ui.core.Control.extend("ui5strap.Badge", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.BadgeRenderer
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

	jQuery.sap.declare("ui5strap.BadgeRenderer");

	ui5strap.BadgeRenderer = {};

	ui5strap.BadgeRenderer.render = function(rm, oControl) {
		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("badge");
		rm.writeClasses();
		rm.write(">");
		
		rm.writeEscaped(oControl.getText());
		
		rm.write("</span>");

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Bar
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

	jQuery.sap.declare("ui5strap.Bar");

	sap.ui.core.Control.extend("ui5strap.Bar", {
		metadata : {
			interfaces : ["ui5strap.IBar"],
			
			// ---- object ----
			"defaultAggregation" : "middle",

			// ---- control specific ----
			"library" : "ui5strap",
			
			"properties" : { 
				"inverse" : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			"aggregations" : { 
				"left" : {
					"singularName" : "left"
				},
				"middle" : {
					"singularName" : "middle"
				}, 
				"right" : {
					"singularName" : "right"
				}  
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.BarRenderer
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

	jQuery.sap.declare("ui5strap.BarRenderer");

	var BarRenderer = {};

	ui5strap.BarRenderer = BarRenderer;

	BarRenderer.render = function(rm, oControl) {
		var inverse = oControl.getInverse(),
		 	contentLeft = oControl.getLeft(),
		 	contentMiddle = oControl.getMiddle(),
			contentRight = oControl.getRight();
		

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('bar ' + (inverse ? 'bar-inverse' : 'bar-default'));
		rm.writeClasses();
		rm.write(">");

			rm.write("<div");
			rm.addClass('bar-inner');
			rm.writeClasses();
			rm.write(">");
			   
			//Content left
			if(contentLeft.length > 0){     
				rm.write("<div");
				rm.addClass("bar-content bar-content-left");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentLeft.length; i++){ 
					rm.renderControl(contentLeft[i]);
				}
				rm.write("</div>");
			}
	
			//Content middle
			if(contentMiddle.length > 0){     
				rm.write("<div");
				rm.addClass("bar-content bar-content-middle");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentMiddle.length; i++){ 
					rm.renderControl(contentMiddle[i]);
				}
				rm.write("</div>");
			}
			   
			//Content right
			if(contentRight.length > 0){     
				rm.write("<div");
				rm.addClass("bar-content bar-content-right");
				rm.writeClasses();
				rm.write(">");
				for(var i = 0; i < contentRight.length; i++){ 
					rm.renderControl(contentRight[i]);
				}
				rm.write("</div>");
			}   
			    
			rm.write("</div>");    
		rm.write("</div>");
	};
}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Breadcrumb
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

	jQuery.sap.declare("ui5strap.Breadcrumb");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.Breadcrumb", {
		metadata : {

			library : "ui5strap"
			
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.BreadcrumbRenderer
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

jQuery.sap.declare("ui5strap.BreadcrumbRenderer");

ui5strap.BreadcrumbRenderer = {
};

ui5strap.BreadcrumbRenderer.render = function(rm, oControl) {
	var items = oControl.getItems();

	rm.write("<ol");
	rm.writeControlData(oControl);
	rm.addClass('breadcrumb');
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ol>");
};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Break
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

	jQuery.sap.declare("ui5strap.Break");
	
	sap.ui.core.Control.extend("ui5strap.Break", {
		metadata : {

			library : "ui5strap",
			
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.BreakRenderer
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

	jQuery.sap.declare("ui5strap.BreakRenderer");

	ui5strap.BreakRenderer = {};

	ui5strap.BreakRenderer.render = function(rm, oControl) {
		rm.write("<br />");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonDropdown
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

	jQuery.sap.declare("ui5strap.ButtonDropdown");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.Button");
	
	ui5strap.Button.extend("ui5strap.ButtonDropdown", {
		metadata : {

			// ---- object ----
			defaultAggregation : "menu",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				dropup : {
					type:"boolean", 
					defaultValue:false
				},
				split : {
					type:"boolean", 
					defaultValue:false
				}
			},
					
			aggregations : { 
				menu : {
					type : "ui5strap.ListDropdownMenu",
					multiple : false
				} 
			}

		}
	});

	var ButtonDropdownProto = ui5strap.ButtonDropdown.prototype;

	ButtonDropdownProto.setText = function(newText){
		if(this.getMenu() === null){
			if(this.getDomRef() && this.getContent().length === 0){
              jQuery('#' + this.getId() + '---' + (this.getSplit() ? 'button' : 'toggle')).text(newText);
              this.setProperty('text', newText, true);
          	}
	          else{
	              this.setProperty('text', newText);
	          }
		}
		else{
			this.setProperty('text', newText);
		}
	};

	ButtonDropdownProto.setSelected = function(newValue){ 
        ui5strap.Utils.updateClass(this, jQuery('#' + this.getId() + '---' + (this.getSplit() ? 'button' : 'toggle')), "selected", newValue, { 'true' : 'active' });
    };
/*
	ButtonDropdownProto.onAfterRendering = function(){
		this.$().dropdown();
	};	
*/
	
	ButtonDropdownProto.open = function(){
		this.$().addClass('open');
	};
	
	ButtonDropdownProto.close = function(){
		this.$().removeClass('open');
	};

	ButtonDropdownProto.toggle = function(){
		this.$().toggleClass('open');
	};
	
	if(ui5strap.options.enableTapEvents){
		ButtonDropdownProto.ontap = function(oEvent){
			var $target = jQuery(oEvent.target);
			if(!this.getSplit() || $target.hasClass('dropdown-toggle') || $target.hasClass('caret')){
				this.$().toggleClass('open');
			}
			else{
				this.fireTap();
			}
		};
	}

	if(ui5strap.options.enableClickEvents){
		ButtonDropdownProto.onclick = function(oEvent){
			var $target = jQuery(oEvent.target);
			if(!this.getSplit() || $target.hasClass('dropdown-toggle') || $target.hasClass('caret')){
				this.$().toggleClass('open'); 
			}
			else{
				this.fireClick();
			}
		};
	}

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonDropdownRenderer
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

	jQuery.sap.declare("ui5strap.ButtonDropdownRenderer");
	jQuery.sap.require("ui5strap.ButtonRenderer");

	ui5strap.ButtonDropdownRenderer = {
	};

	ui5strap.ButtonDropdownRenderer.render = function(rm, oControl) {
		var menu = oControl.getMenu(),
			split = oControl.getSplit(),
			buttonRenderer = ui5strap.ButtonRenderer;

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("btn-group");
		if(oControl.getDropup()){
			rm.addClass('dropup');
		}
		rm.writeClasses();
		rm.write(">");

		buttonRenderer.startRender(rm, oControl, { toggleDropdown : !split });

	    this.renderContent(rm, oControl);

	    buttonRenderer.endRender(rm, oControl);

	    if(split){
		    buttonRenderer.startRender(rm, oControl, { toggleDropdown : true });

		    rm.write(' <span class="caret"></span>');

		    buttonRenderer.endRender(rm, oControl);
		}

	    if(null !== menu){
			rm.renderControl(menu);
		}
		
		rm.write("</div>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

	ui5strap.ButtonDropdownRenderer.renderContent = function(rm, oControl) {
		ui5strap.ButtonRenderer.renderContent(rm, oControl);
		if(!oControl.getSplit()){
			rm.write(' <span class="caret"></span>');
		}
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonGroup
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

	jQuery.sap.declare("ui5strap.ButtonGroup");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.ButtonGroup", {
		metadata : {

			defaultAggregation : "buttons",
				
			library : "ui5strap",

			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				},
				type : {
					type: "ui5strap.ButtonGroupType", 
					defaultValue: ui5strap.ButtonGroupType.Default
				},
				selectionMode : {
					type : "ui5strap.SelectionMode",
					defaultValue : ui5strap.SelectionMode.None
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
					
			aggregations : { 
				buttons : {
					singularName: "buttons"
				} 
			},

			events:{
		        click : {},
		        tap : {},
		        select : {}
		    }
		}
	});

	var ButtonGroupProto = ui5strap.ButtonGroup.prototype;

	ButtonGroupProto.setSelectedIndex = function(itemIndex){

		var items = this.getButtons();
		if(itemIndex < 0 || itemIndex >= items.length){
			return false;
		}
		this.setSelectedControl(items[itemIndex]);

	};

	ButtonGroupProto.getSelectedIndex = function(){
		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return i;
			}
		}
		return -1;
	};

	ButtonGroupProto.setSelectedControl = function(item, nestedList){

		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			if(items[i] === item){
				if(!item.getSelected()){
					item.setSelected(true);
					this.fireSelect({ "selectionSource" : nestedList ? nestedList : this });
				}
			}
			else{
				items[i].setSelected(false);
			}
		}
		
	};

	ButtonGroupProto.getSelectedControl = function(){
		var items = this.getButtons();
		for(var i = 0; i < items.length; i++){
			if(items[i].getSelected()){
				return items[i];
			}
		}
		return null;
	};

	var _processSelection = function(_this, oEvent){
		var srcControl = oEvent.srcControl,
			selectionMode = _this.getSelectionMode(),
			eventOptions = {
				button : srcControl
			};

		if(!(srcControl instanceof ui5strap.Button)){
			var parentControl = srcControl.getParent();
			if(parentControl instanceof ui5strap.Button){
				eventOptions.button = parentControl;
			}
		}

		if(selectionMode === ui5strap.SelectionMode.Single){
			_this.setSelectedControl(eventOptions.button);
		}

		return eventOptions;
	};

	if(ui5strap.options.enableTapEvents){
		ButtonGroupProto.ontap = function(oEvent){
			this.fireTap(_processSelection(this, oEvent));
		};
	}

	if(ui5strap.options.enableClickEvents){
		ButtonGroupProto.onclick = function(oEvent){
			this.fireClick(_processSelection(this, oEvent));
		};
	}

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonGroupRenderer
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

jQuery.sap.declare("ui5strap.ButtonGroupRenderer");

ui5strap.ButtonGroupRenderer = {
	typeToClass : {
		Default : "btn-group",
		Justified : "btn-group btn-group-justified",
		Vertical : "btn-group-vertical"
	}
};

ui5strap.ButtonGroupRenderer.render = function(rm, oControl) {
	var size = oControl.getSize(),
		type = oControl.getType(),
		buttons = oControl.getButtons();

	rm.write("<div");
	rm.writeControlData(oControl);

	rm.addClass(this.typeToClass[type]);
	
	if(ui5strap.Size.Default !== size){
		rm.addClass('btn-group-' + ui5strap.BSSize[size]);
	}

	ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-btn');

	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < buttons.length; i++){
		var button = buttons[i];
		if(type === ui5strap.ButtonGroupType.Justified && button instanceof ui5strap.Button){
			rm.write('<div class="btn-group">');
			rm.renderControl(button);
			rm.write("</div>");
		}
		else{
			rm.renderControl(button);
		}
	}
	
	rm.write("</div>");

};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonToolbar
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

	jQuery.sap.declare("ui5strap.ButtonToolbar");
	
	sap.ui.core.Control.extend("ui5strap.ButtonToolbar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "buttonGroups",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
					
			aggregations : { 
				"buttonGroups" : {
					type : "ui5strap.ButtonGroup",
					singularName: "buttonGroups"
				} 
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ButtonToolbarRenderer
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

jQuery.sap.declare("ui5strap.ButtonToolbarRenderer");

ui5strap.ButtonToolbarRenderer = {
};

ui5strap.ButtonToolbarRenderer.render = function(rm, oControl) {
	var buttons = oControl.getButtonGroups();

	rm.write("<div");
	rm.writeControlData(oControl);

	rm.addClass('btn-toolbar');
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < buttons.length; i++){
		rm.renderControl(buttons[i]);
	}
	
	rm.write("</div>");
};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Carousel
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

	jQuery.sap.declare("ui5strap.Carousel");
  jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Carousel", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				index : {
					type:"int", defaultValue : 0
				},
        swipe : {
          type:"boolean", defaultValue : true
        },
				controls : {
					type:"boolean", defaultValue : true
				},
				pagination : {
					type:"boolean", defaultValue : true
				},
        innerAlign : {
          type:"ui5strap.Alignment",
          defaultValue : ui5strap.Alignment.CenterBlock
        },
        innerOverflow : {
            type:"ui5strap.Visibility",
            defaultValue : ui5strap.Visibility.Visible
        },
        label : {
          type:"string", defaultValue : ""
        },
        columnsExtraSmall : {
          type:"int", defaultValue:-1
        },
        columnsSmall : {
          type:"int", defaultValue:-1
        },
        columnsMedium : {
          type:"int", defaultValue:-1
        },
        columnsLarge : {
          type:"int", defaultValue:-1
        },
        speed : {
          type:"float", defaultValue : 0.5
        },
        cycle : {
          type:"boolean",
          defaultValue : false
        },
        interval : {
          type:"int", defaultValue : 0
        }
			},
			aggregations : {

				"items" : {},
        "content" : {}

			},
			events : {
				"change" : {},
        "changed" : {}
			}

		}
	});

  var CarouselProto = ui5strap.Carousel.prototype;

  var _setInterval = function(_this, newInterval){
      if(_this.timer){
            window.clearInterval(_this.timer);
       }

       if(!newInterval){
          return;
       }

       this.timer = window.setInterval(function(){
          _this.nextPage(newIndex);
       }, newInterval);
  };

  var _findPart = function(_this, partId, index){
      var idString = '#' + _this.getId()+ '--carousel-' + partId;
      if(index >= 0){
        idString += '-' + index;
      }
      return _this.$().find(idString);
  };

  CarouselProto.init = function(){
		this.items = [];

    if(!ui5strap.support.transitionEndEvent){
      throw new Error('ui5strap.Carousel requires "transitionEndEvent" support.');
    }
	};

  CarouselProto._cssClasses = function(){
      var cssClasses = "carousel carousel-advanced",
      newIndex = this.getIndex(),
      columsMedium = this.getColumnsMedium(),
      columsLarge = this.getColumnsLarge(),
      columsSmall = this.getColumnsSmall(),
      columsExtraSmall = this.getColumnsExtraSmall();

      cssClasses += this.getCycle() ? " carousel-cycle" : " carousel-ends";
      
    if(0 < columsMedium){
      cssClasses += " carousel-md-" + columsMedium;
    }
    if(0 < columsLarge){
      cssClasses += " carousel-lg-" + columsLarge;
    }
    if(0 < columsSmall){
      cssClasses += " carousel-sm-" + columsSmall;
    }
    if(0 < columsExtraSmall){
      cssClasses += " carousel-xs-" + columsExtraSmall;
    }

    cssClasses += " carousel-overflow-" + ui5strap.BSVisibility[this.getInnerOverflow()];
    cssClasses += " carousel-align-" + ui5strap.BSAlignment[this.getInnerAlign()];
       cssClasses += " carousel-current-" + newIndex;
      if(newIndex === 0){
        cssClasses += " carousel-current-first";
      }
      if(newIndex === this.items.length-1){
        cssClasses += " carousel-current-last";
      }

      return cssClasses;
  };

	CarouselProto.onAfterRendering = function(){
    var _this = this,
    itemsLength = this.getItems().length;

    //Store lane reference
		this.$lane = _findPart(this, 'lane');

    if(ui5strap.support.transitionEndEvent){
        this.$lane.on(ui5strap.support.transitionEndEvent, function(){
            _this.fireChanged({});
        });
    }

    this.pagination = [];
    this.items = [];

    for(var i = 0; i < itemsLength; i++){
          this.pagination.push(_findPart(this, 'indicator', i));
          this.items.push(_findPart(this, 'item', i));
    }

    this._refreshLabel();
    
    _setInterval(this, this.getInterval());
	};

  CarouselProto.setInterval = function(newInterval, noRefresh){
  
      if(!this.getDomRef()){ 
          this.setProperty('interval', newInterval, noRefresh);
      }
      else{
          _setInterval(this, newInterval);
          this.setProperty('interval', newInterval, true);
      }
  };


  CarouselProto.onswipeleft = function(){
      if(this.getSwipe()){ 
        this.nextPage();
      }
  };

  CarouselProto.onswiperight = function(){
      if(this.getSwipe()){ 
        this.previousPage();
      }
  };

  CarouselProto.ontap = function(e){
    var $target = jQuery(e.target);
    if(this.getControls()){
      if($target.hasClass('carousel-control-prev')){
        this.previousPage();
      }
      else if($target.hasClass('carousel-control-next')){
        this.nextPage();
      }
    }

    if(this.getPagination()){
      if($target.hasClass('carousel-indicator')){
        this.setIndex(parseInt($target.attr('data-slide-to')));
      }
    }
  };

  CarouselProto.setIndex = function(newIndex){
  
    if(!this.getDomRef()){ 
      sap.ui.core.Control.prototype.setProperty.call(this, 'index', newIndex);
    }
    else{

      if(newIndex < 0 || newIndex >= this.items.length){
        return false;
      }
      
      var oldIndex = this.getIndex();

      //Set the property
      this.setProperty('index', newIndex, true);

      //Refresh Pagination
      if(this.getPagination()){
          this.pagination[oldIndex].removeClass('active');
          this.pagination[newIndex].addClass('active');
      }
      
      //Refresh CSS Classes
      for(var i = 0; i < this.items.length; i++){
          var newClass = null;
          
          if(i === newIndex){
            newClass = 'carousel-item active carousel-pos-0';
          }
          else{
            newClass = 'carousel-item carousel-pos-' + (i - newIndex);
          }
          
          this.items[i].attr('class', newClass);
      }
      
      this._refreshLabel();
      
      var rootClasses = this._cssClasses();
      if(this.aCustomStyleClasses){
    	  rootClasses += ' ' + this.aCustomStyleClasses.join(' ');
      }
      
      //Refresh carousel class
      this.$().attr("class", rootClasses);
      
      //Move the lane
      this.$lane.css('left',  (-newIndex * 100) + '%');

      //Fire change event
      this.fireChange({ 
        oldIndex : oldIndex
      });
    }
  };

  /**
  * Refreshes the label
  */
  CarouselProto._refreshLabel = function(){
      var label = this.getLabel();
      if("" !== label){
        label = this.items.length > 0 ? label.replace("[index]", this.getIndex()).replace("[number]", this.getIndex() + 1).replace("[count]", this.items.length) : '';
        _findPart(this, 'label').html(label);
      }
  };

  /**
  * Change to next page
  */
  CarouselProto.nextPage = function(){
      var newIndex = this.getIndex()+1;
      if(this.getCycle() && newIndex >= this.items.length){
          newIndex = 0;
      }
      this.setIndex(newIndex);
  }; 

  /**
  * Change to previous page
  */
  CarouselProto.previousPage = function(){
      var newIndex = this.getIndex()-1;
      if(this.getCycle() && newIndex < 0){
          newIndex = this.items.length - 1;
      }
      this.setIndex(newIndex);
  };

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.CarouselRenderer
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

	jQuery.sap.declare("ui5strap.CarouselRenderer");

	ui5strap.CarouselRenderer = {
	};

	ui5strap.CarouselRenderer.render = function(rm, oControl) {
		var speed = oControl.getSpeed(),
			items = oControl.getItems(),
			itemsLength = items.length,
			carouselId = oControl.getId(),
			currentIndex = oControl.getIndex();
		 	
	 	rm.write("<div");
	    rm.writeControlData(oControl);
	    rm.addClass(oControl._cssClasses());
	    rm.writeClasses();
	    rm.write(">");

	    	rm.write("<div id='" + oControl.getId() + "--carousel-inner'");
		    rm.addClass("carousel-inner");
		    rm.writeClasses();
		    rm.write(">");

			    rm.write("<div id='" + oControl.getId() + "--carousel-lane'");
			    rm.addClass("carousel-lane");
			    rm.writeAttribute('style', 'width:' + (itemsLength * 100) + '%; left: ' + (-currentIndex * 100)+ '%; -webkit-transition: left ' + speed + 's; -moz-transition: left ' + speed + 's; -o-transition: left ' + speed + 's; transition: left ' + speed + 's;');
			    rm.writeClasses();
			    rm.write(">");

			    var itemWidth = 100 / itemsLength;
			    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<div id='" + oControl.getId() + "--carousel-item-" + i + "'");
					    rm.addClass("carousel-item");
					    
					    if(i === currentIndex){
							rm.addClass("active");
						}
						rm.addClass("carousel-pos-" + (i - currentIndex));
						rm.writeAttribute('style', 'left:' + (i * itemWidth) + '%; width: ' + itemWidth + '%');
						rm.writeClasses();
					    rm.write(">");
					    rm.renderControl(items[i]);
					    
					    rm.write("</div>");
			    }
			    
				rm.write("</div>");

			rm.write("</div>"); //End carousel-inner
		    
		    if(oControl.getInnerOverflow() === ui5strap.Visibility.Covered){
			    rm.write("<div id='" + oControl.getId() + "--carousel-cover-prev'");
			    rm.addClass("carousel-cover carousel-cover-prev");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");

			    rm.write("<div id='" + oControl.getId() + "--carousel-cover-next'");
			    rm.addClass("carousel-cover carousel-cover-next");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");
			}

			if(oControl.getControls()){ 
		    	    rm.write("<a");
				    rm.addClass("left carousel-control carousel-control-prev");
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-left carousel-control-prev"></span>');
				    rm.write("</a>");
			}

			if("" !== oControl.getLabel()){ 
			    rm.write("<div id='" + oControl.getId() + "--carousel-label'");
			    rm.addClass("carousel-label");
			    rm.writeClasses();
			    rm.write(">");
			    rm.write("</div>");
			}

			if(oControl.getControls()){
				    rm.write("<a");
				    rm.addClass("right carousel-control carousel-control-next");
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-right carousel-control-next"></span>');
				    rm.write("</a>");
			}
				
			if(oControl.getPagination()){ 
				    rm.write("<ol id='" + oControl.getId() + "--carousel-indicators'");
				    rm.addClass("carousel-indicators");
				    rm.writeClasses();
				    rm.write(">");
				    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<li id='" + oControl.getId() + "--carousel-indicator-" + i + "'");
			    		rm.addClass("carousel-indicator");
			    		if(i === currentIndex){
					    	rm.addClass("active");
						}
						rm.writeAttribute('data-slide-to', i);
						rm.writeClasses();
					    rm.write(">");
						rm.write("</li>");
					}
				    rm.write("</ol>");
			}

		var content = oControl.getContent(),
			contentLength = content.length;
		for(var i = 0; i < contentLength; i++){
			rm.renderControl(content[i]);
		}
		rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Checkbox
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

	jQuery.sap.declare("ui5strap.Checkbox");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Checkbox", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				type : {
					type:"ui5strap.CheckboxType", 
					defaultValue:ui5strap.CheckboxType.Block
				},
				value : {
					type:"string", 
					defaultValue:""
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				selected : {
					type : "boolean",
					defaultValue : false
				}
			}

		}
	});

	var _onChange = function(_this){
		return function(ev){
			var inputValue = _this.$checkbox.prop('checked');
			if(inputValue !== _this.getSelected()){ 
				_this.setProperty("selected", inputValue, true);
			}
		}
	};

	ui5strap.Checkbox.prototype.onAfterRendering = function(){
		this.$checkbox = this.$().find('#' + this.getId() + '---checkbox');
		this.$checkbox.on('change', _onChange(this));
	};

	ui5strap.Checkbox.prototype.onBeforeRendering = function() {
		if (this.getDomRef()) {
			this.$checkbox.off();
			//this._curpos = this._$input.cursorPos();
		}
	};

	ui5strap.Checkbox.prototype.setSelected = function(sValue) {
		sValue = this.validateProperty("selected", sValue);
		
		if (sValue != this.getSelected()) {
			this.setProperty("selected", sValue, true);
			if (this.getDomRef() && this.$checkbox.prop('checked') != sValue) {
				this.$checkbox.prop('checked', sValue);
			}
		}
		return this;
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.CheckboxRenderer
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

	jQuery.sap.declare("ui5strap.CheckboxRenderer");

	ui5strap.CheckboxRenderer = {};

	ui5strap.CheckboxRenderer.render = function(rm, oControl) {
		var type = oControl.getType(),
			typeBlock = ui5strap.CheckboxType.Block;

		if(type === typeBlock){
			rm.write("<div");
			rm.writeControlData(oControl);
			rm.addClass('checkbox');
			rm.writeClasses();
			rm.write(">");
		}
		

			rm.write("<label");
			if(type === ui5strap.CheckboxType.Inline){
				rm.writeControlData(oControl);
				rm.addClass('checkbox-inline');
			}
			rm.writeClasses();
			rm.write(">");

				rm.write('<input')
				if(type === ui5strap.CheckboxType.Default){
					rm.writeControlData(oControl);
				}
				else{
					rm.writeAttribute('id', oControl.getId() + '---checkbox');
				}
				rm.writeAttribute('type', 'checkbox');
				rm.writeAttribute('value', oControl.getValue());
				rm.writeClasses();
				if(oControl.getSelected()){
					rm.writeAttribute('checked', 'checked');
				}
				rm.write('/>');
				
					rm.writeEscaped(oControl.getLabel());

			rm.write("</label>");

		if(type === typeBlock){
			rm.write("</div>");
		}
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Clearfix
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

	jQuery.sap.declare("ui5strap.Clearfix");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.Control.extend("ui5strap.Clearfix", {
		metadata : {
			interfaces : ["ui5strap.IColumn"],
			library : "ui5strap",
			
			properties : { 
				visibilityExtraSmall : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilitySmall : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilityMedium : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				},
				visibilityLarge : {
					type : "ui5strap.Visibility", 
					defaultValue : ui5strap.Visibility.Default
				}
				
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ClearfixRenderer
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

	jQuery.sap.declare("ui5strap.ClearfixRenderer");

	ui5strap.ClearfixRenderer = {};

	ui5strap.ClearfixRenderer.render = function(rm, oControl) {
		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('clearfix');
		
		var visibilityMedium = oControl.getVisibilityMedium(),
			visibilityLarge = oControl.getVisibilityLarge(),
			visibilitySmall = oControl.getVisibilitySmall(),
			visibilityExtraSmall = oControl.getVisibilityExtraSmall(),
			defaultVisibility = ui5strap.Visibility.Default,
			visible = ui5strap.Visibility.Visible,
			hidden = ui5strap.Visibility.Hidden;


		if(defaultVisibility !== visibilityMedium){
			if(visibilityMedium === visible){
				rm.addClass('visible-md');
			}
			if(visibilityMedium === hidden){
				rm.addClass('hidden-md');
			}
		}
		if(defaultVisibility !== visibilityLarge){
			if(visibilityLarge === visible){
				rm.addClass('visible-lg');
			}
			if(visibilityLarge === hidden){
				rm.addClass('hidden-lg');
			}
		}
		if(defaultVisibility !== visibilitySmall){
			if(visibilitySmall === visible){
				rm.addClass('visible-sm');
			}
			if(visibilitySmall === hidden){
				rm.addClass('hidden-sm');
			}
		}
		if(defaultVisibility !== visibilityExtraSmall){
			if(visibilityExtraSmall === visible){
				rm.addClass('visible-xs');
			}
			if(visibilityExtraSmall === hidden){
				rm.addClass('hidden-xs');
			}
		}

		rm.writeClasses();
		rm.write(">");
		
		rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Col
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

	jQuery.sap.declare("ui5strap.Col");
	jQuery.sap.require("ui5strap.library");

	ui5strap.Control.extend("ui5strap.Col", {
		metadata : {
			interfaces : ["ui5strap.IColumn"],
			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				columnsExtraSmall : {
					type:"int", defaultValue:-1
				},
				columnsSmall : {
					type:"int", defaultValue:-1
				},
				columnsMedium : {
					type:"int", defaultValue:-1
				},
				columnsLarge : {
					type:"int", defaultValue:-1
				},
				offsetExtraSmall : {
					type:"int", defaultValue:-1
				},
				offsetSmall : {
					type:"int", defaultValue:-1
				},
				offsetMedium : {
					type:"int", defaultValue:-1
				},
				offsetLarge : {
					type:"int", defaultValue:-1
				},
				pullExtraSmall : {
					type:"int", defaultValue:-1
				},
				pullSmall : {
					type:"int", defaultValue:-1
				},
				pullMedium : {
					type:"int", defaultValue:-1
				},
				pullLarge : {
					type:"int", defaultValue:-1
				},
				pushExtraSmall : {
					type:"int", defaultValue:-1
				},
				pushSmall : {
					type:"int", defaultValue:-1
				},
				pushMedium : {
					type:"int", defaultValue:-1
				},
				pushLarge : {
					type:"int", defaultValue:-1
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ColRenderer
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

	jQuery.sap.declare("ui5strap.ColRenderer");

	ui5strap.ColRenderer = {};

	ui5strap.ColRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");
		rm.writeControlData(oControl);
		var columsMedium = oControl.getColumnsMedium(),
			columsLarge = oControl.getColumnsLarge(),
			columsSmall = oControl.getColumnsSmall(),
			columsExtraSmall = oControl.getColumnsExtraSmall();

		if(0 < columsMedium){
			rm.addClass("col-md-" + columsMedium);
		}
		if(0 < columsLarge){
			rm.addClass("col-lg-" + columsLarge);
		}
		if(0 < columsSmall){
			rm.addClass("col-sm-" + columsSmall);
		}
		if(0 < columsExtraSmall){
			rm.addClass("col-xs-" + columsExtraSmall);
		}

		var offsetMedium = oControl.getOffsetMedium(),
			offsetLarge = oControl.getOffsetLarge(),
			offsetSmall = oControl.getOffsetSmall(),
			offsetExtraSmall = oControl.getOffsetExtraSmall();

		if(0 < offsetMedium){
			rm.addClass("col-md-offset-" + offsetMedium);
		}
		if(0 < offsetLarge){
			rm.addClass("col-lg-offset-" + offsetLarge);
		}
		if(0 < offsetSmall){
			rm.addClass("col-sm-offset-" + offsetSmall);
		}
		if(0 < offsetExtraSmall){
			rm.addClass("col-xs-offset-" + offsetExtraSmall);
		}

		var pullMedium = oControl.getPullMedium(),
			pullLarge = oControl.getPullLarge(),
			pullSmall = oControl.getPullSmall(),
			pullExtraSmall = oControl.getPullExtraSmall();

		if(0 < pullMedium){
			rm.addClass("col-md-pull-" + pullMedium);
		}
		if(0 < pullLarge){
			rm.addClass("col-lg-pull-" + pullLarge);
		}
		if(0 < pullSmall){
			rm.addClass("col-sm-pull-" + pullSmall);
		}
		if(0 < pullExtraSmall){
			rm.addClass("col-xs-pull-" + pullExtraSmall);
		}

		var pushMedium = oControl.getPushMedium(),
			pushLarge = oControl.getPushLarge(),
			pushSmall = oControl.getPushSmall(),
			pushExtraSmall = oControl.getPushExtraSmall();

		if(0 < pushMedium){
			rm.addClass("col-md-push-" + pushMedium);
		}
		if(0 < pushLarge){
			rm.addClass("col-lg-push-" + pushLarge);
		}
		if(0 < pushSmall){
			rm.addClass("col-sm-push-" + pushSmall);
		}
		if(0 < pushExtraSmall){
			rm.addClass("col-xs-push-" + pushExtraSmall);
		}

		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
				rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};


}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Container
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

	jQuery.sap.declare("ui5strap.Container");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Container", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
					type : {
						type:"ui5strap.ContainerType", 
						defaultValue: ui5strap.ContainerType.Default
					},
					severity : {
						type: "ui5strap.Severity", 
						defaultValue: ui5strap.Severity.None
					},
					align : {
						type : "ui5strap.Alignment",
						defaultValue : ui5strap.Alignment.Default
					},
					visibility : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityExtraSmall : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilitySmall : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityMedium : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					visibilityLarge : {
						type : "ui5strap.Visibility",
						defaultValue : ui5strap.Visibility.Default
					},
					invisible : {
						type : "boolean",
						defaultValue : false
					},
					html : {
						type : "string",
						defaultValue : ""
					}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});


}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ContainerRenderer
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

	jQuery.sap.declare("ui5strap.ContainerRenderer");

	ui5strap.ContainerRenderer = {
		typeToTag : {
			Default : {
				tagName : "div",
				className : null
			},
			Page : {
				tagName : "div",
				className : "container"
			},
			Fluid : {
				tagName : "div",
				className : "container-fluid"
			},
			FluidInset : {
				tagName : "div",
				className : "container-fluid container-inset"
			},
			Section : {
				tagName : "section",
				className : null
			},
			Paragraph : {
				tagName : "div",
				className : "container-paragraph"
			},
			Floating : {
				tagName : "div",
				className : "container-floating"
			},
			Phrasing : {
				tagName : "span",
				className : "container-phrasing"
			}
		}
	};

	/*
	Show : "show",
			Hidden : "hidden",
			Invisible : "invisible",
			
			*/

	ui5strap.ContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity(),
			tagData = this.typeToTag[oControl.getType()],
			html = oControl.getHtml();

		rm.write("<" + tagData.tagName);
		rm.writeControlData(oControl);
		
		rm.addClass(tagData.className);

		if(ui5strap.Severity.None !== severity){
			rm.addClass("bg-" + ui5strap.BSSeverity[severity]);
		}

		ui5strap.RenderUtils.visibility(rm, oControl);

		ui5strap.RenderUtils.alignment(rm, oControl);

		rm.writeClasses();
		rm.write(">");

		if('' !== html){
			rm.write(html);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</" + tagData.tagName + ">");
	};


}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Form
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

	jQuery.sap.declare("ui5strap.Form");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Form", {
		metadata : {

			defaultAggregation : "content",
			
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.FormType", 
					defaultValue:ui5strap.FormType.Default
				},
				action : {
					type:"string", 
					defaultValue:""
				},
				method : {
					type:"ui5strap.FormMethod", 
					defaultValue:ui5strap.FormMethod.None
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			},
			events : {
				submit : {

				}
			}

		}
	});

	ui5strap.Form.prototype.onAfterRendering = function(){
		var _this = this;
		this.$().on('submit', function(){
			_this.fireSubmit({});
			if(_this.getMethod() === ui5strap.FormMethod.None){
				return false;
			}
		});
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.FormGroup
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

	jQuery.sap.declare("ui5strap.FormGroup");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.FormGroup", {
		metadata : {

			defaultAggregation : "controls",
			
			library : "ui5strap",

			properties : { 
				severity : {
					type:"ui5strap.FormSeverity", 
					defaultValue:ui5strap.FormSeverity.None
				},
				label : {
					type:"string", 
					defaultValue:""
				},
				feedback : {
					type:"boolean",
					defaultValue : false
				},
				labelExtraSmall : {
					type:"int", defaultValue:0
				},
				labelSmall : {
					type:"int", defaultValue:0
				},
				labelMedium : {
					type:"int", defaultValue:0
				},
				labelLarge : {
					type:"int", defaultValue:0
				}
			},
			aggregations : { 
				controls : {
					multiple : true,
					singularName : "control"
				}
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.FormGroupRenderer
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

	jQuery.sap.declare("ui5strap.FormGroupRenderer");

	ui5strap.FormGroupRenderer = {

		severityToClass : {
			Success : "success",
			Warning : "warning",
			Error : "error"
		}
	};

	ui5strap.FormGroupRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			hasFeedback = oControl.getFeedback(),
			label = oControl.getLabel(),
			formControls = oControl.getControls();

			if(formControls.length === 0){
				throw new Error('You need to define at least one formControl.');
			}

		rm.write("<div");
		
		rm.writeControlData(oControl);

		rm.addClass('form-group');
		
		if(ui5strap.FormSeverity.None !== severity){
			rm.addClass('has-' + this.severityToClass[severity]);
		}
		
		if(hasFeedback){
			rm.addClass('has-feedback');
		}

		rm.writeClasses();
		rm.write(">");
		
		if('' !== label){
			rm.write("<label");
			rm.addClass("control-label");
			rm.writeAttribute('for', formControls[0].getId());

			var columsMedium = oControl.getLabelMedium(),
					columsLarge = oControl.getLabelLarge(),
					columsSmall = oControl.getLabelSmall(),
					columsExtraSmall = oControl.getLabelExtraSmall();

				if(0 !== columsMedium){
					rm.addClass("col-md-" + columsMedium);
				}
				if(0 !== columsLarge){
					rm.addClass("col-lg-" + columsLarge);
				}
				if(0 !== columsSmall){
					rm.addClass("col-sm-" + columsSmall);
				}
				if(0 !== columsExtraSmall){
					rm.addClass("col-xs-" + columsExtraSmall);
				}
			

			rm.writeClasses();
			rm.write(">");
			rm.writeEscaped(label);
			rm.write("</label>");
		}

		for(var i = 0; i < formControls.length; i++){ 
			var formControl = formControls[i];
			rm.renderControl(formControl);
		}
		
		
		rm.write("</div> ");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.FormRenderer
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

	jQuery.sap.declare("ui5strap.FormRenderer");

	ui5strap.FormRenderer = {

		typeToClass : {
			"Horizontal" : 'form-horizontal',
			"Inline" : 'form-inline',
		}
	};

	ui5strap.FormRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			action = oControl.getAction(),
			method = oControl.getMethod(),
			type = oControl.getType();

		rm.write("<form");
		
		rm.writeControlData(oControl);
		rm.writeAttribute('role', 'form');
		if('' !== action){
			rm.writeAttribute('action', action);
		}
		if(ui5strap.FormMethod.Default !== method && ui5strap.FormMethod.None !== method){
			rm.writeAttribute('method', method);
		}
		if(ui5strap.FormType.Default !== type){
			rm.addClass(this.typeToClass[type]);
		}
		
		ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-form');

		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</form>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Heading
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

	jQuery.sap.declare("ui5strap.Heading");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Heading", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type: "string", 
					defaultValue: ""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				type : {
					type: "ui5strap.HeadingType", 
					defaultValue: ""
				},
				level : {
					type: "int", 
					defaultValue: 3
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

	ui5strap.Utils.dynamicText(ui5strap.Heading.prototype);

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.HeadingRenderer
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

	jQuery.sap.declare("ui5strap.HeadingRenderer");

	ui5strap.HeadingRenderer = {

		typeToClass : {
			"PageHeader" : 'page-header',
			'ListGroupItemHeading' : 'list-group-item-heading',
			'MediaHeading' : 'media-heading'
		}
	};

	ui5strap.HeadingRenderer.render = function(rm, oControl) {
		var level = oControl.getLevel(),
			type = oControl.getType(),
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}
			

		rm.write("<h" + level);
		rm.writeControlData(oControl);

		if(ui5strap.HeadingType.Default !== type){
			rm.addClass(this.typeToClass[type]);
		}
		
		rm.writeClasses();
		rm.write(">");
		    
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		    
		rm.write("</h" + level + ">");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.HtmlTag
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

	jQuery.sap.declare("ui5strap.HtmlTag");
	
	sap.ui.core.Control.extend("ui5strap.HtmlTag", {
		metadata : {

			library : "ui5strap",

			defaultAggregation : "content",
			
			properties : { 
				tagName : {
					type: "string",
					defaultValue: "div"
				},
				text : {
					type:"string", 
					defaultValue:""
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.Start
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.HtmlTagRenderer
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

	jQuery.sap.declare("ui5strap.HtmlTagRenderer");

	ui5strap.HtmlTagRenderer = {};

	ui5strap.HtmlTagRenderer.render = function(rm, oControl) {

		var content = oControl.getContent(),
			tagName = oControl.getTagName(),
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		rm.write("<" + tagName);
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);

		rm.write("</" + tagName + ">");

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Image
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

	jQuery.sap.declare("ui5strap.Image");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Image", {
		metadata : {

			library : "ui5strap",
			properties : { 
				src : {
					type:"string", 
					defaultValue:""
				},
				mpath : {
					type:"string", 
					defaultValue:""
				},
				ext : {
					type : "string",
					defaultValue : "jpg"
				},
				title : {
					type: "string", 
					defaultValue: ""
				},
				responsive : {
					type : "boolean",
					defaultValue : true
				},
				alt : {
					type:"string", 
					defaultValue:""
				},
				width: {
					type:"int",
					defaultValue:-1
				},
				height: {
					type:"int",
					defaultValue:-1
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.None
				},
				shape: {
					type:"ui5strap.ImageShape",
					defaultValue:ui5strap.ImageShape.Default
				}
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ImageRenderer
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

	jQuery.sap.declare("ui5strap.ImageRenderer");

	ui5strap.ImageRenderer = {
		shapeToClass : {
			Rounded : 'img-rounded',
			Circle : 'img-circle',
			Thumbnail : 'img-thumbnail'
		}
	};

	ui5strap.ImageRenderer.render = function(rm, oControl) {
		var src = oControl.getSrc(),
			mpath = oControl.getMpath(),
			mext = oControl.getExt(),

			width = oControl.getWidth(),
			height = oControl.getHeight(),
			shape = oControl.getShape(),
			title = oControl.getTitle();

		if(mpath){
			src = jQuery.sap.getModulePath(mpath, '.' + mext);
		}

		rm.write("<img");
		rm.writeControlData(oControl);
		if(oControl.getResponsive()){
			rm.addClass('img-responsive');
		}
		if(shape in this.shapeToClass){
			rm.addClass(this.shapeToClass[shape]);
		}
		rm.writeClasses();
		
		if('' !== src){
			rm.writeAttribute('src', src);
		}
		if('' !== title){
			rm.writeAttribute('title', title);
		}
		if(-1 !== width){
			rm.writeAttribute('width', width);
		}
		if(-1 !== height){
			rm.writeAttribute('height', height);
		}
		rm.writeAttribute('alt', oControl.getAlt());
		
		rm.write("/>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.InputGroup
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

	jQuery.sap.declare("ui5strap.InputGroup");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.Text");
	jQuery.sap.require("ui5strap.Button");
	jQuery.sap.require("ui5strap.TextInput");
	jQuery.sap.require("ui5strap.Checkbox");
	jQuery.sap.require("ui5strap.RadioButton");
	jQuery.sap.require("ui5strap.SelectBox");
	
	sap.ui.core.Control.extend("ui5strap.InputGroup", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				size : {
					type: "ui5strap.Size", 
					defaultValue: ui5strap.Size.Default
				}
			},
			aggregations : { 
				content : {
					
				} 
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.InputGroupRenderer
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

	jQuery.sap.declare("ui5strap.InputGroupRenderer");

	ui5strap.InputGroupRenderer = {
	};

	ui5strap.InputGroupRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			size = oControl.getSize();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('input-group');

		if(ui5strap.Size.Default !== size){
			rm.addClass('input-group-' + ui5strap.BSSize[size]);
		}
		rm.writeClasses();
		rm.write(">");

		var contentLength = content.length; 

		if(contentLength > 3){
			throw new Error('Not more than 3 controls allowed within an imput group!');
		}
		    
		for(var i = 0; i < contentLength; i++){ 
			var item = content[i],
				validAddonPosition = i === 0 || i === content.length - 1,
				addonClass = null;
			
			if(item instanceof ui5strap.TextInput || item instanceof ui5strap.SelectBox){

			}
			else if(validAddonPosition){
				if(item instanceof ui5strap.Button){
					addonClass = 'input-group-btn';
				}
				else if(item instanceof ui5strap.Text ||
						item instanceof ui5strap.Icon ||
						item instanceof ui5strap.Checkbox || 
						item instanceof ui5strap.RadioButton){
					addonClass = 'input-group-addon';
				}
				else{
					throw new Error('Control is not a valid input group addon!');
				}
			}
			else{
				throw new Error('Control is not allowed witin InputGroup!');
			}

			if(null !== addonClass){
				rm.write('<span class="' + addonClass + '">');
				rm.renderControl(item);
				rm.write("</span>");
			}
			else{
				rm.renderControl(item);
			}
		}
		    
		rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Item
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

	jQuery.sap.declare("ui5strap.Item");

	sap.ui.core.Element.extend("ui5strap.Item", {
		metadata : {

			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				text : {
					type:"string",
					defaultValue:""
				},
				value : {
					type:"string",
					defaultValue:""
				}
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Jumbotron
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

	jQuery.sap.declare("ui5strap.Jumbotron");

	sap.ui.core.Control.extend("ui5strap.Jumbotron", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.JumbotronRenderer
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

	jQuery.sap.declare("ui5strap.JumbotronRenderer");

	ui5strap.JumbotronRenderer = {
	};

	ui5strap.JumbotronRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");

		rm.writeControlData(oControl);
		rm.addClass('jumbotron')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		};

		rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Label
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

	jQuery.sap.declare("ui5strap.Label");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Label", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				}, 
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.Info
				},
				trail : {
					type:"ui5strap.TrailHtml", 
					defaultValue:ui5strap.TrailHtml.Space
				}
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.LabelRenderer
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

	jQuery.sap.declare("ui5strap.LabelRenderer");

	ui5strap.LabelRenderer = {};

	ui5strap.LabelRenderer.render = function(rm, oControl) {
		rm.write("<span");
		rm.writeControlData(oControl);
		rm.addClass("label label-" + ui5strap.BSSeverity[oControl.getSeverity()] );
		rm.writeClasses();
		rm.write(">");
		
		rm.writeEscaped(oControl.getText());
		
		rm.write("</span>");

		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Line
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

	jQuery.sap.declare("ui5strap.Line");
	
	sap.ui.core.Control.extend("ui5strap.Line", {
		metadata : {

			library : "ui5strap",
			
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.LineRenderer
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

	jQuery.sap.declare("ui5strap.LineRenderer");

	ui5strap.LineRenderer = {};

	ui5strap.LineRenderer.render = function(rm, oControl) {
		rm.write("<hr");
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(" />");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.List
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

	jQuery.sap.declare("ui5strap.List");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.List", {
		metadata : {

			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.ListType", 
					defaultValue:ui5strap.ListType.Unordered
				}
			}

		}
	});


}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownItem
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

	jQuery.sap.declare("ui5strap.ListDropdownItem");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListLinkItem");
	
	ui5strap.ListLinkItem.extend("ui5strap.ListDropdownItem", {
		metadata : {
			library : "ui5strap",

			defaultAggregation : "menu",
			
			properties : {
				selectable : {
					type : "boolean",
					defaultValue : false
				}
			},

			aggregations : { 
				menu : {
					type : "ui5strap.ListDropdownMenu",
					multiple : false
				}
			}
		}
	});

	var ListDropdownItemProto = ui5strap.ListDropdownItem.prototype;

	ListDropdownItemProto.setText = function(newText){
		if(this.getMenu() === null){
			ui5strap.Utils.updateText(this, jQuery('#' + this.getId() + '---link'), newText);
		}
		else{
			this.setProperty('text', newText);
		}
	};

	ListDropdownItemProto.open = function(){
		this.$().addClass('open');
	};
	
	ListDropdownItemProto.close = function(){
		this.$().removeClass('open');
	};

	ListDropdownItemProto.toggle = function(){
		this.$().toggleClass('open');
	};

	if(ui5strap.options.enableTapEvents){
		ListDropdownItemProto.ontap = function(oEvent){
			this.$().toggleClass('open');
		};
	};

	if(ui5strap.options.enableClickEvents){
		ListDropdownItemProto.onclick = function(oEvent){
			this.$().toggleClass('open');
		};
	};
	

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownItemRenderer
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

	jQuery.sap.declare("ui5strap.ListDropdownItemRenderer");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListLinkItemRenderer");

	ui5strap.ListDropdownItemRenderer = {
	};

	ui5strap.ListDropdownItemRenderer.render = function(rm, oControl) {
		var menu = oControl.getMenu(),
			LinkRenderer = ui5strap.LinkRenderer;

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.addClass('dropdown');
		rm.writeClasses();
		rm.write(">");

		LinkRenderer.startRender(rm, oControl, { toggleDropdown : true });
		
		this.renderContent(rm, oControl);

		LinkRenderer.endRender(rm, oControl);
		
		if(null !== menu){
			rm.renderControl(menu);
		}

		rm.write("</li>");
	};

	ui5strap.ListDropdownItemRenderer.renderContent = function(rm, oControl){
		ui5strap.LinkRenderer.renderContent(rm, oControl);
		rm.write(' <span class="caret"></span>');
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownMenu
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

	jQuery.sap.declare("ui5strap.ListDropdownMenu");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.ListDropdownMenu", {
		metadata : {

			library : "ui5strap",

			properties : {
				updateMasterText : {
					type : "boolean",
					defaultValue : false
				}
			}

		}
	});

	var ListDropdownMenuProto = ui5strap.ListDropdownMenu.prototype;

	ListDropdownMenuProto.setMasterSelected = function(listItem){ 
		ui5strap.ListBase.prototype.setMasterSelected.call(this, listItem);
		
		var parent = this.getParent(),
			grandParent = parent.getParent(),
			updateText = false;

		if(grandParent instanceof ui5strap.ButtonGroup){
			grandParent.setSelectedControl(parent, this);

			updateText = this.getUpdateMasterText();
		}
		else if(parent instanceof ui5strap.ButtonDropdown){
			parent.setSelected(true);

			updateText = this.getUpdateMasterText();
		}
		else if(grandParent instanceof ui5strap.ListBase){
			updateText = this.getUpdateMasterText();
		}
		
		if(updateText){
				var selectedText = listItem.getText();
				if(selectedText === ''){
					var listItemContent = listItem.getContent();
					if(listItemContent.length > 0){
						//TODO define "textual" interface
						if('getText' in listItemContent[0]){
							selectedText = listItemContent[0].getText();
						}
					}
				}

				if(selectedText !== ''){
					parent.setText(selectedText);
				}
			}
	};

	if(ui5strap.options.enableTapEvents){
		ListDropdownMenuProto.ontap = function(oEvent){
			ui5strap.ListBase.prototype.ontap.call(this, oEvent);

			var parent = this.getParent();
			if("close" in parent){
				parent.close();
			}
		};
	}

	if(ui5strap.options.enableClickEvents){
		ListDropdownMenuProto.onclick = function(oEvent){
			ui5strap.ListBase.prototype.onclick.call(this, oEvent);

			var parent = this.getParent();
			if("close" in parent){
				parent.close();
			}
		};
	}

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListDropdownMenuRenderer
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

jQuery.sap.declare("ui5strap.ListDropdownMenuRenderer");

ui5strap.ListDropdownMenuRenderer = {
};

ui5strap.ListDropdownMenuRenderer.render = function(rm, oControl) {
	var items = oControl.getItems();

	rm.write("<ul");
	rm.writeControlData(oControl);
	rm.addClass("dropdown-menu");
	rm.writeClasses();
	rm.writeAttribute("role", "menu");
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ul>");
};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroup
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

	jQuery.sap.declare("ui5strap.ListGroup");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListGroupItem");

	ui5strap.ListBase.extend("ui5strap.ListGroup", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				container : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				items : {
					type : "ui5strap.ListGroupItem",
					singularName: "item"
				} 
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListGroupRenderer
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

	jQuery.sap.declare("ui5strap.ListGroupRenderer");

	ui5strap.ListGroupRenderer = {
	};

	ui5strap.ListGroupRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			tag = oControl.getContainer() ? 'div' : 'ul';
		

		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('list-group');
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < items.length; i++){ 
			rm.renderControl(items[i]);
		}
		    
		rm.write("</" + tag + ">");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMedia
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

	jQuery.sap.declare("ui5strap.ListMedia");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListMediaItem");

	ui5strap.ListBase.extend("ui5strap.ListMedia", {
		metadata : {

			// ---- object ----
			defaultAggregation : "items",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				container : {
					type:"boolean", 
					defaultValue:false
				}
			},
			aggregations : { 
				items : {
					type : "ui5strap.ListMediaItem",
					singularName: "item"
				} 
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListMediaRenderer
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

	jQuery.sap.declare("ui5strap.ListMediaRenderer");

	ui5strap.ListMediaRenderer = {
	};

	ui5strap.ListMediaRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			tag = oControl.getContainer() ? 'div' : 'ul';
		
		rm.write("<" + tag);
		rm.writeControlData(oControl);
		rm.addClass('media-list');
		rm.writeClasses();
		rm.write(">");
		    
		for(var i = 0; i < items.length; i++){ 
			rm.renderControl(items[i]);
		}
		    
		rm.write("</" + tag + ">");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListNavItem
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

	jQuery.sap.declare("ui5strap.ListNavItem");
	jQuery.sap.require("ui5strap.ListLinkItem");

	ui5strap.ListLinkItem.extend("ui5strap.ListNavItem", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				badge : {
					type:"string",
					defaultValue : ""
				}
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListNavItemRenderer
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

	jQuery.sap.declare("ui5strap.ListNavItemRenderer");
	jQuery.sap.require("ui5strap.LinkRenderer");

	ui5strap.ListNavItemRenderer = {
	};

	ui5strap.ListNavItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge(),
			LinkRenderer = ui5strap.LinkRenderer;

		rm.write("<li");
		rm.writeControlData(oControl);
		if(oControl.getSelected()){
			rm.addClass('active');
		}
		if(!oControl.getEnabled()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");

		LinkRenderer.startRender(rm, oControl, { listLink : true });
		
		LinkRenderer.renderContent(rm, oControl);

		if('' !== badge){
			rm.write('<span class="badge">');
			rm.writeEscaped(badge);
			rm.write('</span>');
		}

		LinkRenderer.endRender(rm, oControl);
		    
		rm.write("</li>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ListRenderer
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

jQuery.sap.declare("ui5strap.ListRenderer");

ui5strap.ListRenderer = {
};

ui5strap.ListRenderer.render = function(rm, oControl) {
	var items = oControl.getItems();

	var tagName = 'ul';
	if(oControl.getType() === ui5strap.ListType.Ordered){
		tagName = 'ol';
	}

	rm.write("<" + tagName);
	rm.writeControlData(oControl);
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</" + tagName + ">");
};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Modal
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

	jQuery.sap.declare("ui5strap.Modal");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Modal", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				animate : {
          type:"boolean", 
          defaultValue:true
        },
        backdrop : {
          type:"boolean", 
          defaultValue:false
        }
			},
			aggregations : { 
				header : {
					singularName: "header"
				},
				body : {
					singularName: "body"
				},
				footer : {
					singularName: "footer"
				}
			},
      events : {
         shown : {},
         hidden : {}
      }

		}
	});

	ui5strap.Modal.prototype.onAfterRendering = function(){
    var _this = this,
        $modal = this.$(),
        modalOptions = {
          show : false,
          backdrop: this.getBackdrop()
        };

    window.setTimeout(function(){
        jQuery(document.body).append($modal.detach());
        
        $modal
          .modal(modalOptions)
          .on('hidden.bs.modal', function(){
              _this.fireHidden();
          })
          .on('shown.bs.modal', function(){
              _this.fireShown();
          });
    }, 250);
  };

	ui5strap.Modal.prototype.show = function(){
		this.$().modal('show');
	};

  ui5strap.Modal.prototype.hide = function(){
    this.$().modal('hide');
  };

  ui5strap.Modal.prototype.toggle = function(){
    this.$().modal('toggle');
  };

}());

/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);;/*
 * 
 * UI5Strap
 *
 * ui5strap.ModalRenderer
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

	jQuery.sap.declare("ui5strap.ModalRenderer");

	ui5strap.ModalRenderer = {};

	ui5strap.ModalRenderer.render = function(rm, oControl) {
		var header = oControl.getHeader(),
			body = oControl.getBody(),
			footer = oControl.getFooter();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('modal' + (oControl.getAnimate() ? ' fade' : ''));
		rm.writeClasses();
		rm.write(">");
		
			rm.write('<div class="modal-dialog">');
			rm.write('<div class="modal-content">');

			if(header.length > 0){
				rm.write('<div class="modal-header">');
				for(var i = 0; i < header.length; i++){ 
					rm.renderControl(header[i]);
				}
				rm.write("</div>");
			}

			if(body.length > 0){
				rm.write('<div class="modal-body">');
				for(var i = 0; i < body.length; i++){ 
					rm.renderControl(body[i]);
				}
				rm.write("</div>");
			}

			if(footer.length > 0){
				rm.write('<div class="modal-footer">');
				for(var i = 0; i < footer.length; i++){ 
					rm.renderControl(footer[i]);
				}
				rm.write("</div>");
			}
			
			rm.write("</div>");
			rm.write("</div>");
		rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Nav
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

	jQuery.sap.declare("ui5strap.Nav");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.Nav", {
		metadata : {

			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.NavType", 
					defaultValue:ui5strap.NavType.Default
				},
				align : {
					type:"ui5strap.Alignment",
					defaultValue:ui5strap.Alignment.Default
				}
			}

		}
	});

	var NavProto = ui5strap.Nav.prototype;

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavBar
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

	jQuery.sap.declare("ui5strap.NavBar");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.NavBar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "collapse",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				type : {
					type:"ui5strap.NavBarType", 
					defaultValue:ui5strap.NavBarType.Default
				},
				inverse : {
					type:"boolean", 
					defaultValue:false
				},
				fluid : {
					type:"boolean", 
					defaultValue:false
				},
				collapsed : {
					type : "boolean",
					defaultValue : true
				},
				position : {
					type:"ui5strap.NavBarPosition", 
					defaultValue: ui5strap.NavBarPosition.Default
				}
			},

			aggregations : { 
				
				collapse : {
					singularName: "collapse"
				},

				brand : {
					multiple : false,
					type : "ui5strap.Link"
				},

				contentLeft : {
					
				},

				content : {

				},

				contentRight : {
					
				}
			}

		}
	});

	var NavBarProto = ui5strap.NavBar.prototype;

	NavBarProto.getCollapseId = function(){
		return this.getId() + '---collapse';
	};

	NavBarProto.setCollapsed = function(newCollapsed){
		if(newCollapsed === this.getCollapsed()){
			return this;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#' + this.getCollapseId());
			if(newCollapsed){
				$collapse
			      .height($collapse.height())
			      [0].offsetHeight

			    $collapse
			      .addClass('collapsing')
			      .removeClass('collapse')
			      .removeClass('in')

			    var complete = function () {
			      $collapse
			        .removeClass('collapsing')
			        .addClass('collapse')
			    }

			    if (!$.support.transition) return complete.call(this)

			    $collapse
			      .height(0)
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)

			}
			else{
				//$collapse.addClass('collapse in').height('auto');
			
				$collapse
      			.removeClass('collapse')
      			.addClass('collapsing')
      			.height(0);

    			var complete = function () {
			      	$collapse
			        .removeClass('collapsing')
			        .addClass('collapse in')
			        .height('auto')
			    	//fire event collapse completed
			    }

    			if (!$.support.transition) return complete.call(this)

    			$collapse
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)
			      
			      .height($collapse[0]["scrollHeight"])

			}


			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed);
		}

		return this;
	};

	NavBarProto.toggle = function(){
		this.setCollapsed(!this.getCollapsed());
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavBarRenderer
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

	jQuery.sap.declare("ui5strap.NavBarRenderer");

	ui5strap.NavBarRenderer = {

		positionToClass : {
			FixedTop : "navbar-fixed-top",
			FixedBottom : "navbar-fixed-bottom",
			StaticTop : "navbar-static-top"
		},

		typeToClass : {
			Default : "navbar-default"
		}

	};

	ui5strap.NavBarRenderer.render = function(rm, oControl) {
		var brand = oControl.getBrand(),
			contentLeft = oControl.getContentLeft(),
			content = oControl.getContent(),
			contentRight = oControl.getContentRight(),
			position = oControl.getPosition(),
			type = oControl.getType(),
			collapse = oControl.getCollapse();

		var collapseId = oControl.getCollapseId();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("navbar");
		
		if(ui5strap.NavBarType.None !== type){
			rm.addClass(this.typeToClass[type]);
		}

		if(oControl.getInverse()){
			rm.addClass('navbar-inverse');
		}

		if(ui5strap.NavBarPosition.Default !== position){
			rm.addClass(this.positionToClass[position]);
		}

		if(contentLeft.length > 0){
			
		}

		if(contentRight.length > 0){
			
		}

		rm.writeClasses();
		rm.write(">");
		
		//Container
		rm.write("<div");
		rm.addClass(oControl.getFluid() ? "container-fluid" : "container");
		rm.writeClasses();
		rm.write(">");


		if(contentLeft.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-left');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentLeft.length; i++){ 
		    	rm.renderControl(contentLeft[i]);
		    }
		    rm.write("</div>");
		}

		if(contentRight.length > 0){
			rm.write("<div");
			rm.addClass('navbar-content-right');
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < contentRight.length; i++){ 
		    	rm.renderControl(contentRight[i]);
		    };
		    rm.write("</div>");
		}

		if(null !== brand){

			rm.write("<div");
			rm.addClass("navbar-header");
			rm.writeClasses();
			rm.write(">");

			
			brand.addStyleClass('navbar-brand')
			rm.renderControl(brand);
			

			rm.write("</div>");

		}


		if(content.length > 0){
			rm.write("<div");
			rm.addClass("navbar-content");
			rm.writeClasses();
			rm.write(">");
			for(var i = 0; i < content.length; i++){ 
		    	rm.renderControl(content[i]);
		    };
		    rm.write("</div>");
		}



		if(collapse.length > 0){
			//Collapse
			rm.write("<div id='" + collapseId + "'");
			rm.addClass("collapse navbar-collapse");
			rm.writeClasses();
			rm.write(">");

		    for(var i = 0; i < collapse.length; i++){ 
		    	rm.renderControl(collapse[i]);
		    };
		
			//End collapse
			rm.write("</div>");
		}

		

		//End container
		rm.write("</div>");

		//End control
		rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainerRenderer
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

	jQuery.sap.declare("ui5strap.NavContainerRenderer");

	var NavContainerRenderer = {};

	ui5strap.NavContainerRenderer = NavContainerRenderer;

	NavContainerRenderer.render = function(rm, oControl) {
		this.startRender(rm, oControl);

		for(var aggregationId in oControl.targets){
			this.renderTarget(rm, oControl, aggregationId);
		}

		this.endRender(rm, oControl);
	};

	/*
	* @Public
	*/
	NavContainerRenderer.startRender = function(rm, oControl) {
			rm.write("<div");
		    rm.writeControlData(oControl);
		    rm.addClass(oControl.getClassString());
		    rm.writeClasses();
		    rm.write(">");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.renderTarget = function (rm, oControl, target) {
			rm.write('<div');
			rm.addClass('navcontainer-target navcontainer-' + oControl.ncType + '-target navcontainer-' + oControl.ncType + '-target-' + target);
			//Legacy support
			rm.addClass('navcontainer-aggregation navcontainer-aggregation-' + target);
			rm.writeClasses();
			rm.write(">");

			//Pages container
			rm.write('<div id="' + oControl.targetPagesDomId(target) + '"');
			rm.addClass('navcontainer-pages');
			rm.writeClasses();
			rm.write("></div>");
			
			//Layers container
			rm.write('<div id="' + oControl.targetLayersDomId(target) + '"');
			rm.addClass('navcontainer-layers');
			rm.writeClasses();
			rm.write(">");
			rm.write("</div>");

			rm.write("</div>");
	};

	/*
	* @Public
	*/
	NavContainerRenderer.endRender = function(rm) {
		 	rm.write("</div>");
	};


}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavContainerStandard
 * 
 * @author Jan Philipp Knöller <info@pksoftware.de>
 * 
 * Homepage: http://ui5strap.com
 *
 * Copyright (c) 2013 Jan Philipp Knöller <info@pksoftware.de>
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

	jQuery.sap.declare("ui5strap.NavContainerStandard");
	jQuery.sap.require("ui5strap.NavContainer");
	
	ui5strap.NavContainer.extend("ui5strap.NavContainerStandard", {
		metadata : {

			library : "ui5strap",
			
			properties : { 
				options : {
					type : "string",
					defaultValue : ""
				}
			}

		},

		//Use default NavContainerRenderer
		renderer : "ui5strap.NavContainerRenderer"
	});

	/*
	* @Override
	* @Protected
	*/
	ui5strap.NavContainerStandard.prototype._initNavContainer = function(){
		//NavContainer type string
		//Resulting css class is "navcontainer navcontainer-standard"
		this.ncType = "standard";

		//Default target
		this.defaultTarget = "content";

		//Available targets
		this.targets = {
			"content" : null,
			"sidebar" : null,
			"navbar" : null
		};
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.NavRenderer
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

jQuery.sap.declare("ui5strap.NavRenderer");

ui5strap.NavRenderer = {
	typeToClass : {
		Tabs : "nav-tabs",
		Pills : "nav-pills",
		PillsStacked : "nav-pills nav-stacked",
		PillsJustified : "nav-pills nav-justified",
		TabsJustified : "nav-tabs nav-justified"
	}

};

ui5strap.NavRenderer.render = function(rm, oControl) {
	var type = oControl.getType(),
		items = oControl.getItems();

	rm.write("<ul");
	
	rm.writeControlData(oControl);

	rm.addClass('nav');
	if(ui5strap.NavType.Default !== type){
		rm.addClass(this.typeToClass[type]);
	}
	
	ui5strap.RenderUtils.alignment(rm, oControl, 'navbar-nav', 'sidebar-nav');

	rm.writeClasses();
	
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ul>");
};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ODataClient
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

    jQuery.sap.declare("ui5strap.ODataClient");

    jQuery.sap.require("ui5strap.RestClient");

    ui5strap.RestClient.extend("ui5strap.ODataClient");

    var ODataClient = ui5strap.ODataClient,
        ODataClientProto = ODataClient.prototype;
    
    ODataClientProto.init = function(){
        ui5strap.RestClient.prototype.init.call(this);

        this._initModel();
    };

    ODataClientProto._initModel = function(){
        var oModel = new sap.ui.model.odata.ODataModel(this.options.url + "eventdata.xsodata", true);

        oModel.attachRequestFailed(null, function(){
            throw new Error('OModel request failed!');
        });

        oModel.attachParseError(null, function(){
            throw new Error('OModel parse error!');
        });

        this._oModel = oModel;
    };

    ODataClientProto.getModel = function(){
        return this._oModel;
    };

    ODataClientProto.navigate = function(path, callback){
        //jQuery.sap.log.debug('Navigate binding context...');

        var _this = this;
        this._oModel.createBindingContext(path, null, null, function(context){
            _this._navigationContext = context;
            callback && callback(context);
        });
    };

    ODataClientProto.getNavigationContext = function(){
        return this._navigationContext;
    };

    ODataClientProto._read = function(options){
        this._oModel.read(this._parsePath(options.path, options.pathParameters), {
            "urlParameters" : options.queryParameters,
            "context" : options.context,
            "success" : options.success,
            "error" : options.error
        });
    };

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Page
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

	jQuery.sap.declare("ui5strap.Page");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Page", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				
			},
			aggregations : { 
				head : {
					multiple : false
				},
				body : {
					singularName: "body"
				},
				footer : {
					multiple : false
				}
			}

		}
	});


}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PageHeader
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

	jQuery.sap.declare("ui5strap.PageHeader");
	
	sap.ui.core.Control.extend("ui5strap.PageHeader", {metadata : {

		library : "ui5strap",
		
		properties : { 
			text : {
				type:"string", 
				defaultValue:""
			},
			subText : {
				type:"string", 
				defaultValue:""
			},
			lead : {
				type:"string", 
				defaultValue:""
			}
		},
		
		aggregations : {}

	}});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PageHeaderRenderer
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

    jQuery.sap.declare("ui5strap.PageHeaderRenderer");

    ui5strap.PageHeaderRenderer = {};

    ui5strap.PageHeaderRenderer.render = function(rm, oControl) {
        var lead = oControl.getLead();

        rm.write("<div");
        rm.writeControlData(oControl);
        rm.addClass("page-header");
        rm.writeClasses();
        rm.write(">");
        
        rm.write("<h1>");
        
        rm.writeEscaped(oControl.getText());
        
        var subText = oControl.getSubText();
        if('' !== subText){
        	rm.write("<small>");
        	rm.writeEscaped(subText);
        	rm.write("</small>");
        }
        
        rm.write("</h1>");
        
        if('' !== lead){
             rm.write("<p class='lead'>")
             rm.writeEscaped(lead);
             rm.write('</p>');
        }
        
        rm.write("</div>");

        
    };

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PageRenderer
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

	jQuery.sap.declare("ui5strap.PageRenderer");

	ui5strap.PageRenderer = {};

	ui5strap.PageRenderer.render = function(rm, oControl) {
		var head = oControl.getHead(),
			content = oControl.getBody(),
			footer = oControl.getFooter();

		rm.write("<div");
		
		rm.addClass('page');
		if(head){
			rm.addClass('page-with-head');
		}
		if(footer){
			rm.addClass('page-with-footer');
		}
		rm.writeClasses();
		rm.write(">");
		
		if(head){
			rm.write("<div class='page-head'>");
			rm.renderControl(head);
			rm.write("</div>");
		}

		rm.write("<div class='page-body'>");
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		rm.write("</div>");

		if(footer){
			rm.write("<div class='page-footer'>");
			rm.renderControl(footer);
			rm.write("</div>");
		}

		rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Pager
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

	jQuery.sap.declare("ui5strap.Pager");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Pager", {
		metadata : {

			// ---- control specific ----
			library : "ui5strap",
			
			properties : {
				aligned : {
					type : "boolean",
					defaultValue : false
				},
				disabledPrevious : {
					type : "boolean",
					defaultValue : false
				},
				disabledNext : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				previous : {
					type : "ui5strap.Link",
					multiple:false
				}, 
				next : {
					type : "ui5strap.Link",
					multiple:false
				}
				
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PagerRenderer
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

	jQuery.sap.declare("ui5strap.PagerRenderer");

	ui5strap.PagerRenderer = {};

	ui5strap.PagerRenderer.render = function(rm, oControl) {
		var previous = oControl.getPrevious(),
			next = oControl.getNext(),
			spread = oControl.getAligned();

		rm.write('<ul class="pager"');
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		rm.write('<li');
		if(spread){
			rm.addClass('previous');
		}
		if(oControl.getDisabledPrevious()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(previous);
		rm.write('</li>');
		
		rm.write('<li');
		if(spread){
			rm.addClass('next');
		}
		if(oControl.getDisabledNext()){
			rm.addClass('disabled');
		}
		rm.writeClasses();
		rm.write(">");
		rm.renderControl(next);
		rm.write('</li>');
		

		rm.write("</ul>");

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Pagination
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

	jQuery.sap.declare("ui5strap.Pagination");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.Pagination", {
		metadata : {

			library : "ui5strap",

			properties : { 
				
			}
		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PaginationRenderer
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

jQuery.sap.declare("ui5strap.PaginationRenderer");

ui5strap.PaginationRenderer = {
};

ui5strap.PaginationRenderer.render = function(rm, oControl) {
	var items = oControl.getItems();

	rm.write("<ul");
	rm.writeControlData(oControl);
	rm.addClass('pagination');
	rm.writeClasses();
	rm.write(">");
	
	for(var i = 0; i < items.length; i++){
		rm.renderControl(items[i]);
	}
	
	rm.write("</ul>");
};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Panel
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
		if(!this.getCollapse() || newCollapsed === this.getCollapsed()){
			return this;
		}

		if(this.getDomRef()){
			var $collapse = jQuery('#panel-collapse---' + this.getId());
			if(newCollapsed){
				$collapse
			      .height($collapse.height())
			      [0].offsetHeight

			    $collapse
			      .addClass('collapsing')
			      .removeClass('collapse')
			      .removeClass('in')

			    var complete = function () {
			      $collapse
			        .removeClass('collapsing')
			        .addClass('collapse')
			    }

			    if (!$.support.transition) return complete.call(this)

			    $collapse
			      .height(0)
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)

			}
			else{
				//$collapse.addClass('collapse in').height('auto');
			
				$collapse
      			.removeClass('collapse')
      			.addClass('collapsing')
      			.height(0);

    			var complete = function () {
			      	$collapse
			        .removeClass('collapsing')
			        .addClass('collapse in')
			        .height('auto')
			    	//fire event collapse completed
			    }

    			if (!$.support.transition) return complete.call(this)

    			$collapse
			      .one($.support.transition.end, complete)
			      .emulateTransitionEnd(350)
			      
			      .height($collapse[0]["scrollHeight"])

			}


			this.setProperty('collapsed', newCollapsed, true);
		}
		else{
			this.setProperty('collapsed', newCollapsed);
		}

		return this;
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

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PanelGroup
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

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PanelGroupRenderer
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

	jQuery.sap.declare("ui5strap.PanelGroupRenderer");

	ui5strap.PanelGroupRenderer = {
	};

	ui5strap.PanelGroupRenderer.render = function(rm, oControl) {
		var panels = oControl.getPanels();

		rm.write("<div");

		rm.writeControlData(oControl);
		rm.addClass('panel-group')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < panels.length; i++){ 
			rm.renderControl(panels[i]);
		};

		rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.PanelRenderer
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

	jQuery.sap.declare("ui5strap.PanelRenderer");

	ui5strap.PanelRenderer = {};

	ui5strap.PanelRenderer.render = function(rm, oControl) {
		var severity = oControl.getSeverity(),
			collapse = oControl.getCollapse();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("panel");
		
		if(collapse){
			rm.addClass('panel-collapsible');
		}
		
		if(ui5strap.Severity.None !== severity){
			rm.addClass("panel-" + ui5strap.BSSeverity[severity]);
		}
		
		rm.writeClasses();
		rm.write(">");
		
		if(oControl.getTitle() || oControl.getTitleContent().length){
			rm.write("<div");
			rm.addClass("panel-heading");
			rm.writeClasses();
			rm.write(">");
			
			ui5strap.RenderUtils.renderTitleContent(rm, oControl);

			rm.write("</div>");
		}
		
		if(collapse){
			rm.write('<div id="panel-collapse---' + oControl.getId()+'"');
			rm.addClass("panel-collapse collapse");
			if(!oControl.getCollapsed()){
				rm.addClass('in');
			}
			rm.writeClasses();
			rm.write(">");
		}

		rm.write("<div");
		rm.addClass("panel-body");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write("</div>");
		
		if(collapse){
			rm.write("</div>");
		}
		
		rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Paragraph
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

	jQuery.sap.declare("ui5strap.Paragraph");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Paragraph", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				parse : {
					type : "boolean",
					defaultValue : false
				},
				contentPlacement : {
					type:"ui5strap.ContentPlacement",
					defaultValue : ui5strap.ContentPlacement.End
				},
				severity : {
					type: "ui5strap.Severity", 
					defaultValue: ui5strap.Severity.None
				},
				formStatic : {
					type : "boolean",
					defaultValue:false
				}
			},
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	ui5strap.Utils.dynamicText(ui5strap.Paragraph.prototype);

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ParagraphRenderer
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

	jQuery.sap.declare("ui5strap.ParagraphRenderer");

	ui5strap.ParagraphRenderer = {};

	ui5strap.ParagraphRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity(),
			text = oControl.getText(),
			parse = oControl.getParse();

		if(parse){
			text = ui5strap.RenderUtils.parseText(text);
		}

		rm.write("<p");
		
		rm.writeControlData(oControl);
		if(oControl.getFormStatic()){
			rm.addClass('form-control-static');
		}
		if(ui5strap.Severity.None !== severity){
			rm.addClass("text-" + ui5strap.BSSeverity[severity]);
		}
		rm.writeClasses();
		rm.write(">");
		
		ui5strap.RenderUtils.renderContent(rm, oControl, text, parse);
		
		rm.write("</p>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Popover
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
        content : {singularName: "content"},
      }

    }
  });

  var Popover = ui5strap.Popover;

  Popover.lastShownInstance = null;

  Popover.prototype.onAfterRendering = function(){
    var $this = this.$(),
        _this = this;

    var popoverOptions = {
      animation : this.getAnimate(),

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

    this.getSourceDomRef().on('hidden.bs.popover', function(){
        _this.fireHidden();
    }).on('shown.bs.popover', function(){
        _this.fireShown();
    });
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

  Popover.prototype.toggle = function(){
      this.getSourceDomRef().popover('toggle');
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

}(jQuery);;/*
 * 
 * UI5Strap
 *
 * ui5strap.PopoverRenderer
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

	jQuery.sap.declare("ui5strap.PopoverRenderer");

	ui5strap.PopoverRenderer = {};

	ui5strap.PopoverRenderer.render = function(rm, oControl) {
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.writeAttribute("style", "display:none;");
		rm.addClass("popover-data");
		rm.writeClasses();
		rm.write(">");

		rm.write("<div");
			   
		rm.addClass("popover-data-title");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderTitleContent(rm, oControl);

		rm.write("</div>");


		rm.write("<div");
		  
		rm.addClass("popover-data-content");
		rm.writeClasses();
		rm.write(">");

		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write("</div>");

		rm.write("</div>");
		    
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Progress
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

	jQuery.sap.declare("ui5strap.Progress");
	
	sap.ui.core.Control.extend("ui5strap.Progress", {
		metadata : {

			// ---- object ----
			defaultAggregation : "bars",
				
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				animate : {
					type:"boolean", 
					defaultValue:false
				},
				striped : {
					type:"boolean", 
					defaultValue:false
				}
			},
					
			aggregations : { 
				bars : {
					type : "ui5strap.ProgressBar",
					singularName: "bar"
				} 
			}
		}
	});

	var ProgressProto = ui5strap.Progress.prototype;

	ProgressProto.getFirstBar = function(){
		var bars = this.getBars();
		if(bars.length === 0){
			return null;
		}
		return bars[0];
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ProgressBar
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

	jQuery.sap.declare("ui5strap.ProgressBar");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.ProgressBar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				value : {
					type:"int", 
					defaultValue:0
				}, 
				minValue : {
					type:"int", 
					defaultValue:0
				},
				maxValue : {
					type:"int", 
					defaultValue:100
				},  
				severity : {
					type:"ui5strap.Severity", 
					defaultValue:ui5strap.Severity.None
				},
				labelFormat : {
					type:"string", 
					defaultValue:""
				}
			}
		}
	});

	var ProgressBarProto = ui5strap.ProgressBar.prototype;

	ProgressBarProto.setValue = function(newValue){
		if(this.getDomRef()){
			if(newValue > this.getMaxValue() || newValue < this.getMinValue()){
				throw new Error('Value out of bounds.');
			}

			this.setProperty('value', newValue, true);
			this.$().css('width', this.getProgress() + '%');
			
		}
		else{
			this.setProperty('value', newValue);
		}
	};

	ProgressBarProto.getProgress = function(){
		var percentage = ( this.getValue() - this.getMinValue() ) / ( this.getMaxValue() - this.getMinValue() ) * 100;
		return Math.round(percentage * 100) / 100;
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ProgressBarRenderer
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

	jQuery.sap.declare("ui5strap.ProgressBarRenderer");

	ui5strap.ProgressBarRenderer = {
	};

	ui5strap.ProgressBarRenderer.render = function(rm, oControl) {
		var type = oControl.getSeverity(),
			labelFormat = oControl.getLabelFormat(),
			value = oControl.getValue(),
			maxValue = oControl.getMaxValue(),
			minValue = oControl.getMinValue(),
			percentage = oControl.getProgress();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('progress-bar')
		
		if(ui5strap.Severity.None !== type){
			rm.addClass('progress-bar-' + ui5strap.BSSeverity[type]);
		}

		rm.writeAttribute('style', 'width:' + percentage + '%');

		rm.writeClasses();
		rm.write(">");
		
			if('' !== labelFormat){
				rm.write(
					labelFormat
					.replace('[val]', value)
					.replace('[min]', minValue)
					.replace('[max]', maxValue)
					.replace('[left]', maxValue - value)
					.replace('[progress]', percentage));
			}

		rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ProgressRenderer
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

	jQuery.sap.declare("ui5strap.ProgressRenderer");

	ui5strap.ProgressRenderer = {
	};

	ui5strap.ProgressRenderer.render = function(rm, oControl) {
		var items = oControl.getBars();

		rm.write("<div");
		rm.writeControlData(oControl);

		rm.addClass('progress');
		
		if(oControl.getAnimate()){
			rm.addClass('active');
		}
		if(oControl.getStriped()){
			rm.addClass('progress-striped');
		}
		
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < items.length; i++){
			rm.renderControl(items[i]);
		}
		
		rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Row
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

	jQuery.sap.declare("ui5strap.Row");

	sap.ui.core.Control.extend("ui5strap.Row", {
		metadata : {

			// ---- object ----
			defaultAggregation : "columns",
			
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				
				
			},
			
			aggregations : { 
				columns : {
					type : "ui5strap.IColumn"
				}
			}

		}
	});


}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.RowRenderer
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

	jQuery.sap.declare("ui5strap.RowRenderer");

	ui5strap.RowRenderer = {
	};

	ui5strap.RowRenderer.render = function(rm, oControl) {
		var content = oControl.getColumns();
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("row");
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};


}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.ScrollContainer
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

	jQuery.sap.declare("ui5strap.ScrollContainer");
	
	sap.ui.core.Control.extend("ui5strap.ScrollContainer", {
		metadata : {

			library : "ui5strap",

			defaultAggregation : "content",
			
			properties : { 
				vertical : {
					type:"boolean", 
					defaultValue:false
				},
				horizontal : {
					type:"boolean", 
					defaultValue:false
				}
			},
			aggregations : { 
				"content" : {
					singularName: "content"
				} 
			}
		}
	});

	ui5strap.ScrollContainer.prototype.onBeforeRendering = function(){
		if(this.getDomRef()){
			this._scrollTop = this.getDomRef().scrollTop;
		}
		else{
			this._scrollTop =  null;
		}
	};

	ui5strap.ScrollContainer.prototype.onAfterRendering = function(){
		if(this._scrollTop){
			this.getDomRef().scrollTop = this._scrollTop;
		}
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ScrollContainerRenderer
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

	jQuery.sap.declare("ui5strap.ScrollContainerRenderer");

	ui5strap.ScrollContainerRenderer = {};

	ui5strap.ScrollContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		rm.write("<div");
		rm.writeControlData(oControl);
		
		rm.addClass("ui5strap-scroll-container");
		
		if(oControl.getHorizontal()){
			rm.addClass("ui5strap-scroll-container-horizontal");
		}
		
		if(oControl.getVertical()){
			rm.addClass("ui5strap-scroll-container-vertical");
		}
		
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Sidebar
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

	jQuery.sap.declare("ui5strap.Sidebar");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Sidebar", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				"inverse" : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.SidebarRenderer
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

	jQuery.sap.declare("ui5strap.SidebarRenderer");

	ui5strap.SidebarRenderer = {
	};

	ui5strap.SidebarRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			inverse = oControl.getInverse();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('sidebar ' + (inverse ? 'sidebar-inverse' : 'sidebar-default'))
		rm.writeClasses();
		rm.write(">");
		

		rm.write("<div");
		rm.addClass('sidebar-content')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		};

		rm.write("</div>");

		rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Overlay
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

	jQuery.sap.declare("ui5strap.StaticOverlay");
	
	sap.ui.core.Control.extend("ui5strap.StaticOverlay", {
		metadata : {

			library : "ui5strap",
			defaultAggregation : "content",
			
			properties : { 
				backdrop : {
					type:"boolean", 
					defaultValue:false
				}
			},
			
			aggregations : {
				content : {
					multiple : true
				}
			},
			
			events : {
				close : {
					
				}
			}
		}
	});
	
	ui5strap.StaticOverlay.prototype.onBeforeRendering = function(oEvent){
		if(this.getBackdrop()){
			this._$backdrop && this._$backdrop.off('click');
			delete(this._$backdrop);
		}
	};
	
	ui5strap.StaticOverlay.prototype.onAfterRendering = function(oEvent){
		if(this.getBackdrop()){
			var _this = this;
			this._$backdrop = this.$().find('#' + this.getId() + '--backdrop').on('click', function(){
				_this.fireClose({});
			});
		}
	};
	
	ui5strap.StaticOverlay.prototype.addContent = function(oObject, bSuppressInvalidate){
		this.addAggregation("content", oObject, bSuppressInvalidate);
		oObject.addStyleClass('modal-dialog');
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.OverlayRenderer
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

	jQuery.sap.declare("ui5strap.StaticOverlayRenderer");

	ui5strap.StaticOverlayRenderer = {};

	ui5strap.StaticOverlayRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();
		
		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-sttic-overlay");
		rm.writeClasses();
		rm.write(">");
		
		if(oControl.getBackdrop()){
			rm.write('<div class="ui5strap-static-overlay-backdrop" id="' + oControl.getId() + '--backdrop"></div>');
		}
		
		for(var i = 0; i < content.length; i++){
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.TabContainer
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

	jQuery.sap.declare("ui5strap.TabContainer");

	sap.ui.core.Control.extend("ui5strap.TabContainer", {
		metadata : {

			// ---- object ----
			defaultAggregation : "panes",
			
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				listenTo : {
					type : "string",
					defaultValue : "select",
					bindable : false
				},
				animate : {
		          type:"boolean", 
		          defaultValue:true
		        }, 
				customAssociation : {
					type : "string",
					defaultValue : "",
					bindable : false
				},
				selectedIndex : {
					type : "int",
					defaultValue : 1
				}
			},
			
			aggregations : { 
				panes : {
					singularName: "pane"
				}
			},

			associations : {
				"source" : {
					multiple : false
				}
			}

		}
	});

	var TabContainer = ui5strap.TabContainer;

	TabContainer.prototype.init = function(){
		this.sourceControl = null;
	};

	  TabContainer.prototype.onAfterRendering= function(){
	  	var _this = this;
			var sourceControl = this.getSourceControl();
			if(typeof sourceControl !== 'undefined'){
				sourceControl.attachEvent(this.getListenTo(), {}, function(oEvent){
					
					_this.synchronize(oEvent.getParameter('selectionSource'));
					
				});

				this.synchronize(sourceControl);
			}
	  };

	  TabContainer.prototype.synchronize = function(srcControl){
	  		var customAssociation = this.getCustomAssociation();
	  		if('' === customAssociation){
				this.setSelectedIndex(srcControl.getSelectedIndex());
			}
			else{
				var relatedId = srcControl.getSelectedControl().data(customAssociation);
				this.setSelectedControlById(relatedId);
			}
	  };

	  TabContainer.prototype.getSourceControl = function(){
	      if(null === this.sourceControl){
	        this.sourceControl = sap.ui.getCore().byId(this.getSource());
	        
	      }

	      return this.sourceControl;
	  };

	  TabContainer.prototype.getSourceDomRef = function(){
	      return this.getSourceControl().$();
	  };

	TabContainer.prototype.setSelectedIndex = function(newIndex){
		if(this.getDomRef()){
			
			this.setProperty('selectedIndex', newIndex, true);

			this.setSelectedPane(this.$().find('.tab-pane').eq(newIndex));
		}
		else{
			this.setProperty('selectedIndex', newIndex);
		}
	};

	TabContainer.prototype.setSelectedControlById = function(controlId){
		this.setSelectedPane(this.$().find('#' + this.getId() + '---' + controlId));
	};

	TabContainer.prototype.setSelectedPane = function($pane){
		var $active = this.$getSelectedPane(),
			_this = this;

			if($active.attr('data-pane-index') === $pane.attr('data-pane-index') || $pane.length === 0){
				return;
			}
		//this.$().find('.tab-pane').attr('class', 'tab-pane fade');
		var transition = $.support.transition
      					&& $active.hasClass('fade');

		var next = function(){
			$pane.addClass('active' + (_this.getAnimate() ? ' fade in' : ''));
			$active.removeClass('active');
		};

		transition ?
		      $active
		        .one($.support.transition.end, next)
		        .emulateTransitionEnd(150) :
		      next();

        $active.removeClass('in');
	};

	TabContainer.prototype.$getSelectedPane = function(){
		return this.$().find('> .active');
	};

	TabContainer.prototype.getSelectedControl = function(){
		var selectedIndex = this.$getSelectedPane().attr('data-pane-index');

		return this.getPanes()[selectedIndex];
	};

	TabContainer.prototype.setSelectedControl = function(pane){
		this.setSelectedControlById(pane.getId());
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.TabContainerRenderer
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

	jQuery.sap.declare("ui5strap.TabContainerRenderer");

	ui5strap.TabContainerRenderer = {
	};

	ui5strap.TabContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getPanes(),
			selectedIndex = oControl.getSelectedIndex(),
			customAssociation = oControl.getCustomAssociation();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass('tab-content')
		rm.writeClasses();
		rm.write(">");
		
		for(var i = 0; i < content.length; i++){ 
			var item = content[i];
			var paneId = i;
			if('' !== customAssociation){
				paneId = item.data(customAssociation);
			}

			rm.write('<div id="' + oControl.getId() + '---' + paneId + '"');
			rm.writeAttribute('data-pane-index', i);
			rm.addClass('tab-pane');
			if(selectedIndex > -1 && i === selectedIndex){
				rm.addClass('active');
			}
			rm.writeClasses();
			rm.write(">");
			
			rm.renderControl(item);

			rm.write("</div>");
		};

		rm.write("</div>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Table
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

	jQuery.sap.declare("ui5strap.Table");
	jQuery.sap.require("sap.ui.core.Control");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Table", {
		metadata : {

			// ---- object ----
			defaultAggregation : "body",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				striped : {
					type : "boolean",
					defaultValue : false
				},
				bordered : {
					type : "boolean",
					defaultValue : false
				},
				condensed : {
					type : "boolean",
					defaultValue : false
				},
				hover : {
					type : "boolean",
					defaultValue : false
				}
			},
			aggregations : { 
				head : {
					type : "ui5strap.TableRow",
					multiple : false
				}, 
				body : {
					type : "ui5strap.TableRow"
				} 
			}

		}
	});

	ui5strap.Table.prototype.init = function(){

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.TableColumn
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

	jQuery.sap.declare("ui5strap.TableColumn");
	jQuery.sap.require("sap.ui.core.Control");


	sap.ui.core.Element.extend("ui5strap.TableColumn", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",

			properties : { 
				text : {
					"type": "string", 
					"defaultValue": ""
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				} 
			}

		}
	});

	ui5strap.TableColumn.prototype.init = function(){

	};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.TableRenderer
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

jQuery.sap.declare("ui5strap.TableRenderer");

ui5strap.TableRenderer = {
};

ui5strap.TableRenderer.render = function(rm, oControl) {
	 rm.write("<table");
	    rm.writeControlData(oControl);
	    rm.addClass("table");
	    if(oControl.getCondensed()){
	    	rm.addClass('table-condensed');
	    }
	    if(oControl.getBordered()){
	    	rm.addClass('table-bordered');
	    }
	    if(oControl.getStriped()){
	    	rm.addClass('table-striped');
	    }
	    if(oControl.getHover()){
	    	rm.addClass('table-hover');
	    }
	    rm.writeClasses();
	    rm.write(">");
	    
	    var head = oControl.getHead();

	    if(null !== head){
	    	this.renderRow(rm, oControl, head, true);
	    }

	   	var rows = oControl.getBody();

	    for(var i = 0; i < rows.length; i++){
	    	this.renderRow(rm, oControl, rows[i]);
	    }

	rm.write("</table>");
};

ui5strap.TableRenderer.renderRow = function(rm, oControl, row, isHeader) {

		var columns = row.getColumns(),
			columnsLength = columns.length,
			severity = row.getSeverity();

		rm.write("<tr");
	    if(ui5strap.Severity.None !== severity){
			rm.addClass(ui5strap.BSSeverity[severity]);
		}
	    rm.writeClasses();
	    rm.write(">");

	    for(var i = 0; i < columnsLength; i++){
		    this.renderColumn(rm, oControl, columns[i], i, isHeader);
		}

	    rm.write("</tr>");

};

ui5strap.TableRenderer.renderColumn = function(rm, oControl, col, i, isHeader) {
	var tagName = isHeader ? 'th' : 'td';
	rm.write("<" + tagName);
	    
	    rm.writeClasses();
	    rm.write(">");
	    
	    var text = col.getText();
	    rm.writeEscaped(text);

	    var content = col.getContent();

	    for(var i = 0; i < content.length; i++){
	    	rm.renderControl(content[i]);
	    }
	rm.write("</" + tagName + ">");
}

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.TableRow
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

jQuery.sap.declare("ui5strap.TableRow");
jQuery.sap.require("sap.ui.core.Element");


sap.ui.core.Element.extend("ui5strap.TableRow", {
	metadata : {

		// ---- object ----
		defaultAggregation : "columns",
		// ---- control specific ----
		library : "ui5strap",

		properties : {
			severity : {
				type: "ui5strap.Severity", 
				defaultValue: ui5strap.Severity.None
			}
		},

		aggregations : { 
			"columns" : {
				type : "ui5strap.TableColumn"
			} 
		}

	}
});

ui5strap.TableRow.prototype.init = function(){

};

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.Thumbnail
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

	jQuery.sap.declare("ui5strap.Thumbnail");
	jQuery.sap.require("ui5strap.library");
	
	sap.ui.core.Control.extend("ui5strap.Thumbnail", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			// ---- control specific ----
			library : "ui5strap",
			properties : { 
				
			},
			aggregations : { 
				image : {
					type : "ui5strap.Image",
					multiple : false
				},
				content : {
					singularName: "content"
				}
			}

		}
	});

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.ThumbnailRenderer
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

	jQuery.sap.declare("ui5strap.ThumbnailRenderer");

	ui5strap.ThumbnailRenderer = {};

	ui5strap.ThumbnailRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			image = oControl.getImage();



		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass('thumbnail');
		
		rm.writeClasses();
		rm.write(">");
		
		if(null !== image){
			rm.renderControl(image);
		}
		
		rm.write('<div class="caption">');
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div></div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * ui5strap.Well
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

	jQuery.sap.declare("ui5strap.Well");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.Well", {
		metadata : {

			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				text : {
					type:"string", 
					defaultValue:""
				},
				size : {
					type : "ui5strap.Size",
					defaultValue:ui5strap.Size.Default
				}
			},
			
			aggregations : { 
				content : {
					singularName: "content"
				}
			}

		}
	});

	ui5strap.Utils.dynamicText(ui5strap.Well.prototype);

}());;/*
 * 
 * UI5Strap
 *
 * ui5strap.WellRenderer
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

	jQuery.sap.declare("ui5strap.WellRenderer");

	ui5strap.WellRenderer = {};

	ui5strap.WellRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			size = oControl.getSize();

		rm.write("<div");
		
		rm.writeControlData(oControl);
		rm.addClass("well");
		if(ui5strap.Size.Default !== size){
			rm.addClass("well-" + ui5strap.BSSize[size]);
		}
		rm.writeClasses();
		rm.write(">");
		
		var subText = oControl.getText();
		if('' !== subText){
			rm.writeEscaped(subText);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</div>");
	};

}());
