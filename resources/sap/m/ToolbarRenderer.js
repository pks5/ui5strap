/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ToolbarRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.ToolbarRenderer={};sap.m.ToolbarRenderer.render=sap.m.BarInPageEnabler.prototype.render;
sap.m.ToolbarRenderer.decorateRootElement=function(r,t){r.addClass("sapMTB");if(!sap.m.Toolbar.hasFlexBoxSupport){r.addClass("sapMTBNoFlex")}else if(!sap.m.Toolbar.hasNewFlexBoxSupport){r.addClass("sapMTBOldFlex")}else{r.addClass("sapMTBNewFlex")}if(t.getActive()){r.addClass("sapMTBActive");r.writeAttribute("tabindex","0")}else{r.addClass("sapMTBInactive")}r.addClass("sapMTB-"+t.getActiveDesign()+"-CTX");var w=t.getWidth();var h=t.getHeight();w&&r.addStyle("width",w);h&&r.addStyle("height",h)};
sap.m.ToolbarRenderer.renderBarContent=function(r,t){t.getContent().forEach(function(c){sap.m.BarInPageEnabler.addChildClassTo(c,t);r.renderControl(c)})};
sap.m.ToolbarRenderer.shouldAddIBarContext=function(c){return false};
