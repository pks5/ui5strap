/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.DateTypeRange.
jQuery.sap.declare("sap.ui.unified.DateTypeRange");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.unified.DateRange");


/**
 * Constructor for a new DateTypeRange.
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
 * <li>{@link #getType type} : sap.ui.unified.CalendarDayType</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.ui.unified.DateRange#constructor sap.ui.unified.DateRange}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Date range with calendar day type information. Used to visualize special days in the Calendar.
 * @extends sap.ui.unified.DateRange
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.24.0
 * @name sap.ui.unified.DateTypeRange
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.unified.DateRange.extend("sap.ui.unified.DateTypeRange", { metadata : {

	library : "sap.ui.unified",
	properties : {
		"type" : {type : "sap.ui.unified.CalendarDayType", group : "Appearance", defaultValue : null}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.DateTypeRange with name <code>sClassName</code> 
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
 * @name sap.ui.unified.DateTypeRange.extend
 * @function
 */


/**
 * Getter for property <code>type</code>.
 * Type of the dayte range.
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {sap.ui.unified.CalendarDayType} the value of property <code>type</code>
 * @public
 * @name sap.ui.unified.DateTypeRange#getType
 * @function
 */

/**
 * Setter for property <code>type</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {sap.ui.unified.CalendarDayType} oType  new value for property <code>type</code>
 * @return {sap.ui.unified.DateTypeRange} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.DateTypeRange#setType
 * @function
 */


// Start of sap\ui\unified\DateTypeRange.js
///**
// * This file defines behavior for the control,
// */
//sap.ui.unified.DateTypeRange.prototype.init = function(){
//   // do something for initialization...
//};
