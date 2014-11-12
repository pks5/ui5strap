/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.table.AnalyticalColumn.
jQuery.sap.declare("sap.ui.table.AnalyticalColumn");
jQuery.sap.require("sap.ui.table.library");
jQuery.sap.require("sap.ui.table.Column");


/**
 * Constructor for a new AnalyticalColumn.
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
 * <ul>
 * <li>{@link #getLeadingProperty leadingProperty} : string</li>
 * <li>{@link #getSummed summed} : boolean (default: false)</li>
 * <li>{@link #getInResult inResult} : boolean (default: false)</li>
 * <li>{@link #getShowIfGrouped showIfGrouped} : boolean (default: false)</li>
 * <li>{@link #getGroupHeaderFormatter groupHeaderFormatter} : any</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.ui.table.Column#constructor sap.ui.table.Column}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * This column addes additional properties to the tabl ecolumn which are needed for the analytical binding and table
 * @extends sap.ui.table.Column
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @experimental Since version 1.21. 
 * The AnalyticalColumn will be productized soon. Some attributes will be added to Column.
 * @name sap.ui.table.AnalyticalColumn
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.table.Column.extend("sap.ui.table.AnalyticalColumn", { metadata : {

	library : "sap.ui.table",
	properties : {
		"leadingProperty" : {type : "string", group : "Misc", defaultValue : null},
		"summed" : {type : "boolean", group : "Misc", defaultValue : false},
		"inResult" : {type : "boolean", group : "Misc", defaultValue : false},
		"showIfGrouped" : {type : "boolean", group : "Appearance", defaultValue : false},
		"groupHeaderFormatter" : {type : "any", group : "Behavior", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.ui.table.AnalyticalColumn with name <code>sClassName</code> 
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
 * @name sap.ui.table.AnalyticalColumn.extend
 * @function
 */


/**
 * Getter for property <code>leadingProperty</code>.
 * Defines the primary model property which is used inside the Column. In case of the analytical extension this means the property which is grouped by for dimensions or the property which is summed for measures.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>leadingProperty</code>
 * @public
 * @name sap.ui.table.AnalyticalColumn#getLeadingProperty
 * @function
 */

/**
 * Setter for property <code>leadingProperty</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sLeadingProperty  new value for property <code>leadingProperty</code>
 * @return {sap.ui.table.AnalyticalColumn} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalColumn#setLeadingProperty
 * @function
 */


/**
 * Getter for property <code>summed</code>.
 * If defined a sum for this column is calculated
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>summed</code>
 * @public
 * @name sap.ui.table.AnalyticalColumn#getSummed
 * @function
 */

/**
 * Setter for property <code>summed</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bSummed  new value for property <code>summed</code>
 * @return {sap.ui.table.AnalyticalColumn} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalColumn#setSummed
 * @function
 */


/**
 * Getter for property <code>inResult</code>.
 * Specifies that the dimension referred to by the column shall be included in the granularity of the data result. It allows a finer distinction between a visible/grouped/(included)inResult column.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>inResult</code>
 * @public
 * @name sap.ui.table.AnalyticalColumn#getInResult
 * @function
 */

/**
 * Setter for property <code>inResult</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bInResult  new value for property <code>inResult</code>
 * @return {sap.ui.table.AnalyticalColumn} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalColumn#setInResult
 * @function
 */


/**
 * Getter for property <code>showIfGrouped</code>.
 * Specifies whether the column is displayed within the table even if it is grouped or not. A grouped column has the same value for every rows within the group.
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>showIfGrouped</code>
 * @public
 * @name sap.ui.table.AnalyticalColumn#getShowIfGrouped
 * @function
 */

/**
 * Setter for property <code>showIfGrouped</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bShowIfGrouped  new value for property <code>showIfGrouped</code>
 * @return {sap.ui.table.AnalyticalColumn} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalColumn#setShowIfGrouped
 * @function
 */


/**
 * Getter for property <code>groupHeaderFormatter</code>.
 * If the column is grouped, this formatter is used to format the value in the group header
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {any} the value of property <code>groupHeaderFormatter</code>
 * @public
 * @name sap.ui.table.AnalyticalColumn#getGroupHeaderFormatter
 * @function
 */

/**
 * Setter for property <code>groupHeaderFormatter</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {any} oGroupHeaderFormatter  new value for property <code>groupHeaderFormatter</code>
 * @return {sap.ui.table.AnalyticalColumn} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.table.AnalyticalColumn#setGroupHeaderFormatter
 * @function
 */


// Start of sap\ui\table\AnalyticalColumn.js
sap.ui.table.AnalyticalColumn.prototype.init = function() {
	sap.ui.table.Column.prototype.init.apply(this, arguments);
	this._bSkipUpdateAI = false;
};

/**
 * map of filtertypes for re-use in getFilterType
 * @private
 */
sap.ui.table.AnalyticalColumn._DEFAULT_FILTERTYPES = {
	"Time": new sap.ui.model.type.Time({UTC: true}),
	"DateTime": new sap.ui.model.type.DateTime({UTC: true}),
	"Float": new sap.ui.model.type.Float(),
	"Integer": new sap.ui.model.type.Integer(),
	"Boolean": new sap.ui.model.type.Boolean()
};

/*
 * Factory method. Creates the column menu.
 * 
 * @return {sap.ui.table.AnalyticalColumnMenu} The created column menu.
 */
sap.ui.table.AnalyticalColumn.prototype._createMenu = function() {
	jQuery.sap.require("sap.ui.table.AnalyticalColumnMenu");
	return new sap.ui.table.AnalyticalColumnMenu(this.getId() + "-menu");
};

sap.ui.table.AnalyticalColumn.prototype.setGrouped = function(bGrouped) {
	var oParent = this.getParent();
	var that = this;
	if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
		if (bGrouped) {
			oParent._addGroupedColumn(this.getId());
		} else {
			oParent._aGroupedColumns = jQuery.grep(oParent._aGroupedColumns, function(value) {
				return value != that.getId();
			});
		}
	}
	var bReturn = this.setProperty("grouped", bGrouped);
	this._updateTableColumnDetails();
	this._updateTableAnalyticalInfo(true);
	return bReturn;
};

sap.ui.table.AnalyticalColumn.prototype.setSummed = function(bSummed) {
	var bReturn = this.setProperty("summed", bSummed, true);
	this._updateTableAnalyticalInfo();
	return bReturn;
};

/*
 * @see JSDoc generated by SAPUI5 control API generator
 */
sap.ui.table.AnalyticalColumn.prototype.setVisible = function(bVisible) {
	sap.ui.table.Column.prototype.setVisible.apply(this, arguments);
	this._updateTableColumnDetails();
	this._updateTableAnalyticalInfo();
	return this;
};

/*
 * @see JSDoc generated by SAPUI5 control API generator
 */
sap.ui.table.AnalyticalColumn.prototype.getLabel = function() {
	var oLabel = this.getAggregation("label");
	if (!oLabel) {
		if (!this._oBindingLabel) {
			var oParent = this.getParent();
			if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
				var oBinding = oParent.getBinding("rows");
				if (oBinding) {
					this._oBindingLabel = sap.ui.table.TableHelper.createLabel({text: oBinding.getPropertyLabel(this.getLeadingProperty())});
				}
			}
		}
		oLabel = this._oBindingLabel;
	}
	return oLabel;
};

/*
 * @see JSDoc generated by SAPUI5 control API generator
 */
sap.ui.table.AnalyticalColumn.prototype.getFilterProperty = function() {
	var sProperty = this.getProperty("filterProperty");
	if (!sProperty) {
		var oParent = this.getParent();
		if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
			var oBinding = oParent.getBinding("rows");
			var sLeadingProperty = this.getLeadingProperty();
			if (oBinding && jQuery.inArray(sLeadingProperty, oBinding.getFilterablePropertyNames()) > -1) {
				sProperty = sLeadingProperty;
			}
		}
	}
	return sProperty;
};

/*
 * @see JSDoc generated by SAPUI5 control API generator
 */
sap.ui.table.AnalyticalColumn.prototype.getSortProperty = function() {
	var sProperty = this.getProperty("sortProperty");
	if (!sProperty) {
		var oParent = this.getParent();
		if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
			var oBinding = oParent.getBinding("rows");
			var sLeadingProperty = this.getLeadingProperty();
			if (oBinding && jQuery.inArray(sLeadingProperty, oBinding.getSortablePropertyNames()) > -1) {
				sProperty = sLeadingProperty;
			}
		}
	}
	return sProperty;
};

/*
 * @see JSDoc generated by SAPUI5 control API generator
 */
sap.ui.table.AnalyticalColumn.prototype.getFilterType = function() {
	var vFilterType = this.getProperty("filterType");
	if (!vFilterType) {
		var oParent = this.getParent();
		if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
			var oBinding = oParent.getBinding("rows");
			var sLeadingProperty = this.getLeadingProperty(),
			    oProperty = oBinding && oBinding.getProperty(sLeadingProperty);
			if (oProperty) {
				var sType = undefined;
				switch (oProperty.type) {
					case "Edm.Time":
						vFilterType = sap.ui.table.AnalyticalColumn._DEFAULT_FILTERTYPES["Time"];
						break;
					case "Edm.DateTime":
					case "Edm.DateTimeOffset":
						vFilterType = sap.ui.table.AnalyticalColumn._DEFAULT_FILTERTYPES["DateTime"]
						break;
					case "Edm.Single":
					case "Edm.Double":
					case "Edm.Decimal":
						vFilterType = sap.ui.table.AnalyticalColumn._DEFAULT_FILTERTYPES["Float"]
						break;
					case "Edm.SByte":
					case "Edm.Int16":
					case "Edm.Int32":
					case "Edm.Int64":
						vFilterType = sap.ui.table.AnalyticalColumn._DEFAULT_FILTERTYPES["Integer"]
						break;
					case "Edm.Boolean":
						vFilterType = sap.ui.table.AnalyticalColumn._DEFAULT_FILTERTYPES["Boolean"]
						break;
				}
			}
		}
	}
	return vFilterType;
};

sap.ui.table.AnalyticalColumn.prototype._afterSort = function() {
	this._updateTableAnalyticalInfo();
};

sap.ui.table.AnalyticalColumn.prototype._updateTableAnalyticalInfo = function(bSupressRefresh) {
	if (this._bSkipUpdateAI) {
		return;
	}

	var oParent = this.getParent();
	if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
		oParent.updateAnalyticalInfo(bSupressRefresh);
	}
};

sap.ui.table.AnalyticalColumn.prototype._updateTableColumnDetails = function() {
	if (this._bSkipUpdateAI) {
		return;
	}

	var oParent = this.getParent();
	if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
		oParent._updateTableColumnDetails();
	}
};

sap.ui.table.AnalyticalColumn.prototype.shouldRender = function() {
	if (!this.getVisible()) {
		return false;
	}
	return (!this.getGrouped() || this._bLastGroupAndGrouped || this.getShowIfGrouped()) && (!this._bDependendGrouped || this._bLastGroupAndGrouped);
};

sap.ui.table.AnalyticalColumn.prototype.getTooltip_AsString = function() {
	var oParent = this.getParent();
	if (oParent && oParent instanceof sap.ui.table.AnalyticalTable) {
		var oBinding = oParent.getBinding("rows");
		if (oBinding && this.getLeadingProperty()) {
			return oBinding.getPropertyQuickInfo(this.getLeadingProperty());
		}
	}
	return sap.ui.core.Element.prototype.getTooltip_AsString.apply(this);
};
