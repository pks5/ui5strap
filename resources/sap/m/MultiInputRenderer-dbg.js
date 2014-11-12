/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.MultiInputRenderer");
jQuery.sap.require("sap.ui.core.Renderer");
jQuery.sap.require("sap.m.InputRenderer");

/**
 * @class MultiInput renderer.
 * @static
 */
sap.m.MultiInputRenderer = sap.ui.core.Renderer.extend(sap.m.InputRenderer);

sap.m.MultiInputRenderer.openInputTag = function(oRm, oControl) {
	oRm.write("<div class=\"sapMMultiInputBorder\">");

	sap.m.MultiInputRenderer._renderTokens(oRm, oControl);
	
	sap.m.MultiInputRenderer._renderInput(oRm, oControl);
};

sap.m.MultiInputRenderer._renderTokens = function(oRm, oControl) {
	oRm.renderControl(oControl._tokenizer);
};

sap.m.MultiInputRenderer._renderInput = function(oRm, oControl) {
	oRm.write("<div class=\"sapMMultiInputInputContainer\">");
	sap.m.InputRenderer.openInputTag.call(this, oRm, oControl);
};

sap.m.MultiInputRenderer.closeInputTag = function(oRm, oControl) {
	sap.m.InputRenderer.closeInputTag.call(this, oRm, oControl);
	oRm.write("</div>");
	oRm.write("</div>");
	oRm.write("<div class=\"sapMMultiInputShadowDiv\"/>");
};