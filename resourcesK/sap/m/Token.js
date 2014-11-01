/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Token");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Token",{metadata:{library:"sap.m",properties:{"selected":{type:"boolean",group:"Misc",defaultValue:false},"key":{type:"string",group:"Misc",defaultValue:""},"text":{type:"string",group:"Misc",defaultValue:""},"editable":{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{"deleteIcon":{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{"delete":{},"press":{}}}});sap.m.Token.M_EVENTS={'delete':'delete','press':'press'};
sap.m.Token.prototype.init=function(){var t=this;this._deleteIcon=new sap.ui.core.Icon({src:"sap-icon://sys-cancel"});this._deleteIcon.addStyleClass("sapMTokenIcon");this.setAggregation("deleteIcon",this._deleteIcon)};
sap.m.Token.prototype.ontouchstart=function(e){if(e.originalEvent.button!==0)return;var s=e.target,i=this.getId();if(s.id===this._deleteIcon.getId()){e.preventDefault()}};
sap.m.Token.prototype.ontouchend=function(e){if(e.originalEvent.button!==0)return;var s=e.target,i=this.getId();if(s.id===this._deleteIcon.getId()){this.fireDelete({token:this});e.preventDefault()}else{this.firePress({token:this})}};
sap.m.Token.prototype.onsapfocusleave=function(e){this.setSelected(false)};
sap.m.Token.prototype.setSelected=function(s,m){if(s){this.addStyleClass("sapMTokenSelected")}else{this.removeStyleClass("sapMTokenSelected")}this.setProperty("selected",s,true);if(s&&!m)this.focus()};
sap.m.Token.prototype.onsapbackspace=function(e){if(this.getSelected()){this.fireDelete({token:this})}e.preventDefault();e.stopPropagation()};
sap.m.Token.prototype.onsapdelete=function(e){this.fireDelete({token:this});e.preventDefault()};
