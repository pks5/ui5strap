/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/* ----------------------------------------------------------------------------------
 * Hint: This is a derived (generated) file. Changes should be done in the underlying 
 * source files only (*.control, *.js) or they will be lost after the next generation.
 * ---------------------------------------------------------------------------------- */

// Provides control sap.ui.commons.FileUploader.
jQuery.sap.declare("sap.ui.commons.FileUploader");
jQuery.sap.require("sap.ui.commons.library");
jQuery.sap.require("sap.ui.unified.FileUploader");


/**
 * Constructor for a new FileUploader.
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
 * In addition, all settings applicable to the base type {@link sap.ui.unified.FileUploader#constructor sap.ui.unified.FileUploader}
 * can be used as well.
 *
 * @param {string} [sId] id for the new control, generated automatically if no id is given 
 * @param {object} [mSettings] initial settings for the new control
 *
 * @class
 * The framework generates an input field and a button with text "Browse ...". The API supports features such as on change uploads (the upload starts immediately after a file has been selected), file uploads with explicit calls, adjustable control sizes, text display after uploads, or tooltips containing complete file paths.
 * @extends sap.ui.unified.FileUploader
 *
 * @author SAP SE
 * @version 1.24.3
 *
 * @constructor
 * @public
 * @deprecated Since version 1.21.0. 
 * Please use the control sap.ui.unified.FileUploader of the library sap.ui.unified instead.
 * @name sap.ui.commons.FileUploader
 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
 */
sap.ui.unified.FileUploader.extend("sap.ui.commons.FileUploader", { metadata : {

	deprecated : true,
	library : "sap.ui.commons"
}});


/**
 * Creates a new subclass of class sap.ui.commons.FileUploader with name <code>sClassName</code> 
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
 * @name sap.ui.commons.FileUploader.extend
 * @function
 */


// Start of sap\ui\commons\FileUploader.js
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */

jQuery.sap.declare("sap.ui.commons.FileUploader");

(function(){

	try{
		sap.ui.getCore().loadLibrary("sap.ui.unified");
	}catch(e){
		alert("The control 'sap.ui.commons.FileUploader' needs library 'sap.ui.unified'.");
		throw(e);
	}

})();