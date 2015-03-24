/*!

* SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.

*/
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var T={};T.render=function(r,c){r.write("<div tabindex=\"-1\"");r.writeControlData(c);r.addClass("sapMToken");r.writeClasses();var t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write(">");T._renderInnerControl(r,c);if(c.getEditable()){r.renderControl(c._deleteIcon)}r.write("</div>")};T._renderInnerControl=function(r,c){r.write("<span class=\"sapMTokenText\">");var t=c.getText();if(t){r.writeEscaped(t)}r.write("</span>")};return T},true);
