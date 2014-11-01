/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ComboBoxRenderer");
jQuery.sap.require("sap.m.InputBaseRenderer");
jQuery.sap.require("sap.ui.core.Renderer");

/**
 * @class ComboBox renderer.
 *
 * @static
 */
sap.m.ComboBoxRenderer = sap.ui.core.Renderer.extend(sap.m.ComboBoxBaseRenderer);

/**
 * CSS class to be applied to the root element of the ComboBox.
 *
 * @readonly
 * @const {string}
 */
sap.m.ComboBoxRenderer.CSS_CLASS = "sapMComboBox";

/**
 * Add classes to the ComboBox.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.ComboBoxRenderer.addOuterClasses = function(oRm, oControl) {
	var CSS_CLASS = sap.m.ComboBoxRenderer.CSS_CLASS;
	sap.m.ComboBoxBaseRenderer.addOuterClasses.apply(this, arguments);
	oRm.addClass(CSS_CLASS);
	oRm.addClass(CSS_CLASS + "Input");
};

/**
 * Add inner classes to the ComboBox's input element.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.ComboBoxRenderer.addInnerClasses = function(oRm, oControl) {
	sap.m.ComboBoxBaseRenderer.addInnerClasses.apply(this, arguments);
	oRm.addClass(sap.m.ComboBoxRenderer.CSS_CLASS + "InputInner");
};