/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.require("sap.ui.core.Renderer");jQuery.sap.require("sap.m.InputBaseRenderer");jQuery.sap.declare("sap.m.DatePickerRenderer");sap.m.DatePickerRenderer=sap.ui.core.Renderer.extend(sap.m.InputBaseRenderer);
sap.m.DatePickerRenderer.addOuterClasses=function(r,d){r.addClass("sapMDP");if(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10){r.addClass("sapMInputIE9")}};
sap.m.DatePickerRenderer.writeInnerContent=function(r,d){if(d.getEnabled()&&d.getEditable()){var c=[];var a={};a["id"]=d.getId()+"-icon";a["tabindex"]="-1";r.writeIcon("sap-icon://appointment-2",c,a)}var b=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var t=b.getText("DATEPICKER_KEYBOARD");var D=b.getText("DATEPICKER_DATE_TYPE");var T=sap.ui.core.ValueStateSupport.enrichTooltip(d,d.getTooltip_AsString());if(T){t=T+". "+t}t=D+". "+t;r.write('<SPAN id="'+d.getId()+'-Descr" style="visibility: hidden; display: none;">');r.writeEscaped(t);r.write('</SPAN>')};
sap.m.DatePickerRenderer.writeInnerValue=function(r,d){r.writeAttributeEscaped("value",d._formatValue(d.getDateValue()))};
sap.m.DatePickerRenderer.writeInnerAttributes=function(r,d){if(sap.ui.Device.browser.mobile){r.writeAttribute("readonly","readonly")}var p={multiline:false,autocomplete:"none",haspopup:true,describedby:{value:d.getId()+"-Descr",append:true}};if(d.getValueState()==sap.ui.core.ValueState.Error){p["invalid"]=true}r.writeAccessibilityState(d,p)};
