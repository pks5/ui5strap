/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.SliderRenderer");

/**
 * @class Slider renderer.
 * @static
 */
sap.m.SliderRenderer = {};

/**
 * CSS class to be applied to the HTML root element of the Slider control.
 *
 * @type {string}
 */
sap.m.SliderRenderer.CSS_CLASS = "sapMSlider";

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oSlider An object representation of the slider that should be rendered.
 */
sap.m.SliderRenderer.render = function(oRm, oSlider) {
	var bEnabled = oSlider.getEnabled(),
		sTooltip = oSlider.getTooltip_AsString(),
		CSS_CLASS = sap.m.SliderRenderer.CSS_CLASS;

	// avoid render when not visible
	if (!oSlider.getVisible()) {
		return;
	}

	oRm.write("<div");
	oRm.addClass(CSS_CLASS);

	if (!bEnabled) {
		oRm.addClass(CSS_CLASS + "Disabled");
	}

	oRm.addStyle("width", oSlider.getWidth());
	oRm.addStyle("visibility", "hidden");
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.writeControlData(oSlider);

	if (sTooltip) {
		oRm.writeAttributeEscaped("title", sTooltip);
	}

	oRm.write(">");
	oRm.write('<div');
	oRm.addClass(CSS_CLASS + "Inner");

	if (!bEnabled) {
		oRm.addClass(CSS_CLASS + "InnerDisabled");
	}

	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write(">");

	if (oSlider.getProgress()) {
		this.renderProgressIndicator(oRm, oSlider);
	}

	this.renderHandle(oRm, oSlider);
	oRm.write("</div>");

	if (oSlider.getName()) {
		this.renderInput(oRm, oSlider);
	}

	oRm.write("</div>");
};

sap.m.SliderRenderer.renderProgressIndicator = function(oRm, oSlider) {
	oRm.write("<div");
	oRm.writeAttribute("id", oSlider.getId() + "-progress");
	oRm.addClass(sap.m.SliderRenderer.CSS_CLASS + "Progress");
	oRm.addStyle("width", oSlider._sProgressValue);
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write("></div>");
};

sap.m.SliderRenderer.renderHandle = function(oRm, oSlider) {
	var bEnabled = oSlider.getEnabled(),
		fValue = oSlider.getValue();

	oRm.write("<span");
	oRm.writeAttribute("id", oSlider.getId() + "-handle");
	oRm.writeAttribute("title", fValue);
	oRm.addClass(sap.m.SliderRenderer.CSS_CLASS + "Handle");
	oRm.addStyle(sap.m.Slider._bRtl ? "right" : "left", oSlider._sProgressValue);

	// WAI-ARIA
	oRm.writeAccessibilityState(oSlider, {
		role: "slider",
		orientation: "horizontal",
		valuemin: oSlider.getMin(),
		valuemax: oSlider.getMax(),
		valuenow: fValue,
		valuetext: fValue,
		live: "assertive",
		disabled: !bEnabled
	});

	oRm.writeClasses();
	oRm.writeStyles();

	if (bEnabled) {
		oRm.writeAttribute("tabindex", "0");
	}

	oRm.write("></span>");
};

sap.m.SliderRenderer.renderInput = function(oRm, oSlider) {
	oRm.write('<input type="text" class="' + sap.m.SliderRenderer.CSS_CLASS + 'Input"');

	if (!oSlider.getEnabled()) {
		oRm.write("disabled");
	}

	oRm.writeAttributeEscaped("name", oSlider.getName());
	oRm.writeAttribute("value", oSlider.getValue());
	oRm.write("/>");
};