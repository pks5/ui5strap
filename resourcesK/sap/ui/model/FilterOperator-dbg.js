/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides enumeration sap.ui.model.FilterOperator
sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
	"use strict";


	/**
	* @class
	* Operators for the Filter.
	*
	* @static
	* @public
	* @name sap.ui.model.FilterOperator
	*/
	var FilterOperator = {
			/**
			 * FilterOperator equals
			 * @name sap.ui.model.FilterOperator#EQ
			 * @public
			 */
			EQ: "EQ",
	
			/**
			 * FilterOperator not equals
			 * @name sap.ui.model.FilterOperator#NE
			 * @public
			 */
			NE: "NE",
	
			/**
			 * FilterOperator less than
			 * @name sap.ui.model.FilterOperator#LT
			 * @public
			 */
			LT: "LT",
	
			/**
			 * FilterOperator less or equals
			 * @name sap.ui.model.FilterOperator#LE
			 * @public
			 */
			LE: "LE",
	
			/**
			 * FilterOperator greater than
			 * @name sap.ui.model.FilterOperator#GT
			 * @public
			 */
			GT: "GT",
	
			/**
			 * FilterOperator greater or equals
			 * @name sap.ui.model.FilterOperator#GE
			 * @public
			 */
			GE: "GE",
	
			/**
			 * FilterOperator between
			 * @name sap.ui.model.FilterOperator#BT
			 * @public
			 */
			BT: "BT",
	
			/**
			 * FilterOperator contains
			 * @name sap.ui.model.FilterOperator#Contains
			 * @public
			 */
			Contains: "Contains",
	
			/**
			 * FilterOperator starts with
			 * @name sap.ui.model.FilterOperator#StartsWith
			 * @public
			 */
			StartsWith: "StartsWith",
	
			/**
			 * FilterOperator ends with
			 * @name sap.ui.model.FilterOperator#EndsWith
			 * @public
			 */
			EndsWith: "EndsWith"
	};

	return FilterOperator;

}, /* bExport= */ true);
