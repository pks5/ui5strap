/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ComboBoxRenderer");jQuery.sap.require("sap.m.InputBaseRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.ComboBoxRenderer=sap.ui.core.Renderer.extend(sap.m.ComboBoxBaseRenderer);sap.m.ComboBoxRenderer.CSS_CLASS="sapMComboBox";
sap.m.ComboBoxRenderer.addOuterClasses=function(r,c){var C=sap.m.ComboBoxRenderer.CSS_CLASS;sap.m.ComboBoxBaseRenderer.addOuterClasses.apply(this,arguments);r.addClass(C);r.addClass(C+"Input")};
sap.m.ComboBoxRenderer.addInnerClasses=function(r,c){sap.m.ComboBoxBaseRenderer.addInnerClasses.apply(this,arguments);r.addClass(sap.m.ComboBoxRenderer.CSS_CLASS+"InputInner")};
