/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ComboBoxBaseRenderer");jQuery.sap.require("sap.m.InputBaseRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.ComboBoxBaseRenderer=sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);sap.m.ComboBoxBaseRenderer.CSS_CLASS="sapMComboBoxBase";
sap.m.ComboBoxBaseRenderer.addOuterStyles=function(r,c){r.addStyle("max-width",c.getMaxWidth())};
sap.m.ComboBoxBaseRenderer.addOuterClasses=function(r,c){var C=sap.m.ComboBoxBaseRenderer.CSS_CLASS;r.addClass(C);r.addClass(C+"Input")};
sap.m.ComboBoxBaseRenderer.addInnerClasses=function(r,c){r.addClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"InputInner")};
sap.m.ComboBoxBaseRenderer.addInnerStyles=function(r,c){r.writeAttribute("autocomplete","off");r.writeAttribute("autocorrect","off");r.writeAttribute("autocapitalize","off")};
sap.m.ComboBoxBaseRenderer.writeInnerContent=function(r,c){r.write('<div tabindex="-1"');r.writeAttribute("id",c.getId()+"-arrow");r.addClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Arrow");r.writeClasses();r.write("></div>")};
