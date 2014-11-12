/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Link");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Link",{metadata:{library:"sap.m",properties:{"text":{type:"string",group:"Data",defaultValue:''},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"target":{type:"string",group:"Behavior",defaultValue:null},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"href":{type:"sap.ui.core.URI",group:"Data",defaultValue:null},"wrapping":{type:"boolean",group:"Appearance",defaultValue:false},"subtle":{type:"boolean",group:"Behavior",defaultValue:false},"emphasized":{type:"boolean",group:"Behavior",defaultValue:false}},events:{"press":{allowPreventDefault:true}}}});sap.m.Link.M_EVENTS={'press':'press'};jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.Link.prototype);
sap.m.Link.prototype.onsapspace=function(e){sap.m.Link.prototype._handlePress.apply(this,arguments)};
sap.m.Link.prototype._handlePress=function(e){if(this.getEnabled()){if(!this.firePress()){e.preventDefault()}}else{e.preventDefault()}};
if(sap.ui.Device.support.touch){sap.m.Link.prototype.ontap=sap.m.Link.prototype._handlePress}else{sap.m.Link.prototype.onclick=sap.m.Link.prototype._handlePress}
sap.m.Link.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true};
sap.m.Link.prototype.setText=function(t){this.setProperty("text",t,true);t=this.getProperty("text");this.$().text(t);return this};
sap.m.Link.prototype.setHref=function(u){this.setProperty("href",u,true);u=this.getProperty("href");this.$().attr("href",u);return this};
sap.m.Link.prototype.setSubtle=function(s){this.setProperty("subtle",s,true);this.$().toggleClass("sapMLnkSubtle",s);return this};
sap.m.Link.prototype.setEmphasized=function(e){this.setProperty("emphasized",e,true);this.$().toggleClass("sapMLnkEmphasized",e);return this};
sap.m.Link.prototype.setWrapping=function(w){this.setProperty("wrapping",w,true);this.$().toggleClass("sapMLnkWrapping",w);return this};
sap.m.Link.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);this.$().toggleClass("sapMLnkDsbl",!e);if(e){this.$().attr("disabled",false);this.$().attr("tabindex","0")}else{this.$().attr("disabled",true);this.$().attr("tabindex","-1")}return this};
sap.m.Link.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().toggleClass("sapMLnkMaxWidth",!w);this.$().css("width",w);return this};
sap.m.Link.prototype.setTarget=function(t){this.setProperty("target",t,true);if(!t){this.$().removeAttr("target")}else{this.$().attr("target",t)}return this};
