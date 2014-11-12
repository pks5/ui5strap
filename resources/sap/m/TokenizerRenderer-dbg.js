/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.TokenizerRenderer");

/**
 * @class Tokenizer renderer. 
 * @static
 */
sap.m.TokenizerRenderer = {
};


/**
 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
 * 
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.TokenizerRenderer.render = function(oRm, oControl){ 
	// Return immediately if control is invisible
       if (!oControl.getVisible()) {
             return;
       }

	//write the HTML into the render manager
	oRm.write("<div tabindex=\"-1\"");
	oRm.writeControlData(oControl);
	oRm.addClass("sapMTokenizer");
	oRm.writeClasses();
	oRm.write(">"); // div element

	var sClass = "class=\"sapMTokenizerScrollContainer\">";
	var sSpace = " ";
		
	var sIdScrollContainer = "id=" + oControl.getId() + "-scrollContainer";
	oRm.write("<div" + sSpace + sIdScrollContainer + sSpace + sClass);		
	
	sap.m.TokenizerRenderer._renderTokens(oRm, oControl);
	 
	oRm.write("</div>");
	oRm.write("</div>");
};

/**
 * renders the tokens
 * 
 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
 */
sap.m.TokenizerRenderer._renderTokens = function(oRm, oControl){	
	var i, length, tokens;
	tokens = oControl.getTokens();
	length = tokens.length;
	for (i = 0; i < length; i++){
		oRm.renderControl(tokens[i]);
	}
};