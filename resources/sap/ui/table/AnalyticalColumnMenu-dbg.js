/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.table.AnalyticalColumnMenu.
jQuery.sap.declare("sap.ui.table.AnalyticalColumnMenu");
jQuery.sap.require("sap.ui.table.library");
jQuery.sap.require("sap.ui.table.ColumnMenu");


/**
 * Constructor for a new AnalyticalColumnMenu.
 * 
 * Accepts an object literal <code>mSettings</code> that defines initial 
 * property values, aggregated and associated objects as well as event handlers. 
 * 
 * If the name of a setting is ambiguous (e.g. a property has the same name as an event), 
 * then the framework assumes property, aggregation, association, event in that order. 
 * To override this automatic resolution, one of the prefixes "aggregation:", "association:" 
 * or "event:" can be added to the name of the setting (such a prefixed name must be
 * enclosed in single or double quotes).
 *
 * The supported settings are:
 * <ul>
 * <li>Properties
 * <ul></ul>
 * </li>
 * <li>Aggregations
 * <ul></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.ui.table.ColumnMenu#constructor sap.ui.table.ColumnMenu}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A column menu which is used by the analytical column
 * @extends sap.ui.table.ColumnMenu
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @experimental Since version 1.21. 
 * The AnalyticalColumnMenu will be productized soon.
 * @name sap.ui.table.AnalyticalColumnMenu
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.table.ColumnMenu.extend("sap.ui.table.AnalyticalColumnMenu", { metadata : {

	library : "sap.ui.table"
}});


/**
 * Creates a new subclass of class sap.ui.table.AnalyticalColumnMenu with name <code>sClassName</code> 
 * and enriches it with the information contained in <code>oClassInfo</code>.
 * 
 * <code>oClassInfo</code> might contain the same kind of informations as described in {@link sap.ui.core.Element.extend Element.extend}.
 *   
 * @param {string} sClassName name of the class to be created
 * @param {object} [oClassInfo] object literal with informations about the class  
 * @param {function} [FNMetaImpl] constructor function for the metadata object. If not given, it defaults to sap.ui.core.ElementMetadata.
 * @return {function} the created class / constructor function
 * @public
 * @static
 * @name sap.ui.table.AnalyticalColumnMenu.extend
 * @function
 */


// Start of sap\ui\table\AnalyticalColumnMenu.js
sap.ui.table.AnalyticalColumnMenu.prototype.init = function() {
	sap.ui.table.ColumnMenu.prototype.init.apply(this);
};

/**
 * Adds the menu items to the menu.
 * @private
 */
sap.ui.table.AnalyticalColumnMenu.prototype._addMenuItems = function() {
	sap.ui.table.ColumnMenu.prototype._addMenuItems.apply(this);
	if (this._oColumn) {
		this._addSumMenuItem();
	}
};

/**
 * Adds the group menu item to the menu.
 * @private
 */
sap.ui.table.AnalyticalColumnMenu.prototype._addGroupMenuItem = function() {
	var oColumn = this._oColumn,
		oTable = this._oTable,
		oBinding = oTable.getBinding("rows"),
		oResultSet = oBinding && oBinding.getAnalyticalQueryResult();

	if (oTable && oResultSet && oResultSet.findDimensionByPropertyName(oColumn.getLeadingProperty()) 
			&& jQuery.inArray(oColumn.getLeadingProperty(), oBinding.getSortablePropertyNames()) > -1
			&& jQuery.inArray(oColumn.getLeadingProperty(), oBinding.getFilterablePropertyNames()) > -1) {
		this._oGroupIcon = this._createMenuItem(
			"group",
			"TBL_GROUP",
			oColumn.getGrouped() ? "accept" : null,
			jQuery.proxy(function(oEvent) {
				var oMenuItem = oEvent.getSource(),
					bGrouped = oColumn.getGrouped();

				oColumn.setGrouped(!bGrouped);
				oMenuItem.setIcon(!bGrouped ? "sap-icon://accept" : null);
			}, this)
		);
		this.addItem(this._oGroupIcon);
	}
};

/**
 * Adds the group menu item to the menu.
 * @private
 */
sap.ui.table.AnalyticalColumnMenu.prototype._addSumMenuItem = function() {
	var oColumn = this._oColumn,
		oTable = this._oTable,
		oBinding = oTable.getBinding("rows"),
		oResultSet = oBinding && oBinding.getAnalyticalQueryResult();
	
	if (oTable && oResultSet && oResultSet.findMeasureByPropertyName(oColumn.getLeadingProperty())) {
		this._oSumItem = this._createMenuItem(
			"total",
			"TBL_TOTAL",
			oColumn.getSummed() ? "accept" : null,
			jQuery.proxy(function(oEvent) {
				var oMenuItem = oEvent.getSource(),
					bSummed = oColumn.getSummed();

				oColumn.setSummed(!bSummed);
				oMenuItem.setIcon(!bSummed ? "sap-icon://accept" : null);
			}, this)
		);
		this.addItem(this._oSumItem);
	}
};


sap.ui.table.AnalyticalColumnMenu.prototype.open = function() {
	sap.ui.table.ColumnMenu.prototype.open.apply(this, arguments);
	
	var oColumn = this._oColumn;
	this._oSumItem && this._oSumItem.setIcon(oColumn.getSummed() ? "sap-icon://accept" : null);
	this._oGroupIcon && this._oGroupIcon.setIcon(oColumn.getGrouped() ? "sap-icon://accept" : null);
	this._oGroupIcon && this._oGroupIcon.setVisible(!oColumn._isLastGroupableLeft);
};