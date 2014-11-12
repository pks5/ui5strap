/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.CheckBox");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.CheckBox",{metadata:{library:"sap.m",properties:{"selected":{type:"boolean",group:"Data",defaultValue:false},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"name":{type:"string",group:"Misc",defaultValue:null},"text":{type:"string",group:"Appearance",defaultValue:null},"textDirection":{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},"activeHandling":{type:"boolean",group:"Misc",defaultValue:true}},events:{"select":{}}}});sap.m.CheckBox.M_EVENTS={'select':'select'};jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.CheckBox.prototype);jQuery.sap.require("sap.m.Label");
sap.m.CheckBox.prototype.init=function(){this.addActiveState(this);jQuery.sap.require("sap.ui.core.IconPool");sap.ui.core.IconPool.insertFontFaceStyle()};
sap.m.CheckBox.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true};
sap.m.CheckBox.prototype.setSelected=function(s){s=!!s;if(s==this.getSelected()){return this}this.$("CbBg").toggleClass("sapMCbMarkChecked",s);var c=this.getDomRef("CB");if(c){s?c.setAttribute('checked','checked'):c.removeAttribute('checked')}this.setProperty("selected",s,true);return this};
sap.m.CheckBox.prototype.ontap=function(e){if(this.getEnabled()){var s=!this.getSelected();this.setSelected(s);this.fireSelect({selected:s})}};
sap.m.CheckBox.prototype.addActiveState=function(c){if(sap.ui.Device.os.blackberry||(sap.ui.Device.os.android&&(sap.ui.Device.os.versionStr.match(/[23]\./)))){c.addDelegate({ontouchstart:function(e){jQuery(c.getDomRef()).addClass("sapMActive")},ontouchend:function(e){jQuery(c.getDomRef()).removeClass("sapMActive")}})}};
sap.m.CheckBox.prototype._setLabelProperty=function(p,P,s){var h=!!this._oLabel,u=jQuery.sap.charToUpperCase(p,0);this.setProperty(p,P,h&&s);if(!h){this._oLabel=new sap.m.Label(this.getId()+"-label",{}).addStyleClass("sapMCbLabel").setParent(this,null,true)}this._oLabel["set"+u](this["get"+u]());return this};
sap.m.CheckBox.prototype.setText=function(t){this._setLabelProperty("text",t,true)};
sap.m.CheckBox.prototype.setWidth=function(w){this._setLabelProperty("width",w,true)};
sap.m.CheckBox.prototype.setTextDirection=function(d){this._setLabelProperty("textDirection",d)};
sap.m.CheckBox.prototype.exit=function(){delete this._iTabIndex;if(this._oLabel){this._oLabel.destroy()}};
sap.m.CheckBox.prototype.onsapspace=function(e){this.ontap(e);if(e){e.preventDefault();e.stopPropagation()}};
sap.m.CheckBox.prototype.setTabIndex=function(t){this._iTabIndex=t;this.$("CbBg").attr("tabindex",t);return this};
sap.m.CheckBox.prototype.getTabIndex=function(){if(this.hasOwnProperty("_iTabIndex")){return this._iTabIndex}return this.getEnabled()?0:-1};
