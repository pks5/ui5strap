/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides enumeration sap.ui.model.FilterType
sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
	"use strict";


	/**
	* @class
	* Operators for the Filter.
	*
	* @static
	* @public
	* @name sap.ui.model.FilterType
	*/
	var FilterType = {
			/**
			 * Filters which are changed by the application
			 * @name sap.ui.model.FilterType#Application
			 * @public
			 */
			Application: "Application",
	
			/**
			 * Filters which are set by the different controls
			 * @name sap.ui.model.FilterType#Control
			 * @public
			 */
			Control: "Control"
	};

	return FilterType;

}, /* bExport= */ true);
