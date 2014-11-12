/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */

jQuery.sap.declare("sap.ui.commons.MenuItemBase");

/**
 * @class Provides the standard properties for menu items.
 * @extends sap.ui.unified.MenuItemBase
 *
 * @author SAP SE 
 *
 * @public
 * @deprecated Since version 1.21.0. 
 * Please use the control sap.ui.unified.MenuItemBase of the library sap.ui.unified instead.
 * @name sap.ui.commons.MenuItemBase
 */

(function(){

try{
	sap.ui.getCore().loadLibrary("sap.ui.unified");
}catch(e){
	alert("The controls/elements 'sap.ui.commons.Menu*' needs library 'sap.ui.unified'.");
	throw(e);
}

jQuery.sap.require("sap.ui.unified.MenuItemBase");

sap.ui.commons.MenuItemBase = sap.ui.unified.MenuItemBase;

})();