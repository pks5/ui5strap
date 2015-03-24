/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var O={};O.render=function(r,o){if(!o._isEmpty()){r.write("<div");r.writeControlData(o);var t=o.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.addClass("sapMObjStatus");r.addClass("sapMObjStatus"+o.getState());r.writeClasses();r.write(">");if(o.getTitle()){r.write("<span");r.addClass("sapMObjStatusTitle");r.writeClasses();r.write(">");r.writeEscaped(o.getTitle()+":");r.write("</span>")}if(o.getIcon()){r.write("<span");r.addClass("sapMObjStatusIcon");r.writeClasses();r.write(">");r.renderControl(o._getImageControl());r.write("</span>")}if(o.getText()){r.write("<span");r.addClass("sapMObjStatusText");r.writeClasses();r.write(">");r.writeEscaped(o.getText());r.write("</span>")}r.write("</div>")}};return O},true);
