/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.IconTabBarRenderer");
jQuery.sap.require("sap.ui.core.IconPool");
/**
 * @class HBox renderer.
 * @static
 */
sap.m.IconTabBarRenderer = {
};

/**
 * Array of all available icon color CSS classes
 * 
 * @private
 */
sap.m.IconTabBarRenderer._aAllIconColors = ['sapMITBFilterCritical', 'sapMITBFilterPositive', 'sapMITBFilterNegative', 'sapMITBFilterDefault'];


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.IconTabBarRenderer.render = function(oRm, oControl){
	var oContent = oControl.getContent(),
		oHeader = oControl._getIconTabHeader();

	// return immediately if control is not visible
	if (!oControl.getVisible()) {
		return;
	}

	// start control wrapper
	oRm.write("<div ");
	oRm.writeControlData(oControl);
	oRm.addClass("sapMITB");
	oRm.writeClasses();
	oRm.write(">");

	// render icon tab header (if not configured to hide by ObjectHeader)
	if (!oControl._bHideHeader) {
		oRm.renderControl(oHeader);
	}

	// render outer content
	oRm.write("<div id=\"" + oControl.getId() + "-containerContent\" ");
	oRm.addClass("sapMITBContainerContent");
	if (!oControl.getExpanded()) { // add special styles  when closed
		oRm.addClass("sapMITBContentClosed");
	}
	oRm.writeClasses();
	oRm.write(">");

	// render inner content
	oRm.write("<div id=\"" + oControl.getId() + "-content\" class=\"sapMITBContent\" ");
	if(!oControl.getExpanded()) { // hide content when closed
		oRm.write("style=\"display: none\"");
	}
	oRm.write(">");
	if (oControl.getExpanded()) {
		// content from selected item
		if (oHeader.oSelectedItem && oHeader.oSelectedItem.getContent()) {
			var oContentSelectedTab = oHeader.oSelectedItem.getContent();
			if (oContentSelectedTab.length > 0) {
				oContent = oContentSelectedTab;
			}
		}
		// render the content
		if (oContent.length > 0) {
			for (var i = 0; i < oContent.length; i++) {
				oRm.renderControl(oContent[i]);
			}
		}
	}
	oRm.write("</div>");

	// end outer content
	oRm.write("</div>");

	// end control wrapper
	oRm.write("</div>");
};

