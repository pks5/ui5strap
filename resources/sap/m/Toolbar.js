/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Toolbar");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Toolbar",{metadata:{interfaces:["sap.ui.core.Toolbar","sap.m.IBar"],library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},"active":{type:"boolean",group:"Behavior",defaultValue:false},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"height":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:''},"design":{type:"sap.m.ToolbarDesign",group:"Appearance",defaultValue:sap.m.ToolbarDesign.Auto}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{"press":{}}}});sap.m.Toolbar.M_EVENTS={'press':'press'};jQuery.sap.require("sap.m.ToolbarSpacer");jQuery.sap.require("sap.m.ToolbarDesign");jQuery.sap.require("sap.m.BarInPageEnabler");jQuery.sap.require("sap.m.ToolbarLayoutData");jQuery.sap.require("sap.ui.core.ResizeHandler");jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.Toolbar.prototype);sap.m.Toolbar.shrinkClass="sapMTBShrinkItem";
sap.m.Toolbar.isRelativeWidth=function(w){return/^([-+]?\d+%|auto|inherit|)$/i.test(w)};
sap.m.Toolbar.checkOverflow=function(e){if(!e||!e.length){return false}e.children().each(function(){this.style.width=sap.m.Toolbar.getOrigWidth(this.id)});return e[0].scrollWidth>e[0].clientWidth};
sap.m.Toolbar.getOrigWidth=function(i){var c=sap.ui.getCore().byId(i);if(!c||!c.getWidth){return"auto"}return c.getWidth()};
sap.m.Toolbar.checkShrinkable=function(c,s){if(c instanceof sap.m.ToolbarSpacer){return this.isRelativeWidth(c.getWidth())}s=s||this.shrinkClass;c.removeStyleClass(s);var w=this.getOrigWidth(c.getId());if(!this.isRelativeWidth(w)){return}var l=c.getLayoutData();if(l instanceof sap.m.ToolbarLayoutData){return l.getShrinkable()&&c.addStyleClass(s)}if(w.indexOf("%")>0){return c.addStyleClass(s)}var d=c.getDomRef();if(d&&(d.firstChild||{}).nodeType==3){return c.addStyleClass(s)}};
sap.m.Toolbar.flexie=function(e,f,s){if(!e||!e.length||!e.width()){return}s=s||this.shrinkClass;f=f||sap.m.ToolbarSpacer.flexClass;var t=0,F=[],S=[],T=0,i=e.width(),c=e.children(),o=this.checkOverflow(e),a=function(w){return!w||w=="auto"||w=="inherit"},b=function(I){T+=I.outerWidth(true)},p=function(I){var B=parseFloat(I.css("width"))||0;var m=parseFloat(I.css("min-width"))||0;if(B==m){b(I);return}var g=0;var w=I.width();var P=(w*100)/i;t+=P;T+=I.outerWidth(true)-w;if(I.css("box-sizing")=="border-box"){g=I.outerWidth()-w}var M=I.css("max-width");var h=parseFloat(M);if(M.indexOf("%")>0){h=Math.ceil((h*e.outerWidth())/100)}S.push({boxSizing:g,maxWidth:h,minWidth:m,percent:P,el:I[0]})},d=function(g){var h=0;S.forEach(function(I,j){var R=Math.min(100,(I.percent*100)/t);var C=Math.floor((g*R)/100);var k=I.boxSizing+C;if(k<I.minWidth){I.el.style.width=I.minWidth+"px";g-=(I.minWidth-I.boxSizing);t-=I.percent;delete S[j]}if(I.maxWidth&&I.maxWidth>I.minWidth&&k>I.maxWidth){I.el.style.width=I.maxWidth+"px";g+=(k-I.maxWidth);t-=I.percent;delete S[j]}});S.forEach(function(I){var R=Math.min(100,(I.percent*100)/t);var C=(g*R)/100;var j=I.boxSizing+C;I.el.style.width=j+"px";h+=j});g-=h;if(g>1){F.forEach(function(j){var w=g/F.length;j.style.width=w+"px"})}};c.each(function(){var C=jQuery(this);var A=a(this.style.width);if(A&&C.hasClass(f)){F.push(this);this.style.width="0px"}else if(C.is(":hidden")){return}else if(o&&C.hasClass(s)){p(C)}else{b(C)}});var r=i-T;d(Math.max(r,0))};
sap.m.Toolbar.hasFlexBoxSupport=jQuery.support.hasFlexBoxSupport;sap.m.Toolbar.hasNewFlexBoxSupport=(function(){var s=document.documentElement.style;return(s.flex!==undefined||s.msFlex!==undefined||s.webkitFlexShrink!==undefined)}());
sap.m.Toolbar.prototype.init=function(){this._oContentDelegate={onAfterRendering:this._onAfterContentRendering}};
sap.m.Toolbar.prototype.onBeforeRendering=function(){this._cleanup()};
sap.m.Toolbar.prototype.onAfterRendering=function(){if(this._isInvisible()){return}if(!this._checkContents()){return}this._doLayout()};
sap.m.Toolbar.prototype.exit=function(){this._cleanup()};
sap.m.Toolbar.prototype.onLayoutDataChange=function(){this.rerender()};
sap.m.Toolbar.prototype.addContent=function(c){this.addAggregation("content",c);this._onContentInserted(c);return this};
sap.m.Toolbar.prototype.insertContent=function(c,i){this.insertAggregation("content",c,i);this._onContentInserted(c);return this};
sap.m.Toolbar.prototype.removeContent=function(c){c=this.removeAggregation("content",c);this._onContentRemoved(c);return c};
sap.m.Toolbar.prototype.removeAllContent=function(){var c=this.removeAllAggregation("content")||[];c.forEach(this._onContentRemoved,this);return c};
sap.m.Toolbar.prototype.ontap=function(e){if(this.getActive()&&!e.isMarked()){e.setMarked();this.firePress({srcControl:e.srcControl})}};
sap.m.Toolbar.prototype.onsapenter=function(e){if(this.getActive()&&e.srcControl===this&&!e.isMarked()){e.setMarked();this.firePress({srcControl:this})}};
sap.m.Toolbar.prototype.onsapspace=sap.m.Toolbar.prototype.onsapenter;
sap.m.Toolbar.prototype.ontouchstart=function(e){this.getActive()&&e.setMarked()};
sap.m.Toolbar.prototype._isInvisible=function(){if(!this.getVisible()||!this.getContent().length){return true}};
sap.m.Toolbar.prototype._checkContents=function(){var s=0;this.getContent().forEach(function(c){if(sap.m.Toolbar.checkShrinkable(c)){s++}});return s};
sap.m.Toolbar.prototype._doLayout=function(){if(sap.m.Toolbar.hasNewFlexBoxSupport){return}if(sap.m.Toolbar.hasFlexBoxSupport){this._resetOverflow()}else{this._reflexie()}};
sap.m.Toolbar.prototype._resetOverflow=function(){this._deregisterResize();var $=this.$();var d=$[0]||{};$.removeClass("sapMTBOverflow");var o=d.scrollWidth>d.clientWidth;o&&$.addClass("sapMTBOverflow");this._endPoint=this._getEndPoint();this._registerResize()};
sap.m.Toolbar.prototype._reflexie=function(){this._deregisterResize();sap.m.Toolbar.flexie(this.$());this._endPoint=this._getEndPoint();this._registerResize()};
sap.m.Toolbar.prototype._onContentInserted=function(c){if(c){c.attachEvent("_change",this._onContentPropertyChanged,this);c.addEventDelegate(this._oContentDelegate,c)}};
sap.m.Toolbar.prototype._onContentRemoved=function(c){if(c){c.detachEvent("_change",this._onContentPropertyChanged,this);c.removeEventDelegate(this._oContentDelegate,c)}};
sap.m.Toolbar.prototype._onAfterContentRendering=function(){var l=this.getLayoutData();if(l instanceof sap.m.ToolbarLayoutData){l.applyProperties()}};
sap.m.Toolbar.prototype._onContentPropertyChanged=function(e){if(e.getParameter("name")!="width"){return}var c=e.getSource();var p=c.getWidth().indexOf("%")>0;c.toggleStyleClass(sap.m.Toolbar.shrinkClass,p)};
sap.m.Toolbar.prototype._registerContentResize=function(){sap.ui.getCore().attachIntervalTimer(this._handleContentResize,this)};
sap.m.Toolbar.prototype._deregisterContentResize=function(){sap.ui.getCore().detachIntervalTimer(this._handleContentResize,this)};
sap.m.Toolbar.prototype._registerToolbarResize=function(){if(sap.m.Toolbar.isRelativeWidth(this.getWidth())){var r=jQuery.proxy(this._handleToolbarResize,this);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this,r)}};
sap.m.Toolbar.prototype._deregisterToolbarResize=function(){sap.ui.getCore().detachIntervalTimer(this._handleContentResize,this);if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=""}};
sap.m.Toolbar.prototype._registerResize=function(){this._registerToolbarResize();this._registerContentResize()};
sap.m.Toolbar.prototype._deregisterResize=function(){this._deregisterToolbarResize();this._deregisterContentResize()};
sap.m.Toolbar.prototype._cleanup=function(){this._deregisterResize()};
sap.m.Toolbar.prototype._getEndPoint=function(){var l=(this.getDomRef()||{}).lastElementChild;if(l){var e=l.offsetLeft;if(!sap.ui.getCore().getConfiguration().getRTL()){e+=l.offsetWidth}}return e||0};
sap.m.Toolbar.prototype._handleToolbarResize=function(){this._handleResize(false)};
sap.m.Toolbar.prototype._handleContentResize=function(){this._handleResize(true)};
sap.m.Toolbar.prototype._handleResize=function(c){if(c&&this._endPoint==this._getEndPoint()){return}this._doLayout()};
sap.m.Toolbar.prototype.setDesign=function(d,s){if(!s){return this.setProperty("design",d)}this._sAutoDesign=this.validateProperty("design",d);return this};
sap.m.Toolbar.prototype.getActiveDesign=function(){var d=this.getDesign();if(d!=sap.m.ToolbarDesign.Auto){return d}return this._sAutoDesign||d};
sap.m.Toolbar.prototype.isContextSensitive=sap.m.BarInPageEnabler.prototype.isContextSensitive;sap.m.Toolbar.prototype.setHTMLTag=sap.m.BarInPageEnabler.prototype.setHTMLTag;sap.m.Toolbar.prototype.getHTMLTag=sap.m.BarInPageEnabler.prototype.getHTMLTag;sap.m.Toolbar.prototype.applyTagAndContextClassFor=sap.m.BarInPageEnabler.prototype.applyTagAndContextClassFor;
