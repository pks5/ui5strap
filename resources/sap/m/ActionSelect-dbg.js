/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.m.ActionSelect.
jQuery.sap.declare("sap.m.ActionSelect");
jQuery.sap.require("sap.m.library");
jQuery.sap.require("sap.m.Select");


/**
 * Constructor for a new ActionSelect.
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
 * <ul>
 * <li>{@link #getButtons buttons} : string | sap.m.Button</li></ul>
 * </li>
 * <li>Events
 * <ul></ul>
 * </li>
 * </ul> 
 *
 * 
 * In addition, all settings applicable to the base type {@link sap.m.Select#constructor sap.m.Select}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The ActionSelect control provides a list of predefined items that allows end users to choose options and additionally trigger some actions.
 * @extends sap.m.Select
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @since 1.16
 * @name sap.m.ActionSelect
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.m.Select.extend("sap.m.ActionSelect", { metadata : {

	library : "sap.m",
	associations : {
		"buttons" : {type : "sap.m.Button", multiple : true, singularName : "button"}
	}
}});


/**
 * Creates a new subclass of class sap.m.ActionSelect with name <code>sClassName</code> 
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
 * @name sap.m.ActionSelect.extend
 * @function
 */


/**
 * Buttons to be added to the ActionSelect content.
 * 
 * @return {string[]}
 * @public
 * @name sap.m.ActionSelect#getButtons
 * @function
 */

	
/**
 *
 * @param {string | sap.m.Button} vButton
 *    Id of a button which becomes an additional target of this <code>buttons</code> association.
 *    Alternatively, a button instance may be given. 
 * @return {sap.m.ActionSelect} <code>this</code> to allow method chaining
 * @public
 * @name sap.m.ActionSelect#addButton
 * @function
 */

/**
 * @param {int | string | sap.m.Button} vButton the button to remove or its index or id
 * @return {string} the id of the removed button or null
 * @public
 * @name sap.m.ActionSelect#removeButton
 * @function
 */

/**
 * @return {string[]} an array with the ids of the removed elements (might be empty)
 * @public
 * @name sap.m.ActionSelect#removeAllButtons
 * @function
 */

	
// Start of sap\m\ActionSelect.js
/* =========================================================== */
/* Internal methods and properties                             */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* Private methods                                             */
/* ----------------------------------------------------------- */

/**
 * Determines whether the ActionSelect has content or not.
 *
 * @return {boolean}
 * @override
 * @private
 */
sap.m.ActionSelect.prototype.hasContent = function() {
	return sap.m.Select.prototype.hasContent.call(this) || !!this.getButtons().length;
};

/**
 * Add additional content.
 *
 * @override
 * @private
 * @name sap.m.ActionSelect#addContent
 */
sap.m.ActionSelect.prototype.addContent = function() {
	var oCore = sap.ui.getCore(),
		oPicker = this.getPicker();

	this.getButtons().forEach(function(sButtonId) {
		oPicker.addContent(oCore.byId(sButtonId));
	});
};

/* =========================================================== */
/* Lifecycle methods                                           */
/* =========================================================== */

/**
 * Called after the ActionSelect picker pop-up is render.
 *
 * @override
 * @protected
 * @name sap.m.ActionSelect#onAfterRenderingPicker
 */
sap.m.ActionSelect.prototype.onAfterRenderingPicker = function() {
	sap.m.Select.prototype.onAfterRenderingPicker.call(this);
	this.getPicker().addStyleClass(sap.m.ActionSelectRenderer.CSS_CLASS + "Picker");
};

/* =========================================================== */
/* API methods                                                 */
/* =========================================================== */

/* ----------------------------------------------------------- */
/* Public methods                                              */
/* ----------------------------------------------------------- */

/**
 * Button to be removed from the ActionSelect content.
 *
 * @param {int | string | sap.m.Button} vButton The button to remove or its index or id.
 * @returns {string} The id of the removed button or null.
 * @public
 * @name sap.m.ActionSelect#removeButton
 * @function
 */
sap.m.ActionSelect.prototype.removeButton = function(vButton) {
	var oPicker = this.getPicker();

	if (oPicker) {

		if (typeof vButton === "number") {
			vButton = this.getButtons()[vButton];
		}

		oPicker.removeContent(vButton);
	}

	return this.removeAssociation("buttons", vButton);
};

/**
 * Remove all buttons from the ActionSelect.
 *
 * @returns {string[]} An array with the ids of the removed elements (might be empty).
 * @public
 * @name sap.m.ActionSelect#removeAllButtons
 * @function
 */
sap.m.ActionSelect.prototype.removeAllButtons = function() {
	var oPicker = this.getPicker();

	if (oPicker) {
		this.getButtons().forEach(function(sButtonId) {
			oPicker.removeContent(sButtonId);
		});
	}

	return this.removeAllAssociation("buttons");
};