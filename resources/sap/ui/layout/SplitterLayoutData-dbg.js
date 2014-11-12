/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.layout.SplitterLayoutData.
jQuery.sap.declare("sap.ui.layout.SplitterLayoutData");
jQuery.sap.require("sap.ui.layout.library");
jQuery.sap.require("sap.ui.core.LayoutData");


/**
 * Constructor for a new SplitterLayoutData.
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
 * <li>{@link #getResizable resizable} : boolean (default: true)</li>
 * <li>{@link #getSize size} : sap.ui.core.CSSSize (default: 'auto')</li>
 * <li>{@link #getMinSize minSize} : int (default: 0)</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.ui.core.LayoutData#constructor sap.ui.core.LayoutData}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Holds layout data for the splitter contents.
 * Allowed size values are numeric values ending in "px" and "%" and the
 * special case "auto".
 * (The CSS value "auto" is used internally to recalculate the size of the content
 * dynamically and is not directly set as style property.)
 * @extends sap.ui.core.LayoutData
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.22.0
 * @experimental Since version 1.22.0. 
 * API is not yet finished and might change completely
 * @name sap.ui.layout.SplitterLayoutData
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.LayoutData.extend("sap.ui.layout.SplitterLayoutData", { metadata : {

	library : "sap.ui.layout",
	properties : {
		"resizable" : {type : "boolean", group : "Behavior", defaultValue : true},
		"size" : {type : "sap.ui.core.CSSSize", group : "Dimension", defaultValue : 'auto'},
		"minSize" : {type : "int", group : "Dimension", defaultValue : 0}
	}
}});


/**
 * Creates a new subclass of class sap.ui.layout.SplitterLayoutData with name <code>sClassName</code> 
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
 * @name sap.ui.layout.SplitterLayoutData.extend
 * @function
 */


/**
 * Getter for property <code>resizable</code>.
 * Determines whether the control in the splitter can be resized or not.
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>resizable</code>
 * @public
 * @name sap.ui.layout.SplitterLayoutData#getResizable
 * @function
 */

/**
 * Setter for property <code>resizable</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bResizable  new value for property <code>resizable</code>
 * @return {sap.ui.layout.SplitterLayoutData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.SplitterLayoutData#setResizable
 * @function
 */


/**
 * Getter for property <code>size</code>.
 * Sets the size of the splitter content.
 *
 * Default value is <code>auto</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>size</code>
 * @public
 * @name sap.ui.layout.SplitterLayoutData#getSize
 * @function
 */

/**
 * Setter for property <code>size</code>.
 *
 * Default value is <code>auto</code> 
 *
 * @param {sap.ui.core.CSSSize} sSize  new value for property <code>size</code>
 * @return {sap.ui.layout.SplitterLayoutData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.SplitterLayoutData#setSize
 * @function
 */


/**
 * Getter for property <code>minSize</code>.
 * Sets the minimum size of the splitter content in px.
 *
 * Default value is <code>0</code>
 *
 * @return {int} the value of property <code>minSize</code>
 * @public
 * @name sap.ui.layout.SplitterLayoutData#getMinSize
 * @function
 */

/**
 * Setter for property <code>minSize</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {int} iMinSize  new value for property <code>minSize</code>
 * @return {sap.ui.layout.SplitterLayoutData} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.layout.SplitterLayoutData#setMinSize
 * @function
 */


// Start of sap\ui\layout\SplitterLayoutData.js
/*** NOTHING ***/