/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.commons.FileUploaderParameter.
jQuery.sap.declare("sap.ui.commons.FileUploaderParameter");
jQuery.sap.require("sap.ui.commons.library");
jQuery.sap.require("sap.ui.unified.FileUploaderParameter");


/**
 * Constructor for a new FileUploaderParameter.
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
 * In addition, all settings applicable to the base type {@link sap.ui.unified.FileUploaderParameter#constructor sap.ui.unified.FileUploaderParameter}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * Represents a parameter for the FileUploader which is rendered as a hidden inputfield.
 * @extends sap.ui.unified.FileUploaderParameter
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @deprecated Since version 1.21.0. 
 * Please use the element sap.ui.unified.FileUploaderParameter of the library sap.ui.unified instead.
 * @name sap.ui.commons.FileUploaderParameter
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.unified.FileUploaderParameter.extend("sap.ui.commons.FileUploaderParameter", { metadata : {

	deprecated : true,
	library : "sap.ui.commons"
}});


/**
 * Creates a new subclass of class sap.ui.commons.FileUploaderParameter with name <code>sClassName</code> 
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
 * @name sap.ui.commons.FileUploaderParameter.extend
 * @function
 */


// Start of sap\ui\commons\FileUploaderParameter.js
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */

jQuery.sap.declare("sap.ui.commons.FileUploaderParameter");

(function(){

	try{
		sap.ui.getCore().loadLibrary("sap.ui.unified");
	}catch(e){
		alert("The element 'sap.ui.commons.FileUploaderParameter' needs library 'sap.ui.unified'.");
		throw(e);
	}

})();