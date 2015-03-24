/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var L={};L.render=function(r,c){r.write("<a");r.writeControlData(c);r.addClass("sapMLnk");if(c.getSubtle()){r.addClass("sapMLnkSubtle")}if(c.getEmphasized()){r.addClass("sapMLnkEmphasized")}if(!c.getEnabled()){r.addClass("sapMLnkDsbl");r.writeAttribute("disabled","true");r.writeAttribute("tabIndex","-1")}else{r.writeAttribute("tabIndex","0")}if(c.getWrapping()){r.addClass("sapMLnkWrapping")}if(c.getTooltip_AsString()){r.writeAttributeEscaped("title",c.getTooltip_AsString())}if(c.getHref()){r.writeAttributeEscaped("href",c.getHref())}else{r.writeAttribute("href","javascript:void(0);")}if(c.getTarget()){r.writeAttributeEscaped("target",c.getTarget())}if(c.getWidth()){r.addStyle("width",c.getWidth())}else{r.addClass("sapMLnkMaxWidth")}r.writeClasses();r.writeStyles();r.write(">");if(c.getText()){r.writeEscaped(c.getText())}r.write("</a>")};return L},true);
