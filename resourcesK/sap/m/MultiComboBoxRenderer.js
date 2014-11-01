/*!
* SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
jQuery.sap.declare("sap.m.MultiComboBoxRenderer");jQuery.sap.require("sap.m.InputBaseRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");sap.m.MultiComboBoxRenderer=sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);sap.m.MultiComboBoxRenderer.CSS_CLASS="sapMMultiComboBox";sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS=".sapMMultiComboBox";
sap.m.MultiComboBoxRenderer.addOuterClasses=function(r,c){var C=sap.m.MultiComboBoxRenderer.CSS_CLASS;r.addClass(C);r.addClass(C+"Input")};
sap.m.MultiComboBoxRenderer.addOuterStyles=function(r,c){r.addStyle("max-width",c.getMaxWidth())};
sap.m.MultiComboBoxRenderer.addInnerClasses=function(r,c){r.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"InputInner")};
sap.m.MultiComboBoxRenderer.writeInnerContent=function(r,c){r.write('<div tabindex="-1"');r.writeAttribute("id",c.getId()+"-arrow");r.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"Arrow");r.writeClasses();r.write("></div>")};
sap.m.MultiComboBoxRenderer.openInputTag=function(r,c){r.write("<div class=\"sapMMultiComboBoxBorder\">");r.write("<div class=\"sapMMultiComboBoxScrollContainer\">");if(!c.getEditable()){r.addClass("sapMMultiComboBoxReadonly")}sap.m.MultiComboBoxRenderer._renderTokens(r,c);sap.m.MultiComboBoxRenderer._renderInput(r,c)};
sap.m.MultiComboBoxRenderer._renderTokens=function(r,c){r.renderControl(c._oTokenizer)};
sap.m.MultiComboBoxRenderer._renderInput=function(r,c){r.write("<div class=\"sapMMultiComboBoxInputContainer\">");sap.m.InputBaseRenderer.openInputTag.call(this,r,c)};
sap.m.MultiComboBoxRenderer.closeInputTag=function(r,c){sap.m.InputBaseRenderer.closeInputTag.call(this,r,c);r.write("</div>");r.write("</div>");r.write("</div>");r.write("<div class=\"sapMMultiComboBoxShadowDiv\"/>")};
