/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.DatePickerRenderer");
jQuery.sap.declare("sap.m.DateRangeSelectionRenderer");

/**
 * @class DateRangeSelection renderer.
 * @static
 */
sap.m.DateRangeSelectionRenderer = sap.ui.core.Renderer.extend(sap.m.DatePickerRenderer);

/**
 * Write the value of the input.
 *
 * @public
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.DateRangeSelectionRenderer.writeInnerValue = function(oRm, oControl) {

	oRm.writeAttributeEscaped("value", oControl._formatValue(oControl.getDateValue(), oControl.getSecondDateValue()));

};