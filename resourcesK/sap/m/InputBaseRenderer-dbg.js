/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.m.InputBaseRenderer");
jQuery.sap.require("sap.ui.core.ValueStateSupport");

/**
 * @class Input renderer.
 *
 * @static
 */
sap.m.InputBaseRenderer = {};

/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.m.Select} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.render = function(oRm, oControl) {
	if (!oControl.getVisible()) {
		return;
	}

	var sValueState = oControl.getValueState();

	oRm.write("<div");
	oRm.writeControlData(oControl);

	// outer styles
	this.addOuterStyles(oRm, oControl);

	if (oControl.getWidth()) {
		oRm.addStyle("width", oControl.getWidth());
	}

	oRm.writeStyles();

	// outer classes
	oRm.addClass("sapMInputBase");
	this.addCursorClass(oRm, oControl);
	this.addOuterClasses(oRm, oControl);

	if (!oControl.getEnabled()) {
		oRm.addClass("sapMInputBaseDisabled");
	}

	if (!oControl.getEditable()) {
		oRm.addClass("sapMInputBaseReadonly");
	}

	if(sValueState !== sap.ui.core.ValueState.None){
		oRm.addClass("sapMInputBaseState");
		oRm.addClass("sapMInputBase" + sValueState);
	}

	oRm.writeClasses();

	// outer attributes
	this.writeOuterAttributes(oRm, oControl);
	var sTooltip = sap.ui.core.ValueStateSupport.enrichTooltip(oControl, oControl.getTooltip_AsString());

	if (sTooltip) {
		oRm.writeAttributeEscaped("title", sTooltip);
	}

	oRm.write(">");

	this.prependInnerContent(oRm, oControl);

	// enable self-made placeholder
	if (oControl._bShowLabelAsPlaceholder) {
		oRm.write('<label class="sapMInputBasePlaceholder"');
		oRm.writeAttribute("id", oControl.getId() + "-placeholder");
		oRm.writeAttribute("for", oControl.getId() + "-inner");
		oRm.write(">");
		oRm.writeEscaped(oControl._getPlaceholder());
		oRm.write("</label>");
	}

	// start inner
	this.openInputTag(oRm, oControl);

	// inner attributes
	oRm.writeAttribute("id", oControl.getId() + "-inner");

	// write the name of input
	if (oControl.getName()) {
		oRm.writeAttributeEscaped("name", oControl.getName());
	}

	// let the browser handle placeholder
	if (!oControl._bShowLabelAsPlaceholder && oControl._getPlaceholder()) {
		oRm.writeAttributeEscaped("placeholder", oControl._getPlaceholder());
	}

	// check if there is a maxLength property
	if (oControl.getMaxLength && oControl.getMaxLength() > 0) {
		oRm.writeAttribute("maxlength", oControl.getMaxLength());
	}

	// check disable and readonly
	if (!oControl.getEnabled()) {
		oRm.writeAttribute("disabled", "disabled");
	} else if (!oControl.getEditable()) {
		oRm.writeAttribute("tabindex", "-1");
		oRm.writeAttribute("readonly", "readonly");
		oRm.addClass("sapMInputBaseReadonlyInner");
	}

	this.writeInnerValue(oRm, oControl);
	this.writeInnerAttributes(oRm, oControl);

	// inner classes
	oRm.addClass("sapMInputBaseInner");
	if(sValueState !== sap.ui.core.ValueState.None){
		oRm.addClass("sapMInputBaseStateInner");
		oRm.addClass("sapMInputBase" + sValueState + "Inner");
	}
	this.addInnerClasses(oRm, oControl);
	oRm.writeClasses();

	// inner styles
	this.addInnerStyles(oRm, oControl);
	oRm.writeStyles();
	oRm.write(">");

	// finish inner
	this.writeInnerContent(oRm, oControl);
	this.closeInputTag(oRm, oControl);

	// finish outer
	oRm.write("</div>");
};

/**
 * This method is reserved for derived classes to add extra attributes to the Input.
 *
 * @deprecated sap.m.InputBaseRenderer#writeInnerAttributes should be called instead of this method.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.writeAttributes = function(oRm, oControl) {
	jQuery.sap.log.warning("Usage of deprecated function: sap.m.InputBaseRenderer#writeAttributes");
	this.writeInnerAttributes(oRm, oControl);
};

/**
 * Adds extra CSS class.
 *
 * @deprecated sap.m.InputBaseRenderer#addOuterClasses should be called instead of this method.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.addClasses = function(oRm, oControl) {
	jQuery.sap.log.warning("Usage of deprecated function: sap.m.InputBaseRenderer#addClasses");
	this.addOuterClasses(oRm, oControl);
};

/**
 * Write the opening tag name of the input.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.openInputTag = function(oRm, oControl) {
	oRm.write("<input");
};

/**
 * Write the value of the input.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.writeInnerValue = function(oRm, oControl) {
	oRm.writeAttributeEscaped("value", oControl.getValue());
};

/**
 * Add cursor class to input container.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.addCursorClass = function(oRm, oControl) {
};

/**
 * This method is reserved for derived class to add extra styles for input container.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.addOuterStyles = function(oRm, oControl) {};

/**
 * This method is reserved for derived classes to add extra classes for input container.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.addOuterClasses = function(oRm, oControl) {};

/**
 * This method is reserved for derived class to add extra attributes for input container.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.writeOuterAttributes = function(oRm, oControl) {};

/**
 * This method is reserved for derived classes to add extra styles for input element.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.addInnerStyles = function(oRm, oControl) {};

/**
 * This method is reserved for derived classes to add extra classes for input element.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.addInnerClasses = function(oRm, oControl) {};

/**
 * This method is reserved for derived classes to add extra attributes for the input element.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.writeInnerAttributes = function(oRm, oControl) {};

/**
 * This method is reserved for derived classes to prepend inner content.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.prependInnerContent = function(oRm, oControl) {};

/**
 * Write the value of the input.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.writeInnerContent = function(oRm, oControl) {};

/**
 * Write the closing tag name of the input.
 *
 * @param {sap.ui.core.RenderManager} oRm The RenderManager that can be used for writing to the render output buffer.
 * @param {sap.ui.core.Control} oControl An object representation of the control that should be rendered.
 */
sap.m.InputBaseRenderer.closeInputTag = function(oRm, oControl) {};