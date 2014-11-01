/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides default renderer for control sap.ui.commons.Togglebutton
jQuery.sap.declare("sap.m.ToggleButtonRenderer");
jQuery.sap.require("sap.m.ButtonRenderer");
jQuery.sap.require("sap.ui.core.Renderer");

/**
 * @class ToggleButton renderer.
 * @static
 */

sap.m.ToggleButtonRenderer = sap.ui.core.Renderer.extend(sap.m.ButtonRenderer);

/**
 * Hint: "renderButtonAttributes" is a reserved/hard-coded Button extending function!
 *       It is used to allow extensions to display content after the actual button content.
 *
 * @param {sap.ui.core.RenderManager}
 *            rm the RenderManager currently rendering this control
 * @param {sap.m.ToggleButton}
 *            oToggleButton the ToggleButton that should be rendered
 * @private
 */
sap.m.ToggleButtonRenderer.renderButtonAttributes = function(rm, oToggleButton) {
	var bPressed = oToggleButton.getPressed();

	if (bPressed){
		rm.addClass("sapMToggleBtnPressed");
	}

	rm.writeAttribute('pressed', bPressed);
};
