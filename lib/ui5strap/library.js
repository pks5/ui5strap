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
  	version: "0.0.2"});

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

	jQuery.sap.declare("ui5strap.TextType");

	ui5strap.TextType = {
		Default : "Default",
		Strong : "Strong",
		Blockquote : "Blockquote",
		Paragraph : "Paragraph"
	};

	jQuery.sap.declare("ui5strap.ListType");

	ui5strap.ListType = {
		Unordered : "Unordered",
		Ordered : "Ordered"
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
		Horizontal : "Horizontal"
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

	jQuery.sap.declare("ui5strap.NavBarAlignment");

	ui5strap.NavBarAlignment = {
		Default : "Default",
		Left : "Left",
		Right : "Right",
		None : "None"
	};

	ui5strap.BSNavBarAlignment = {
		Left : "navbar-left",
		Right : "navbar-right"
	};

	jQuery.sap.declare("ui5strap.NavType");

	ui5strap.NavType = {
		Tabs : "Tabs",
		Pills : "Pills",
		Default : "Default"
	};

	jQuery.sap.declare("ui5strap.ContainerType");

	ui5strap.ContainerType = {
		Default : "Default",
		Page : "Page",
		Fluid : "Fluid"
	};


}());