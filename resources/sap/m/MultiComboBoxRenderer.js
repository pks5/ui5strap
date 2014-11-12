/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.MultiComboBoxRenderer");jQuery.sap.require("sap.m.InputBaseRenderer");jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");sap.m.MultiComboBoxRenderer=sap.ui.core.Renderer.extend(sap.m.ComboBoxBaseRenderer);sap.m.MultiComboBoxRenderer.CSS_CLASS="sapMMultiComboBox";sap.m.MultiComboBoxRenderer.DOT_CSS_CLASS=".sapMMultiComboBox";
sap.m.MultiComboBoxRenderer.addOuterClasses=function(r,c){sap.m.ComboBoxBaseRenderer.addOuterClasses.apply(this,arguments);r.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS)};
sap.m.MultiComboBoxRenderer.addInnerClasses=function(r,c){sap.m.ComboBoxBaseRenderer.addInnerClasses.apply(this,arguments);r.addClass(sap.m.MultiComboBoxRenderer.CSS_CLASS+"InputInner")};
sap.m.MultiComboBoxRenderer.openInputTag=function(r,c){r.write('<div class="sapMMultiComboBoxBorder"');r.writeAttribute("id",c.getId()+"-border");r.write(">");r.renderControl(c._oTokenizer);r.write("<div class=\"sapMMultiComboBoxInputContainer\">");sap.m.InputBaseRenderer.openInputTag.call(this,r,c)};
sap.m.MultiComboBoxRenderer.closeInputTag=function(r,c){sap.m.InputBaseRenderer.closeInputTag.call(this,r,c);r.write("</div>");r.write("</div>");r.write("<div class=\"sapMMultiComboBoxShadowDiv\"/>")};
