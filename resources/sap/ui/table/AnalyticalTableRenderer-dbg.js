/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', './TableRenderer'],
	function(jQuery, Renderer, TableRenderer) {
	"use strict";


	/**
	 * AnalyticalTable renderer. 
	 * @namespace
	 */
	var AnalyticalTableRenderer = Renderer.extend(TableRenderer);

	return AnalyticalTableRenderer;

}, /* bExport= */ true);
