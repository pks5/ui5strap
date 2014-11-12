/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.ui.table.ColumnMenuRenderer
jQuery.sap.declare("sap.ui.table.ColumnMenuRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.ui.unified.MenuRenderer");

/**
 * @class Renderer for the sap.ui.table.ColumnMenuRendere
 * @static
 */
sap.ui.table.ColumnMenuRenderer = sap.ui.core.Renderer.extend(sap.ui.unified.MenuRenderer);