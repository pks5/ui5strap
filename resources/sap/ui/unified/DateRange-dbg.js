/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.DateRange.
jQuery.sap.declare("sap.ui.unified.DateRange");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.core.Element");


/**
 * Constructor for a new DateRange.
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
 * <li>{@link #getStartDate startDate} : object</li>
 * <li>{@link #getEndDate endDate} : object</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.ui.core.Element#constructor sap.ui.core.Element}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Date range for use in DatePicker
 * @extends sap.ui.core.Element
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.22.0
 * @name sap.ui.unified.DateRange
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Element.extend("sap.ui.unified.DateRange", { metadata : {

	library : "sap.ui.unified",
	properties : {
		"startDate" : {type : "object", group : "Misc", defaultValue : null},
		"endDate" : {type : "object", group : "Misc", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.DateRange with name <code>sClassName</code> 
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
 * @name sap.ui.unified.DateRange.extend
 * @function
 */


/**
 * Getter for property <code>startDate</code>.
 * Start date for a date range. This must be a JavaScript date object.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {object} the value of property <code>startDate</code>
 * @public
 * @name sap.ui.unified.DateRange#getStartDate
 * @function
 */

/**
 * Setter for property <code>startDate</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {object} oStartDate  new value for property <code>startDate</code>
 * @return {sap.ui.unified.DateRange} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.DateRange#setStartDate
 * @function
 */


/**
 * Getter for property <code>endDate</code>.
 * Start date for a date range. If empty only a single date is presented by this DateRange element. This must be a JavaScript date object.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {object} the value of property <code>endDate</code>
 * @public
 * @name sap.ui.unified.DateRange#getEndDate
 * @function
 */

/**
 * Setter for property <code>endDate</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {object} oEndDate  new value for property <code>endDate</code>
 * @return {sap.ui.unified.DateRange} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.DateRange#setEndDate
 * @function
 */


// Start of sap\ui\unified\DateRange.js
///**
// * This file defines behavior for the control,
// */

sap.ui.unified.DateRange.prototype.setStartDate = function(oDate){

	jQuery.sap.assert(!oDate || oDate instanceof Date, "Date must be a JavaScript date object");

	this.setProperty("startDate", oDate);

};

sap.ui.unified.DateRange.prototype.setEndDate = function(oDate){

	jQuery.sap.assert(!oDate || oDate instanceof Date, "Date must be a JavaScript date object");

	this.setProperty("endDate", oDate);

};