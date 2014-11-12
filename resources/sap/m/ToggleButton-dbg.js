/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.ToggleButton.
jQuery.sap.declare("sap.m.ToggleButton");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.Button");


/**
 * Constructor for a new ToggleButton.
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
 * <li>{@link #getPressed pressed} : boolean (default: false)</li></ul>
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
 * In addition, all settings applicable to the base type {@link sap.m.Button#constructor sap.m.Button}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The ToggleButton Control is a Button that can be toggled between pressed and normal state
 * @extends sap.m.Button
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @name sap.m.ToggleButton
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.Button.extend("sap.m.ToggleButton", { metadata : {

	library : "sap.m",
	properties : {
		"pressed" : {type : "boolean", group : "Data", defaultValue : false}
	}
}});


/**
 * Creates a new subclass of class sap.m.ToggleButton with name <code>sClassName</code> 
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
 * @name sap.m.ToggleButton.extend
 * @function
 */


/**
 * Getter for property <code>pressed</code>.
 * The property is “true” when the control is toggled. The default state of this property is "false".
 *
 * Default value is <code>false</code>
 *
 * @return {boolean} the value of property <code>pressed</code>
 * @public
 * @name sap.m.ToggleButton#getPressed
 * @function
 */

/**
 * Setter for property <code>pressed</code>.
 *
 * Default value is <code>false</code> 
 *
 * @param {boolean} bPressed  new value for property <code>pressed</code>
 * @return {sap.m.ToggleButton} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ToggleButton#setPressed
 * @function
 */


// Start of sap\m\ToggleButton.js
jQuery.sap.require("sap.ui.core.EnabledPropagator");
sap.ui.core.EnabledPropagator.call(sap.m.ToggleButton.prototype);

/**
 * Function is called when ToggleButton is clicked.
 *
 * @param {jQuery.Event} oEvent
 * @private
 */
sap.m.ToggleButton.prototype.ontap = function(oEvent) {
// mark the event for components that needs to know if the event was handled by the ToggleButton
	oEvent.setMarked();
	if (this.getEnabled()){
		this.setPressed(!this.getPressed());
		this.firePress({ pressed: this.getPressed() });
	}
};

sap.m.ToggleButton.prototype.setPressed = function(bPressed) {
	if (bPressed != this.getPressed()) {
		var $Inner = this.$("inner");
		this.setProperty("pressed", bPressed, true);
		$Inner.toggleClass("sapMToggleBtnPressed",bPressed);
		$Inner.attr("pressed", bPressed);
	}
	return this;
};

/**
 * Handle the key down event for SPACE and ENTER.
 * @param {jQuery.Event} oEvent - the keyboard event.
 * @private
 */
sap.m.ToggleButton.prototype.onkeydown = function(oEvent) {

	if (oEvent.which === jQuery.sap.KeyCodes.SPACE || oEvent.which === jQuery.sap.KeyCodes.ENTER) {
		this.ontap(oEvent);
	}
};
