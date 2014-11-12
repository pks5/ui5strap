/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.SelectRenderer");jQuery.sap.require("sap.ui.core.ValueStateSupport");sap.m.SelectRenderer={};sap.m.SelectRenderer.CSS_CLASS="sapMSlt";
sap.m.SelectRenderer.render=function(r,s){var t=sap.ui.core.ValueStateSupport.enrichTooltip(s,s.getTooltip_AsString()),T=s.getType(),a=s.getAutoAdjustWidth(),e=s.getEnabled(),C=sap.m.SelectRenderer.CSS_CLASS;if(!s.getVisible()){return}r.write("<div");this.addStyleClass(r,s);r.addClass(C);r.addClass(C+s.getType());if(!e){r.addClass(C+"Disabled")}if(a){r.addClass(C+"AutoAdjustedWidth")}else{r.addStyle("width",s.getWidth())}if(s.getIcon()){r.addClass(C+"WithIcon")}if(e&&sap.ui.Device.system.desktop){r.addClass(C+"Hoverable")}r.addClass(C+"WithArrow");r.addStyle("max-width",s.getMaxWidth());r.writeControlData(s);r.writeStyles();r.writeClasses();if(t){r.writeAttributeEscaped("title",t)}if(e){r.writeAttribute("tabindex","0")}r.write(">");switch(T){case sap.m.SelectType.Default:this.renderLabel(r,s);this.renderArrow(r,s);break;case sap.m.SelectType.IconOnly:this.renderIcon(r,s);break}if(s._isRequiredSelectElement()){this.renderSelectElement(r,s)}r.write("</div>")};
sap.m.SelectRenderer.renderLabel=function(r,s){var S=s.getSelectedItem();r.write('<label class="'+sap.m.SelectRenderer.CSS_CLASS+'Label"');r.writeAttribute("id",s.getId()+"-label");r.writeAttribute("for",s.getId());r.write(">");r.writeEscaped(S?S.getText():"");r.write('</label>')};
sap.m.SelectRenderer.renderArrow=function(r,s){r.write('<span class="'+sap.m.SelectRenderer.CSS_CLASS+'Arrow"');r.writeAttribute("id",s.getId()+"-arrow");r.write("></span>")};
sap.m.SelectRenderer.renderIcon=function(r,s){r.writeIcon(s.getIcon(),sap.m.SelectRenderer.CSS_CLASS+"Icon")};
sap.m.SelectRenderer.renderSelectElement=function(r,s){var n=s.getName(),S=s.getSelectedItem(),a=S?S.getText():"";r.write('<select class="'+sap.m.SelectRenderer.CSS_CLASS+"Native"+'"');if(n){r.writeAttributeEscaped("name",n)}r.writeAttribute("tabindex","-1");r.write(">");this.renderOptions(r,s,a);r.write("</select>")};
sap.m.SelectRenderer.renderOptions=function(r,s,S){var I=s.getItems(),a=I.length,i=0;for(;i<a;i++){r.write("<option>");r.writeEscaped(I[i].getText());r.write("</option>")}if(a===0){r.write("<option>"+S+"</option>")}};
sap.m.SelectRenderer.addStyleClass=function(r,s){};
