/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.SegmentedButtonRenderer");

/**
 * @class Segmented renderer. 
 * @static
 */
sap.m.SegmentedButtonRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRenderManager the RenderManager that can be used for writing to the Render-Output-Buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.SegmentedButtonRenderer.render = function(rm, oControl){ 
	var aButtons = oControl.getButtons(),
		sSelectedButton = oControl.getSelectedButton(),
		oItem,
		sTooltip,
		sButtonWidth,
		i = 0;

	
	// return immediately if control is invisible
	if (!oControl.getVisible()) {
		return;
	}


	// write the HTML into the render manager
	rm.write("<ul");
	rm.addClass("sapMSegB");
	rm.addClass("sapMSegBHide");

	rm.writeClasses();
	if (oControl.getWidth() && oControl.getWidth() !== '') {
		rm.addStyle('width', oControl.getWidth());
	}
	rm.writeStyles();
	rm.writeControlData(oControl);
	var sTooltip = oControl.getTooltip_AsString();
	if (sTooltip) {
		rm.writeAttributeEscaped("title", sTooltip);
	}
	rm.write(">");

	for (; i < aButtons.length; i++) {
		oItem = aButtons[i];

		// instead of the button API we render a li element but with the id of the button
		rm.write("<li");
		rm.writeControlData(oItem);
		rm.addClass("sapMSegBBtn");
		if(sSelectedButton === oItem.getId()) {
			rm.addClass("sapMSegBBtnSel");
		}
		if (!oItem.getEnabled()) {
			rm.addClass("sapMSegBBtnDis");
		}
		sTooltip = oItem.getTooltip_AsString();
		if (sTooltip) {
			rm.writeAttributeEscaped("title", sTooltip);
		}
		rm.writeAttribute("tabindex", oItem.getEnabled() ? "0" : "-1");
		rm.writeClasses();
		var sButtonWidth = oItem.getWidth();
		if(sButtonWidth){
			rm.addStyle('width', sButtonWidth);
			rm.writeStyles();
		}
		rm.write('>');
		if(oItem.getIcon() === '' && oItem.getText() !== '') {
			rm.writeEscaped(oItem.getText(), false);
		} else if (oItem.getIcon() !== '' && oItem.getText() === '') {
			var oImage = oItem._getImage((oItem.getId() + "-img"), oItem.getIcon());
			oImage.onload = function() {
				sap.m.Image.prototype.onload.call(oImage);
				window.setTimeout(function() {
					oControl._fCalcBtnWidth();
				},20);
			};
			rm.renderControl(oImage);	

		} else if (oItem.getIcon() !== '' && oItem.getText() !== '' ){
			jQuery.sap.log.error("SEGMENTED: "+oItem.getId()+": Icon and Label is not allowed");
		}
		rm.write("</li>");
	}
	rm.write("</ul>");
};
