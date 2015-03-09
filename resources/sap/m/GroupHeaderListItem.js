/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBase','./library'],function(q,L,l){"use strict";var G=L.extend("sap.m.GroupHeaderListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},count:{type:"string",group:"Data",defaultValue:null},upperCase:{type:"boolean",group:"Appearance",defaultValue:true}}}});G.prototype.isSelectable=function(){return false};G.prototype.shouldClearLastValue=function(){return true};G.prototype.onBeforeRendering=function(){var p=this.getParent();if(p&&sap.m.Table&&p instanceof sap.m.Table){p.getColumns().forEach(function(c){c.clearLastValue()})}};return G},true);
