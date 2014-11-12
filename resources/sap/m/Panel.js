/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Panel");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Panel",{metadata:{library:"sap.m",properties:{"visible":{type:"boolean",group:"Appearance",defaultValue:true},"headerText":{type:"string",group:"Data",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'100%'},"height":{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'auto'},"expandable":{type:"boolean",group:"Appearance",defaultValue:false},"expanded":{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"content",aggregations:{"content":{type:"sap.ui.core.Control",multiple:true,singularName:"content"},"headerToolbar":{type:"sap.m.Toolbar",multiple:false},"infoToolbar":{type:"sap.m.Toolbar",multiple:false}},events:{"expand":{}}}});sap.m.Panel.M_EVENTS={'expand':'expand'};
sap.m.Panel.prototype.init=function(){};
sap.m.Panel.prototype.setWidth=function(w){this.setProperty("width",w,true);var d=this.getDomRef();if(d){d.style.width=w}return this};
sap.m.Panel.prototype.setHeight=function(h){this.setProperty("height",h,true);var d=this.getDomRef();if(d){d.style.height=h}return this};
sap.m.Panel.prototype.setExpandable=function(e){this.setProperty("expandable",e,false);if(e&&!this.oIconCollapsed){jQuery.sap.require("sap.ui.core.IconPool");var c=sap.ui.core.IconPool.getIconURI("navigation-right-arrow");var t=this;var i=sap.ui.core.IconPool.createControlByURI({id:t.getId()+"-CollapsedImg",src:c}).addStyleClass("sapMPanelExpandableIcon").attachPress(function(E){t.setExpanded(!t.getExpanded())});i.setDecorative(false);this.oIconCollapsed=i}return this};
sap.m.Panel.prototype.setExpanded=function(e){if(e===this.getExpanded()){return}this.setProperty("expanded",e,true);if(!this.getExpandable()){return}var $=this.$();$.find(".sapMPanelExpandableIcon").toggleClass("sapMPanelExpandableIconExpanded");$.find(".sapMPanelExpandablePart").slideToggle({});$.find(".sapMPanelWrappingDiv").toggleClass("sapMPanelWrappingDivExpanded");this.fireExpand({expand:e});return this};
sap.m.Panel.prototype.onAfterRendering=function(){var $=this.$();if(this.getExpandable())if(this.getExpanded()){$.find(".sapMPanelWrappingDiv").addClass("sapMPanelWrappingDivExpanded")}else{$.find(".sapMPanelExpandablePart").hide()}};
sap.m.Panel.prototype.exit=function(){if(this.oIconCollapsed){this.oIconCollapsed.destroy();delete this.oIconCollapsed}};
sap.m.Panel.prototype._getIcon=function(){return this.oIconCollapsed};
