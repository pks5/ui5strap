/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.IconTabBar");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.IconTabBar",{metadata:{interfaces:["sap.m.ObjectHeaderContainer"],library:"sap.m",properties:{"showSelection":{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},"expandable":{type:"boolean",group:"Misc",defaultValue:true},"expanded":{type:"boolean",group:"Misc",defaultValue:true},"selectedKey":{type:"string",group:"Data",defaultValue:null},"visible":{type:"boolean",group:"Behavior",defaultValue:true},"upperCase":{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{"items":{type:"sap.m.IconTab",multiple:true,singularName:"item"},"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"},"_header":{type:"sap.m.IconTabHeader",multiple:false,visibility:"hidden"}},events:{"select":{},"expand":{}}}});sap.m.IconTabBar.M_EVENTS={'select':'select','expand':'expand'};
sap.m.IconTabBar.prototype.setExpanded=function(e){this.setProperty("expanded",e,true);if(this.$().length){this._toggleExpandCollapse(e)}return this};
sap.m.IconTabBar.prototype.setExpandable=function(e){this.setProperty("expandable",e,true);return this};
sap.m.IconTabBar.prototype._rerenderContent=function(c){var $=this.$("content");if(c&&($.length>0)){var r=sap.ui.getCore().createRenderManager();for(var i=0;i<c.length;i++){r.renderControl(c[i])}r.flush($[0]);r.destroy()}};
sap.m.IconTabBar.prototype._toggleExpandCollapse=function(e){var $=this.$("content");if(e===undefined){e=!this.getExpanded()}if(this._getIconTabHeader().oSelectedItem){this._getIconTabHeader().oSelectedItem.$().toggleClass("sapMITBSelected",e)}this._iAnimationCounter=(this._iAnimationCounter===undefined?1:++this._iAnimationCounter);if(e){if(this._getIconTabHeader().oSelectedItem){if(this.$("content").children().length===0){var s=this._getIconTabHeader().oSelectedItem.getContent();if(s.length>0){this._rerenderContent(s)}else{this._rerenderContent(this.getContent())}}$.stop(true,true).slideDown('400',jQuery.proxy(this.onTransitionEnded,this,e));this.$("containerContent").toggleClass("sapMITBContentClosed",!e)}}else{this.$("contentArrow").hide();$.stop(true,true).slideUp('400',jQuery.proxy(this.onTransitionEnded,this,e))}if(!e||this._getIconTabHeader().oSelectedItem){this.setProperty("expanded",e,true)}this.fireExpand({expand:e,collapse:!e});return this};
sap.m.IconTabBar.prototype.onTransitionEnded=function(e){var $=this.$("content"),a=this.$("containerContent"),b=this.$("contentArrow");if(this._iAnimationCounter===1){a.toggleClass("sapMITBContentClosed",!e);if(e){b.show();$.css("display","block")}else{b.hide();$.css("display","none")}}this._iAnimationCounter=(this._iAnimationCounter>0?--this._iAnimationCounter:0);return this};
sap.m.IconTabBar.prototype._getIconTabHeader=function(){var c=this.getAggregation("_header");if(!c){c=new sap.m.IconTabHeader(this.getId()+"--header",{});this.setAggregation("_header",c,true)}return c};
sap.m.IconTabBar.prototype.setShowSelection=function(v){this._getIconTabHeader().setShowSelection(v);return this};
sap.m.IconTabBar.prototype.getShowSelection=function(){return this._getIconTabHeader().getShowSelection()};
sap.m.IconTabBar.prototype.setSelectedKey=function(v){this._getIconTabHeader().setSelectedKey(v);return this};
sap.m.IconTabBar.prototype.getSelectedKey=function(){return this._getIconTabHeader().getSelectedKey()};
sap.m.IconTabBar.prototype.setSelectedItem=function(i,a){return this._getIconTabHeader().setSelectedItem(i,a)};
sap.m.IconTabBar.prototype._callMethodInManagedObject=function(f,a){var A=Array.prototype.slice.call(arguments),h;if(a==="items"){h=this._getIconTabHeader();return h[f].apply(h,A.slice(1))}else{return sap.ui.base.ManagedObject.prototype[f].apply(this,A.slice(1))}};
sap.m.IconTabBar.prototype.bindAggregation=function(){var a=Array.prototype.slice.call(arguments);this._callMethodInManagedObject.apply(this,["bindAggregation"].concat(a));return this};
sap.m.IconTabBar.prototype.validateAggregation=function(a,o,m){return this._callMethodInManagedObject("validateAggregation",a,o,m)};
sap.m.IconTabBar.prototype.setAggregation=function(a,o,s){this._callMethodInManagedObject("setAggregation",a,o,s);return this};
sap.m.IconTabBar.prototype.getAggregation=function(a,d){return this._callMethodInManagedObject("getAggregation",a,d)};
sap.m.IconTabBar.prototype.indexOfAggregation=function(a,o){return this._callMethodInManagedObject("indexOfAggregation",a,o)};
sap.m.IconTabBar.prototype.insertAggregation=function(a,o,i,s){this._callMethodInManagedObject("insertAggregation",a,o,i,s);return this};
sap.m.IconTabBar.prototype.addAggregation=function(a,o,s){this._callMethodInManagedObject("addAggregation",a,o,s);return this};
sap.m.IconTabBar.prototype.removeAggregation=function(a,o,s){return this._callMethodInManagedObject("removeAggregation",a,o,s)};
sap.m.IconTabBar.prototype.removeAllAggregation=function(a,s){return this._callMethodInManagedObject("removeAllAggregation",a,s)};
sap.m.IconTabBar.prototype.destroyAggregation=function(a,s){this._callMethodInManagedObject("destroyAggregation",a,s);return this};
sap.m.IconTabBar.prototype.getBinding=function(a){return this._callMethodInManagedObject("getBinding",a)};
sap.m.IconTabBar.prototype.getBindingInfo=function(a){return this._callMethodInManagedObject("getBindingInfo",a)};
sap.m.IconTabBar.prototype.getBindingPath=function(a){return this._callMethodInManagedObject("getBindingPath",a)};
