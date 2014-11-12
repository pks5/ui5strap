/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.ToggleButton");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.m.Button");sap.m.Button.extend("sap.m.ToggleButton",{metadata:{library:"sap.m",properties:{"pressed":{type:"boolean",group:"Data",defaultValue:false}}}});jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.ToggleButton.prototype);
sap.m.ToggleButton.prototype.ontap=function(e){e.setMarked();if(this.getEnabled()){this.setPressed(!this.getPressed());this.firePress({pressed:this.getPressed()})}};
sap.m.ToggleButton.prototype.setPressed=function(p){if(p!=this.getPressed()){var i=this.$("inner");this.setProperty("pressed",p,true);i.toggleClass("sapMToggleBtnPressed",p);i.attr("pressed",p)}return this};
sap.m.ToggleButton.prototype.onkeydown=function(e){if(e.which===jQuery.sap.KeyCodes.SPACE||e.which===jQuery.sap.KeyCodes.ENTER){this.ontap(e)}};
