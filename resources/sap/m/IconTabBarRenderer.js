/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.IconTabBarRenderer");jQuery.sap.require("sap.ui.core.IconPool");sap.m.IconTabBarRenderer={};sap.m.IconTabBarRenderer._aAllIconColors=['sapMITBFilterCritical','sapMITBFilterPositive','sapMITBFilterNegative','sapMITBFilterDefault'];
sap.m.IconTabBarRenderer.render=function(r,c){var C=c.getContent(),h=c._getIconTabHeader();if(!c.getVisible()){return}r.write("<div ");r.writeControlData(c);r.addClass("sapMITB");r.writeClasses();r.write(">");if(!c._bHideHeader){r.renderControl(h)}r.write("<div id=\""+c.getId()+"-containerContent\" ");r.addClass("sapMITBContainerContent");if(!c.getExpanded()){r.addClass("sapMITBContentClosed")}r.writeClasses();r.write(">");r.write("<div id=\""+c.getId()+"-content\" class=\"sapMITBContent\" ");if(!c.getExpanded()){r.write("style=\"display: none\"")}r.write(">");if(c.getExpanded()){if(h.oSelectedItem&&h.oSelectedItem.getContent()){var o=h.oSelectedItem.getContent();if(o.length>0){C=o}}if(C.length>0){for(var i=0;i<C.length;i++){r.renderControl(C[i])}}}r.write("</div>");r.write("</div>");r.write("</div>")};
