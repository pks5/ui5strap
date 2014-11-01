/*
 * @copyright
 */
jQuery.sap.declare("sap.m.ObjectAttributeRenderer");sap.m.ObjectAttributeRenderer={};
sap.m.ObjectAttributeRenderer.render=function(r,o){if(o.getVisible()&&!o._isEmpty()){r.write("<div");r.writeControlData(o);r.addClass("sapMObjectAttributeDiv");if(o.getActive()){r.addClass("sapMObjectAttributeActive");r.writeAttribute("tabindex","0")}r.writeClasses();var t=o.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}r.write(">");r.write("<span id= "+o.getId()+"-text >");r.renderControl(o._getUpdatedTextControl());r.write("</span>");r.write("</div>")}};
