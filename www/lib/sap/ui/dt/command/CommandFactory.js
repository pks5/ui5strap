/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject'],function(M){"use strict";var c={"Move":{findClass:function(e,s,S){var m=(S&&S.movedElements&&S.movedElements.length>0)?S.movedElements[0]:undefined;var E=m?m.element:e;var t=E.getMetadata().getName();if(t==="sap.ui.layout.form.FormContainer"||t==="sap.ui.layout.form.FormElement"){jQuery.sap.require("sap.ui.dt.command.SimpleFormMove");return sap.ui.dt.command.SimpleFormMove;}else{jQuery.sap.require("sap.ui.dt.command.Move");return sap.ui.dt.command.Move;}}}};var C=M.extend("sap.ui.dt.command.CommandFactory",{metadata:{library:"sap.ui.dt",properties:{},associations:{},events:{}}});C.getCommandFor=function(e,s,S){var m=c[s];var a=m.clazz;if(!a&&m.findClass){a=m.findClass(e,s,S);}S=jQuery.extend(S,{element:e,name:s});var o=new a(S);return o;};return C;},true);
