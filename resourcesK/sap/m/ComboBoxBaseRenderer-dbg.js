/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ComboBoxBaseRenderer");
jQuery.sap.require("sap.m.InputBaseRenderer");
jQuery.sap.require("sap.ui.core.Renderer");

/**
 * @class ComboBoxBase renderer.
 *
 * @static
 */
sap.m.ComboBoxBaseRenderer = sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);

/**
 * CSS class to be applied to the root element of the ComboBoxBase.
 *
 * @readonly
 * @const {string}
 */
sap.m.ComboBoxBaseRenderer.CSS_CLASS = "sapMComboBoxBase";

/**
 * Add extra styles for input container.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.ComboBoxBaseRenderer.addOuterStyles = function(oRm, oControl) {
	oRm.addStyle("max-width", oControl.getMaxWidth());
};

/**
 * Add classes to the ComboBox.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.ComboBoxBaseRenderer.addOuterClasses = function(oRm, oControl) {
	var CSS_CLASS = sap.m.ComboBoxBaseRenderer.CSS_CLASS;

	oRm.addClass(CSS_CLASS);
	oRm.addClass(CSS_CLASS + "Input");
};

/**
 * Add inner classes to the ComboBox's input element.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.ComboBoxBaseRenderer.addInnerClasses = function(oRm, oControl) {
	oRm.addClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "InputInner");
};

/**
 * Renders the ComboBox's arrow, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.ComboBoxBaseRenderer.writeInnerContent = function(oRm, oControl) {
	oRm.write('<div tabindex="-1"');
	oRm.writeAttribute("id", oControl.getId() + "-arrow");
	oRm.addClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS + "Arrow");
	oRm.writeClasses();
	oRm.write("></div>");
};