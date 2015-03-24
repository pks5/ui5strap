/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.commons.MenuItem.
sap.ui.define(['jquery.sap.global', './MenuItemBase', './library', 'sap/ui/unified/MenuItem'],
	function(jQuery, MenuItemBase, library, MenuItem1) {
	"use strict";


	
	/**
	 * Constructor for a new MenuItem.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * Smallest unit in the menu hierarchy. An item can be a direct part of a menu bar, of a menu, or of a sub menu.
	 * @extends sap.ui.unified.MenuItem
	 *
	 * @author SAP SE
	 * @version 1.26.9
	 *
	 * @constructor
	 * @public
	 * @deprecated Since version 1.21.0. 
	 * Please use the control sap.ui.unified.MenuItem of the library sap.ui.unified instead.
	 * @alias sap.ui.commons.MenuItem
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 */
	var MenuItem = MenuItem1.extend("sap.ui.commons.MenuItem", /** @lends sap.ui.commons.MenuItem.prototype */ { metadata : {
	
		deprecated : true,
		library : "sap.ui.commons"
	}});
	
	/*Ensure MenuItemBase is loaded (incl. loading of unified library)*/

	return MenuItem;

}, /* bExport= */ true);
