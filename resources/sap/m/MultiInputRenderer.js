/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.MultiInputRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.InputRenderer");sap.m.MultiInputRenderer=sap.ui.core.Renderer.extend(sap.m.InputRenderer);
sap.m.MultiInputRenderer.openInputTag=function(r,c){r.write("<div class=\"sapMMultiInputBorder\">");sap.m.MultiInputRenderer._renderTokens(r,c);sap.m.MultiInputRenderer._renderInput(r,c)};
sap.m.MultiInputRenderer._renderTokens=function(r,c){r.renderControl(c._tokenizer)};
sap.m.MultiInputRenderer._renderInput=function(r,c){r.write("<div class=\"sapMMultiInputInputContainer\">");sap.m.InputRenderer.openInputTag.call(this,r,c)};
sap.m.MultiInputRenderer.closeInputTag=function(r,c){sap.m.InputRenderer.closeInputTag.call(this,r,c);r.write("</div>");r.write("</div>");r.write("<div class=\"sapMMultiInputShadowDiv\"/>")};
