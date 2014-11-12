/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.MultiComboBoxRenderer");
jQuery.sap.require("sap.m.InputBaseRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.ui.core.ValueStateSupport");

/**
 * @class MultiComboBox renderer.
 * @static
 */
sap.m.MultiComboBoxRenderer = sap.ui.core.Renderer.extend(sap.m.ComboBoxBaseRenderer);

/**
 * CSS class to be applied to the HTML root element of the MultiComboBox control.
 * 
 * @type {string}
 */
sap.m.MultiComboBoxRenderer.CSS_CLASS = "sapMMultiComboBox";

/**
 * CSS class to be applied to the HTML root element of the MultiComboBox control.
 * 
 * @type {string}
 */
sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS = ".sapMMultiComboBox";

/**
 * Add classes to the MultiComboBox.
 * 
 * @param {sap.ui.core.RenderManager}
 *          oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control}
 *          oControl An object representation of the control that should be rendered.
 */
sap.m.MultiComboBoxRenderer.addOuterClasses = function(oRm, oControl) {
	sap.m.ComboBoxBaseRenderer.addOuterClasses.apply(this, arguments);
	oRm.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS);
};

/**
 * Add inner classes to the MultiMultiComboBox's input element.
 * 
 * @param {sap.ui.core.RenderManager}
 *          oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control}
 *          oControl An object representation of the control that should be rendered.
 */
sap.m.MultiComboBoxRenderer.addInnerClasses = function(oRm, oControl) {
	sap.m.ComboBoxBaseRenderer.addInnerClasses.apply(this, arguments);
	oRm.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "InputInner");
};

sap.m.MultiComboBoxRenderer.openInputTag = function(oRm, oControl) {	
	oRm.write('<div class="sapMMultiComboBoxBorder"');
	oRm.writeAttribute("id", oControl.getId() + "-border");  // UI5 core expect a DIV with ID	
	oRm.write(">");
	
	oRm.renderControl(oControl._oTokenizer);
	
	oRm.write("<div class=\"sapMMultiComboBoxInputContainer\">");
	sap.m.InputBaseRenderer.openInputTag.call(this, oRm, oControl);
};

sap.m.MultiComboBoxRenderer.closeInputTag = function(oRm, oControl) {
	sap.m.InputBaseRenderer.closeInputTag.call(this, oRm, oControl);
	oRm.write("</div>");
	oRm.write("</div>");	
	oRm.write("<div class=\"sapMMultiComboBoxShadowDiv\"/>");
};
