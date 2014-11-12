/*!

 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.BarRenderer");jQuery.sap.require("sap.ui.core.Renderer");sap.m.BarRenderer={};sap.m.BarRenderer.render=sap.m.BarInPageEnabler.prototype.render;
sap.m.BarRenderer.decorateRootElement=function(r,c){r.addClass("sapMBar");r.addClass(this.getContext(c));if(c.getTranslucent()&&(sap.ui.Device.support.touch||jQuery.sap.simulateMobileOnDesktop)){r.addClass("sapMBarTranslucent")}r.addClass("sapMBar-CTX")};
sap.m.BarRenderer.shouldAddIBarContext=function(){return true};
sap.m.BarRenderer.renderBarContent=function(r,c){var C="</div>";r.write("<div id='"+c.getId()+"-BarLeft' ");r.addClass('sapMBarLeft');r.addClass('sapMBarContainer');r.writeClasses();r.write(">");this.renderAllControls(c.getContentLeft(),r,c);r.write(C);r.write("<div id='"+c.getId()+"-BarMiddle' ");r.addClass('sapMBarMiddle');r.writeClasses();r.write(">");if(c.getEnableFlexBox()){c._oflexBox=c._oflexBox||new sap.m.HBox(c.getId()+"-BarPH",{alignItems:"Center"}).addStyleClass("sapMBarPH").setParent(c,null,true);c.getContentMiddle().forEach(function(m){c._oflexBox.addItem(m)});r.renderControl(c._oflexBox)}else{r.write("<div id='"+c.getId()+"-BarPH' ");r.addClass('sapMBarPH');r.addClass('sapMBarContainer');r.writeClasses();r.write(">");this.renderAllControls(c.getContentMiddle(),r,c);r.write(C)}r.write(C);r.write("<div id='"+c.getId()+"-BarRight'");r.addClass('sapMBarRight');r.addClass('sapMBarContainer');if(sap.ui.getCore().getConfiguration().getRTL()){r.addClass("sapMRTL")}r.writeClasses();r.write(">");this.renderAllControls(c.getContentRight(),r,c);r.write(C)};
sap.m.BarRenderer.renderAllControls=function(c,r,b){c.forEach(function(C){sap.m.BarInPageEnabler.addChildClassTo(C,b);r.renderControl(C)})};
sap.m.BarRenderer._mContexts={Header:"sapMHeader-CTX",SubHeader:"sapMSubHeader-CTX",Footer:"sapMFooter-CTX",Default:"sapMContent-CTX",};
sap.m.BarRenderer.getContext=function(c){var d=c.getDesign(),C=sap.m.BarRenderer._mContexts;return C[d]||C.Default};
