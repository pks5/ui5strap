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

	jQuery.sap.declare("de_pksoftware.ui5strap.library");
	jQuery.sap.require("sap.ui.core.Core");

	sap.ui.getCore().initLibrary({
	  name : "de_pksoftware.ui5strap",
	  dependencies : [],
	  types: [
	  	"de_pksoftware.ui5strap.Size",
	  	"de_pksoftware.ui5strap.Type"
	  ],
	  interfaces: [],
	  controls: [],
	  elements: [],
  	version: "0.0.1"});

	jQuery.sap.declare("de_pksoftware.ui5strap.Size");

	de_pksoftware.ui5strap.Size = {
		ExtraSmall : "ExtraSmall",
		Small : "Small",
		Medium : "Medium",
		Large : "Large",
		Default : "Default"
	};

	de_pksoftware.ui5strap.BSSize = {
		ExtraSmall : "xs",
		Small : "sm",
		Medium : "md",
		Large : "lg"
	};

	jQuery.sap.declare("de_pksoftware.ui5strap.Severity");

	de_pksoftware.ui5strap.Severity = {
		Default : "Default",
		Primary : "Primary",
		Success : "Success",
		Warning : "Warning",
		Info : "Info",
		Danger : "Danger",
		None : "None"
	};

	de_pksoftware.ui5strap.BSSeverity = {
		Default : "default",
		Primary : "primary",
		Success : "success",
		Warning : "warning",
		Info : "info",
		Danger : "danger"
	};

	jQuery.sap.declare("de_pksoftware.ui5strap.FormSeverity");

	de_pksoftware.ui5strap.FormSeverity = {
		Success : "Success",
		Warning : "Warning",
		Error : "Error",
		None : "None"
	};

	de_pksoftware.ui5strap.BSFormSeverity = {
		Success : "success",
		Warning : "warning",
		Error : "error"
	};

	jQuery.sap.declare("de_pksoftware.ui5strap.FormType");

	de_pksoftware.ui5strap.FormType = {
		Default : "Default",
		Horizontal : "Horizontal"
	};

	jQuery.sap.declare("de_pksoftware.ui5strap.NavBarType");

	de_pksoftware.ui5strap.NavBarType = {
		Default : "Default",
		None : "None"
	};

	de_pksoftware.ui5strap.BSNavBarType = {
		Default : "navbar-default"
	};

	jQuery.sap.declare("de_pksoftware.ui5strap.NavBarPosition");

	de_pksoftware.ui5strap.NavBarPosition = {
		Default : "Default",
		FixedTop : "FixedTop",
		FixedBottom : "FixedBottom",
		StaticTop : "StaticTop"
	};

	de_pksoftware.ui5strap.BSNavBarPosition = {
		FixedTop : "navbar-fixed-top",
		FixedBottom : "navbar-fixed-bottom",
		StaticTop : "navbar-static-top"
	};

	jQuery.sap.declare("de_pksoftware.ui5strap.NavBarAlignment");

	de_pksoftware.ui5strap.NavBarAlignment = {
		Default : "Default",
		Left : "Left",
		Right : "Right",
		None : "None"
	};

	de_pksoftware.ui5strap.BSNavBarAlignment = {
		Left : "navbar-left",
		Right : "navbar-right"
	};

	jQuery.sap.declare("de_pksoftware.ui5strap.NavType");

	de_pksoftware.ui5strap.NavType = {
		Tabs : "Tabs",
		Pills : "Pills",
		Default : "Default"
	};

	de_pksoftware.ui5strap.BSNavType = {
		Tabs : "nav-tabs",
		Pills : "nav-pills"
	};
}());