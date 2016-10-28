/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var U={};U.applyChange=function(c,C,m,v){var o=c.getDefinition();var u=o.content.sUnhideId;var a=m.byId(u,v);var b=m.getAggregation(C,"content");var s=-1;if(o.changeType==="unhideSimpleFormField"){b.some(function(f,i){if(f===a){s=i;m.setVisible(f,true);}if(s>=0&&i>s){if((m.getControlType(f)==="sap.m.Label")||(m.getControlType(f)==="sap.ui.core.Title")){return true;}else{m.setVisible(f,true);}}});}return true;};U.completeChangeContent=function(c,s){var C=c.getDefinition();if(s.sUnhideId){C.content.sUnhideId=s.sUnhideId;}else{throw new Error("oSpecificChangeInfo.sUnhideId attribute required");}};return U;},true);
