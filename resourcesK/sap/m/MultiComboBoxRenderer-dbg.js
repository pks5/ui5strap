/*!
* SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
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
sap.m.MultiComboBoxRenderer = sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);

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
*            oRm The RenderManager that can be used for writing to the render
*            output buffer.
* @param {sap.ui.core.Control}
*            oControl An object representation of the control that should be
*            rendered.
*/
sap.m.MultiComboBoxRenderer.addOuterClasses = function(oRm, oControl) {
       var CSS_CLASS = sap.m.MultiComboBoxRenderer.CSS_CLASS;

       oRm.addClass(CSS_CLASS);
       oRm.addClass(CSS_CLASS + "Input");
};

/**
 * Add extra styles for input container.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.MultiComboBoxRenderer.addOuterStyles = function(oRm, oControl) {
	oRm.addStyle("max-width", oControl.getMaxWidth());
};

/**
* Add inner classes to the MultiMultiComboBox's input element.
* 
 * @param {sap.ui.core.RenderManager}
*            oRm The RenderManager that can be used for writing to the render
*            output buffer.
* @param {sap.ui.core.Control}
*            oControl An object representation of the control that should be
*            rendered.
*/
sap.m.MultiComboBoxRenderer.addInnerClasses = function(oRm, oControl) {
       oRm.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "InputInner");
};

/**
* Renders the MultiMultiComboBox's arrow, using the provided
* {@link sap.ui.core.RenderManager}.
* 
 * @param {sap.ui.core.RenderManager}
*            oRm The RenderManager that can be used for writing to the render
*            output buffer.
* @param {sap.ui.core.Control}
*            oControl An object representation of the control that should be
*            rendered.
*/
sap.m.MultiComboBoxRenderer.writeInnerContent = function(oRm, oControl) {
	oRm.write('<div tabindex="-1"');
	oRm.writeAttribute("id", oControl.getId() + "-arrow");
	oRm.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS + "Arrow");
	oRm.writeClasses();
	oRm.write("></div>");
};

sap.m.MultiComboBoxRenderer.openInputTag = function(oRm, oControl) {
	oRm.write("<div class=\"sapMMultiComboBoxBorder\">");
	oRm.write("<div class=\"sapMMultiComboBoxScrollContainer\">");
	if (!oControl.getEditable()) {
		oRm.addClass("sapMMultiComboBoxReadonly");
	}
	sap.m.MultiComboBoxRenderer._renderTokens(oRm, oControl);

	sap.m.MultiComboBoxRenderer._renderInput(oRm, oControl);

};

sap.m.MultiComboBoxRenderer._renderTokens = function(oRm, oControl) {
	oRm.renderControl(oControl._oTokenizer);
};

sap.m.MultiComboBoxRenderer._renderInput = function(oRm, oControl) {
	oRm.write("<div class=\"sapMMultiComboBoxInputContainer\">");
	sap.m.InputBaseRenderer.openInputTag.call(this, oRm, oControl);
};

sap.m.MultiComboBoxRenderer.closeInputTag = function(oRm, oControl) {
	sap.m.InputBaseRenderer.closeInputTag.call(this, oRm, oControl);
	oRm.write("</div>");
	oRm.write("</div>");
	oRm.write("</div>");
	oRm.write("<div class=\"sapMMultiComboBoxShadowDiv\"/>");
};



