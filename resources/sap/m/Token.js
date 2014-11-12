/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Token");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Token",{metadata:{library:"sap.m",properties:{"selected":{type:"boolean",group:"Misc",defaultValue:false},"key":{type:"string",group:"Misc",defaultValue:""},"text":{type:"string",group:"Misc",defaultValue:""},"editable":{type:"boolean",group:"Misc",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{"deleteIcon":{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{"delete":{},"press":{},"select":{}}}});sap.m.Token.M_EVENTS={'delete':'delete','press':'press','select':'select'};
sap.m.Token.prototype.init=function(){var t=this;this._deleteIcon=new sap.ui.core.Icon({src:"sap-icon://sys-cancel"});this._deleteIcon.addStyleClass("sapMTokenIcon");this.setAggregation("deleteIcon",this._deleteIcon)};
sap.m.Token.prototype.setEditable=function(e){this.setProperty("editable",e);if(e){this.removeStyleClass("sapMTokenReadOnly")}else{this.addStyleClass("sapMTokenReadOnly")}};
sap.m.Token.prototype.ontouchstart=function(e){if(sap.ui.Device.system.desktop&&e.originalEvent.button!==0)return;this._oSrcStartId=e.target.id;if(this._oSrcStartId===this._deleteIcon.getId()){e.preventDefault()}};
sap.m.Token.prototype.ontouchend=function(e){var s=e.target,i=this.getId();if(this._oSrcStartId!==s.id){delete this._oSrcStartId;return}var t=sap.m.MultiInput.prototype._bDoTouchScroll;var T=false;if(t&&this.getSelected()){T=true}if(s.id===this._deleteIcon.getId()){if(T||!t){this.fireDelete({token:this})}else{this.firePress({token:this})}e.preventDefault()}else{this.firePress({token:this});e.preventDefault()}delete this._oSrcStartId};
sap.m.Token.prototype.onsapfocusleave=function(e){this.setSelected(false)};
sap.m.Token.prototype.setSelected=function(s,m){var $=this.$();if($){if(s){$.addClass("sapMTokenSelected")}else{$.removeClass("sapMTokenSelected")}}else{if(s){this.addStyleClass("sapMTokenSelected")}else{this.removeStyleClass("sapMTokenSelected")}}this.setProperty("selected",s,true);if(s&&!m){this.focus()}if(s){this.fireSelect()}};
sap.m.Token.prototype.onsapbackspace=function(e){e.preventDefault();e.stopPropagation();if(this.getSelected()&&this.getEditable()){this.fireDelete({token:this})}};
sap.m.Token.prototype.onsapdelete=function(e){if(this.getEditable()){this.fireDelete({token:this})}e.preventDefault()};
