/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Button','./library','sap/ui/core/EnabledPropagator'],function(q,B,l,E){"use strict";var T=B.extend("sap.m.ToggleButton",{metadata:{library:"sap.m",properties:{pressed:{type:"boolean",group:"Data",defaultValue:false}}}});E.call(T.prototype);T.prototype.ontap=function(e){e.setMarked();if(this.getEnabled()){this.setPressed(!this.getPressed());this.firePress({pressed:this.getPressed()})}};T.prototype.setPressed=function(p){if(p!=this.getPressed()){var i=this.$("inner");this.setProperty("pressed",p,true);i.toggleClass("sapMToggleBtnPressed",p);i.attr("pressed",p)}return this};T.prototype.onkeydown=function(e){if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){this.ontap(e)}};return T},true);
