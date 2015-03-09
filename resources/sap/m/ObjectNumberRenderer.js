/*
 * @copyright
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var O={};O.render=function(r,o){var t;r.write("<div");r.writeControlData(o);t=o.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.addClass("sapMObjectNumber");if(o.getEmphasized()){r.addClass("sapMObjectNumberEmph")}r.addClass(o._sCSSPrefixObjNumberStatus+o.getState());r.writeClasses();r.write(">");r.write("<span");r.addClass("sapMObjectNumberText");r.writeClasses();r.write(">");r.writeEscaped(o.getNumber());r.write("</span>");r.write("<span");r.addClass("sapMObjectNumberUnit");r.writeClasses();r.write(">");var u=o.getUnit();if(!u){u=o.getNumberUnit()}r.writeEscaped(u);r.write("</span>");r.write("</div>")};return O},true);
