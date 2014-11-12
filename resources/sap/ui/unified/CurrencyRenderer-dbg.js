/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.ui.unified.Menu
jQuery.sap.declare("sap.ui.unified.CurrencyRenderer");


/**
 * @class Currency renderer.
 *
 * @version 1.24.3
 * @static
 */
sap.ui.unified.CurrencyRenderer = {
};

/**
 * Renders the HTML for the given control, using the provided
 * {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager}
 *            oRenderManager The RenderManager that can be used for writing to the render-output-buffer.
 * @param {sap.ui.core.Control}
 *            oMenu An object representation of the control that should be rendered
 */
sap.ui.unified.CurrencyRenderer.render = function(oRm,oCurrency) {
	var bHasValue = oCurrency._hasValue();
	oRm.write("<div")
	oRm.writeControlData(oCurrency);
	oRm.addClass("sapUiUfdCurrency");
	if (!oCurrency._hasValue()) {
		oRm.addClass("sapUiUfdCurrencyNoVal");
	}
	oRm.writeClasses();
	oRm.write(">");
	oRm.write("<div");
	oRm.addClass("sapUiUfdCurrencyAlign");
	oRm.writeClasses();
	oRm.write(">");
	oRm.write("<span");
	oRm.addClass("sapUiUfdCurrencyValue");
	oRm.writeClasses();
	oRm.write(">");
	oRm.writeEscaped(oCurrency.getFormattedValue());
	oRm.write("</span>");
	oRm.write("<span");
	oRm.addClass("sapUiUfdCurrencyCurrency");
	oRm.writeClasses();
	oRm.write(">");
	if (oCurrency.getUseSymbol()) {
		oRm.writeEscaped(oCurrency.getCurrencySymbol());
	} else {
		oRm.writeEscaped(oCurrency.getCurrency());
	}
	oRm.write("</span>");
	oRm.write("</div>");
	oRm.write("</div>");
};