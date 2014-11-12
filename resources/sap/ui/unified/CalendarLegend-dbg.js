/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.CalendarLegend.
jQuery.sap.declare("sap.ui.unified.CalendarLegend");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new CalendarLegend.
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
 * <li>{@link #getColumnWidth columnWidth} : sap.ui.core.CSSSize (default: '120px')</li></ul>
 * </li>
 * <li>Aggregations
 * <ul>
 * <li>{@link #getItems items} : sap.ui.unified.CalendarLegendItem[]</li></ul>
 * </li>
 * <li>Associations
 * <ul></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 

 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A legend for the Calendar Control. Displays special dates colors with their corresponding description. The aggregation specialDates can be set herefor.
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.ui.unified.CalendarLegend
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.ui.unified.CalendarLegend", { metadata : {

	library : "sap.ui.unified",
	properties : {
		"columnWidth" : {type : "sap.ui.core.CSSSize", group : "Misc", defaultValue : '120px'}
	},
	aggregations : {
		"items" : {type : "sap.ui.unified.CalendarLegendItem", multiple : true, singularName : "item"}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.CalendarLegend with name <code>sClassName</code> 
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
 * @name sap.ui.unified.CalendarLegend.extend
 * @function
 */


/**
 * Getter for property <code>columnWidth</code>.
 * Width of the columns created in which the items are arranged.
 *
 * Default value is <code>120px</code>
 *
 * @return {sap.ui.core.CSSSize} the value of property <code>columnWidth</code>
 * @public
 * @name sap.ui.unified.CalendarLegend#getColumnWidth
 * @function
 */

/**
 * Setter for property <code>columnWidth</code>.
 *
 * Default value is <code>120px</code> 
 *
 * @param {sap.ui.core.CSSSize} sColumnWidth  new value for property <code>columnWidth</code>
 * @return {sap.ui.unified.CalendarLegend} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.CalendarLegend#setColumnWidth
 * @function
 */


/**
 * Getter for aggregation <code>items</code>.<br/>
 * Items to be displayed.
 * 
 * @return {sap.ui.unified.CalendarLegendItem[]}
 * @public
 * @name sap.ui.unified.CalendarLegend#getItems
 * @function
 */


/**
 * Inserts a item into the aggregation named <code>items</code>.
 *
 * @param {sap.ui.unified.CalendarLegendItem}
 *          oItem the item to insert; if empty, nothing is inserted
 * @param {int}
 *             iIndex the <code>0</code>-based index the item should be inserted at; for 
 *             a negative value of <code>iIndex</code>, the item is inserted at position 0; for a value 
 *             greater than the current size of the aggregation, the item is inserted at 
 *             the last position        
 * @return {sap.ui.unified.CalendarLegend} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.CalendarLegend#insertItem
 * @function
 */

/**
 * Adds some item <code>oItem</code> 
 * to the aggregation named <code>items</code>.
 *
 * @param {sap.ui.unified.CalendarLegendItem}
 *            oItem the item to add; if empty, nothing is inserted
 * @return {sap.ui.unified.CalendarLegend} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.CalendarLegend#addItem
 * @function
 */

/**
 * Removes an item from the aggregation named <code>items</code>.
 *
 * @param {int | string | sap.ui.unified.CalendarLegendItem} vItem the item to remove or its index or id
 * @return {sap.ui.unified.CalendarLegendItem} the removed item or null
 * @public
 * @name sap.ui.unified.CalendarLegend#removeItem
 * @function
 */

/**
 * Removes all the controls in the aggregation named <code>items</code>.<br/>
 * Additionally unregisters them from the hosting UIArea.
 * @return {sap.ui.unified.CalendarLegendItem[]} an array of the removed elements (might be empty)
 * @public
 * @name sap.ui.unified.CalendarLegend#removeAllItems
 * @function
 */

/**
 * Checks for the provided <code>sap.ui.unified.CalendarLegendItem</code> in the aggregation named <code>items</code> 
 * and returns its index if found or -1 otherwise.
 *
 * @param {sap.ui.unified.CalendarLegendItem}
 *            oItem the item whose index is looked for.
 * @return {int} the index of the provided control in the aggregation if found, or -1 otherwise
 * @public
 * @name sap.ui.unified.CalendarLegend#indexOfItem
 * @function
 */
	

/**
 * Destroys all the items in the aggregation 
 * named <code>items</code>.
 * @return {sap.ui.unified.CalendarLegend} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.CalendarLegend#destroyItems
 * @function
 */


// Start of sap\ui\unified\CalendarLegend.js
///**
// * This file defines behavior for the control,
// */
//sap.ui.unified.CalendarLegend.prototype.init = function(){
//   // do something for initialization...
//};


//IE9 workaround for responsive layout of legend items
sap.ui.unified.CalendarLegend.prototype.onAfterRendering = function()	{
	if(sap.ui.Device.browser.msie) {
		if(sap.ui.Device.browser.version<10) {
			jQuery( ".sapUiUnifiedLegendItem" ).css( "width", this.getColumnWidth()+4+"px" ).css("display", "inline-block");
		}
	}
}
