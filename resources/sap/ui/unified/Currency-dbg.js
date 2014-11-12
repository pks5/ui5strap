/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.unified.Currency.
jQuery.sap.declare("sap.ui.unified.Currency");
jQuery.sap.require("sap.ui.unified.library");
jQuery.sap.require("sap.ui.core.Control");


/**
 * Constructor for a new Currency.
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
 * <li>{@link #getValue value} : float (default: 0)</li>
 * <li>{@link #getCurrency currency} : string</li>
 * <li>{@link #getMaxPrecision maxPrecision} : int (default: 3)</li>
 * <li>{@link #getUseSymbol useSymbol} : boolean (default: true)</li></ul>
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
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * A text view which displays currency values and aligns them at the separator
 * @extends sap.ui.core.Control
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.21.1
 * @name sap.ui.unified.Currency
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.core.Control.extend("sap.ui.unified.Currency", { metadata : {

	publicMethods : [
		// methods
		"getFormattedValue", "getCurrencySymbol"
	],
	library : "sap.ui.unified",
	properties : {
		"value" : {type : "float", group : "Appearance", defaultValue : 0},
		"currency" : {type : "string", group : "Appearance", defaultValue : null},
		"maxPrecision" : {type : "int", group : "Appearance", defaultValue : 3},
		"useSymbol" : {type : "boolean", group : "Appearance", defaultValue : true}
	}
}});


/**
 * Creates a new subclass of class sap.ui.unified.Currency with name <code>sClassName</code> 
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
 * @name sap.ui.unified.Currency.extend
 * @function
 */


/**
 * Getter for property <code>value</code>.
 * The currency value
 *
 * Default value is <code>0</code>
 *
 * @return {float} the value of property <code>value</code>
 * @public
 * @name sap.ui.unified.Currency#getValue
 * @function
 */

/**
 * Setter for property <code>value</code>.
 *
 * Default value is <code>0</code> 
 *
 * @param {float} fValue  new value for property <code>value</code>
 * @return {sap.ui.unified.Currency} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Currency#setValue
 * @function
 */


/**
 * Getter for property <code>currency</code>.
 * The ISO 4217 currency code
 *
 * Default value is empty/<code>undefined</code>
 *
 * @return {string} the value of property <code>currency</code>
 * @public
 * @name sap.ui.unified.Currency#getCurrency
 * @function
 */

/**
 * Setter for property <code>currency</code>.
 *
 * Default value is empty/<code>undefined</code> 
 *
 * @param {string} sCurrency  new value for property <code>currency</code>
 * @return {sap.ui.unified.Currency} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Currency#setCurrency
 * @function
 */


/**
 * Getter for property <code>maxPrecision</code>.
 * Defines the space that is available for the precision of the various currencies.
 *
 * Default value is <code>3</code>
 *
 * @return {int} the value of property <code>maxPrecision</code>
 * @public
 * @name sap.ui.unified.Currency#getMaxPrecision
 * @function
 */

/**
 * Setter for property <code>maxPrecision</code>.
 *
 * Default value is <code>3</code> 
 *
 * @param {int} iMaxPrecision  new value for property <code>maxPrecision</code>
 * @return {sap.ui.unified.Currency} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Currency#setMaxPrecision
 * @function
 */


/**
 * Getter for property <code>useSymbol</code>.
 * Show the currency symbol instead of the ISO currency code
 *
 * Default value is <code>true</code>
 *
 * @return {boolean} the value of property <code>useSymbol</code>
 * @public
 * @name sap.ui.unified.Currency#getUseSymbol
 * @function
 */

/**
 * Setter for property <code>useSymbol</code>.
 *
 * Default value is <code>true</code> 
 *
 * @param {boolean} bUseSymbol  new value for property <code>useSymbol</code>
 * @return {sap.ui.unified.Currency} <code>this</code> to allow method chaining
 * @public
 * @name sap.ui.unified.Currency#setUseSymbol
 * @function
 */


/**
 * The formatted value
 *
 * @name sap.ui.unified.Currency#getFormattedValue
 * @function
 * @type string
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


/**
 * Get symbol of the currency, if available
 *
 * @name sap.ui.unified.Currency#getCurrencySymbol
 * @function
 * @type string
 * @public
 * @ui5-metamodel This method also will be described in the UI5 (legacy) designtime metamodel
 */


// Start of sap\ui\unified\Currency.js
jQuery.sap.require('sap.ui.core.format.NumberFormat');
jQuery.sap.require('sap.ui.core.LocaleData');

//Whitespace characters to align values
sap.ui.unified.Currency.FIGURE_SPACE = '\u2007';
sap.ui.unified.Currency.PUNCTUATION_SPACE = '\u2008';

sap.ui.unified.Currency.prototype.init = function() {
	this._oFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
		showMeasure: false
	});
};

sap.ui.unified.Currency.prototype.getFormattedValue = function() {
	if (this.getCurrency() === "*") {
		return "";
	}

	var iPadding = this.getMaxPrecision()- this._oFormat.oLocaleData.getCurrencyDigits(this.getCurrency());
	var sValue = this._oFormat.format(this.getValue(), this.getCurrency());
	
	if (iPadding == this.getMaxPrecision() && this.getMaxPrecision() > 0) {
		sValue += sap.ui.unified.Currency.PUNCTUATION_SPACE;
	}

	// create spaces
	if (iPadding > 0) {
		sValue = jQuery.sap.padRight(sValue, sap.ui.unified.Currency.FIGURE_SPACE, sValue.length + iPadding);
	} else if (iPadding < 0) {
		sValue = sValue.substr(0, sValue.length + iPadding);
	}
	
	return sValue;
};

sap.ui.unified.Currency.prototype.getCurrencySymbol = function() {
	return this._oFormat.oLocaleData.getCurrencySymbol(this.getCurrency());
};

sap.ui.unified.Currency.prototype.setValue = function(sValue) {
	// force the invalidation if the value should be displayed
	// to re-render the control finally
	var bHasValue = this._hasValue(),
	    bHasNoValueClass = this.$().hasClass("sapUiUfdCurrencyNoVal");
	if (bHasValue === bHasNoValueClass) {
		this.invalidate();
	}
	this.setProperty("value", sValue);
	return this;
};

/**
 * Checks if the binding has a proper value or the value is undefined. In case of 
 * undefined value the Currency control will not display any value! This workaround
 * is necessary because of the default value 0 suppresses to set a undefined or null value
 * instead and this cannot be changed due to compatibility.
 * @private
 */
sap.ui.unified.Currency.prototype._hasValue = function() {
	var oValueBinding = this.getBinding("value"),
	    bHasBinding = oValueBinding !== undefined,
	    bHasValue = bHasBinding ? oValueBinding.getValue() !== undefined : true /* no databinding => always true */;
	return bHasValue;
};
