/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./InputBaseRenderer','sap/ui/core/Renderer'],function(q,I,R){"use strict";var C=R.extend(sap.m.ComboBoxBaseRenderer);C.CSS_CLASS="sapMComboBox";C.addOuterClasses=function(r,c){var a=C.CSS_CLASS;sap.m.ComboBoxBaseRenderer.addOuterClasses.apply(this,arguments);r.addClass(a);r.addClass(a+"Input")};C.addInnerClasses=function(r,c){sap.m.ComboBoxBaseRenderer.addInnerClasses.apply(this,arguments);r.addClass(C.CSS_CLASS+"InputInner")};return C},true);
