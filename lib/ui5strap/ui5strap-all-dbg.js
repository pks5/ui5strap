/*
 * 
 * Liberty Lite
 *
 * Liberty Connector for Ui5Strap
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Jan Philipp Knöller
 * 
 * http://pksoftware.de
 * 
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */
(function(){

	var _fatalError = function(message){
		var $fatalLayer = jQuery('#ui5strap-fatal');
		$fatalLayer.html(message);
		$fatalLayer.css('display', 'block');
	};

	window.onerror = function(message, file, line) { 
		_fatalError(message);
	};

	var jQuerySap = jQuery.sap;

	jQuerySap.require("sap.ui.core.mvc.HTMLView");
	jQuerySap.require("sap.ui.core.CustomData");
	jQuerySap.require("sap.ui.model.resource.ResourceModel");
	jQuerySap.require("sap.ui.model.json.JSONModel");
	jQuerySap.require("jquery.sap.history");
	jQuerySap.require("ui5strap.App");

 	/*
 	* @Private
 	*/
	var _testRequirements = function(){
		if(!Object.keys){
			jQuery.sap.log.warning('Object.keys is not supported by the browser!');
			return false;
		}

		return true;
	};

	

	var _initConfig = function(pathToAppConfig, callback){
		var configModel = new sap.ui.model.json.JSONModel();
		
		configModel.attachRequestCompleted({}, function(){
			var configData = configModel.getData();

			if(!("app" in configData)){
				throw new Error('Invalid config data: app property missing!');
			}

			if(!('id' in configData.app)){
				configData.app["id"] = configData.app["package"].replace(/\./g, '__');
			}

			configData.app.url = pathToAppConfig;

			//Add the location of the sapp if its not specified
			if(!("location" in configData.app)){
				var sappUrlParts = pathToAppConfig.split('/');
				sappUrlParts[sappUrlParts.length - 1] = '';
				configData.app["location"] = sappUrlParts.join('/');
			}

			if(!("events" in configData)){
				configData.events = {};
			}

			if(!("views" in configData)){
				configData.views = {};
			}

			if(!("libraries" in configData)){
				configData.libraries = [];
			}

			if(!("models" in configData)){
				configData.models = [];
			}

			if(!("css" in configData)){
				configData.css = [];
			}

			if(!("js" in configData)){
				configData.js = [];
			}


			var config = {};

			config.data = configData;

			config.getFrame = function(){
				return this['data'].frames['default'];
			};

			config.getEvents = function(eventGroup, eventName, viewName){
				var eventList = [],
					configData = this.data;

				if(configData.events 
					&& configData.events[eventGroup] 
					&& configData.events[eventGroup][eventName]){
					eventList = eventList.concat(configData.events[eventGroup][eventName]);
				}
				
				if(viewName){
					var viewData = this.getViewData(viewName);
					if(viewData &&
						viewData.events 
						&& viewData.events[eventGroup] 
						&& viewData.events[eventGroup][eventName]){
						
						eventList = eventList.concat(viewData.events[eventGroup][eventName]);
					
					}
				}

				return eventList;
			};

			config.getMenuData = function(menuId){
				var menus = this.data.menus;
				if(!(menuId in menus)){
					return null;
				}
				return menus[menuId];
			};

			config.getViewData = function(viewName){
				var views = this.data.views;
				
				if(!(viewName in views)){
					return null;
				}
				
				return jQuery.extend({ viewName : viewName }, views[viewName]);
			};

			callback(config);
		});

		configModel.attachRequestFailed({}, function(){
			alert('Could not load app config!');
		});
		
		configModel.loadData(pathToAppConfig);
	};

	/*
	* Global ui5os compatibility object
	*/
	jQuery.sap.declare('ui5os');
	
	ui5os = {};

	ui5os.init = function(options, callback){

		if(!_testRequirements(this)){
			_fatalError(
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

			throw new Error('This device/browser is currently not supported!');

			return;
		}

		if(!("pathToServletRoot" in options)){
			throw new Error('Please specify servlet root in options.');
		}

		var pathToAppConfig = options.app.defaultValue;
		var onDeviceReady = function(){
			/*
			* Finally, initialize the app
			*/
			_initConfig(pathToAppConfig, function _initConfigSuccess(config){
				var configData = config.data;

				if("logLevel" in configData.app){
					jQuery.sap.log.setLevel(configData.app.logLevel);
				}

				document.title = configData.app.title;

				jQuery.sap.registerModulePath(configData.app['package'], configData.app["location"]);
				
				ui5os.app = new ui5strap.App(config, options);

			 	ui5os.app.init();

			 	callback && callback();
			});
		};

		if(options.cordova){
			document.addEventListener('deviceready', onDeviceReady, false);
		}
		else{
			onDeviceReady();
		}
	};

	var onMessage = function(event){
		ui5os.app.onMessage(event.data);
	};

	window.addEventListener("message", onMessage, false);

/*
	ui5os.ScriptBlock = function(){
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
				//	continue;
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
*/
	

}());;/*
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

  var jQuerySap = jQuery.sap;

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
		DismissModal : "DismissModal",
    ToggleNavbar : "ToggleNavbar",
    ToggleSidenav : "ToggleSidenav"
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

  jQuery.sap.declare("ui5strap.RenderUtils");

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
  * Require
  */

  var _callbackStack = [],
    _callbackTimer = null,
    _callbackPending = 0,
    _requiredModules = {};

  var _clearTimer = function(_this){
    if(null !== _callbackTimer){
      window.clearInterval(_callbackTimer);
      _callbackTimer = null;
      jQuerySap.log.debug('Require timer removed.');
    }
  };

  var _checkModules = function(_this){
    jQuerySap.log.debug('F liberty::_checkModules');
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
            throw new Error('Can not execute "' + request.modules[j] + '": Module never has been laoded.' );
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
          jQuerySap.log.debug('Module found: '+ request.modules[j]);
          
          
        }
      }

      if(0 === request.modules.length){
        console.log('No dependencies');
      }

      //Run the callback
      if(true === modulesExecuted){
        jQuerySap.log.debug('F liberty::_checkModules: callback called.');

        var callee = _callbackStack.shift();
        callee.callback();
      }
      else{
        jQuerySap.log.debug('F liberty::_checkModules: some modules are still loading.');
        break;
      }
    }
    
    //Callback stack empty, remove the timer
    if(0 === _callbackStack.length){
      _clearTimer(_this);
    }
  };

  ui5strap.controller = function(controllerName, controllerImpl){
          //Require a_ction modules
      jQuery.sap.require('ui5strap.Action');

      ui5strap.Action.blessController(controllerImpl);

      return sap.ui.controller(controllerName, controllerImpl);
  };

  ui5strap.require = function(modules, callback){
    var _this = this;

    if(typeof modules === 'string'){
      modules = [modules];
    }

    jQuerySap.log.debug('F liberty.require(' + modules.join(', ') + ')');
    
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
          jQuerySap.log.debug('F liberty.require: created timer.');
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
          jQuerySap.log.debug('F jQuery.coolui5.require: created timer.');
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
 * ui5strap.ActionContext
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */
 
(function ui5strapActionContext(){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.ActionContext');
	
	/*
	* Constructor for an action context
	* @Constructor
	*/ 
	var ActionContext = function(action){
		_init(this, action);
	},
	ActionContextProto = ActionContext.prototype;

	ui5strap.ActionContext = ActionContext;

	/*
	* Init context log
	* @Private
	*/
	var _initLog = function(_this){
		var context = _this;
		_this._log = {
			debug : function (message) {
				context.app.log.debug(context + ' ' + message);
			},

			warning : function (message) {
				context.app.log.warning(context + ' ' + message);
			},

			error : function (message) {
				context.app.log.error(context + ' ' + message);
			},

			info : function (message) {
				context.app.log.info(context + ' ' + message);
			},

			fatal : function (message) {
				context.app.log.fatal(context + ' ' + message);
			}
		};
	};

	/*
	* @Private
	*/
	var _init = function(_this, action){
		if(!("app" in action)){
			throw new Error('App reference required!')
		}

		_this.app = action.app;
		
		if("parameters" in action){

			if(typeof action.parameters !== 'object'){
					throw new Error('Parameters must be an object');
			}

			_this.DEFAULT = jQuery.extend(true, {}, action.parameters);
		}
		
		if("oEvent" in action){
			_this.oEvent = action.oEvent;
		}

		if("controller" in action){
			_this.controller = action.controller;

			_this.viewData = action.controller.getView().getViewData();
		}

		if("data" in action){
			_this.data = action.data;
		}

		_this.localStorage = localStorage ? localStorage : {};
		_this.sessionStorage = sessionStorage ? sessionStorage : {};
		
		//_this.window = window;
		//_this.document = document;
		
		ActionContext.ACTION_NO ++;

		_this._actionNo = ActionContext.ACTION_NO;

		_this._setId('ANONYMOUS');

		_this._callStack = [];

		_initLog(_this);
	
	};

	ActionContext.ACTION_PREFIX = 'a_';
	ActionContext.ACTION_NO = 0;

	/*
	* Creates an action parameter based on the prefix for actions
	* @Static
	*/
	ActionContext.createActionParam = function (parameterKey){
		return ActionContext.ACTION_PREFIX + parameterKey;
	};

	

	/*
	* Set context id
	* @Protected
	*/
	ActionContextProto._setId = function(actionGroupId){
		this[ActionContext.createActionParam('id')] = actionGroupId;
	};	

	/*
	* Get context id
	* @Protected
	*/
	ActionContextProto._getId = function(actionGroupId){
		return this[ActionContext.createActionParam('id')];
	};	

	/*
	* Gets a context parameter by key
	* @Protected
	*/
	ActionContextProto._getParameter = function(parameterKey){
			if(-1 !== parameterKey.indexOf('.')){
				var keyParts = parameterKey.split('.');
				var pointer = this;
				var i=0;
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
				var keyParts = parameterKey.split('.');
				var pointer = this;
				var i=0;
				while(i < keyParts.length){
					if(!(keyParts[i] in pointer) && (i < keyParts.length - 1)){
						pointer[keyParts[i]] = {};
					}	

					if(i === keyParts.length - 1){
						 pointer[keyParts[i]] = parameterValue;
					}
					
					pointer = pointer[keyParts[i]];
						i++;
					
				}
				return this;
			}	

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
	* Fetch additional data from a dom node and from the oEvent context
	* @Protected
	*/
	ActionContextProto._fetch = function(parameterKey){
			jQuery.sap.log.debug("F ActionContext::_fetch ('" + parameterKey + "')");

			var selector = this._getParameter(parameterKey + '.' + ActionContext.createActionParam('selector'));
			//read action parameters from dom node
			if(null !== selector){
				var selectors = ui5strap.Utils.parseIContent(selector);
				if(typeof selectors === 'string'){
					selectors = [selectors];
				}
				var selectorsLength = selectors.length;
				
				if(!("DOM" in this)){
					this.DOM = {};
				}
				

				for ( var i = 0; i < selectorsLength; i++ ){
					var selector = selectors[i];
					this.DOM[selector] = jQuery(selector).attr();
				}
			}

			var actionContext = this._getParameter(parameterKey + '.' + ActionContext.createActionParam('context'));
			if(null !== actionContext){
				if("OEVENT" in this){
					var eventParameters = this.OEVENT,
						eventParametersKeys = Object.keys(eventParameters),
						eventParametersKeysLength = eventParametersKeys.length;
					

					for( var i = 0; i < eventParametersKeysLength; i++ ){
						var paramKey = eventParametersKeys[i],
							eventParameterValue = eventParameters [paramKey];
							
							if(eventParameterValue instanceof sap.ui.core.Control){
								var context = eventParameterValue.getBindingContext(actionContext);
								if( typeof context !== 'undefined' ){
									var model = context.getModel();
									if(null !== model){
										var path = context.getPath(); 
										//console.log('P', path);

										if(!("CONTEXT" in this)){
											this.CONTEXT = {};
										}

										this.CONTEXT[actionContext] = {
												"model" : model,
												"path" : path,
												"data" : model.getProperty(path)
										};

									}
								}
								else{
									this._log.error('Invalid context: ' + actionContext);
								}
							}
					}
					
				}
			}
	};	

	/*
	* 
	* Executes an ui5strap.Action instance within this context.
	* @Protected
	*/
	ActionContextProto._run = function(instanceDef){
		instanceDef.index = this._callStack.length;
		this._callStack.push(instanceDef);

		var instanceDefSrc = instanceDef.module,
			oActionModule = ui5strap.Utils.getObject(instanceDefSrc),
			oAction = new oActionModule();
					
		if(!(oAction instanceof ui5strap.ActionModule)){
			throw new Error("Error in action '" + this + "':  '" + instanceDefSrc +  "' must be an instance of ui5strap.Action!");
		}

		oAction.init(this, instanceDef).execute();
	};


	/*
	* Run parameter functions
	* (usually taken from parameter a__functions)
	* @Protected
	*/
	ActionContextProto._functions = function(parameterKey){
		jQuery.sap.log.debug("F ActionContext::_functions ('" + parameterKey + "')");
		var paramFunctions = this._getParameter(parameterKey),
			availableFunctions = ui5strap.ActionFunctions;

		if(null !== paramFunctions){
			var paramFunctionsLength = paramFunctions.length;
			jQuery.sap.log.debug("Found " + paramFunctionsLength + " parameter functions.");
				
			for( var i = 0; i < paramFunctionsLength; i++ ){
				var functionDef = paramFunctions[i],
					functionName = functionDef['function'];

				if(functionName in availableFunctions){
					this._log.debug("Calling parameter function '" + functionName + "'");
					var funcResult = availableFunctions[functionName].call(this, functionDef.args);
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
	* @Public
	*/
	ActionContextProto.toString = function(){
		return '[' + this._getId() + '#' + this._actionNo + ']';
	};

}());;/*
 * 
 * ui5strap.ActionModule
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function ui5strapActionModule(){
//<-----

	var jQuerySap = jQuery.sap;

	jQuery.sap.declare("ui5strap.ActionModule");

	jQuerySap.require("ui5strap.ActionContext");

	sap.ui.base.Object.extend("ui5strap.ActionModule");

	var ActionModule = ui5strap.ActionModule,
		ActionModuleProto = ActionModule.prototype,
		ActionContext = ui5strap.ActionContext;

	ActionModule.ACTION_EVENT_NAME = 'run';

	/*
	* Reserved action attributes
	* @static
	*/
	ActionModule.PARAM_ACTION_CLASS = 'modules';
	ActionModule.PARAM_ACTION_GROUP_ID = 'id';
	ActionModule.PARAM_ACTION_CONTROLLER = 'controller';
	ActionModule.PARAM_ACTION_CONTEXT = 'context';
	ActionModule.PARAM_ACTION_SELECTOR = 'selector';
	ActionModule.PARAM_ACTION_EVENTS = 'events';
	ActionModule.PARAM_ACTION_FUNCTIONS = 'functions';

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

	/*
	* Initializes the action module
	*/
	ActionModuleProto.init = function(context, instanceDef){
		jQuery.sap.log.debug("F ActionModuleProto::init");

		this.context = context;
		this._instanceDef = instanceDef;

		if(instanceDef.namespace){
			this.namespace = instanceDef.namespace;
		}

		if(jQuery.sap.startsWith(this.namespace, ActionContext.ACTION_PREFIX)){
			throw new Error("Action namespace must not start with '" + ActionContext.ACTION_PREFIX + "'!");
		}

		var aId = (this._instanceDef.index + 1);
		this._actionName = "(" + this._instanceDef.module + "#" + aId + ")";
		this._actionNameShort = "";//"(" + aId + ")";

		return this;
	};

	ActionModuleProto.toString = function(){
		return this._instanceDef.module + ' (' + this.context + ')';
	};

	/*
	* Gets an action module specific parameter key definition
	* @public
	*/
	ActionModuleProto.getParameterDefinition = function(parameterKey){
		if(!(parameterKey in this.parameters)){
			return null;
		}

		return this.parameters[parameterKey];
	};	

	/*
	* Gets a property of an action module specific parameter key definition
	* @public
	*/
	ActionModuleProto.getParameterDefinitionField = function(parameterKey, fieldKey){
		var paramDef = this.getParameterDefinition(parameterKey);

		if(null === paramDef){
			return null;
		}

		if(!(fieldKey in paramDef)){
			return null;
		}

		return paramDef[fieldKey];
	};	

	/*
	* Creates a action module specific parameter key
	* @protected
	*/
	ActionModuleProto._createParameterKey = function(parameterKey){
		if(-1 !== parameterKey.indexOf('.')){
			return parameterKey;
		}
		return 'parameters.' + this.namespace + '.' + parameterKey;
	};	

	/*
	* Gets the value of an action module specific parameter
	* @public
	*/
	ActionModuleProto.getParameter = function(parameterKey){
		return this.context._getParameter(this._createParameterKey(parameterKey));
	};

	/*
	* Gets the parameter type of an action module specific parameter
	* @public
	*/
	ActionModuleProto.getParameterType = function(parameterKey){
		var paramValue = this.getParameter(parameterKey);
		if(null === paramValue){
			return false;
		}
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
		jQuery.sap.log.debug("F ActionModuleProto::execute");

		this.context._log.debug("START " + this._actionName);

		//Fetch additional local data
		this.context._fetch( 
			"parameters." 
			+ this.namespace
		);

		//Apply local parameter functions
		this.context._functions( 
			"parameters" 
			+ "." 
			+ this.namespace 
			+ "." 
			+ ActionContext.createActionParam(ActionModule.PARAM_ACTION_FUNCTIONS)
		);

		//Prepare parameters
		this.prepareParameters();

		//test if parameters match conditions
		if(!this.testConditions()){
				this.context._log.debug("Action '" + this._actionName + "' has not been executed cause conditions have not been met.");
		}
		else{
			this.validateParameters();

			this.run();
		}

		this.completed();

		this.context._log.debug("END " + this._actionName);
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
		this.context._log.debug("Testing conditions: '" + this.context.action_conditions + "'");
		return true;
	};	

	/*
	* Validate the parameters of this action module
	* @protected
	*/
	ActionModuleProto.validateParameters = function(){
		jQuery.sap.log.debug("F ActionModuleProto::validateParameters");

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

			var parameterType = this.getParameterType(paramKey);
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
			if( ( null !== parameterValue ) && ( -1 === jQuery.inArray(parameterType, paramDef.type) ) )
			{
				throw new Error(this._actionName + ": wrong type '" + parameterType + "' (expected: " + JSON.stringify(paramDef.type) + ") for parameter '" + publicParamKey + "'.");
			}

		}

		return true;
	};

	ActionModuleProto.findControl = function(){
		var theControl = null,
			controlId = this.getParameter("controlId"),
			scope = this.getParameter("scope");

		if("GLOBAL" === scope || "APP" === scope){
			theControl = this.context.app.getRootControl(); //sap.ui.getCore();
			
			if(null !== controlId){
				theControl = this.context.app.getControl(controlId, this.getParameter("viewId"));
			}
		}
		else if("VIEW" === scope){ 
			theControl = this.context.controller.getView();

			if(null !== controlId){
				theControl = this.context.app.getControl(controlId, theControl.getId());
			}
		}
		else if("SOURCE" === scope){
			if(!this.context.oEvent){
				throw new Error("Cannot use scope SOURCE: no oEvent");
			}

			theControl = this.context.OEVENT_SOURCE;
		}
		else if("SELECTION" === scope){
			if(!this.context.oEvent){
				throw new Error("Cannot use scope SELECTION: no oEvent");
			}

			theControl = this.context.OEVENT_SOURCE.getSelectedControl();
		}
		
		if(!theControl){
			throw new Error('Invalid control: ' + controlId);
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
		ui5strap.Action.fireEvents(
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
 * ui5strap.Action
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function ui5strapAction(){
	
	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.Action');

	jQuerySap.require("ui5strap.ActionContext");

	jQuerySap.require('ui5strap.ActionModule');

	sap.ui.base.Object.extend("ui5strap.Action");

	var Action = ui5strap.Action,
		ActionContext = ui5strap.ActionContext,
		ActionModule = ui5strap.ActionModule;

	Action.cache = {};

	/*
	* @Private
	* @Static
	*/
	var _getActionInstanceDef = function (actionSrcDef){
		var instanceDef = {};

		if(typeof actionSrcDef === 'string'){
			//Action Module def is a string, this means the namespace is taken from the action module constructor
			instanceDef.module = actionSrcDef;
		}	
		else if(typeof actionSrcDef === 'object'){
			//Action Module def is an object, it can contain a custom namespace 
			instanceDef = actionSrcDef;
		}
		else{
			//Action Module def is invalid
			throw new Error('Invalid action module: ' + actionSrcDef);
		}

		return instanceDef;
	};

	/*
	* Merge the parameters from custom data into the existing computed parameters
	* @Private
	*/
	var _mergeParameters = function(context){
			context._log.debug("Merging action parameters ...");
			context.parameters = jQuery.extend(true, {}, context.DEFAULT);

			//Custom Data
			if('CUSTOM_DATA' in context){
					var customData = context.CUSTOM_DATA;
					var customDataKeys = Object.keys(customData);
					var customDataKeysLength = customDataKeys.length;
					
					for ( var i = 0; i < customDataKeysLength; i++ ){
							var customDataKey = customDataKeys[i];
							var iContent = ui5strap.Utils.parseIContent(customData[customDataKey]);
							if(typeof iContent === 'string'){
								//iContent is a string, just set or replace the value in the parameter pool
								context.parameters[customDataKey] = iContent;
							}
							else{ 
								//iContent is an object, if parameter already exists in pool, deep copy, otherwise just set
								if(customDataKey in context.parameters){
									jQuery.extend(true, context.parameters[customDataKey], iContent);
								}
								else{
									context.parameters[customDataKey] = iContent;
								}

							} 
					}
				

			}

			//Load additional data from DOM nodes and Control Context
			context._fetch("parameters");

			//Apply global parameter functions
			context._functions( 
				"parameters" 
				+ "." 
				+ ActionContext.createActionParam("functions")
			);
				
	};

	/*
	* Fetch parameters from oEvent
	* @Private
	*/
	var _populateFromEvents = function(context){
			context._log.debug("Fetching action parameters ...");
			
			//Standard SAPUI5 Event
			if("oEvent" in context){ 
				//Get custom data
				var oEventSource = context.oEvent.getSource();
				if(null !== oEventSource){
					var customData = oEventSource.data();
					if(null !== customData){
						context.CUSTOM_DATA = customData;
					}

					context.OEVENT_SOURCE = oEventSource;
				}

				//Event parameters (e.g. from a list selection)
				var eventParameters = context.oEvent.getParameters();
				if(null !== eventParameters){
					context.OEVENT = eventParameters;
				}
			}

			_mergeParameters(context);
	};

	/*
	* Load an action group from a json file
	* @Private
	*/
	var _populateFromFile = function(context, actionGroupSrc, callback){
		context._log.debug("Populating from file '" + actionGroupSrc + "'...");
					
		var actionGroups = Action.cache,
			actionGroupIdParamKey = ActionContext.createActionParam(ActionModule.PARAM_ACTION_GROUP_ID);
		

		if(actionGroupSrc in actionGroups){
			var action = actionGroups[actionGroupSrc];

			context.DEFAULT = action;
			_mergeParameters(context);

			callback(action);
			
			return;
		}

		jQuery.ajax({
			"dataType": "json",
			"url": jQuery.sap.getModulePath(actionGroupSrc) + '.action.json',
			"success": function(data){
				if(actionGroupIdParamKey in data){
					throw new Error('Action group must not contain a "' + actionGroupIdParamKey + '" attribute!');
				}
				
				context._log.debug("Loaded Action Group '" + actionGroupSrc + "' from '" + context.url + "'" );

				actionGroups[actionGroupSrc] = data;
				
				context.DEFAULT = data;
				_mergeParameters(context);

				callback(data);
			},
			"error" : function(data){
				throw new Error('Invalid action group: "' + actionGroupSrc + '"');
			}
		});
	};

	/*
	* Executes a list of action modules
	* @Private
	*/
	var _executeModules = function(context, actionSources){
		if(typeof actionSources === 'string'){
			actionSources = [actionSources];
		}

		var jsModules = [],
			instanceDefs = [],
			actionSourcesLength = actionSources.length;
				
		for ( var i = 0; i < actionSourcesLength; i++ ) { 
			var actionInstanceDef = _getActionInstanceDef(actionSources[i]);
			instanceDefs.push(actionInstanceDef);
			jsModules.push(actionInstanceDef.module);
		}

		
		ui5strap.require(jsModules, function anon_loadActionModulesComplete(){
			var instanceDefsLength = instanceDefs.length;
			for ( var i = 0; i < instanceDefsLength; i++ ) { 
				var instanceDef = instanceDefs[i];
				context._run(instanceDef);
			}
		});
	};

	/*
	* Executes the action modules that are defined in the class parameter of the current context
	* @Private
	*/
	var _execute = function(context){
		var actionSrcParamKey = ActionContext.createActionParam(ActionModule.PARAM_ACTION_CLASS);
		var actionSrc = context._getParameter(actionSrcParamKey);
		if(null !== actionSrc){
			context._deleteParameter(actionSrcParamKey);
			var actionSources = ui5strap.Utils.parseIContent(actionSrc);
				
			context._log.debug("START ACTION '" + context + "' ...");

			_executeModules(context, actionSources);
		}
		else{
				throw new Error("Invalid action '" + context + "': '" + actionSrcParamKey + "' attribute is missing!");
		}
	};

	/*
	* Run events
	* @Protected
	*
	*/
	Action.fireEvents = function(context, parameterKey, eventName){
		var paramEvents = context._getParameter(
			parameterKey
			+ "." 
			+ ActionContext.createActionParam(ActionModule.PARAM_ACTION_EVENTS)
		);

		if(null !== paramEvents){
			if(eventName in paramEvents){
				context._log.debug("Triggering event actions '" + eventName + "'...");

				_executeModules(context, paramEvents[eventName]);
			}
			else{
				//jQuery.sap.log.debug("Could not trigger event: '" + eventName + "'...");
			}
		}	
	};

	/*
	* Runs an action
	* 
	* An action is an object of the following format:
	*
	* {
	*    "app" : liberty.App
	*    "controller" :
	*    "parameters" : {
	*		   	PREFIX + "id" : string,
	*			PREFIX + "modules" : string,
	*			PREFIX + "functions" : [],
	*			PREFIX + "context" : string,
	*			PREFIX + "selector" : string,
	*			PREFIX + "events" : {}
	*    }	
	* }
	*
	* @Static
	*/
	Action.run = function(action){
		jQuerySap.log.debug("F Action::run");
		var actionGroupIdParamKey = ActionContext.createActionParam(ActionModule.PARAM_ACTION_GROUP_ID);

		if("parameters" in action 
			&& typeof action.parameters === 'string'){
			var actionGroupId = action.parameters;

			action.parameters = {};

			action.parameters[actionGroupIdParamKey] = actionGroupId;
			
			Action.run(action);
			
			return false;
		}

		var context = new ActionContext(action);

		_populateFromEvents(context);

		var actionId = context._getParameter(actionGroupIdParamKey);
		if(null !== actionId){ 
			context._log.debug("Found action group alias id '" + actionId + "'.");
			
			context._deleteParameter(actionGroupIdParamKey);
			context._setId(actionId);
			
			var actionIds = ui5strap.Utils.parseIContent(actionId),
				actionGroupId = null,
				actionIdsType = typeof actionIds; 
			
			if(actionIdsType === 'string'){
				actionGroupId = actionIds;
			}
			else if(actionIdsType === 'object'){
				//If you have more than one event type in the control, you have to map the actionGroupIds
				if(!(action.oEvent.sId in actionIds)){
					throw new Error("Error in action '" + actionId + "': No '" + actionGroupIdParamKey + "' defined for event '" + action.oEvent.sId + "'!");
				}
				actionGroupId = actionIds[action.oEvent.sId];
				
			}
			else{
				throw new Error("Error in action '" + actionId + "': Invalid '" + actionGroupIdParamKey + "' value!");
			}

			_populateFromFile(context, actionGroupId, function anon_loadActionGroupComplete(actionGroupDef){
				_execute(context);
			});
			
		}
		else{ 
			_execute(context);
		}
	};

	var _createActionEventHandler = function(controllerImpl, eventName){
		var eventFunctionName = 'on' + jQuery.sap.charToUpperCase(eventName, 0);
		var oldOnPageShow = eventFunctionName in controllerImpl ? controllerImpl[eventFunctionName] : null;

		controllerImpl[eventFunctionName] = function(customEventData){ 
			var _this = this,
				view = this.getView(),
				viewData = view.getViewData();

			if(viewData && viewData.app && viewData.options){
				var updateEvents = viewData.app.config.getEvents('controller', eventName, viewData.options.viewName),
					updateEventsLength = updateEvents.length,
					viewId = view.getId();

				for(var i = 0; i < updateEventsLength; i++){
				 	var actionGroupId = updateEvents[i];
					viewData.app.log.debug("Executing action '" + actionGroupId + "' (view: '" + viewId + "', event: '" + eventName + "') ...");
					ui5strap.Action.run({
						"parameters" : actionGroupId, 
						"controller" : _this,
						"app" : viewData.app,
						"data" : customEventData
					});
				}
			}
			
			if(null !== oldOnPageShow){
				oldOnPageShow.call(this, customEventData);
			}
		};
	};

	/*
	* @Static
	*/
	Action.blessController = function(controllerImpl){

		var eventHandler = ActionContext.createActionParam(ActionModule.ACTION_EVENT_NAME);
		
		controllerImpl[eventHandler] = function(oEvent){
			var viewData = this.getView().getViewData();

			if(viewData && 'app' in viewData){
				Action.run({
					"oEvent" : oEvent, 
					"controller" : this,
					"app" : viewData.app
				});
			}
			else{
				throw new Error('Cannot run action: no app reference present in view data!');
			}
		};

		var oldOnInit = 'onInit' in controllerImpl ? controllerImpl.onInit : null;

		controllerImpl.onInit = function(oEvent){ 
			var _this = this,
				view = this.getView(),
				viewData = view.getViewData();

			if(viewData && viewData.app && viewData.options){
				//Finally, run all the init actions
				var initEvents = viewData.app.config.getEvents('controller', 'init', viewData.options.viewName),
					initEventsLength = initEvents.length,
					viewId = view.getId();

				for(var i = 0; i < initEventsLength; i++){
					var actionGroupId = initEvents[i];
					viewData.app.log.debug("Executing action '" + actionGroupId + "' (view: '" + viewId + "', event: 'onInit') ...");
						Action.run({
							"parameters" : actionGroupId, 
							"oEvent" : oEvent,
							"controller" : _this,
							"app" : viewData.app  
						});
				} 
			}

			//Call old onInit function
			if(null !== oldOnInit){
				oldOnInit.call(this, oEvent);
			}
		};

		//Page Hide
		_createActionEventHandler(controllerImpl, 'update');

		//Page Hide
		_createActionEventHandler(controllerImpl, 'pageHide');
		
		//Page Hidden
		_createActionEventHandler(controllerImpl, 'pageHidden');
		
		//Page Show
		_createActionEventHandler(controllerImpl, 'pageShow');
		
		//Page Shown
		_createActionEventHandler(controllerImpl, 'pageShown');
		
	};

}());;/*
 * 
 * UI5Strap
 *
 * Frame Controller for the Liberty Platform
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
 *
 * ATTENTION: NEVER CHANGE THIS FILE!
 *
 */

(function(){

	jQuery.sap.declare("ui5strap.AppFrame");
	
	sap.ui.base.Object.extend("ui5strap.AppFrame");

	var AppFrame = ui5strap.AppFrame,
		AppFrameProto = AppFrame.prototype;

	/*
	*
	* STATIC FIELDS & METHODS
	*
	*/

	/*
	*
	* PRIVATE METHODS
	*
	*/

	/*
	* @Private
	*/
	var _createPrivateProperties = function(_this){
		/*
		* Configuration
		*/
		var _config = null;

		/*
		* @Public
		*/
		_this.setConfig = function(newConfig){
			_config = newConfig;
		};

		/*
		* @Public
		*/
		_this.getConfig = function(){
			return _config;
		};

		/*
		* The app that owns this frame
		*/
		var _owner = null;

		/*
		* @Public
		*/
		_this.setOwner = function(newOwner){
			_owner = newOwner;
		};

		/*
		* @Public
		*/
		_this.getOwner = function(){
			return _owner;
		};

		/*
		* @Public
		*/
		_this.getApp = function(){
			return _owner;
		};
	};

	/*
	*
	* PUBLIC METHODS
	*
	*/

	/*
	 * Must be explicitely called from outside
	 * @PostConstruct
	 * @Public
	 */
	AppFrameProto.init = function(){
		_createPrivateProperties(this);
	
		this._pageCache = {};

		this._targetStatus = {};

		this.vTargets = {};

		this.oTargets = {};

		this.initialized = false;
	};

	AppFrameProto.initHistory = function(){

	};

	/*
	* Shows the initial content defined in app configuration
	* @Public
	*/
	AppFrameProto.showInitialContent = function(callback){
		jQuery.sap.log.debug('[FR] Show initial frame content...');

		var _this = this,
			frameOptions = this.getConfig().getFrame(),
			initialViews = frameOptions.initialViews,
			callI = initialViews.length;

		var complete = function(){
			//jQuery.sap.log.debug(callI + '/' + initialViews.length);

			callI--;
			if(callI === 0){
				//jQuery.sap.log.debug('[FR] Initial frame content loaded. Executing callbacks...');

				if(!_this.initialized){
					_this.initialized = true;
				}

				callback && callback();
			}
		}

		for(var i = 0; i < initialViews.length; i++){
			var initialViewData = jQuery.extend({}, initialViews[i]);
			if(!_this.initialized){
				initialViewData.transition = 'none';
			}
			this.gotoPage(initialViewData, complete);
		}

	};


	/*
	 * Places the frame's NavContainer in the dom
	 * @Public
	 */
	AppFrameProto.placeAt = function(domId){
		return this.getNavContainer().placeAt(domId);
	};

	/*
	* Override this method as a SINGLETON
	* @Public
	*/
	AppFrameProto.getNavContainer = function(){
		if(!this._navContainer){
			var frameConfig = this.getConfig().getFrame(),
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
			this._navContainer = new NavContainerConstructor(navContainerOptions);
		}

		return this._navContainer;
	};

	/*
	* Returns the currently shown page within the NavContainer's target
	* @Public
	*/
	AppFrameProto.getCurrentPage = function (target) {
		return this.getNavContainer().getAggregation(target);
	};

	/*
	* Returns whether the frame supports the specified target
	* @Public
	*/
	AppFrameProto.hasTarget = function(target) {
		return target in this.getNavContainer().getAggregations();
	}
	
	AppFrameProto.clearTarget = function(target, callback) {
		this.getNavContainer().toPage(
			null,
			target,
			'transition-slide',
			callback
		);
	};

	AppFrameProto.updatePage = function(page, parameters){
		//this.getNavContainer().updateTarget(target, parameters);
		var controller = page.getController();
		if(controller && "onUpdate" in controller){
			jQuery.sap.log.debug('[FR] Trigger event "update" for page "' + page.getId() + '"');
		
			controller.onUpdate({ parameters : parameters });
		}
	};

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

	AppFrameProto.validatePage = function(viewDef){
		var viewConfig = this.getConfig().getViewData(viewDef.viewName),
			viewOptions = {};
		
		if(null === viewConfig){
			viewConfig = {};
		}

		jQuery.extend(viewOptions, viewConfig, viewDef);

		if(!viewOptions.viewName || !viewOptions.target || !viewOptions.type){
			throw new Error('Page data must contain at least "viewName", "type", and "target" attributes.');
		}

		if(viewOptions.target in this.oTargets){
			var overrideTarget = this.oTargets[viewOptions.target];
			delete this.oTargets[viewOptions.target];
			return this.validatePage(overrideTarget);
			
		}

		var viewConstructor = {};

		jQuery.extend(viewConstructor, viewOptions);

		if(!("viewData" in viewConstructor)){
			viewConstructor.viewData = {};
		}

		viewConstructor.viewData.app = this.getOwner();
		viewConstructor.viewData.options = viewOptions;
		viewConstructor.viewData.config = viewConfig;
		viewConstructor.viewData.def = viewDef;

		return viewConstructor;
	};

	/*
	 * Create a new page
	 */
	AppFrameProto.createPage = function(viewConstructor){
		//id specified
		if("id" in viewConstructor){
			var pageId = viewConstructor.id;
			var cachedPage = this._pageCache[pageId];

			if(cachedPage){

				cachedPage.getViewData().def = viewConstructor.viewData.def;

				return cachedPage;
			}

			viewConstructor.id = this.getApp().createControlId(pageId);
		}

		var page = new sap.ui.view(viewConstructor);

		if(viewConstructor.styleClass){
			page.addStyleClass(viewConstructor.styleClass);
		}
			
		this._pageCache[pageId] = page;
		
		return page;
	};

	/*
	 * Shows a page defined by given data
	 * @Public
	 */
	AppFrameProto.toPage = function (viewConstructor, callback) {
		var _this = this,
			target = viewConstructor.target,
			oPage = this.createPage(viewConstructor);

		if(viewConstructor.vTarget){
			this.vTargets[target] = oPage;
		
			return;
		}

		if (viewConstructor.writeHistory && this.getConfig().data.app.history) {
			jQuery.sap.history.addHistory(target, viewConstructor.viewData.def, viewConstructor.bookmarkable, viewConstructor.virtual);
		}

		if(viewConstructor.documentTitle){
			var titlePath = viewConstructor.documentTitle.split('>');
			if(titlePath.length === 2){ 
				var ressourceModel = sap.ui.getCore().getModel(titlePath[0]);
				if(ressourceModel){
					document.title = ressourceModel.getProperty(titlePath[1]);
				}
			}
		}

		//Set target busy
		jQuery.sap.log.debug('[FR][' + target + '] TARGET BUSY');
		this._targetStatus[target] = true;

		this.updatePage(oPage, viewConstructor.parameters);

		//Change NavContainer to page
		this.getNavContainer().toPage(
			oPage, 
			target, 
			viewConstructor.transition,
			function(){
				//Set target available
				delete _this._targetStatus[target];
				jQuery.sap.log.debug('[FR][' + target + "] TARGET AVAILABLE");
				
				//Trigger callback
				callback && callback();
			}
		);
		
	};

	/*
	* @Public
	*/
	AppFrameProto.gotoPage = function (viewDef, callback) {
		var viewData = this.validatePage(viewDef);
		
		this.toPage(viewData, callback);
	};

}());;/*
 * 
 * UI5Strap
 *
 * Button
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
 * Button Renderer
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
 * Icon
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
 * Icon Renderer
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
		rm.addClass(iconGroup);
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
 * Link
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
 * Link Renderer
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
		ui5strap.RenderUtils.renderContent(rm, oControl);
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
 * Text
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
 * Paragraph
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
			title = oControl.getTitle();

		if(ui5strap.TextType.Default === type){
			rm.writeEscaped(oControl.getText());
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
			
			ui5strap.RenderUtils.renderContent(rm, oControl);
			
			rm.write("</" + tagName + ">");

		}
		
		ui5strap.RenderUtils.renderTrail(rm, oControl);
	};

}());
;/*
 * 
 * UI5Strap
 *
 * TextInput
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
 * TextInputRenderer
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
 * RadioButton
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
 * RadioButtonRenderer
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
 * SelectBox
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
 * SelectBoxRenderer
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
 * ListItem
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
 * ListItem Renderer
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

	jQuery.sap.declare("ui5strap.ListItemRenderer");

	ui5strap.ListItemRenderer = {
	};

	ui5strap.ListItemRenderer.render = function(rm, oControl) {
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

		ui5strap.RenderUtils.renderContent(rm, oControl);

		rm.write("</li>");
	};

}());;/*
 * 
 * UI5Strap
 *
 * Nav
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
 * ListLinkItem
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
 * ListLinkItem Renderer
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
 * ListGroupItem
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
 * ListGroupItem Renderer
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

	jQuery.sap.declare("ui5strap.ListGroupItemRenderer");

	ui5strap.ListGroupItemRenderer = {
	};

	ui5strap.ListGroupItemRenderer.render = function(rm, oControl) {
		var badge = oControl.getBadge(),
			parent = oControl.getParent(),
			tag = parent.getContainer() ? 'a' : 'li';

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
		this.setProperty('text', newText);
	};

}());;/*
 * 
 * UI5Strap
 *
 * ListMediaItem Renderer
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

	jQuery.sap.declare("ui5strap.ListMediaItemRenderer");

	ui5strap.ListMediaItemRenderer = {
	};

	ui5strap.ListMediaItemRenderer.render = function(rm, oControl) {
		var parent = oControl.getParent(),
			media = oControl.getMedia(),
			heading = oControl.getHeading(),
			tag = !(parent instanceof ui5strap.ListMedia) || parent.getContainer() ? 'div' : 'li';

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
		
		ui5strap.RenderUtils.renderContent(rm, oControl);
		
		rm.write('</div>');
		    
		rm.write("</"+ tag + ">");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * Base Control for any kind of Row Content
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

	jQuery.sap.declare("ui5strap.RowContent");
	
	sap.ui.core.Control.extend("ui5strap.RowContent", {
		metadata : {

			

		}
	});

}());;/*
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
 * Tooltip Renderer
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
 * ui5strap
 *
 * Sending app message
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
 * ui5strap
 *
 * ActionModule to call a method of a control
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
			"defaultValue" : "GLOBAL", 
			"type" : "string"
		},
		"funcName" : {
			"required" : true,

			"type" : "string"
		},
		"funcArgs" : {
			"required" : false,
			"defaultValue" : null, 
			"type" : "object"
		},
		"tgtParam" : {
			"required" : false,
			"defaultValue" : null,
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
 * ui5strap
 *
 * AMChangeTheme
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
 * ui5strap
 *
 * Dummy Action that does noething
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

(function(){

	jQuery.sap.declare("ui5strap.AMDummy");
	jQuery.sap.require("ui5strap.ActionModule");

	ui5strap.ActionModule.extend("ui5strap.AMDummy");

	/*
	* @Override
	*/
	ui5strap.AMDummy.prototype.run = function(){
		 
	};

}());;/*
 * 
 * ui5strap
 *
 * GetPropertyAction
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
		"controlId" : {
			"required" : true, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "GLOBAL", 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"tgtParam" : {
			"required" : true, 
			"type" : "string"
		}
	};

	/*
	* @Override
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
 * ui5strap
 *
 * AMGotoPage
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
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
		},
		"parameters" : {
			"required" : false, 
			"defaultValue" : null, 
			"type" : "object"
		}
	};

	/*
	* @Override
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
 * ui5strap
 *
 * AMJsAlert
 *
 * Simple Action that creates a standard JavaScript Alert. Used for quick testing actions.
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
 * ui5strap
 *
 * AMLoadModel
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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

	AMLoadModel.SCOPE_VIEW = "VIEW";
	AMLoadModel.SCOPE_GLOBAL = "GLOBAL";

	/*
	* @Override
	*/
	AMLoadModelProto.namespace = 'loadModel';

	/*
	* @Override 
	*/
	AMLoadModelProto.parameters = {
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
		"src" : {
			"required" : true, 
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
		"type" : {
			"required" : true, 
			"type" : "string"
		},
		"modelName" : {
			"required" : true, 
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "VIEW", 
			"type" : "string"
		},
		"dataPath" : {
			"required" : false, 
			"defaultValue" : null, 
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
				modelUrl = this.context.app.resolvePath(this.getParameter("src"));

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
 * ui5strap
 *
 * AMSetModel
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
		"modelName" : {
			"required" : true, 
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

			theControl.setModel(new sap.ui.model.json.JSONModel(data), modelName);

			this.context._log.debug("Model '" + modelName + "' (parameterName: '" + parameterName + "', scope: '" + this.getParameter("scope") + "') set.");
	};

}());;/*
 * 
 * ui5strap
 *
 * AMSetProperty
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
		"controlId" : {
			"required" : true, 
			"type" : "string"
		},
		"viewId" : {
			"required" : false,
			"defaultValue" : null,
			"type" : "string"
		},
		"scope" : {
			"required" : false, 
			"defaultValue" : "GLOBAL", 
			"type" : "string"
		},
		"propertyName" : {
			"required" : true, 
			"type" : "string"
		},
		"value" : {
			"required" : true, 
			"type" : ["int", "boolean", "string", "object"]
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
 * ui5strap
 *
 * AMUnloadModel
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
		"modelName" : {
			"required" : true, 
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
 * ui5strap
 *
 * AMWorker
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
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
 * ui5strap
 * 
 * ActionController
 * 
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */

 jQuery.sap.require('ui5strap.Action');

var controllerImpl = {

};

ui5strap.Action.blessController(controllerImpl);

sap.ui.controller("ui5strap.ActionController", controllerImpl);;/*
 * 
 * ui5strap.ActionFunctions
 *
 * Author: Jan Philipp Knöller
 * 
 * Copyright (c) 2013 Philipp Knöller Software
 * 
 * http://ui5strap.com
 *
 * Released under Apache2 license: http://www.apache.org/licenses/LICENSE-2.0.txt
 * 
 */
 
(function ui5strapActionFunctions(){
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
 * Alert
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
 * Alert Renderer
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
	* ui5strap.App
	*
	*/

(function(){

	var jQuerySap = jQuery.sap;

	jQuerySap.declare('ui5strap.App');

	sap.ui.base.Object.extend('ui5strap.App', {
		"constructor" : function(config, options){
			sap.ui.base.Object.apply(this);
			
			this.config = config;
			this.options = options;

			this._events = {};
		}
	});

	var App = ui5strap.App,
		AppProto = App.prototype;

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
				jQuery.sap.log.debug("[APP] PRELOAD " + consoleOutput);
				callback && callback();
			}
		};

		for(var viewSrc in views){
			var viewData = views[viewSrc];
			if(viewData.preload && 'HTML' === viewData.type){
				//We are currently only able to cache HTML views
				var viewUrl = sap.ui.core.mvc.HTMLView._getViewUrl(viewSrc);

				if(viewUrl in sap.ui.core.mvc.HTMLView._mTemplates){
					viewCallback();
				}
				else{ 
					jQuery.ajax({
							"url" : viewUrl,
							"cache" : true,
							"dataType" : "text",
							"success" : function(text){
								consoleOutput += viewSrc + " ";
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

	/*
	* Preload JavaScript libraries
	*/
	var _preloadJavaScript = function(js, appBase, callback){
		if(!js || js.length === 0){
			callback && callback();

			return;
		}
		
		jQuery.sap.log.debug('Loading JavaScript files...');

		var scripts = [];
		for(var i = 0; i < js.length; i++){
			var scr = js[i],
				jsPath = appBase + "/" + scr;
			
			if(typeof scr === 'object'){
				jsPath =("package" in scr ? jQuery.sap.getModulePath(scr['package']) : appBase) + "/" + scr.src;
			}
			scripts.push(jsPath);
		}

		var scriptBlock = new ui5strap.ScriptBlock();

		scriptBlock.load(scripts, function(){
			scriptBlock.execute(true);

			callback && callback();
		});
	};

	var _initStyle = function(css, appBase, callback){
		if(!css || css.length === 0){
			callback && callback();

			return;
		}

		var callI = css.length;
		var success = function(){
			callI--;
			if(callI === 0){
				callback && callback();
			}
		};

		var error = function(){
				throw new Error('Could not load css file: ');
		};

		
		for (var i = 0; i < css.length; i++){
			var sheet = css[i],
				sheetSrc = appBase + "/" + sheet,
				cssId = 'ui5strap-css-' + i;
			
			if(typeof sheet === 'object'){
				sheetSrc =("package" in sheet ? jQuery.sap.getModulePath(sheet['package']) : appBase) + "/" + sheet.src;
				if("id" in sheet){
					cssId = sheet.id;
				}
			}

			jQuery.sap.log.debug('[APP] LOAD STYLESHEET ' + sheetSrc + ' ...');
			jQuery.sap.includeStyleSheet(sheetSrc, cssId, success, error);
		}
	};

	var _preloadCss = function(css, appBase, callback){
		//TODO FIXME
		//We are using requestAnimationFrame as indicator for browser moderness
		if (window.requestAnimationFrame){
			//Brosers that support requestAnimationFrame surely support onload on stylesheets
			_initStyle(css, appBase, callback);
		}
		else{
			//Old browsers that do not support onload on stylesheets
			_initStyle(css, appBase);

			window.setTimeout(callback, 500);
		}
	};

	var _preloadModels = function(_this, models, appBase, callback){
		//Models
		var callI = models.length, 
			successCallback = function(oEvent, oData){
				callI --;
				//jQuery.sap.log.debug('[APP] LOADED MODEL ' + oData.modelName + ' ...');
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
				modelSrc = ("package" in model ? jQuery.sap.getModulePath(model["package"]) : appBase) + "/" + model['src'];

			
			if(modelType === 'RESOURCE'){
				oModel = new sap.ui.model.resource.ResourceModel({
					bundleUrl : modelSrc
					,
					async : true
				});
				//successCallback({}, { modelName: modelName, oModel : oModel });
				oModel.attachRequestCompleted({ modelName: modelName, oModel : oModel }, successCallback);
				oModel.attachRequestFailed({ modelName: modelName, modelSrc : modelSrc }, errorCallback);
			}
			else if(modelType === 'JSON'){
				oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(modelSrc);
				oModel.attachRequestCompleted({ modelName: modelName, oModel : oModel }, successCallback, oModel);
				oModel.attachRequestFailed({ modelName: modelName, modelSrc : modelSrc }, errorCallback);
			}
			else{
				throw new Error('Invalid model type!');
			}
		}
	};

	var _onStart = function(_this){
 		var startEvents = _this.config.getEvents('app', 'start'),
			startEventsLength = startEvents.length;
			
		for(var i = 0; i < startEventsLength; i++){
		 	var actionGroupId = startEvents[i];
			_this.log.debug("Executing action '" + actionGroupId + "' (event: 'start') ...");
			ui5strap.Action.run({
				"parameters" : actionGroupId, 
				"app" : _this  
			});
		}
 	};

 	/*
 	* @Private
 	*/
	var _start = function(_this){
		jQuery.sap.log.debug('[APP] START');
		
		_this.getFrame().showInitialContent(function showInitialContentComplete(){
			_this.setLoaderVisible(false, function(){
				_this.setSplashVisible(false, function(){
					_onStart(this);
				});
			});
		});
		
	};

	/*
	* @Private
	*/
	var _setLayerVisible = function(_this, statusVarName, $layer, option, visible, callback){
			if(visible && _this[statusVarName] || $layer.length === 0){
				if(typeof callback === 'function'){ 
					callback.call(_this);
				}
				return this;
			}

			_this[statusVarName] = visible;

			if(visible){
				$layer.css({
					display : 'block',
					opacity : 0
				});

				if(option){
					$layer.attr('class', $layer.attr('id') + '-' + option);
				}
			}

			window.setTimeout(function(){

				$layer.animate(
					{
						opacity: visible ? 1 : 0,
				  	}, 
				  	250, 
				  	function() {
					    if(!visible){
					    	$layer.css('display', 'none');
					    }

					    if(typeof callback === 'function'){ 
							callback.call(_this);
						}
					}
				);

			}, 50);
			
	};

	/*
	* Init sapplication specific logging
	* @protected
	*/
	AppProto._initLog = function(){
		
		this.log = {

			debug : function (message) {
				jQuery.sap.log.debug(message);
			},

			warning : function (message) {
				jQuery.sap.log.warning(message);
			},

			error : function (message) {
				jQuery.sap.log.error(message);
			},

			info : function (message) {
				jQuery.sap.log.info(message);
			},

			fatal : function (message) {
				jQuery.sap.log.fatal(message);
			}

		};
	};

	/*
	* Initializes the App
	*/
	AppProto.init = function(){
		var app = this,
			_this = this;

		this._initLog();

		var _configData = this.config.data;

		var appBase = _configData.app['location'],
			libs = _configData.libraries,
			models = _configData.models;

		//Libraries
		for(var i = 0; i < libs.length; i++){
			var lib = libs[i],
				libPackage = lib['package'];

			if(libPackage === 'ui5os' ||
				libPackage === 'ui5strap'){
				throw new Error('Do not include the libraries "ui5strap" and "ui5os" into your libraries configuration.');
			}
			jQuerySap.registerModulePath(libPackage, lib['location']);

			if(lib.preload){
				
				jQuerySap.require(libPackage + '.library');

				var consoleOutput = '',
					libData = sap.ui.getCore().getLoadedLibraries()[libPackage];
				
				for(var j = 0; j < libData.elements.length; j++){
					consoleOutput += libData.elements[j] + " ";
					jQuerySap.require(libData.elements[j]);
				}

				for(var j = 0; j < libData.controls.length; j++){
					consoleOutput += libData.controls[j] + " ";
					jQuerySap.require(libData.controls[j]);
				}

				jQuerySap.log.debug('[APP] PRELOAD ' + consoleOutput); 
			}
		}

		//Init Frame
		var frame = this.initFrame('default');

		_preloadModels(_this, models, appBase, function(){
			frame.placeAt('ui5strap-body');

			//Preloading
			_preloadCss(_configData.css, appBase, function preloadCssComplete(){

				var themeName = _configData.app.theme;

				if(themeName){
					_this.setTheme(themeName);
				}

				_preloadJavaScript(_configData.js, appBase, function preloadJavaScriptComplete(){
					_preloadViews(_configData.views, function preloadViewsComplete(){
						_start(_this);
					});
				});
			});
		});

		
		

		
	};

	/*
	* Initializes the frame module
	*/
	AppProto.initFrame = function(frameId){
		var configData = this.config.data;

		if(!(frameId in configData.frames)){
			throw new Error('Cannot set frame: frame id not defined in configuration.');
		}

		//jQuery.sap.log.debug('Setting the frame controller...');

		//Frame
		var frameOptions = configData.frames[frameId],
			frameModule = frameOptions.module;
		
		jQuery.sap.require(frameModule);

		var FrameConstructor = jQuery.sap.getObject(frameModule),
			frame =  new FrameConstructor();
		
		/*
		* Getter for frame module instance
		*/
		this.getFrame = function(){
			return frame;
		};

		this.frame = frame;

		frame.init();
		frame.setConfig(this.config);
		frame.setOwner(this);

		frame.initHistory();

		return frame;
	};

	
	/*
	* Returns the configuration object
	*/
	AppProto.getConfig = function(){
		return this.config;
	};

	/*
	* Returns the ID of the App
	*/
	AppProto.getId = function(){
		return this.config.data.app.id;
	};

	/*
	* Returns the Dom ID of the App
	*/
	AppProto.getDomId = function(){
		return this.config.data.app.id.replace(/\./g, '__');
	};

	/*
	* Returns the Control with the given controlId. Depending if a viewId is specified, the controlId must be global or local.
	*/
	AppProto.getControl = function(controlId, viewId){
		return sap.ui.getCore().byId(this.createControlId(controlId, viewId));
	};

	AppProto.getRootControl = function(){
		return this.frame.getNavContainer();
	}; 

	/*
	* Create an control id with app namespace. If viewId is given, the controlId must be local.
	*/ 
	AppProto.createControlId = function(controlId, viewId){

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
	* Sets the theme of the app
	*/
	AppProto.setTheme = function(themeName){
		if(!themeName || "base" === themeName){
			sap.ui.getCore().applyTheme("base");
			return;
		}

		if(jQuery.sap.startsWith(themeName, "sap_")){
			sap.ui.getCore().applyTheme(themeName);
			return;
		}
		//sap.ui.getCore().setThemeRoot(themeName, );
		sap.ui.getCore().applyTheme(themeName, this.options.pathToServletRoot + '/theme');
	};
	
	/*
	* Loader
	*/
	AppProto.loaderVisible = false;
	AppProto.$loader = jQuery('#ui5strap-loader');

	AppProto.setLoaderVisible = function(visible, callback, option){
		_setLayerVisible(this, 'loaderVisible', this.$loader, option, visible, callback);
	};

	/*
	* Splash Screen
	*/
	AppProto.splashVisible = false;
	AppProto.$splash = jQuery('#ui5strap-splash');

	AppProto.setSplashVisible = function(visible, callback, option){
		_setLayerVisible(this, 'splashVisible', this.$splash, option, visible, callback);
	};

	/**
	* Triggered when a message is sent to this app
	* @public
	*/
	AppProto.onMessage = function(appMessageEvent){
		this.fireEventAction({ 
			"scope" : "app",
			"eventName" : "message",
			"data" : appMessageEvent
		});
	};

	/*
	* App messages from a Ui5Strap app is directly passed to the current window's parent, if available.
	*/
	AppProto.sendMessage = function(appMessage){
		appMessage.sender = this.getId();

		if(appMessage.toParent && self !== top){
	    	parent.postMessage(appMessage, '*');
	    }
	};

	/*
	* Run an action that is assiged to a certain event
	* @public
	*/
	AppProto.runEventAction = function (eventParameters, actionGroupId){
		this.log.debug("Executing event '" + eventParameters.scope + '/' + eventParameters.eventName + "' ...");
		var actionParameters = {
			"parameters" : actionGroupId, 
			"app" : this  
		};

		if("oEvent" in eventParameters){
			actionParameters.oEvent = eventParameters.oEvent;
		}

		if("controller" in eventParameters){
			actionParameters.controller = eventParameters.controller;
		}

		if("data" in eventParameters){
			actionParameters.data = eventParameters.data;
		}

		ui5strap.Action.run(actionParameters);
	};

	/*
	* Fires an app event. 
	* The event is either defined in the configuration, or attached to the app instance programatically.
	* @public
	*/
	AppProto.fireEventAction = function(eventParameters){
		if(!("events" in this.config.data)){
			return;
		}

		var appEvents = this.config.data.events;
		
		//Run the events that are defined in the config
		if(eventParameters.scope in appEvents){
			var events = appEvents[eventParameters.scope];

			if(eventParameters.eventName in events){
				for(var i in events[eventParameters.eventName]){ 
					this.runEventAction(eventParameters, events[eventParameters.eventName][i]);
				}
			}

		}

		if(eventParameters.scope in this._events){
			var events = this._events[eventParameters.scope];
			if(eventParameters.eventName in events){
				for(var i in events[eventParameters.eventName]){ 
					this.runEventAction(eventParameters, events[eventParameters.eventName][i]);
				}
			}
		}
	};

	/*
	* Registers an event action to this app instance
	* @public
	*/ 
	AppProto.registerEventAction = function(scope, eventName, actionGroupDef){
		if(!(scope in this._events)){
			this._events[scope] = {};
		}

		if(!(eventName in this._events[scope])){
			this._events[scope][eventName] = [];
		}
				
		this._events[scope][eventName].push(actionGroupDef);
	};
}());;/*
 * 
 * UI5Strap
 *
 * Badge
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
 * Badge Renderer
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
 * Bar
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

	jQuery.sap.declare("ui5strap.Bar");

	sap.ui.core.Control.extend("ui5strap.Bar", {
		metadata : {

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
 * Bar Renderer
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

	jQuery.sap.declare("ui5strap.BarRenderer");

	var BarRenderer = {};

	ui5strap.BarRenderer = BarRenderer;

	BarRenderer.render = function(rm, oControl) {
		var inverse = oControl.getInverse();

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
		var contentLeft = oControl.getLeft();
		if(null !== contentLeft){     
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
		var contentMiddle = oControl.getMiddle();
		if(null !== contentMiddle){     
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
		var contentRight = oControl.getRight();
		if(null !== contentRight){     
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
 * Breadcrumb
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

	jQuery.sap.declare("ui5strap.Breadcrumb");
	jQuery.sap.require("ui5strap.library");
	jQuery.sap.require("ui5strap.ListBase");
	jQuery.sap.require("ui5strap.ListItem");
	
	ui5strap.ListBase.extend("ui5strap.Breadcrumb", {
		metadata : {

			library : "ui5strap"
			
		}
	});

}());; /*
 * UI5Strap
 *
 * Breadcrumb Renderer
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
 * Break
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
 * Break Renderer
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

	jQuery.sap.declare("ui5strap.BreakRenderer");

	ui5strap.BreakRenderer = {};

	ui5strap.BreakRenderer.render = function(rm, oControl) {
		rm.write("<br />");
	};

}());;/*
 * 
 * UI5Strap
 *
 * Button Dropdown
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

}());; /*
 * UI5Strap
 *
 * Button Dropdown Renderer
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
 * ButtonGroup
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

}());; /*
 * UI5Strap
 *
 * Button Group Renderer
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
 * Button Toolbar
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

}());; /*
 * UI5Strap
 *
 * Button Toolbar Renderer
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
 * Carousel
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

	jQuery.sap.declare("ui5strap.Carousel");


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
        interval : {
          type:"int", defaultValue : 0
        }
			},
			aggregations : {

				"items" : {}

			},
			events : {
				"change" : {}
			}

		}
	});

  var CarouselProto = ui5strap.Carousel.prototype;

	CarouselProto.init = function(){
		this.pagesCount = 0;
	};

	CarouselProto.onAfterRendering = function(){
		var _this = this,
        interval = this.getInterval();
		this.$().carousel({ 
      interval : (interval > 0 ? interval : false)
    })
		.on('slide.bs.carousel', function (e) {

		})
		.on('slid.bs.carousel', function () {
  			var newIndex = _this.$().data("bs.carousel").getActiveIndex();
  			_this.setProperty('index', newIndex, true);
  			_this.fireChange();
		});
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

  CarouselProto.nextPage = function(){
      this.$().carousel('next');
  }; 

  CarouselProto.previousPage = function(){
      this.$().carousel('prev');
  };

  CarouselProto.cycle = function(pause){
     if(pause){
          this.$().carousel('pause');
     }
     else{
          this.$().carousel('cycle');
     }
  };

}());

/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

/*
  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })
*/

}(jQuery);;/*
 * 
 * UI5Strap
 *
 * Carousel Renderer
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

	jQuery.sap.declare("ui5strap.CarouselRenderer");

	ui5strap.CarouselRenderer = {
	};

	ui5strap.CarouselRenderer.render = function(rm, oControl) {
		var items = oControl.getItems(),
			itemsLength = items.length,
			carouselId = oControl.getId();
		 	
		 	rm.write("<div");
		    rm.writeControlData(oControl);
		    rm.addClass("carousel slide");
		    rm.writeClasses();
		    rm.write(">");

		    if(oControl.getPagination()){ 
				    rm.write("<ol id='" + oControl.getId() + "--carousel-indicators'");
				    rm.addClass("carousel-indicators");
				    rm.writeClasses();
				    rm.write(">");
				    for(var i = 0; i < itemsLength; i++){
			    		rm.write("<li");
			    		rm.addClass("carousel-indicator");
			    		if(i === oControl.getIndex()){
					    	rm.addClass("active");
						}
						rm.writeAttribute('data-slide-to', i);
						rm.writeAttribute('data-target', '#' + carouselId);
						rm.writeClasses();
					    rm.write(">");
						rm.write("</li>");
					}
				    rm.write("</ol>");
			}

		    rm.write("<div");
		    rm.addClass("carousel-inner");
		    rm.writeClasses();
		    rm.write(">");

		    for(var i = 0; i < itemsLength; i++){
		    		rm.write("<div");
				    rm.addClass("item");
				    
				    if(i === oControl.getIndex()){
					    	rm.addClass("active");
						}
						rm.writeClasses();
				    rm.write(">");
				    rm.renderControl(items[i]);
				    
				    rm.write("</div>");
		    }
		    
			rm.write("</div>");
		    
			if(oControl.getControls()){ 
		    	    rm.write("<a");
				    rm.addClass("left carousel-control");
				    rm.writeAttribute('href', '#' + carouselId);
				    rm.writeAttribute('data-slide', 'prev');
				   	rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-left"></span>');
				    rm.write("</a>");
				
				    rm.write("<a");
				    rm.addClass("right carousel-control");
				    rm.writeAttribute('href', '#' + carouselId);
				    rm.writeAttribute('data-slide', 'next');
				    rm.writeClasses();
				    rm.write(">");
				    rm.write('<span class="glyphicon glyphicon-chevron-right"></span>');
				    rm.write("</a>");
			}
				
			

		    rm.write("</div>");
	};

}());
;/*
 * 
 * UI5Strap
 *
 * Checkbox for forms
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
 * form.CheckboxRenderer
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
 * Base Control for any kind of Row Content
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

	jQuery.sap.declare("ui5strap.Clearfix");
	jQuery.sap.require("ui5strap.RowContent");
	jQuery.sap.require("ui5strap.library");
	
	ui5strap.RowContent.extend("ui5strap.Clearfix", {
		metadata : {

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
 * Clearfix Renderer
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
 * Col
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

	jQuery.sap.declare("ui5strap.Col");
	jQuery.sap.require("ui5strap.RowContent");

	ui5strap.RowContent.extend("ui5strap.Col", {
		metadata : {

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
 * Col Renderer
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
 * Container
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
 * Container Renderer
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
 * form.Form
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
 * form.FormGroup
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
 * form.FormGroupRenderer
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
 * form.FormRenderer
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
 * Heading
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
 * Heading Renderer
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
			type = oControl.getType();
			

		rm.write("<h" + level);
		rm.writeControlData(oControl);

		if(ui5strap.HeadingType.Default !== type){
			rm.addClass(this.typeToClass[type]);
		}
		
		rm.writeClasses();
		rm.write(">");
		    
		ui5strap.RenderUtils.renderContent(rm, oControl);
		    
		rm.write("</h" + level + ">");
	};

}());;/*
 * 
 * UI5Strap
 *
 * Universal Html Tag
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
 * Badge Renderer
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

	jQuery.sap.declare("ui5strap.HtmlTagRenderer");

	ui5strap.HtmlTagRenderer = {};

	ui5strap.HtmlTagRenderer.render = function(rm, oControl) {

		var content = oControl.getContent(),
			tagName = oControl.getTagName(),
			text = oControl.getText();

		rm.write("<" + tagName);
		rm.writeControlData(oControl);
		rm.writeClasses();
		rm.write(">");
		
		if('' !== text){
			rm.writeEscaped(text);
		}

		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}

		rm.write("</" + tagName + ">");

	};

}());;/*
 * 
 * UI5Strap
 *
 * Image
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
 * Image Renderer
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
 * InputGroup
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
 * InputGroup Renderer
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
 * Item
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
 * Jumbotron
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
 * Jumbotron Renderer
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
 * Label
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
 * Label Renderer
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
 * Horizontal Line
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
 * Line Renderer
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
 * List
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
 * ListDropdownItem
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
 * ListLinkItem Renderer
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
 * Dropdown Menu
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

}());; /*
 * UI5Strap
 *
 * Dropdown Menu Renderer
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
 * ListGroup
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
 * ListGroup Renderer
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
 * ListMedia
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
 * ListMedia Renderer
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
 * ListNavItem
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
 * ListNavItem Renderer
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
; /*
 * UI5Strap
 *
 * List Renderer
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
 * Modal
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
 * Modal
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
 * Nav
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
 * NavBar
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
 * NavBar Renderer
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
 * NavContainer Base Class
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

	jQuery.sap.declare("ui5strap.NavContainer");
	jQuery.sap.require("ui5strap.library");

	sap.ui.core.Control.extend("ui5strap.NavContainer", {
		metadata : {
			library : "ui5strap",
			
			properties : {
				defaultTransition : {
					type : "string",
					defaultValue : 'transition-slide'
				},
				defaultTarget : {
					type : "string",
					defaultValue : 'content'
				},
				name : {
					type : "string",
					defaultValue : 'default'
				},
				options : {
					type : "string",
					defaultValue : ''
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

	var _requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
	})();

	/*
	* @Private
	*/
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

	//jQuery.sap.log.debug('Transition-end event is: ' + _transitionEndEvent);

	var _triggerControllerEvent = function(target, page, eventName, parameters){
		if(null !== page){
			var controller = page;
			if(page instanceof sap.ui.core.mvc.View){
				controller = page.getController();
			}
			if(controller && eventName in controller){
				jQuery.sap.log.debug('[NC][' + target + '] Trigger event "' + eventName + '" for page "' + page.getId() + '"');
			
				controller[eventName](parameters ? parameters : {});
			}
			//else{
			//	jQuery.sap.log.debug('[NC][' + target + '] Event "' + eventName + '" not defined for page "' + page.getId() + '"');
			//}
		}
	};

	/*
	* Constructs a Transition
	* @Constructor
	* @Private
	*/
	var _Transition = function(transitionName, $currentRoot, $nextRoot, transitionId){
		this.$current = $currentRoot;
		this.$next = $nextRoot;
		this._transitionId = transitionId;
		
		var transitionClass = transitionName;

		this.prepare = function (){
			if('none' === transitionClass){
				return;
			}

			if(null !== this.$current){
					this.$current.addClass(transitionClass + ' ' + transitionClass+'-current');
			}

		 	if(null !== this.$next){
					this.$next.addClass(transitionClass + ' ' + transitionClass+'-next').removeClass('navcontainer-page-hidden');
			}
		};

		this.execute = function (currentRootCallback, nextRootCallback){
			if('none' === transitionClass){
				if(null !== this.$next){
					this.$next.removeClass('navcontainer-page-hidden');
				}

				var _this = this;
				_requestAnimFrame(function(){
					currentRootCallback && currentRootCallback.call(_this);
					nextRootCallback && nextRootCallback.call(_this);
				});

				return;
			}

		 	if(null !== _transitionEndEvent){
	 			if(typeof currentRootCallback === 'function' && null !== this.$current){ 	
					this.$current
					//	.off(transitionEndEvent)
					.one(_transitionEndEvent, jQuery.proxy(currentRootCallback, this));

				}
				if(typeof nextRootCallback === 'function' && null !== this.$next){ 	
					this.$next
					//.off(transitionEndEvent)
					.one(_transitionEndEvent, jQuery.proxy(nextRootCallback, this));
				}
	 		}

	 		if(null !== this.$current){
				this.$current.addClass(transitionClass+'-current-out');
			}
							
			if(null !== this.$next){			
				this.$next.removeClass(transitionClass + '-next');
			}
			
			if(null === _transitionEndEvent){ 
				currentRootCallback && currentRootCallback.call(this);
				nextRootCallback && nextRootCallback.call(this);
			}

		 };

	};

	/*
	* @Private
	*/
	var _prepareTransition = function(pageChange){
		//jQuery.sap.log.debug('[NC]' + pageChange.changeName + ' PREPARE');

		var transition = new _Transition(
				pageChange.transitionName, 
				pageChange.$current, 
				pageChange.$next, 
				'transition-' + pageChange.target
			);
			
			pageChange.transition = transition;

			transition.prepare();
	};


	/*
	*
	* PRIVATE FIELDS & METHODS
	*
	*/

	/*
	* @Private
	*/
	var _prepareTransitions = function(_this){
		for(var i = 0; i < _this._pendingTransitions.length; i++){
			var pageChanges = _this._targetTransitions[_this._pendingTransitions[i]];
			_prepareTransition(pageChanges[pageChanges.length-1]);
		}	
	};

	var _transitionCallback = function(_this, pageChange, transList){
		transList.callI --;
		var callbacksLength = transList.callbacks.length;
		
		if(0 === callbacksLength){
			//jQuery.sap.log.debug('[NC][' + pageChange.target + '] No transition callbacks');

			return;
		}

		if(0 === transList.callI){
			jQuery.sap.log.debug('[NC][' + pageChange.target + '] Trigger ' + callbacksLength + ' callbacks');

			for(var i = 0; i < callbacksLength; i++){
				transList.callbacks[i]();
			}
		}
		else{
			jQuery.sap.log.debug('[NC][' + pageChange.target + '] Skipped callbacks');
		}
	};

	/*
	* @Private
	*/
	var _executeTransition = function(_this, pageChange, transList){
		jQuery.sap.log.debug('[NC]' + pageChange.changeName + ' EXECUTE');
		
		pageChange.transition.execute(
			function anon_transitionCurrentComplete(){
				
				var $current = this.$current;
				if(null !== $current){
					$current.remove();
				}

				//onPageHidden event
				_triggerControllerEvent(pageChange.target, pageChange.currentPage, 'onPageHidden', {
					newPage : pageChange.page
				});

				//If next page is null, then execute the callbacks when old page has been hidden
				if(pageChange.page === null){
					_transitionCallback(_this, pageChange, transList);
				}
			}, 
			function anon_transitionPreparedComplete(){
				this.$next.attr('class', 'navcontainer-page navcontainer-page-current');
				
				//onPageShown event
				_triggerControllerEvent(pageChange.target, pageChange.page, 'onPageShown', {
					oldPage : pageChange.currentPage
				});

				//Transition callback
				_transitionCallback(_this, pageChange, transList);
			}
		);

	};

	/*
	* @Private
	*/
	var _executeTransitions = function(_this){
		var pendingTransitionsLength = _this._pendingTransitions.length;

		if(0 === pendingTransitionsLength){
			jQuery.sap.log.debug("[NC] No pendings transitions.");

			return;
		}
		
		jQuery.sap.log.debug("[NC] Execute " + pendingTransitionsLength + " pending transitions...");
		
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
	var _pageTransitions = function(_this){
		_requestAnimFrame(function(){

			_prepareTransitions(_this);
			
			_requestAnimFrame(function(){
				_executeTransitions(_this);

				_this._pendingTransitions = [];
				_this._targetTransitions = {};
			});
		
		});
	};

	/*
	* @Private
	*/
	var _pageChange = function(_this, pageChange){
		jQuery.sap.log.debug('[NC]' + pageChange.changeName + ' SINGLE PAGE CHANGE');
		_requestAnimFrame(function _pageChangeFrame1(){

			_prepareTransition(pageChange);
			
			_requestAnimFrame(function _pageChangeFrame2(){
				
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
			_this._targetTransitions[target].push(pageChange);
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
			
			var currentPage = _this.mAggregations[target];
			if(currentPage){
				_triggerControllerEvent(target, currentPage, 'onPageHide', {
					newPage : page
				});
			}

			_this.targets[target] = page;

			if(null === page){
				return null;
			}

			//Add new page to DOM
			var newPage = document.createElement('div'),
				newClassName = 'navcontainer-page';
			if(true === isPrepared){
				 newClassName += ' navcontainer-page-next navcontainer-page-hidden';
			}
			newPage.className = newClassName;
			newPage.id = _this.pageDomId(target, page);
				
			var $nextContent = jQuery(newPage);
			jQuery('#' + _this.targetPagesDomId(target)).append($nextContent);
			
			//var uiArea = sap.ui.getCore().createUIArea(newPage, _this);
			jQuery.each(_this.oModels, function (sName, oModel){
				//page.setModel(oModel, sName);
				page.oPropagatedProperties.oModels[sName] = oModel;
				page.propagateProperties(sName);
			});
			
			//uiArea.addContent(page);

			page.placeAt(newPage);

			_triggerControllerEvent(target, page, 'onPageShow', {
				oldPage : currentPage
			});
			
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

		this._initNavContainer();
	};

	NavContainerBaseProto._initNavContainer = function(){
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
			return 'navcontainer-page-' + this._targetPagesCount[target];
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

	NavContainerBaseProto.destroy = function(){
		for(var target in this.targets){
			if(this.targets[target]){
				this.targets[target].destroy();
			}
		}
		sap.ui.core.Control.prototype.destroy.call(this);
	};

	/*
	NavContainerBaseProto.onlocalizationChanged = function(oEvent){ 
		for(var target in this.targets){
			if(this.targets[target]){ 
				//
				//this.targets[target].updateBindingContext(false, false, null, true);
				//this.targets[target].updateBindings(true);
				this.targets[target].rerender(true);
				//alert(target);
			}
		}
	};

	*/
	

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

	NavContainerBaseProto.getClassString = function(){
		var navContainerClassName = "navcontainer-" + this.getName(),
				options = this.getOptions();

		var classes = "navcontainer " + navContainerClassName;
	    if('' !== options){
	    	options = options.split(' ');
	    	for(var i = 0; i < options.length; i++){
	    		classes += ' ' + navContainerClassName + '-' + options[i];
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

	NavContainerBaseProto.isOptionEnabled = function(optionName){
		return -1 !== jQuery.inArray(optionName, this.getOptions().split(' '));
	};

	NavContainerBaseProto.toggleOption = function(optionName){
		var isOptionEnabled = this.isOptionEnabled(optionName);
		var options = {};
		options[optionName] = !isOptionEnabled;
		this.setOptionsEnabled(options);
	};

	/*
	* @Public
	* @Override
	*/
	NavContainerBaseProto.setName = function(newName){
		if(this.getDomRef()){
			this.setProperty('name', newName, true);
			this.$().attr('class', this.getClassString());
		}
		else{
			this.setProperty('name', newName);
		}
	};

	/*
	* @Public
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

	NavContainerBaseProto.updateTarget = function(target, parameters){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		_triggerControllerEvent(target, this.targets[target], 'onUpdate', {
			parameters : parameters
		});
	};

	/*
	* @Public
	*/
	NavContainerBaseProto.toPage = function(page, target, transitionName, callback){
		if(!(target in this.targets)){
			throw new Error('NavContainer does not support target: ' + target);
		}

		///jQuery.sap.log.debug('[NC][' + target + '] toPage ("' + (page ? page.getId() : 'None') + '")');

		var _this = this,
			currentPage = this.targets[target];

		if(this.getDomRef() && currentPage === page){
			jQuery.sap.log.debug('[NC][' + target + '] page is current');

			callback && callback();
			
			return false;
		}

		var changeTransitionName = transitionName ? transitionName : this.getDefaultTransition();

		var changeName = '[' + target + '] '
							+ (null === currentPage ? 'None' : '"' + currentPage.getId() + '"') 
							+ ' => '
							+ (null === page ? 'None' : '"' + page.getId() + '"')
							+ ' ("'
							+ changeTransitionName + '")';

		var $currentPage = jQuery('#' + this.createPageDomId(target, currentPage)),
			targetTransition = {
				changeName : changeName,
				target : target,
				transitionName : changeTransitionName,
				transition : null,
				"$current" : $currentPage.size() > 0 ? $currentPage : null,
				"$next" : null,
				placed : false,
				callback : callback,
				page : page,
				currentPage : currentPage
			};

		

		if(this.getDomRef()){
			targetTransition.$next = _placePage(this, target, page, true);
			targetTransition.placed = true;
			
			window.setTimeout(function anon_afterDomTimeout(){
				_pageChange(_this, targetTransition);	
			}, 250);
		
		}
		else{
			_pageChangeLater(_this, targetTransition, true);
			
		}

		return true;
	};

	NavContainerBaseProto.onBeforeRendering = function(){
		for(var target in this.targets){
			var currentPage = this.targets[target];
			if(currentPage){
				_pageChangeLater(this, {
					changeName : "test",
					target : target,
					transitionName : 'none',
					transition : null,
					"$current" : null,
					"$next" : null,
					placed : false,
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
		var _pendingTransitions = this._pendingTransitions,
			pendingTransitionsLength = _pendingTransitions.length,
			_this = this;

		for(var i = 0; i < pendingTransitionsLength; i++){
			var targetTransitions = this._targetTransitions[_pendingTransitions[i]],
				targetTransition = targetTransitions[targetTransitions.length - 1];

			if(!targetTransition.placed && null === targetTransition.$next){
				targetTransition.$next = _placePage(this, targetTransition.target, targetTransition.page, true); 
				targetTransition.placed = true;
			}
		}

		window.setTimeout(function anon_afterDomTimeout(){
			_pageTransitions(_this);	
		}, 250);
	};

}());;/*
 * 
 * UI5Strap
 *
 * Renderer for Standard Nav Container
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
 * Standard Nav Container with navbar and content
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

	jQuery.sap.require("ui5strap.NavContainer");
	jQuery.sap.declare("ui5strap.NavContainerStandard");
	
	ui5strap.NavContainer.extend("ui5strap.NavContainerStandard", {
		metadata : {

			
			// ---- object ----
			defaultAggregation : "content",
			
			// ---- control specific ----
			library : "ui5strap",
			
			properties : { 
				name : {
					type : "string",
					defaultValue : 'standard'
				},
				options : {
					type : "string",
					defaultValue : ''
				}
			}

		},

		renderer : "ui5strap.NavContainerRenderer"
	});

	ui5strap.NavContainerStandard.prototype._initNavContainer = function(){
		this.targets = {
			"content" : null,
			"sidebar" : null,
			"navbar" : null
		};
	};

}());; /*
 * UI5Strap
 *
 * Nav Renderer
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
 * Page
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
 * Page Header
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
 * Page Header Renderer
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
 * Page Renderer
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

	jQuery.sap.declare("ui5strap.PageRenderer");

	ui5strap.PageRenderer = {};

	ui5strap.PageRenderer.render = function(rm, oControl) {
		var head = oControl.getHead(),
			content = oControl.getBody(),
			footer = oControl.getFooter();

		rm.write("<div");
		
		rm.addClass('page');
		
		rm.writeClasses();
		rm.write(">");
		
		if(null !== head){
			rm.write("<div class='page-head'>");
			rm.renderControl(head);
			rm.write("</div>");
		}

		rm.write("<div class='page-body'>");
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		rm.write("</div>");

		if(null !== footer){
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
 * Pager
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
 * Pager Renderer
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
 * Pagination
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

}());; /*
 * UI5Strap
 *
 * Pagination Renderer
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
; /*
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

}());;/*
 * 
 * UI5Strap
 *
 * PanelGroupRenderer
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

}());; /*
 * 
 * UI5Strap
 *
 * Panel Renderer
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

	jQuery.sap.declare("ui5strap.PanelRenderer");

	ui5strap.PanelRenderer = {};

	ui5strap.PanelRenderer.render = function(rm, oControl) {
		var panelType = oControl.getSeverity(),
			collapse = oControl.getCollapse(),
			panelTitle = oControl.getTitle();

		rm.write("<div");
		rm.writeControlData(oControl);
		rm.addClass("panel");
		if(oControl.getCollapse()){
			rm.addClass('panel-collapsible');
		}
		if(ui5strap.Severity.None !== panelType){
			rm.addClass("panel-" + ui5strap.BSSeverity[panelType]);
		}
		rm.writeClasses();
		rm.write(">");
		
		if('' !== panelTitle){
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
 * Paragraph
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
 * Paragraph
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

	jQuery.sap.declare("ui5strap.ParagraphRenderer");

	ui5strap.ParagraphRenderer = {};

	ui5strap.ParagraphRenderer.render = function(rm, oControl) {
		var content = oControl.getContent(),
			severity = oControl.getSeverity();

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
		
		var subText = oControl.getText();
		if('' !== subText){
			rm.writeEscaped(subText);
		}
		
		for(var i = 0; i < content.length; i++){ 
			rm.renderControl(content[i]);
		}
		
		rm.write("</p>");
	};

}());
;/*
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
 * Popover Renderer
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
 * Progress
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
 * Progress bar
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
 * Progress bar Renderer
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
 * Progress Renderer
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
 * Row
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
					type : "ui5strap.RowContent"
				}
			}

		}
	});


}());;/*
 * 
 * UI5Strap
 *
 * Row Renderer
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
 * UiStrap
 * 
 * CONTROL Sandbox
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
		iframe.id = this.getId() + '----iframe';
		this.$iframe = jQuery(iframe);
	};


	SandboxProto.setSrc = function(src){
		this.$iframe.attr('src', src);
		this.setProperty('src', src, this.getDomRef());
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
 * Ui5Strap
 * 
 * Renderer SandboxRenderer
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
 * ScrollContainer
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

}());;/*
 * 
 * UI5Strap
 *
 * ScrollContainer Renderer
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

	jQuery.sap.declare("ui5strap.ScrollContainerRenderer");

	ui5strap.ScrollContainerRenderer = {};

	ui5strap.ScrollContainerRenderer.render = function(rm, oControl) {
		var content = oControl.getContent();

		//TODO: implement as classes (first, we need a ui5strap stylesheet)
		var elStyle = 'width:100%; height:100%;-webkit-overflow-scrolling: touch;';
		
		elStyle += 'overflow-x:' + (oControl.getHorizontal() ? 'scroll' : 'hidden') + ';';
		elStyle += 'overflow-y:' + (oControl.getVertical() ? 'scroll' : 'hidden') + ';';
				

		rm.write("<div style='" + elStyle + "'");
		rm.writeControlData(oControl);
		rm.addClass("ui5strap-scroll-container");
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
 * Sidebar
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
 * Sidebar Renderer
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
 * TabContainer
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
 * TabContainer Renderer
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
 * Table
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
 * Table column
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
 * Table Renderer
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
 * Table row
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
 * Thumbnail
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
 * Thumbnail Renderer
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
 * Well
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
 * Well Renderer
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
